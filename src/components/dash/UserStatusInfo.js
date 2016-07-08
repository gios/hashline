import React, { Component } from 'react'
import { DropModal } from 'boron'
import Loader from '../parts/Loader'

class UserSTatusInfo extends Component {

  rankLabelSelector(rank) {
    let rankColor = ''

    switch(rank) {
      case 1:
        rankColor = 'rank-gold'
        break;
      case 2:
        rankColor = 'rank-silver'
        break;
      case 3:
        rankColor = 'rank-bronze'
        break;
      default:
        rankColor = 'rank-others'
    }

    return <span className={`label ${rankColor}`}>{rank}</span>
  }

  getRankTableContent() {
    return (
      <div className='text-xs-center'>
        <div className='modal-header'>
          <h4 className='modal-title'>Rank Table</h4>
        </div>
        <div className='modal-body'>
          <div className='table-responsive'>
            <table className="table">
              <thead className="thead-inverse">
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Discussions created</th>
                  <th>Messages Sent</th>
                  <th>Messages Received</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form onSubmit={this.closeRankTableModal.bind(this)}>
          <div className='modal-footer'>
            <button type='submit' className='btn btn-primary'>Back</button>
          </div>
        </form>
      </div>
    )
  }

  closeRankTableModal(e) {
    e.preventDefault()
    this.refs.rankTable.hide()
  }

  renderUserStatusInfo() {
    let { dashUserInfo } = this.props

    if(dashUserInfo.isFetching) {
      return <Loader size={3}/>
    } else if(dashUserInfo.payload) {
      return (
        <div className='card'>
          <DropModal ref='rankTable' modalStyle={{width: '50%'}}>{this.getRankTableContent()}</DropModal>
          <div className='card-block'>
            <button onClick={() => this.refs.rankTable.show()} type='button' className='btn btn-sm btn-primary pull-xs-right'>Rank Table</button>
            <h4 className='card-title'>Rank {this.rankLabelSelector(dashUserInfo.payload.rank)}</h4>
            <p className='card-text'>This rank is calculated using the ratio between the created and received messages from your discussions.</p>
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <span className='label label-default label-pill pull-xs-right'>{dashUserInfo.payload.discussions_created}</span>
              Discussions created
            </li>
            <li className='list-group-item'>
              <span className='label label-default label-pill pull-xs-right'>{dashUserInfo.payload.messages_sent}</span>
              Messages Sent
            </li>
            <li className='list-group-item'>
              <span className='label label-default label-pill pull-xs-right'>{dashUserInfo.payload.messages_received}</span>
              Messages Received
            </li>
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='list-group'>
        {this.renderUserStatusInfo()}
      </div>
    )
  }
}

export default UserSTatusInfo
