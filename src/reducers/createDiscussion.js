import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { REQUEST_DISCUSSION_TYPES,
         SUCCESS_DISCUSSION_TYPES,
         FAILURE_DISCUSSION_TYPES,
         REQUEST_DISCUSSION_TAGS,
         SUCCESS_DISCUSSION_TAGS,
         FAILURE_DISCUSSION_TAGS,
         REQUEST_DISCUSSION_LIMITES,
         SUCCESS_DISCUSSION_LIMITES,
         FAILURE_DISCUSSION_LIMITES } from '../actions/createDiscussionAction'

const discussionGetState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function toSelectableFormat(data) {
  let iterable = data.types || data.tags || data.limites
  return iterable.map((item) => {
    return {
      id: item.id,
      value: item.name.toLowerCase(),
      label: item.name
    }
  })
}

function discussionInit(state, action, ...types) {
  switch (action.type) {
    case types[0]:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case types[1]:
      return state.merge({
        isFetching: false,
        payload: toSelectableFormat(action.payload),
        error: false
      })
    case types[2]:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: true
      })
    default:
      return state
  }
}
function discussionTypes(state = discussionGetState, action) {
  return discussionInit(state, action, REQUEST_DISCUSSION_TYPES, SUCCESS_DISCUSSION_TYPES, FAILURE_DISCUSSION_TYPES)
}

function discussionLimites(state = discussionGetState, action) {
  return discussionInit(state, action, REQUEST_DISCUSSION_LIMITES, SUCCESS_DISCUSSION_LIMITES, FAILURE_DISCUSSION_LIMITES)
}

function discussionTags(state = discussionGetState, action) {
  return discussionInit(state, action, REQUEST_DISCUSSION_TAGS, SUCCESS_DISCUSSION_TAGS, FAILURE_DISCUSSION_TAGS)
}

const discussionSettingsState = Immutable.Map({
  isPrivate: false,
  isLimited: false,
  selectedType: 'question',
  selectedLimited: '1hour',
  selectedTags: []
})

function discussionSettings(state = discussionSettingsState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export let createDiscussion = combineReducers({
  discussionTypes,
  discussionLimites,
  discussionTags,
  discussionSettings
})