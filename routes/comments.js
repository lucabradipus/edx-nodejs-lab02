const store = require('../models/post')
module.exports = {
  getComments(req, res) {
    res.status(200).send(store.posts[req.params.postId].comments)
  },
  addComment(req, res) {
    let newComment = req.body

    let id = 0

    if(store.posts[req.params.postId].comments) {
      id = store.posts[req.params.postId].comments.length
    } else {
      store.posts[req.params.postId].comments = []
    }

    store.posts[req.params.postId].comments.push(newComment)
    res.status(201).send({id: id})
  },
  updateComment(req, res) {
    store.posts[req.params.postId].comments[req.params.commentId] = req.body
    res.status(204).send()
  },
  removeComment(req, res) {
    store.posts[req.params.postId].comments.splice(req.params.commentId,1)
    res.status(204).send()

  }
}
