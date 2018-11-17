'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _orderData = require('../models/db/orderData');

var _orderData2 = _interopRequireDefault(_orderData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('/PUT cancel a specific parcel delivery order', function () {

  it('should return 400 if parcelId is not a number', function (done) {
    (0, _supertest2.default)(_server2.default).put('/api/v1/parcels/abcd/cancel').expect(400).end(done);
  });

  it('should return 404 if parcelId is not found', function (done) {
    (0, _supertest2.default)(_server2.default).put('/api/v1/parcels/56/cancel').expect(404).end(done);
  });

  it('should return the cancelled parcel delivery order', function (done) {
    (0, _supertest2.default)(_server2.default).put('/api/v1/parcels/4/cancel').expect(200).expect(function (res) {
      (0, _chai.expect)(res.body.cancelledOrder[0]).to.deep.equal(_orderData2.default[3]);
    }).end(done);
  });
});