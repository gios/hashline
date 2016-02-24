import React, { Component } from 'react'

class ErrorMessage extends Component {

  render() {
    let { message } = this.props

    return (
      <div className='login-error-message col-sm-12 col-md-12 col-xl-12'>
        {message}
      </div>
    )
  }
}

export default ErrorMessage
