import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_GET_DISCUSSIONS = 'REQUEST_GET_DISCUSSIONS'
export const SUCCESS_GET_DISCUSSIONS = 'SUCCESS_GET_DISCUSSIONS'
export const FAILURE_GET_DISCUSSIONS = 'FAILURE_GET_DISCUSSIONS'

export const SET_DISCUSSIONS_ARCHIVE = 'SET_DISCUSSIONS_ARCHIVE'
export const SET_SENT_DISCUSSIONS_ARCHIVE = 'SET_SENT_DISCUSSIONS_ARCHIVE'
export const DELETE_DISCUSSION_FROM_ARCHIVE = 'DELETE_DISCUSSION_FROM_ARCHIVE'
export const CLEAR_DISCUSSIONS_ARCHIVE = 'CLEAR_DISCUSSIONS_ARCHIVE'

export function deleteDiscussionFromArchive(id) {
  return {
    type: DELETE_DISCUSSION_FROM_ARCHIVE,
    id
  }
}

export function setDiscussionsArchive(discussionsArchive) {
  return {
    type: SET_DISCUSSIONS_ARCHIVE,
    discussionsArchive
  }
}

export function clearDiscussionsArchive() {
  return {
    type: CLEAR_DISCUSSIONS_ARCHIVE
  }
}

// TODO
export function setSentDiscussionsArchive(sentDiscussions) {
  return {
    type: SET_SENT_DISCUSSIONS_ARCHIVE,
    sentDiscussions
  }
}

export function getDiscussions(getterMethod) {
  return {
    [CALL_API]: {
      endpoint: '/api/discussions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken.getToken()}`,
        'Content-Type': 'application/json'
      },
      types: [REQUEST_GET_DISCUSSIONS, SUCCESS_GET_DISCUSSIONS, FAILURE_GET_DISCUSSIONS],
      body: JSON.stringify({ getterMethod })
    }
  }
}