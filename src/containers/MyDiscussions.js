import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDiscussion } from '../actions/discussionAction'
import { getDiscussions } from '../actions/discussionsAction'
import DiscussionsBlock from '../components/my_discussions/DiscussionsBlock'
import { USER_GETTER_METHOD_DISCUSSION } from '../constants'
import { NotificationManager } from 'react-notifications'
import { push } from 'react-router-redux'

class MyDiscussions extends Component {

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

  render() {
    let { dispatch, discussions, isAuthenticated } = this.props

    return (
      <div>
        {isAuthenticated &&
          <DiscussionsBlock discussions={discussions}
                            onJoinDiscussion={this.onJoinDiscussion.bind(this)}
                            onLoadDiscussions={() => dispatch(getDiscussions(USER_GETTER_METHOD_DISCUSSION)).then(status => {
                              status.error && NotificationManager.error(status.payload.response.message)
                            })}/>
        }
      </div>
    )
  }
}

function inject(state) {
  return {
    isAuthenticated: state.login.auth.get('isAuthenticated'),
    discussions: state.discussions.getDiscussions.toJS()
  }
}

export default connect(inject)(MyDiscussions)
