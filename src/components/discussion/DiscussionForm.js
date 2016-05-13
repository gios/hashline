import React, { Component } from 'react'
import moment from 'moment'
import Loader from '../parts/Loader'

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
          <form>
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
