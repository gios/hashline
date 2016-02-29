import React, { Component } from 'react'
import Select from 'react-select'

class createDiscussionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPrivate: false,
      isLimited: false,
      selectedType: 'question',
      selectedLimited: '1hour',
      selectedTags: [],
      limitedValues: [
        {value: '1hour', label: '1 Hour'},
        {value: '2hour', label: '2 Hour'},
        {value: '3hour', label: '3 Hour'},
        {value: '6hour', label: '6 Hour'},
        {value: '12hour', label: '12 Hour'},
        {value: 'allday', label: 'All Day'}
      ],
      tagsValues: [
        {value: 'sport', label: 'Sport'},
        {value: 'culture', label: 'Culture'},
        {value: 'ronaldo', label: 'Ronaldo'},
        {value: 'etc', label: 'Etc'}
      ]
    }
  }

  changePrivate() {
    this.setState({ isPrivate: !this.state.isPrivate })
  }

  changeLimited() {
    this.setState({ isLimited: !this.state.isLimited })
  }

  onSelectType(newType) {
    this.setState({
      selectedType: newType
    })
  }

  onSelectLimited(newLimited) {
    this.setState({
      selectedLimited: newLimited
    })
  }

  onSelectTags(newTag) {
    this.setState({
      selectedTags: newTag
    })
  }

  renderTypeSelect() {
    let { discussionTypes } = this.props
    let isLoading
    if(discussionTypes.isFetching) {
      isLoading = true
    } else if(discussionTypes.payload) {
      isLoading = false
    }

    return (
      <Select isLoading={isLoading} onChange={this.onSelectType.bind(this)} value={this.state.selectedType} options={discussionTypes.payload} clearable={false}/>
    )
  }

  render() {
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
                    {this.renderTypeSelect()}
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
                    <Select onChange={this.onSelectLimited.bind(this)}
                            value={this.state.selectedLimited}
                            options={this.state.limitedValues}
                            clearable={false}
                            disabled={!this.state.isLimited}/>
                  </div>
                </fieldset>
                <fieldset className='form-group row'>
                  <label className='form-control-label'>Tags <small className='text-muted'>tags help to identify your conversation</small></label>
                  <div className='col-sm-12'>
                    <Select onChange={this.onSelectTags.bind(this)}
                            value={this.state.selectedTags}
                            multi={true}
                            options={this.state.tagsValues}
                            allowCreate={true}/>
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