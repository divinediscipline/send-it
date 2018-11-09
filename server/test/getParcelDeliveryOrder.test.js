import request from 'supertest';
import { expect } from 'chai';


import app from '../server';
import orderData from '../models/db/orderData';


describe('/GET an entry', () => {

  it('should return 400 if id is not a number', (done) => {
    request(app)
      .get('/api/v1/parcels/abcd')
      .expect(400)
      .end(done);
  });

  it('should return 404 if entry is not found', (done) => {
    request(app)
      .get('/api/v1/parcels/10')
      .expect(404)
      .end(done);
  });

  it('should return a diary entry', (done) => {
    request(app)
      .get('/api/v1/parcels/2')
      .expect(200)
      .expect((res) => {
        expect(res.body.foundOrder).to.deep.equal(orderData[1]);
      })
      .end(done);
  });
});
