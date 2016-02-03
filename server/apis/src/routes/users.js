module.exports = function(router, jwt, SHARED_SECRET) {
  'use strict';

  const logger = require('winston')
  const knex = require('../knex.js')
  const UserMethods = require('../methods/users.js');
  UserMethods.initUsersTable()

  router.post('/authenticate', function *(next) {
    if (!(this.request.body.email === 'john@example.com' && this.request.body.password === 'foo')) {
      this.status = 401
      this.body = 'Wrong user or password'
      return;
    }

    let profile = {
      username: 'John',
      email: 'john@example.com',
      id: 123
    };

    let token = jwt.sign(profile, SHARED_SECRET, { expiresIn: 60 * 5 });
    this.body = { id_token: token }
    yield next
  })

  router.post('/registration', function *(next) {
    let username = this.request.body.username
    let email = this.request.body.email
    let password = this.request.body.password

    let userId = yield knex('users').insert({
      username,
      email,
      password,
      created_at: Date.now(),
      updated_at: Date.now()
    })
    .catch(function(error) {
      logger.error(error)
    })

    let user = yield knex('users').where('id', userId[0])

    this.body = user
    yield next
  })
}
