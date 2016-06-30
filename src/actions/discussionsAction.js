import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_GET_DISCUSSIONS = 'REQUEST_GET_DISCUSSIONS'
export const SUCCESS_GET_DISCUSSIONS = 'SUCCESS_GET_DISCUSSIONS'
export const FAILURE_GET_DISCUSSIONS = 'FAILURE_GET_DISCUSSIONS'

export const SET_DISCUSSIONS_ARCHIVE = 'SET_DISCUSSIONS_ARCHIVE'
export const DELETE_DISCUSSION_FROM_ARCHIVE = 'DELETE_DISCUSSION_FROM_ARCHIVE'
export const CLEAR_DISCUSSIONS_ARCHIVE = 'CLEAR_DISCUSSIONS_ARCHIVE'

export const LOAD_DISABLE_DISCUSSIONS = 'LOAD_DISABLE_DISCUSSIONS'
export const START_LOAD_DISCUSSIONS = 'START_LOAD_DISCUSSIONS'
export const END_LOAD_DISCUSSIONS = 'END_LOAD_DISCUSSIONS'
export const SEARCH_QUERY_DISCUSSIONS = 'SEARCH_QUERY_DISCUSSIONS'

export function setSearchQueryDiscussions(searchQuery) {
  return {
    type: SEARCH_QUERY_DISCUSSIONS,
    searchQuery
  }
}

export function setLoadDisableDiscussions(loadDisable) {
  return {
    type: LOAD_DISABLE_DISCUSSIONS,
    loadDisable
  }
}

export function setStartLoadDiscussions(startLoad) {
  return {
    type: START_LOAD_DISCUSSIONS,
    startLoad
  }
}

export function setEndLoadDiscussions(endLoad) {
  return {
    type: END_LOAD_DISCUSSIONS,
    endLoad
  }
}

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

export function getDiscussions(getterMethod, start, end, query = '') {
  return {
    [CALL_API]: {
      endpoint: '/api/discussions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken.getToken()}`,
        'Content-Type': 'application/json'
      },
      types: [REQUEST_GET_DISCUSSIONS, SUCCESS_GET_DISCUSSIONS, FAILURE_GET_DISCUSSIONS],
      body: JSON.stringify({ getterMethod, start, end, query })
    }
  }
}