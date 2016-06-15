import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import Loader from '../parts/Loader'
import moment from 'moment'

class DiscussionChatMessages extends Component {
  // SCROLL TO BOTTOM IMPLEMENT

  componentDidMount() {
    this.props.setScrollToBottom(true)
  }

  go(e) {
    e.preventDefault()
    this.refs.chatScroll.scrollToBottom()
  }

  render() {
    let { clientHeight, discussionMessages } = this.props
    let messageBlock

    if(discussionMessages.isFetching) {
      messageBlock = <tr>
        <td>
          <Loader size={2}/>
        </td>
      </tr>
    } else if(!discussionMessages.isFetching && !discussionMessages.messageArchive.length) {
      messageBlock = <tr>
        <td>
          <div className='no-messages text-xs-center'>
            This discussion doesn't have any messages.<br/>
            Type something below.<br/>
            <i className='fa fa-arrow-down text-xs-center fa-lg' aria-hidden='true'></i>
          </div>
        </td>
      </tr>
    } else if(discussionMessages.messageArchive.length) {
      messageBlock = discussionMessages.messageArchive.map((item, index) => {
        return (
          <tr key={index}>
            <td className='message-time'>
              <div>{moment(item.created_at).format('H:mm:ss')}</div>
            </td>
            <th scope='row' className='message-username'>
              <div>{item.username}</div>
            </th>
            <td>
              <div className='message-item'>{item.message}</div>
            </td>
          </tr>
        )
      })
    }

    return (
      <div className='card' ref='chatContainer'>
        <Scrollbars ref='chatScroll' style={{height: `${clientHeight - 200}px`}}>
          <div className='card-block'>
            <div className='table-responsive'>
              <table className='table'>
                <tbody className='chat-messages-area'>
                  {messageBlock}
                </tbody>
              </table>
            </div>
          </div>
        </Scrollbars>
        <button onClick={this.go.bind(this)}>HA</button>
      </div>
    )
  }
}

export default DiscussionChatMessages
