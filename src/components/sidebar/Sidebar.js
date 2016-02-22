import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import moment from 'moment'
import { throttle } from '../../utils/helpers'
import io from 'socket.io-client'
let socket = io('http://localhost:5000')

class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isToggled: (window.innerWidth < 721) ? true : false,
      isMobileView: this.isToggled
    }
  }

  componentDidMount() {
    let sidebarEl = document.querySelector('.navbar-static')
    this.windowSizeAction(sidebarEl)

    window.addEventListener('resize', throttle(() => {
      this.windowSizeAction(sidebarEl)
    }))
  }

  windowSizeAction(el) {
    if (window.innerWidth < 721) {
        if (this.state.isMobileView) {
          return
        }
        this.setState({
          isToggled: true,
          isMobileView: true
        })
        el.classList.add('toggle')
      } else {
        this.setState({
          isToggled: false,
          isMobileView: false
        })
        el.classList.remove('toggle')
      }
  }

  toggleSidebar() {
    let sidebarEl = document.querySelector('.navbar-static')

    if (this.state.isToggled) {
      this.setState({isToggled: false})
      sidebarEl.classList.remove('toggle')
    } else {
      this.setState({isToggled: true})
      sidebarEl.classList.add('toggle')
    }
  }

  render() {
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
          {(this.state.isMobileView) ? toggleSidebarBtn : null}
          <div className='navbar-info'>
            <p className='navbar-logo'>Hashline</p>
            <div className='navbar-user-info'>
              <div>Oneal</div>
              <div>oneal@gmail.com</div>
            </div>
          </div>
          <ul className='nav sidebar-list-static'>
            <li className='nav-item'>
              <a className='nav-link sidebar-link active' href='#'>
                <i className='fa fa-dashcube'></i>
                <span className='sidebar-list-item'>Dash</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' data-toggle='collapse' href='#trandingCollapse' aria-expanded='false' aria-controls='trandingCollapse'>
                <i className='fa fa-fire'></i>
                <span className='sidebar-list-item'>Trending</span>
              </a>
            </li>
            <div className='collapse' id='trandingCollapse'>
              <ul className='nav sidebar-list-static nested'>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Today</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>This Week</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>This Month</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>This Year</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>All Time</span>
                  </a>
                </li>
              </ul>
            </div>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-comments'></i>
                <span className='sidebar-list-item'>Most discussed</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-clock-o'></i>
                <span className='sidebar-list-item'>Limited</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link deactivate'></a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-hashtag'></i>
                <span className='sidebar-list-item'>Create room</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-rss'></i>
                <span className='sidebar-list-item'>Feed</span>
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
        {(this.state.isMobileView) ? toggleSidebarBtnContent : null}
      </div>
    )
  }
}

export default Sidebar
