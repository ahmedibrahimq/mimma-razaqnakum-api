import { query } from '../../utils/db';

export const get = (callback) => {
   query("SELECT * FROM tags", callback);
}

export const create = (data, callback) => {
   query("INSERT INTO tags VALUES ($1, $2)", Object.values(data), callback);
}

export const update = (data, callback) => {
   query(`UPDATE tags SET color = $2 WHERE title = $1`, Object.values(data), callback);
}

export const remove = (data, callback) => {
   query("DELETE FROM tags WHERE title = $1", data, callback);
}

export default {
   get, create, update, remove
}
