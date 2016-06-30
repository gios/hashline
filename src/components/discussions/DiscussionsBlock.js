import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications'
import { DISCUSSIONS_INTERVAL } from '../../constants'
import Loader from '../parts/Loader'
import NoDiscussionsCard from './NoDiscussionsCard'
import { Link } from 'react-router'
import DiscussionCard from '../discussion/DiscussionCard'

class DiscussionsBlock extends Component {

  componentWillMount() {
    this.loadDiscussions()
  }

  componentWillReceiveProps(nextProps) {
    let { pathname, clearDiscussionsArchive, setStartLoadDiscussions, setEndLoadDiscussions } = this.props

    if(pathname !== nextProps.pathname) {
      setTimeout(() => {
        setStartLoadDiscussions(0)
        setEndLoadDiscussions(DISCUSSIONS_INTERVAL)
        clearDiscussionsArchive()
        this.loadDiscussions()
      })
    }
  }

  loadDiscussions() {
    let { getterMethod, setLoadDisableDiscussions } = this.props
    let { startLoad, endLoad } = this.props.discussions
    let query = 'GiOs' // SEARCH STRING

    return this.props.onLoadDiscussions(getterMethod, startLoad, endLoad, query).then(status => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }

      if(status.payload.length < DISCUSSIONS_INTERVAL) {
        setLoadDisableDiscussions(true)
      } else {
        setLoadDisableDiscussions(false)
      }
      this.props.setDiscussionsArchive(status.payload)
    }).catch(err => {
      NotificationManager.error(err.message)
      setLoadDisableDiscussions(true)
    })
  }

  loadMoreDiscussions() {
    let { setStartLoadDiscussions, setEndLoadDiscussions } = this.props
    let { startLoad, endLoad } = this.props.discussions

    setStartLoadDiscussions(startLoad + DISCUSSIONS_INTERVAL)
    setEndLoadDiscussions(endLoad + DISCUSSIONS_INTERVAL)
    setTimeout(() => this.loadDiscussions())
  }

  render() {
    let { discussions, onJoinDiscussion } = this.props
    let { startLoad, endLoad } = this.props.discussions
    let startPoint = startLoad === 0 && endLoad === DISCUSSIONS_INTERVAL
    let renderDiscussions

    if(discussions.isFetching && startPoint) {
      return <Loader size={4}/>
    } else if(discussions.discussionsArchive) {
      if(!discussions.discussionsArchive.length) {
        renderDiscussions = (
          <NoDiscussionsCard>
            <h3>You don't have any discussions.</h3><br/>
            <p>Do you wanna create a discussion?</p>
            <Link to='/create' type='button' className='btn btn-success btn-sm' role='button'>
              Create Discussion
            </Link>
          </NoDiscussionsCard>
        )
      } else {
        renderDiscussions = discussions.discussionsArchive.map((discussion) => {
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

    return (
      <div className='card-group'>
        {renderDiscussions}
        {(!discussions.loadDisable && !discussions.isFetching) && <div className='row text-xs-center'>
          <button onClick={this.loadMoreDiscussions.bind(this)} type='button' className='btn btn-secondary m-a-2'>Load More</button>
        </div>}
        {discussions.isFetching && <Loader size={3}/>}
      </div>
    )
  }
}

export default DiscussionsBlock
