import { combineReducers } from 'redux'
import Immutable from 'immutable'
import {
  REQUEST_GET_DISCUSSION,
  SUCCESS_GET_DISCUSSION,
  FAILURE_GET_DISCUSSION,
  GET_CONNECTED_USERS,
  SET_CHAT_MESSAGE } from '../actions/discussionAction'

const discussionGetState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false,
  connectedUsers: null,
  chatMessage: ''
})

function discussionInfo(state = discussionGetState, action) {
  switch (action.type) {
    case REQUEST_GET_DISCUSSION:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS_GET_DISCUSSION:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE_GET_DISCUSSION:
      return state.merge({
        isFetching: false,
        payload: action.payload.response,
        error: true
      })
    case GET_CONNECTED_USERS:
      return state.merge({
        connectedUsers: action.connectedUsers
      })
    case SET_CHAT_MESSAGE:
      return state.merge({
        chatMessage: action.chatMessage
      })
    default:
      return state
  }
}

export let discussion = combineReducers({
  discussionInfo
})