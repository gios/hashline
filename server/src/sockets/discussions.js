module.exports = function(io, socket) {
  'use strict'

  socket.on('user-connected', () => {
    io.emit('user-connected', 'haha')
  })
}