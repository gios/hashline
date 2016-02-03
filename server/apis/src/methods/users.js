'use strict';

const knex = require('../knex.js')
const logger = require('winston')

function initUsersTable() {
  knex.schema.createTableIfNotExists('users', (table) => {
    table.increments()
    table.string('name')
    table.string('password')
    table.timestamps()
  })
  .catch(function(error) {
    logger.error(error)
  })
}


module.exports = {
  initUsersTable
}
