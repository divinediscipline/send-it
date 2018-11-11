'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _parcelDeliveryOrders = require('./routes/parcelDeliveryOrders');

var _parcelDeliveryOrders2 = _interopRequireDefault(_parcelDeliveryOrders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use('/api/v1', _parcelDeliveryOrders2.default);

app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Welcome to the send-it API',
    v1: '/api/v1'
  });
});

app.get('/v1', function (req, res) {
  return res.status(200).json({
    message: 'Welcome to version 1 of the send-it API'
  });
});

// Setup a default catch-all route
app.get('*', function (req, res) {
  return res.status(200).send({
    message: 'Welcome, Please kindly check your URL again to access the appropriate resource.'
  });
});

exports.default = app;