import * as React from 'react'

class NoDiscussionsCard extends React.Component {

  render() {
    return (
      <div className='text-xs-center'>
        {this.props.children}
      </div>
    )
  }
}

export default NoDiscussionsCard
