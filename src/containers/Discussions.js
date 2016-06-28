import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussion, deleteDiscussion } from '../actions/discussionAction'
import { getDiscussions,
         setDiscussionsArchive,
         clearDiscussionsArchive,
         deleteDiscussionFromArchive,
         setLoadDisableDiscussions,
         setStartLoadDiscussions,
         setEndLoadDiscussions } from '../actions/discussionsAction'
import DiscussionsBlock from '../components/discussions/DiscussionsBlock'
import { USER_GETTER_METHOD_DISCUSSION,
         RECENT_GETTER_METHOD_DISCUSSION,
         MOST_DISCUSSED_GETTER_METHOD_DISCUSSION,
         BY_TYPE_GETTER_METHOD_DISCUSSION,
         LIMITED_GETTER_METHOD_DISCUSSION,
         TRENDING_GETTER_METHOD_DISCUSSION,
         DISCUSSIONS_INTERVAL } from '../constants'
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
      dispatch(setStartLoadDiscussions(0))
      dispatch(setEndLoadDiscussions(DISCUSSIONS_INTERVAL))
    })
  }

  componentWillUnmount() {
    socket.removeListener('join discussion')
    socket.removeListener('connected users')
    this.props.dispatch(clearDiscussionsArchive())
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
    let getterMethod = null

    switch(pathname) {
      case 'trending':
        getterMethod = TRENDING_GETTER_METHOD_DISCUSSION
        break;
      case 'mydiscussions':
        getterMethod = USER_GETTER_METHOD_DISCUSSION
        break;
      case 'limited':
        getterMethod = LIMITED_GETTER_METHOD_DISCUSSION
        break;
      case 'recent':
        getterMethod = RECENT_GETTER_METHOD_DISCUSSION
        break;
      case 'mostdiscussed':
        getterMethod = MOST_DISCUSSED_GETTER_METHOD_DISCUSSION
        break;
      case /^type?/.test(pathname) && pathname:
        getterMethod = `${BY_TYPE_GETTER_METHOD_DISCUSSION}--${this.getDiscussionType(pathname)}`
        break;
      default:
        getterMethod = null
        break;
      }

    return <DiscussionsBlock discussions={discussions}
                             pathname={pathname}
                             userInfo={userInfo}
                             getterMethod={getterMethod}
                             setLoadDisableDiscussions={value => dispatch(setLoadDisableDiscussions(value))}
                             setStartLoadDiscussions={start => dispatch(setStartLoadDiscussions(start))}
                             setEndLoadDiscussions={end => dispatch(setEndLoadDiscussions(end))}
                             setDiscussionsArchive={data => dispatch(setDiscussionsArchive(data))}
                             clearDiscussionsArchive={() => dispatch(clearDiscussionsArchive())}
                             deleteDiscussion={id => dispatch(deleteDiscussion(id)).then(status => {
                               if(status.error) {
                                 NotificationManager.error(status.payload.response.message)
                                 return
                               }
                               dispatch(deleteDiscussionFromArchive(id))
                             })}
                             onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                             onLoadDiscussions={(getterMethod, start, end) => dispatch(getDiscussions(getterMethod, start, end))}/>
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
