export const TRIGGER_NOTIFICATION = 'TRIGGER_NOTIFICATION'
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION'

export function triggerNotification(message, messageType, rest) {
  return {
    type: TRIGGER_NOTIFICATION,
    message,
    messageType,
    id: rest[0],
    title: rest[1],
    timeOut: rest[2],
    onClick: rest[3]
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