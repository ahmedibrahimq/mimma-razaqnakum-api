import { query } from '../../utils/db';

export const get = (req, callback) => {
   const data = [req.query.c, req.query.g];
   query("SELECT * FROM donations WHERE campain = $1 AND group_name = $2", data, callback);
}

export const create = (data, callback) => {
   query(`INSERT INTO donations (donor, campain, group_name, hide_donor, amount, details) 
   VALUES ($1, $2, $3, $4, $5, $6)`, Object.values(data), callback);
}

export const update = (data, callback) => {
   query(`UPDATE donations 
   SET (hide_donor, amount, details) = ($4, $5, $6)
   WHERE donor = $1 AND campain = $2 AND group_name = $3
   RETURNING *`, Object.values(data), callback);
}

export const remove = (data, callback) => {
   query(`DELETE FROM donations 
   WHERE donor = $1 AND campain = $2 AND group_name = $3
   RETURNING *`, Object.values(data), callback);
}

export default {
   get, create, update, remove
}
