import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Footer from '../components/parts/Footer'
import IntroLogo from '../components/parts/IntroLogo'

class App extends Component {
  render() {
    return (
      <div>
        <IntroLogo/>
        <div>
          {this.props.children}
        </div>
        <Footer/>
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
