"use strict";
const app = require('koa')()
const router = require('koa-router')()
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

router.get('/api/hello', function *() {
  this.body = 'Hello World!'
})

router.get('/api/fakeData', function *() {
  this.body = [
    {
      id: 1,
      showplace: 'Taj Mahal',
      popularity: 8
    }, {
      id: 2,
      showplace: 'Colosseum',
      popularity: 5
    }, {
      id: 3,
      showplace: 'Machu Picchu',
      popularity: 9
    }, {
      id: 4,
      showplace: 'Great Wall of China',
      popularity: 7
    }
  ]
})

app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())
app.use(logger())
app.use(serve(__dirname + '/../public'))

app.listen(process.env.PORT || 5000)

console.log('Top Request is running on port', process.env.PORT || 5000) // eslint-disable-line no-console
