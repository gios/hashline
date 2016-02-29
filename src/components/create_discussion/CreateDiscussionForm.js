import React, { Component } from 'react'
import ReactTags from 'react-tag-input'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class createDiscussionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPrivate: false,
      isLimited: false,
      tags: [ {id: 1, text: 'Apples'} ],
      suggestions: ['Banana', 'Mango', 'Pear', 'Apricot'],
      startDate: moment()
    }
  }

  changePrivate() {
    this.setState({ isPrivate: !this.state.isPrivate })
  }

  changeLimited() {
    this.setState({ isLimited: !this.state.isLimited })
  }

  handleChange(date) {
    this.setState({ startDate: date })
  }

  onDeleteTag(index) {
    let tags = this.state.tags

    tags.splice(index, 1)
    this.setState({ tags: tags })
  }

  onAddTag(tag) {
    let tags = this.state.tags

    tags.push({
        id: tags.length + 1,
        text: tag
    });
    this.setState({ tags: tags })
  }

  onDragTag(tag, currPos, newPos) {
    let tags = this.state.tags

    tags.splice(currPos, 1)
    tags.splice(newPos, 0, tag)
    this.setState({ tags: tags })
  }

  render() {
    let { discussionTypes } = this.props
    let typesOptions

    if(discussionTypes.payload) {
      typesOptions = discussionTypes.payload.types.map((item) => {
        return (
          <option key={item.id}>{item.name}</option>
        )
      })
    }

    return (
      <div>
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
                <fieldset className='form-group row'>
                  <label htmlFor='inputType' className='col-sm-2 form-control-label'>Type</label>
                  <div className='col-sm-12'>
                    <select className='form-control' id='inputType'>
                      {typesOptions}
                    </select>
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
                      <input type='checkbox' value='' onChange={this.changePrivate.bind(this)}/>
                      Private <small className='text-muted'>use this if you want to set password for this conversation</small>
                    </label>
                  </div>
                </fieldset>
                <fieldset className='form-group row'>
                  <div className='col-sm-12'>
                    <div className='input-group'>
                      <div className='input-group-addon'>Password</div>
                      <input type='password' className='form-control' disabled={!this.state.isPrivate}/>
                    </div>
                  </div>
                </fieldset>
                <fieldset className='form-group row'>
                  <div className='checkbox'>
                    <label>
                      <input type='checkbox' value='' onChange={this.changeLimited.bind(this)}/>
                      Limited <small className='text-muted'>set life cycle for this conversation</small>
                    </label>
                  </div>
                </fieldset>
                <fieldset className='form-group row'>
                  <div className='col-sm-12'>
                    <DatePicker selected={this.state.startDate} onChange={this.handleChange.bind(this)} disabled={!this.state.isLimited}/>
                  </div>
                </fieldset>
                <fieldset className='form-group row'>
                  <label className='form-control-label'>Tags <small className='text-muted'>tags help to identify your conversation</small></label>
                  <div className='col-sm-12'>
                    <ReactTags.WithContext tags={this.state.tags}
                                           suggestions={this.state.suggestions}
                                           placeholder='Add tags'
                                           handleDelete={this.onDeleteTag.bind(this)}
                                           handleAddition={this.onAddTag.bind(this)}
                                           handleDrag={this.onDragTag.bind(this)}/>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <button type='button' className='btn btn-success'>Create Discussion</button>
      </div>
    )
  }
}

export default createDiscussionForm