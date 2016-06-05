module.exports = function(io, socket) {
  'use strict'

  // const knex = require('../knexConfig')
  const logger = require('tracer').colorConsole()

  function getUserInRoom(roomId) {
    let usersInRoom = io.sockets.adapter.rooms[roomId] && Object.keys(io.sockets.adapter.rooms[roomId].sockets)

    .map((socketId, index) => {
      let user = io.sockets.connected[socketId]
      return { index, username: user.username, email: user.email }
    })
    return usersInRoom || []
  }

  socket.on('join discussion', (params) => {
    socket.username = params.username
    socket.email = params.email
    socket.discussionId = params.discussionId
    socket.join(params.discussionId)
    socket.broadcast.to(params.discussionId).emit('join discussion', params.username)
  })

  socket.on('leave discussion', (params) => {
    socket.leave(params.discussionId)
    socket.broadcast.to(params.discussionId).emit('leave discussion', params.username)
  })

  socket.on('connected users', (discussionId) => {
    io.emit('connected users', {
      users: getUserInRoom(discussionId),
      length: getUserInRoom(discussionId).length
    })
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
    io.emit('connected users', {
      users: getUserInRoom(socket.discussionId),
      length: getUserInRoom(socket.discussionId).length
    })
    logger.info('USER DISCONNECTED')
  })
}