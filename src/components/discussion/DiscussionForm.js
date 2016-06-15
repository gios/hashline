import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications'
import DiscussionExpiredTimer from './DiscussionExpiredTimer'
import DiscussionChatMessages from './DiscussionChatMessages'
import { ENTER_KEYCODE } from '../../constants'
import Loader from '../parts/Loader'

class DiscussionForm extends Component {

  componentWillMount() {
    let { discussionId, discussionInfo, user, socket } = this.props

    this.props.getDiscussionMessages(discussionId, 0, 100).then(status => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }
      this.props.setMessageArchive(status.payload)
    })

    if(user.payload) {
      socket.emit('join discussion', { discussionId, username: user.payload.username, email: user.payload.email })
      socket.emit('connected users', discussionId)
    }

    if(!discussionInfo.payload) {
      this.props.onJoinDiscussion({ id: discussionId })
    }
  }

  componentWillUnmount() {
    let { socket, discussionId, user, clearMessageArchive } = this.props
    clearMessageArchive()
    socket.emit('leave discussion', { discussionId, username: user.payload.username })
    socket.removeListener('leave discussion')
    socket.removeListener('join discussion')
    socket.removeListener('connected users')
  }

  changeChatMessage(e) {
    this.props.setChatMessage(e.target.value)
    this.props.setScrollToBottom(false)
  }

  sendMessage(e) {
    if(!e.which || e.which === ENTER_KEYCODE) {
      e.preventDefault()
      let message = this.refs.addMessage.value
      let { socket, discussionId, user, setChatMessage } = this.props
      socket.emit('chat message', message, discussionId, user.payload)
      setChatMessage('')
    }
  }

  render() {
    let { discussionInfo, clientHeight, discussionMessages } = this.props
    let discussionInfoRender

    if(discussionInfo.isFetching) {
      discussionInfoRender = <Loader size={2}/>
    } else if(discussionInfo.payload && discussionInfo.connectedUsers) {
      discussionInfoRender = (
        <ul className='list-group'>
        <a className='online-users-chat' data-toggle='collapse' href='#online-users' aria-expanded='false' aria-controls='online-users'>
            <li className='list-group-item m-b-1'>
              <strong>Connected Users:</strong>
              <span className='label label-default label-pill pull-xs-right'>{discussionInfo.connectedUsers.length}</span>
            </li>
          </a>
          <div className='collapse' id='online-users'>
            <div className='card card-block'>
              <ul className='list-group'>
                  {discussionInfo.connectedUsers.users.map(user => {
                    return (
                      <li key={user.index} className='list-group-item'>
                        <span className='label label-default pull-xs-right chat-user-label'>{user.email}</span>
                        {user.username}
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
          <li className='list-group-item'>
            <strong>Name:</strong>
            <div className='chat-info-description'>{discussionInfo.payload.name}</div>
          </li>
          <li className='list-group-item'>
            <strong>Description:</strong>
            <div className='chat-info-description'>{discussionInfo.payload.description}</div>
          </li>
          <li className='list-group-item'>
            <strong>Creator:</strong>
            <div className='pull-xs-right'>{discussionInfo.payload.username}</div>
          </li>
          <li className='list-group-item'>
            <strong>Type:</strong>
            <div className='pull-xs-right'>{discussionInfo.payload.type_name}</div>
          </li>
          <li className='list-group-item'>
            <strong>Attributes:</strong>
            <div className='my-discussion-labels pull-xs-right'>
              {(discussionInfo.payload.is_private)
                ? <span className='label label-warning'>Private</span>
                : <span className='label label-primary'>Public</span>}
              {(discussionInfo.payload.is_limited)
                ? <span className='label label-info'>Limited</span>
                : null}
            </div>
          </li>
          <li className='list-group-item'>
            <strong>Tags:</strong>
            <div className='tag-labels pull-xs-right'>
              {discussionInfo.payload.tags && discussionInfo.payload.tags.map((tag, index) => {
                return <span key={index} className='label label-default'>{tag}</span>
              })}
            </div>
          </li>
          <DiscussionExpiredTimer discussionInfo={discussionInfo}/>
        </ul>
      )
    }

    return (
      <div>
        <div className='col-sm-8'>
          <form>
            <fieldset className='form-group chat-area'>
              <DiscussionChatMessages clientHeight={clientHeight}
                                      discussionMessages={discussionMessages}
                                      setScrollToBottom={this.props.setScrollToBottom}/>
              <textarea cols='40'
                        rows='3'
                        className='form-control chat-message'
                        ref='addMessage'
                        placeholder='Write something'
                        onKeyPress={this.sendMessage.bind(this)}
                        onChange={this.changeChatMessage.bind(this)}
                        value={discussionMessages.chatMessage}></textarea>
              <button type='button'
                      className='btn btn-primary pull-xs-right m-t-1'
                      onClick={this.sendMessage.bind(this)}>Send</button>
            </fieldset>
          </form>
        </div>
        <div className='col-sm-4'>
          {discussionInfoRender}
        </div>
      </div>
    )
  }
}

export default DiscussionForm
