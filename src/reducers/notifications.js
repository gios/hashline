import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { REQUEST_GET_NOTIFICATIONS,
         SUCCESS_GET_NOTIFICATIONS,
         FAILURE_GET_NOTIFICATIONS,
         REQUEST_DELETE_NOTIFICATION,
         SUCCESS_DELETE_NOTIFICATION,
         FAILURE_DELETE_NOTIFICATION,
         SET_NOTIFICATIONS_ARCHIVE,
         SET_SENT_NOTIFICATIONS_ARCHIVE } from '../actions/notificationsAction'

const notificationsInfoState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false,
  notificationsArchive: Immutable.List.of()
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
    case SET_NOTIFICATIONS_ARCHIVE:
      return state.merge({
        notificationsArchive: state.get('notificationsArchive').push(...action.notificationsArchive)
      })
    case SET_SENT_NOTIFICATIONS_ARCHIVE:
      return state.merge({
        notificationsArchive: state.get('notificationsArchive').unshift(action.sentNotifications)
      })
    default:
      return state
  }
}

const notificationDeleteState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function notificationDelete(state = notificationDeleteState, action) {
  switch (action.type) {
    case REQUEST_DELETE_NOTIFICATION:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS_DELETE_NOTIFICATION:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE_DELETE_NOTIFICATION:
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
  notificationsInfo,
  notificationDelete
})