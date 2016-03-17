import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getDiscussionTypes,
         getDiscussionTags,
         getDiscussionLimites,
         discussionInputName,
         discussionInputDescription,
         discussionInputPassword,
         discussionPrivate,
         discussionLimited,
         discussionSelectType,
         discussionSelectLimited,
         discussionSelectTags,
         createDiscussion } from '../actions/createDiscussionAction'
import { triggerNotification } from '../actions/notificationAction'
import CreateDiscussionForm from '../components/create_discussion/CreateDiscussionForm'

class Login extends Component {

  notificationStutus(status) {
    let { dispatch } = this.props

    if(status.error) {
      dispatch(triggerNotification(status.payload.response.message, 'error'))
      return
    }
    dispatch(triggerNotification(status.payload.message, 'success', '', () => dispatch(push('/mydiscussions'))))
  }

  render() {
    let { dispatch,
          userInfo,
          discussionTypes,
          discussionTags,
          discussionLimites,
          discussionSettings,
          discussionCreate } = this.props

    return (
      <div>
        <CreateDiscussionForm discussionTypes={discussionTypes}
                              discussionTags={discussionTags}
                              discussionLimites={discussionLimites}
                              discussionSettings={discussionSettings}
                              discussionCreate={discussionCreate}
                              userInfo={userInfo}
                              onGetTypes={() => dispatch(getDiscussionTypes())}
                              onGetLimites={() => dispatch(getDiscussionLimites())}
                              onGetTags={() => dispatch(getDiscussionTags())}
                              onDiscussionName={(value) => dispatch(discussionInputName(value))}
                              onDiscussionDescription={(value) => dispatch(discussionInputDescription(value))}
                              onDiscussionPassword={(value) => dispatch(discussionInputPassword(value))}
                              onDiscussionPrivate={(value) => dispatch(discussionPrivate(value))}
                              onDiscussionLimited={(value) => dispatch(discussionLimited(value))}
                              onDiscussionSelectType={(value) => dispatch(discussionSelectType(value))}
                              onDiscussionSelectLimited={(value) => dispatch(discussionSelectLimited(value))}
                              onDiscussionSelectTags={(value) => dispatch(discussionSelectTags(value))}
                              onCreateDiscussion={(data) => {
                                dispatch(createDiscussion(data))
                                  .then((status) => this.notificationStutus(status))
                                }
                              }/>
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
    discussionCreate: state.createDiscussion.discussionCreate.toJS(),
    userInfo: state.sidebar.userInfo.toJS()
  }
}

export default connect(inject)(Login)
