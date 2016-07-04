import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'
import { NotificationManager } from 'react-notifications'
import { NotificationContainer } from 'react-notifications'
import { setScrollToBottom } from '../actions/discussionAction'
import { runLogout, setNextPathname } from '../actions/loginAction'
import { toggleSidebar, setMobileSidebar, getUserData, setClientHeight, setClientWidth } from '../actions/sidebarAction'
import { setSearchQueryDiscussions, updateSearchQueryDiscussions } from '../actions/discussionsAction'
import { getSidebarTypes } from '../actions/sidebarAction'
import Sidebar from './../components/sidebar/Sidebar'
import LoggedOutMessage from './../components/helpers/LoggedOutMessage'
import Swipeable from 'react-swipeable'
import socket from '../utils/socket'
import { isSupported, permissionGranted, requestPermission } from '../utils/notifications'

class App extends Component {

  componentWillMount() {
    let { dispatch, isAuthenticated, activeRoute } = this.props

    if (!isAuthenticated) {
      dispatch(replace('/login'))

      if(activeRoute !== 'login') {
        dispatch(setNextPathname(activeRoute))
      }
    }

    socket.on('invite users', notificationsData => {
      this.sendNotificationForInvite(notificationsData)
    })
  }

  sendNotificationForInvite(notificationsData) {
    let notificationsOptions = {
      body: `${notificationsData.senderName} invites you to connect to discussion`,
      icon: 'assets/img/notification.jpg'
    }

    if(isSupported()) {
      if(permissionGranted()) {
        this.createNotificationInstance(notificationsData.discussionId, notificationsData.discussionName, notificationsOptions)
      } else {
        requestPermission(() => {
          this.createNotificationInstance(notificationsData.discussionId, notificationsData.discussionName, notificationsOptions)
        })
      }
    } else {
      NotificationManager.warning(status.payload.response.message)
    }
  }

  createNotificationInstance(discussionId, title, options) {
    const inviteNotification = new Notification(title, options)
    let self = this

    inviteNotification.onclick = function(e) {
      e.preventDefault()
      try {
        window.focus()
        this.close()
        self.props.dispatch(push(`/discussion/${discussionId}`))
      } catch(error) {
        NotificationManager.error(error)
      }
    }
  }

  sidebarMobileTrigger() {
    this.refs.sidebar.toggleSidebar()
  }

  runSearchQueryDiscussions() {
    let { dispatch, activeRoute } = this.props

    if(activeRoute !== 'search') {
      dispatch(push('/search'))
    } else {
      dispatch(updateSearchQueryDiscussions(true))
    }
  }

  render() {
    let { dispatch,
          isToggled,
          isMobileView,
          isAuthenticated,
          loggedOut,
          userInfo,
          activeRoute,
          sidebarTypes,
          searchQueryDiscussions } = this.props

    return (
      <div>
        <div className='notification-img'></div>
        <NotificationContainer/>
        { loggedOut && <LoggedOutMessage onLogout={() => {
          dispatch(push('/login'))
          dispatch(runLogout())}
        }/>}
        { isAuthenticated ?
        <div>
          <Sidebar ref='sidebar'
                   isToggled={isToggled}
                   isMobileView={isMobileView}
                   userInfo={userInfo}
                   sidebarTypes={sidebarTypes}
                   activeRoute={activeRoute}
                   searchQueryDiscussions={searchQueryDiscussions}
                   runSearchQueryDiscussions={() => this.runSearchQueryDiscussions()}
                   setSearchQueryDiscussions={query => dispatch(setSearchQueryDiscussions(query))}
                   setScrollToBottom={scroll => dispatch(setScrollToBottom(scroll))}
                   setClientHeight={height => dispatch(setClientHeight(height))}
                   setClientWidth={width => dispatch(setClientWidth(width))}
                   onSetMobile={value => dispatch(setMobileSidebar(value))}
                   onToggle={value => dispatch(toggleSidebar(value))}
                   onGetUserData={() => dispatch(getUserData()).then(status => {
                     if(status.error) {
                       NotificationManager.error(status.payload.response.message)
                       return
                     }
                     socket.emit('join user', status.payload)
                   })}
                   onGetSidebarTypes={() => dispatch(getSidebarTypes()).then(status => {
                     status.error && NotificationManager.error(status.payload.response.message)
                   })}
                   onLogout={() => {
                     dispatch(push('/login'))
                     dispatch(runLogout())}
                   }/>
          <Swipeable onSwipedRight={this.sidebarMobileTrigger.bind(this)}
                     onSwipedLeft={this.sidebarMobileTrigger.bind(this)}>
            <div className='content-wrapper'>
              <div className='container-fluid'>
                {this.props.children}
              </div>
            </div>
          </Swipeable>
        </div> : this.props.children}
      </div>
    )
  }
}

function inject(state, routing) {
  return {
    isAuthenticated: state.login.auth.get('isAuthenticated'),
    loggedOut: state.login.auth.get('loggedOut'),
    isToggled: state.sidebar.sidebarView.get('isToggled'),
    isMobileView: state.sidebar.sidebarView.get('isMobileView'),
    userInfo: state.sidebar.userInfo.toJS(),
    sidebarTypes: state.sidebar.sidebarTypes.toJS(),
    activeRoute: routing.location.pathname,
    searchQueryDiscussions: state.discussions.getDiscussions.get('searchQuery')
  }
}

export default connect(inject)(App)
