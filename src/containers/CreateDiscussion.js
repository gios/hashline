import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussionTags, getDiscussionLimites, discussionPrivate, discussionLimited } from '../actions/createDiscussionAction'
import CreateDiscussionForm from '../components/create_discussion/CreateDiscussionForm'

class Login extends Component {
  render() {
    let { dispatch,
          discussionTypes,
          discussionTags,
          discussionLimites,
          discussionSettings } = this.props

    return (
      <div>
        <CreateDiscussionForm discussionTypes={discussionTypes}
                              discussionTags={discussionTags}
                              discussionLimites={discussionLimites}
                              discussionSettings={discussionSettings}
                              onGetLimites={() => dispatch(getDiscussionLimites())}
                              onGetTags={() => dispatch(getDiscussionTags())}
                              onDiscussionPrivate={(value) => dispatch(discussionPrivate(value))}
                              onDiscussionLimited={(value) => dispatch(discussionLimited(value))}/>
      </div>
    )
  }
}

function inject(state) {
  return {
    discussionTypes: state.createDiscussion.discussionTypes.toJS(),
    discussionTags: state.createDiscussion.discussionTags.toJS(),
    discussionLimites: state.createDiscussion.discussionLimites.toJS(),
    discussionSettings: state.createDiscussion.discussionSettings.toJS()
  }
}

export default connect(inject)(Login)
