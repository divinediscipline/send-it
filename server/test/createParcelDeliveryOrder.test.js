import request from 'supertest';
import { expect } from 'chai';

import app from '../server';
import orderData from '../models/db/orderData';

describe('/POST create a parcel delivery order', () => {
  it('should create a new parcel delivery order', (done) => {
    const testOrder = {
      sendersFirstName: 'Patience',
      sendersLastName: 'Sikiru',
      sendersPhone: '08157585374',
      parcelDescription: '1 bag of rice',
      weightCategory: '50-99 kg',
      price: 20000,
      pickUpLocation: 'Lagos state',
      destination: 'Abia state',
      packageTransitTime: '5 hours',
      receiversFirstName: 'Patience',
      receiversLastName: 'Abdul',
      receiversEmail: 'patience@gmail.com',
      receiversPhone: '08177648669',
      status: 'Pending',
    };

    request(app)
      .post('/api/v1/parcels')
      .send(testOrder)
      .expect(201)
      .expect((res) => {
        expect(res.body.newOrder).to.exist;
      })
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
      .expect(400)
      .expect(() => {
        expect(orderData.length).to.equal(5);
      })
      .end(done);
  });
});
