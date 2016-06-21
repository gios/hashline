import * as React from 'react'
import * as moment from 'moment'

class Footer extends React.Component {

  render() {
    return (
      <nav className='navbar navbar-fixed-bottom navbar-dark'>
        <div className='copyright-footer text-xs-center'>Hashline &copy; {moment().format('YYYY')}</div>
      </nav>
    )
  }
}

export default Footer
