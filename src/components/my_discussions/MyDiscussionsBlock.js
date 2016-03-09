import React, { Component } from 'react'
import Loader from '../parts/Loader'
import DiscussionCard from './DiscussionCard'

class MyDiscussionsBlock extends Component {

  componentWillMount() {
    this.props.onLoadDiscussions()
  }

  renderMyDiscussions() {
    let { discussions } = this.props

    if(discussions.isFetching) {
      return <Loader size={4} color='red'/>
    } else if(discussions.payload) {
      return discussions.payload.map((discussion) => {
        return (
          <DiscussionCard key={discussion.id} discussion={discussion}/>
        )
      })
    }
  }

  render() {
    return (
      <div className='card-group'>
        {this.renderMyDiscussions()}
      </div>
    )
  }
}

export default MyDiscussionsBlock
