import React, { Component } from 'react'
import { DropModal } from 'boron'

class DiscussionExpiredModal extends Component {

  getExpiredModalStyles() {
    return {
      pointerEvents: 'none'
    }
  }

  render() {
    return (
      <DropModal ref='expiredDiscussionModal'
                 className='text-xs-center'
                 backdropStyle={this.getExpiredModalStyles()}
                 keyboard={false}>
        <div className='modal-header'>
          <h3 className='modal-title'>This discussion has expired</h3>
        </div>
        <div className='modal-body'>
          <p className='text-muted'>The discussion expired, you can't join the discussion.</p>
        </div>
      </DropModal>
    )
  }
}

export default DiscussionExpiredModal
