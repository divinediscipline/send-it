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
