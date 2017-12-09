const store = require('../models/post')
const payloadCheck = require('payload-validator');
const util = require('./common')

const wellFormedPost = {
  text: ""
}

function validatePayload(receivedPayload) {
  return payloadCheck.validator(receivedPayload, wellFormedPost, ["text"], true);
}


function createComment(receivedPayload) {
  return new Object({text: receivedPayload.text})

}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = {
  getComments(req, res) {

    let data = []
    posts = util.retrievePost(req.params.postId)
    if (posts.comments) {
      const cIndex = parseInt(req.query.commentId)
      if (util.isNumber(cIndex)) {
        data = store.posts[req.params.postId].comments[cIndex]
        if (!data) {
          return res.status(400).send()
        }
      } else {
        data = posts.comments
      }
    }

    return res.status(200).send(data)
  },
  addComment(req, res) {
    const validation = validatePayload(req.body)
    if (!validation.success) return res.status(406).send(validation.response)
    let newComment = createComment(req.body)
    let id = 0
    if (store.posts[req.params.postId].comments) {
      id = store.posts[req.params.postId].comments.length
    } else {
      store.posts[req.params.postId].comments = []
    }

    store.posts[req.params.postId].comments.push(newComment)
    res.status(201).send({id: id})
  }
  ,
  updateComment(req, res) {
    store.posts[req.params.postId].comments[req.params.commentId] = req.body
    res.status(204).send()
  }
  ,
  removeComment(req, res) {
    store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
    res.status(204).send()

  }
}
