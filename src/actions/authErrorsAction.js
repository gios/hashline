export const USERNAME_ERROR = 'USERNAME_ERROR'
export const EMAIL_ERROR = 'EMAIL_ERROR'
export const PASSWORD_ERROR = 'PASSWORD_ERROR'

export function incorrectUsername(show, message) {
  return {
    type: USERNAME_ERROR,
    show,
    message
  }
}

export function incorrectEmail(show, message) {
  return {
    type: EMAIL_ERROR,
    show,
    message
  }
}

export function incorrectPassword(show, message) {
  return {
    type: PASSWORD_ERROR,
    show,
    message
  }
}
