const store = require('../models/post')
const payloadCheck = require('payload-validator');
const util = require('./common')

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const wellFormedPost = {
  name: "",
  url: "",
  text: ""
}

function validatePayload(receivedPayload) {
  return payloadCheck.validator(receivedPayload, wellFormedPost, ["name", "url"], true);
}

function createPost(receivedPayload) {
   return new Object({
    name: receivedPayload.name, url: receivedPayload.url, text: receivedPayload.text
  })
}

module.exports = {
  getPosts(req, res) {
    data = util.retrievePost(req.query.postId)
    if(data) {
      return res.status(200).send(data)
    } else {
      return res.status(400).send()
    }
  },
  addPost(req, res) {
    const validation = validatePayload(req.body)
    if (!validation.success) return res.status(406).send(validation.response)
    let newPost = createPost(req.body)
    let id = store.posts.length
    store.posts.push(newPost)
    res.status(201).send({id: id})
  },
  updatePost(req, res) {
    const validation = validatePayload(req.body)
    if (!validation.success) return res.status(406).send(validation.response)
    let updatedPost = createPost(req.body)
    store.posts[req.params.postId] = updatedPost
    res.status(200).send(store.posts[req.params.postId])

  },
  removePost(req, res) {
    store.posts.splice(req.params.id, 1)
    res.status(204).send()

  }
}
