import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import { getDiscussion,
         getConnectedUsers,
         setChatMessage,
         setMessageArchive,
         clearMessageArchive,
         getDiscussionMessages,
         setScrollToBottom } from '../actions/discussionAction'
import DiscussionForm from '../components/discussion/DiscussionForm'
import DiscussionPasswordModal from '../components/discussion/DiscussionPasswordModal'
import io from 'socket.io-client'

class Discussion extends Component {

  constructor(props) {
    super(props)
    this.socket = props.isAuthenticated && io('', { path: '/api/chat' })
  }

  componentWillMount() {
    let { dispatch, discussionId } = this.props

    this.socket.removeListener('leave discussion')
    this.socket.on('join discussion', (username) => {
      this.socket.emit('connected users', discussionId)
      NotificationManager.info(`User ${username} is connected`)
    })

    this.socket.on('leave discussion', (username) => {
      this.socket.emit('connected users', discussionId)
      NotificationManager.info(`User ${username} is disconnected`)
    })

    this.socket.on('connected users', (connectedUsers) => {
      dispatch(getConnectedUsers(connectedUsers))
    })

    this.socket.on('chat message', (created_at, username, message) => {
      dispatch(setMessageArchive({ created_at, username, message }))
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
    this.socket.removeListener('join discussion')
    this.socket.removeListener('connected users')
    this.socket.removeListener('chat message')
  }

  render() {
    let { dispatch, discussionId, discussionInfo, discussionMessages, user, clientHeight } = this.props
    return (
      <div>
        {user.payload && <DiscussionForm socket={this.socket}
                                         clientHeight={clientHeight}
                                         clearMessageArchive={() => dispatch(clearMessageArchive())}
                                         user={user}
                                         discussionId={discussionId}
                                         discussionInfo={discussionInfo}
                                         discussionMessages={discussionMessages}
                                         setScrollToBottom={state => dispatch(setScrollToBottom(state))}
                                         setMessageArchive={data => dispatch(setMessageArchive(data))}
                                         getDiscussionMessages={(discussionId, start, end) => dispatch(getDiscussionMessages(discussionId, start, end))}
                                         setChatMessage={message => dispatch(setChatMessage(message))}
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
    discussionInfo: state.discussion.discussionInfo.toJS(),
    discussionMessages: state.discussion.discussionMessages.toJS(),
    user: state.sidebar.userInfo.toJS(),
    isAuthenticated: state.login.auth.get('isAuthenticated'),
    clientHeight: state.sidebar.sidebarView.get('clientHeight')
  }
}

export default connect(inject)(Discussion)
