import React, { Component } from 'react'
import moment from 'moment'

class DiscussionCard extends Component {

  componentDidMount() {
    this.limitedInterval = setInterval(this.forceUpdate.bind(this), 1000)
    $(this.refs.joinButton).popover({
      title: 'Password',
      content: `<input type='password' class='form-control discussion-password'></input>`,
      html: true,
      trigger: 'manual',
      placement: 'left'
    })

    $(this.refs.closeButton).popover({
      title: 'Expired',
      content: `This discussion expired. It will be deleted during week.`,
      placement: 'left',
      trigger: 'hover'
    })
  }

  componentWillUnmount() {
    $(this.refs.joinButton).popover('dispose')
    clearInterval(this.limitedInterval)
  }

  joinToDiscussion() {
    let { id, is_private } = this.props.discussion
    if(is_private) {
      setTimeout(() => {
        $('.discussion-password').trigger('focus')
        $('.discussion-password').on('blur', () => {
          $(this.refs.joinButton).popover('hide')
        })
        $('.discussion-password').on('keypress', (e) => {
          if(e.keyCode === 13) {
            let password = $(e.target).val()
            this.props.onJoinDiscussion({ id, password })
          }
        })
      }, 100)
      $(this.refs.joinButton).popover('show')
    } else {
      this.props.onJoinDiscussion({ id })
    }
  }

  formatExpired() {
    let { limited_time } = this.props.discussion
    let getExpiredDuration = moment.duration(moment(limited_time).diff(moment()))

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
    let { name, description, is_limited, is_private, tags, type_name, closed } = this.props.discussion

    return (
        <div className='card card-block col-xs-12 col-sm-12 col-md-12 col-lg-6 my-discussion-card'>
          {(closed)
            ? <button type='button'
                      className='btn btn-danger discussion-join-btn m-x-1 disabled'
                      ref='closeButton'>Closed</button>
            : <button onClick={this.joinToDiscussion.bind(this)}
                      type='button'
                      className='btn btn-success discussion-join-btn m-x-1'
                      ref='joinButton'>Join</button>
          }
          <h4 className='card-title'>{name}</h4>
          <div className='my-discussion-labels'>
            {(is_private) ? <span className='label label-warning'>Private</span> : <span className='label label-primary'>Public</span>}
            {(is_limited) ? <span className='label label-info'>Limited</span> : null}
          </div>
          <p className='card-text'><small className='text-muted'>Description: </small><br/>{description}</p>
          {(is_limited && !!this.formatExpired())
            ? <p className='card-text'><small className='text-muted'>Time to expiry: </small>{this.formatExpired()}</p>
            : null}
          <p className='card-text'><small className='text-muted'>Type: </small>{type_name}</p>
          <p className='card-text tag-labels'><small className='text-muted'>Tags: </small>{tags.map((tag, index) => {
            return <span key={index} className='label label-default'>{tag}</span>
          })}</p>
        </div>
    )
  }
}

export default DiscussionCard
