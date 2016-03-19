module.exports = function(io, socket) {
  'use strict';

  const moment = require('moment')
  const knex = require('../knexConfig')

  socket.on('refresh_expired', (data) => {
    knex('discussions')
      .where({ id: data.id })
      .first('limitedTime')
      .then((result) => {
        let expiredByTime = moment(data.time, 'HH:mm:ss')
        let finishTime = moment().add({
          h: expiredByTime.hour(),
          m: expiredByTime.minutes(),
          s: expiredByTime.seconds()
        }).unix()

        console.log(result, finishTime)
      })
  })
}