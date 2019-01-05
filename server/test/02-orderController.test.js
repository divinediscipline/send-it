// import request from 'supertest';
// import { expect } from 'chai';

// import app from '../server';
// import { testUser1, testOrder } from './testData';
// import client from '../models/db/dbconnect';

// // clearTablesIfExist();

// let userToken;
// let userid;

// // Empty database tables and sign up a user before each test
// beforeEach(async () => {
//   await client.query('TRUNCATE TABLE parcels, users');
//   const response = await request(app)
//     .post('/api/v1/auth/signup')
//     .send(testUser1);
//   // console.log('response', response.body);
//   userToken = response.body.token;
//   userid = response.body.user.userid;
// });


// describe('GET /users/:userId/parcels All parcel delivery orders by a specific user', () => {
//   it('should return 401 if no authentication token is provided by user', (done) => {
//     request(app)
//       .get(`/api/v1/users/${userid}/parcels`)
//       .expect(401)
//       .end(done);
//   });

//   it('should return 401 if an invalid authentication token is provided by user', (done) => {
//     request(app)
//       .get(`/api/v1/users/${userid}/parcels`)
//       .set('x-auth', `${userToken}gkgjy67`)
//       .expect(401)
//       .end(done);
//   });
//   it('should return 400 if userId is not a number', (done) => {
//     request(app)
//       .get(`/api/v1/users/${userid}/parcels`)
//       .expect(400)
//       .end(done);
//   });

//   it('should return 404 if userId is not found', (done) => {
//     request(app)
//       .get('/api/v1/users/10/parcels')
//       .expect(401)
//       .end(done);
//   });

//   it('should return all delivery orders by a specific user', (done) => {
//     request(app)
//       .get('/api/v1/users/3/parcels')
//       .expect(401)
//       .expect((res) => {
//         expect(res.body.foundOrders[0]).to.deep.equal(orderData[3]);
//       })
//       .end(done);
//   });
// });
