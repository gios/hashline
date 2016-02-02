import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class LoginForm extends Component {

  loginEvent(e) {
    e.preventDefault()
    let emailInput = this.refs.loginEmail
    let isValidEmail = this.validateEmail(emailInput.value)
    if (!isValidEmail) {
      $(emailInput).popover('show')
      emailInput.classList.add('email-incorrect')
    } else {
      $(emailInput).popover('hide')
      emailInput.classList.remove('email-incorrect')
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <form onSubmit={this.loginEvent.bind(this)} noValidate>
        <div className='form-group row'>
            <div className='col-xs-12 col-md-8 col-md-offset-2'>
              <input type='email' className='form-control' placeholder='Email' ref='loginEmail'
              data-toggle='popover' data-html='true' title='Incorrect Email' data-trigger='manual'
              data-content='You entered a wrong email adresses. Example: <strong>John.Smith@example.com</strong>'/>
            </div>
        </div>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <input type='password' className='form-control' placeholder='Password'/>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-xs-12 col-md-8 col-md-offset-2'>
            <button type='submit' className='btn btn-success-outline col-xs-12 col-md-12'>Login</button>
          </div>
        </div>
        <div className='form-group row'>
          <div className='text-center col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2'>
            <a href='#' className='forgot-password'><abbr title='What happend, you forgot your password?'>Frogot password?</abbr></a>
          </div>
        </div>
      </form>
    )
  }
}

export default LoginForm
