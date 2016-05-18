import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import { getDiscussion } from '../actions/discussionAction'
import DiscussionForm from '../components/discussion/DiscussionForm'
import DiscussionPasswordModal from '../components/discussion/DiscussionPasswordModal'

class Discussion extends Component {

  onJoinDiscussion({ id, password = '' }) {
    let { dispatch } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then((status) => {
      if(status.error && status.payload.status === 412) {
        NotificationManager.error(status.payload.response.message)
        $('#discussion-password').modal('show')
      } else if(status.error) {
        NotificationManager.error(status.payload.response.message)
      }
    })
  }

  componentWillUnmount() {
    $('#discussion-password').modal('hide')
  }

  render() {
    let { discussionId, discussion, user } = this.props
    return (
      <div>
        <DiscussionForm user={user}
                        discussionId={discussionId}
                        discussion={discussion}
                        onJoinDiscussion={this.onJoinDiscussion.bind(this)}/>
        <DiscussionPasswordModal discussionId={discussionId}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}/>
      </div>
    )
  }
}

function inject(state, routing) {
  return {
    discussionId: routing.params.id,
    discussion: state.discussion.discussionInfo.toJS(),
    user: state.sidebar.userInfo.toJS()
  }
}

export default connect(inject)(Discussion)
