import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import moment from 'moment'

class Footer extends Component {

  render() {
    return (
      <nav className='navbar navbar-fixed-bottom navbar-light'>
        <ul className='nav navbar-nav'>
          <li className='nav-item active'>
            <a className='nav-link' href='#'>Home <span className='sr-only'>(current)</span></a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>Features</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>Pricing</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>About</a>
          </li>
          <li className='nav-item pull-xs-right'>
            <div className='nav-link copyright-footer'>Sportalking &copy;{moment().format('YYYY')}</div>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Footer
