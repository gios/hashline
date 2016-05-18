module.exports = function(io, socket) {
  'use strict'

  const knex = require('../knexConfig')

  socket.on('user-connected', (params) => {
    knex('users').select('username', 'email')
    .where('email', params.userEmail)
    .first()
    .then((user) => {
      io.emit('user-connected', user)
    })
  })
}