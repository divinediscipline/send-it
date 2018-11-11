'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _orderData = require('../models/db/orderData');

var _orderData2 = _interopRequireDefault(_orderData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('/POST create a parcel delivery order', function () {
  it('should create a new parcel delivery order', function (done) {
    var testOrder = {
      parcelId: 6,
      userId: 2,
      sendersFirstName: 'Patience',
      sendersLastName: 'Sikiru',
      sendersPhone: '08157585374',
      parcelDescription: '1 bag of rice',
      weightCategory: '50-99 kg',
      price: 20000,
      createdAt: 20180506143490000,
      pickUpLocation: 'Lagos state',
      destination: 'Abia state',
      packageTransitTime: '5 hours',
      receiversFirstName: 'Patience',
      receiversLastName: 'Abdul',
      receiversEmail: 'patience@gmail.com',
      receiversPhone: '08177648669',
      status: 'pending confirmation'
    };

    (0, _supertest2.default)(_server2.default).post('/api/v1/parcels').send(testOrder).expect(201).expect(function (res) {
      (0, _chai.expect)(res.body.newOrder).to.deep.equal(testOrder);
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }
    });
    done();
  });

  it('should not create a parcel delivery order with invalid data', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/v1/parcels').send().expect(400).expect(function () {
      (0, _chai.expect)(_orderData2.default.length).to.equal(5);
    }).end(done);
  });
});