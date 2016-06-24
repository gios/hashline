import React, { Component } from 'react'
import moment from 'moment'
import { NotificationManager } from 'react-notifications'

class Notification extends Component {

  deleteNotificationConfirm(id) {

    let deleteNotification = confirm('Are you sure to delete this notification?')

    if(deleteNotification) {
      this.props.deleteNotification(id).then(() => {
        if(status.error) {
          NotificationManager.error(status.payload.response.message)
          return
        }
        this.props.deleteNotificationFromArchive(id)
      })
    }
  }

  render() {
    let { id, discussion_name, discussion_type, notification_created_at, notification_discussion_id, sender_name } = this.props.notification

    return (
      <div className='card'>
        <div className='card-header'>
          Invitation to discussion<span className='label label-info pull-xs-right'>{discussion_type}</span>
        </div>
        <div className='card-block'>
          <h5 className='card-title'>{discussion_name}</h5>
          <p className='card-text'><strong>{sender_name}</strong></p>
          <p className='card-text'><small className='text-muted'>{moment(notification_created_at).format('DD MMM YYYY H:mm:ss')}</small></p>
          <button onClick={this.props.onJoinDiscussion.bind(this, { id: notification_discussion_id })} className='btn btn-primary'>Connect to discussion</button>
          <button onClick={this.deleteNotificationConfirm.bind(this, id)} className='btn btn-danger pull-xs-right'>Delete</button>
        </div>
      </div>
    )
  }
}

export default Notification
