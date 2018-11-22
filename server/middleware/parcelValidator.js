import Validator from 'validatorjs';

import client from '../models/db/dbconnect';

class parcelValidator {
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

  static validateCancel(req, res, next) {
    const { parcelId } = req.params;
    if (req.body.status !== 'cancel') {
      return res.status(400).json({
        message: 'Invalid request. You can only input \'cancel\' ',
      });
    }
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
      if (result.rows[0].status === 'cancel') {
        return res.status(400).json({ message: 'order is already cancelled' });
      }
      return next();
    });
  }

  static validateStatusChange(req, res, next) {
    const correctEntries = ['Placed', 'Transiting', 'Delivered', 'Cancel'];
    const { status } = req.body;
    const { parcelId } = req.params;
    const sql = 'SELECT status FROM parcels WHERE parcel_id = $1';
    const params = [parcelId];
    return client.query(sql, params).then((result) => {
      if (!result.rows[0]) return res.status(404).json({ message: 'Order not found' });
      if (result.rows[0].status === 'delivered') return res.status(400).json({ message: 'You cannot change the status of an already delivered order' });
      if (!status) return res.status(400).json({ message: 'invalid request, new status is not provided' });
      if (!correctEntries.includes(status)) return res.status(400).json({ message: "Invalid status value. Value must be 'Placed', 'Delivered', 'Transiting' or 'Cancel'" });
      return next();
    });
  }

  static validateDestination(req, res, next) {
    const data = {
      destination: req.body.destination,
    };
    const rules = {
      destination: 'required|min:5|string|max:20',
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
      return next();
    });
  }

  static validateLocation(req, res, next) {
    const data = {
      present_location: req.body.present_location,
    };
    const rules = {
      present_location: 'required|min:5|string|max:20',
    };
    const validation = new Validator(data, rules);
    if (validation.fails()) {
      return res.status(400).json({
        message: validation.errors.all().present_location[0],
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
