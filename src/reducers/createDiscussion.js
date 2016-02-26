import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { REQUEST_DISCUSSION_TYPES, SUCCESS_DISCUSSION_TYPES, FAILURE_DISCUSSION_TYPES } from '../actions/createDiscussionAction'

const discussionTypesState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function discussionTypes(state = discussionTypesState, action) {
  switch (action.type) {
    case REQUEST_DISCUSSION_TYPES:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS_DISCUSSION_TYPES:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE_DISCUSSION_TYPES:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: true
      })
    default:
      return state
  }
}

export let createDiscussion = combineReducers({
  discussionTypes
})