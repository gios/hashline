import React, { Component } from 'react'
import moment from 'moment'

class DiscussionExpiredTimer extends Component {

  componentDidMount() {
    this.limitedInterval = setInterval(this.forceUpdate.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.limitedInterval)
  }

  formatExpired(limitedTime) {
    let getExpiredDuration = moment.duration(moment(limitedTime).diff(moment()))

    if(getExpiredDuration.as('seconds') < 1) {
      return false
    }
    let expiredFormat = {
      hours: getExpiredDuration.hours(),
      minutes: (getExpiredDuration.minutes() < 10) ? '0' + getExpiredDuration.minutes(): getExpiredDuration.minutes(),
      seconds: (getExpiredDuration.seconds() < 10) ? '0' + getExpiredDuration.seconds(): getExpiredDuration.seconds()
    }
    return `${expiredFormat.hours}:${expiredFormat.minutes}:${expiredFormat.seconds}`
  }

  render() {
    let { discussionInfo } = this.props
    return (
      <li className='list-group-item'>
        <strong>Time to expiry:</strong>
        {(discussionInfo.payload.is_limited && !!this.formatExpired(discussionInfo.payload.limited_time))
          ? <div className='pull-xs-right'>{this.formatExpired(discussionInfo.payload.limited_time)}</div>
          : <div className='pull-xs-right'>None</div>}
      </li>
    )
  }
}

export default DiscussionExpiredTimer
