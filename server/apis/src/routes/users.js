module.exports = function(router, db) {
  'use strict';

  router.get('/api/authenticate', function *(next) {
    db.serialize(function() {
      db.each('SELECT rowid AS id, name, password FROM Users', function(err, row) {
        console.log(`${row.id}: User, ${row.name} with password ${row.password}`);
      });
    })
  })
}
