module.exports = function(router) {
  'use strict';

  const knex = require('../knexConfig')

  router.get('/api/notifications', function *() {
    let userInfo = this.state.user
    let notificationsData = yield knex('notifications')
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
    .where('notifications.user_id', userInfo.id)

    this.body = notificationsData
  })
}