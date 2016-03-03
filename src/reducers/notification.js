import Immutable from 'immutable'
import { TRIGGER_NOTIFICATION, DISMISS_NOTIFICATION } from '../actions/notificationAction'

const notificationState = Immutable.List()

export function notification(state = notificationState, action) {
  switch (action.type) {
    case TRIGGER_NOTIFICATION:
      return state.push(
        {
          message: action.message,
          messageType: action.messageType,
          id: action.id || state.size + 1,
          title: action.title || '',
          timeOut: action.timeout || 0,
          onClick: action.onClick || null
        }
      )
    case DISMISS_NOTIFICATION:
      return state.delete(action.id - 1)
    default:
      return state
  }
}