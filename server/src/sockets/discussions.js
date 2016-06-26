module.exports = function(io, socket) {
  'use strict'

  const knex = require('../knexConfig')
  const logger = require('tracer').colorConsole()

  function getUserInRoom(roomId) {
    let usersInRoom = io.sockets.adapter.rooms[roomId] && Object.keys(io.sockets.adapter.rooms[roomId].sockets)
    .map((socketId, index) => {
      let user = io.sockets.connected[socketId]
      return { index, username: user.username, email: user.email }
    })
    return usersInRoom || []
  }

  socket.on('join user', user => {
    socket.user_id = user.user_id
    socket.join(`user-${user.id}`)
  })

  socket.on('invite users', (usersInvite, discussionId, senderId) => {
    knex('notifications')
    .select('notifications.user_id', 'notifications.discussion_id', 'users.username')
    .innerJoin('users', 'notifications.user_id', 'users.id')
    .whereIn('user_id', usersInvite.map(user => user.id))
    .then(notifications => {
      let usernamesError = []

      notifications.map(notification => {
        usersInvite.map(user => {
          if((notification.user_id === user.id) && (notification.discussion_id === discussionId)) {
            usernamesError.push(notification.username)
          }
        })
      })

      if(usernamesError.length) {
        io.sockets.to(`user-${senderId}`).emit('error invite users', { message: 'Some users already invited', users: usernamesError })
        return
      }

      knex('notifications')
      .insert(usersInvite.map(user => {
        return {
          sender_id: senderId,
          discussion_id: discussionId,
          user_id: user.id
        }
      }))
      .then(() => {
        knex('notifications')
        .select('notifications.id',
                'notifications.discussion_id AS notification_discussion_id',
                'notifications.created_at AS notification_created_at',
                'discussions.name AS discussion_name',
                'discussions.limited_time AS discussion_limited_time',
                'types.name AS discussion_type',
                'users.username AS sender_name')
        .innerJoin('discussions', 'notifications.discussion_id', 'discussions.id')
        .innerJoin('types', 'discussions.type_id', 'types.id')
        .innerJoin('users', 'notifications.sender_id', 'users.id')
        .groupBy('notifications.id',
                 'notification_discussion_id',
                 'notification_created_at',
                 'discussion_name',
                 'discussion_limited_time',
                 'discussion_type',
                 'sender_name')
        .where('notifications.discussion_id', discussionId)
        .first()
        .then(notificationsData => {
          usersInvite.map(user => {
            socket.broadcast.to(`user-${user.id}`).emit('invite users', notificationsData)
          })
        })
      })
    })
  })

  socket.on('join discussion', params => {
    socket.username = params.username
    socket.email = params.email
    socket.discussionId = params.discussionId

    socket.join(`discussion-${params.discussionId}`)
    socket.broadcast.to(`discussion-${params.discussionId}`).emit('join discussion', params.username)
  })

  socket.on('leave discussion', params => {
    socket.leave(`discussion-${params.discussionId}`)
    socket.broadcast.to(`discussion-${params.discussionId}`).emit('leave discussion', params.username)
  })

  socket.on('connected users', discussionId => {
    io.emit('connected users', {
      users: getUserInRoom(`discussion-${discussionId}`),
      length: getUserInRoom(`discussion-${discussionId}`).length
    })
  })

  socket.on('chat message', (message, discussionId, user) => {
    knex('users').select('id', 'username', 'email')
    .where('email', user.email)
    .first()
    .then(user => {
      knex('messages')
      .returning('id')
      .insert({
        discussion_id: discussionId,
        user_id: user.id,
        message
      })
      .then(message_id => {
        knex('messages').select('created_at', 'message')
        .where('id', message_id[0])
        .first()
        .then(message => {
          io.sockets.to(`discussion-${discussionId}`).emit('chat message', message.created_at, user.username, message.message)
        })
      })
      .catch(err => {
        logger.error(err)
      })
    })
    .catch(err => {
      logger.error(err)
    })
  })

  socket.on('disconnect', () => {
    socket.leave(`user-${socket.user_id}`)
    socket.leave(`discussion-${socket.discussionId}`)
    socket.broadcast.to(`discussion-${socket.discussionId}`).emit('leave discussion', socket.username)
    io.emit('connected users', {
      users: getUserInRoom(`discussion-${socket.discussionId}`),
      length: getUserInRoom(`discussion-${socket.discussionId}`).length
    })
    logger.info('USER DISCONNECTED')
  })
}