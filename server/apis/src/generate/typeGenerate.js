'use strict';

const knex = require('../knex.js')
const logger = require('tracer').colorConsole()

exports.init = function() {
  return knex.schema.hasTable('types').then((exists) => {
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
}
