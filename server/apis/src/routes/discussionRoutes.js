module.exports = function(router) {
  'use strict';

  const knex = require('../knex.js')

  router.get('/api/discussion/get_types', function *() {
    let availableTypes = yield knex('types').select()
    this.body = { types: availableTypes }
  })

  router.get('/api/discussion/get_tags', function *() {
    let availableTags = yield knex('tags').select()
    this.body = { types: availableTags }
  })
}
