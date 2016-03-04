import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Notifications from 'react-notifications'
import { runLogout } from '../actions/loginAction'
import { toggleSidebar, setMobileSidebar, getUserData } from '../actions/sidebarAction'
import { dismissNotification } from '../actions/notificationAction'
import { getSidebarTypes } from '../actions/sidebarAction'
import Sidebar from './../components/sidebar/Sidebar'
import LoggedOutMessage from './../components/helpers/LoggedOutMessage'
import io from 'socket.io-client'
let socket = io('http://localhost:5000')

class App extends Component {

  notificationHide(notification) {
    let { dispatch } = this.props
    dispatch(dismissNotification(notification))
  }

  componentWillMount() {
    let { dispatch, isAuthenticated } = this.props

    if (!isAuthenticated) {
      dispatch(push('/login'))
    }
  }

  render() {
    let { dispatch,
          isToggled,
          isMobileView,
          isAuthenticated,
          loggedOut,
          userInfo,
          notifications,
          sidebarTypes } = this.props

    let notificationsData = notifications.map((item) => {
      item['type'] = item['messageType']
      return item
    })

    return (
      <div>
        <Notifications notifications={notificationsData} onRequestHide={this.notificationHide.bind(this)}/>
        { loggedOut && <LoggedOutMessage/>}
        { isAuthenticated &&
        <div>
          <Sidebar isToggled={isToggled}
                   isMobileView={isMobileView}
                   userInfo={userInfo}
                   sidebarTypes={sidebarTypes}
                   onSetMobile={value => dispatch(setMobileSidebar(value))}
                   onToggle={value => dispatch(toggleSidebar(value))}
                   onGetUserData={() => dispatch(getUserData())}
                   onGetSidebarTypes={() => dispatch(getSidebarTypes())}
                   onLogout={() => {
                     dispatch(push('/login'))
                     dispatch(runLogout())}
                   }/>
          <div className='content-wrapper'>
            <div className='container-fluid'>
              {this.props.children}
            </div>
          </div>
        </div> }
      </div>
    )
  }
}

function inject(state) {
  return {
    isAuthenticated: state.login.auth.get('isAuthenticated'),
    loggedOut: state.login.auth.get('loggedOut'),
    isToggled: state.sidebar.sidebarView.get('isToggled'),
    isMobileView: state.sidebar.sidebarView.get('isMobileView'),
    userInfo: state.sidebar.userInfo.toJS(),
    sidebarTypes: state.sidebar.sidebarTypes.toJS(),
    notifications: state.notification.toJS()
  }
}

export default connect(inject)(App)
