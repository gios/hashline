const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('discussions').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('discussions', (table) => {
          table.increments()
          table.string('name').unique()
          table.string('description')
          table.integer('type_id').unsigned().references('types.id')
          table.integer('tags_id').unsigned().references('tags.id')
          table.integer('user_id').unsigned().references('users.id')
          table.boolean('isPrivate')
          table.boolean('isLimited')
          table.string('password')
          table.time('limitedTime')
          table.timestamps()
        })
        .then(() => logger.log('DISCUSSIONS table has been created'))
      }
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('discussions')
  ])
}
