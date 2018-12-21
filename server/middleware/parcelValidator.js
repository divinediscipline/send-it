import Validator from 'validatorjs';

import client from '../models/db/dbconnect';

class parcelValidator {
  static validateParcelOrder(req, res, next) {
    const data = {
      parceldescription: req.body.parceldescription,
      weightmetric: req.body.weightmetric,
      pickuplocation: req.body.pickuplocation,
      destination: req.body.destination,
      receiversemail: req.body.receiversemail,
      receiversphonenumber: req.body.receiversphonenumber,
      pickuptime: req.body.pickuptime,
      presentlocation: req.body.presentlocation,
    };

    const rules = {
      parceldescription: 'required|min:3|string',
      weightmetric: 'required|min:3|string|max:100',
      pickuplocation: 'required|min:3|string',
      destination: 'required|min:3|string',
      receiversemail: 'required|email',
      receiversphonenumber: 'required|numeric',
      pickuptime: 'required|min:3|string|max:100',
      presentlocation: 'required|min:3|string',
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
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation,
    };

    const rules = {
      firstname: 'required|min:3|string|alpha|max:20',
      lastname: 'required|min:3|string|alpha|max:20',
      phonenumber: 'required|numeric',
      email: 'required|email',
      password: 'required|min:4|max:20|confirmed',
      password_confirmation: 'required',
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

  static validateCancel(req, res, next) {
    const { parcelId } = req.params;
    const sql = 'SELECT status FROM parcels WHERE parcel_id = $1';
    const params = [parcelId];
    return client.query(sql, params).then((result) => {
      if (!result.rows[0]) {
        return res.status(404).json({
          message: 'Order not found',
        });
      }
      if (result.rows[0].status === 'delivered') {
        return res.status(400).json({ message: 'Cannot cancel an already delivered order' });
      }
      if (result.rows[0].status === 'Cancelled') {
        return res.status(400).json({ message: 'order is already cancelled' });
      }
      return next();
    });
  }

  static validateStatusChange(req, res, next) {
    const correctEntries = ['Placed', 'Transiting', 'Delivered', 'Cancelled'];
    const { status } = req.body;
    const { parcelId } = req.params;
    const sql = 'SELECT status FROM parcels WHERE parcel_id = $1';
    const params = [parcelId];
    return client.query(sql, params).then((result) => {
      if (!result.rows[0]) return res.status(404).json({ message: 'Order not found' });
      if (result.rows[0].status === 'delivered') return res.status(400).json({ message: 'You cannot change the status of an already delivered order' });
      if (!status) return res.status(400).json({ message: 'invalid request, new status is not provided' });
      if (!correctEntries.includes(status)) return res.status(400).json({ message: "Invalid status value. Value must be 'Placed', 'Delivered', 'Transiting' or 'Cancelled'" });
      return next();
    });
  }

  static validateDestination(req, res, next) {
    const data = {
      destination: req.body.destination,
    };
    const rules = {
      destination: 'required|min:5|string|max:500',
    };
    const validation = new Validator(data, rules);
    if (validation.fails()) {
      return res.status(400).json({
        message: validation.errors.all().destination[0],
      });
    }
    const { parcelId } = req.params;
    const sql = 'SELECT status FROM parcels WHERE parcel_id = $1';
    const params = [parcelId];
    return client.query(sql, params).then((result) => {
      if (!result.rows[0]) return res.status(404).json({ message: 'Order not found' });
      if (result.rows[0].status === 'Delivered') return res.status(400).json({ message: 'You cannot change the destination of an already delivered order' });
      if (result.rows[0].status === 'Cancelled') return res.status(400).json({ message: 'You cannot change the destination of a cancelled order' });
      return next();
    });
  }

  static validateLocation(req, res, next) {
    const data = {
      presentlocation: req.body.presentlocation,
    };
    const rules = {
      presentlocation: 'required|min:2|string|max:20',
    };
    const validation = new Validator(data, rules);
    if (validation.fails()) {
      return res.status(400).json({
        message: validation.errors.all().presentlocation[0],
      });
    }
    const { parcelId } = req.params;
    const sql = 'SELECT status FROM parcels WHERE parcel_id = $1';
    const params = [parcelId];
    return client.query(sql, params).then((result) => {
      if (!result.rows[0]) return res.status(404).json({ message: 'Order not found' });
      if (result.rows[0].status === 'Delivered') return res.status(400).json({ message: 'You cannot change the present location of an already delivered order' });
      return next();
    });
  }
}

export default parcelValidator;
