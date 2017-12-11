const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes')

store = require('./models/post')

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/', routes);

const server = app.listen(3000)
module.exports = {app: app, server: server} // for testing
