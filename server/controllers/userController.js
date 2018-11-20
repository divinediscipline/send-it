import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import client from '../models/db/dbconnect';
import User from '../models/user';
import helpers from '../helpers/helpers';

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
      return client.query(sql, params);
    })
      .then((existingUser) => {
        // if there is no existing user with similar email, create one and hash password.
        if (!existingUser.rows[0]) {
          const user = new User(req.body.email, req.body.password);
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hashedPassword) => {
              user.password = hashedPassword;
              const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)';
              const params = [req.body.firstName, req.body.lastName, user.email, user.password];
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
        const token = helpers.generateAuthToken(req, res);
        res.header('x-auth', token).json({
          message: 'signed up successfully',
        });
      })
      .catch((error) => {
        res.status(422).json({
          message: 'Error processing your request',
          error,
        });
      });
  }

  static login(req, res) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [req.body.email];
    return client.query(sql, params).then((existingUser) => {
      if (existingUser.rows[0].email === req.body.email) {
        bcrypt.compare(req.body.password, existingUser.rows[0].password).then((result) => {
          if (result) {
            const token = helpers.generateAuthToken(req, res);
            res.header('x-auth', token).json({
              message: 'logged in successfully',
            });
          } else {
            res.status(400).json({
              message: 'email or password is incorrect.',
            });
          }
        })
          .catch((error) => {
            res.status(422).json({
              message: 'Error processing your request',
              error,
            });
          });
      } else {
        res.status(400).json({
          message: 'email or password is incorrect.',
        });
      }
    });
  }
}

export default UserController;
