import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { DOMtoArray } from '../../utils/helpers'

class SignUpForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      usernameError: 'You entered a wrong username.',
      emailError: 'You entered a wrong email adresses.',
      passwordError: 'Password length must be greater than 6.'
    }
  }

  componentWillMount() {
    let tooltips = document.querySelectorAll('.tooltip')
    let errorMessage = document.querySelector('.login-error-message')
    DOMtoArray(tooltips).map(elem => elem.remove())
    errorMessage && errorMessage.remove()
  }

  signUpEvent(e) {
    e.preventDefault()
    let usernameInput = this.refs.signUpUsername
    let emailInput = this.refs.signUpEmail
    let passwordInput = this.refs.signUpPassword
    let rePasswordInput = this.refs.signUpRePassword

    if (this.validateFields(usernameInput, emailInput, passwordInput, rePasswordInput)) {
      this.props.onClickSignUp({
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
      })
    }
  }

  validateFields(usernameInput, emailInput, passwordInput, rePasswordInput) {
    let isValidEmail = this.validateEmail(emailInput.value)
    let isValidUsername = this.validateUsername(usernameInput.value)
    let isValidPassword = this.validatePassword(passwordInput.value)
    let isValidPasswords = this.validatePasswords(passwordInput.value, rePasswordInput.value)

    let signUpInputs = document.querySelectorAll('.form-control')

    if(!isValidUsername) {
      $(usernameInput).tooltip('show')
      usernameInput.classList.add('input-incorrect')
    } else {
      $(usernameInput).tooltip('hide')
      usernameInput.classList.remove('input-incorrect')
    }

    if(!isValidEmail) {
      $(emailInput).tooltip('show')
      emailInput.classList.add('input-incorrect')
    } else {
      $(emailInput).tooltip('hide')
      emailInput.classList.remove('input-incorrect')
    }

    if(!isValidPassword) {
      this.setState({ passwordError: 'Password length must be greater than 6.' }, () => {
        $(passwordInput).tooltip('show')
        passwordInput.classList.add('input-incorrect')
        rePasswordInput.classList.add('input-incorrect')
      })
    } else {
      if(!isValidPasswords) {
        this.setState({ passwordError: 'Your passwords don\'t match, check them.' }, () => {
          $(passwordInput).tooltip('show')
          passwordInput.classList.add('input-incorrect')
          rePasswordInput.classList.add('input-incorrect')
        })
      } else {
        $(passwordInput).tooltip('hide')
        passwordInput.classList.remove('input-incorrect')
        rePasswordInput.classList.remove('input-incorrect')
      }
    }

    return DOMtoArray(signUpInputs).every(elem => !elem.classList.contains('input-incorrect'))
  }

  validateEmail(email) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  validateUsername(username) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  }

  validatePasswords(password, rePassword) {
    if (password !== '' && rePassword !== '') {
      return password === rePassword;
    }
  }

  validatePassword(password) {
    return (password.length >= 6) ? true : false
  }

  render() {
    return (
      <form onSubmit={this.signUpEvent.bind(this)} noValidate>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='text' className='form-control' placeholder='Username' ref='signUpUsername'
            data-toggle='tooltip' data-html='true' data-trigger='manual' data-placement='right'
            data-original-title={this.state.usernameError}/>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='email' className='form-control' placeholder='Email' ref='signUpEmail'
            data-toggle='tooltip' data-html='true' data-trigger='manual' data-placement='right'
            data-original-title={this.state.emailError}/>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='password' className='form-control' placeholder='Password' ref='signUpPassword'
            data-toggle='tooltip' data-html='true' data-trigger='manual' data-placement='right'
            data-original-title={this.state.passwordError}/>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='password' className='form-control' placeholder='Repeat Password' ref='signUpRePassword'/>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-md-8 col-md-offset-2'>
            <button type='submit' className='btn btn-success-outline col-xs-12 col-md-12'>Sign Up</button>
          </div>
        </div>
      </form>
    )
  }
}

export default SignUpForm
