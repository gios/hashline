import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { REQUEST_GET_NOTIFICATIONS, SUCCESS_GET_NOTIFICATIONS, FAILURE_GET_NOTIFICATIONS } from '../actions/notificationsAction'

const notificationsInfoState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function notificationsInfo(state = notificationsInfoState, action) {
  switch (action.type) {
    case REQUEST_GET_NOTIFICATIONS:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS_GET_NOTIFICATIONS:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE_GET_NOTIFICATIONS:
      return state.merge({
        isFetching: false,
        payload: action.payload.response,
        error: true
      })
    default:
      return state
  }
}

export let notifications = combineReducers({
  notificationsInfo
})