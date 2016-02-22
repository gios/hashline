import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import CreateDiscussionForm from './../components/create_discussion/CreateDiscussionForm'

class Login extends Component {
  render() {
    return (
      <div>
        <CreateDiscussionForm/>
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
