import * as React from 'react'

class LoggedOutMessage extends React.Component {

  render() {
    return (
      <div className='logged-out-message'>
        You have been logged out of the Hashline
        <button type='button'
                className='btn btn-warning btn-sm logged-out-button'
                onClick={this.props.onLogout.bind(this)}>Logout</button>
      </div>
    )
  }
}

export default LoggedOutMessage
