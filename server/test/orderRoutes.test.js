import request from 'supertest';
import { expect } from 'chai';

import app from '../server';
import { testUser, clearTablesIfExist, testOrder } from './testData';

clearTablesIfExist();
let userToken;
let userid;

// sign up a user before tests
before(async () => {
  const response = await request(app)
    .post('/api/v1/auth/signup')
    .send(testUser);
  console.log('response', response.body);
  userToken = response.body.token;
  userid = response.body.user.userid;
});

describe('POST /parcels "Create parcel delivery orders" ', () => {
  it('should not create a parcel delivery order if no authentication token is provided', (done) => {
    request(app)
      .post('/api/v1/parcels')
      .send(testOrder)
      .expect(401)
      .end(done);
  });

  it('should not create a new parcel delivery order with missing fields', (done) => {
    request(app)
      .post('/api/v1/parcels')
      .set('x-auth', userToken)
      .send()
      .expect(400)
      .end(done());
  });


  it('should create a parcel delivery order when user is signed up or logged in', (done) => {
    request(app)
      .post('/api/v1/parcels')
      .set('x-auth', userToken)
      .send(testOrder)
      .expect(201)
      .expect((res) => {
        expect(res.body).to.include.all.keys('data');
      })
      .end(done());
  });
});

describe('GET /users/:userId/parcels All parcel delivery orders by a specific user', () => {
  it('should return 401 if no authentication token is provided by user', (done) => {
    request(app)
      .get(`/api/v1/users/${userid}/parcels`)
      .expect(401)
      .end(done);
  });

  it('should return 401 if an invalid authentication token is provided by user', (done) => {
    request(app)
      .get(`/api/v1/users/${userid}/parcels`)
      .set('x-auth', `${userToken}gkgjy67`)
      .expect(401)
      .end(done);
  });
  // it('should return 400 if userId is not a number', (done) => {
  //   request(app)
  //     .get(`/api/v1/users/${userid}/parcels`)
  //     .expect(400)
  //     .end(done);
  // });

  // it('should return 404 if userId is not found', (done) => {
  //   request(app)
  //     .get('/api/v1/users/10/parcels')
  //     .expect(401)
  //     .end(done);
  // });

  // it('should return all delivery orders by a specific user', (done) => {
  //   request(app)
  //     .get('/api/v1/users/3/parcels')
  //     .expect(401)
  //     .expect((res) => {
  //       expect(res.body.foundOrders[0]).to.deep.equal(orderData[3]);
  //     })
  //     .end(done);
  // });
});
