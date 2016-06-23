module.exports = function(router, jwt, SHARED_SECRET) {
  'use strict';

  const knex = require('../knexConfig')
  const userMethods = require('../methods/userMethods')

  router.post('/authenticate', function *() {
    let email = this.request.body.email
    let password = this.request.body.password
    let gmt = this.request.body.gmt

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

    foundUser.gmt = gmt
    let token = jwt.sign(foundUser, SHARED_SECRET, { expiresIn: '10h' })
    this.body = { id_token: token }
  })

  router.post('/registration', function *() {
    let username = this.request.body.username
    let email = this.request.body.email
    let password = this.request.body.password
    let passwordHash = userMethods.cryptoPassword(password)
    let gmt = this.request.body.gmt

    let usernameExist = yield knex('users').first('id').where('username', username)
    let emailExist = yield knex('users').first('id').where('email', email)

    if (usernameExist && emailExist) {
      this.throw('Username and email should be unique', 409)
    } else if (usernameExist) {
      this.throw('Username should be unique', 409)
    } else if (emailExist) {
      this.throw('Email should be unique', 409)
    }

    let userId = yield knex('users')
    .returning('id')
    .insert({
      username,
      email,
      password: passwordHash,
      created_at: new Date(),
      updated_at: new Date()
    })

    let user = yield knex('users')
    .where('id', userId[0])
    .first('username', 'email', 'id')

    user.gmt = gmt
    let token = jwt.sign(user, SHARED_SECRET, { expiresIn: '10h' })
    this.body = { id_token: token }
  })

  router.get('/api/user', function *() {
    let userInfo = this.state.user
    this.body = {
      username: userInfo.username,
      email: userInfo.email
    }
  })

  router.post('/api/search_users', function *() {
    let query = this.request.body.query
    let users

    if(query) {
      users = yield knex('users')
      .select(knex.raw('id, LOWER(username) as value, username as label'))
      .where(knex.raw(`LOWER(username) like '%${query}%'`))
      .orWhere(knex.raw(`LOWER(email) like '%${query}%'`))
      .limit(15)
    } else {
      users = []
    }

    this.body = users
  })
}
