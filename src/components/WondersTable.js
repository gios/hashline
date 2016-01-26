import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class WondersTable extends Component {
  render() {
    let wondersTable = this.props.wonders.map((item) => {
      let { id, showplace, popularity } = item.toObject()
      return (
        <tr key={id}>
          <th scope='row'>{id}</th>
          <td>{showplace}</td>
          <td>{popularity}</td>
        </tr>
      )
    })

    return (
      <table className='table'>
        <thead className='thead-inverse'>
          <tr>
            <th>#</th>
            <th>Showplaces</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {wondersTable}
        </tbody>
      </table>
    )
  }
}

export default WondersTable
