import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussionTypes } from '../actions/createDiscussionAction'
import CreateDiscussionForm from '../components/create_discussion/CreateDiscussionForm'

class Login extends Component {
  render() {
    let { dispatch, discussionTypes } = this.props
    return (
      <div>
        <CreateDiscussionForm discussionTypes={discussionTypes}
                              onGetDiscussionTypes={() => dispatch(getDiscussionTypes())}/>
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
