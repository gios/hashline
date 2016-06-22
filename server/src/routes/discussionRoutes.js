module.exports = function(router) {
  'use strict';

  const knex = require('../knexConfig')
  const userMethods = require('../methods/userMethods')
  const moment = require('moment')

  router.get('/api/discussions/get_types', function *() {
    let availableTypes = yield knex('types').select()
    this.body = { types: availableTypes }
  })

  router.get('/api/discussions/get_tags', function *() {
    let availableTags = yield knex('tags').select()
    this.body = { tags: availableTags }
  })

  router.get('/api/discussions/get_limites', function *() {
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

    let discussionId = yield knex('discussions')
    .returning('id')
    .insert({
      name,
      description,
      type_id: typeId,
      is_private: isPrivate,
      password: password ? userMethods.cryptoPassword(password) : null,
      is_limited: isLimited,
      limited_time: limitedTime,
      user_id: findUser.id,
      closed: false,
      created_at: new Date(),
      updated_at: new Date()
    })

    let findTags = yield knex('tags').whereIn('name', tags).select('id', 'name')
    let findTagsArray = findTags.map((item) => item.name)
    let createTags = tags.filter((name) => findTagsArray.indexOf(name) === -1)

    if(createTags.length) {
      yield knex('tags').insert(createTags.map((name) => {
        return {
          name,
          created_at: new Date(),
          updated_at: new Date()
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

  router.post('/api/discussion_info/messages', function *() {
    let discussionId = this.request.body.discussionId
    let start = this.request.body.start
    let end = this.request.body.end

    let discussionMessages = yield knex('messages').select('users.username', 'messages.message', 'messages.created_at')
    .innerJoin('users', 'messages.user_id', 'users.id')
    .groupBy('users.username', 'messages.message', 'messages.created_at')
    .where('messages.discussion_id', discussionId)
    .orderBy('messages.created_at', 'desc')
    .limit(end - start)
    .offset(start)

    this.body = discussionMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  })

  router.post('/api/discussion_info/:id', function *() {
    let userInfo = this.state.user
    let id = this.request.body.id
    let password = this.request.body.password

    let foundDiscussion = yield knex('discussions')
    .select('discussions.id',
            'discussions.name',
            'discussions.description',
            'types.name AS type_name',
            'users.username',
            'discussions.is_private',
            'discussions.is_limited',
            'discussions.limited_time',
            'discussions.closed')
    .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
    .innerJoin('types', 'discussions.type_id', 'types.id')
    .innerJoin('users', 'discussions.user_id', 'users.id')
    .groupBy('discussions.id',
             'discussions.name',
             'discussions.description',
             'types.name',
             'users.username',
             'discussions.is_private',
             'discussions.is_limited',
             'discussions.limited_time',
             'discussions.closed')
    .where('discussions.id', id)
    .first()

    let foundDiscussionTags = yield knex('discussions')
    .select('discussions.name', 'tags.name AS tag_name')
    .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
    .innerJoin('tags', 'tags.id', 'discussions_tags.tag_id')
    .groupBy('discussions.name', 'tags.name')
    .where('discussions.id', id)

    if(!foundDiscussion) {
      this.throw('This discussion doesn\'t exist', 404)
    }

    if(foundDiscussion.is_private) {
      let foundDiscussionPassword = yield knex('discussions').select('password').where('discussions.id', id).first()
      let isCorrectPassword = userMethods.encryptoPassword(foundDiscussionPassword.password) === password ? true : false

      if(!isCorrectPassword) {
        this.throw('Password of this discussion not correct', 412)
      }
    }

    foundDiscussion.tags = []
    let diffLimited = moment.duration(moment(foundDiscussion.limited_time).diff(moment().utcOffset(userInfo.gmt)))

    for (let indexTag of foundDiscussionTags) {
      if (foundDiscussion.name === indexTag.name) {
        foundDiscussion.tags.push(indexTag.tag_name)
      }
    }

    if(foundDiscussion.is_limited) {
      if(diffLimited.as('seconds') < 0) {
        yield knex('discussions').where('id', foundDiscussion.id).update({ closed: true })
        this.throw('This discussion has expired', 409)
      }

      if(diffLimited.as('days') < -7) {
        yield knex('discussions_tags').where('discussion_id', foundDiscussion.id).del()
        yield knex('discussions').where('id', foundDiscussion.id).del()
        this.throw('This discussion not found', 404)
      }
    }

    this.body = foundDiscussion
  })

  router.post('/api/discussions', function *() {
    let userInfo = this.state.user
    let discussionsTags, discussionsData
    let getterMethod = this.request.body.getterMethod
    let typeDiscussion = /^by_type_discussions?/.test(getterMethod) ? getterMethod.split('--')[1] : false

    switch(getterMethod) {
      case 'trending_discussions':
        discussionsTags = yield knex('discussions')
        .select('discussions.name', 'users.email AS user_email', 'tags.name AS tag_name')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('tags', 'tags.id', 'discussions_tags.tag_id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.name', 'users.email', 'tags.name')

        discussionsData = yield knex('discussions')
        .select('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name AS type_name',
                'users.email AS user_email',
                'users.username AS username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('types', 'discussions.type_id', 'types.id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .leftJoin('messages', 'discussions.id', 'messages.discussion_id')
        .count('messages.id as messages_count')
        .groupBy('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name',
                'users.email',
                'users.username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
         .orderBy('messages_count', 'desc')
         .orderBy('discussions.created_at', 'desc')
        break;
      case 'limited_discussions':
        discussionsTags = yield knex('discussions')
        .select('discussions.name', 'users.email AS user_email', 'tags.name AS tag_name')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('tags', 'tags.id', 'discussions_tags.tag_id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.name', 'users.email', 'tags.name')
        .where('discussions.is_limited', true)

        discussionsData = yield knex('discussions')
        .select('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name AS type_name',
                'users.email AS user_email',
                'users.username AS username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('types', 'discussions.type_id', 'types.id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name',
                'users.email',
                'users.username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .where('discussions.is_limited', true)
        break;
      case typeDiscussion && `by_type_discussions--${typeDiscussion}`:
        var typeDiscussionFormatted = typeDiscussion.charAt(0).toUpperCase() + typeDiscussion.slice(1)
        discussionsTags = yield knex('discussions')
        .select('discussions.name', 'users.email AS user_email', 'tags.name AS tag_name')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('tags', 'tags.id', 'discussions_tags.tag_id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .innerJoin('types', 'discussions.type_id', 'types.id')
        .groupBy('discussions.name', 'users.email', 'tags.name')
        .where('types.name', typeDiscussionFormatted)

        discussionsData = yield knex('discussions')
        .select('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name AS type_name',
                'users.email AS user_email',
                'users.username AS username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('types', 'discussions.type_id', 'types.id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name',
                'users.email',
                'users.username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .where('types.name', typeDiscussionFormatted)
        break;
      case 'most_discussed_discussions':
        discussionsTags = yield knex('discussions')
        .select('discussions.name', 'users.email AS user_email', 'tags.name AS tag_name')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('tags', 'tags.id', 'discussions_tags.tag_id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.name', 'users.email', 'tags.name')

        discussionsData = yield knex('discussions')
        .select('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name AS type_name',
                'users.email AS user_email',
                'users.username AS username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('types', 'discussions.type_id', 'types.id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .leftJoin('messages', 'discussions.id', 'messages.discussion_id')
        .count('messages.id as messages_count')
        .groupBy('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name',
                'users.email',
                'users.username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .orderBy('messages_count', 'desc')
        break;
      case 'recent_discussions':
        discussionsTags = yield knex('discussions')
        .select('discussions.name', 'users.email AS user_email', 'tags.name AS tag_name')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('tags', 'tags.id', 'discussions_tags.tag_id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.name', 'users.email', 'tags.name')

        discussionsData = yield knex('discussions')
        .select('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name AS type_name',
                'users.email AS user_email',
                'users.username AS username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('types', 'discussions.type_id', 'types.id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name',
                'users.email',
                'users.username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .orderBy('discussions.created_at', 'desc')
        break;
      case 'user_discussions':
        discussionsTags = yield knex('discussions')
        .select('discussions.name', 'users.email AS user_email', 'tags.name AS tag_name')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('tags', 'tags.id', 'discussions_tags.tag_id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.name', 'users.email', 'tags.name')
        .where('users.email', userInfo.email)

        discussionsData = yield knex('discussions')
        .select('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name AS type_name',
                'users.email AS user_email',
                'users.username AS username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('types', 'discussions.type_id', 'types.id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name',
                'users.email',
                'users.username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .where('users.email', userInfo.email)
        break;
      default:
        discussionsTags = yield knex('discussions')
        .select('discussions.name', 'users.email AS user_email', 'tags.name AS tag_name')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('tags', 'tags.id', 'discussions_tags.tag_id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.name', 'users.email', 'tags.name')

        discussionsData = yield knex('discussions')
        .select('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name AS type_name',
                'users.email AS user_email',
                'users.username AS username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        .leftJoin('discussions_tags', 'discussions.id', 'discussions_tags.discussion_id')
        .innerJoin('types', 'discussions.type_id', 'types.id')
        .innerJoin('users', 'discussions.user_id', 'users.id')
        .groupBy('discussions.id',
                'discussions.name',
                'discussions.description',
                'discussions.created_at',
                'types.name',
                'users.email',
                'users.username',
                'discussions.is_private',
                'discussions.is_limited',
                'discussions.limited_time',
                'discussions.closed')
        break;
    }

    for (let indexData of discussionsData) {
      indexData.tags = []
      let diffLimited = moment.duration(moment(indexData.limited_time).diff(moment().utcOffset(userInfo.gmt)))

      for (let indexTag of discussionsTags) {
        if (indexData.name === indexTag.name) {
          indexData.tags.push(indexTag.tag_name)
        }
      }

      if(indexData.is_limited) {
        if(diffLimited.as('seconds') < 0) {
          yield knex('discussions').where('id', indexData.id).update({ closed: true })
        }

        if(diffLimited.as('days') < -7) {
          yield knex('discussions_tags').where('discussion_id', indexData.id).del()
          yield knex('discussions').where('id', indexData.id).del()
        }
      }
    }

    this.body = discussionsData
  })
}
