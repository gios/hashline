module.exports = function(io, socket) {
  'use strict'

  const knex = require('../knexConfig')

  socket.on('user-connected', (params) => {
    knex('users').select('id', 'username', 'email')
    .where('email', params.userEmail)
    .first()
    .then((user) => {
      knex('connected_discussion_users')
      .insert({
        discussion_id: params.discussionId,
        user_id: user.id
      })
      .then(() => {
        io.emit('user-connected', { username: user.username, email: user.email })
      })
    })
  })
}