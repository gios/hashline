module.exports = function(router, db) {
  'use strict';
  const fs = require('fs');
  let exists = fs.existsSync(db.filename);

  router.get('/api/hello', function *() {
    this.body = 'Hello World!'
  })

  router.get('/api/runSqlite', function *() {
    db.serialize(function() {
      if (exists) {
        db.run('CREATE TABLE lorem (info TEXT)')
      }

      let stmt = db.prepare('INSERT INTO lorem VALUES (?)')
      for (let i = 0; i < 10; i++) {
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
}
