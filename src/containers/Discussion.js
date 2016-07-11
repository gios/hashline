import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import { getDiscussion,
         getConnectedUsers,
         setChatMessage,
         setMessageArchive,
         setSentMessageArchive,
         clearMessageArchive,
         getDiscussionMessages,
         setScrollToBottom,
         setStartLoadMessages,
         setEndLoadMessages,
         setLoadDisableMessages,
         discussionUsersInvite,
         getSearchUsers,
         toggleEmojiPopup,
         typingMessage,
         removeTypingMessage } from '../actions/discussionAction'
import DiscussionForm from '../components/discussion/DiscussionForm'
import DiscussionPasswordModal from '../components/discussion/DiscussionPasswordModal'
import DiscussionExpiredModal from '../components/discussion/DiscussionExpiredModal'
import socket from '../utils/socket'
import { tabVisibility } from '../utils/helpers'
import notificationSound from '../assets/audio/notification.mp3'
import { replace } from 'react-router-redux'

class Discussion extends Component {

  componentWillMount() {
    let { dispatch, discussionId } = this.props
    this.typingTimeouts = []

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

    socket.on('chat message', (created_at, username, message) => {
      if(!tabVisibility()) {
        const notificationSoundInstance = new Audio(notificationSound)
        notificationSoundInstance.play()
      }
      dispatch(setSentMessageArchive({ created_at, username, message }))
      dispatch(setScrollToBottom(true))
    })

    socket.on('typing message', username => {
      dispatch(typingMessage(username))
      clearTimeout(this.typingTimeouts.findIndex(timer => timer === this.typingTimeout))
      const typingTimeoutId = setTimeout(() => dispatch(removeTypingMessage(username)), 3000)
      this.typingTimeout = typingTimeoutId
      this.typingTimeouts.push(typingTimeoutId)
    })

    socket.on('stop typing message', username => {
      dispatch(removeTypingMessage(username))
    })
  }

  onJoinDiscussion({ id, password = '' }) {
    let { dispatch, user } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then(status => {
      if(status.error && status.payload.status === 412) {
        NotificationManager.error(status.payload.response.message)
        this.refs.discussionPasswordModal.refs.privateDiscussionModal.show()
        return
      } else if(status.error) {
        NotificationManager.error(status.payload.response.message)
        this.refs.discussionExpiredModal.refs.expiredDiscussionModal.show()
        return
      }

      this.refs.discussionPasswordModal.refs.privateDiscussionModal.hide()
      this.refs.discussionExpiredModal.refs.expiredDiscussionModal.hide()
      this.refs.discussionFormRef.loadDiscussionMessages()
      socket.emit('join discussion', { discussionId: parseInt(id), username: user.payload.username, email: user.payload.email })
      socket.emit('connected users', parseInt(id))
    })
  }

  componentWillUnmount() {
    this.refs.discussionPasswordModal.refs.privateDiscussionModal.hide()
    socket.removeListener('join discussion')
    socket.removeListener('connected users')
    socket.removeListener('chat message')
    socket.removeListener('typing message')
  }

  render() {
    let { dispatch, discussionId, discussionInfo, discussionMessages, user, clientHeight, searchUsers } = this.props
    return (
      <div>
        {user.payload && <DiscussionForm socket={socket}
                                         ref='discussionFormRef'
                                         clientHeight={clientHeight}
                                         clearMessageArchive={() => dispatch(clearMessageArchive())}
                                         user={user}
                                         discussionId={discussionId}
                                         discussionInfo={discussionInfo}
                                         discussionMessages={discussionMessages}
                                         searchUsers={searchUsers}
                                         toggleEmojiPopup={() => dispatch(toggleEmojiPopup())}
                                         getSearchUsers={search => dispatch(getSearchUsers(search))}
                                         discussionUsersInvite={usersInvite => dispatch(discussionUsersInvite(usersInvite))}
                                         setStartLoadMessages={start => dispatch(setStartLoadMessages(start))}
                                         setEndLoadMessages={end => dispatch(setEndLoadMessages(end))}
                                         setLoadDisableMessages={disabled => dispatch(setLoadDisableMessages(disabled))}
                                         setScrollToBottom={state => dispatch(setScrollToBottom(state))}
                                         setMessageArchive={data => dispatch(setMessageArchive(data))}
                                         getDiscussionMessages={(discussionId, start, end) => dispatch(getDiscussionMessages(discussionId, start, end))}
                                         setChatMessage={message => dispatch(setChatMessage(message))}
                                         onJoinDiscussion={this.onJoinDiscussion.bind(this)}/>}
        <DiscussionPasswordModal ref='discussionPasswordModal'
                                 redirectToBase={() => dispatch(replace('/'))}
                                 discussionId={discussionId}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}/>
        <DiscussionExpiredModal ref='discussionExpiredModal'
                                redirectToBase={() => dispatch(replace('/'))}/>
      </div>
    )
  }
}

function inject(state, routing) {
  return {
    discussionId: parseInt(routing.params.id),
    searchUsers: state.discussion.searchUsers.toJS(),
    discussionInfo: state.discussion.discussionInfo.toJS(),
    discussionMessages: state.discussion.discussionMessages.toJS(),
    user: state.sidebar.userInfo.toJS(),
    isAuthenticated: state.login.auth.get('isAuthenticated'),
    clientHeight: state.sidebar.sidebarView.get('clientHeight')
  }
}

export default connect(inject)(Discussion)
