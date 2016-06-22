import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussion } from '../actions/discussionAction'
import { getDiscussions } from '../actions/discussionsAction'
import DiscussionsBlock from '../components/my_discussions/DiscussionsBlock'
import { USER_GETTER_METHOD_DISCUSSION,
         RECENT_GETTER_METHOD_DISCUSSION,
         MOST_DISCUSSED_GETTER_METHOD_DISCUSSION,
         BY_TYPE_GETTER_METHOD_DISCUSSION } from '../constants'
import { NotificationManager } from 'react-notifications'
import { push } from 'react-router-redux'

class Discussions extends Component {

  onJoinDiscussion({ id, password = '' }) {
    let { dispatch } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then((status) => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }
      dispatch(push(`/discussion/${id}`))
    })
  }

  getDiscussionType(pathname) {
    if(pathname.includes('bytype')) {
      return pathname.split('/')[1]
    } else {
      return ''
    }
  }

  routeDiscussionSelector(pathname) {
    let { dispatch, discussions } = this.props

    switch(pathname) {
      case 'mydiscussions':
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => dispatch(getDiscussions(USER_GETTER_METHOD_DISCUSSION)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                 })}/>
      case 'recent':
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => {dispatch(getDiscussions(RECENT_GETTER_METHOD_DISCUSSION)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                 })}}/>
      case 'mostdiscussed':
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => dispatch(getDiscussions(MOST_DISCUSSED_GETTER_METHOD_DISCUSSION)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                 })}/>
      case /^bytype?/.test(pathname) && pathname:
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={pathnameNext => {
                                   if(pathnameNext) {
                                     pathname = pathnameNext
                                   }
                                   dispatch(getDiscussions(`${BY_TYPE_GETTER_METHOD_DISCUSSION}--${this.getDiscussionType(pathname)}`))
                                   .then(status => status.error && NotificationManager.error(status.payload.response.message))}
                                 }/>
      default:
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => dispatch(getDiscussions(null)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                 })}/>}
  }

  render() {
    let { isAuthenticated, pathname } = this.props
    return (
      <div>
        {isAuthenticated && this.routeDiscussionSelector(pathname)}
      </div>
    )
  }
}

function inject(state, ownProps) {
  return {
    all: ownProps,
    pathname: ownProps.location.pathname,
    isAuthenticated: state.login.auth.get('isAuthenticated'),
    discussions: state.discussions.getDiscussions.toJS()
  }
}

export default connect(inject)(Discussions)
