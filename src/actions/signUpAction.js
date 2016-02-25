import fetch from 'isomorphic-fetch'
import { idToken } from '../utils/helpers'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

function requestSignUp(creds) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function signUpSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function signUpError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function signUpUser(creds) {
  let config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  }

  return dispatch => {
    dispatch(requestSignUp(creds))

    return fetch('/registration', config)
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response)
        } else {
          response.text().then((err) => {
            dispatch(signUpError(err))
          })
          return Promise.reject(new Error(response.statusText))
        }
      })
      .then(response => response.json())
      .then(user => {
        idToken.setToken(user.id_token)
        dispatch(signUpSuccess(user))
      })
      .catch(err => console.error(err)) // eslint-disable-line no-console
  }
}
