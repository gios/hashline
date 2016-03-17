import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_GET_DISCUSSIONS = 'REQUEST_GET_DISCUSSIONS'
export const SUCCESS_GET_DISCUSSIONS = 'SUCCESS_GET_DISCUSSIONS'
export const FAILURE_GET_DISCUSSIONS = 'FAILURE_GET_DISCUSSIONS'

export function getMyDiscussions() {
  return {
    [CALL_API]: {
      endpoint: '/api/discussions',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken.getToken()}`
      },
      types: [REQUEST_GET_DISCUSSIONS, SUCCESS_GET_DISCUSSIONS, FAILURE_GET_DISCUSSIONS]
    }
  }
}