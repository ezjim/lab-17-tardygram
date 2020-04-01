const { getUser, getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'jimmy',
        password: 'jimmywashere',
        profilePhotoUrl: 'www.url.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'jimmy',
          profilePhotoUrl: 'www.url.com',
          __v: 0
        });
      });
  });

  it('logs in a user', async() => {
    const user = await getUser({ username: 'jimmy' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: user.username,
        password: 'jimmywashere',
        profilePhotoUrl: 'www.url.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'jimmy',
          profilePhotoUrl: 'www.url.com',
          __v: 0
        });
      });
  });

  it('verifies a logged in user', () => {
    return getAgent()
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'jimmy',
          profilePhotoUrl: 'www.url.com',
          __v: 0
        });
      });
  });
});

