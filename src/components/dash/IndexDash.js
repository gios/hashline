import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class IndexDash extends Component {

  render() {
    return (
      <nav role='navigation' className='navbar navbar-dark navbar-static'>
        <div className='navbar-info'>
          <p className='navbar-logo'>Sportalking</p>
          <div className='navbar-user-info'>
            <div>Oneal</div>
            <div>oneal@gmail.com</div>
          </div>
        </div>
        <div className='collapse navbar-toggleable-xs'>
          <ul className='nav sidebar-list-static'>
            <li className='nav-item active'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-dashcube'></i>
                <span className='sidebar-list-item'>Dash</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-futbol-o'></i>
                <span className='sidebar-list-item'>Soccer</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-camera-retro'></i>
                <span className='sidebar-list-item'>Basketball</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-camera-retro'></i>
                <span className='sidebar-list-item'>American Football</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-camera-retro'></i>
                <span className='sidebar-list-item'>Hockey</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-camera-retro'></i>
                <span className='sidebar-list-item'>Tennis</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default IndexDash
