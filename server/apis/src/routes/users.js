module.exports = function(router, jwt, SHARED_SECRET) {
  'use strict';

  // const knex = require('../knex.js')
  const UserMethods = require('../methods/users.js');
  UserMethods.initUsersTable()

  router.post('/api/authenticate', function *(next) {
    if (!(this.request.body.email === 'john@example.com' && this.request.body.password === 'foo')) {
      this.status = 401
      this.body = 'Wrong user or password'
      return;
    }

    let profile = {
      username: 'John',
      email: 'john@example.com',
      id: 123
    };

    let token = jwt.sign(profile, SHARED_SECRET, { expiresIn: 60 * 5 });
    this.body = { id_token: token }
    yield next
  })
}
