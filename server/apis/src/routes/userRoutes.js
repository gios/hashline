module.exports = function(router, jwt, SHARED_SECRET) {
  'use strict';

  const logger = require('tracer').colorConsole()
  const knex = require('../knex.js')

  router.post('/authenticate', function *(next) {
    let email = this.request.body.email
    let password = this.request.body.password

    let foundUser = yield knex('users').where({
      email,
      password
    })
    .first('username', 'email', 'id')
    .catch((err) => {
      logger.error(err)
    })

    if (!foundUser) {
      this.throw(404, 'Wrong user or password')
    }

    let token = jwt.sign(foundUser, SHARED_SECRET, { expiresIn: 60 * 5 });
    this.body = { id_token: token }
    yield next
  })

  router.post('/registration', function *(next) {
    let username = this.request.body.username
    let email = this.request.body.email
    let password = this.request.body.password

    let usernameExist = yield knex('users').first('id').where('username', username)
    let emailExist = yield knex('users').first('id').where('email', email)

    if (usernameExist && emailExist) {
      this.throw(409, 'Username and email should be unique')
    } else if (usernameExist) {
      this.throw(409, 'Username should be unique')
    } else if (emailExist) {
      this.throw(409, 'Email should be unique')
    }

    let userId = yield knex('users').insert({
      username,
      email,
      password,
      created_at: Date.now(),
      updated_at: Date.now()
    })
    .catch((err) => {
      logger.error(err)
    })

    let user = yield knex('users')
    .where('id', userId[0])
    .first('username', 'email', 'id')
    .catch((err) => {
      logger.error(err)
    })

    let token = jwt.sign(user, SHARED_SECRET, { expiresIn: 60 * 5 });
    this.body = { id_token: token }
    yield next
  })
}
