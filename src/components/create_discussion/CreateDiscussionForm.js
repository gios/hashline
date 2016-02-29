import React, { Component } from 'react'
import Select from 'react-select'

class createDiscussionForm extends Component {

  componentWillMount() {
    this.props.onGetTags()
    this.props.onGetLimites()
  }

  changePrivate(event) {
    this.props.onDiscussionPrivate(event.target.checked)
  }

  changeLimited(event) {
    this.props.onDiscussionLimited(event.target.checked)
  }

  selectType(newType) {
    this.props.onDiscussionSelectType(newType)
  }

  selectLimited(newLimited) {
    this.props.onDiscussionSelectLimited(newLimited)
  }

  selectTags(newTag) {
    this.props.onDiscussionSelectTags(newTag)
  }

  loadingSelect(type) {
    if(type.isFetching) {
       return true
    } else if(type.payload) {
       return false
    }
  }

  renderTypeSelect() {
    let { discussionTypes, discussionSettings } = this.props
    let isLoading = this.loadingSelect(discussionTypes)

    return (
      <Select isLoading={isLoading}
              onChange={this.selectType.bind(this)}
              value={discussionSettings.selectedType}
              options={discussionTypes.payload}
              clearable={false}/>
    )
  }

  renderLimitSelect() {
    let { discussionLimites, discussionSettings } = this.props
    let isLoading = this.loadingSelect(discussionLimites)

    return (
      <Select isLoading={isLoading}
              onChange={this.selectLimited.bind(this)}
              value={discussionSettings.selectedLimited}
              options={discussionLimites.payload}
              clearable={false}
              disabled={!discussionSettings.isLimited}/>
    )
  }

  renderTagSelect() {
    let { discussionTags, discussionSettings } = this.props
    let isLoading = this.loadingSelect(discussionTags)

    return (
      <Select isLoading={isLoading}
              onChange={this.selectTags.bind(this)}
              value={discussionSettings.selectedTags}
              multi={true}
              options={discussionTags.payload}
              allowCreate={true}/>
    )
  }

  render() {
    let { discussionSettings } = this.props
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
                      <input type='password' className='form-control' disabled={!discussionSettings.isPrivate}/>
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
                    {this.renderLimitSelect()}
                  </div>
                </fieldset>
                <fieldset className='form-group row'>
                  <label className='form-control-label'>Tags <small className='text-muted'>tags help to identify your conversation</small></label>
                  <div className='col-sm-12'>
                    {this.renderTagSelect()}
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