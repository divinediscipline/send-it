const { Client } = require('pg');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const usersTable = `CREATE TABLE IF NOT EXISTS users
(
  userid SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  phonenumber VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  registered TIMESTAMPTZ DEFAULT now() NOT NULL,
  isadmin boolean DEFAULT false
);`;

const parcelsTable = `CREATE TABLE IF NOT EXISTS parcels
(
  parcel_id SERIAL PRIMARY KEY,
  parceldescription VARCHAR(255) NOT NULL,
  weightmetric VARCHAR(255) NOT NULL,
  sentOn TIMESTAMPTZ DEFAULT now() NOT NULL,
  deliveredOn TIMESTAMPTZ DEFAULT now() NOT NULL,
  presentlocation VARCHAR(255) DEFAULT 'Not available' NOT NULL,
  status VARCHAR(20) DEFAULT 'Placed' NOT NULL,
  pickuplocation VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  receiversphonenumber VARCHAR(50) NOT NULL,
  receiversemail VARCHAR(100) NOT NULL,
  pickuptime VARCHAR(255) NOT NULL,
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
    return client.query(usersTable);
  }).then(() => {
    console.log('users table created');
    return client.query(parcelsTable);
  }).then(() => {
    console.log('parcels table created');
    signupAdmin();
  })
  .catch(() => {
    console.log('Unable to connect to database');
  });

function signupAdmin() {
  const user = {
    firstName: process.env.firstName,
    lastName: process.env.lastName,
    phoneNumber: process.env.phoneNumber,
    email: process.env.email,
    password: process.env.password,
    isAdmin: process.env.isAdmin,
  };
  const sql = 'SELECT * FROM users WHERE email = $1';
  const params = [user.email];
  client.query(sql, params).then((existingUser) => {
    if (!existingUser.rows[0]) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hashedPassword) => {
          user.password = hashedPassword;
          const sql = 'INSERT INTO users (firstname, lastname, phonenumber, email, password, isadmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
          const params = [user.firstName, user.lastName, user.phoneNumber, user.email, user.password, user.isAdmin];
          return client.query(sql, params).then(() => {
            console.log('admin seeded', user.firstName);
            process.exit(0);
          }).catch((error) => {
            console.log(error);
          });
        });
      });
    } else {
      process.exit(0);
    }
  });
}

module.exports = {
  signupAdmin, client,
};
