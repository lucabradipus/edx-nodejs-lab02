let store = require('../models/post')
const payloadCheck = require('payload-validator');

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const wellFormedPost = {
  name: "",
  url: "",
  text: ""
}

function validatePayload(receivedPayload) {
  const result = payloadCheck.validator(receivedPayload, wellFormedPost, ["name", "url"], true);
  return result
}

function createPost(receivedPayload) {
  let newPost = new Object({
    name: receivedPayload.name, url: receivedPayload.url, text: receivedPayload.text
  })

  return newPost
}

module.exports = {
  getPosts(req, res) {
    let data = store.posts
    if (req.query.postId) {
      const index = parseInt(req.query.postId)
      if (isNumber(index)) {
        data = store.posts[index]
        if (!data) return res.status(404).send()
      } else {
        return res.status(400).send()
      }
    }
    res.status(200).send(data)
  },
  addPost(req, res) {
    const validation = validatePayload(req.body)
    if (!validation.success) return res.status(406).send(validation.response)
    let newPost = createPost(req.body )
    let id = store.posts.length
    store.posts.push(newPost)
    res.status(201).send({id: id})
  },
  updatePost(req, res) {
    const validation = validatePayload(req.body)
    if (!validation.success) return res.status(406).send(validation.response)
    let updatedPost = createPost(req.body )
    store.posts[req.params.id] = updatedPost
    res.status(200).send(store.posts[req.params.id])

  },
  removePost(req, res) {
    store.posts.splice(req.params.id, 1)
    res.status(204).send()

  }
}
