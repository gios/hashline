import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { MESSAGE_INTERVAL } from '../../constants'
import Loader from '../parts/Loader'
import moment from 'moment'
import ReactEmoji from 'react-emoji'
import ReactDOMServer from 'react-dom/server'

class DiscussionChatMessages extends Component {

  constructor(props) {
    super(props)
    this.emojify = ReactEmoji.emojify.bind(this)
  }

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
        let indexIterator = (index - 1 >= 0) ? index - 1 : index
        let skipUsername = (item.username === discussionMessages.messageArchive[indexIterator].username && (index || indexIterator)) ? true : false
        let message = this.emojify(item.message).map(part => {
          if(React.isValidElement(part)) {
            return ReactDOMServer.renderToStaticMarkup(part)
          } else {
            return part
          }
        }).join('')

        return (
          <tr key={index}>
            <td>
              {!skipUsername && <div className='message-username m-b-1'>{item.username}</div>}
              <div className='message-item' dangerouslySetInnerHTML={{__html: message}}></div>
            </td>
            <td className='message-time' style={{verticalAlign: `${!skipUsername ? 'bottom' : 'top'}`}}>
              <div>{this.testChatDate(item.created_at)}</div>
            </td>
          </tr>
        )
      })
    }

    return (
      <div className='messages-outer m-b-1'>
        <Scrollbars ref='chatScroll'
                    style={{height: `${clientHeight - 200}px`, minHeight: '20em'}}
                    onScroll={this.scrollLoadMessages.bind(this)}>
          {loader}
          <div className='messages-inner'>
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
