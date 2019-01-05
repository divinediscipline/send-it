import request from 'supertest';
import { expect } from 'chai';
import bcrypt from 'bcryptjs';


import app from '../server';
// import { testUser, clearTables } from './testData';
import { testUser1, testUser2, testOrder, newTestDestination } from './testData';
import client from '../models/db/dbconnect';
import { getMaxListeners } from 'cluster';

let userToken;
let adminToken;
let useridForAdmin;
let userid;
let parcelId;

// Empty database tables, insert/seed an admin, sign up a user and create a parcel before each test
beforeEach(async () => {
  await client.query('TRUNCATE TABLE parcels, users');
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminPassword', salt);
    const sql = 'INSERT INTO users (firstname, lastname, phonenumber, email, password, isadmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const params = ['Peter', 'Obi', 78858754475, 'peterobi@gmail.com', hashedPassword, true];
    await client.query(sql, params);
  } catch (error) {
    console.log('could not seed admin', error);
  }

  const result1 = await request(app)
    .post('/api/v1/auth/login/admin')
    .send({
      email: 'peterobi@gmail.com',
      password: 'adminPassword',
    });
  adminToken = result1.body.token;
  useridForAdmin = result1.body.user.userid;

  const response = await request(app)
    .post('/api/v1/auth/signup')
    .send(testUser1);
  userToken = response.body.token;
  userid = response.body.user.userid;

  const result2 = await request(app)
    .post('/api/v1/parcels')
    .set('x-auth', userToken)
    .send(testOrder);
  parcelId = result2.body.data.parcelId;
});

describe('POST /auth/login/admin - Login admin', () => {
  it('should login admin and return authentication token', (done) => {
    request(app)
      .post('/api/v1/auth/login/admin')
      .send({
        email: 'peterobi@gmail.com',
        password: 'adminPassword',
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).to.exist;
        expect(res.body).to.include.all.keys('message', 'token', 'user');
      })
      .end(done);
  });

  it('should reject login if password is incorrect', (done) => {
    request(app)
      .post('/api/v1/auth/login/admin')
      .send({
        email: 'peterobi@gmail.com',
        password: 'wrongPassword',
      })
      .expect(401)
      .expect((res) => {
        expect(res.headers['x-auth']).to.not.exist;
      })
      .end(done);
  });

  it('should reject login if email is incorrect', (done) => {
    request(app)
      .post('/api/v1/auth/login/admin')
      .send({
        email: 'buhari@gmail.com',
        password: 'adminPassword',
      })
      .expect(401)
      .expect((res) => {
        expect(res.headers['x-auth']).to.not.exist;
      })
      .end(done);
  });

  it('should return validation errors if request is invalid', (done) => {
    request(app)
      .post('/api/v1/auth/login/admin')
      .send({
        email: 'peter.com',
        password: '123456',
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /auth/signup - Sign up a user', () => {
  it('should sign up a new user and return authentication token', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(testUser2)
      .expect(201)
      .expect((res) => {
        expect(res.headers['x-auth']).to.exist;
        expect(res.body).to.include.all.keys('message', 'token', 'user');
      })
      .end(done);
  });


  it('should return validation errors if request is invalid', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Dino',
        lastname: 'Melaye',
        username: 'dinomelaye',
        email: 'dino',
        password: '123456',
      })
      .expect(400)
      .end(done);
  });


  it('should not signup user if email is already in use', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(testUser1)
      .expect(409)
      .end(done);
  });
});

describe('POST /auth/login - Login user', () => {
  it('should login user and return authentication token', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'dino@gmail.com',
        password: '123456',
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).to.exist;
        expect(res.body).to.include.all.keys('message', 'token', 'user');
      })
      .end(done);
  });

  it('should reject login if password is incorrect', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'dino@gmail.com',
        password: '1234567',
      })
      .expect(401)
      .expect((res) => {
        expect(res.headers['x-auth']).to.not.exist;
      })
      .end(done);
  });

  it('should reject login if email is incorrect', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'buhari@gmail.com',
        password: '123456',
      })
      .expect(401)
      .expect((res) => {
        expect(res.headers['x-auth']).to.not.exist;
      })
      .end(done);
  });

  it('should return validation errors if request is invalid', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'dino.com',
        password: '123456',
      })
      .expect(400)
      .end(done);
  });
});

describe('GET users/:userId/profile - Retrieve user profile', () => {
  it('should retrieve the user profile information if userid exists', (done) => {
    request(app)
      .get(`/api/v1/users/${userid}/profile`)
      .set('x-auth', userToken)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.include.all.keys('message', 'data');
      })
      .end(done);
  });

  it('should reject request if user is not logged in', (done) => {
    request(app)
      .get(`/api/v1/users/${userid}/profile`)
      .expect(401)
      .expect((res) => {
        expect(res.body).to.include.all.keys('message');
      })
      .end(done);
  });

  it('should reject request if userid is not an integer', (done) => {
    request(app)
      .get('/api/v1/users/abc/profile')
      .set('x-auth', userToken)
      .expect(400)
      .expect((res) => {
        expect(res.body).to.include.all.keys('message');
      })
      .end(done);
  });
});

describe('POST /parcels - Create parcel delivery order', () => {
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
      .end(done);
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
      .end(done);
  });
});

describe('GET /users/:userId/parcels - Get all parcel delivery orders by a specific user', () => {
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
  it('should return 400 if userId is not a number', (done) => {
    request(app)
      .get('/api/v1/users/abc/parcels')
      .set('x-auth', userToken)
      .expect(400)
      .end(done);
  });

  it('should return 404 if userId is not found', (done) => {
    request(app)
      .get('/api/v1/users/1887987577770/parcels')
      .set('x-auth', userToken)
      .expect(401)
      .end(done);
  });

  it('should return all delivery orders by a specific user', (done) => {
    // console.log('****userid****', userid);
    request(app)
      .get(`/api/v1/users/${userid}/parcels`)
      .set('x-auth', userToken)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.include.all.keys('message', 'data');
        expect(res.body.data.length).to.equal(1);
      })
      .end(done);
  });
});

describe('GET /parcels/:parcelId - Get details of one/a delivery order for a particular user', () => {
  it('should return 401 if no authentication token is provided by user', (done) => {
    request(app)
      .get(`/api/v1/parcels/${parcelId}`)
      .expect(401)
      .end(done);
  });

  it('should return 401 if an invalid authentication token is provided by user', (done) => {
    request(app)
      .get(`/api/v1/parcels/${parcelId}`)
      .set('x-auth', `${userToken}gkgjy67`)
      .expect(401)
      .end(done);
  });

  it('should return 400 if parcelId is not a number', (done) => {
    request(app)
      .get('/api/v1/parcels/abc')
      .set('x-auth', userToken)
      .expect(400)
      .end(done);
  });

  it('should return 404 if parcelId is not found', (done) => {
    request(app)
      .get('/api/v1/parcels/644868675656')
      .set('x-auth', userToken)
      .expect(404)
      .end(done);
  });

  it('should return the correct details of the requested delivery order', (done) => {
    // console.log('****userid****', userid);
    request(app)
      .get(`/api/v1/parcels/${parcelId}`)
      .set('x-auth', userToken)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.include.all.keys('message', 'data');
      })
      .end(done);
  });
});

describe('PUT /parcels/:parcelId/cancel - Cancel a particular delivery order', () => {
  it('should return 401 if no authentication token is provided by user', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/cancel`)
      .expect(401)
      .expect((res) => {
        expect(res.body).to.exist;
      })
      .end(done);
  });

  it('should return 401 if an invalid authentication token is provided by user', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/cancel`)
      .set('x-auth', `${userToken}gkgjy67`)
      .expect(401)
      .end(done);
  });

  it('should return 400 if parcelId is not a number', (done) => {
    request(app)
      .put('/api/v1/parcels/abc/cancel')
      .set('x-auth', userToken)
      .expect(400)
      .end(done);
  });

  it('should return 404 if parcelId is not found', (done) => {
    request(app)
      .put('/api/v1/parcels/7454744846/cancel')
      .set('x-auth', userToken)
      .expect(404)
      .end(done);
  });

  it('should set the status of the particular delivery order to Cancelled', (done) => {
    // console.log('****userid****', userid);
    request(app)
      .put(`/api/v1/parcels/${parcelId}/cancel`)
      .set('x-auth', userToken)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.include.all.keys('data');
        expect(res.body.data.status).to.equal('Cancelled');
      })
      .end(done);
  });
});

describe('PUT /parcels/:parcelId/destination - Update the destination of a particular delivery order', () => {
  it('should return 401 if no authentication token is provided by user', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/destination`)
      .send(newTestDestination)
      .expect(401)
      .expect((res) => {
        expect(res.body).to.exist;
      })
      .end(done);
  });

  it('should return 401 if an invalid authentication token is provided by user', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/destination`)
      .send(newTestDestination)
      .set('x-auth', `${userToken}gkgjy67`)
      .expect(401)
      .end(done);
  });

  it('should return 404 if parcelId is not a number', (done) => {
    request(app)
      .put('/api/v1/parcels/abc/destination')
      .send(newTestDestination)
      .set('x-auth', userToken)
      .expect(404)
      .expect((res) => {
        expect(res.body).to.include.all.keys('message');
      })
      .end(done);
  });

  it('should return 404 if parcelId is not found', (done) => {
    request(app)
      .put('/api/v1/parcels/7454744846/destination')
      .send(newTestDestination)
      .set('x-auth', userToken)
      .expect(404)
      .end(done);
  });

  it('should return 400 if no destination details is provided', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/destination`)
      .send()
      .set('x-auth', userToken)
      .expect(400)
      .end(done);
  });

  it('should update the previous destination of a particular delivery order with the new destination details', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/destination`)
      .send(newTestDestination)
      .set('x-auth', userToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).to.include.all.keys('parcel_id', 'destination', 'message');
      })
      .end(done);
  });
});

describe('PUT /parcels/:parcelId/status - Update the status of a particular delivery order', () => {
  it('should return 401 if no authentication token is provided by user', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .send({ status: 'Transiting' })
      .expect(401)
      .expect((res) => {
        expect(res.body).to.exist;
      })
      .end(done);
  });

  it('should return 401 if an invalid authentication token is provided by user', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .send({ status: 'Transiting' })
      .set('x-auth', `${adminToken}gkgjy67`)
      .expect(401)
      .end(done);
  });

  it('should reject update if request is not made by an admin', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .send({ status: 'Transiting' })
      .set('x-auth', userToken)
      .expect(401)
      .end(done);
  });

  it('should return 400 if parcelId is not a number', (done) => {
    request(app)
      .put('/api/v1/parcels/abc/status')
      .send({ status: 'Transiting' })
      .set('x-auth', adminToken)
      .expect(400)
      .end(done);
  });

  it('should return 404 if parcelId is not found', (done) => {
    request(app)
      .put('/api/v1/parcels/7456/status')
      .send({ status: 'Transiting' })
      .set('x-auth', adminToken)
      .expect(404)
      .end(done);
  });

  it('should return 400 if no new status is provided', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .set('x-auth', adminToken)
      .expect(400)
      .expect((res) => {
        expect(res.body).to.include.all.keys('message');
      })
      .end(done);
  });

  it('should set the status of the particular delivery order to Transiting', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .send({ status: 'Transiting' })
      .set('x-auth', adminToken)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.include.all.keys('data');
        expect(res.body.data.status).to.equal('Transiting');
      })
      .end(done);
  });

  it('should set the status of the particular delivery order to Delivered', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .send({ status: 'Delivered' })
      .set('x-auth', adminToken)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.include.all.keys('data');
        expect(res.body.data.status).to.equal('Delivered');
      })
      .end(done);
  });

  it('should set the status of the particular delivery order to Cancelled', (done) => {
    request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .send({ status: 'Cancelled' })
      .set('x-auth', adminToken)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.include.all.keys('data');
        expect(res.body.data.status).to.equal('Cancelled');
      })
      .end(done);
  });
});
