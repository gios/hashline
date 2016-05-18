import React, { Component } from 'react'
import moment from 'moment'
import Loader from '../parts/Loader'
import { NotificationManager } from 'react-notifications'
import io from 'socket.io-client'
let socket = io('http://localhost:5000')

class DiscussionForm extends Component {

  componentWillMount() {
    let { discussionId, discussion } = this.props
    if(!discussion.payload) {
      this.props.onJoinDiscussion({ id: discussionId })
    }
  }

  componentDidMount() {
    this.limitedInterval = setInterval(this.forceUpdate.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.limitedInterval)
  }

  componentWillReceiveProps(nextProps) {
    let { user, discussionId } = nextProps

    if(user.payload) {
      socket.emit('user-connected', { discussionId, userEmail: user.payload.email })
      socket.on('user-connected', (user) => {
        NotificationManager.info(`User ${user.username} is connected`)
      })
    }
  }

  sendMessage(e) {
    e.preventDefault()
    console.log('submit')
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
    let { discussion } = this.props
    let discussionInfo

    if(discussion.isFetching) {
      discussionInfo = <Loader size={2}/>
    } else if(discussion.payload) {
      discussionInfo = (
        <ul className='list-group'>
          <a className='online-users-chat' data-toggle='collapse' href='#online-users' aria-expanded='false' aria-controls='online-users'>
            <li className='list-group-item m-b-1'>
              <strong>Connected Users:</strong>
              <span className='label label-default label-pill pull-xs-right'>14</span>
            </li>
          </a>
          <div className='collapse' id='online-users'>
            <div className='card card-block'>
              Anim pariatur cliche reprehenderit,
              enim eiusmod high life accusamus terry richardson ad squid.
              Nihil anim keffiyeh helvetica,
              craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
          </div>
          <li className='list-group-item'>
            <strong>Name:</strong>
            <div className='pull-xs-right'>{discussion.payload.name}</div>
          </li>
          <li className='list-group-item'>
            <strong>Description:</strong>
            <div className='chat-info-description'>{discussion.payload.description}</div>
          </li>
          <li className='list-group-item'>
            <strong>Creator:</strong>
            <div className='pull-xs-right'>{discussion.payload.username}</div>
          </li>
          <li className='list-group-item'>
            <strong>Type:</strong>
            <div className='pull-xs-right'>{discussion.payload.type_name}</div>
          </li>
          <li className='list-group-item'>
            <strong>Attributes:</strong>
            <div className='my-discussion-labels pull-xs-right'>
              {(discussion.payload.is_private)
                ? <span className='label label-warning'>Private</span>
                : <span className='label label-primary'>Public</span>}
              {(discussion.payload.is_limited)
                ? <span className='label label-info'>Limited</span>
                : null}
            </div>
          </li>
          <li className='list-group-item'>
            <strong>Tags:</strong>
            <div className='tag-labels pull-xs-right'>
              {discussion.payload.tags && discussion.payload.tags.map((tag, index) => {
                return <span key={index} className='label label-default'>{tag}</span>
              })}
            </div>
          </li>
          <li className='list-group-item'>
            <strong>Time to expiry:</strong>
            {(discussion.payload.is_limited && !!this.formatExpired(discussion.payload.limited_time))
              ? <div className='pull-xs-right'>{this.formatExpired(discussion.payload.limited_time)}</div>
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
                <li>
                  <dt className='col-sm-3'>Description lists</dt>
                  <dd className='col-sm-9 chat-discussion-description'>A description list is perfect for defining terms.ddddddddddddddddddddddd ddddddddddddddddddddddddddddddddddddddddddddddd</dd>
                </li>
                <li>
                  <dt className='col-sm-3'>Description lists</dt>
                  <dd className='col-sm-9 chat-discussion-description'>A description list is perfect for defining terms.</dd>
                </li>
                <li>Hello!</li>
                <li>Hello!</li>
                <li>Hello!</li>
                <li>Hello!</li>
                <li>Hello!</li>
              </ul>
              <input type='text' className='form-control' id='add-message' placeholder='Write something'/>
            </fieldset>
          </form>
        </div>
        <div className='col-sm-4'>
        {discussionInfo}
        </div>
      </div>
    )
  }
}

export default DiscussionForm
