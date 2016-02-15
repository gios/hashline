import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class Navbar extends Component {

  render() {
    return (
      <nav className='navbar navbar-dark'>
        <a className='navbar-brand' href='#'>Sportalking</a>
        <ul className='nav navbar-nav pull-right'>
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
        </ul>
      </nav>
    )
  }
}

export default Navbar
