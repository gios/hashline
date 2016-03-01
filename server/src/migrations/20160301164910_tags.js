const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('tags').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('tags', (table) => {
          table.increments()
          table.integer('discussion_id').unsigned().references('discussions.id')
          table.string('name').unique()
          table.timestamps()
        })
        .then(() => logger.log('TAGS table has been created'))
        .then(() => {
          return knex('tags').insert([
            {name: 'Sport'},
            {name: 'Perfomance'},
            {name: 'Design'},
            {name: 'Entertainment'},
            {name: 'Cities'}
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
