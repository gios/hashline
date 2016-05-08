import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussion } from '../actions/discussionAction'
import { getMyDiscussions } from '../actions/myDiscussionsAction'
import MyDiscussionsBlock from '../components/my_discussions/MyDiscussionsBlock'
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
        <MyDiscussionsBlock discussions={discussions}
                            onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                            onLoadDiscussions={() => dispatch(getMyDiscussions())}/>
      </div>
    )
  }
}

function inject(state) {
  return {
    discussions: state.myDiscussions.getMyDiscussions.toJS()
  }
}

export default connect(inject)(MyDiscussions)
