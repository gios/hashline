
const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('notifications').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('notifications', (table) => {
          table.increments()
          table.integer('user_id').unsigned().references('users.id')
          table.integer('sender_id').unsigned().references('users.id')
          table.integer('discussion_id').unsigned().references('discussions.id')
          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .then(() => logger.info('NOTIFICATIONS table has been created'))
      }
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('notifications')
  ])
}
