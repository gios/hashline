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
          id: state.size + 1,
          title: action.title,
          timeOut: action.timeOut,
          onClick: action.onClick
        }
      )
    case DISMISS_NOTIFICATION:
      return state.filter((item) => item.id !== action.id)
    default:
      return state
  }
}