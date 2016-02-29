import { combineReducers } from 'redux'
import Immutable from 'immutable'
import moment from 'moment'
import { REQUEST_DISCUSSION_TYPES, SUCCESS_DISCUSSION_TYPES, FAILURE_DISCUSSION_TYPES } from '../actions/createDiscussionAction'

const discussionTypesState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function toSelectableFormat(data) {
  return data.types.map((item) => {
    return {
      id: item.id,
      value: item.name.toLowerCase(),
      label: item.name
    }
  })
}

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
        payload: toSelectableFormat(action.payload),
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

// const discussionSettingsState = Immutable.Map({
//   isPrivate: false,
//   isLimited: false,
//   tags: [],
//   suggestions: [],
//   startDate: moment()
// })

// function discussionSettings(state = discussionSettingsState, action) {
//   switch (action.type) {
//     case value:

//       break;

//     default:
//       break;
//   }
// }

export let createDiscussion = combineReducers({
  discussionTypes
})