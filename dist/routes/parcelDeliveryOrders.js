'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _orders = require('../controllers/orders');

var _orders2 = _interopRequireDefault(_orders);

var _validateParcelOrder = require('../middleware/validateParcelOrder');

var _validateParcelOrder2 = _interopRequireDefault(_validateParcelOrder);

var _checkParcelId = require('../middleware/checkParcelId');

var _checkParcelId2 = _interopRequireDefault(_checkParcelId);

var _checkUserId = require('../middleware/checkUserId');

var _checkUserId2 = _interopRequireDefault(_checkUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Api routes
router.get('/parcels', _orders2.default.getParcelDeliveryOrders);
router.get('/parcels/:parcelId', _checkParcelId2.default, _orders2.default.getParcelDeliveryOrder);
router.get('/users/:userId/parcels', _checkUserId2.default, _orders2.default.getUserOrders);
router.put('/parcels/:parcelId/cancel', _checkParcelId2.default, _orders2.default.cancelParcelDeliveryOrder);
router.post('/parcels', _validateParcelOrder2.default, _orders2.default.createParcelDeliveryOrder);

exports.default = router;