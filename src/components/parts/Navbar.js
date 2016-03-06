import React, { Component } from 'react'

class Navbar extends Component {

  getFeatures() {
    this.props.onNotifyFeatures(`There are many features like Realtime discussions,
                                 limited chats,
                                 tags oriented conversations and more.
                                 Everything build with JS and Node.js`, 'info', 'Features')
  }

  getAbout() {
    this.props.onNotifyAbout(`I am a Front-End Developer, Active Github User and Great Person :)`,
                             'info',
                             'Pavlo Blazhchuk')
  }

  render() {
    return (
      <nav className='navbar navbar-dark'>
        <a className='navbar-brand' href='#'>Hashline</a>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <a onClick={this.getFeatures.bind(this)} className='nav-link' href='#'>Features</a>
          </li>
          <li className='nav-item'>
            <a onClick={this.getAbout.bind(this)} className='nav-link' href='#'>About</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
