module.exports = function(router) {
  'use strict';

  const knex = require('../knexConfig.js')

  router.get('/api/discussion/get_types', function *() {
    let availableTypes = yield knex('types').select()
    this.body = { types: availableTypes }
  })

  router.get('/api/discussion/get_tags', function *() {
    let availableTags = yield knex('tags').select()
    this.body = { tags: availableTags }
  })

  router.get('/api/discussion/get_limites', function *() {
    this.body = {
      limites: [
        {name: '1 Hour'},
        {name: '2 Hours'},
        {name: '3 Hours'},
        {name: '6 Hours'},
        {name: '12 Hours'},
        {name: 'All Day'}
      ]
    }
  })

  router.post('/api/discussion', function *() {
    let name = this.request.body.name
    let description = this.request.body.name
    let typeId = this.request.body.typeId
    let isPrivate = this.request.body.isPrivate
    let password = this.request.body.password
    let isLimited = this.request.body.isLimited
    let limitedTime = this.request.body.limitedTime
    let tags = this.request.body.tags
    let owner = this.request.body.owner

    let findUser = yield knex('users').first('id').where('email', owner)
    let nameExist = yield knex('discussions').first('id').where('name', name)

    if(nameExist) {
      this.throw('Name of discussion should be unique', 409)
    }

    let discussionId = yield knex('discussions').insert({
      name,
      description,
      type_id: typeId,
      isPrivate,
      password,
      isLimited,
      limitedTime,
      user_id: findUser.id
    })

    let findTags = yield knex('tags').whereIn('name', tags).select('id')

    let insertTags = findTags.map((item) => {
      return {
        discussion_id: discussionId[0],
        tag_id: item.id
      }
    })

    yield knex('discussions_tags').insert(insertTags)
    this.body = discussionId[0]
  })
}
