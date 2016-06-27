import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussion, deleteDiscussion } from '../actions/discussionAction'
import { getDiscussions,
         setDiscussionsArchive,
         clearDiscussionsArchive,
         deleteDiscussionFromArchive } from '../actions/discussionsAction'
import DiscussionsBlock from '../components/discussions/DiscussionsBlock'
import { USER_GETTER_METHOD_DISCUSSION,
         RECENT_GETTER_METHOD_DISCUSSION,
         MOST_DISCUSSED_GETTER_METHOD_DISCUSSION,
         BY_TYPE_GETTER_METHOD_DISCUSSION,
         LIMITED_GETTER_METHOD_DISCUSSION,
         TRENDING_GETTER_METHOD_DISCUSSION } from '../constants'
import { NotificationManager } from 'react-notifications'
import { push } from 'react-router-redux'
import socket from '../utils/socket'

class Discussions extends Component {

  onJoinDiscussion({ id, password = '' }) {
    let { dispatch, userInfo } = this.props

    dispatch(getDiscussion(parseInt(id), password)).then((status) => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }
      socket.emit('join discussion', { discussionId: parseInt(id), username: userInfo.payload.username, email: userInfo.payload.email })
      socket.emit('connected users', parseInt(id))
      dispatch(push(`/discussion/${id}`))
      dispatch(clearDiscussionsArchive())
    })
  }

  componentWillUnmount() {
    socket.removeListener('join discussion')
    socket.removeListener('connected users')
  }

  getDiscussionType(pathname) {
    if(pathname.includes('type')) {
      return pathname.split('/')[1]
    } else {
      return ''
    }
  }

  routeDiscussionSelector(pathname) {
    let { dispatch, discussions, userInfo } = this.props

    switch(pathname) {
      case 'trending':
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 userInfo={userInfo}
                                 clearDiscussionsArchive={() => dispatch(clearDiscussionsArchive())}
                                 deleteDiscussion={id => dispatch(deleteDiscussion(id)).then(status => {
                                   if(status.error) {
                                     NotificationManager.error(status.payload.response.message)
                                     return
                                   }
                                   dispatch(deleteDiscussionFromArchive(id))
                                 })}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => dispatch(getDiscussions(TRENDING_GETTER_METHOD_DISCUSSION)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                   dispatch(setDiscussionsArchive(status.payload))
                                 })}/>
      case 'mydiscussions':
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 userInfo={userInfo}
                                 clearDiscussionsArchive={() => dispatch(clearDiscussionsArchive())}
                                 deleteDiscussion={id => dispatch(deleteDiscussion(id)).then(status => {
                                   if(status.error) {
                                     NotificationManager.error(status.payload.response.message)
                                     return
                                   }
                                   dispatch(deleteDiscussionFromArchive(id))
                                 })}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => dispatch(getDiscussions(USER_GETTER_METHOD_DISCUSSION)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                   dispatch(setDiscussionsArchive(status.payload))
                                 })}/>
      case 'limited':
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 userInfo={userInfo}
                                 clearDiscussionsArchive={() => dispatch(clearDiscussionsArchive())}
                                 deleteDiscussion={id => dispatch(deleteDiscussion(id)).then(status => {
                                   if(status.error) {
                                     NotificationManager.error(status.payload.response.message)
                                     return
                                   }
                                   dispatch(deleteDiscussionFromArchive(id))
                                 })}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => dispatch(getDiscussions(LIMITED_GETTER_METHOD_DISCUSSION)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                   dispatch(setDiscussionsArchive(status.payload))
                                 })}/>
      case 'recent':
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 userInfo={userInfo}
                                 clearDiscussionsArchive={() => dispatch(clearDiscussionsArchive())}
                                 deleteDiscussion={id => dispatch(deleteDiscussion(id)).then(status => {
                                   if(status.error) {
                                     NotificationManager.error(status.payload.response.message)
                                     return
                                   }
                                   dispatch(deleteDiscussionFromArchive(id))
                                 })}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => dispatch(getDiscussions(RECENT_GETTER_METHOD_DISCUSSION)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                   dispatch(setDiscussionsArchive(status.payload))
                                 })}/>
      case 'mostdiscussed':
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 userInfo={userInfo}
                                 clearDiscussionsArchive={() => dispatch(clearDiscussionsArchive())}
                                 deleteDiscussion={id => dispatch(deleteDiscussion(id)).then(status => {
                                   if(status.error) {
                                     NotificationManager.error(status.payload.response.message)
                                     return
                                   }
                                   dispatch(deleteDiscussionFromArchive(id))
                                 })}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => dispatch(getDiscussions(MOST_DISCUSSED_GETTER_METHOD_DISCUSSION)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                   dispatch(setDiscussionsArchive(status.payload))
                                 })}/>
      case /^type?/.test(pathname) && pathname:
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 userInfo={userInfo}
                                 clearDiscussionsArchive={() => dispatch(clearDiscussionsArchive())}
                                 deleteDiscussion={id => dispatch(deleteDiscussion(id)).then(status => {
                                   if(status.error) {
                                     NotificationManager.error(status.payload.response.message)
                                     return
                                   }
                                   dispatch(deleteDiscussionFromArchive(id))
                                 })}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={pathnameNext => {
                                   if(pathnameNext) {
                                     pathname = pathnameNext
                                   }
                                   dispatch(getDiscussions(`${BY_TYPE_GETTER_METHOD_DISCUSSION}--${this.getDiscussionType(pathname)}`))
                                   .then(status => {
                                     status.error && NotificationManager.error(status.payload.response.message)
                                     dispatch(setDiscussionsArchive(status.payload))
                                 })}}/>
      default:
        return <DiscussionsBlock discussions={discussions}
                                 pathname={pathname}
                                 userInfo={userInfo}
                                 clearDiscussionsArchive={() => dispatch(clearDiscussionsArchive())}
                                 deleteDiscussion={id => dispatch(deleteDiscussion(id)).then(status => {
                                   if(status.error) {
                                     NotificationManager.error(status.payload.response.message)
                                     return
                                   }
                                   dispatch(deleteDiscussionFromArchive(id))
                                 })}
                                 onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                                 onLoadDiscussions={() => dispatch(getDiscussions(null)).then(status => {
                                   status.error && NotificationManager.error(status.payload.response.message)
                                   dispatch(setDiscussionsArchive(status.payload))
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
    userInfo: state.sidebar.userInfo.toJS(),
    discussions: state.discussions.getDiscussions.toJS()
  }
}

export default connect(inject)(Discussions)
