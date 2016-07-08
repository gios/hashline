import React, { Component } from 'react'
import moment from 'moment'
import { DropModal } from 'boron'

class DiscussionCard extends Component {

  componentDidMount() {
    this.limitedInterval = setInterval(this.forceUpdate.bind(this), 1000)
    $(this.refs.closeButton).popover({
      title: 'Expired',
      content: `This discussion expired. It will be deleted during week.`,
      placement: 'left',
      trigger: 'hover'
    })
  }

  componentWillUnmount() {
    clearInterval(this.limitedInterval)
  }

  joinToDiscussion() {
    let { id } = this.props.discussion
    this.props.onJoinDiscussion({ id })
  }

  getDeleteContent() {
    let { name } = this.props.discussion

    return (
      <div className='text-xs-center p-a-2'>
        <h4>DELETE</h4>
        <div className='m-t-1'><strong>{name}</strong></div>
        <div className='m-t-2'>
          <button onClick={this.deleteDiscussion.bind(this)} type='button' className='btn btn-success m-x-1'>Delete</button>
          <button onClick={() => this.refs.deleteModal.toggle()} type='button' className='btn btn-danger m-x-1'>Cancel</button>
        </div>
      </div>
    )
  }

  deleteDiscussion() {
    let { id } = this.props.discussion
    this.props.deleteDiscussion(id)
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
    let { name, description, is_limited, is_private, tags, type_name, closed, username, created_at, user_email } = this.props.discussion

    return (
        <div className='card card-block col-xs-12 col-sm-12 col-md-12 col-lg-6 my-discussion-card'>
          <div className='discussion-btns m-x-1'>
            <DropModal ref='deleteModal'>{this.getDeleteContent()}</DropModal>
            {user_email === (this.props.userInfo.payload && this.props.userInfo.payload.email) &&
              <button onClick={() => this.refs.deleteModal.toggle()}
                      type='button'
                      className='btn btn-danger m-x-1'>Delete</button>
            }
            {(closed)
              ? <button type='button'
                        className='btn btn-warning disabled'
                        ref='closeButton'>Closed</button>
              : <button onClick={this.joinToDiscussion.bind(this)}
                        type='button'
                        className='btn btn-success'>Join</button>
            }
          </div>
          <h4 className='card-title'>{name}</h4>
          <div className='my-discussion-labels'>
            {(is_private) ? <span className='label label-warning'>Private</span> : <span className='label label-primary'>Public</span>}
            {(is_limited) ? <span className='label label-info'>Limited</span> : null}
          </div>
          <p className='card-text'><small className='text-muted'>Description: </small><br/>{description}</p>
          {(is_limited && !!this.formatExpired())
            ? <p className='card-text'><small className='text-muted'>Time to expiry: </small>{this.formatExpired()}</p>
            : null}
          <p className='card-text column-size'><small className='text-muted'>Type: </small>{type_name}</p>
          <p className='card-text column-size m-l-1'><small className='text-muted'>Creator: </small>{username}</p>
          <p className='card-text'><small className='text-muted'>Created At: </small>{moment(created_at).format('DD MMM YYYY H:mm:ss')}</p>
          <p className='card-text tag-labels'><small className='text-muted'>Tags: </small>{tags.map((tag, index) => {
            return <span key={index} className='label label-default'>{tag}</span>
          })}</p>
        </div>
    )
  }
}

export default DiscussionCard
