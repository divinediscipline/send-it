'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orderData = require('../models/db/orderData');

var _orderData2 = _interopRequireDefault(_orderData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getParcelDeliveryOrders = function getParcelDeliveryOrders(req, res) {
  res.status(200).json({
    allParcelDeliveryOrders: _orderData2.default
  });
};

exports.default = getParcelDeliveryOrders;