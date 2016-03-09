import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussions } from '../actions/myDiscussionsAction'
import MyDiscussionsBlock from '../components/my_discussions/MyDiscussionsBlock'

class MyDiscussions extends Component {

  render() {
    let { dispatch, discussions } = this.props

    return (
      <div>
        <MyDiscussionsBlock discussions={discussions}
                            onLoadDiscussions={() => dispatch(getDiscussions())}/>
      </div>
    )
  }
}

function inject(state) {
  return {
    discussions: state.myDiscussions.getDiscussions.toJS()
  }
}

export default connect(inject)(MyDiscussions)
