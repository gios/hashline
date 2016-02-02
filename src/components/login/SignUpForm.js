import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class SignUpForm extends Component {

  signUpEvent(e) {
    e.preventDefault()
    let emailInput = this.refs.signUpEmail
    let usernameInput = this.refs.signUpUsername
    let passwordInput = this.refs.signUpPassword
    let rePasswordInput = this.refs.signUpRePassword

    let isValidEmail = this.validateEmail(emailInput.value)
    let isValidUsername = this.validateUsername(usernameInput.value)
    let isValidPassword = this.validatePasswords(passwordInput.value, rePasswordInput.value)

    let signUpInputs = document.querySelectorAll('.form-control')
    for (var i = 0; i < signUpInputs.length; i++) {
      if (signUpInputs[i].value === '') {
        signUpInputs[i].classList.add('input-incorrect')
      } else {
        signUpInputs[i].classList.remove('input-incorrect')
      }
    }

    if(!isValidEmail) {
      $(emailInput).popover('show')
      emailInput.classList.add('input-incorrect')
    } else {
      $(emailInput).popover('hide')
      emailInput.classList.remove('input-incorrect')
    }

    if(!isValidUsername) {
      $(usernameInput).popover('show')
      usernameInput.classList.add('input-incorrect')
    } else {
      $(usernameInput).popover('hide')
      usernameInput.classList.remove('input-incorrect')
    }

    if(!isValidPassword) {
      $(passwordInput).popover('show')
      passwordInput.classList.add('input-incorrect')
      rePasswordInput.classList.add('input-incorrect')
    } else {
      $(passwordInput).popover('hide')
      passwordInput.classList.remove('input-incorrect')
      rePasswordInput.classList.remove('input-incorrect')
    }
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

  render() {
    return (
      <form onSubmit={this.signUpEvent.bind(this)} noValidate>
        <div className='form-group row'>
            <div className='col-xs-12 col-md-8 col-md-offset-2'>
              <input type='text' className='form-control' placeholder='Username' ref='signUpUsername'
              data-toggle='popover' data-html='true' data-trigger='manual'
              data-content='You entered a wrong username. Example: <strong>John.Smith@example.com</strong>'/>
            </div>
        </div>
        <div className='form-group row'>
            <div className='col-xs-12 col-md-8 col-md-offset-2'>
              <input type='email' className='form-control' placeholder='Email' ref='signUpEmail'
              data-toggle='popover' data-html='true' data-trigger='manual'
              data-content='You entered a wrong email adresses. Example: <strong>Jack34, Michael1 etc.</strong>'/>
            </div>
        </div>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='password' className='form-control' placeholder='Password' ref='signUpPassword'
            data-toggle='popover' data-html='true' data-trigger='manual'
            data-content="Your passwords don't match."/>
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
