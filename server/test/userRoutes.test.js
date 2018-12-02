import request from 'supertest';
import { expect } from 'chai';


import app from '../server';
import { testUser, clearTables } from './testData';

clearTables();

describe('POST /auth/signup  Sign up a user', () => {
  it('should sign up a new user and return authentication token', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(testUser)
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
      .send(testUser)
      .expect(409)
      .end(done);
  });
});

describe('POST /auth/login "Login user" ', () => {
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
        email: 'dinomelaye@gmail.com',
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
