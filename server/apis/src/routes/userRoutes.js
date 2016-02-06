module.exports = function(router, jwt, SHARED_SECRET) {
  'use strict';

  const logger = require('tracer').colorConsole()
  const knex = require('../knex.js')
  const userMethods = require('../methods/userMethods.js')

  router.post('/authenticate', function *(next) {
    let email = this.request.body.email
    let password = this.request.body.password

    let foundUserPassword = yield knex('users')
    .where('email', email)
    .first('id', 'password')
    .catch((err) => {
      logger.error(err)
    })

    if (!foundUserPassword) {
      this.throw(404, 'User is not found')
    }

    let isCorrectPassword = (userMethods.encryptoPassword(foundUserPassword.password) === password ? true : false)

    if (!isCorrectPassword) {
      this.throw(404, 'Password is not correct')
    }

    let foundUser = yield knex('users')
    .where('id', foundUserPassword.id)
    .first('username', 'email', 'id')
    .catch((err) => {
      logger.error(err)
    })

    let token = jwt.sign(foundUser, SHARED_SECRET, { expiresIn: 60 * 5 });
    this.body = { id_token: token }
    yield next
  })

  router.post('/registration', function *(next) {
    let username = this.request.body.username
    let email = this.request.body.email
    let password = this.request.body.password

    let passwordHash = userMethods.cryptoPassword(password)

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
      password: passwordHash,
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
