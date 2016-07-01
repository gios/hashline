import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashBlock from '../components/dash/DashBlock'

class Dash extends Component {

  render() {
    return (
      <DashBlock/>
    )
  }
}

function inject(state) {
  return {
    state
  }
}

export default connect(inject)(Dash)
