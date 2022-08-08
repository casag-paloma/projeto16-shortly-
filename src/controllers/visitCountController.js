import connection from "../dbStrategy/pgsql.js";

export async function getUserMe(req, res){

    const {user} = res.locals;
    const userId = user[0].id;

    try {

        const result = await connection.query(
            {
              text: `
              SELECT 
                urls.*,
                users.*
              FROM urls
                JOIN users ON users.id=urls."userId"
                WHERE user.id = $1;
            `,
              rowMode: 'array'
            },
            [userId]
          );
      
          res.send(result.rows.map(_mapRentalsArrayToObject));

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