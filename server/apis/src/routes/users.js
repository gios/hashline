module.exports = function(router) {
  'use strict';

  router.get('/api/authenticate', function *() {
    this.body = 'User'
  })
}
