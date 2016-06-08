import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
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
         DISCUSSION_SELECT_TAGS,
         REQUEST_DISCUSSION_CREATE,
         SUCCESS_DISCUSSION_CREATE,
         FAILURE_DISCUSSION_CREATE,
         DISCUSSION_INPUT_NAME,
         DISCUSSION_INPUT_DESCRIPTION,
         DISCUSSION_INPUT_PASSWORD } from '../actions/createDiscussionAction'

const discussionGetState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function toSelectableFormat(data) {
  let iterable = data.types || data.tags || data.limites
  return iterable.map((item) => {
    let value
    switch (item.name) {
      case '1 Hour':
      case '2 Hours':
      case '3 Hours':
      case '6 Hours':
      case '12 Hours':
        value = parseInt(item.name.split(' ')[0])
        break
      case 'All Day':
        value = 24
        break
      default:
        value = item.name.toLowerCase()
        break
    }

    return {
      id: item.id,
      value,
      label: item.name
    }
  })
}

function discussionInit(state, action, iterable, ...types) {
  let [REQUEST, SUCCESS, FAILURE] = types
  switch (action.type) {
    case REQUEST:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS:
      return state.merge({
        isFetching: false,
        payload: (iterable) ? toSelectableFormat(action.payload) : action.payload,
        error: false
      })
    case FAILURE:
      return state.merge({
        isFetching: false,
        payload: action.payload.response,
        error: true
      })
    default:
      return state
  }
}

function discussionTypes(state = discussionGetState, action) {
  return discussionInit(state, action, true, REQUEST_DISCUSSION_TYPES, SUCCESS_DISCUSSION_TYPES, FAILURE_DISCUSSION_TYPES)
}

function discussionLimites(state = discussionGetState, action) {
  return discussionInit(state, action, true, REQUEST_DISCUSSION_LIMITES, SUCCESS_DISCUSSION_LIMITES, FAILURE_DISCUSSION_LIMITES)
}

function discussionTags(state = discussionGetState, action) {
  return discussionInit(state, action, true, REQUEST_DISCUSSION_TAGS, SUCCESS_DISCUSSION_TAGS, FAILURE_DISCUSSION_TAGS)
}

function discussionCreate(state = discussionGetState, action) {
  return discussionInit(state, action, false, REQUEST_DISCUSSION_CREATE, SUCCESS_DISCUSSION_CREATE, FAILURE_DISCUSSION_CREATE)
}

const discussionSettingsState = Immutable.Map({
  name: '',
  description: '',
  password: '',
  isPrivate: false,
  isLimited: false,
  selectedType: {
    id: 2,
    value: 'question',
    label: 'Question'
  },
  selectedLimited: '1',
  selectedTags: ''
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
    case DISCUSSION_INPUT_NAME:
      return state.merge({
        name: action.name
      })
    case DISCUSSION_INPUT_DESCRIPTION:
      return state.merge({
        description: action.description
      })
    case DISCUSSION_INPUT_PASSWORD:
      return state.merge({
        password: action.password
      })
    case SUCCESS_DISCUSSION_CREATE:
    case LOCATION_CHANGE:
      return state = discussionSettingsState
    default:
      return state
  }
}

export let createDiscussion = combineReducers({
  discussionTypes,
  discussionLimites,
  discussionTags,
  discussionSettings,
  discussionCreate
})