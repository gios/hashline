import * as React from 'react'
import { NotificationManager } from 'react-notifications'

class Navbar extends React.Component {

  getFeatures() {
    NotificationManager.info(`There are many features like Realtime discussions,
                                 limited chats,
                                 tags oriented conversations and more.
                                 Everything build with JS and Node.js`, 'Features')
  }

  getAbout() {
    NotificationManager.info(`I am a Front-End Developer, Active Github User and Great Person :)`,
                             'Pavlo Blazhchuk')
  }

  render() {
    return (
      <nav className='navbar navbar-dark'>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <a onClick={this.getFeatures.bind(this)} className='nav-link' href='javascript:void(0)'>Features</a>
          </li>
          <li className='nav-item'>
            <a onClick={this.getAbout.bind(this)} className='nav-link' href='javascript:void(0)'>About</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
