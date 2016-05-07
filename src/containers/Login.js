import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { loginUser } from '../actions/loginAction'
import { signUpUser } from '../actions/signUpAction'
import { incorrectUsername, incorrectEmail, incorrectPassword } from '../actions/authErrorsAction'
import { NotificationContainer } from 'react-notifications'
import LoginMenu from '../components/login/LoginMenu'
import LoginForm from '../components/login/LoginForm'
import SignUpForm from '../components/login/SignUpForm'
import ErrorMessage from '../components/helpers/ErrorMessage'
import IntroLogo from '../components/parts/IntroLogo'
import Footer from '../components/parts/Footer'
import Navbar from '../components/parts/Navbar'

class Login extends Component {

  render() {
    let { dispatch,
          pathname,
          errorMessage,
          isAuthenticated,
          incorrectUsernameObj,
          incorrectEmailObj,
          incorrectPasswordObj
        } = this.props
    let inputErrors = { incorrectUsernameObj, incorrectEmailObj, incorrectPasswordObj }
    let errorComponent

    if(isAuthenticated) {
      setTimeout(() => dispatch(replace('/')))
    }

    let loginFromSelector = () => {
      if (pathname === 'login') {
        return <LoginForm inputErrors={inputErrors}
                          onClickLogin={creds => dispatch(loginUser(creds))}
                          emitEmailError={value => dispatch(incorrectEmail(value))}
                          emitPasswordError={(value, message) => dispatch(incorrectPassword(value, message))}/>
      } else {
        return <SignUpForm inputErrors={inputErrors}
                           onClickSignUp={creds => dispatch(signUpUser(creds))}
                           emitUsernameError={value => dispatch(incorrectUsername(value))}
                           emitEmailError={value => dispatch(incorrectEmail(value))}
                           emitPasswordError={(value, message) => dispatch(incorrectPassword(value, message))}/>
      }
    }

    if (errorMessage) {
      errorComponent = <ErrorMessage message={errorMessage.get('message')}/>
    }

    return (
      <div>
        <NotificationContainer/>
        <div className='background-wrapper img-responsive'></div>
        <Navbar/>
        <IntroLogo/>
        <div className='login-block card card-block col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-xl-4 col-xl-offset-4'>
          <LoginMenu active={pathname}/>
          <hr className='col-xs-11 col-md-11'/>
          {errorComponent}
          <div className='col-sm-12 col-md-12 col-xl-12'>
            {loginFromSelector()}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

function inject(state, ownProps) {
  return {
    pathname: ownProps.location.pathname,
    errorMessage: state.login.auth.get('errorMessage'),
    isAuthenticated: state.login.auth.get('isAuthenticated'),
    incorrectUsernameObj: state.login.authErrors.get('usernameError').toJS(),
    incorrectEmailObj: state.login.authErrors.get('emailError').toJS(),
    incorrectPasswordObj: state.login.authErrors.get('passwordError').toJS()
  }
}

export default connect(inject)(Login)
