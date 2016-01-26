import fetch from 'isomorphic-fetch'

export const LOAD_WONDERS = 'LOAD_WONDERS'
export const LOAD_WONDERS_OK = 'LOAD_WONDERS_OK'
export const LOAD_WONDERS_ERROR = 'LOAD_WONDERS_ERROR'
export const ADD_WONDER = 'ADD_WONDER'

export function loadWondersRun() {
  return { type: LOAD_WONDERS }
}

export function loadWondersOk(wonders) {
  return { type: LOAD_WONDERS_OK, wonders }
}

export function loadWondersError(error) {
  return { type: LOAD_WONDERS_ERROR, error }
}

export function addWonder(name) {
  return { type: ADD_WONDER, name }
}

export function loadWonders() {
  return dispatch => {
    dispatch(loadWondersRun())

    fetch('/api/fakeData')
      .then(response => {
        if (response.status >= 400) {
          dispatch(loadWondersError(response.statusText))
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(wonders => {
        dispatch(loadWondersOk(wonders))
      })
  }
}
