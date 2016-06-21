import fetch from 'isomorphic-fetch'
import { idToken } from '../utils/helpers'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const RUN_LOGOUT = 'RUN_LOGOUT'
export const IS_LOGGED_OUT = 'IS_LOGGED_OUT'
export const NEXT_PATHNAME = 'NEXT_PATHNAME'

export function setNextPathname(nextPathname) {
  return {
    type: NEXT_PATHNAME,
    nextPathname
  }
}

export function loggedOut() {
  return {
    type: IS_LOGGED_OUT,
    loggedOut: true
  }
}

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function runLogout() {
  return {
    type: RUN_LOGOUT,
    isAuthenticated: false
  }
}

export function loginUser(creds) {
  let config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  }

  return dispatch => {
    dispatch(requestLogin(creds))

    return fetch('/authenticate', config)
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response)
        } else {
          response.json().then((err) => {
            dispatch(loginError(err))
          })
          return Promise.reject(new Error(response.statusText))
        }
      })
      .then(response => response.json())
      .then(user => {
        idToken.setToken(user.id_token)
        dispatch(receiveLogin(user))
      })
      .catch(err => window.console.error(err))
  }
}
