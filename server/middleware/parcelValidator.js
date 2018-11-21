import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';

import client from '../models/db/dbconnect';

class parcelValidator {
  static authenticate(req, res, next) {
    console.log('this is working');
    const token = req.header('x-auth');
    if (!token) {
      res.status(401).json({
        message: 'Unauthorized. You need to sign in',
      });
    }
    try {
      const decoded = jwt.verify(token, 'abc123');
      const sql = 'SELECT userid FROM users WHERE userid = $1';
      const params = [decoded.id];
      return client.query(sql, params).then((result) => {
        if (result.rows[0]) {
          req.body.decoded = decoded;
          next();
        }
      });
    } catch (error) {
      res.status(401).json({
        message: 'Token is invald. Please sign up or log in',
      });
    }
  }

  static validateParcelOrder(req, res, next) {
    const data = {
      parceldescription: req.body.parceldescription,
      weight: req.body.weight,
      weightmetric: req.body.weightmetric,
      pickuplocation: req.body.pickuplocation,
      destination: req.body.destination,
      receiversemail: req.body.receiversemail,
    };

    const rules = {
      parceldescription: 'required|min:3|string|max:100',
      weight: 'required|numeric',
      weightmetric: 'required|min:3|string|max:100',
      pickuplocation: 'required|min:3|string|max:20',
      destination: 'required|min:3|string|max:20',
      receiversemail: 'required|email',
    };

    const validation = new Validator(data, rules);

    if (validation.fails()) {
      res.status(400).json({
        message: validation.errors.all(),
      });
    } else {
      next();
    }
  }

  static validateSignup(req, res, next) {
    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othernames: req.body.othernames,
      phonenumber: req.body.phonenumber,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const rules = {
      firstname: 'required|min:3|string|alpha|max:20',
      lastname: 'required|min:3|string|alpha|max:20',
      othernames: 'required|min:3|string|alpha|max:20',
      phonenumber: 'required|numeric',
      username: 'required|min:3|string|max:20',
      email: 'required|email',
      password: 'required|min:4|max:20',
    };

    const validation = new Validator(data, rules);

    if (validation.fails()) {
      res.status(400).json({
        message: validation.errors.all(),
      });
    } else {
      next();
    }
  }

  static validateLogin(req, res, next) {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    const rules = {
      email: 'required|email',
      password: 'required|min:4|max:20',
    };

    const validation = new Validator(data, rules);

    if (validation.fails()) {
      res.status(400).json({
        message: validation.errors.all(),
      });
    } else {
      next();
    }
  }
}

export default parcelValidator;
