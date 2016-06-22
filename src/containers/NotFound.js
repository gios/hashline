import React, { Component } from 'react'
import { connect } from 'react-redux'

class NotFound extends Component {

  render() {
    return (
      <div className='text-xs-center m-t-3'>
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
      </div>
    )
  }
}

function inject(state) {
  return {
    state
  }
}

export default connect(inject)(NotFound)
