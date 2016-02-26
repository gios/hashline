module.exports = function(router) {
  'use strict';

  const knex = require('../knex.js')

  router.get('/api/get_types', function *() {
    this.body = {}
  })
}
