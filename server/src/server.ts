import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import debug from 'debug';
import routes from './routes';
import connectDB from './db';


debug.enable('express');
const log = debug('express');
const app = express();

debug.enable('db');
const logDb = debug('db');
logDb('Loading database...');
connectDB();
logDb('Database loaded successfully');

log('Loading middleware...');
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
log('Middleware loaded successfully');

log('Loading routes...');
app.use(routes)
log('Routes loaded successfully');


export default app;