import React, { Component } from 'react'

class Loader extends Component {

  render() {
    let { size } = this.props
    let sizeProportion = Math.ceil(size * 1.8)
    let loaderStyle = {
      fontSize: `${sizeProportion}px`,
      margin: `${sizeProportion * 8}px auto`
    }

    return (
      <div className='loader' style={loaderStyle}>Loading...</div>
    )
  }
}

export default Loader
