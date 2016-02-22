import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import Sidebar from '../sidebar/Sidebar'

class IndexDash extends Component {

  render() {
    return (
      <div className='content-wrapper'>
        <Sidebar/>
        <div className='container-fluid'>
          <div className='col-md-12'>
            <div className='col-md-6'>Create discussion</div>
            <div className='col-md-6'>Feed</div>
            <div className='col-md-6'>Trending</div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexDash
