import React, { Component } from 'react'
import moment from 'moment'

class Notification extends Component {

  render() {
    let { discussion_name, discussion_type, notification_created_at, notification_discussion_id, sender_name } = this.props.notification

    return (
      <div className='card card-block'>
        <div className='card-header'>
          Invitation to discussion
        </div>
        <div className='card-block'>
          <h5 className='card-title'>{discussion_name}</h5>
          <span className='label label-info'>{discussion_type}</span>
          <p className='card-text'>{sender_name}</p>
          <p className='card-text'>{moment(notification_created_at).format('DD MMM YYYY H:mm:ss')}</p>
          <button onClick={this.props.onJoinDiscussion.bind(this, { id: notification_discussion_id })} className='btn btn-primary'>Connect to discussion</button>
        </div>
      </div>
    )
  }
}

export default Notification
