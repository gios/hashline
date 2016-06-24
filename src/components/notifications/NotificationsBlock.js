import React, { Component } from 'react'
import moment from 'moment'

class NotificationsBlock extends Component {

  componentWillMount() {
    this.props.getNotifications()
  }

  render() {
    return (
      <nav className='navbar navbar-fixed-bottom navbar-dark'>
        <div className='copyright-NotificationsBlock text-xs-center'>Hashline &copy; {moment().format('YYYY')}</div>
      </nav>
    )
  }
}

export default NotificationsBlock
