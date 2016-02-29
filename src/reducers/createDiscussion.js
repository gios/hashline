import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { REQUEST_DISCUSSION_TYPES,
         SUCCESS_DISCUSSION_TYPES,
         FAILURE_DISCUSSION_TYPES,
         REQUEST_DISCUSSION_TAGS,
         SUCCESS_DISCUSSION_TAGS,
         FAILURE_DISCUSSION_TAGS } from '../actions/createDiscussionAction'

const discussionGetState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function toSelectableFormat(data) {
  let iterable = data.types || data.tags
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

function discussionTags(state = discussionGetState, action) {
  return discussionInit(state, action, REQUEST_DISCUSSION_TAGS, SUCCESS_DISCUSSION_TAGS, FAILURE_DISCUSSION_TAGS)
}

const discussionSettingsState = Immutable.Map({
  isPrivate: false,
  isLimited: false,
  selectedType: 'question',
  selectedLimited: '1hour',
  selectedTags: [],
  limitedValues: [
    {value: '1hour', label: '1 Hour'},
    {value: '2hour', label: '2 Hour'},
    {value: '3hour', label: '3 Hour'},
    {value: '6hour', label: '6 Hour'},
    {value: '12hour', label: '12 Hour'},
    {value: 'allday', label: 'All Day'}
  ],
  tagsValues: []
})

function discussionSettings(state = discussionSettingsState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export let createDiscussion = combineReducers({
  discussionTypes,
  discussionTags,
  discussionSettings
})