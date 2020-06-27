import { query } from '../../utils/db';

export const get = (data, callback) => {
   query("SELECT * FROM groups WHERE group_name = $1", data, callback);
}

export const getMany = (callback) => {
   query("SELECT * FROM groups", callback);
}

export const create = (data, callback) => {
   query("INSERT INTO groups VALUES ($1, $2)", Object.values(data), callback);
}

export const update = (data, callback) => {
   query("UPDATE groups SET logo = $2 WHERE group_name = $1", Object.values(data), callback);
}

export const remove = (data, callback) => {
   query("DELETE FROM groups WHERE group_name = $1", data, callback);
}

export default {
   get, create, getMany, update, remove
}
