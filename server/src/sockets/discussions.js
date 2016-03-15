module.exports = function(io, socket, jwt, SHARED_SECRET) {
  'use strict';

  const knex = require('../knexConfig.js')

  socket.on('refresh_expired', (data) => {
    jwt.verify(data.id_token, SHARED_SECRET, (err, user) => {
      let userId = user.id

      knex('discussions')
        .where({ 'user_id': userId, 'isLimited': true })
        .select('id', 'limitedTime')
        .then((data) => {
          io.emit('refresh_expired_data', data)
        })
    })
  })
}