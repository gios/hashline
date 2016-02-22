import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

class Login extends Component {

  render() {
    let { dispatch } = this.props
    return (
      <div className='card'>
        <div className='card-header'>
          Featured
        </div>
        <div className='card-block'>
          <h4 className='card-title'>Special title treatment</h4>
          <p className='card-text'>With supporting text below as a natural lead-in to additional content.</p>
          <a href='#' className='btn btn-primary'>Go somewhere</a>
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
