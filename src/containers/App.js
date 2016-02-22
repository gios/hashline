import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Sidebar from './../components/sidebar/Sidebar'

class App extends Component {

  componentWillMount() {
    let { dispatch, isAuthenticated, push } = this.props

    if (!isAuthenticated) {
      dispatch(push('/login'))
    }
  }

  render() {
    return (
      <div>
        <Sidebar/>
        <div className='content-wrapper'>
          <div className='container-fluid'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

function inject(state) {
  return {
    isAuthenticated: state.reducers.auth.get('isAuthenticated'),
    push: routeActions.push
  }
}

export default connect(inject)(App)
