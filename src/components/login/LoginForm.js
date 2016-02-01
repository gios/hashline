import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class LoginForm extends Component {

  render() {
    return (
      <form>
        <div className='form-group row'>
            <div className='col-xs-12 col-md-8 col-md-offset-2'>
              <input type='email' className='form-control' placeholder='Email'/>
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
