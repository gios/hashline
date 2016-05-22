const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('connected_discussion_users').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('connected_discussion_users', (table) => {
          table.increments()
          table.integer('discussion_id').unsigned().references('discussions.id')
          table.integer('user_id').unsigned().references('users.id')
        })
        .then(() => logger.info('CONNECTED DISCUSSION USERS table has been created'))
      }
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('connected_discussion_users')
  ])
}
