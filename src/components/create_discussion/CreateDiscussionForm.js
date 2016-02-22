import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import ReactTags from 'react-tag-input'

class createDiscussionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tags: [ {id: 1, text: "Apples"} ],
      suggestions: ["Banana", "Mango", "Pear", "Apricot"]
    }
  }

  handleDelete(i) {
        var tags = this.state.tags
        tags.splice(i, 1)
        this.setState({ tags: tags })
  }

  handleAddition(tag) {
      var tags = this.state.tags
      tags.push({
          id: tags.length + 1,
          text: tag
      });
      this.setState({ tags: tags })
  }
  handleDrag(tag, currPos, newPos) {
      var tags = this.state.tags

      // mutate array
      tags.splice(currPos, 1)
      tags.splice(newPos, 0, tag)

      // re-render
      this.setState({ tags: tags })
  }

  render() {
    return (
      <div className='card-group'>
        <div className='card col-xs-12 col-sm-12 col-md-12 col-lg-6'>
          <div className='card-block'>
            <h4 className='card-title text-xs-center'>Create Discussion</h4>
            <form>
              <fieldset className='form-group row'>
                <label htmlFor='inputName' className='col-sm-2 form-control-label'>Name</label>
                <div className='col-sm-10'>
                  <input type='text' className='form-control' id='inputName' placeholder='Name'/>
                </div>
              </fieldset>
              <fieldset className='form-group row'>
                <label htmlFor='inputDescription' className='col-sm-2 form-control-label'>Description</label>
                <div className='col-sm-12'>
                  <textarea className='form-control' id='inputDescription' rows='3'></textarea>
                </div>
              </fieldset>
              <fieldset className='form-group row'>
                <label htmlFor='inputModerators' className='col-sm-2 form-control-label'>Moderators</label>
                <div className='col-sm-12'>
                  <ReactTags.WithContext tags={this.state.tags}
                                         suggestions={this.state.suggestions}
                                         handleDelete={this.handleDelete.bind(this)}
                                         handleAddition={this.handleAddition.bind(this)}
                                         handleDrag={this.handleDrag.bind(this)}/>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className='card col-xs-12 col-sm-12 col-md-12 col-lg-6'>
          <div className='card-block'>
            <h4 className='card-title text-xs-center'>Settings</h4>
            <p className='card-text'>This card has supporting text below as a natural lead-in to additional content.</p>
            <p className='card-text'><small className='text-muted'>Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    )
  }
}

export default createDiscussionForm