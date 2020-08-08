import { query } from '../../utils/db';

export const createOne = (req, callback) => {
   // create new campain with a list of tags
   // create new tags where not exsist in "tags" table
   // associate tags to the campain in "campains_tags" table
   const data = Object.values(req.body);
   const tags = data.pop().map(t=> `(TEXT '${t}')`).join();
   query(`
   WITH tags_data(tag) AS (
      VALUES ${tags}
      )
   , ins_tags AS (
      INSERT INTO tags
      SELECT tag FROM tags_data td
      WHERE  NOT  EXISTS (SELECT title FROM tags t WHERE t.title = td.tag)
      )
   , ins_c AS (
      INSERT INTO campains (title, group_name, details, expires_at, money_target, pics) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING title AS campain, group_name AS campain_group
      )
   INSERT INTO campains_tags 
   SELECT td.tag, c.*
   FROM   tags_data td , ins_c c
   RETURNING *;
   `,data, callback);
}

export const getOne = (req, callback) => {
   const data = [req.params.title, req.query.gn];
   query(`
   SELECT get_c.*, 
          get_d.donations
   FROM   (
          SELECT c.group_name, c.title, c.details, c.created_at, c.expires_at,
                 c.status, c.money_collected, c.money_target, c.pics,
                 ARRAY_REMOVE(ARRAY_AGG(ct.tag), NULL) AS tags
          FROM   campains c
          LEFT JOIN
                 campains_tags ct 
          ON     c.title = ct.campain AND c.group_name = ct.campain_group 
          WHERE  c.title = $1 AND c.group_name = $2
          GROUP BY
                 c.title, c.group_name, c.details, c.created_at, c.expires_at, 
                 c.status, c.money_collected, c.money_target, c.pics
          ) get_c
   LEFT JOIN 	   
          (
          SELECT json_agg(d) AS donations, campain
          FROM   (
                SELECT amount, created_at, campain ,
                         CASE 
                         WHEN hide_donor 
                         THEN 'Hidden Donor' 
                         ELSE donor 
                         END
                FROM   donations d
                WHERE  campain = $1 AND group_name = $2
                ) d
          GROUP BY
                campain 
          ) get_d
   ON     get_c.title = get_d.campain;
   `, data, callback);
}

export const getMany = (req, callback) => {
   // select campains and their tags
   // aggregate all tags into a single array field
   //  and remove null if there are no tags for a campain
   // left join to include campains without tags.
   // with pagination. figuring last page is left to the client
   //  Also we can provide total count: https://stackoverflow.com/questions/156114/best-way-to-get-result-count-before-limit-was-applied/8242764#8242764
   const limit = req.query.l;
   const offset = (req.query.pg - 1) * limit;
   const data = [req.query.gn, offset, limit];
   query(`
   SELECT c.title, c.details, c.created_at, c.expires_at, c.status, c.money_collected, c.money_target, c.pics,
          ARRAY_REMOVE(ARRAY_AGG(ct.tag), NULL) AS tags
   FROM   campains c LEFT JOIN campains_tags ct ON c.title = ct.campain 
   WHERE  c.group_name = $1 AND deleted_at IS NULL
   GROUP BY c.title, c.details, c.created_at, c.expires_at, c.status, c.money_collected, c.money_target, c.pics
   ORDER BY c.created_at DESC
   OFFSET $2 LIMIT $3
   `, data, callback);
}

export const updateOne = (req, callback) => {
   const data = Object.values(req.body);
   query(`UPDATE campains 
   SET (details, expires_at, status, pics) = ($3, $4, $5, $6)
   WHERE title = $1 AND group_name = $2
   RETURNING *`, data, callback);
}

export const removeOne = (req, callback) => {
   const data = [req.body.title, req.body.groupName, new Date()];
   query(`UPDATE campains set deleted_at = $3 
   WHERE title = $1 AND group_name = $2 RETURNING *`, data, callback);
   // query("DELETE FROM campains WHERE title = $1 AND group_name = $2 RETURNING *", data, callback);
}

export default {
   createOne,getOne, getMany, updateOne, removeOne
}
