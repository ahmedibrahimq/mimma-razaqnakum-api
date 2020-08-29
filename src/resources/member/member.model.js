import { query } from '../../utils/db';

export const getByGroup = (req, callback) => {
   const data = [req.query.groupName];

   query("SELECT * FROM members WHERE group_name = $1", data, callback);
}

export const getByUsername = (req, callback) => {
   const data = [req.body.username];
   
   query(`SELECT * FROM members WHERE username = $1`, data, callback);
}

export const createOne = (req, callback) => {
   const data = Object.values(req.body);
   
   query(`INSERT INTO members (username, group_name, full_name, avatar, phone, landline, fb_acc, hash_pwd, email)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, data, callback);
}

export const updateOne = (req, callback) => {
   const data = Object.values(req.body);
   
   query(`UPDATE members 
   SET (group_name, full_name, avatar, phone, landline, fb_acc) = ($2, $3, $4, $5, $6, $7)
   WHERE username = $1 RETURNING *`, data, callback);
}

export const removeOne = (req, callback) => {
   const data = [req.params.username];
   
   query("DELETE FROM members WHERE username = $1 RETURNING *", data, callback);
}

export default {
   getByGroup, createOne, updateOne, removeOne
}
