import connection from "../dbStrategy/pgsql.js";

export async function userMiddleware(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer', '' ).trim();

    if(!token) return res.sendStatus(401)

    try {
        const {rowCount, rows} = await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);

        if(rowCount != 1) return res.sendStatus(401)

        const userId = rows[0].userId;

        const {rows: user} = await connection.query(`SELECT id, "fullName", email FROM users WHERE id = $1;`, [userId]);

        if(!user) return res.sendStatus(401)

        res.locals.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}