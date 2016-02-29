import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateDiscussionForm from '../components/create_discussion/CreateDiscussionForm'

class Login extends Component {
  render() {
    let { discussionTypes } = this.props
    return (
      <div>
        <CreateDiscussionForm discussionTypes={discussionTypes}/>
      </div>
    )
  }
}

function inject(state) {
  return {
    discussionTypes: state.createDiscussion.discussionTypes.toJS()
  }
}

export default connect(inject)(Login)
