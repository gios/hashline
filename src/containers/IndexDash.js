import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndexDashMain from '../components/dash/IndexDashMain'
import { push } from 'react-router-redux'

class IndexDash extends Component {

  componentWillMount() {
    let { dispatch, isAuthenticated } = this.props

    if (!isAuthenticated) {
      dispatch(push('/login'))
    }
  }

  render() {
    return (
      <div>
        <IndexDashMain/>
      </div>
    )
  }
}

function inject(state) {
  return {
    isAuthenticated: state.login.auth.get('isAuthenticated')
  }
}

export default connect(inject)(IndexDash)
