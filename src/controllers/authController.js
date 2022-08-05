import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../dbStrategy/pgsql.js';
import { authSignUpSchema, authLoginSchema } from '../schemas/authSchema.js';

export async function createUser(req,res){
    
    try {
        const newUser = req.body;

        const validate = authSignUpSchema.validate(newUser, { abortEarly: false });

        if(validate.error){
            const messages = validate.error.details.map(e => e.message);
            return res.status(422).send(messages);
        };

        const passwordHash = bcrypt.hashSync(newUser.password, 10);

        const { rowCount } = await connection.query(`SELECT * FROM users WHERE email = $1;`, [newUser.email]);

        if( rowCount > 0){
            return res.sendStatus(409);
        };

        await connection.query(`INSERT INTO users ("fullName", email, password) VALUES ($1, $2, $3);`, [newUser.name, newUser.email, passwordHash]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export async function loginUser(req,res){
    
    try {
        const user = req.body;

        const validate = authLoginSchema.validate(user, { abortEarly: false });

        if(validate.error){
            const messages = validate.error.details.map(e => e.message);
            return res.status(422).send(messages);
        };

        const { rowCount, rows } = await connection.query(`SELECT * FROM users WHERE email = $1;`, [user.email]);

        if( rowCount != 1 ) return res.sendStatus(401)
        
        const decryptedPassword = bcrypt.compareSync(user.password, rows[0].password);
        
        if(decryptedPassword){
            const token = uuid();
            await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [rows[0].id, token]);
            return res.status(200).send(token);
        }

        res.sendStatus(401);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

