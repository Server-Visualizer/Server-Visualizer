const request = require('supertest');
const express = require('express');
const app = express();

const index = require('../index.js');

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});
describe('index unit tests: ', () => {
  describe('"start" method routes: ', () => {
    describe('default startup', () => {
      
      beforeAll(async() => {
        await index.start(app)();
      });
      it('responds with 200 status and text/html content type (SerVis dashboard)', () => {
        return request(app)
          .get('/SerVis')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
    describe('server ping', () => {
      
      beforeAll(async() => {
        await index.start(app)();
      });
      it('responds with 200 status and application/json; content type (empty db contents)', () => {          
        return request(app)
          .get('/ping')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });

    describe('build request', () => {
      beforeAll(async() => {
        await index.start(app)();
      });
      it('responds with 200 status and application/javascript; content type (bundle.js)', async () => {
        return request(app)
        .get('/build')
        .expect('Content-Type', /application\/javascript/)
        .expect(200);
      });
    });
  });
  describe('"run" method returns a db which ', () => {
    beforeAll(async() => {
      await index.start(app)();
      await app.use(index.run());
      await app.get('/goodroute', function(req, res) {
        res.status(200).send('Oh hell yea.');
      });
    describe('it shows the correct status code when',  () => {
      });
      it('status is 404', async () => {
        await request(app).get('/nonexistantroute');
        const response = await request(app).get('/ping');
        expect(response.body[response.body.length - 1].status).toEqual(404);
      });
      it('status is 200', async () => {
        await request(app).get('/goodroute');
        const response = await request(app).get('/ping');
        expect(response.body[response.body.length - 1].status).toEqual(200);
      });
    });
    describe('it shows the correct method when',  () => {
      it('a GET request was made', async () => {
        await request(app).get('/goodroute');
        const response = await request(app).get('/ping');
        expect(response.body[response.body.length - 1].method).toEqual("GET");
      });
      it('a POST request was made', async () => {
        await request(app).post('/goodroute');
        const response = await request(app).get('/ping');
        expect(response.body[response.body.length - 1].method).toEqual("POST");
      });
    });
    it('increments req time correctly', async () => {
      await request(app).get('/goodroute');
      const reqTime = new Date().getTime();
      const response = await request(app).get('/ping');
      expect(response.body[response.body.length - 1].reqTime).toBeWithinRange(reqTime-10, reqTime+10);
    });
    it('has a elapsedTime property that is a millisecond number', async () => {
      await request(app).get('/goodroute');
      const response = await request(app).get('/ping');
      const elapsedTime = response.body[response.body.length - 1].elapsedTime;
      expect(elapsedTime).toBeDefined();
      expect(elapsedTime).not.toBeNaN();
      expect(typeof elapsedTime).toBe('number');
    });
  });
});