// React, Redux
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

// Routing
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Containers
import Containers from './containers/Index'

// Components
import IndexDash from './components/dash/IndexDash'

// Store
import configureStore from './store/configureStore'

// Styles (SCSS)
import './index.scss'

// Bootstrap, jQuery, Tether
import $ from 'jquery'
import Tether from 'tether'
window.$ = window.jQuery = $
window.Tether = Tether
require('bootstrap')

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/login' component={Containers.Login}/>
      <Route path='/signup' component={Containers.Login}/>
      <Route path='/' component={Containers.App}>
        <IndexRoute component={IndexDash}/>
        <Route path='/create' component={Containers.CreateDiscussion}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('render')
);
