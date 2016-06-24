import React, { Component } from 'react'
import { connect } from 'react-redux'

class Notifications extends Component {

  render() {
    return (
      <div className='text-xs-center m-t-3'>
        Notifications
      </div>
    )
  }
}

function inject(state) {
  return {
    state
  }
}

export default connect(inject)(Notifications)
