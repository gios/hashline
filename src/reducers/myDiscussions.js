import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { REQUEST_GET_DISCUSSIONS, SUCCESS_GET_DISCUSSIONS, FAILURE_GET_DISCUSSIONS } from '../actions/myDiscussionsAction'

const discussionsGetState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function getDiscussions(state = discussionsGetState, action) {
  switch (action.type) {
    case REQUEST_GET_DISCUSSIONS:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS_GET_DISCUSSIONS:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE_GET_DISCUSSIONS:
      return state.merge({
        isFetching: false,
        payload: action.payload.response,
        error: true
      })
    case LOCATION_CHANGE:
      return state = discussionsGetState
    default:
      return state
  }
}

export let myDiscussions = combineReducers({
  getDiscussions
})