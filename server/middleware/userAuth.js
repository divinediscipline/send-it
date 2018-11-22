import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import client from '../models/db/dbconnect';

dotenv.config();

class UserAuth {
  static authenticateAdmin(req, res, next) {
    const token = req.header('x-auth');
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized. Please sign up or log in to make requests',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.isadmin) {
        return next();
      }
      return res.status(401).json({
        message: 'Unauthorized. You do not have the correct credentials',
      });
    } catch (error) {
      return res.status(401).json({
        message: 'Token is invald. Please sign up or log in',
      });
    }
  }

  static authenticate(req, res, next) {
    const token = req.header('x-auth');
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized. Please sign up or log in to make requests',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const sql = 'SELECT userid FROM users WHERE userid = $1';
      const params = [decoded.id];
      return client.query(sql, params).then((result) => {
        if (result.rows[0]) {
          req.body.decoded = decoded;
          return next();
        }
      });
    } catch (error) {
      return res.status(401).json({
        message: 'Token is invald. Please sign up or log in',
      });
    }
  }

  static verifyId(req, res, next) {
    const token = req.header('x-auth');
    const { parcelId } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET);
    if (decoded.id.toString() === parcelId) {
      next();
    } else {
      res.status(401).json({
        message: 'Token is invald for requested resource. Please sign up or log in',
      });
    }
  }
}

export default UserAuth;
