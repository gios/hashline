'use strict';

const app = require('koa')()
const router = require('koa-router')()
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

const SHARED_SECRET = 'sportalking'

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
})
app.use(logger())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(serve(__dirname + '/../public'))
app.use(jwt({ secret: SHARED_SECRET }).unless({ path: [/^\/authenticate/, /^\/registration/] }))

// Routes
require('./apis/src/routes/userRoutes.js')(router, jwt, SHARED_SECRET)

app.listen(process.env.PORT || 5000)
console.log('Sportalking is running on port', process.env.PORT || 5000) // eslint-disable-line no-console
