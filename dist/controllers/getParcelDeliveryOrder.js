'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orderData = require('../models/db/orderData');

var _orderData2 = _interopRequireDefault(_orderData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getParceDeliveryOrder = function getParceDeliveryOrder(req, res) {
  var parcelId = req.params.parcelId;

  if (!isNaN(parcelId)) {
    var foundOrder = _orderData2.default.find(function (singleOrder) {
      return singleOrder.parcelId == parcelId;
    });

    if (foundOrder) {
      res.status(200).json({
        message: 'successful',
        foundOrder: foundOrder
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

exports.default = getParceDeliveryOrder;
//# sourceMappingURL=getParcelDeliveryOrder.js.map