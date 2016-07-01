import React, { Component } from 'react'
import TrendingMyDiscussions from './TrendingMyDiscussions'

class DashBlock extends Component {

  componentWillMount() {
    this.props.getMyTrendingDiscussions()
  }

  render() {
    return (
      <div className='col-md-12'>
        <div className='col-md-6'>Info about user</div>
        <div className='col-md-6'>
          <h3 className='text-xs-center'>Your trending discussions</h3>
          <TrendingMyDiscussions onJoinDiscussion={id => this.props.onJoinDiscussion(id)} myTrendingDiscussions={this.props.myTrendingDiscussions}/>
        </div>
      </div>
    )
  }
}

export default DashBlock
