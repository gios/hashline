import React, { Component } from 'react'

class NoDiscussionCards extends Component {

  render() {
    return (
      <div className='text-xs-center'>
        {this.props.children}
      </div>
    )
  }
}

export default NoDiscussionCards
