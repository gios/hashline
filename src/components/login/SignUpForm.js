import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class SignUpForm extends Component {

  signUpEvent(e) {
    e.preventDefault()
    let emailInput = this.refs.signUpEmail
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
      <form onSubmit={this.signUpEvent.bind(this)} noValidate>
        <div className='form-group row'>
            <div className='col-xs-12 col-md-8 col-md-offset-2'>
              <input type='text' className='form-control' placeholder='Nickname'/>
            </div>
        </div>
        <div className='form-group row'>
            <div className='col-xs-12 col-md-8 col-md-offset-2'>
              <input type='email' className='form-control' placeholder='Email' ref='signUpEmail'
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
            <input type='password' className='form-control' placeholder='Repeat Password'/>
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
