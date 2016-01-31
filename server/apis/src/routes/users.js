module.exports = function(router, bookshelf) {
  'use strict';

  router.get('/api/authenticate', function *() {
    this.body = 'User'
  })
}
