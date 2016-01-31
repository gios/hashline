'use strict';

const app = require('koa')()
const router = require('koa-router')()
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

// Bookshelf instance
const bookshelf = require('./lib/bookshelf.js')

app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())
app.use(logger())
app.use(serve(__dirname + '/../public'))
app.use(jwt({ secret: 'sportalking' }))

// Routes
require('./apis/src/routes/fakeData.js')(router, bookshelf)
require('./apis/src/routes/users.js')(router, bookshelf)

app.listen(process.env.PORT || 5000)
console.log('Sportalking is running on port', process.env.PORT || 5000) // eslint-disable-line no-console
