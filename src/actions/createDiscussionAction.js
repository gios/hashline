import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_DISCUSSION_TYPES = 'REQUEST_DISCUSSION_TYPES'
export const SUCCESS_DISCUSSION_TYPES = 'SUCCESS_DISCUSSION_TYPES'
export const FAILURE_DISCUSSION_TYPES = 'FAILURE_DISCUSSION_TYPES'

export const REQUEST_DISCUSSION_TAGS = 'REQUEST_DISCUSSION_TAGS'
export const SUCCESS_DISCUSSION_TAGS = 'SUCCESS_DISCUSSION_TAGS'
export const FAILURE_DISCUSSION_TAGS = 'FAILURE_DISCUSSION_TAGS'

export function getDiscussionTypes() {
  return {
    [CALL_API]: {
      endpoint: '/api/discussion/get_types',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${idToken.getToken()}` },
      types: ['REQUEST_DISCUSSION_TYPES', 'SUCCESS_DISCUSSION_TYPES', 'FAILURE_DISCUSSION_TYPES']
    }
  }
}

export function getDiscussionTags() {
  return {
    [CALL_API]: {
      endpoint: '/api/discussion/get_tags',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${idToken.getToken()}` },
      types: ['REQUEST_DISCUSSION_TAGS', 'SUCCESS_DISCUSSION_TAGS', 'FAILURE_DISCUSSION_TAGS']
    }
  }
}