import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

class Login extends Component {

  render() {
    let { dispatch } = this.props
    return (
      <div className='card-group'>
        <div className='card col-xs-12 col-sm-12 col-md-12 col-lg-6'>
          <div className='card-block'>
            <h4 className='card-title text-xs-center'>Create Discussion</h4>
            <form>
              <fieldset className='form-group row'>
                <label htmlFor='inputName' className='col-sm-2 form-control-label'>Name</label>
                <div className='col-sm-10'>
                  <input type='text' className='form-control' id='inputName' placeholder='Name'/>
                </div>
              </fieldset>
              <fieldset className='form-group row'>
                <label htmlFor='inputDescription' className='col-sm-2 form-control-label'>Description</label>
                <div className='col-sm-12'>
                  <textarea className='form-control' id='inputDescription' rows='3'></textarea>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className='card col-xs-12 col-sm-12 col-md-12 col-lg-6'>
          <div className='card-block'>
            <h4 className='card-title text-xs-center'>Settings</h4>
            <p className='card-text'>This card has supporting text below as a natural lead-in to additional content.</p>
            <p className='card-text'><small className='text-muted'>Last updated 3 mins ago</small></p>
          </div>
        </div>
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
