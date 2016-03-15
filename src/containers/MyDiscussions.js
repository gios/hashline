import React, { Component } from 'react'
import { connect } from 'react-redux'
import { idToken } from '../utils/helpers'
import { getDiscussions } from '../actions/myDiscussionsAction'
import MyDiscussionsBlock from '../components/my_discussions/MyDiscussionsBlock'
import { push } from 'react-router-redux'
import io from 'socket.io-client'
let socket = io('http://localhost:5000')

class MyDiscussions extends Component {

  componentDidMount() {
    this.expiredTimeout = setInterval(() => {
      socket.emit('refresh_expired', { id_token: idToken.getToken()})
    }, 5000)

    socket.on('refresh_expired_data', (data) => {
      console.log(data)
    })
  }

  componentWillUnmount() {
    clearInterval(this.expiredTimeout)
  }

  render() {
    let { dispatch, discussions } = this.props

    return (
      <div>
        <MyDiscussionsBlock discussions={discussions}
                            onJoinDiscussion={(id) => dispatch(push(`/discussion/${id}`))}
                            onLoadDiscussions={() => dispatch(getDiscussions())}/>
      </div>
    )
  }
}

function inject(state) {
  return {
    discussions: state.myDiscussions.getDiscussions.toJS()
  }
}

export default connect(inject)(MyDiscussions)
