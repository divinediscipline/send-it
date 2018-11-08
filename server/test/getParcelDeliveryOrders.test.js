// require('babel-register');

import request from 'supertest';
import { expect } from 'chai';

import app from '../server';

describe('/GET all parcel delivery orders', () => {
  it('should get all parcel delivery orders', (done) => {
    request(app)
      .get('/api/v1/parcels')
      .expect(200)
      .expect((res) => {
        expect(res.body.allParcelDeliveryOrders.length).to.equal(4);
      })
      .end(done);
  });
});
