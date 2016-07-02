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
      id: userInfo.id,
      username: userInfo.username,
      email: userInfo.email
    }
  })

  router.get('/api/user/info', function *() {
    let userInfo = this.state.user
    let messagesSent = yield knex('messages')
    .count('id AS messages_sent')
    .where('user_id', userInfo.id)
    .first()
    let userDiscussions = yield knex('discussions').select('id').where('user_id', userInfo.id)
    let messagesReceived = yield knex('messages')
    .count('id AS messages_received')
    .whereIn('discussion_id', userDiscussions.map(item => item.id))
    .whereNot('user_id', userInfo.id)
    .first()
    let discussionsCreated = yield knex('discussions')
    .count('id AS discussions_created')
    .where('user_id', userInfo.id)
    .first()
    let rankNumber = messagesSent.messages_sent * 0.1 + messagesReceived.messages_received * 0.9
    yield knex('users').where('id', userInfo.id).update({ rank: rankNumber })
    let usersRankSorted = yield knex('users').orderBy('rank', 'DESC')
    let userRankIndex = usersRankSorted.findIndex(item => item.id === userInfo.id)

    this.body = {
      messages_sent: messagesSent.messages_sent,
      messages_received: messagesReceived.messages_received,
      discussions_created: discussionsCreated.discussions_created,
      rank: userRankIndex + 1
    }
  })

  router.post('/api/search_users', function *() {
    let userInfo = this.state.user
    let query = this.request.body.query.toLowerCase()
    let users

    if(query) {
      users = yield knex('users')
      .select(knex.raw('id, LOWER(username) as value, username as label'))
      .where(knex.raw(`LOWER(username) LIKE '%${query}%'`))
      .whereNot('username', userInfo.username)
      .limit(15)
    } else {
      users = []
    }

    this.body = users
  })
}
