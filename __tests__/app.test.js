const { getUser, getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'spot@dogs.com',
        password: 'spotWasHere'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'spot@dogs.com',
          __v: 0
        });
      });
  });
});
