'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orderData = require('../models/db/orderData');

var _orderData2 = _interopRequireDefault(_orderData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserOrders = function getUserOrders(req, res) {
  var userId = req.params.userId;

  if (!isNaN(userId)) {
    var foundOrders = _orderData2.default.filter(function (singleOrder) {
      return singleOrder.userId == userId;
    });

    if (foundOrders.length >= 1) {
      res.status(200).json({
        message: 'successful',
        foundOrders: foundOrders
      });
    } else {
      res.status(404).json({
        message: 'Order not found'
      });
    }
  } else {
    res.status(400).json({
      message: 'Bad ID request format'
    });
  }
};

exports.default = getUserOrders;
//# sourceMappingURL=getUserOrders.js.map