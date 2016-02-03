module.exports = function(router) {
  'use strict';

  const knex = require('../knex.js')
  const UserMethods = require('../methods/users.js');
  UserMethods.initUsersTable()

  router.get('/api/authenticate', function *() {
    console.log(knex);
  })
}
