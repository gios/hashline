import Immutable from 'immutable'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/loginAction'

const authState = Immutable.Map({
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
})

export function auth(state = authState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.merge({
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return state.merge({
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return state.merge({
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}
