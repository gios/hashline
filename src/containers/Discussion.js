import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { NotificationManager } from 'react-notifications'
import { getDiscussion } from '../actions/discussionAction'
import DiscussionForm from '../components/discussion/DiscussionForm'

class Discussion extends Component {

  onJoinDiscussion({ id, password = '' }) {
    let { dispatch } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then((status) => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message, 'error')
        return
      }
      dispatch(push(`/discussion/${id}`))
    })
  }

  render() {
    let { discussionId } = this.props
    return (
      <div>
        <DiscussionForm discussionId={discussionId}
                        onJoinDiscussion={this.onJoinDiscussion.bind(this)}/>
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
