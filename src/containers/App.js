import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { runLogout } from '../actions/loginAction'
import { toggleSidebar, setMobileSidebar, getUserData } from '../actions/sidebarAction'
import { getDiscussionTypes } from '../actions/createDiscussionAction'
import Sidebar from './../components/sidebar/Sidebar'
import LoggedOutMessage from './../components/helpers/LoggedOutMessage'
import io from 'socket.io-client'
let socket = io('http://localhost:5000')

class App extends Component {

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
          discussionTypes } = this.props
    return (
      <div>
        { loggedOut && <LoggedOutMessage/>}
        { isAuthenticated &&
        <div>
          <Sidebar isToggled={isToggled}
                   isMobileView={isMobileView}
                   userInfo={userInfo}
                   discussionTypes={discussionTypes}
                   onSetMobile={value => dispatch(setMobileSidebar(value))}
                   onToggle={value => dispatch(toggleSidebar(value))}
                   onGetUserData={() => dispatch(getUserData())}
                   onGetDiscussionTypes={() => dispatch(getDiscussionTypes())}
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
    discussionTypes: state.createDiscussion.discussionTypes.toJS()
  }
}

export default connect(inject)(App)
