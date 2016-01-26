import Immutable from 'immutable'
import { LOAD_WONDERS, LOAD_WONDERS_OK, LOAD_WONDERS_ERROR, ADD_WONDER } from '../actions/wondersAction'
import { UPDATE_LOCATION } from 'react-router-redux'

const wondersState = Immutable.Map({ loading: false, wonders: [], error: null })

function wonder(state, action) {
  switch (action.type) {
    case ADD_WONDER:
      let index = state.get('wonders').size
      return Immutable.Map({
        id: ++index,
        showplace: action.name,
        popularity: Math.round(Math.random() * 10)
      })
    default:
      return state
  }
}

export function wonders(state = wondersState, action) {
  switch (action.type) {
    case LOAD_WONDERS:
    case UPDATE_LOCATION:
      return state.set('loading', true)
    case LOAD_WONDERS_OK:
      return state.merge({
        loading: false,
        wonders: action.wonders,
        error: null
      })
    case LOAD_WONDERS_ERROR:
      return state.merge({
        loading: false,
        wonders: null,
        error: action.error
      })
    case ADD_WONDER:
      return state.merge({
        loading: false,
        wonders: state.get('wonders').push(wonder(state, action)),
        error: null
      })
    default:
      return state
  }
}
