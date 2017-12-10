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

    // returned value is initialised to empty array
    let data = []
    posts = util.retrievePost(req.params.postId)
    //comments are already initialized ?
    if (posts.comments) {
      // is a request for a single comment ?
      if (req.query.commentId) {
        const cIndex = parseInt(req.query.commentId)
        // is the parameter correct?
        if (util.isNumber(cIndex)) {
          data = store.posts[req.params.postId].comments[cIndex]
          //comment not found
          if (!data) {
            return res.status(404).send()
          }
        } else {
          //bad request
          return res.status(400).send()
        }
      } else {
       // client asked for all available parameters
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
    const validation = validatePayload(req.body)
    if (!validation.success) return res.status(406).send(validation.response)
    let updatedComment = createComment(req.body)
    store.posts[req.params.postId].comments[req.params.commentId] = updatedComment
    res.status(200).send(store.posts[req.params.postId].comments[req.params.commentId])
  }
  ,
  removeComment(req, res) {
    store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
    res.status(204).send()

  }
}
