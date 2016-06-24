import { CALL_API } from 'redux-api-middleware'
import { idToken } from '../utils/helpers'

export const REQUEST_GET_NOTIFICATIONS = 'REQUEST_GET_NOTIFICATIONS'
export const SUCCESS_GET_NOTIFICATIONS = 'SUCCESS_GET_NOTIFICATIONS'
export const FAILURE_GET_NOTIFICATIONS = 'FAILURE_GET_NOTIFICATIONS'

export const SET_NOTIFICATIONS_ARCHIVE = 'SET_NOTIFICATIONS_ARCHIVE'
export const SET_SENT_NOTIFICATIONS_ARCHIVE = 'SET_SENT_NOTIFICATIONS_ARCHIVE'

export function setNotificationsArchive(notificationsArchive) {
  return {
    type: SET_NOTIFICATIONS_ARCHIVE,
    notificationsArchive
  }
}

export function setSentNotificationsArchive(sentNotifications) {
  return {
    type: SET_SENT_NOTIFICATIONS_ARCHIVE,
    sentNotifications
  }
}

export function getNotifications() {
  return {
    [CALL_API]: {
      endpoint: '/api/notifications',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${idToken.getToken()}` },
      types: [REQUEST_GET_NOTIFICATIONS, SUCCESS_GET_NOTIFICATIONS, FAILURE_GET_NOTIFICATIONS]
    }
  }
}