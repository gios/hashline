// React, Redux
import React from 'react' // eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Routing
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Containers
import Containers from './containers/Index'

// Components
import IndexDash from './components/dash/IndexDash'

// Store
import config from './store/configureStore'

// Styles (SCSS)
import './index.scss'

// Bootstrap, jQuery, Tether
import $ from 'jquery'
import Tether from 'tether'
window.$ = window.jQuery = $
window.Tether = Tether
require('bootstrap')

const store = config.configureStore()
config.reduxRouterMiddleware.listenForReplays(store)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/login' component={Containers.Login}/>
      <Route path='/signup' component={Containers.Login}/>
      <Route path='/' component={Containers.App}>
        <IndexRoute component={IndexDash}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('render')
);
