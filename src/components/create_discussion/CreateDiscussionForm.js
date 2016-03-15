import React, { Component } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { DOMtoArray } from '../../utils/helpers'

class createDiscussionForm extends Component {

  componentWillMount() {
    this.props.onGetTypes()
    this.props.onGetTags()
    this.props.onGetLimites()
  }

  componentWillUnmount() {
    let tooltips = document.querySelectorAll('.tooltip')
    DOMtoArray(tooltips).map(elem => elem.remove())
  }

  changeName(event) {
    let value = event.target.value
    this.props.onDiscussionName(value)
  }

  changeDescription(event) {
    let value = event.target.value
    this.props.onDiscussionDescription(value)
  }

  changePassword(event) {
    let value = event.target.value
    this.props.onDiscussionPassword(value)
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

  createDiscussion() {
    let nameInput = this.refs.discussionName
    let descriptionInput = this.refs.discussionDescription
    let tagsInput = document.querySelector('.tagsSelector .Select-control')

    if(this.validateFields(nameInput, descriptionInput) && this.validateTags(tagsInput)) {
      this.props.onCreateDiscussion(this.parseCreateDiscussion())
    }
  }

  parseCreateDiscussion() {
    let { discussionTypes } = this.props
    let { email } = this.props.userInfo.payload
    let { name, description, password, selectedType, selectedLimited, selectedTags, isPrivate, isLimited } = this.props.discussionSettings

    return {
      name,
      description,
      typeId: discussionTypes.payload.filter((item) => item.value === selectedType)[0].id,
      isPrivate,
      password,
      isLimited,
      limitedTime: selectedLimited,
      tags: selectedTags.split(','),
      owner: email
    }
  }

  validateTags(tagsInput) {
    let { selectedTags } = this.props.discussionSettings

    if(selectedTags.split(',').length >= 2) {
      tagsInput.classList.remove('input-incorrect')
      return true
    }

    tagsInput.classList.add('input-incorrect')
    return false
  }

  validateFields(nameInput, descriptionInput) {
    let isValidName = this.validateName(nameInput.value)
    let isValidDescription = this.validateDescription(descriptionInput.value)
    let discussionInputs = document.querySelectorAll('.form-control')

    if(!isValidName) {
      setTimeout(() => $(nameInput).tooltip('show'))
      nameInput.classList.add('input-incorrect')
    } else {
      setTimeout(() => $(nameInput).tooltip('hide'))
      nameInput.classList.remove('input-incorrect')
    }

    if(!isValidDescription) {
      setTimeout(() => $(descriptionInput).tooltip('show'))
      descriptionInput.classList.add('input-incorrect')
    } else {
      setTimeout(() => $(descriptionInput).tooltip('hide'))
      descriptionInput.classList.remove('input-incorrect')
    }

    return DOMtoArray(discussionInputs).every(elem => !elem.classList.contains('input-incorrect'))
  }

  validateName(value) {
    return (value.length >= 6) ? true : false
  }

  validateDescription(value) {
    return (value.length >= 50) ? true : false
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
              className='tagsSelector'
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
                    <input onChange={this.changeName.bind(this)}
                           value={discussionSettings.name}
                           type='text'
                           className='form-control'
                           id='inputName'
                           placeholder='Name of conversation'
                           maxLength='50'
                           data-toggle='tooltip'
                           data-trigger='manual'
                           data-placement='right'
                           data-original-title='Name should be more than 6 symbols'
                           ref='discussionName'/>
                  </div>
                </fieldset>
                <fieldset className='form-group row'>
                  <label htmlFor='inputDescription' className='col-sm-2 form-control-label'>Description</label>
                  <div className='col-sm-12'>
                    <textarea onChange={this.changeDescription.bind(this)}
                              value={discussionSettings.description}
                              className='form-control'
                              id='inputDescription'
                              rows='3'
                              placeholder='Describe your conversation'
                              maxLength='200'
                              data-toggle='tooltip'
                              data-trigger='manual'
                              data-placement='right'
                              data-original-title='Description should be more than 50 symbols'
                              ref='discussionDescription'
                              style={{resize: 'none'}}></textarea>
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
                      <input type='checkbox' value='' onChange={this.changePrivate.bind(this)} checked={this.props.discussionSettings.isPrivate}/>
                      Private <small className='text-muted'>use this if you want to set password for this conversation</small>
                    </label>
                  </div>
                </fieldset>
                <fieldset className='form-group row'>
                  <div className='col-sm-12'>
                    <div className='input-group'>
                      <div className='input-group-addon'>Password</div>
                      <input onChange={this.changePassword.bind(this)}
                             value={discussionSettings.password}
                             type='password'
                             maxLength='16'
                             className='form-control'
                             disabled={!discussionSettings.isPrivate}/>
                    </div>
                  </div>
                </fieldset>
                <fieldset className='form-group row'>
                  <div className='checkbox'>
                    <label>
                      <input type='checkbox' value='' onChange={this.changeLimited.bind(this)} checked={this.props.discussionSettings.isLimited}/>
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
        <button type='button' className='btn btn-success' onClick={this.createDiscussion.bind(this)}>Create Discussion</button>
      </div>
    )
  }
}

export default createDiscussionForm