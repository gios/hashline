import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routeReducer, syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'

import reducers from '../reducers/index'

const reduxRouterMiddleware = syncHistory(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(thunk, reduxRouterMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const reducer = combineReducers({
  reducers,
  routing: routeReducer
})

function configureStore(initialState) {
  return finalCreateStore(reducer, initialState)
}

export default { configureStore, reduxRouterMiddleware }
