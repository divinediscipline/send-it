'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('/GET all parcel delivery orders', function () {
  it('should get all parcel delivery orders', function (done) {
    (0, _supertest2.default)(_server2.default).get('/api/v1/parcels').expect(200).expect(function (res) {
      (0, _chai.expect)(res.body.allParcelDeliveryOrders.length).to.equal(4);
    }).end(done);
  });
}); // require('babel-register');
//# sourceMappingURL=getParcelDeliveryOrders.test.js.map