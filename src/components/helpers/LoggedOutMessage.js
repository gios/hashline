import React, { Component } from 'react'

class LoggedOutMessage extends Component {

  render() {
    return (
      <div className='logged-out-message'>
        You have been logged out of the Hashline
        <button type='button'
                className='btn btn-warning btn-sm pull-xs-right'
                onClick={this.props.onLogout.bind(this)}>Logout</button>
      </div>
    )
  }
}

export default LoggedOutMessage
