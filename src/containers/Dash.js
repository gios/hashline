import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashBlock from '../components/dash/DashBlock'
import { getMyTrendingDiscussions, getDashUserInfo } from '../actions/dashAction'
import { push } from 'react-router-redux'

class Dash extends Component {

  onJoinDiscussion({ id }) {
    let { dispatch } = this.props
    dispatch(push(`/discussion/${id}`))
  }

  render() {
    let { dispatch, myTrendingDiscussions, dashUserInfo } = this.props

    return (
      <DashBlock myTrendingDiscussions={myTrendingDiscussions}
                 dashUserInfo={dashUserInfo}
                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                 getDashUserInfo={() => dispatch(getDashUserInfo())}
                 getMyTrendingDiscussions={() => dispatch(getMyTrendingDiscussions())}/>
    )
  }
}

function inject(state) {
  return {
    myTrendingDiscussions: state.dash.myTrendingDiscussions.toJS(),
    dashUserInfo: state.dash.dashUserInfo.toJS(),
    userInfo: state.sidebar.userInfo.toJS()
  }
}

export default connect(inject)(Dash)
