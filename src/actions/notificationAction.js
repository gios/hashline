export const TRIGGER_NOTIFICATION = 'TRIGGER_NOTIFICATION'
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION'

export function triggerNotification(message, messageType, title = '', timeOut = 0, onClick = null) {
  return {
    type: TRIGGER_NOTIFICATION,
    message,
    messageType,
    title,
    timeOut,
    onClick
  }
}

export function dismissNotification(notification) {
  let { message, messageType, id, title, timeOut, onClick } = notification
  return {
    type: DISMISS_NOTIFICATION,
    message,
    messageType,
    id,
    title,
    timeOut,
    onClick
  }
}