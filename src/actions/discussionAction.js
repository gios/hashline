import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_GET_DISCUSSION = 'REQUEST_GET_DISCUSSION'
export const SUCCESS_GET_DISCUSSION = 'SUCCESS_GET_DISCUSSION'
export const FAILURE_GET_DISCUSSION = 'FAILURE_GET_DISCUSSION'

export function getDiscussion(id, password) {
  console.log(id, password, { id, password })
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