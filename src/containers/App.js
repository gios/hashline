import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Sidebar from './../components/sidebar/Sidebar'

class App extends Component {

  componentWillMount() {
    let { dispatch, isAuthenticated } = this.props

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
    isAuthenticated: state.reducers.auth.get('isAuthenticated')
  }
}

export default connect(inject)(App)
