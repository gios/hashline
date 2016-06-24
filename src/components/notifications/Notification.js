import React, { Component } from 'react'
import moment from 'moment'

class Notification extends Component {

  render() {
    // GET PROPS
    // let {  }
    return (
      <div className='alert alert-info' role='alert'>
        <strong>Let's go to discussing!</strong> The
        <strong>Heads up!</strong> This <a href='#' className='alert-link'>alert needs your attention</a>, but it's not super important.
      </div>
    )
  }
}

export default Notification
