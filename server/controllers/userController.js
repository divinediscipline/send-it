import bcrypt from 'bcryptjs';

import client from '../models/db/dbconnect';
import helpers from '../helpers/helpers';

class UserController {
  static signup(req, res) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [req.body.email];
    return client.query(sql, params).then((existingUser) => {
      // if there is no existing user with similar email, create one and hash password.
      if (!existingUser.rows[0]) {
        const user = {
          email: req.body.email,
          password: req.body.password,
        };
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            user.password = hashedPassword;
            const sql = 'INSERT INTO users (firstname, lastname, phonenumber, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const params = [req.body.firstname, req.body.lastname, req.body.phonenumber, user.email, user.password];
            return client.query(sql, params).then((existingUser) => {
              const newUser = {
                userid: existingUser.rows[0].userid,
                firstname: existingUser.rows[0].firstname,
                lastname: existingUser.rows[0].lastname,
                phonenumber: existingUser.rows[0].phonenumber,
                email: existingUser.rows[0].email,
                registered: existingUser.rows[0].registered,
                isadmin: existingUser.rows[0].isadmin,
              };
              const token = helpers.generateAuthToken(existingUser.rows[0].userid, existingUser.rows[0].email, existingUser.rows[0].isadmin);
              return res.status(201).header('x-auth', token).json({
                message: 'signed up successfully',
                token,
                user: newUser,
              });
            });
          });
        });
      } else {
        res.status(409).json({
          message: `The email ${req.body.email} already exists`,
        });
      }
    })
      .catch((error) => {
        return res.status(500).json({
          message: 'Error processing your request',
          error,
        });
      });
  }

  static login(req, res) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [req.body.email];
    return client.query(sql, params).then((existingUser) => {
      if (!existingUser.rows[0]) {
        return res.status(401).json({
          message: 'email or password is incorrect.',
        });
      }
      if (existingUser.rows[0].email === req.body.email) {
        const returnedUser = {
          userid: existingUser.rows[0].userid,
          firstname: existingUser.rows[0].firstname,
          lastname: existingUser.rows[0].lastname,
          othernames: existingUser.rows[0].othernames,
          phonenumber: existingUser.rows[0].phonenumber,
          email: existingUser.rows[0].email,
          username: existingUser.rows.username,
          registered: existingUser.rows[0].registered,
          isadmin: existingUser.rows[0].isadmin,
        };
        return bcrypt.compare(req.body.password, existingUser.rows[0].password).then((result) => {
          if (result) {
            const token = helpers.generateAuthToken(existingUser.rows[0].userid, existingUser.rows[0].email, existingUser.rows[0].isadmin);
            return res.status(200).header('x-auth', token).json({
              message: `logged in successfully, welcome back ${existingUser.rows[0].firstname}`,
              token,
              user: returnedUser,
            });
          }
          return res.status(401).json({
            message: 'email or password is incorrect.',
          });
        });
      }
    }).catch((error) => {
      res.status(500).json({
        message: 'Error processing your request',
        error,
      });
    });
  }


  static signupAdmin(req, res) {
    console.log('working');
    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [req.body.email];
    return client.query(sql, params).then((existingUser) => {
      // if there is no existing user with similar email, create one and hash password.
      if (!existingUser.rows[0]) {
        if (!req.body.isadmin) {
          return res.status(400).json({
            message: 'input field for admin is invalid or does not exist',
          });
        }
        const user = {
          email: req.body.email,
          password: req.body.password,
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            user.password = hashedPassword;
            const sql = 'INSERT INTO users (firstname, lastname, othernames, phonenumber, username, email, password, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
            const params = [req.body.firstname, req.body.lastname, req.body.othernames, req.body.phonenumber, req.body.username, user.email, user.password, req.body.isadmin];
            return client.query(sql, params).then((answer) => {
              const adminUser = {
                userid: answer.rows[0].userid,
                firstname: answer.rows[0].firstname,
                lastname: answer.rows[0].lastname,
                othernames: answer.rows[0].othernames,
                phonenumber: answer.rows[0].phonenumber,
                email: answer.rows[0].email,
                username: answer.rows.username,
                registered: answer.rows[0].registered,
                isadmin: answer.rows[0].isadmin,
              };
              const token = helpers.generateAuthToken(answer.rows[0].userid, answer.rows[0].email, answer.rows[0].isadmin);
              return res.status(201).header('x-auth', token).json({
                message: 'signed up successfully',
                token,
                AdminUser: adminUser,
              });
            });
          });
        });
      } else {
        res.status(409).json({
          message: `The email ${req.body.email} already exists`,
        });
      }
    })
      .catch((error) => {
        return res.status(500).json({
          message: 'Error processing your request',
          error,
        });
      });
  }

  static loginAdmin(req, res) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [req.body.email];
    return client.query(sql, params).then((existingUser) => {
      if (existingUser.rows[0].email === req.body.email) {
        if (!existingUser.rows[0].isadmin) {
          return res.status(401).json({
            message: 'Access denied.Only admins can do this',
          });
        }
        const returnedUser = {
          userid: existingUser.rows[0].userid,
          firstname: existingUser.rows[0].firstname,
          lastname: existingUser.rows[0].lastname,
          othernames: existingUser.rows[0].othernames,
          phonenumber: existingUser.rows[0].phonenumber,
          email: existingUser.rows[0].email,
          username: existingUser.rows.username,
          registered: existingUser.rows[0].registered,
          isadmin: existingUser.rows[0].isadmin,
        };
        return bcrypt.compare(req.body.password, existingUser.rows[0].password).then((result) => {
          if (result) {
            const token = helpers.generateAuthToken(existingUser.rows[0].userid, existingUser.rows[0].email, existingUser.rows[0].isadmin);
            return res.status(200).header('x-auth', token).json({
              message: `logged in successfully, welcome back ${existingUser.rows[0].firstname}`,
              token,
              user: returnedUser,
            });
          }
          return res.status(401).json({
            message: 'email or password is incorrect.',
          });
        });
      }
      return res.status(401).json({
        message: 'email or password is incorrect.',
      });
    }).catch((error) => {
      res.status(500).json({
        message: 'Error processing your request',
        error,
      });
    });
  }
}

export default UserController;
