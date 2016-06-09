import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussion } from '../actions/discussionAction'
import { getDiscussions } from '../actions/discussionsAction'
import DiscussionsBlock from '../components/my_discussions/DiscussionsBlock'
import { NotificationManager } from 'react-notifications'
import { push } from 'react-router-redux'

class MyDiscussions extends Component {

  onJoinDiscussion({ id, password = '' }) {
    let { dispatch } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then((status) => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }
      dispatch(push(`/discussion/${id}`))
    })
  }

  render() {
    let { dispatch, discussions } = this.props

    return (
      <div>
        <DiscussionsBlock discussions={discussions}
                          allDiscussions={false}
                          onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                          onLoadDiscussions={isAll => dispatch(getDiscussions(isAll)).then(status => {
                            status.error && NotificationManager.error(status.payload.response.message)
                          })}/>
      </div>
    )
  }
}

function inject(state) {
  return {
    discussions: state.discussions.getDiscussions.toJS()
  }
}

export default connect(inject)(MyDiscussions)
