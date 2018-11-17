'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _orderData = require('../models/db/orderData');

var _orderData2 = _interopRequireDefault(_orderData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Orders = function () {
  function Orders() {
    _classCallCheck(this, Orders);
  }

  _createClass(Orders, null, [{
    key: 'getParcelDeliveryOrders',
    value: function getParcelDeliveryOrders(req, res) {
      res.status(200).json({
        allParcelDeliveryOrders: _orderData2.default
      });
    }
  }, {
    key: 'getParcelDeliveryOrder',
    value: function getParcelDeliveryOrder(req, res) {
      var receivedParcelId = req.params.parcelId;
      var foundOrder = _orderData2.default.find(function (singleOrder) {
        return singleOrder.parcelId === +receivedParcelId;
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
    }
  }, {
    key: 'getUserOrders',
    value: function getUserOrders(req, res) {
      var userId = req.params.userId;

      var foundOrders = _orderData2.default.filter(function (singleOrder) {
        return singleOrder.userId === +userId;
      });
      if (foundOrders.length >= 1) {
        res.status(200).json({
          message: 'successful',
          foundOrders: foundOrders
        });
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
    }
  }, {
    key: 'createParcelDeliveryOrder',
    value: function createParcelDeliveryOrder(req, res) {
      var parcelId = _orderData2.default[_orderData2.default.length - 1].parcelId + 1;
      var userId = _orderData2.default[_orderData2.default.length - 1].userId + 1;
      var newOrder = {
        parcelId: parcelId,
        userId: userId,
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
        receiversPhone: req.body.receiversPhone,
        status: 'Pending'
      };
      _orderData2.default.push({
        newOrder: newOrder
      });
      res.status(201).json({
        message: 'order created successfully',
        newOrder: newOrder
      });
    }
  }, {
    key: 'cancelParcelDeliveryOrder',
    value: function cancelParcelDeliveryOrder(req, res) {
      var parcelId = req.params.parcelId;

      var foundOrder = _orderData2.default.filter(function (singleOrder) {
        return singleOrder.parcelId === +parcelId;
      });
      if (foundOrder.length >= 1) {
        if (foundOrder[0].status !== 'Cancelled' && foundOrder[0].status !== 'Delivered') {
          foundOrder[0].status = 'Cancelled';
          res.status(200).json({
            message: 'Cancelled successfully',
            cancelledOrder: foundOrder
          });
        } else {
          res.status(400).json({
            message: 'Cannot cancel order'
          });
        }
      } else {
        res.status(404).json({
          message: 'Order not found'
        });
      }
    }
  }]);

  return Orders;
}();

exports.default = Orders;