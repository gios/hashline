import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { loginUser } from '../actions/loginAction'
import { signUpUser } from '../actions/signUpAction'
import LoginMenu from '../components/login/LoginMenu'
import LoginForm from '../components/login/LoginForm'
import SignUpForm from '../components/login/SignUpForm'

class Login extends Component {

  render() {
    let { dispatch, pathname } = this.props

    let loginFromSelector = () => {
      if (pathname === '/login') {
        return <LoginForm onClickLogin={creds => dispatch(loginUser(creds))}/>
      } else {
        return <SignUpForm onClickSignUp={creds => dispatch(signUpUser(creds))}/>
      }
    };

    return (
      <div className='login-block card card-block col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-xl-4 col-xl-offset-4'>
        <LoginMenu active={pathname}/>
        <hr className='col-xs-11 col-md-11'/>
        {loginFromSelector()}
      </div>
    )
  }
}

function inject(state) {
  return {
    pathname: state.routing.location.pathname
  }
}

export default connect(inject)(Login)
