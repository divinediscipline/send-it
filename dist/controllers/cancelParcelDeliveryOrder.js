'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orderData = require('../models/db/orderData');

var _orderData2 = _interopRequireDefault(_orderData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cancelParcelDeliveryOrder = function cancelParcelDeliveryOrder(req, res) {
  var parcelId = req.params.parcelId;


  if (!isNaN(parcelId)) {
    var foundOrder = _orderData2.default.filter(function (singleOrder) {
      return singleOrder.parcelId == parcelId;
    });
    if (foundOrder.length >= 1) {
      foundOrder.status = 'cancelled';
      res.status(200).json({
        message: 'Cancelled successfully',
        cancelledOrder: foundOrder
      });
    } else {
      res.status(404).json({
        message: 'Order not found'
      });
    }
  } else {
    res.status(400).json({
      message: 'ParcelId must be a number'
    });
  }
};

exports.default = cancelParcelDeliveryOrder;