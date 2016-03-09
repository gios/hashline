import React, { Component } from 'react'
import { connect } from 'react-redux'

class Discussion extends Component {

  render() {
    return (
      <div>
        DISCUSSION ROUTER
      </div>
    )
  }
}

function inject(state) {
  return {
    state
  }
}

export default connect(inject)(Discussion)
