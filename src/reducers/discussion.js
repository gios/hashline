import { combineReducers } from 'redux'
import Immutable from 'immutable'
import {
  REQUEST_GET_DISCUSSION,
  SUCCESS_GET_DISCUSSION,
  FAILURE_GET_DISCUSSION,
  REQUEST_GET_DISCUSSION_MESSAGES,
  SUCCESS_GET_DISCUSSION_MESSAGES,
  FAILURE_GET_DISCUSSION_MESSAGES,
  GET_CONNECTED_USERS,
  SET_CHAT_MESSAGE,
  SET_MESSAGE_ARCHIVE,
  CLEAR_MESSAGE_ARCHIVE,
  SCROLL_TO_BOTTOM } from '../actions/discussionAction'

const discussionInfoState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false,
  connectedUsers: null
})

function discussionInfo(state = discussionInfoState, action) {
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
    default:
      return state
  }
}

const discussionMessagesState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false,
  chatMessage: '',
  messageArchive: Immutable.List.of(),
  scrollToBottom: false
})

function discussionMessages(state = discussionMessagesState, action) {
  switch (action.type) {
    case REQUEST_GET_DISCUSSION_MESSAGES:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS_GET_DISCUSSION_MESSAGES:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE_GET_DISCUSSION_MESSAGES:
      return state.merge({
        isFetching: false,
        payload: action.payload.response,
        error: true
      })
    case SET_CHAT_MESSAGE:
      return state.merge({
        chatMessage: action.chatMessage
      })
    case SET_MESSAGE_ARCHIVE:
      return state.merge({
        messageArchive: state.get('messageArchive').concat(action.messageArchive)
      })
    case CLEAR_MESSAGE_ARCHIVE:
      return state.merge({
        messageArchive: state.get('messageArchive').clear()
      })
    case SCROLL_TO_BOTTOM:
      return state.merge({
        scrollToBottom: action.scrollToBottom
      })
    default:
      return state
  }
}

export let discussion = combineReducers({
  discussionInfo,
  discussionMessages
})