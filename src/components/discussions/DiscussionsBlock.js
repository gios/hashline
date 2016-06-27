import React, { Component } from 'react'
import Loader from '../parts/Loader'
import NoDiscussionsCard from './NoDiscussionsCard'
import { Link } from 'react-router'
import DiscussionCard from '../discussion/DiscussionCard'

class DiscussionsBlock extends Component {

  componentWillMount() {
    this.props.onLoadDiscussions()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.pathname !== nextProps.pathname) {
      setTimeout(() => {
        this.props.clearDiscussionsArchive()
        this.props.onLoadDiscussions(nextProps.pathname)
      })
    }
  }

  renderDiscussions() {
    let { discussions, onJoinDiscussion } = this.props

    if(discussions.isFetching) {
      return <Loader size={4}/>
    } else if(discussions.discussionsArchive) {
      if(!discussions.discussionsArchive.length) {
        return (
          <NoDiscussionsCard>
            <h3>You don't have any discussions.</h3><br/>
            <p>Do you wanna create a discussion?</p>
            <Link to='/create' type='button' className='btn btn-success btn-sm' role='button'>
              Create Discussion
            </Link>
          </NoDiscussionsCard>
        )
      }
      return discussions.discussionsArchive.map((discussion) => {
        return (
          <DiscussionCard onJoinDiscussion={onJoinDiscussion}
                          key={discussion.id}
                          discussion={discussion}
                          closed={discussion.closed}
                          deleteDiscussion={this.props.deleteDiscussion}
                          userInfo={this.props.userInfo}/>
        )
      })
    }
  }

  render() {
    return (
      <div className='card-group'>
        {this.renderDiscussions()}
      </div>
    )
  }
}

export default DiscussionsBlock
