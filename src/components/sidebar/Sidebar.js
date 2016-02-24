import React, { Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { throttle } from '../../utils/helpers'
import io from 'socket.io-client'
let socket = io('http://localhost:5000')

class Sidebar extends Component {

  componentDidMount() {
    let sidebarEl = document.querySelector('.navbar-static')
    this.windowSizeAction(sidebarEl)

    window.addEventListener('resize', throttle(() => {
      this.windowSizeAction(sidebarEl)
    }))
  }

  windowSizeAction(el) {
    let { onSetMobile } = this.props
    if (window.innerWidth < 721) {
        onSetMobile(true)
        el.classList.add('toggle')
      } else {
        onSetMobile(false)
        el.classList.remove('toggle')
      }
  }

  toggleSidebar() {
    let sidebarEl = document.querySelector('.navbar-static')
    let { onToggle, isToggled } = this.props

    if (isToggled) {
      onToggle(false)
      sidebarEl.classList.remove('toggle')
    } else {
      onToggle(true)
      sidebarEl.classList.add('toggle')
    }
  }

  render() {
    let { isMobileView } = this.props
    let toggleSidebarBtn = (
      <div className='toggle-sidebar-button'>
        <i className='fa fa-bars' onClick={this.toggleSidebar.bind(this)}></i>
      </div>
    )

    let toggleSidebarBtnContent = (
      <span className='fa-stack toggle-sidebar-button-content'>
        <i className='fa fa-square fa-stack-2x'></i>
        <i className='fa fa-bars fa-stack-1x fa-inverse' onClick={this.toggleSidebar.bind(this)}></i>
      </span>
    )

    return (
      <div>
        <nav role='navigation' className='navbar navbar-dark navbar-static'>
          {(isMobileView) ? toggleSidebarBtn : null}
          <div className='navbar-info'>
            <p className='navbar-logo'>Hashline</p>
            <div className='navbar-user-info'>
              <div>Oneal</div>
              <div>oneal@gmail.com</div>
            </div>
          </div>
          <div className='createDiscussion'>
            <Link to='/create' type='button' className='btn btn-success btn-sm' role='button'>
              Create Discussion
            </Link>
          </div>
          <ul className='nav sidebar-list-static'>
            <li className='nav-item'>
              <Link to='/' className='nav-link sidebar-link active'>
                <i className='fa fa-dashcube'></i>
                <span className='sidebar-list-item'>Dash</span>
              </Link>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-fire'></i>
                <span className='sidebar-list-item'>Trending</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-clock-o'></i>
                <span className='sidebar-list-item'>Recent</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-comments'></i>
                <span className='sidebar-list-item'>Most discussed</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' data-toggle='collapse' href='#typeCollapse' aria-expanded='false' aria-controls='typeCollapse'>
                <i className='fa fa-caret-square-o-right'></i>
                <span className='sidebar-list-item'>By Type</span>
              </a>
            </li>
            <div className='collapse' id='typeCollapse'>
              <ul className='nav sidebar-list-static nested'>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Posts</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Galleries</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Events</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Chats</span>
                  </a>
                </li>
              </ul>
            </div>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-hourglass-start'></i>
                <span className='sidebar-list-item'>Limited</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link deactivate'></a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-rss'></i>
                <span className='sidebar-list-item'>Feed</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-commenting-o'></i>
                <span className='sidebar-list-item'>My Discussions</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-tags'></i>
                <span className='sidebar-list-item'>My Tags</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-bell-o'></i>
                <span className='label label-default label-pill pull-xs-right'>14</span>
                <span className='sidebar-list-item'>Notification</span>
              </a>
            </li>
          </ul>
          <div className='navbar-footer'>
            <span className='label label-success text-xs-center'>Alpha v0.1.1</span>
            <p>&copy; {moment().format('YYYY')}</p>
          </div>
        </nav>
        {(isMobileView) ? toggleSidebarBtnContent : null}
      </div>
    )
  }
}

export default Sidebar
