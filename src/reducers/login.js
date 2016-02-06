import Immutable from 'immutable'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/loginAction'
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/signUpAction'
import { UPDATE_LOCATION } from 'react-router-redux'

const authState = Immutable.Map({
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
})

export function auth(state = authState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return state.merge({
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return state.merge({
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return state.merge({
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case UPDATE_LOCATION:
      return state.merge({
        errorMessage: ''
      })
    default:
      return state
  }
}
