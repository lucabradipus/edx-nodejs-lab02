const request = require('supertest');
const app = require('../server').app;
const server = require('../server').server;
const expect = require('chai').expect


after(function (done) {
  console.log('About to exit, waiting for remaining connections to complete');
  server.close()
  done()
});

describe('GET posts', function () {
  it('returns an empty array when called the first time', (done) => {
    request(app)
        .get('/posts')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(0);
          done();
        })
  })
})
//
describe('POST posts', function () {
  it('creates an item ', (done) => {
    request(app)
    let post = {
      name: "Top 10 ES6 Features",
      url: "http://webapplog.com/es6",
      text: ""
    }
    request(app)
        .post('/posts')
        .send(post)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.id).to.equal(0);
          if (err) done(err)
          done();
        });
  })
  it('check the created item ', (done) => {
    request(app)
        .get('/posts')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(1);
          expect(res.body[0].name).to.equal('Top 10 ES6 Features');
          if (err) done(err)
          done();
        })

  })
})
