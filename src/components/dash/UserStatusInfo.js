import React, { Component } from 'react'
import Loader from '../parts/Loader'

class UserSTatusInfo extends Component {

  renderUserStatusInfo() {
    let { dashUserInfo } = this.props

    if(dashUserInfo.isFetching) {
      return <Loader size={3}/>
    } else if(dashUserInfo.payload) {
      return (
        <div className='card'>
          <div className='card-block'>
            <h4 className='card-title'>Rank <span className='label label-info'>{dashUserInfo.payload.rank}</span></h4>
            <p className='card-text'>This rank is calculated using the ratio between the created and received messages from your discussions.</p>
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <span className='label label-default label-pill pull-xs-right'>{dashUserInfo.payload.discussions_created}</span>
              Discussions created
            </li>
            <li className='list-group-item'>
              <span className='label label-default label-pill pull-xs-right'>{dashUserInfo.payload.messages_sent}</span>
              Messages Sent
            </li>
            <li className='list-group-item'>
              <span className='label label-default label-pill pull-xs-right'>{dashUserInfo.payload.messages_received}</span>
              Messages Received
            </li>
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='list-group'>
        {this.renderUserStatusInfo()}
      </div>
    )
  }
}

export default UserSTatusInfo
