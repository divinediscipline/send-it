import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const usersTable = `CREATE TABLE IF NOT EXISTS users
(
  userid SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  othernames VARCHAR(255) NOT NULL,
  phonenumber VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  registered TIMESTAMPTZ DEFAULT now() NOT NULL,
  isadmin boolean DEFAULT false
);`;

const parcelsTable = `CREATE TABLE IF NOT EXISTS parcels
(
  parcel_id SERIAL PRIMARY KEY,
  parceldescription VARCHAR(255) NOT NULL,
  weight float NOT NULL,
  weightmetric VARCHAR(255) NOT NULL,
  sentOn TIMESTAMPTZ DEFAULT now() NOT NULL,
  deliveredOn TIMESTAMPTZ DEFAULT now() NOT NULL,
  present_location VARCHAR(255) DEFAULT 'Not available' NOT NULL,
  status VARCHAR(20) DEFAULT 'Placed' NOT NULL,
  pickuplocation VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  receiversemail VARCHAR(100) NOT NULL,
  userid INTEGER NOT NULL,
  FOREIGN KEY (userid) REFERENCES users (userid) ON DELETE CASCADE
);`;
const dbconnection = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
};

const connectionString = process.env.DATABASE_URL || dbconnection;
const client = new Client(connectionString);
client.connect()
  .then(() => {
    console.log('connected to database successfully');
  }).then(() => {
    return client.query(usersTable).then(() => {

    }).then(() => {
      return client.query(parcelsTable);
    });
  })
  .catch(() => {
    console.log('Unable to connect to database');
  });

export default client;
