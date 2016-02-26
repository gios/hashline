'use strict';

const knex = require('../knex.js')
const logger = require('tracer').colorConsole()

exports.init = function() {
  return knex.schema.hasTable('users').then((exists) => {
    if(!exists) {
      return knex.schema.createTableIfNotExists('users', (table) => {
        table.increments()
        table.string('username').unique()
        table.string('email').unique()
        table.string('password')
        table.timestamps()
      })
      .catch((error) => {
        logger.error(error)
      })
    }
  })
}
