'use strict';
const fs = require('fs')
const app = require('koa')()
const router = require('koa-router')()
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

var file = __dirname + '/../base.db'
var exists = fs.existsSync(file)

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(file)

router.get('/api/hello', function *() {
  this.body = 'Hello World!'
})

router.get('/api/runSqlite', function *() {
  db.serialize(function() {
    if (exists) {
      db.run('CREATE TABLE lorem (info TEXT)')
    }

    var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
    for (var i = 0; i < 10; i++) {
      stmt.run('Ipsum ' + i)
    }
    stmt.finalize()

    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
      console.log(row.id + ': ' + row.info)
    })
  })

  db.close()
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

console.log('Sportalking is running on port', process.env.PORT || 5000) // eslint-disable-line no-console
