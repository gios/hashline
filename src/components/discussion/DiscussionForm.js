import React, { Component } from 'react'

class DiscussionForm extends Component {

  render() {
    return (
      <form>
        <fieldset className='form-group'>
          <textarea className='form-control' rows='3'></textarea>
          <input type='submit' className='form-control' id='add-message' placeholder='Write something'/>
        </fieldset>
      </form>
    )
  }
}

export default DiscussionForm
