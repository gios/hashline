import React, { Component } from 'react'
import moment from 'moment'
import { DOMtoArray } from '../../utils/helpers'

class SignUpForm extends Component {

  componentWillMount() {
    let tooltips = document.querySelectorAll('.tooltip')
    DOMtoArray(tooltips).map(elem => elem.remove())
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
        password: passwordInput.value.trim(),
        gmt: moment().utcOffset()
      })
    }
  }

  validateFields(usernameInput, emailInput, passwordInput, rePasswordInput) {
    let isValidEmail = this.validateEmail(emailInput.value)
    let isValidUsername = this.validateUsername(usernameInput.value)
    let isValidPassword = this.validatePassword(passwordInput.value)
    let isValidPasswords = this.validatePasswords(passwordInput.value, rePasswordInput.value)
    let signUpInputs = document.querySelectorAll('.form-control')
    let { emitUsernameError, emitEmailError, emitPasswordError } = this.props

    if(!isValidUsername) {
      emitUsernameError(true)
      setTimeout(() => $(usernameInput).tooltip('show'))
      usernameInput.classList.add('input-incorrect')
    } else {
      emitUsernameError(false)
      setTimeout(() => $(usernameInput).tooltip('hide'))
      usernameInput.classList.remove('input-incorrect')
    }

    if(!isValidEmail) {
      emitEmailError(true)
      setTimeout(() => $(emailInput).tooltip('show'))
      emailInput.classList.add('input-incorrect')
    } else {
      emitEmailError(false)
      setTimeout(() => $(emailInput).tooltip('hide'))
      emailInput.classList.remove('input-incorrect')
    }

    if(!isValidPassword) {
      emitPasswordError(true)
      setTimeout(() => $(passwordInput).tooltip('show'))
      passwordInput.classList.add('input-incorrect')
      rePasswordInput.classList.add('input-incorrect')
    } else {
      if(!isValidPasswords) {
        emitPasswordError(true, 'Your passwords don\'t match, check them.')
        setTimeout(() => $(passwordInput).tooltip('show'))
        passwordInput.classList.add('input-incorrect')
        rePasswordInput.classList.add('input-incorrect')
      } else {
        emitPasswordError(false)
        setTimeout(() => $(passwordInput).tooltip('hide'))
        passwordInput.classList.remove('input-incorrect')
        rePasswordInput.classList.remove('input-incorrect')
      }
    }

    return DOMtoArray(signUpInputs).every(elem => !elem.classList.contains('input-incorrect'))
  }

  validateEmail(email) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email)
  }

  validateUsername(username) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username)
  }

  validatePasswords(password, rePassword) {
    if (password !== '' && rePassword !== '') {
      return password === rePassword
    }
  }

  validatePassword(password) {
    return (password.length >= 6) ? true : false
  }

  render() {
    let { incorrectUsernameObj, incorrectEmailObj, incorrectPasswordObj } = this.props.inputErrors
    let { auth } = this.props
    return (
      <form onSubmit={this.signUpEvent.bind(this)} noValidate>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='text' className='form-control' placeholder='Username' ref='signUpUsername'
            data-toggle='tooltip' data-html='true' data-trigger='manual' data-placement='right'
            data-original-title={incorrectUsernameObj.message}/>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='email' className='form-control' placeholder='Email' ref='signUpEmail'
            data-toggle='tooltip' data-html='true' data-trigger='manual' data-placement='right'
            data-original-title={incorrectEmailObj.message}/>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='password' className='form-control' placeholder='Password' ref='signUpPassword'
            data-toggle='tooltip' data-html='true' data-trigger='manual' data-placement='right'
            data-original-title={incorrectPasswordObj.message}/>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='password' className='form-control' placeholder='Repeat Password' ref='signUpRePassword'/>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-md-8 col-md-offset-2'>
            <button type='submit' className='btn btn-success col-xs-12 col-md-12' disabled={auth.isFetching ? true : false}>Sign Up</button>
          </div>
        </div>
      </form>
    )
  }
}

export default SignUpForm
