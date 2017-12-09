const request = require('supertest');
const app = require('../server').app;
const server = require('../server').server;
const expect = require('chai').expect
const store = require('../models/post')
const util = require('./commons')
const initPost = util.storePost

after(function (done) {
  console.log('exiting');
  server.close()
  done()
});

afterEach(function (done) {
  store.posts = []
  done()
})

function initComment() {
  store.posts.push({
      name: "Top 10 ES6 Features",
      url: "http://webapplog.com/es6",
      text: ""
    }
  )
  store.posts[0].comments = []
  store.posts[0].comments.push({
    text: "a comment"
  })
}

describe('CREATE comments', function () {
  it('creates a comment in an existing post ', (done) => {
    initPost()
    let comment = {
      text: "a comment"
    }
    request(app)
      .post('/posts/0/comments')
      .send(comment)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.id).to.equal(0);
      });
    request(app)
      .get('/posts/0/comments')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        expect(res.body[0].text).to.equal('a comment');
        done();
      })

  })
  it('discards extra parameters in POST ', (done) => {
    initPost()
    let comment = {
      text: "a comment",
      extra: "extra param"
    }
    request(app)
      .post('/posts/0/comments')
      .send(comment)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.id).to.equal(0);
      });
    request(app)
      .get('/posts/0/comments')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        expect(res.body[0].text).to.equal('a comment');
        expect(res.body[0].extra).to.equal(undefined);
        done();
      })

  })
  it('DOES NOT create an item with wrong parameters', (done) => {
    initPost()
    let comment = {
      text: ""
    }
    request(app)
      .post('/posts/0/comments')
      .send(comment)
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body.errorKey[0]).to.equal('text');
        done()
      });
  })

})
describe('READ comments', function () {
  it('returns an empty array when called the first time', (done) => {
    initPost()
    request(app)
      .get('/posts/0/comments')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(0);
        done();
      })
  })
  it('returns a single commetns', (done) => {
    initComment();

    request(app)
      .get(`/posts/0/comments?commentId=0`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.text).to.equal('a comment');
        done();
      })
  })

})


describe('UPDATE comments', function () {
})
describe('DELETE comments', function () {
})
