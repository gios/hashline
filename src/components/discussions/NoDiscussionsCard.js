import React, { Component } from 'react'

class NoDiscussionsCard extends Component {

  render() {
    return (
      <div className='text-xs-center'>
        {this.props.children}
      </div>
    )
  }
}

export default NoDiscussionsCard
