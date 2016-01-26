import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { loadWonders, addWonder } from '../actions/wondersAction'

// Components
import WondersTable from '../components/WondersTable'
import AddWonder from '../components/AddWonder'

class Wonders extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(loadWonders())
  }

  render() {
    const { dispatch, wondersState } = this.props

    if (wondersState.error) {
      return <div>{wondersState.get('error')}</div>
    } else if (wondersState.get('loading')) {
      return <div>Loading!</div>
    } else {
      return (
        <div className='col-sm-8 col-sm-offset-2'>
          <WondersTable wonders={wondersState.get('wonders')} />
          <AddWonder onAddClick={(name) => dispatch(addWonder(name))} />
        </div>
      )
    }
  }
}

function inject(state) {
  return {
    wondersState: state.reducers.wonders
  }
}

export default connect(inject)(Wonders)
