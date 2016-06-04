import React, { Component } from 'react'
import Loader from '../parts/Loader'
import NoDiscussionCards from './NoDiscussionCards'
import { Link } from 'react-router'
import DiscussionCard from './DiscussionCard'

class DiscussionsBlock extends Component {

  componentWillMount() {
    this.props.onLoadDiscussions(this.props.allDiscussions)
  }

  renderDiscussions() {
    let { discussions, onJoinDiscussion } = this.props

    if(discussions.isFetching) {
      return <Loader size={4} color='red'/>
    } else if(discussions.payload) {
      if(!discussions.payload.length) {
        return (
          <NoDiscussionCards>
            <h3>You don't have any discussions.</h3><br/>
            <p>Do you wanna create a discussion?</p>
            <Link to='/create' type='button' className='btn btn-success btn-sm' role='button'>
              Create Discussion
            </Link>
          </NoDiscussionCards>
        )
      }
      return discussions.payload.map((discussion) => {
        return (
          <DiscussionCard onJoinDiscussion={onJoinDiscussion} key={discussion.id} discussion={discussion} closed={discussion.closed}/>
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
