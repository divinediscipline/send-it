import request from 'supertest';
import { expect } from 'chai';


import app from '../server';
import orderData from '../models/db/orderData';


describe('/PUT cancel a specific parcel delivery order', () => {

  it('should return 400 if parcelId is not a number', (done) => {
    request(app)
      .put('/api/v1/parcels/abcd/cancel')
      .expect(400)
      .end(done);
  });

  it('should return 404 if parcelId is not found', (done) => {
    request(app)
      .put('/api/v1/parcels/56/cancel')
      .expect(404)
      .end(done);
  });

  it('should return the cancelled parcel delivery order', (done) => {
    request(app)
      .put('/api/v1/parcels/4/cancel')
      .expect(200)
      .expect((res) => {
        expect(res.body.cancelledOrder[0]).to.deep.equal(orderData[3]);
      })
      .end(done);
  });
});
