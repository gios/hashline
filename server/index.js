'use strict';

const app = require('koa')()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const router = require('koa-router')()
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const tracer = require('tracer').colorConsole()

const SHARED_SECRET = 'hashline'

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500
    this.body = err.message || 'Internal server error'
    if (400 < this.status && this.status < 500) {
      tracer.warn(err)
    } else {
      tracer.error(err)
    }
    this.app.emit('error', err, this)
  }
})
app.use(logger())
app.use(bodyParser())
app.use(jwt({ secret: SHARED_SECRET }).unless({
  path: [/^\/authenticate/, /^\/registration/]
}))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(serve(__dirname + '/../public'))

// Routes
require('./apis/src/routes/userRoutes.js')(router, jwt, SHARED_SECRET)

io.on('connection', function() {
  tracer.log('a user connected')
})

server.listen(process.env.PORT || 5000)
tracer.log('Hashline is running on port', process.env.PORT || 5000)
