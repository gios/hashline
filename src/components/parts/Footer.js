import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import moment from 'moment'

class Footer extends Component {

  render() {
    return (
      <nav className='navbar navbar-fixed-bottom navbar-dark'>
        <ul className='nav navbar-nav'>
          <li className='nav-item'>
            <div className='nav-link copyright-footer'>Sportalking &copy;{moment().format('YYYY')}</div>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Footer
