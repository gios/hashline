import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

class App extends Component {
  render() {
    const { currentRoute } = this.props
    return (
      <div>
        <nav className='navbar navbar-fixed-top navbar-dark bg-inverse'>
          <Link className='navbar-brand' to='/'>Sportalking</Link>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              <Link className={currentRoute === '/' ? 'nav-link active' : 'nav-link'} to='/'>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className={currentRoute === '/counter' ? 'nav-link active' : 'nav-link'} to='/counter'>
                Counter
              </Link>
            </li>
            <li className='nav-item'>
              <Link className={currentRoute === '/wonders' ? 'nav-link active' : 'nav-link'} to='/wonders'>
                Wonders
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function inject(state) {
  return {
    push: routeActions.push,
    currentRoute: state.routing.location.pathname
  }
}

export default connect(inject)(App)
