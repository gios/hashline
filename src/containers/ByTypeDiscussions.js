import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussion } from '../actions/discussionAction'
import { getDiscussions } from '../actions/discussionsAction'
import DiscussionsBlock from '../components/my_discussions/DiscussionsBlock'
import { BY_TYPE_GETTER_METHOD_DISCUSSION } from '../constants'
import { NotificationManager } from 'react-notifications'
import { push } from 'react-router-redux'

class MostDiscussedDiscussions extends Component {

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

  render() {
    let { dispatch, discussions, isAuthenticated, pathname } = this.props
    return (
      <div>
        {isAuthenticated &&
          <DiscussionsBlock discussions={discussions}
                            pathname={pathname}
                            onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                            onLoadDiscussions={pathnameNext => {
                              if(pathnameNext) {
                                pathname = pathnameNext
                              }
                              dispatch(getDiscussions(`${BY_TYPE_GETTER_METHOD_DISCUSSION}--${this.getDiscussionType(pathname)}`))
                              .then(status => status.error && NotificationManager.error(status.payload.response.message))}
                            }/>
        }
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

export default connect(inject)(MostDiscussedDiscussions)
