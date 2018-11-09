import request from 'supertest';
import { expect } from 'chai';


import app from '../server';
import orderData from '../models/db/orderData';


describe('/GET all parcel delivery orders by a specific user', () => {

  it('should return 400 if userId is not a number', (done) => {
    request(app)
      .get('/api/v1/users/abcd/parcels')
      .expect(400)
      .end(done);
  });

  it('should return 404 if userId is not found', (done) => {
    request(app)
      .get('/api/v1/users/10/parcels')
      .expect(404)
      .end(done);
  });

  it('should return all delivery orders by a specific user', (done) => {
    request(app)
      .get('/api/v1/users/3/parcels')
      .expect(200)
      .expect((res) => {
        expect(res.body.foundOrders[0]).to.deep.equal(orderData[3]);
      })
      .end(done);
  });
});
