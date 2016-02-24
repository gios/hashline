import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { toggleSidebar, setMobileSidebar } from '../actions/sidebarAction'
import Sidebar from './../components/sidebar/Sidebar'

class App extends Component {

  componentWillMount() {
    let { dispatch, isAuthenticated } = this.props

    if (!isAuthenticated) {
      dispatch(push('/login'))
    }
  }

  render() {
    let { dispatch, isToggled, isMobileView } = this.props
    return (
      <div>
        <Sidebar dispatch={dispatch}
                 isToggled={isToggled}
                 isMobileView={isMobileView}
                 onSetMobile={(value) => dispatch(setMobileSidebar(value))}
                 onToggle={(value) => dispatch(toggleSidebar(value))}/>
        <div className='content-wrapper'>
          <div className='container-fluid'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

function inject(state) {
  return {
    isAuthenticated: state.login.auth.get('isAuthenticated'),
    isToggled: state.sidebar.get('isToggled'),
    isMobileView: state.sidebar.get('isMobileView')
  }
}

export default connect(inject)(App)
