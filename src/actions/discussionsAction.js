import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_GET_DISCUSSIONS = 'REQUEST_GET_DISCUSSIONS'
export const SUCCESS_GET_DISCUSSIONS = 'SUCCESS_GET_DISCUSSIONS'
export const FAILURE_GET_DISCUSSIONS = 'FAILURE_GET_DISCUSSIONS'

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