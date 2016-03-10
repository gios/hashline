import React, { Component } from 'react'
import { Link } from 'react-router'

class LoginMenu extends Component {

  render() {
    let active = this.props.active
    return (
      <div className='col-xs-12 col-md-12'>
        <div className='text-xs-center col-xs-6 col-md-6'>
          <Link to='/login' className={('login' === active) ? 'login-menu-link active' : 'login-menu-link'}>Login</Link>
        </div>
        <div className='text-xs-center col-xs-6 col-md-6'>
          <Link to='/signup' className={('signup' === active) ? 'login-menu-link active' : 'login-menu-link'}>Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default LoginMenu
