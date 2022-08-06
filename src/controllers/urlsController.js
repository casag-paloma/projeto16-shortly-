import connection from "../dbStrategy/pgsql.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res){
    const {user} = res.locals;
    const userId = user[0].id;
    console.log(userId);
    try {
        const {url} = req.body;
        const shortUrl = nanoid();
        console.log(url, shortUrl);

        await connection.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ( $1, $2, $3);`, [url, shortUrl,userId]);
        const resUrl = await connection.query(`SELECT "shortUrl" FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
        console.log(resUrl.rows[0]);
        res.status(201).send(resUrl.rows[0]);


    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}