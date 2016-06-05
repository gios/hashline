import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import { getDiscussion, getConnectedUsers } from '../actions/discussionAction'
import DiscussionForm from '../components/discussion/DiscussionForm'
import DiscussionPasswordModal from '../components/discussion/DiscussionPasswordModal'
import io from 'socket.io-client'
let socket = io('http://localhost:5000')

class Discussion extends Component {

  componentWillMount() {
    let { dispatch, discussionId } = this.props

    socket.removeListener('leave discussion')
    socket.on('join discussion', (username) => {
      socket.emit('connected users', discussionId)
      NotificationManager.info(`User ${username} is connected`)
    })

    socket.on('leave discussion', (username) => {
      socket.emit('connected users', discussionId)
      NotificationManager.info(`User ${username} is disconnected`)
    })

    socket.on('connected users', (connectedUsers) => {
      dispatch(getConnectedUsers(connectedUsers))
    })
  }

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
    socket.removeListener('join discussion')
    socket.removeListener('connected users')
  }

  render() {
    let { discussionId, discussion, user } = this.props
    return (
      <div>
        {user.payload && <DiscussionForm socket={socket}
                                         user={user}
                                         discussionId={discussionId}
                                         discussion={discussion}
                                         onJoinDiscussion={this.onJoinDiscussion.bind(this)}/>}
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
