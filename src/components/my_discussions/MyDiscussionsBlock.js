import React, { Component } from 'react'
import Loader from '../parts/Loader'

class MyDiscussionsBlock extends Component {

  componentWillMount() {
    this.props.onLoadDiscussions()
  }

  renderMyDiscussions() {
    let { discussions } = this.props

    if(discussions.isFetching) {
      return <Loader size={4} color='red'/>
    } else if(discussions.payload) {
      return discussions.payload.map((item) => {
        return (
          <li>{item.name}</li>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderMyDiscussions()}
        </ul>
      </div>
    )
  }
}

export default MyDiscussionsBlock
