const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('tags').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('tags', (table) => {
          table.increments()
          table.string('name').unique()
          table.timestamps()
        })
        .then(() => logger.log('TAGS table has been created'))
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
