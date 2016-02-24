module.exports = function(router, jwt, SHARED_SECRET) {
  'use strict';

  const knex = require('../knex.js')
  const userMethods = require('../methods/userMethods.js')

  router.post('/authenticate', function *() {
    let email = this.request.body.email
    let password = this.request.body.password

    let foundUserPassword = yield knex('users')
    .where('email', email)
    .first('id', 'password')

    if (!foundUserPassword) {
      this.throw('User is not found', 404)
    }

    let isCorrectPassword = (userMethods.encryptoPassword(foundUserPassword.password) === password ? true : false)

    if (!isCorrectPassword) {
      this.throw('Password is not correct', 404)
    }

    let foundUser = yield knex('users')
    .where('id', foundUserPassword.id)
    .first('username', 'email', 'id')

    let token = jwt.sign(foundUser, SHARED_SECRET, { expiresIn: 60 * 5 });
    this.body = { id_token: token }
  })

  router.post('/registration', function *() {
    let username = this.request.body.username
    let email = this.request.body.email
    let password = this.request.body.password
    let passwordHash = userMethods.cryptoPassword(password)

    let usernameExist = yield knex('users').first('id').where('username', username)
    let emailExist = yield knex('users').first('id').where('email', email)

    if (usernameExist && emailExist) {
      this.throw('Username and email should be unique', 409)
    } else if (usernameExist) {
      this.throw('Username should be unique', 409)
    } else if (emailExist) {
      this.throw('Email should be unique', 409)
    }

    let userId = yield knex('users').insert({
      username,
      email,
      password: passwordHash,
      created_at: Date.now(),
      updated_at: Date.now()
    })

    let user = yield knex('users')
    .where('id', userId[0])
    .first('username', 'email', 'id')

    let token = jwt.sign(user, SHARED_SECRET, { expiresIn: 60 * 5 });
    this.body = { id_token: token }
  })

  router.get('/api/user', function *() {
    this.body = {id: 2}
  })
}
