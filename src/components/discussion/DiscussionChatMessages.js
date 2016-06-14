import React, { Component } from 'react'
import Loader from '../parts/Loader'
import moment from 'moment'

class DiscussionChatMessages extends Component {

  componentDidMount() {
    this.props.setScrollToBottom(true)
  }

  componentWillUpdate(nextProps) {
    if(nextProps.discussionMessages.scrollToBottom && nextProps.discussionMessages.messageArchive.length) {
      let chatContainer = this.refs.chatContainer
      let scrollTop = chatContainer.scrollTop
      let diffLength = chatContainer.scrollHeight - chatContainer.clientHeight

      if(diffLength - scrollTop) {
        this.props.setScrollToBottom(false)
      }
      chatContainer.scrollTop = diffLength - scrollTop
    }
  }

  scrollLoader() {
    let chatContainer = this.refs.chatContainer
    let scrollTop = chatContainer.scrollTop
    let diffLength = chatContainer.scrollHeight - chatContainer.clientHeight
    let reteRelation = scrollTop / diffLength
    if(!reteRelation) {
      console.log("END")
    }
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
    } else if(discussionMessages.messageArchive) {
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
      <div className='card'
        style={{height: `${clientHeight - 200}px`}}
        ref='chatContainer'
        onScroll={this.scrollLoader.bind(this)}>
        <div className='card-block'>
          <div className='table-responsive'>
            <table className='table'>
              <tbody className='chat-messages-area'>
                {messageBlock}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default DiscussionChatMessages
