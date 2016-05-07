const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('tags').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('tags', (table) => {
          table.increments()
          table.string('name').unique()
          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .then(() => logger.info('TAGS table has been created'))
        .then(() => {
          return knex('tags').insert([
            {name: 'sport'},
            {name: 'perfomance'},
            {name: 'design'},
            {name: 'entertainment'},
            {name: 'cities'}
          ])
        })
      }
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tags')
  ])
}
