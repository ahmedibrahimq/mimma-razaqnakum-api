import { query } from '../../utils/db';

export const get = (data, callback) => {
   query("SELECT * FROM members WHERE group_name = $1", data, callback);
}

export const create = (data, callback) => {
   query("INSERT INTO members VALUES ($1, $2, $3, $4, $5, $6, $7)", Object.values(data), callback);
}

export const update = (data, callback) => {
   query(`UPDATE members 
   SET (group_name, full_name, avatar, phone, landline, fb_acc) = ($2, $3, $4, $5, $6, $7)
   WHERE username = $1`, Object.values(data), callback);
}

export const remove = (data, callback) => {
   query("DELETE FROM members WHERE username = $1", data, callback);
}

export default {
   get, create, update, remove
}
