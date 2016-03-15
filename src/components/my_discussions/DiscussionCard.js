import React, { Component } from 'react'
import moment from 'moment'

class DiscussionCard extends Component {

  componentDidMount() {
    this.limitedInterval = setInterval(this.updateLimitedTime.bind(this), 1000)
    $(this.refs.joinButton).popover({
      title: 'Password',
      content: `<input type='password' class='form-control discussion-password'></input>`,
      html: true,
      placement: 'left'
    })
  }

  componentWillUnmount() {
    $(this.refs.joinButton).popover('dispose')
    clearInterval(this.limitedInterval)
  }

  updateLimitedTime() {
    this.forceUpdate()
  }

  joinToDiscussion() {
    let { id, isPrivate } = this.props.discussion
    if(isPrivate) {
      setTimeout(() => {
        $('.discussion-password').on('keypress', (e) => {
          if(e.keyCode === 13) {
            console.log($(e.target).val())
          }
        })
      }, 100)
      $(this.refs.joinButton).popover('show')
    } else {
      this.props.onJoinDiscussion(id)
    }
  }

  formatExpired() {
    let { limitedTime } = this.props.discussion
    let getExpiredDuration = moment.duration(moment.unix(limitedTime).diff(moment()))

    if(getExpiredDuration.as('seconds') < 1) {
      return `0:00:00`
    }
    let expiredFormat = {
      hours: getExpiredDuration.hours(),
      minutes: (getExpiredDuration.minutes() < 10) ? '0' + getExpiredDuration.minutes(): getExpiredDuration.minutes(),
      seconds: (getExpiredDuration.seconds() < 10) ? '0' + getExpiredDuration.seconds(): getExpiredDuration.seconds()
    }
    return `${expiredFormat.hours}:${expiredFormat.minutes}:${expiredFormat.seconds}`
  }

  render() {
    let { name, description, isLimited, isPrivate, tags, type_name, closed } = this.props.discussion

    return (
        <div className='card card-block col-xs-12 col-sm-12 col-md-12 col-lg-6 my-discussion-card'>
          {(closed)
            ? <button type='button' className='btn btn-danger discussion-join-btn m-x-1 disabled'>Closed</button>
            : <button onClick={this.joinToDiscussion.bind(this)}
                      type='button'
                      className='btn btn-success discussion-join-btn m-x-1'
                      ref='joinButton'>Join</button>
          }
          <h4 className='card-title'>{name}</h4>
          <div className='my-discussion-labels'>
            {(isPrivate) ? <span className='label label-warning'>Private</span> : <span className='label label-primary'>Public</span>}
            {(isLimited) ? <span className='label label-info'>Limited</span> : null}
          </div>
          <p className='card-text'><small className='text-muted'>Description: </small><br/>{description}</p>
          <p className='card-text'><small className='text-muted'>Time to expiry: </small>{this.formatExpired()}</p>
          <p className='card-text'><small className='text-muted'>Type: </small>{type_name}</p>
          <p className='card-text tag-labels'><small className='text-muted'>Tags: </small>{tags.map((tag, index) => {
            return <span key={index} className='label label-default'>{tag}</span>
          })}</p>
        </div>
    )
  }
}

export default DiscussionCard
