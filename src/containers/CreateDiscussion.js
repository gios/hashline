import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussionTags } from '../actions/createDiscussionAction'
import CreateDiscussionForm from '../components/create_discussion/CreateDiscussionForm'

class Login extends Component {
  render() {
    let { dispatch, discussionTypes, discussionTags } = this.props
    return (
      <div>
        <CreateDiscussionForm discussionTypes={discussionTypes}
                              discussionTags={discussionTags}
                              onGetTags={() => dispatch(getDiscussionTags())}/>
      </div>
    )
  }
}

function inject(state) {
  return {
    discussionTypes: state.createDiscussion.discussionTypes.toJS(),
    discussionTags: state.createDiscussion.discussionTags.toJS()
  }
}

export default connect(inject)(Login)
