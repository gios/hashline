module.exports = function(router, db) {
  'use strict';

  router.post('/authenticate', function *(next) {
    db.serialize(function() {
    })
  })
}
