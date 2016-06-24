import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import NotificationsBlock from '../components/notifications/NotificationsBlock'
import { getNotifications } from '../actions/notificationsAction'
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
      <div className='text-xs-center m-t-3'>
        <NotificationsBlock notifications={notifications}
                            onJoinDiscussion={target => this.onJoinDiscussion(target)}
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
