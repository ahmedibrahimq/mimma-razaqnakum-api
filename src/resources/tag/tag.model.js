import { query } from '../../utils/db';

export const getByGroup = (req, callback) => {
   const data = [req.query.group];
   
   query(`
   SELECT DISTINCT ON(t.title) t.*
   FROM   tags t
   JOIN   campains_tags ct
   ON     t.title = ct.tag
   WHERE  ct.campain_group = $1`, data, callback);
}

export const createOne = (req, callback) => {
   const data = Object.values(req.body);

   query("INSERT INTO tags VALUES ($1, $2) RETURNING *", data, callback);
}

export const updateOne = (req, callback) => {
   const data = Object.values(req.body);
   
   query(`UPDATE tags SET color = $2 WHERE title = $1 RETURNING *`, data, callback);
}

export const removeOne = (req, callback) => {
   const data = [req.params.title];
   
   query("DELETE FROM tags WHERE title = $1 RETURNING *", data, callback);
}

export default {
   getByGroup, createOne, updateOne, removeOne
}
