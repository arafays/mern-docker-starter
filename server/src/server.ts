import express, { json, urlencoded, type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import debug from 'debug';
import routes from './routes';
import connectDB from './db';

export const createServer = (): Express => {
  debug.enable('express');
  const log = debug('express');
  const app = express();

  connectDB();

  log('Loading middleware...');
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(urlencoded({ extended: true }));
  app.use(json())
  app.use(morgan('dev'));
  log('Middleware loaded successfully');

  log('Loading routes...');
  app.use(routes)
  log('Routes loaded successfully');


  return app
}