import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { Client } from 'pg';
import dotenv from 'dotenv';

import parcelDeliveryOrders from './routes/parcelDeliveryOrders';

const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', parcelDeliveryOrders);


app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the send-it API',
  v1: '/api/v1',
}));

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'phoenix123',
  port: 5432,
});
client.connect()
  .then(() => {
    console.log('connected successfully');
    const usersTable = `CREATE TABLE IF NOT EXISTS users
    (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) UNIQUE NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_on TIMESTAMPTZ DEFAULT now() NOT NULL
    );`;
    return client.query(usersTable);
  });

// Setup a default catch-all route
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome, Please kindly check your URL again to access the appropriate resource.',
}));

export default app;
