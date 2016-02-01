// React, Redux
import React from 'react' // eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Routing
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Containers
import Containers from './containers/Index'

// Components
import IndexWelcome from './components/IndexWelcome'

// Store
import config from './store/configureStore'

// Utils
import requireAuth from './utils/requireAuth'

// Styles (SCSS)
import './index.scss'

// Bootstrap
import $ from '../node_modules/jquery/dist/jquery'
window.$ = $
import bootstrap from '../node_modules/bootstrap/dist/js/npm'
bootstrap.$ = $

const store = config.configureStore()
config.reduxRouterMiddleware.listenForReplays(store)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Containers.App}>
        <IndexRoute component={IndexWelcome} onEnter={requireAuth}/>
        <Route path='/login' component={Containers.Login}/>
        <Route path='/signup' component={Containers.SignUp}/>
        <Route path='/counter' component={Containers.Counter}/>
        <Route path='/wonders' component={Containers.Wonders}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('render')
);
