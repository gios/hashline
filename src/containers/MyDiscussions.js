import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussions } from '../actions/myDiscussionsAction'

class MyDiscussions extends Component {

  render() {
    let { dispatch } = this.props

    return (
      <div>
        Hello!
        <button onClick={() => dispatch(getDiscussions())}>Hello</button>
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
