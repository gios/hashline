module.exports = function(io, socket) {
  'use strict'

  const knex = require('../knexConfig')
  const logger = require('tracer').colorConsole()

  // socket.on('connected-to-discussion', (username) => {
  //   socket.emit('receive-discussion', { username, socketId: socket.id })
  // })

  socket.on('join discussion', (params) => {
    socket.join(params.discussionId).emit('connected to discussion', params.username)
  })

  socket.on('leave discussion', (params) => {
    socket.leave(params.discussionId).emit('disconnected from discussion', params.username)
  })

  // socket.on('user-connected', (params) => {
  //   knex('users').select('id', 'username', 'email')
  //   .where('email', params.userEmail)
  //   .first()
  //   .then((user) => {
  //     knex('connected_discussion_users')
  //     .insert({
  //       discussion_id: params.discussionId,
  //       user_id: user.id
  //     })
  //     .then(() => {
  //       io.emit('user-connected', { username: user.username, email: user.email })
  //     })
  //     .catch((err) => {
  //       logger.error(err)
  //     })
  //   })
  // })

  // socket.on('user-disconnected', (params) => {
  //   knex('users').select('id', 'username', 'email')
  //   .where('email', params.userEmail)
  //   .first()
  //   .then((user) => {
  //     knex('connected_discussion_users')
  //     .where({
  //       discussion_id: params.discussionId,
  //       user_id: user.id
  //     })
  //     .del()
  //     .then(() => {
  //       io.emit('user-disconnected', { username: user.username, email: user.email })
  //     })
  //     .catch((err) => {
  //       logger.error(err)
  //     })
  //   })
  // })

  socket.on('disconnect', () => {
    logger.info('USER DISCONNECTED')
    // TODO delete user from connected_discussion_users
  })
}