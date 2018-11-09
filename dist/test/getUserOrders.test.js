'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _orderData = require('../models/db/orderData');

var _orderData2 = _interopRequireDefault(_orderData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('/GET all parcel delivery orders by a specific user', function () {

  it('should return 400 if userId is not a number', function (done) {
    (0, _supertest2.default)(_server2.default).get('/api/v1/users/abcd/parcels').expect(400).end(done);
  });

  it('should return 404 if userId is not found', function (done) {
    (0, _supertest2.default)(_server2.default).get('/api/v1/users/10/parcels').expect(404).end(done);
  });

  it('should return all delivery orders by a specific user', function (done) {
    (0, _supertest2.default)(_server2.default).get('/api/v1/users/3/parcels').expect(200).expect(function (res) {
      (0, _chai.expect)(res.body.foundOrders[0]).to.deep.equal(_orderData2.default[3]);
    }).end(done);
  });
});
//# sourceMappingURL=getUserOrders.test.js.map