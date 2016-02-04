import fetch from 'isomorphic-fetch'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

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
          dispatch(loginError(response.statusText))
          return Promise.reject(new Error(response.statusText))
        }
      })
      .then(response => response.json())
      .then(user => {
        localStorage.setItem('id_token', user.id_token)
        dispatch(receiveLogin(user))
      })
      .catch(err => console.error(err)) // eslint-disable-line no-console
  }
}
