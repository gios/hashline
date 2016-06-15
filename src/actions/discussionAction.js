import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_GET_DISCUSSION = 'REQUEST_GET_DISCUSSION'
export const SUCCESS_GET_DISCUSSION = 'SUCCESS_GET_DISCUSSION'
export const FAILURE_GET_DISCUSSION = 'FAILURE_GET_DISCUSSION'

export const REQUEST_GET_DISCUSSION_MESSAGES = 'REQUEST_GET_DISCUSSION_MESSAGES'
export const SUCCESS_GET_DISCUSSION_MESSAGES = 'SUCCESS_GET_DISCUSSION_MESSAGES'
export const FAILURE_GET_DISCUSSION_MESSAGES = 'FAILURE_GET_DISCUSSION_MESSAGES'

export const GET_CONNECTED_USERS = 'GET_CONNECTED_USERS'
export const SET_CHAT_MESSAGE = 'SET_CHAT_MESSAGE'
export const SET_MESSAGE_ARCHIVE = 'SET_MESSAGE_ARCHIVE'
export const CLEAR_MESSAGE_ARCHIVE = 'CLEAR_MESSAGE_ARCHIVE'
export const START_LOAD_MESSAGES = 'START_LOAD_MESSAGES'
export const END_LOAD_MESSAGES = 'END_LOAD_MESSAGES'
export const LOAD_DISABLE_MESSAGES = 'LOAD_DISABLE_MESSAGES'

export const SCROLL_TO_BOTTOM = 'SCROLL_TO_BOTTOM'

export function setLoadDisableMessages(loadDisable) {
  return {
    type: LOAD_DISABLE_MESSAGES,
    loadDisable
  }
}

export function setStartLoadMessages(startLoad) {
  return {
    type: START_LOAD_MESSAGES,
    startLoad
  }
}

export function setEndLoadMessages(endLoad) {
  return {
    type: END_LOAD_MESSAGES,
    endLoad
  }
}

export function setScrollToBottom(scrollToBottom) {
  return {
    type: SCROLL_TO_BOTTOM,
    scrollToBottom
  }
}

export function getConnectedUsers(connectedUsers) {
  return {
    type: GET_CONNECTED_USERS,
    connectedUsers
  }
}

export function setChatMessage(chatMessage) {
  return {
    type: SET_CHAT_MESSAGE,
    chatMessage
  }
}

export function setMessageArchive(messageArchive) {
  return {
    type: SET_MESSAGE_ARCHIVE,
    messageArchive
  }
}

export function clearMessageArchive() {
  return {
    type: CLEAR_MESSAGE_ARCHIVE
  }
}

export function getDiscussion(id, password) {
  return {
    [CALL_API]: {
      endpoint: `/api/discussion_info/${id}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken.getToken()}`,
        'Content-Type': 'application/json'
      },
      types: [REQUEST_GET_DISCUSSION, SUCCESS_GET_DISCUSSION, FAILURE_GET_DISCUSSION],
      body: JSON.stringify({ id, password })
    }
  }
}

export function getDiscussionMessages(discussionId, start, end) {
  return {
    [CALL_API]: {
      endpoint: `/api/discussion_info/messages`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken.getToken()}`,
        'Content-Type': 'application/json'
      },
      types: [REQUEST_GET_DISCUSSION_MESSAGES, SUCCESS_GET_DISCUSSION_MESSAGES, FAILURE_GET_DISCUSSION_MESSAGES],
      body: JSON.stringify({ discussionId, start, end })
    }
  }
}