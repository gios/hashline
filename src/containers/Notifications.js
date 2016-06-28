import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import NotificationsBlock from '../components/notifications/NotificationsBlock'
import { getNotifications,
         setNotificationsArchive,
         deleteNotification,
         deleteNotificationFromArchive } from '../actions/notificationsAction'
import { getUserData } from '../actions/sidebarAction'
import { getDiscussion } from '../actions/discussionAction'
import { push } from 'react-router-redux'
import socket from '../utils/socket'

class Notifications extends Component {

  onJoinDiscussion({ notificationId, id, password = '' }) {
    let { dispatch, user } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then((status) => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }
      dispatch(deleteNotification(notificationId)).then(() => {
        dispatch(deleteNotificationFromArchive(notificationId))
        dispatch(getUserData()).then(() => {
          socket.emit('join discussion', { discussionId: parseInt(id), username: user.payload.username, email: user.payload.email })
          socket.emit('connected users', parseInt(id))
          dispatch(push(`/discussion/${id}`))
        })
      })
    })
  }

  render() {
    let { dispatch, notifications } = this.props

    return (
      <div>
        <NotificationsBlock notifications={notifications}
                            getUserData={() => dispatch(getUserData())}
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
    notifications: state.notifications.notificationsInfo.toJS(),
    user: state.sidebar.userInfo.toJS()
  }
}

export default connect(inject)(Notifications)
