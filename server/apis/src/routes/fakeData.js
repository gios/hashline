module.exports = function(router, bookshelf) {
  'use strict';

  router.get('/api/runSqlite', function *() {
    bookshelf.knex.schema.createTableIfNotExists('users', function (table) {
      table.increments()
      table.string('name')
      table.string('password')
      table.timestamps()
    })

    this.body = 'runSqlite'
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
