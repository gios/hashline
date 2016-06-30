// React, Redux
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

// Routing
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Containers
import Containers from './containers/Index'

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
      <Route path='/' component={Containers.App}>
        <IndexRoute component={Containers.Discussions}/>
        <Route path='login' component={Containers.Login}/>
        <Route path='signup' component={Containers.Login}/>
        <Route path='create' component={Containers.CreateDiscussion}/>
        <Route path='search' component={Containers.Discussions}/>
        <Route path='mydiscussions' component={Containers.Discussions}/>
        <Route path='recent' component={Containers.Discussions}/>
        <Route path='mostdiscussed' component={Containers.Discussions}/>
        <Route path='type' component={Containers.Discussions}>
          <Route path='event' component={Containers.Discussions}/>
          <Route path='question' component={Containers.Discussions}/>
        </Route>
        <Route path='limited' component={Containers.Discussions}/>
        <Route path='trending' component={Containers.Discussions}/>
        <Route path='discussion' component={Containers.Discussion}>
          <Route path=':id' component={Containers.Discussion}/>
        </Route>
        <Route path='*' component={Containers.NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('render')
);
