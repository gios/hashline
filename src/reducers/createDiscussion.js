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
         FAILURE_DISCUSSION_LIMITES,
         DISCUSSION_PRIVATE,
         DISCUSSION_LIMITED,
         DISCUSSION_SELECT_TYPE,
         DISCUSSION_SELECT_LIMITED,
         DISCUSSION_SELECT_TAGS } from '../actions/createDiscussionAction'

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
  selectedLimited: '1 hour',
  selectedTags: []
})

function discussionSettings(state = discussionSettingsState, action) {
  switch (action.type) {
    case DISCUSSION_PRIVATE:
      return state.merge({
        isPrivate: action.isPrivate
      })
    case DISCUSSION_LIMITED:
      return state.merge({
        isLimited: action.isLimited
      })
    case DISCUSSION_SELECT_TYPE:
      return state.merge({
        selectedType: action.selectedType
      })
    case DISCUSSION_SELECT_LIMITED:
      return state.merge({
        selectedLimited: action.selectedLimited
      })
    case DISCUSSION_SELECT_TAGS:
      return state.merge({
        selectedTags: action.selectedTags
      })
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