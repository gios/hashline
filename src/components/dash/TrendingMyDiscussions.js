import React, { Component } from 'react'
import Loader from '../parts/Loader'
import { Link } from 'react-router'
import NoDiscussionsCard from '../discussions/NoDiscussionsCard'

class TrendingMyDiscussions extends Component {
  onDashJoinDiscussion(id) {
    this.props.onJoinDiscussion({ id })
  }

  renderMyTrendingDiscussions() {
    let { myTrendingDiscussions } = this.props

    if(myTrendingDiscussions.isFetching) {
      return <Loader size={3}/>
    } else if(myTrendingDiscussions.payload) {
      if(!myTrendingDiscussions.payload.length) {
        return (
          <NoDiscussionsCard>
            <h3>You don't have any discussions.</h3><br/>
            <p>Do you wanna create a discussion?</p>
            <Link to='/create' type='button' className='btn btn-success btn-sm' role='button'>
              Create Discussion
            </Link>
          </NoDiscussionsCard>
        )
      } else {
        return myTrendingDiscussions.payload.map((discussion) => {
          return (
            <a key={discussion.id}
               href='javascript:void(0)'
               onClick={this.onDashJoinDiscussion.bind(this, discussion.id)}
               className='list-group-item dash-discussion'>
              {(discussion.is_private)
                ? <span className='label label-warning pull-xs-right'>Private</span>
                : <span className='label label-primary pull-xs-right'>Public</span>}
              {(discussion.is_limited)
                ? <span className='label label-info pull-xs-right'>Limited</span>
                : null}
              <h4 className='list-group-item-heading'>{discussion.name}</h4>
              <p className='list-group-item-text'>{discussion.description}</p>
              <p className='card-text'><small className='text-muted'>Messages: </small>{discussion.messages_count}</p>
            </a>
          )
        })
      }
    }
  }

  render() {
    return (
      <div className='list-group'>
        {this.renderMyTrendingDiscussions()}
      </div>
    )
  }
}

export default TrendingMyDiscussions
