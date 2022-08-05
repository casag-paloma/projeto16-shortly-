import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../dbStrategy/pgsql.js';

export async function createUser(req,res){
    
    try {
        const newUser = req.body;
        const {password} = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);

        const { rowCount } = await connection.query(`SELECT * FROM users WHERE email = $1;`, [newUser.email]);

        if( rowCount > 0){
            return res.sendStatus(409);
        };

        await connection.query(`INSERT INTO users ("fullName", email, password) VALUES ($1, $2, $3);`, [newUser.name, newUser.email, passwordHash]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}