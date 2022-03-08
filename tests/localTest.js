var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;

const baseUrl = 'http://localhost:3001';

describe('get questions endpoint', () => {
  it('should return a 200 status code', async () => {
    const response = await request(baseUrl)
    .get('/qa/questions?product_id=1');
    expect(response.statusCode).to.equal(200);
    // expect(response.body).to.be.an('array');
  });

  it('should return an arr', async () => {
    const response = await request(baseUrl)
    .get('/qa/questions?product_id=1');
    // expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('array');
  });
})

describe('post a question endpoint', () => {
  it('should return a 201 status code', async () => {
    const response = await request(baseUrl)
    .post('/qa/questions/')
    .send({
      body: 'hi',
      name: 'vi',
      email: 'vi@gmail.com',
      product_id: '20',
    });
    expect(response.statusCode).to.equal(201);
  })
})

