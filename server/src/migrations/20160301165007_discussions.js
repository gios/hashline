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
          table.boolean('isPrivate')
          table.boolean('isLimited')
          table.string('password')
          table.time('limitedTime')
          table.boolean('closed')
          table.timestamps()
        })
        .then(() => logger.log('DISCUSSIONS table has been created'))
      }
    }),

    knex.schema.hasTable('discussions_tags').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('discussions_tags', (table) => {
          table.integer('discussion_id').unsigned().references('discussions.id')
          table.integer('tag_id').unsigned().references('tags.id')
        })
        .then(() => logger.log('DISCUSSIONS_TAGS table has been created'))
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
