'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateParcelOrder = function validateParcelOrder(req, res, next) {
  var data = {
    sendersFirstName: req.body.sendersFirstName,
    sendersLastName: req.body.sendersLastName,
    sendersPhone: req.body.sendersPhone,
    parcelDescription: req.body.parcelDescription,
    weightCategory: req.body.weightCategory,
    price: req.body.price,
    pickUpLocation: req.body.pickUpLocation,
    destination: req.body.destination,
    packageTransitTime: req.body.packageTransitTime,
    receiversFirstName: req.body.receiversFirstName,
    receiversLastName: req.body.receiversLastName,
    receiversEmail: req.body.receiversEmail,
    receiversPhone: req.body.receiversPhone
  };

  var rules = {
    sendersFirstName: 'required|min:3|string|max:20',
    sendersLastName: 'required|min:3|string|max:20',
    sendersPhone: 'required|numeric',
    parcelDescription: 'required|min:3|string|max:100',
    weightCategory: 'required|min:3|string',
    price: 'required|numeric',
    pickUpLocation: 'required|min:3|string|max:20',
    destination: 'required|min:3|string|max:20',
    packageTransitTime: 'required|min:3|string|max:20',
    receiversFirstName: 'required|min:3|string|max:20',
    receiversLastName: 'required|min:3|string|max:20',
    receiversEmail: 'required|email',
    receiversPhone: 'required|numeric'
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