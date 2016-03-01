const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('types').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('types', (table) => {
          table.increments()
          table.string('name').unique()
        })
        .then(() => logger.log('TYPES table has been created'))
        .then(() => {
          return knex('types').insert([
            {name: 'Event'},
            {name: 'Question'}
          ])
        })
      }
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('types')
  ])
}
