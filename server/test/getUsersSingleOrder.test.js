// import request from 'supertest';
// import { expect } from 'chai';


// import app from '../server';
// import orderData from '../models/db/orderData';


// describe('/GET a users parcel delivery order', () => {

//   it('should return 400 if userId is not a number', (done) => {
//     request(app)
//       .get('/api/v1/users/abcd/1')
//       .expect(401)
//       .end(done);
//   });

//   it('should return 400 if parcelId is not a number', (done) => {
//     request(app)
//       .get('/api/v1/users/1/abcd')
//       .expect(401)
//       .end(done);
//   });

//   it('should return 404 if userId is not found', (done) => {
//     request(app)
//       .get('/api/v1/users/79/1')
//       .expect(401)
//       .end(done);
//   });

//   it('should return 404 if parcelId is not found', (done) => {
//     request(app)
//       .get('/api/v1/users/1/79')
//       .expect(401)
//       .end(done);
//   });

//   it('should return the users parcel delivery order', (done) => {
//     request(app)
//       .get('/api/v1/users/1/1')
//       .expect(201)
//       .expect((res) => {
//         expect(res.body.foundOrder).to.deep.equal(orderData[0]);
//       })
//       .end(done);
//   });
// });
