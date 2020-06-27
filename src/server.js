import express from 'express';
import cors from 'cors';
import { json } from "body-parser";
import morgan from 'morgan';

import config from './config';

const app = express();

app.disable('x-powered-by')

app.use(cors())
app.use(json());
app.use(morgan(config.MORGAN_FORMAT));

export const start = async () => {
   try {
      app.listen(config.PORT, () => {
         console.log(`REST API on http://localhost:${config.PORT}/api`);
      });
   } catch (err) {
      console.error(err);
   }
}
