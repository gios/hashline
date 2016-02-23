import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'

import reducers from '../reducers/index'

const reducer = combineReducers({
  reducers,
  routing: routerReducer
})

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
  return store;
}
