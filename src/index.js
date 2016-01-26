// React, Redux
import React from 'react' // eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Routing
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Containers
import Counter from './containers/Counter'
import App from './containers/App'
import Wonders from './containers/Wonders'

// Components
import IndexWelcome from './components/IndexWelcome'

// Store
import config from './store/configureStore'

// Styles (SCSS)
import './index.scss'

const store = config.configureStore()
config.reduxRouterMiddleware.listenForReplays(store)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={IndexWelcome}/>
        <Route path="/counter" component={Counter}/>
        <Route path="/wonders" component={Wonders}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('top-request')
);
