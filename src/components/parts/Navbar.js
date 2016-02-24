import React, { Component } from 'react'

class Navbar extends Component {

  render() {
    return (
      <nav className='navbar navbar-dark'>
        <a className='navbar-brand' href='#'>Hashline</a>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <a className='nav-link' href='#'>Features</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>Pricing</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>About</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
