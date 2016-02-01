import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import LoginMenu from '../components/login/LoginMenu'
import SignUpForm from '../components/login/SignUpForm'

class SignUp extends Component {

  render() {
    let { pathname } = this.props
    return (
      <div className='login-block card card-block col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-xl-4 col-xl-offset-4'>
        <LoginMenu active={pathname}/>
        <hr className='col-xs-11 col-md-11'/>
        <SignUpForm/>
      </div>
    )
  }
}

function inject(state) {
  return {
    pathname: state.routing.location.pathname
  }
}

export default connect(inject)(SignUp)
