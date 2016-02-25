import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const MOBILE_SIDEBAR = 'MOBILE_SIDEBAR'
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const SUCCESS_USER_INFO = 'SUCCESS_USER_INFO'
export const FAILURE_USER_INFO = 'FAILURE_USER_INFO'

export function toggleSidebar(toggle) {
  return {
    type: TOGGLE_SIDEBAR,
    toggle
  }
}

export function setMobileSidebar(mobile) {
  return {
    type: MOBILE_SIDEBAR,
    mobile
  }
}

export function getUserData() {
  return {
    [CALL_API]: {
      endpoint: '/api/user',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${idToken.getToken()}` },
      types: ['REQUEST_USER_INFO', 'SUCCESS_USER_INFO', 'FAILURE_USER_INFO']
    }
  }
}