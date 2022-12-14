import connection from "../dbStrategy/pgsql.js";
import { nanoid } from "nanoid";
import { urlSchema } from "../schemas/urlSchema.js";

export async function shortenUrl(req, res){
    const {user} = res.locals;
    const userId = user[0].id;
    try {
        const url = req.body;

        const validate = urlSchema.validate(url, { abortEarly: false });

        if(validate.error){
            const messages = validate.error.details.map(e => e.message);
            return res.status(422).send(messages);
        };

        const shortUrl = nanoid();

        await connection.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ( $1, $2, $3);`, [url.url, shortUrl,userId]);
        const resUrl = await connection.query(`SELECT "shortUrl" FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
        res.status(201).send(resUrl.rows[0]);


    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export async function getUrl(req, res){
    const {id} = req.params;

    if(isNaN(parseInt(id))) return res.sendStatus(400)

    try {
 
        const {rows: url, rowCount } = await connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1;`, [id]);

        if(rowCount === 0) return res.sendStatus(404)

        res.status(200).send(url[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export async function openShortUrl(req, res){
    const {shortUrl} = req.params;

    try {
 
        const {rows: url, rowCount } = await connection.query(`SELECT "userId", url, "visitCount" FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);

        if(rowCount === 0) return res.sendStatus(404)

        const {rows: userVisitCount} = await connection.query(`SELECT "urlsVisitCount" FROM users WHERE id = $1;`, [url[0].userId])

        const newVisitCount = parseInt(url[0].visitCount) + 1;
        const newUrlVisitCount = parseInt(userVisitCount[0].urlsVisitCount) +1;

        await connection.query(`UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2;`, [newVisitCount, shortUrl]);
        await connection.query(`UPDATE users SET "urlsVisitCount" = $1 WHERE id = $2;`, [newUrlVisitCount, url[0].userId]);
        res.redirect(url[0].url);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export async function deleteUrl(req, res){
    const {user} = res.locals;
    const userId = user[0].id;
    const {id} = req.params;
    if(isNaN(parseInt(id))) return res.sendStatus(400)

    try {
 
        const {rows: url, rowCount } = await connection.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
        if(rowCount === 0) return res.sendStatus(404)
        const urlUserId = url[0].userId;

        if(userId != urlUserId) return res.sendStatus(401)

        const userVisitCount = parseInt(user[0].urlsVisitCount);
        const urlVisitCount = parseInt(url[0].visitCount);
        const newUserVisitCount = userVisitCount - urlVisitCount;
        await connection.query(` DELETE FROM urls WHERE urls.id = $1;`,[id]);
        await connection.query(`UPDATE users SET "urlsVisitCount" = $1 WHERE id = $2;`, [newUserVisitCount, userId]);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};