const request = require('supertest');
const app = require('../server').app;
const server = require('../server').server;
const expect = require('chai').expect
let store = require('../models/post')

after(function (done) {
  console.log('exiting');
  server.close()
  done()
});

afterEach(function (done) {
  store.posts = []
  done()
})

function storePost() {
  store.posts.push({
      name: "Top 10 ES6 Features",
      url: "http://webapplog.com/es6",
      text: ""
    }
  )
}

describe('CREATE comments', function () {})
describe('READ comments', function () {})
describe('UPDATE comments', function () {})
describe('DELETE comments', function () {})
