import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashBlock from '../components/dash/DashBlock'
import { getMyTrendingDiscussions } from '../actions/dashAction'
import { push } from 'react-router-redux'

class Dash extends Component {

  onJoinDiscussion({ id }) {
    let { dispatch } = this.props
    dispatch(push(`/discussion/${id}`))
  }

  render() {
    let { dispatch, myTrendingDiscussions } = this.props

    return (
      <DashBlock myTrendingDiscussions={myTrendingDiscussions}
                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                 getMyTrendingDiscussions={() => dispatch(getMyTrendingDiscussions())}/>
    )
  }
}

function inject(state) {
  return {
    myTrendingDiscussions: state.dash.myTrendingDiscussions.toJS(),
    userInfo: state.sidebar.userInfo.toJS()
  }
}

export default connect(inject)(Dash)
