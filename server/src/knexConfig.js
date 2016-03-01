'use strict';

const path = require('path')
const DBName = path.join(__dirname, 'base.db')

let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: DBName
  },
  pool: {
    min: 0,
    max: 1
  }
})

module.exports = knex
