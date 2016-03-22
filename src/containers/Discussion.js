import React, { Component } from 'react'
import { connect } from 'react-redux'
import DiscussionForm from '../components/discussion/DiscussionForm'

class Discussion extends Component {

  render() {
    return (
      <div>
        <DiscussionForm/>
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
