import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import moment from 'moment'
import { throttle } from '../../utils/helpers'

class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isToggled: (window.innerWidth < 720) ? true : false,
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
    if (window.innerWidth < 720) {
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
      <div className='toggle-sidebar-button' onClick={this.toggleSidebar.bind(this)}>
        <i className='fa fa-bars'></i>
      </div>
    )

    let toggleSidebarBtnContent = (
      <div className='toggle-sidebar-button-content' onClick={this.toggleSidebar.bind(this)}>
        <i className='fa fa-bars'></i>
      </div>
    )

    return (
      <div>
        <nav role='navigation' className='navbar navbar-dark navbar-static'>
          {(this.state.isMobileView) ? toggleSidebarBtn : null}
          <div className='navbar-info'>
            <p className='navbar-logo'>Sportalking</p>
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
              <a className='nav-link sidebar-link' data-toggle='collapse' href='#soccerCollapse' aria-expanded='false' aria-controls='soccerCollapse'>
                <i className='fa fa-angle-down'></i>
                <span className='sidebar-list-item'>Soccer</span>
              </a>
            </li>
            <div className='collapse' id='soccerCollapse'>
              <ul className='nav sidebar-list-static nested'>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>English Premier League</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Bundesliga</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>La Liga</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Ukrainian Premier League</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Serie A</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Eredivisie</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link nested' href='#'>
                    <i className='fa fa-chevron-circle-right'></i>
                    <span className='sidebar-list-item'>Major League Soccer</span>
                  </a>
                </li>
              </ul>
            </div>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-angle-right'></i>
                <span className='sidebar-list-item'>Basketball</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-angle-right'></i>
                <span className='sidebar-list-item'>American Football</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-angle-right'></i>
                <span className='sidebar-list-item'>Hockey</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-angle-right'></i>
                <span className='sidebar-list-item'>Tennis</span>
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
