'use strict';

let knex = require('knex')({
  client: 'sqlite3',
  conncetion: {
    filename: __dirname + '/../base.db'
  }
})

module.exports = require('bookshelf')(knex)
