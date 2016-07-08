import Immutable from 'immutable'

export function apiRequestInit(state, action, ...types) {
  let [REQUEST, SUCCESS, FAILURE] = types
  switch (action.type) {
    case REQUEST:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE:
      return state.merge({
        isFetching: false,
        payload: action.payload.response,
        error: true
      })
    default:
      return state
  }
}

export const apiRequestInitState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})