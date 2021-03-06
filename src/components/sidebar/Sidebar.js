import React, { Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Loader from '../parts/Loader'
import { throttle } from '../../utils/helpers'
import { MOBILE_MAX_WIDTH, VERSION } from '../../constants'

class Sidebar extends Component {

  componentWillMount() {
    let { setClientHeight, setClientWidth, onGetUserData, onGetSidebarTypes } = this.props
    onGetUserData()
    onGetSidebarTypes()
    setClientHeight(window.innerHeight || document.body.clientHeight)
    setClientWidth(window.innerWidth || document.body.clientWidth)
  }

  componentDidMount() {
    let sidebarEl = document.querySelector('.navbar-static')
    this.windowSizeAction(sidebarEl)

    window.addEventListener('resize', throttle(() => {
      this.windowSizeAction(sidebarEl)
      this.props.setClientHeight(window.innerHeight || document.body.clientHeight)
      this.props.setClientWidth(window.innerWidth || document.body.clientWidth)
    }, 200))
  }

  windowSizeAction(el) {
    let { onSetMobile } = this.props
    if (window.innerWidth < MOBILE_MAX_WIDTH) {
        onSetMobile(true)
        el.classList.add('toggle')
      } else {
        onSetMobile(false)
        el.classList.remove('toggle')
      }
  }

  toggleSidebar() {
    let sidebarEl = document.querySelector('.navbar-static')
    let { onToggle, isToggled, setScrollToBottom } = this.props
    setScrollToBottom(false)

    if (isToggled) {
      onToggle(false)
      sidebarEl.classList.remove('toggle')
    } else {
      onToggle(true)
      sidebarEl.classList.add('toggle')
    }
  }

  routeSelector(route) {
    let { activeRoute } = this.props
    return (activeRoute === route) ? 'nav-link sidebar-link active' : 'nav-link sidebar-link'
  }

  triggerRoute() {
    let { isMobileView } = this.props
    isMobileView && this.toggleSidebar()
  }

  logout() {
    this.props.onLogout()
  }

  searchQueryChange(e) {
    let value = e.target.value
    this.props.setSearchQueryDiscussions(value)
  }

  runSearchQuery(e) {
    e.preventDefault()
    let value = this.refs.searchQueryInput.value

    if(value) {
      this.props.runSearchQueryDiscussions()
    }
  }

  render() {
    let { isMobileView, userInfo, sidebarTypes, searchQueryDiscussions } = this.props
    let userInfoRender, typesOptions, searchRender

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

    if(userInfo.isFetching) {
      userInfoRender = <Loader size={2}/>
    } else if(userInfo.payload) {
      userInfoRender = (
        <div>
          <div>{userInfo.payload.username}</div>
          <div>{userInfo.payload.email}</div>
        </div>
      )
    }

    if(sidebarTypes.payload) {
      typesOptions = sidebarTypes.payload.types && sidebarTypes.payload.types.map((item) => {
        return (
          <li key={item.id} className='nav-item'>
            <Link to={`/type/${item.name.toLowerCase()}`}
                  className={this.routeSelector(`type/${item.name.toLowerCase()}`)}
                  onClick={this.triggerRoute.bind(this)}>
              <i className='fa fa-chevron-circle-right'></i>
              <span className='sidebar-list-item'>{item.name}</span>
            </Link>
          </li>
        )
      })
    }

    searchRender = (
    <li className='nav-item'>
      <div className='input-group m-a-1'>
        <form onSubmit={this.runSearchQuery.bind(this)}>
          <input onChange={this.searchQueryChange.bind(this)}
                 ref='searchQueryInput'
                 type='text'
                 className='form-control'
                 placeholder='Search'
                 value={searchQueryDiscussions}/>
        </form>
        <span className='input-group-btn'>
          <button onClick={this.runSearchQuery.bind(this)} className='btn btn-secondary' type='button'>Go</button>
        </span>
      </div>
    </li>)

    return (
      <div>
        <nav role='navigation' className='navbar navbar-dark navbar-static'>
          {(isMobileView) ? toggleSidebarBtn : null}
          <div className='navbar-info'>
            <p className='navbar-logo'>Hashline</p>
            <div className='navbar-user-info'>
              {userInfoRender}
            </div>
          </div>
          <div className='createDiscussion'>
            <Link to='/create' type='button' className='btn btn-success btn-sm' role='button' onClick={this.triggerRoute.bind(this)}>
              Create Discussion
            </Link>
          </div>
          <ul className='nav sidebar-list-static'>
            <li className='nav-item'>
              <a className={this.routeSelector('search')}
                 data-toggle='collapse'
                 href='#searchCollapse'
                 aria-expanded='false'
                 aria-controls='searchCollapse'>
                <i className='fa fa-search'></i>
                <span className='sidebar-list-item'>Search</span>
              </a>
            </li>
            <div className='collapse' id='searchCollapse'>
              <ul className='nav sidebar-list-static nested'>
                {searchRender}
              </ul>
            </div>
            <li className='nav-item'>
              <Link to='/' className={this.routeSelector('/')} onClick={this.triggerRoute.bind(this)}>
                <i className='fa fa-dashcube'></i>
                <span className='sidebar-list-item'>Dash</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/trending' className={this.routeSelector('trending')} onClick={this.triggerRoute.bind(this)}>
                <i className='fa fa-fire'></i>
                <span className='sidebar-list-item'>Trending</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/recent' className={this.routeSelector('recent')} onClick={this.triggerRoute.bind(this)}>
                <i className='fa fa-clock-o'></i>
                <span className='sidebar-list-item'>Recent</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/mostdiscussed' className={this.routeSelector('mostdiscussed')} onClick={this.triggerRoute.bind(this)}>
                <i className='fa fa-comments'></i>
                <span className='sidebar-list-item'>Most discussed</span>
              </Link>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' data-toggle='collapse' href='#typeCollapse' aria-expanded='false' aria-controls='typeCollapse'>
                <i className='fa fa-caret-square-o-right'></i>
                <span className='sidebar-list-item'>By Type</span>
              </a>
            </li>
            <div className='collapse' id='typeCollapse'>
              <ul className='nav sidebar-list-static nested'>
                {typesOptions}
              </ul>
            </div>
            <li className='nav-item'>
              <Link to='/limited' className={this.routeSelector('limited')} onClick={this.triggerRoute.bind(this)}>
                <i className='fa fa-hourglass-start'></i>
                <span className='sidebar-list-item'>Limited</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/mydiscussions' className={this.routeSelector('mydiscussions')} onClick={this.triggerRoute.bind(this)}>
                <i className='fa fa-commenting-o'></i>
                <span className='sidebar-list-item'>My Discussions</span>
              </Link>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link deactivate'></a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='javascript:void(0)' onClick={this.logout.bind(this)}>
                <i className='fa fa-sign-out'></i>
                <span className='sidebar-list-item'>Logout</span>
              </a>
            </li>
          </ul>
          <div className='navbar-footer'>
            <span className='label label-success text-xs-center'>{VERSION}</span>
            <p>&copy; {moment().format('YYYY')}</p>
          </div>
        </nav>
        {(isMobileView) ? toggleSidebarBtnContent : null}
      </div>
    )
  }
}

export default Sidebar
