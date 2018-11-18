import { Client } from 'pg';
import dotenv from 'dotenv';


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'phoenix123',
  port: 5432,
});
client.connect()
  .then(() => {
    console.log('connected to database successfully');
  })
  .catch(() => {
    console.log('Unable to connect to database');
  });

export default client;
