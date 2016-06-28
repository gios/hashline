import React, { Component } from 'react'
import Loader from '../parts/Loader'
import { NotificationManager } from 'react-notifications'
import NoDiscussionsCard from '../discussions/NoDiscussionsCard'
import Notification from './Notification'

class NotificationsBlock extends Component {

  componentWillMount() {
    this.props.getNotifications().then(notifications => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }
      this.props.setNotificationsArchive(notifications.payload)
    })
  }

  renderNotifications() {
    let { notifications } = this.props

    if(notifications.isFetching) {
      return <Loader size={4}/>
    } else if(notifications.notificationsArchive) {
      if(!notifications.notificationsArchive.length) {
        return (
          <NoDiscussionsCard>
            <h3>You don't have any notifications.</h3><br/>
            <p>Please wait someone, who invites you</p>
          </NoDiscussionsCard>
        )
      }
      return notifications.notificationsArchive.map(notification => {
        return (
          <div key={notification.id} className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
            <Notification notification={notification}
                          getUserData={() => this.props.getUserData()}
                          deleteNotificationFromArchive={id => this.props.deleteNotificationFromArchive(id)}
                          deleteNotification={id => this.props.deleteNotification(id)}
                          onJoinDiscussion={target => this.props.onJoinDiscussion(target)}/>
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div className='row'>
        {this.renderNotifications()}
      </div>
    )
  }
}

export default NotificationsBlock
