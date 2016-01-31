module.exports = function(router, bookshelf) {
  'use strict';

  const logger = require('winston')

  router.get('/api/runSqlite', function *() {
    yield bookshelf.knex.schema.createTableIfNotExists('users', (table) => {
      table.increments()
      table.string('name')
      table.string('password')
      table.timestamps()
    })
    .catch(function(error) {
      logger.error(error)
    })

    this.body = 'DB Create via SQlite3 and knex'
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
