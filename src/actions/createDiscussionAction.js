import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_DISCUSSION_TYPES = 'REQUEST_DISCUSSION_TYPES'
export const SUCCESS_DISCUSSION_TYPES = 'SUCCESS_DISCUSSION_TYPES'
export const FAILURE_DISCUSSION_TYPES = 'FAILURE_DISCUSSION_TYPES'

export const REQUEST_DISCUSSION_TAGS = 'REQUEST_DISCUSSION_TAGS'
export const SUCCESS_DISCUSSION_TAGS = 'SUCCESS_DISCUSSION_TAGS'
export const FAILURE_DISCUSSION_TAGS = 'FAILURE_DISCUSSION_TAGS'

export const REQUEST_DISCUSSION_LIMITES = 'REQUEST_DISCUSSION_LIMITES'
export const SUCCESS_DISCUSSION_LIMITES = 'SUCCESS_DISCUSSION_LIMITES'
export const FAILURE_DISCUSSION_LIMITES = 'FAILURE_DISCUSSION_LIMITES'

export const DISCUSSION_PRIVATE = 'DISCUSSION_PRIVATE'
export const DISCUSSION_LIMITED = 'DISCUSSION_LIMITED'

export const DISCUSSION_SELECT_TYPE = 'DISCUSSION_SELECT_TYPE'
export const DISCUSSION_SELECT_LIMITED = 'DISCUSSION_SELECT_LIMITED'
export const DISCUSSION_SELECT_TAGS = 'DISCUSSION_SELECT_TAGS'

export const DISCUSSION_INPUT_NAME = 'DISCUSSION_INPUT_NAME'
export const DISCUSSION_INPUT_DESCRIPTION = 'DISCUSSION_INPUT_DESCRIPTION'
export const DISCUSSION_INPUT_PASSWORD = 'DISCUSSION_INPUT_PASSWORD'

export const REQUEST_DISCUSSION_CREATE = 'REQUEST_DISCUSSION_CREATE'
export const SUCCESS_DISCUSSION_CREATE = 'SUCCESS_DISCUSSION_CREATE'
export const FAILURE_DISCUSSION_CREATE = 'FAILURE_DISCUSSION_CREATE'

export function discussionInputName(name) {
  return {
    type: DISCUSSION_INPUT_NAME,
    name
  }
}

export function discussionInputDescription(description) {
  return {
    type: DISCUSSION_INPUT_DESCRIPTION,
    description
  }
}

export function discussionInputPassword(password) {
  return {
    type: DISCUSSION_INPUT_PASSWORD,
    password
  }
}

export function discussionPrivate(isPrivate) {
  return {
    type: DISCUSSION_PRIVATE,
    isPrivate
  }
}

export function discussionLimited(isLimited) {
  return {
    type: DISCUSSION_LIMITED,
    isLimited
  }
}

export function discussionSelectType(type) {
  return {
    type: DISCUSSION_SELECT_TYPE,
    selectedType: type
  }
}

export function discussionSelectLimited(limited) {
  return {
    type: DISCUSSION_SELECT_LIMITED,
    selectedLimited: limited
  }
}

export function discussionSelectTags(tags) {
  return {
    type: DISCUSSION_SELECT_TAGS,
    selectedTags: tags
  }
}

export function getDiscussionLimites() {
  return {
    [CALL_API]: {
      endpoint: '/api/discussions/get_limites',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${idToken.getToken()}` },
      types: [REQUEST_DISCUSSION_LIMITES, SUCCESS_DISCUSSION_LIMITES, FAILURE_DISCUSSION_LIMITES]
    }
  }
}

export function getDiscussionTypes() {
  return {
    [CALL_API]: {
      endpoint: '/api/discussions/get_types',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${idToken.getToken()}` },
      types: [REQUEST_DISCUSSION_TYPES, SUCCESS_DISCUSSION_TYPES, FAILURE_DISCUSSION_TYPES]
    }
  }
}

export function getDiscussionTags() {
  return {
    [CALL_API]: {
      endpoint: '/api/discussions/get_tags',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${idToken.getToken()}` },
      types: [REQUEST_DISCUSSION_TAGS, SUCCESS_DISCUSSION_TAGS, FAILURE_DISCUSSION_TAGS]
    }
  }
}

export function createDiscussion(data) {
  return {
    [CALL_API]: {
      endpoint: '/api/discussion',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken.getToken()}`,
        'Content-Type': 'application/json'
      },
      types: [REQUEST_DISCUSSION_CREATE, SUCCESS_DISCUSSION_CREATE, FAILURE_DISCUSSION_CREATE],
      body: JSON.stringify(data)
    }
  }
}