import React, { Component } from 'react'
import { connect } from 'react-redux'

class Discussion extends Component {

  render() {
    return (
      <div>
        DISCUSSION ROUTER {this.props.discussionId}
      </div>
    )
  }
}

function inject(state, routing) {
  return {
    discussionId: routing.params.id
  }
}

export default connect(inject)(Discussion)
