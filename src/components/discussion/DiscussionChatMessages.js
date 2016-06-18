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

  testChatDate(date) {
    return moment().diff(date, 'day') >= 1 ? moment(date).format('DD.MM.YY') : moment(date).format('H:mm:ss')
  }

  scrollLoadMessages() {
    let chatScroll = this.refs.chatScroll
    let { discussionMessages,
          loadDiscussionMessages,
          setStartLoadMessages,
          setEndLoadMessages,
          setScrollToBottom } = this.props

    if(!chatScroll.getValues().top && !discussionMessages.loadDisable) {
      let startScrollLoad = chatScroll.getScrollHeight()
      setScrollToBottom(false)
      setStartLoadMessages(discussionMessages.startLoad + MESSAGE_INTERVAL)
      setEndLoadMessages(discussionMessages.endLoad + MESSAGE_INTERVAL)
      loadDiscussionMessages().then(() => {
        let endScrollLoad = chatScroll.getScrollHeight()
        let diffScrollLoad = endScrollLoad - startScrollLoad
        setTimeout(() => this.refs.chatScroll.scrollTop(diffScrollLoad))
      })
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
              <div>{this.testChatDate(item.created_at)}</div>
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
        <Scrollbars ref='chatScroll'
                    style={{height: `${clientHeight - 200}px`}}
                    onScroll={this.scrollLoadMessages.bind(this)}>
          {loader}
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
