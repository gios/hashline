import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import moment from 'moment'

class Footer extends Component {

  render() {
    return (
      <nav className='navbar navbar-fixed-bottom navbar-dark'>
        <div className='copyright-footer text-xs-center'>Hashline &copy; {moment().format('YYYY')}</div>
      </nav>
    )
  }
}

export default Footer
