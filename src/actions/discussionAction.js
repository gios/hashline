import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_GET_DISCUSSION = 'REQUEST_GET_DISCUSSION'
export const SUCCESS_GET_DISCUSSION = 'SUCCESS_GET_DISCUSSION'
export const FAILURE_GET_DISCUSSION = 'FAILURE_GET_DISCUSSION'
export const GET_CONNECTED_USERS = 'GET_CONNECTED_USERS'
export const SET_CHAT_MESSAGE = 'SET_CHAT_MESSAGE'
export const SET_MESSAGE_ARCHIVE = 'SET_MESSAGE_ARCHIVE'

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