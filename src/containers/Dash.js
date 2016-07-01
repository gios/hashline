import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashBlock from '../components/dash/DashBlock'
import { getMyTrendingDiscussions } from '../actions/dashAction'
import { getDiscussion } from '../actions/discussionAction'
import { NotificationManager } from 'react-notifications'
import { push } from 'react-router-redux'
import socket from '../utils/socket'

class Dash extends Component {

  onJoinDiscussion({ id, password = '' }) {
    let { dispatch, userInfo } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then((status) => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }
      socket.emit('join discussion', { discussionId: parseInt(id), username: userInfo.payload.username, email: userInfo.payload.email })
      socket.emit('connected users', parseInt(id))
      dispatch(push(`/discussion/${id}`))
    })
  }

  render() {
    let { dispatch, myTrendingDiscussions } = this.props

    return (
      <DashBlock myTrendingDiscussions={myTrendingDiscussions}
                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                 getMyTrendingDiscussions={() => dispatch(getMyTrendingDiscussions())}/>
    )
  }
}

function inject(state) {
  return {
    myTrendingDiscussions: state.dash.myTrendingDiscussions.toJS(),
    userInfo: state.sidebar.userInfo.toJS()
  }
}

export default connect(inject)(Dash)
