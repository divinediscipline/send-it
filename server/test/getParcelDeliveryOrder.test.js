import request from 'supertest';
import { expect } from 'chai';


import app from '../server';
import orderData from '../models/db/orderData';


describe('/GET a specific parcel delivery order', () => {

  it('should return 400 if parcelId is not a number', (done) => {
    request(app)
      .get('/api/v1/parcels/abcd')
      .expect(400)
      .end(done);
  });

  it('should return 404 if parcelId is not found', (done) => {
    request(app)
      .get('/api/v1/parcels/10')
      .expect(404)
      .end(done);
  });

  it('should return a specific parcel delivery order', (done) => {
    request(app)
      .get('/api/v1/parcels/2')
      .expect(200)
      .expect((res) => {
        expect(res.body.foundOrder).to.deep.equal(orderData[1]);
      })
      .end(done);
  });
});
