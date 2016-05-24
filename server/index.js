'use strict';

const path = require('path')
const app = require('koa')()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const router = require('koa-router')()
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const helmet = require('koa-helmet')
const favicon = require('koa-favicon')
const send = require('koa-send')
const routes = require('./src/routes')
const tracer = require('tracer').colorConsole()

const SHARED_SECRET = 'hashline'

app.use(function *(next) {
  yield send(this, path.resolve(__dirname, '/../public/', 'index.html'))
  yield next
})

app.use(function *(next) {
  try {
    yield next
  } catch (err) {
    if (400 < this.status && this.status < 500) {
      tracer.warn(err)
    } else {
      tracer.error(err)
    }

    this.status = err.status || 500
    this.body = { code: this.status, message: err.message || 'Internal server error' }
    this.app.emit('error', err, this)
  }
})

app.use(logger())
app.use(helmet())
app.use(bodyParser())
app.use(serve(__dirname + '/../public'))
app.use(favicon(__dirname + '/../public/favicon.ico'))
app.use(jwt({ secret: SHARED_SECRET }).unless({
  path: routes
}))
app.use(router.routes())
app.use(router.allowedMethods())

// Routes
require('./src/routes/userRoutes')(router, jwt, SHARED_SECRET)
require('./src/routes/discussionRoutes')(router, jwt, SHARED_SECRET)

io.on('connection', (socket) => {
  console.log('USER CONNECTED')
  require('./src/sockets/discussions')(io, socket)
})

server.listen(process.env.PORT || 5000)
tracer.info('Hashline is running on port', process.env.PORT || 5000)
