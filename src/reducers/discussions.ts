import { combineReducers } from 'redux'
import * as Immutable from 'immutable'
import { REQUEST_GET_DISCUSSIONS, SUCCESS_GET_DISCUSSIONS, FAILURE_GET_DISCUSSIONS } from '../actions/discussionsAction'

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
    default:
      return state
  }
}

export let discussions = combineReducers({
  getDiscussions
})