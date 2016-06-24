import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import NotificationsBlock from '../components/notifications/NotificationsBlock'
import { getNotifications,
         setNotificationsArchive,
         deleteNotification,
         deleteNotificationFromArchive } from '../actions/notificationsAction'
import { getDiscussion } from '../actions/discussionAction'
import { push } from 'react-router-redux'

class Notifications extends Component {

  onJoinDiscussion({ id, password = '' }) {
    let { dispatch } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then((status) => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }
      dispatch(push(`/discussion/${id}`))
    })
  }

  render() {
    let { dispatch, notifications } = this.props

    return (
      <div>
        <NotificationsBlock notifications={notifications}
                            deleteNotificationFromArchive={id => dispatch(deleteNotificationFromArchive(id))}
                            onJoinDiscussion={target => this.onJoinDiscussion(target)}
                            deleteNotification={id => dispatch(deleteNotification(id))}
                            setNotificationsArchive={notifications => dispatch(setNotificationsArchive(notifications))}
                            getNotifications={() => dispatch(getNotifications())}/>
      </div>
    )
  }
}

function inject(state) {
  return {
    notifications: state.notifications.notificationsInfo.toJS()
  }
}

export default connect(inject)(Notifications)
