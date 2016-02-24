export const USERNAME_ERROR = 'USERNAME_ERROR'
export const EMAIL_ERROR = 'EMAIL_ERROR'
export const PASSWORD_ERROR = 'PASSWORD_ERROR'

export function incorrectUsername(show) {
  return {
    type: USERNAME_ERROR,
    show
  }
}

export function incorrectEmail(show) {
  return {
    type: EMAIL_ERROR,
    show
  }
}

export function incorrectPassword(show) {
  return {
    type: PASSWORD_ERROR,
    show
  }
}
