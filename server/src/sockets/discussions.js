module.exports = function(io, socket) {
  'use strict'

  const knex = require('../knexConfig')
  const logger = require('tracer').colorConsole()

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
      .catch((err) => {
        logger.error(err)
      })
    })
  })

  socket.on('user-disconnected', (params) => {
    knex('users').select('id', 'username', 'email')
    .where('email', params.userEmail)
    .first()
    .then((user) => {
      knex('connected_discussion_users')
      .where({
        discussion_id: params.discussionId,
        user_id: user.id
      })
      .del()
      .then(() => {
        io.emit('user-disconnected', { username: user.username, email: user.email })
      })
      .catch((err) => {
        logger.error(err)
      })
    })
  })

  socket.on('disconnect', () => {
    // TODO delete user from connected_discussion_users
  })
}