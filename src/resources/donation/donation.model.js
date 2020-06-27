import { query } from '../../utils/db';

export const getByCampain = (req, callback) => {
   const data = [req.query.c, req.query.g];
   
   query("SELECT * FROM donations WHERE campain = $1 AND group_name = $2", data, callback);
}

export const createOne = (req, callback) => {
   const data = Object.values(req.body);
   
   query(`INSERT INTO donations (donor, campain, group_name, hide_donor, amount, details) 
   VALUES ($1, $2, $3, $4, $5, $6)`, data, callback);
}

export const updateOne = (req, callback) => {
   const data = Object.values(req.body);
   
   query(`UPDATE donations 
   SET (hide_donor, amount, details) = ($4, $5, $6)
   WHERE donor = $1 AND campain = $2 AND group_name = $3
   RETURNING *`, data, callback);
}

export const removeOne = (req, callback) => {
   const data = Object.values(req.body);
   
   query(`DELETE FROM donations 
   WHERE donor = $1 AND campain = $2 AND group_name = $3
   RETURNING *`, data, callback);
}

export default {
   getByCampain, createOne, updateOne, removeOne
}
