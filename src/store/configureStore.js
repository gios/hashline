import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'


import reducers from '../reducers/index'

const middleware = routerMiddleware(browserHistory)
const reducer = combineReducers({
  reducers,
  routing: routerReducer
})

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
  return store;
}
