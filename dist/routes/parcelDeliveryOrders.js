'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getParcelDeliveryOrders = require('../controllers/getParcelDeliveryOrders');

var _getParcelDeliveryOrders2 = _interopRequireDefault(_getParcelDeliveryOrders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Api routes
router.get('/parcels', _getParcelDeliveryOrders2.default);

exports.default = router;
//# sourceMappingURL=parcelDeliveryOrders.js.map