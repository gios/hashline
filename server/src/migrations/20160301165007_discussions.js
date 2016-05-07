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
          table.integer('user_id').unsigned().references('users.id')
          table.boolean('is_private')
          table.boolean('is_limited')
          table.string('password')
          table.timestamp('limited_time')
          table.boolean('closed')
          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .then(() => logger.info('DISCUSSIONS table has been created'))
      }
    }),

    knex.schema.hasTable('discussions_tags').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('discussions_tags', (table) => {
          table.integer('discussion_id').unsigned().references('discussions.id')
          table.integer('tag_id').unsigned().references('tags.id')
        })
        .then(() => logger.info('DISCUSSIONS_TAGS table has been created'))
      }
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('discussions')
               .dropTable('discussions_tags')
  ])
}
