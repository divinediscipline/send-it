import request from 'supertest';
import { expect } from 'chai';

import app from '../server';
import orderData from '../models/db/orderData';

describe('/POST create a parcel delivery order', () => {
  it('should create a new parcel delivery order', (done) => {
    const testOrder = {
      parcelDescription: '1 bag of rice',
      pickUpLocation: 'Lagos state',
      destination: 'Abia state',
      receiversFirstName: 'Patience',
      receiversLastName: 'Abdul',
      receiversEmail: 'patience@gmail.com',
      receiversPhoneNumber: '08177648669',
    };

    request(app)
      .post('/api/v1/parcels')
      .send(testOrder)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      });
    done();
  });


  it('should not create a parcel delivery order with invalid data', (done) => {
    request(app)
      .post('/api/v1/parcels')
      .send()
      .expect(401)
      .end(done);
  });
});
