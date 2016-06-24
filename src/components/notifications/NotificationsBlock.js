import React, { Component } from 'react'
import Loader from '../parts/Loader'
import NoDiscussionsCard from '../discussions/NoDiscussionsCard'
import Notification from './Notification'

class NotificationsBlock extends Component {

  componentWillMount() {
    this.props.getNotifications()
  }

  renderNotifications() {
    let { notifications } = this.props

    if(notifications.isFetching) {
      return <Loader size={4}/>
    } else if(notifications.payload) {
      if(!notifications.payload.length) {
        return (
          <NoDiscussionsCard>
            <h3>You don't have any notifications.</h3><br/>
            <p>Please wait someone, who invites you</p>
          </NoDiscussionsCard>
        )
      }
      return notifications.payload.map(notification => {
        return (
          <div key={notification.id} className='col-sm-4'>
            <Notification notification={notification}
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
