const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const routes = require('./routes')

store = require('./models/post')
store.accounts = []

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler({log: errorNotification}))

app.get('/posts', (req, res) =>
    routes.posts.getPosts(req, res)
)

app.post('/posts', (req, res) => {
  routes.posts.addPost(req, res)
})

app.put('/posts/:id', (req, res) => {
  routes.posts.updatePost(req, res)
})

app.delete('/posts/:id', (req, res) => {
  routes.posts.removePost(req, res)
})

app.get('/posts/:postId/comments', (req, res) =>
    routes.comments.getComments(req, res)
)

app.post('/posts/:postId/comments', (req, res) => {
  routes.comments.addComment(req, res)
})

app.put('/posts/:postId/comments/:commentId', (req, res) => {
  routes.comments.updateComment(req, res)
})

app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  routes.comments.removeComment(req, res)
})

function errorNotification(err, str, req) {
  res.status(404).send(`{ error lab02: ${str} }`)

}

app.listen(3000)
