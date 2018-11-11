'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getParcelDeliveryOrders = require('../controllers/getParcelDeliveryOrders');

var _getParcelDeliveryOrders2 = _interopRequireDefault(_getParcelDeliveryOrders);

var _getParcelDeliveryOrder = require('../controllers/getParcelDeliveryOrder');

var _getParcelDeliveryOrder2 = _interopRequireDefault(_getParcelDeliveryOrder);

var _getUserOrders = require('../controllers/getUserOrders');

var _getUserOrders2 = _interopRequireDefault(_getUserOrders);

var _cancelParcelDeliveryOrder = require('../controllers/cancelParcelDeliveryOrder');

var _cancelParcelDeliveryOrder2 = _interopRequireDefault(_cancelParcelDeliveryOrder);

var _createParcelDeliveryOrder = require('../controllers/createParcelDeliveryOrder');

var _createParcelDeliveryOrder2 = _interopRequireDefault(_createParcelDeliveryOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Api routes
router.get('/parcels', _getParcelDeliveryOrders2.default);
router.get('/parcels/:parcelId', _getParcelDeliveryOrder2.default);
router.get('/users/:userId/parcels', _getUserOrders2.default);
router.put('/parcels/:parcelId/cancel', _cancelParcelDeliveryOrder2.default);
router.post('/parcels', _createParcelDeliveryOrder2.default);

exports.default = router;