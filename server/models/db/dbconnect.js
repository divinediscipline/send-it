import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbconnection = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
};
const dbconnectionTest = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASETEST,
  password: process.env.PG_PASSWORD,
  port: 5432,
};

// connectionString set to heroku-postgres database by default
let connectionString = process.env.DATABASE_URL;

const environment = process.env.NODE_ENV || 'development';
if (environment === 'development') {
  connectionString = dbconnection;
} else if (environment === 'test') {
  connectionString = dbconnectionTest;
}
console.log('environment***', environment);
const client = new Client(connectionString);
client.connect()
  .then(() => {
    console.log('connected to database successfully');
  })
  .catch(() => {
    console.log('Unable to connect to database');
  });

export default client;
