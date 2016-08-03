import { loggedOut } from './actions/loginAction'

export const authChecker = store => next => action => {
  if(action.error && action.payload.status === 401) {
    next(loggedOut())
  }
  return next(action)
}
