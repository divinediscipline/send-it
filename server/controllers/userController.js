import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import client from '../models/db/dbconnect';
import User from '../models/user';

class UserController {
  static signup(req, res) {
    const usersTable = `CREATE TABLE IF NOT EXISTS users
    (
      userId SERIAL PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_on TIMESTAMPTZ DEFAULT now() NOT NULL
    );`;
    return client.query(usersTable).then(() => {
      const sql = 'SELECT * FROM users WHERE email = $1';
      const params = [req.body.email];
      console.log('I am here');
      return client.query(sql, params);
    })
      .then((existingUser) => {
        // if there is no existing user with similar email, create one and hash password.
        if (!existingUser.rows[0]) {
          console.log('got here');
          const user = new User(req.body.email, req.body.password);
          console.log(user.email);
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hashedPassword) => {
              user.password = hashedPassword;
              console.log(user.password);
              const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)';
              const params = [req.body.firstName, req.body.lastName, user.email, user.password];
              console.log('inserted successfullly');
              console.log(req.body.firstName);
              return client.query(sql, params);
            });
          });
        } else {
          res.status(409).json({
            message: `The email ${req.body.email} already exists`,
          });
        }
      })
      .then(() => {
        jwt.sign({ email: req.body.email }, 'abc123', (err, token) => {
          if (err) {
            console.log('err', err);
            return;
          }
          res.header('x-auth', token).json({
            message: 'signed in successfully',
          });
        });
      })
      .catch((error) => {
        res.status(422).json({
          message: 'Error processing your request',
          error,
        });
      });
  }
}

export default UserController;
