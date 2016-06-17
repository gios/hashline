import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { MESSAGE_INTERVAL } from '../../constants'
import Loader from '../parts/Loader'
import moment from 'moment'

class DiscussionChatMessages extends Component {

  componentDidMount() {
    this.props.setScrollToBottom(true)
  }

  componentWillUnmount() {
    this.props.setScrollToBottom(false)
  }

  componentWillUpdate(nextProps) {
    if(nextProps.discussionMessages.scrollToBottom) {
      setTimeout(() => this.refs.chatScroll.scrollToBottom())
    }
  }

  scrollLoadMessages() {
    let chatScroll = this.refs.chatScroll
    let { discussionMessages, loadDiscussionMessages, setStartLoadMessages, setEndLoadMessages } = this.props

    if(!chatScroll.getValues().top && !discussionMessages.loadDisable) {
      setStartLoadMessages(discussionMessages.startLoad + MESSAGE_INTERVAL)
      setEndLoadMessages(discussionMessages.endLoad + MESSAGE_INTERVAL)
      loadDiscussionMessages()
    }
  }

  render() {
    let { clientHeight, discussionMessages } = this.props
    let messageBlock, loader

    if(discussionMessages.isFetching) {
      loader = <Loader size={2}/>
    }

    if(!discussionMessages.isFetching && !discussionMessages.messageArchive.length) {
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
        {loader}
        <Scrollbars ref='chatScroll'
                    style={{height: `${clientHeight - 200}px`}}
                    onScroll={this.scrollLoadMessages.bind(this)}>
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
      </div>
    )
  }
}

export default DiscussionChatMessages
