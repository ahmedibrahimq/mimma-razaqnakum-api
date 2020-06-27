import { query } from '../../utils/db';

export const getOne = (req, callback) => {
   const data = [req.params.groupName];
   
   query("SELECT * FROM groups WHERE group_name = $1", data, callback);
}

export const getMany = (_, callback) => {
   query("SELECT * FROM groups", callback);
}

export const createOne = (req, callback) => {
   const data = Object.values(req.body);

   query("INSERT INTO groups VALUES ($1, $2, $3) RETURNING *", data, callback);
}

export const updateOne = (req, callback) => {
   const data = Object.values(req.body);

   query("UPDATE groups SET (logo, address) = ($2, $3) WHERE group_name = $1 RETURNING *", data, callback);
}

export const removeOne = (req, callback) => {
   const data = [req.params.groupName];

   query("DELETE FROM groups WHERE group_name = $1 RETURNING *", data, callback);
}

export default {
   getOne, createOne, getMany, updateOne, removeOne
}
