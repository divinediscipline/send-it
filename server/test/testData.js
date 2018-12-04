import bcrypt from 'bcryptjs';
import request from 'supertest';
// import { expect } from 'chai';

import client from '../models/db/dbconnect';
import app from '../server';

const testUser = {
  firstname: 'Dino',
  lastname: 'Melaye',
  username: 'dinomelaye',
  email: 'dino@gmail.com',
  password: '123456',
  phonenumber: 8076885868,
  othernames: 'Joshua',
};

const testOrder = {
  parceldescription: '1 bag of rice',
  weight: 34.7,
  weightmetric: '20 kg',
  pickuplocation: 'Abia state',
  destination: 'Lagos state',
  receiversemail: 'patience@gmail.com',
};

const clearTables = () => {
  before(async () => {
    await client.query('TRUNCATE TABLE parcels, users');
  });
};

const clearTablesIfExist = () => {
  before(async () => {
    const found = await client.query('SELECT to_regclass(\'parcels\')');
    if (found.rows[0].to_regclass) {
      await client.query('TRUNCATE TABLE parcels, users');
    }
  });
};
// const addUser = () => {
//   before(async () => {
//     const result = await request(app)
//       .post('/api/v1/parcels')
//       .send(testUser)
//     result.body.token = userToken;
//   });
// };
const addAdmin = () => {
  console.log('got here1*****', testUser.password);
  before((done) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(testUser.password, salt, (err, hashedPassword) => {
        if (err) {
          console.log(err);
        }
        testUser.password = hashedPassword;
        console.log(testUser.password);
        console.log('got here*****', testUser.password);
      });
    });
    const sql = 'INSERT INTO users (firstname, lastname, othernames, phonenumber, username, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const params = [testUser.firstname, testUser.lastname, testUser.othernames, testUser.phonenumber, testUser.username, testUser.email, testUser.password];
    client.query(sql, params).catch(err => console.log(err));
    done();
  });
};

export {
  testOrder, testUser, clearTables, clearTablesIfExist,
};
