const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('users').then((exists) => {
      if(!exists) {
        return knex.schema.createTableIfNotExists('users', (table) => {
          table.increments()
          table.string('username').unique()
          table.string('email').unique()
          table.string('password')
          table.timestamps()
        })
        .then(() => logger.info('USERS table has been created'))
      }
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
