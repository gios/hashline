export function isSupported() {
  return 'Notification' in window
}

export function permissionGranted() {
  return Notification.permission === 'granted'
}

export function requestPermission(callback) {
  if(Notification.permission !== 'denied') {
    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        callback()
      }
    })
  }
}