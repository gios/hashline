'use strict';

const knex = require('../knex.js')
const logger = require('tracer').colorConsole()

exports.initTypes = function() {
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

exports.initTags = function() {
  return knex.schema.hasTable('tags').then((exists) => {
    if(!exists) {
      return knex.schema.createTable('tags', (table) => {
        table.increments()
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
}
