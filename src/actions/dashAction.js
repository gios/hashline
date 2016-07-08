import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'
import { USER_GETTER_METHOD_DISCUSSION } from '../constants'

export const REQUEST_GET_MY_TRENDING_DISCUSSIONS = 'REQUEST_GET_MY_TRENDING_DISCUSSIONS'
export const SUCCESS_GET_MY_TRENDING_DISCUSSIONS = 'SUCCESS_GET_MY_TRENDING_DISCUSSIONS'
export const FAILURE_GET_MY_TRENDING_DISCUSSIONS = 'FAILURE_GET_MY_TRENDING_DISCUSSIONS'

export const REQUEST_DASH_USER_INFO = 'REQUEST_DASH_USER_INFO'
export const SUCCESS_DASH_USER_INFO = 'SUCCESS_DASH_USER_INFO'
export const FAILURE_DASH_USER_INFO = 'FAILURE_DASH_USER_INFO'

export const REQUEST_DASH_USERS_RANK = 'REQUEST_DASH_USERS_RANK'
export const SUCCESS_DASH_USERS_RANK = 'SUCCESS_DASH_USERS_RANK'
export const FAILURE_DASH_USERS_RANK = 'FAILURE_DASH_USERS_RANK'

export function getDashUsersRank() {
  return {
    [CALL_API]: {
      endpoint: '/api/users_rank',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken.getToken()}`
      },
      types: [REQUEST_DASH_USERS_RANK, SUCCESS_DASH_USERS_RANK, FAILURE_DASH_USERS_RANK]
    }
  }
}

export function getDashUserInfo() {
  return {
    [CALL_API]: {
      endpoint: '/api/user/info',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken.getToken()}`
      },
      types: [REQUEST_DASH_USER_INFO, SUCCESS_DASH_USER_INFO, FAILURE_DASH_USER_INFO]
    }
  }
}

export function getMyTrendingDiscussions(getterMethod = USER_GETTER_METHOD_DISCUSSION, start = 0, end = 5, query = '') {
  return {
    [CALL_API]: {
      endpoint: '/api/discussions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken.getToken()}`,
        'Content-Type': 'application/json'
      },
      types: [REQUEST_GET_MY_TRENDING_DISCUSSIONS, SUCCESS_GET_MY_TRENDING_DISCUSSIONS, FAILURE_GET_MY_TRENDING_DISCUSSIONS],
      body: JSON.stringify({ getterMethod, start, end, query })
    }
  }
}