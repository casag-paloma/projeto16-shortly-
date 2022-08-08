import connection from "../dbStrategy/pgsql.js";

export async function getUserMe(req, res){

    const {user} = res.locals;
    const userId = user[0].id;

    try {

        const {rows: urls} = await connection.query(`SELECT json_build_object(
            'id', us.id,
            'name', us."fullName",
            'visitCount', us."urlsVisitCount",
            'shortenedUrls', json_build_object(
                    'id', ur.id,
                    'shortUrl', ur."shortUrl",
                    'url', ur.url,
                    'visitCount', ur."visitCount")
            )FROM urls ur JOIN users us ON ur."userId" = us.id WHERE ur."userId" = $1;`, [userId]
    );
        const urlsArray = urls.map(e => e = e.json_build_object);
        const shortenedUrls = urlsArray.map(e => e.shortenedUrls);
        const result = {
            id: urlsArray[0].id,
            name: urlsArray[0].name,
            visitCount: urlsArray[0].visitCount,
            shortenedUrls: shortenedUrls
        }
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export async function getRanking(req, res){
    try {

        const result = await connection.query(`
        SELECT 
            us.id AS id,
            us."fullName" AS name,
            COUNT(ur.id) AS "linksCount",
            us."urlsVisitCount" AS "visitCount"
            FROM users us 
            LEFT JOIN urls ur ON us.id = ur."userId"
            GROUP BY us.id
            ORDER BY "visitCount" DESC
            LIMIT 10;`
        );

        res.status(200).send(result.rows);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}