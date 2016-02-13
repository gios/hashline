import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function inject(state) {
  return {
    isAuthenticated: state.reducers.auth.get('isAuthenticated')
  }
}

export default connect(inject)(App)
