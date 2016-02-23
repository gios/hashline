import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import ReactTags from 'react-tag-input'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class createDiscussionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tags: [ {id: 1, text: 'Apples'} ],
      suggestions: ['Banana', 'Mango', 'Pear', 'Apricot'],
      startDate: moment()
    }
  }

  handleChange(date) {
    this.setState({ startDate: date })
  }

  handleDelete(i) {
    let tags = this.state.tags
    tags.splice(i, 1)
    this.setState({ tags: tags })
  }

  handleAddition(tag) {
    let tags = this.state.tags
    tags.push({
        id: tags.length + 1,
        text: tag
    });
    this.setState({ tags: tags })
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags

    // mutate array
    tags.splice(currPos, 1)
    tags.splice(newPos, 0, tag)

    // re-render
    this.setState({ tags: tags })
  }

  render() {
    return (
      <div className='card-group'>
        <div className='card col-xs-12 col-sm-12 col-md-12 col-lg-6 create-discussion-block'>
          <div className='card-block'>
            <h4 className='card-title text-xs-center'>Create Discussion</h4>
            <form>
              <fieldset className='form-group row'>
                <label htmlFor='inputName' className='col-sm-2 form-control-label'>Name</label>
                <div className='col-sm-10'>
                  <input type='text' className='form-control' id='inputName' placeholder='Name of conversation'/>
                </div>
              </fieldset>
              <fieldset className='form-group row'>
                <label htmlFor='inputDescription' className='col-sm-2 form-control-label'>Description</label>
                <div className='col-sm-12'>
                  <textarea className='form-control' id='inputDescription' rows='3' placeholder='Describe your conversation'></textarea>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className='card col-xs-12 col-sm-12 col-md-12 col-lg-6 create-discussion-block'>
          <div className='card-block'>
            <h4 className='card-title text-xs-center'>Settings</h4>
            <form>
              <fieldset className='form-group row'>
                <div className='checkbox'>
                  <label>
                    <input type='checkbox' value=''/>
                    Private <small className='text-muted'>use this if you want to set password for this conversation</small>
                  </label>
                </div>
              </fieldset>
              <fieldset className='form-group row'>
                <div className='col-sm-10'>
                  <div className='input-group'>
                    <div className='input-group-addon'>Password</div>
                    <input type='password' className='form-control'/>
                  </div>
                </div>
              </fieldset>
              <fieldset className='form-group row'>
                <div className='checkbox'>
                  <label>
                    <input type='checkbox' value=''/>
                    Limited <small className='text-muted'>set life cycle for this conversation</small>
                  </label>
                </div>
              </fieldset>
              <fieldset className='form-group row'>
                <div className='col-sm-10'>
                  <DatePicker selected={this.state.startDate} onChange={this.handleChange.bind(this)}/>
                </div>
              </fieldset>
              <fieldset className='form-group row'>
                <label htmlFor='inputModerators' className='col-sm-2 form-control-label'>Tags</label>
                <div className='col-sm-12'>
                  <ReactTags.WithContext tags={this.state.tags}
                                         suggestions={this.state.suggestions}
                                         placeholder='Add tags'
                                         handleDelete={this.handleDelete.bind(this)}
                                         handleAddition={this.handleAddition.bind(this)}
                                         handleDrag={this.handleDrag.bind(this)}/>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default createDiscussionForm