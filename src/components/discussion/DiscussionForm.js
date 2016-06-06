import React, { Component } from 'react'
import moment from 'moment'
import Loader from '../parts/Loader'

class DiscussionForm extends Component {

  componentWillMount() {
    let { discussionId, discussionInfo, user, socket } = this.props

    if(user.payload) {
      socket.emit('join discussion', { discussionId, username: user.payload.username, email: user.payload.email })
      socket.emit('connected users', discussionId)
    }

    if(!discussionInfo.payload) {
      this.props.onJoinDiscussion({ id: discussionId })
    }
  }

  componentDidMount() {
    this.limitedInterval = setInterval(this.forceUpdate.bind(this), 1000)
  }

  componentWillUnmount() {
    let { socket, discussionId, user } = this.props
    clearInterval(this.limitedInterval)
    socket.emit('leave discussion', { discussionId, username: user.payload.username })
    socket.removeListener('leave discussion')
    socket.removeListener('join discussion')
    socket.removeListener('connected users')
  }

  changeChatMessage(e) {
    this.props.setChatMessage(e.target.value)
  }

  sendMessage(e) {
    let message = this.refs.addMessage.value
    let { socket, discussionId, user, setChatMessage } = this.props
    e.preventDefault()
    socket.emit('chat message', message, discussionId, user.payload)
    setChatMessage('')
  }

  formatExpired(limitedTime) {
    let getExpiredDuration = moment.duration(moment(limitedTime).diff(moment()))

    if(getExpiredDuration.as('seconds') < 1) {
      return false
    }
    let expiredFormat = {
      hours: getExpiredDuration.hours(),
      minutes: (getExpiredDuration.minutes() < 10) ? '0' + getExpiredDuration.minutes(): getExpiredDuration.minutes(),
      seconds: (getExpiredDuration.seconds() < 10) ? '0' + getExpiredDuration.seconds(): getExpiredDuration.seconds()
    }
    return `${expiredFormat.hours}:${expiredFormat.minutes}:${expiredFormat.seconds}`
  }

  render() {
    let { discussionInfo } = this.props
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
          <li className='list-group-item'>
            <strong>Time to expiry:</strong>
            {(discussionInfo.payload.is_limited && !!this.formatExpired(discussionInfo.payload.limited_time))
              ? <div className='pull-xs-right'>{this.formatExpired(discussionInfo.payload.limited_time)}</div>
              : <div className='pull-xs-right'>None</div>}
          </li>
        </ul>
      )
    }

    return (
      <div>
        <div className='col-sm-8'>
          <form onSubmit={this.sendMessage.bind(this)}>
            <fieldset className='form-group'>
              <ul className='list-unstyled'>
                {discussionInfo.messageArchive.map((item, index) => {
                  return (
                    <li key={index}>
                      <dt className='col-sm-3'>{item.user}</dt>
                      <dd className='col-sm-9 chat-discussion-description'>{item.message}</dd>
                    </li>
                  )
                })}
              </ul>
              <input type='text'
                     className='form-control'
                     ref='addMessage'
                     placeholder='Write something'
                     onChange={this.changeChatMessage.bind(this)}
                     value={discussionInfo.chatMessage}/>
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
