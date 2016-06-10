const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('messages').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('messages', (table) => {
          table.increments()
          table.integer('discussion_id').unsigned().references('discussions.id')
          table.integer('user_id').unsigned().references('users.id')
          table.text('message')
          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .then(() => logger.info('MESSAGES table has been created'))
      }
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('messages')
  ])
}
