import React, { Component } from 'react'
import { connect } from 'react-redux'

class MyDiscussions extends Component {

  render() {
    return (
      <div>
        Hello!
      </div>
    )
  }
}

function inject(state) {
  return {
    state
  }
}

export default connect(inject)(MyDiscussions)
