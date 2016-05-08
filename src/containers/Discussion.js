import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import { getDiscussion } from '../actions/discussionAction'
import DiscussionForm from '../components/discussion/DiscussionForm'

class Discussion extends Component {

  onJoinDiscussion({ id, password = '' }) {
    let { dispatch } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then((status) => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }
    })
  }

  render() {
    let { discussionId, discussion } = this.props
    return (
      <div>
        <DiscussionForm discussionId={discussionId}
                        discussion={discussion}
                        onJoinDiscussion={this.onJoinDiscussion.bind(this)}/>
      </div>
    )
  }
}

function inject(state, routing) {
  return {
    discussionId: routing.params.id,
    discussion: state.discussion.discussionInfo.toJS()
  }
}

export default connect(inject)(Discussion)
