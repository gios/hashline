import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import NotificationsBlock from '../components/notifications/NotificationsBlock'
import { getNotifications } from '../actions/notificationsAction'

class Notifications extends Component {

  render() {
    let { dispatch, notifications } = this.props
    return (
      <div className='text-xs-center m-t-3'>
        <NotificationsBlock notifications={notifications}
                            getNotifications={() => dispatch(getNotifications()).then(status => {
                              status.error && NotificationManager.error(status.payload.response.message)
                            })}/>
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
