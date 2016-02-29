module.exports = function(router) {
  'use strict';

  const knex = require('../knex.js')

  router.get('/api/discussion/get_types', function *() {
    let availableTypes = yield knex('types').select()
    this.body = { types: availableTypes }
  })

  router.get('/api/discussion/get_tags', function *() {
    let availableTags = yield knex('tags').select()
    this.body = { tags: availableTags }
  })

  router.get('/api/discussion/get_limites', function *() {
    this.body = {
      limites: [
        {name: '1 Hour'},
        {name: '2 Hour'},
        {name: '3 Hour'},
        {name: '6 Hour'},
        {name: '12 Hour'},
        {name: 'All Day'}
      ]
    }
  })
}
