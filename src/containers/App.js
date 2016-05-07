import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { NotificationContainer } from 'react-notifications'
import { runLogout } from '../actions/loginAction'
import { toggleSidebar, setMobileSidebar, getUserData } from '../actions/sidebarAction'
import { getSidebarTypes } from '../actions/sidebarAction'
import Sidebar from './../components/sidebar/Sidebar'
import LoggedOutMessage from './../components/helpers/LoggedOutMessage'
import Swipeable from 'react-swipeable'

class App extends Component {

  componentWillMount() {
    let { dispatch, isAuthenticated } = this.props

    if (!isAuthenticated) {
      dispatch(push('/login'))
    }
  }

  sidebarMobileTrigger() {
    console.log('OPEN SIDEBAR')
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
        { loggedOut && <LoggedOutMessage/>}
        { (isAuthenticated) ?
        <div>
          <Sidebar isToggled={isToggled}
                   isMobileView={isMobileView}
                   userInfo={userInfo}
                   sidebarTypes={sidebarTypes}
                   activeRoute={activeRoute}
                   onSetMobile={value => dispatch(setMobileSidebar(value))}
                   onToggle={value => dispatch(toggleSidebar(value))}
                   onGetUserData={() => dispatch(getUserData())}
                   onGetSidebarTypes={() => dispatch(getSidebarTypes())}
                   onLogout={() => {
                     dispatch(push('/login'))
                     dispatch(runLogout())}
                   }/>
          <Swipeable onSwipedRight={this.sidebarMobileTrigger.bind(this)}>
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
