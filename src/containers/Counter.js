import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/counterActions'

class Counter extends Component {
  render() {
    const { dispatch, amount, hello } = this.props
    return (
      <div className="col-sm-4 col-sm-offset-4" style={{textAlign: 'center'}}>
        Value: {amount} and Say {hello}<br />
        <button onClick={() => dispatch(increase(1))}>Increase</button>
        <button onClick={() => dispatch(decrease(1))}>Decrease</button>
      </div>
    )
  }
}

function inject(state) {
  return {
    amount: state.reducers.number.get('amount'),
    hello: (state.routing.location.state !== null)
            ? state.routing.location.state.name
            : 'None'
  }
}

export default connect(inject)(Counter)
