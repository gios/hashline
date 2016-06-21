import { combineReducers } from 'redux'
import * as Immutable from 'immutable'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, RUN_LOGOUT, IS_LOGGED_OUT, NEXT_PATHNAME } from '../actions/loginAction'
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/signUpAction'
import { USERNAME_ERROR, EMAIL_ERROR, PASSWORD_ERROR } from '../actions/authErrorsAction'
import { LOCATION_CHANGE } from 'react-router-redux'
import { idToken } from '../utils/helpers'

const authState = Immutable.Map({
  isFetching: false,
  isAuthenticated: idToken.hasToken(),
  loggedOut: false,
  nextPathname: '/'
})

function auth(state = authState, action) {
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
    case RUN_LOGOUT:
      idToken.removeToken()
      return state.merge({
        isAuthenticated: false,
        loggedOut: false
      })
    case IS_LOGGED_OUT:
      return state.merge({
        loggedOut: action.loggedOut
      })
    case LOCATION_CHANGE:
      return state.merge({
        errorMessage: ''
      })
    case NEXT_PATHNAME:
      return state.merge({
        nextPathname: action.nextPathname
      })
    default:
      return state
  }
}

const authErrorsState = Immutable.Map({
  usernameError: Immutable.Map({
    message: 'You entered a wrong username.',
    show: false
  }),
  emailError: Immutable.Map({
    message: 'You entered a wrong email adresses.',
    show: false
  }),
  passwordError: Immutable.Map({
    message: 'Password length must be greater than 6.',
    show: false
  })
})

function authErrors(state = authErrorsState, action) {
  switch (action.type) {
    case USERNAME_ERROR:
      return state.merge({
        usernameError: {
          message: action.message || 'You entered a wrong username.',
          show: action.show
        }
      })
    case EMAIL_ERROR:
      return state.merge({
        emailError: {
          message: action.message || 'You entered a wrong email adresses.',
          show: action.show
        }
      })
    case PASSWORD_ERROR:
      return state.merge({
        passwordError: {
          message: action.message || 'Password length must be greater than 6.',
          show: action.show
        }
      })
    default:
      return state;
  }
}

export let login = combineReducers({
  auth,
  authErrors
})
