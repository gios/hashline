import React, { Component } from 'react'
import TrendingMyDiscussions from './TrendingMyDiscussions'
import UserStatusInfo from './UserStatusInfo'

class DashBlock extends Component {

  componentWillMount() {
    this.props.getMyTrendingDiscussions()
    this.props.getDashUserInfo()
    this.props.getDashUsersRank()
  }

  render() {
    return (
      <div className='col-md-12'>
        <div className='col-md-6'>
          <h4 className='text-xs-center m-b-1'>User Status</h4>
          <UserStatusInfo dashUserInfo={this.props.dashUserInfo} dashUsersRank={this.props.dashUsersRank}/>
        </div>
        <div className='col-md-6'>
          <h4 className='text-xs-center m-b-1'>Your trending discussions</h4>
          <TrendingMyDiscussions onJoinDiscussion={id => this.props.onJoinDiscussion(id)}
                                 myTrendingDiscussions={this.props.myTrendingDiscussions}/>
        </div>
      </div>
    )
  }
}

export default DashBlock
