import express from 'express';
import cors from 'cors';
import { json } from "body-parser";
import morgan from 'morgan';

import config from './config';
import groupRouter from './resources/group/group.router';
import campainRouter from './resources/campain/campain.router';
import tagRouter from './resources/tag/tag.router';
import donationRouter from './resources/donation/donation.router';
import memberRouter from './resources/member/member.router';
import { jwtAuth, requireLogin, register, login, refreshToken } from './utils/middlewares';

const app = express();

app.disable('x-powered-by')

app.use(cors())
app.use(json());
app.use(morgan(config.MORGAN_FORMAT));
app.use(jwtAuth());

// API routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/refresh', refreshToken);
app.use('/api/group', groupRouter);
app.use('/api/campain', campainRouter);
app.use('/api/tag', tagRouter);
app.use('/api/donation', donationRouter);
app.use('/api/member', memberRouter);

export const start = async () => {
   try {
      app.listen(config.PORT, () => {
         console.log(`REST API on http://localhost:${config.PORT}/api`);
      });
   } catch (err) {
      console.error(err);
   }
}
