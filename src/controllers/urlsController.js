import connection from "../dbStrategy/pgsql.js";
import { nanoid } from "nanoid";
import { urlSchema } from "../schemas/urlSchema.js";

export async function shortenUrl(req, res){
    const {user} = res.locals;
    const userId = user[0].id;
    console.log(userId);
    try {
        const {url} = req.body;

        const validate = urlSchema.validate(url, { abortEarly: false });

        if(validate.error){
            const messages = validate.error.details.map(e => e.message);
            return res.status(422).send(messages);
        };

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
}