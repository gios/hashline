'use strict';

const path = require('path')

let knex = require('knex')({
  client: 'sqlite3',
  conncetion: {
    filename: path.join(__dirname, '/../base.db')
  }
})

module.exports = require('bookshelf')(knex)
