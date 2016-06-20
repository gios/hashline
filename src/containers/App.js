import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'
import { NotificationManager } from 'react-notifications'
import { NotificationContainer } from 'react-notifications'
import { setScrollToBottom } from '../actions/discussionAction'
import { runLogout, setNextPathname } from '../actions/loginAction'
import { toggleSidebar, setMobileSidebar, getUserData, setClientHeight, setClientWidth } from '../actions/sidebarAction'
import { getSidebarTypes } from '../actions/sidebarAction'
import Sidebar from './../components/sidebar/Sidebar'
import LoggedOutMessage from './../components/helpers/LoggedOutMessage'
import Swipeable from 'react-swipeable'

class App extends Component {

  componentWillMount() {
    let { dispatch, isAuthenticated, activeRoute } = this.props

    if (!isAuthenticated) {
      dispatch(replace('/login'))

      if(activeRoute !== 'login') {
        dispatch(setNextPathname(activeRoute))
      }
    }
  }

  sidebarMobileTrigger() {
    this.refs.sidebar.toggleSidebar()
  }

  render() {
    let { dispatch,
          isToggled,
          isMobileView,
          isAuthenticated,
          loggedOut,
          userInfo,
          activeRoute,
          sidebarTypes } = this.props

    return (
      <div>
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
                   setScrollToBottom={scroll => dispatch(setScrollToBottom(scroll))}
                   setClientHeight={height => dispatch(setClientHeight(height))}
                   setClientWidth={width => dispatch(setClientWidth(width))}
                   onSetMobile={value => dispatch(setMobileSidebar(value))}
                   onToggle={value => dispatch(toggleSidebar(value))}
                   onGetUserData={() => dispatch(getUserData()).then(status => {
                     status.error && NotificationManager.error(status.payload.response.message)
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
    activeRoute: routing.location.pathname
  }
}

export default connect(inject)(App)
