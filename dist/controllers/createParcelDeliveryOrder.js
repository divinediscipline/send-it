'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _orderData = require('../models/db/orderData');

var _orderData2 = _interopRequireDefault(_orderData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createParcelDeliveryOrder = function createParcelDeliveryOrder(req, res) {
  var data = {
    parcelId: req.body.parcelId,
    userId: req.body.userId,
    sendersFirstName: req.body.sendersFirstName,
    sendersLastName: req.body.sendersLastName,
    sendersPhone: req.body.sendersPhone,
    parcelDescription: req.body.parcelDescription,
    weightCategory: req.body.weightCategory,
    price: req.body.price,
    createdAt: req.body.createdAt,
    pickUpLocation: req.body.pickUpLocation,
    destination: req.body.destination,
    packageTransitTime: req.body.packageTransitTime,
    receiversFirstName: req.body.receiversFirstName,
    receiversLastName: req.body.receiversLastName,
    receiversEmail: req.body.receiversEmail,
    receiversPhone: req.body.receiversPhone,
    status: req.body.status
  };

  var rules = {
    parcelId: 'required|numeric',
    userId: 'required|numeric',
    sendersFirstName: 'required|min:3|string|max:20',
    sendersLastName: 'required|min:3|string|max:20',
    sendersPhone: 'required|numeric',
    parcelDescription: 'required|min:3|string|max:100',
    weightCategory: 'required|min:3|string',
    price: 'required|numeric',
    createdAt: 'required|numeric',
    pickUpLocation: 'required|min:3|string|max:20',
    destination: 'required|min:3|string|max:20',
    packageTransitTime: 'required|min:3|string|max:20',
    receiversFirstName: 'required|min:3|string|max:20',
    receiversLastName: 'required|min:3|string|max:20',
    receiversEmail: 'required|email',
    receiversPhone: 'required|numeric',
    status: 'required|min:3|string|max:20'
  };

  var validation = new _validatorjs2.default(data, rules);

  if (validation.fails()) {
    res.status(400).json({
      message: validation.errors.all()
    });
  } else {
    _orderData2.default.push(data);
    res.status(201).json({
      message: 'order created successfully',
      newOrder: data
    });
  }
};

exports.default = createParcelDeliveryOrder;