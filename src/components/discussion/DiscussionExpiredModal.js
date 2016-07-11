import React, { Component } from 'react'
import { DropModal } from 'boron'

class DiscussionExpiredModal extends Component {

  redirectToBase(e) {
    e.preventDefault()
    this.props.redirectToBase()
  }

  render() {
    return (
      <DropModal ref='expiredDiscussionModal'
                 className='text-xs-center'
                 closeOnClick={false}
                 keyboard={false}>
        <div className='modal-header'>
          <h3 className='modal-title'>This discussion has expired</h3>
        </div>
        <div className='modal-body'>
          <p className='text-muted'>The discussion expired, you can't join the discussion. This discussion expired. It will be deleted during a week.</p>
        </div>
        <form onSubmit={this.redirectToBase.bind(this)}>
          <div className='modal-footer'>
            <button type='submit' className='btn btn-success'>To Dash</button>
          </div>
        </form>
      </DropModal>
    )
  }
}

export default DiscussionExpiredModal
