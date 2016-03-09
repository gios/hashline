import React, { Component } from 'react'

class DiscussionCard extends Component {

  render() {
    let {name } = this.props.discussion

    return (
      <div>
        <div>{name}</div>
      </div>
    )
  }
}

export default DiscussionCard
