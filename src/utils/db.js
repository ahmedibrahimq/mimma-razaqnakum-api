import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({ connectionString: config.URI});

export const query = (text, params = [], callback) => {
   pool.query(text, params, callback);
};
