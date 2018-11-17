'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateParcelOrder = function validateParcelOrder(req, res, next) {
  var data = {
    parcelDescription: req.body.parcelDescription,
    pickUpLocation: req.body.pickUpLocation,
    destination: req.body.destination,
    receiversFirstName: req.body.receiversFirstName,
    receiversLastName: req.body.receiversLastName,
    receiversEmail: req.body.receiversEmail,
    receiversPhoneNumber: req.body.receiversPhoneNumber
  };

  var rules = {
    parcelDescription: 'required|min:3|string|max:100',
    pickUpLocation: 'required|min:3|string|max:20',
    destination: 'required|min:3|string|max:20',
    receiversFirstName: 'required|min:3|string|alpha|max:20',
    receiversLastName: 'required|min:3|string|alpha|max:20',
    receiversEmail: 'required|email',
    receiversPhoneNumber: 'required|numeric'
  };

  var validation = new _validatorjs2.default(data, rules);

  if (validation.fails()) {
    res.status(400).json({
      message: validation.errors.all()
    });
  } else {
    next();
  }
};

exports.default = validateParcelOrder;