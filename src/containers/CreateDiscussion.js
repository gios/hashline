import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussionTags,
         getDiscussionLimites,
         discussionPrivate,
         discussionLimited,
         discussionSelectType,
         discussionSelectLimited,
         discussionSelectTags } from '../actions/createDiscussionAction'
import CreateDiscussionForm from '../components/create_discussion/CreateDiscussionForm'

class Login extends Component {
  render() {
    let { dispatch,
          userInfo,
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
                              userInfo={userInfo}
                              onGetLimites={() => dispatch(getDiscussionLimites())}
                              onGetTags={() => dispatch(getDiscussionTags())}
                              onDiscussionPrivate={(value) => dispatch(discussionPrivate(value))}
                              onDiscussionLimited={(value) => dispatch(discussionLimited(value))}
                              onDiscussionSelectType={(value) => dispatch(discussionSelectType(value))}
                              onDiscussionSelectLimited={(value) => dispatch(discussionSelectLimited(value))}
                              onDiscussionSelectTags={(value) => dispatch(discussionSelectTags(value))}/>
      </div>
    )
  }
}

function inject(state) {
  return {
    discussionTypes: state.createDiscussion.discussionTypes.toJS(),
    discussionTags: state.createDiscussion.discussionTags.toJS(),
    discussionLimites: state.createDiscussion.discussionLimites.toJS(),
    discussionSettings: state.createDiscussion.discussionSettings.toJS(),
    userInfo: state.sidebar.userInfo.toJS()
  }
}

export default connect(inject)(Login)
