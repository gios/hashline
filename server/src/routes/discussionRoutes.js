module.exports = function(router, jwt, SHARED_SECRET) {
  'use strict';

  const knex = require('../knexConfig.js')
  const userMethods = require('../methods/userMethods.js')
  const moment = require('moment')

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
    let description = this.request.body.description
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
      password: userMethods.cryptoPassword(password),
      isLimited,
      limitedTime,
      user_id: findUser.id,
      closed: false,
      created_at: Date.now(),
      updated_at: Date.now()
    })

    let findTags = yield knex('tags').whereIn('name', tags).select('id', 'name')
    let findTagsArray = findTags.map((item) => item.name)
    let createTags = tags.filter((name) => findTagsArray.indexOf(name) === -1)

    if(createTags.length) {
      yield knex('tags').insert(createTags.map((name) => {
        return {
          name,
          created_at: Date.now(),
          updated_at: Date.now()
        }
      }))
    }

    let getTags = yield knex('tags').whereIn('name', tags)
    yield knex('discussions_tags').insert(getTags.map((item) => {
      return {
        discussion_id: discussionId[0],
        tag_id: item.id
      }
    }))

    this.body = {
      id: discussionId[0],
      message: `Discussion ${name} has been created`
    }
  })

  router.post('/api/discussion/:id', function *() {
    let id = this.request.id
    let password = this.request.password
    let foundDiscussion = yield knex('discussions')
      .where('id', id)
      .first()

    let isCorrectPassword = (userMethods.encryptoPassword(foundDiscussion.password) === password ? true : false)

    if(!isCorrectPassword) {
      this.throw('Password of this discussion not correct', 404)
    }
    this.body = foundDiscussion
  })

  router.get('/api/discussions', function *() {
    let token = this.request.header.authorization.split(' ')[1]
    let userInfo = yield jwt.verify(token, SHARED_SECRET)

    let discussionsTags = yield knex('discussions')
                    .select('discussions.name', 'users.email as user_email', 'tags.name as tag_name')
                    .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
                    .innerJoin('tags', 'tags.id', 'discussions_tags.tag_id')
                    .innerJoin('users', 'discussions.user_id', 'users.id')
                    .where('user_email', userInfo.email)

    let discussionsData = yield knex('discussions')
                    .select('discussions.id',
                            'discussions.name',
                            'discussions.description',
                            'types.name as type_name',
                            'users.email as user_email',
                            'discussions.isPrivate',
                            'discussions.isLimited',
                            'discussions.limitedTime',
                            'discussions.closed')
                    .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
                    .innerJoin('types', 'discussions.type_id', 'types.id')
                    .innerJoin('users', 'discussions.user_id', 'users.id')
                    .where('user_email', userInfo.email)
                    .groupBy('discussions.name')

    for (let indexData = 0; indexData < discussionsData.length; indexData++) {
      discussionsData[indexData].tags = []
      for (let indexTag = 0; indexTag < discussionsTags.length; indexTag++) {
        if (discussionsData[indexData].name === discussionsTags[indexTag].name) {
          discussionsData[indexData].tags.push(discussionsTags[indexTag].tag_name)
        }
      }
    }

    for (var index = 0; index < discussionsData.length; index++) {
      let diffLimited = moment.duration(moment.unix(discussionsData[index].limitedTime).diff(moment())).as('seconds')
      if(diffLimited < 0) {
        yield knex('discussions').where('id', discussionsData[index].id).update({ closed: true })
      }
    }

    this.body = discussionsData
  })
}
