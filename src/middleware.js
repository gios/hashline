import { loggedOut } from './actions/loginAction'

export const authChecker = store => next => action => {
  if (!action.error) {
    return next(action)
  }

  if(action.payload.status === 401) {
    next(loggedOut())
  }
}