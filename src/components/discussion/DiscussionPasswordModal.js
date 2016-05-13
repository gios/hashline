import React, { Component } from 'react'

class DiscussionPasswordModal extends Component {

  discussionPasswordSubmit(e) {
    e.preventDefault()
    let { discussionId } = this.props
    this.props.onJoinDiscussion({ id: discussionId, password: this.refs.passwordRef.value })
    $('#discussion-password').modal('hide')
  }

  render() {
    return (
      <div className='modal fade' data-backdrop='static' id='discussion-password'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times; </span>
              </button>
              <h4 className='modal-title text-xs-center'>This discussion is protected </h4>
            </div>
            <form onSubmit={this.discussionPasswordSubmit.bind(this)}>
              <div className='modal-body'>
                <small className='text-muted'>This discussion is protected , please enter appropriate password.</small>
                <input type='password' className='form-control' placeholder='Password' ref='passwordRef'></input>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                <button type='submit' className='btn btn-primary'>Apply</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default DiscussionPasswordModal
