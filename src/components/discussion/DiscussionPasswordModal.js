import React, { Component } from 'react'
import { DropModal } from 'boron'

class DiscussionPasswordModal extends Component {

  discussionPasswordSubmit(e) {
    e.preventDefault()
    let { discussionId } = this.props
    this.props.onJoinDiscussion({ id: discussionId, password: this.refs.passwordRef.value })
  }

  render() {
    return (
      <DropModal ref='privateDiscussionModal'
                 closeOnClick={false}
                 keyboard={false}
                 className='text-xs-center'>
        <div className='modal-header'>
          <h4 className='modal-title'>This discussion is protected </h4>
        </div>
        <form onSubmit={this.discussionPasswordSubmit.bind(this)}>
          <div className='modal-body'>
            <small className='text-muted'>This discussion is protected, please enter appropriate password.</small>
            <input autoFocus type='password' className='form-control' placeholder='Password' ref='passwordRef'></input>
            <div className='checkbox text-xs-left'>
              <label>
                <input ref='savePassword' type='checkbox'/> Save password for this tab
              </label>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='submit' className='btn btn-success'>Apply</button>
            <button onClick={() => this.props.redirectToBase()} type='button' className='btn btn-primary'>To Dash</button>
          </div>
        </form>
      </DropModal>
    )
  }
}

export default DiscussionPasswordModal
