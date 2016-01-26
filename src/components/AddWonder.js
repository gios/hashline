import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class AddWonder extends Component {

  handleClick(e) {
    e.preventDefault();
    const wonderName = this.refs.wonderName
    const textWonderName = wonderName.value.trim()
    this.props.onAddClick(textWonderName)
    wonderName.value = ''
  }

  render() {
    return (
      <form className='form-inline'>
        <div className='form-group'>
          <label className='sr-only' htmlFor='addWonder'>Name</label>
          <div className='input-group'>
            <div className='input-group-addon'>Name</div>
            <input type='text' className='form-control' id='addWonder' placeholder='Name'ref='wonderName' />
          </div>
        </div>
        <button type='submit' className='btn btn-primary' onClick={this.handleClick.bind(this)}>Add</button>
      </form>
    )
  }
}

export default AddWonder
