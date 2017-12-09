const request = require('supertest');
const app = require('../server').app;
const server = require('../server').server;
const expect = require('chai').expect
const store = require('../models/post')
const util = require('./commons')
const initPost = util.storePost

after(function (done) {
  server.close()
  done()
});

afterEach(function (done) {
  store.posts = []
  done()
})


describe('CREATE posts', function () {
  it('creates an item ', (done) => {
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
      });
    request(app)
      .get('/posts')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        expect(res.body[0].name).to.equal('Top 10 ES6 Features');
        done();
      })

  })
  it('discards extra parameters in POST ', (done) => {
    let post = {
      name: "Top 10 ES6 Features",
      url: "http://webapplog.com/es6",
      text: "",
      extra: "extra param"
    }
    request(app)
      .post('/posts')
      .send(post)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.id).to.equal(0);
      });
    request(app)
      .get('/posts')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        expect(res.body[0].extra).to.equal(undefined);
        done();
      })

  })

  it('DOES NOT create an item with wrong parameters', (done) => {
    request(app)
    let post = {
      name: "",
      url: "http://webapplog.com/es6",
      text: ""
    }
    request(app)
      .post('/posts')
      .send(post)
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body.errorKey[0]).to.equal('name');
        done()
      });
  })
})
describe('READ posts', function () {
  it('returns an empty array when called the first time', (done) => {
    request(app)
      .get('/posts')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(0);
        done();
      })
  })
  it('returns a single post', (done) => {
    initPost();
    request(app)
      .get(`/posts?postId=0`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Top 10 ES6 Features');
        done();
      })
  })
  it('checks wrong query parameters in GET', (done) => {
    initPost();

    request(app)
      .get(`/posts?postId=foo`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      })
  })
  it('checks out of index query parameters in GET', (done) => {
    initPost();

    request(app)
      .get(`/posts?postId=1`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      })
  })

})
describe('UPDATE posts', function () {
  it('update an item ', (done) => {
    initPost()
    let update = {
      name: "updated",
      url: "http://webapplog.com/es6",
      text: ""
    }
    request(app)
      .put('/posts/0')
      .send(update)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal("updated");
        done();
      })

  })
  it('discards extra params in json ', (done) => {
    initPost()
    let update = {
      name: "updated",
      url: "http://webapplog.com/es6",
      text: "",
      extra: "extra param"
    }
    request(app)
      .put('/posts/0')
      .send(update)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.extra).to.equal(undefined);
        done();
      })

  })
  it('DOES NOT accept invalid json ', (done) => {
    initPost()
    let update = {
      name: "",
      url: "http://webapplog.com/es6",
      text: ""
    }
    request(app)
      .put('/posts/0')
      .send(update)
      .end((err, res) => {
        expect(res.status).to.equal(406);
        done();
      })

  })
})
describe('DELETE posts', (done) => {
  it('deletes a post ', (done) => {
    initPost()
    request(app)
      .delete('/posts/0')
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(store.posts.length).to.equal(0);
        done();
      })
  })
})
