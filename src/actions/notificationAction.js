export const TRIGGER_NOTIFICATION = 'TRIGGER_NOTIFICATION'
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION'

export function triggerNotification(message, messageType, title = '', onClick = null, timeOut = 0) {
  return {
    type: TRIGGER_NOTIFICATION,
    message,
    messageType,
    title,
    onClick,
    timeOut
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