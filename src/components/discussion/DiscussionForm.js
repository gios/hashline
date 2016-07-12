import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications'
import moment from 'moment'
import DiscussionExpiredTimer from './DiscussionExpiredTimer'
import DiscussionChatMessages from './DiscussionChatMessages'
import Select from 'react-select'
import { ENTER_KEYCODE, MESSAGE_INTERVAL } from '../../constants'
import { trimField, pasteHtmlAtCaret, placeCaretAtEnd } from '../../utils/helpers'
import Loader from '../parts/Loader'
import ReactEmoji from 'react-emoji'
import EmojiPicker from 'react-emoji-picker'
import ContentEditable from 'react-contenteditable'
import Popover from 'react-popover'
import ReactDOMServer from 'react-dom/server'

class DiscussionForm extends Component {

  constructor(props) {
    super(props)
    this.emojify = ReactEmoji.emojify.bind(this)
  }

  componentWillMount() {
    let { discussionId, discussionInfo } = this.props

    if(!discussionInfo.payload || discussionInfo.payload.id !== discussionId) {
      this.props.onJoinDiscussion({ id: discussionId })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.discussionId !== nextProps.discussionId) {
      setTimeout(() => {
        this.props.onJoinDiscussion({ id: nextProps.discussionId })
      })
    }
  }

  componentDidMount() {
    this.refs.addMessage.htmlEl.focus()
  }

  loadDiscussionMessages() {
    let { discussionId, discussionMessages, setLoadDisableMessages } = this.props

    return this.props.getDiscussionMessages(discussionId, discussionMessages.startLoad, discussionMessages.endLoad).then(status => {
      if(status.error) {
        NotificationManager.error(status.payload.response.message)
        return
      }

      if(status.payload.length < MESSAGE_INTERVAL) {
        setLoadDisableMessages(true)
      } else {
        setLoadDisableMessages(false)
      }
      this.props.setMessageArchive(status.payload)
    }).catch(err => {
      NotificationManager.error(err.message)
      setLoadDisableMessages(true)
    })
  }

  componentWillUnmount() {
    let { socket, discussionId, user, clearMessageArchive, setStartLoadMessages, setEndLoadMessages } = this.props
    setStartLoadMessages(0)
    setEndLoadMessages(MESSAGE_INTERVAL)
    clearMessageArchive()
    socket.emit('leave discussion', { discussionId, username: user.payload.username })
    socket.removeListener('leave discussion')
    socket.removeListener('join discussion')
    socket.removeListener('connected users')
    socket.removeListener('invite users')
    socket.removeListener('typing message')
    socket.removeListener('stop typing message')
  }

  parseMessageEmojiImg(message = '') {
    let imgRegexp = /<img([^>]*[^/])>/g
    let imgClassRegexp = /class="(:[\w]*:)"/

    return message.replace(imgRegexp, str => {
      return str.match(imgClassRegexp)[1]
    }).replace(/&nbsp;/g, ' ')
  }

  changeChatMessage(e) {
    let { discussionMessages, socket, user, discussionId } = this.props
    let message = e.target.value

    if(this.validateMessage(message) || discussionMessages.chatMessage.length) {
      this.props.setChatMessage(message)
      socket.emit('typing message', discussionId, user.payload)
      this.props.setScrollToBottom(false)
    }
  }

  sendMessage(e) {
    if((!e.which || (e.which === ENTER_KEYCODE && !e.shiftKey))) {
      let message = this.parseMessageEmojiImg(e.currentTarget.innerHTML)
      let { socket, discussionId, user, setChatMessage } = this.props

      if(this.validateMessage(message)) {
        this.emojiSelect()
        socket.emit('chat message', message, discussionId, user.payload)
        socket.emit('stop typing message', discussionId, user.payload)
        setChatMessage('')
        this.refs.addMessage.htmlEl.focus()
      }
    }
  }

  validateMessage(message) {
    return !(trimField(message) === '')
  }

  loadingSelect(type) {
    if(type.isFetching) {
       return true
    } else if(type.payload) {
       return false
    }
  }

  selectUsers(usersInvite) {
    let { discussionInfo, discussionUsersInvite, setScrollToBottom } = this.props

    if(discussionInfo.usersInvite.length <= 4) {
      discussionUsersInvite(usersInvite)
      setScrollToBottom(false)
    }
  }

  inputUsersInvite(query) {
    this.props.getSearchUsers(query.trim())
    this.props.setScrollToBottom(false)
  }

  inviteUsers() {
    let usersForInviteString = ''
    let { user, discussionId, discussionInfo, socket, discussionUsersInvite } = this.props
    socket.emit('invite users', discussionInfo.usersInvite, parseInt(discussionId), user.payload.id)
    let usersForInvite = discussionInfo.usersInvite.map(item => item.value)
    usersForInvite.forEach((item, index) => {
      let value = ''
      value += item

      if(index !== usersForInvite.length - 1) {
        value += ', '
      }
      usersForInviteString += value
    })

    NotificationManager.success(`To: ${usersForInviteString}`, 'Your invitations have successfully sent')
    discussionUsersInvite([])
  }

  renderUsersSelect() {
    let { discussionInfo, searchUsers } = this.props
    let isLoading = this.loadingSelect(searchUsers)

    return (
      <Select isLoading={isLoading}
              noResultsText={'User not found'}
              onChange={this.selectUsers.bind(this)}
              onInputChange={this.inputUsersInvite.bind(this)}
              value={discussionInfo.usersInvite}
              multi={true}
              options={searchUsers.payload}/>
    )
  }

  emojiSelect() {
    this.props.toggleEmojiPopup()
    this.props.setScrollToBottom(false)
  }

  renderEmojiPopover() {
    let { discussionMessages } = this.props
    let emojiPopoverBody = <EmojiPicker onSelect={this.setEmoji.bind(this)}/>
    let emojiOptions = {
      attributes: {
        width: '25px',
        height: '25px',
        onMouseOver: this.emojiSelect.bind(this)
      }
    }

    return (
      <Popover isOpen={discussionMessages.emojiPopup} body={emojiPopoverBody} onOuterAction={this.emojiSelect.bind(this)}>
        <div className='chat-emoji-icon'>
          <small className='text-muted'>Emoji Picker </small>
          {this.emojify(':)', emojiOptions)}
        </div>
      </Popover>
    )
  }

  emojiCursorPosition(e) {
    if(e.target.className !== 'chat-message') {
      let range = document.createRange()
      range.selectNodeContents(e.target)
      range.collapse(false)
      let selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  setEmoji(emoji, event) {
    if(!event) {
      return
    }
    let { discussionMessages, setChatMessage } = this.props
    let message = discussionMessages.chatMessage
    let emojiOptions = {
      attributes: {
        className: emoji
      }
    }
    let renderedEmoji = ReactDOMServer.renderToStaticMarkup(this.emojify(emoji, emojiOptions)[0])
    let isChatMessage = window.getSelection().anchorNode ? window.getSelection().anchorNode.className : false

    if(message.endsWith('<br><br>')) {
      message = message.slice(0, message.length - 4)
    }

    if(isChatMessage === 'chat-message') {
      pasteHtmlAtCaret(renderedEmoji)
    } else {
      placeCaretAtEnd(this.refs.addMessage.htmlEl)
      pasteHtmlAtCaret(renderedEmoji)
    }
    setChatMessage(this.refs.addMessage.htmlEl.innerHTML)
  }

  typingUsersFilter(users) {
    if(users.length > 3) {
      return <div className='typing'><strong>{users.slice(0, 3).map(user => ' ' + user)}</strong> and others typing</div>
    } else {
      return <div className='typing'><strong>{users.map(user => ' ' + user)}</strong> typing</div>
    }
  }

  typingMessage() {
    let { discussionMessages } = this.props

    if(discussionMessages.userTyping.length) {
      return this.typingUsersFilter(discussionMessages.userTyping)
    } else {
      return null;
    }
  }

  render() {
    let { discussionInfo, clientHeight, discussionMessages, user } = this.props
    let discussionInfoRender

    if(discussionInfo.isFetching) {
      discussionInfoRender = <Loader size={2}/>
    } else if(discussionInfo.payload) {
      discussionInfoRender = (
        <ul className='list-group'>
          <a className='online-users-chat' data-toggle='collapse' href='#online-users' aria-expanded='false' aria-controls='online-users'>
            <li className='list-group-item m-b-1'>
              <strong>Connected Users:</strong>
              <span className='label label-default label-pill pull-xs-right'>{discussionInfo.connectedUsers && discussionInfo.connectedUsers.length}</span>
            </li>
          </a>
          <div className='collapse' id='online-users'>
            <div className='card card-block'>
              <ul className='list-group'>
                  {discussionInfo.connectedUsers && discussionInfo.connectedUsers.users.map(user => {
                    return (
                      <li key={user.index} className='list-group-item'>
                        <span className='label label-default pull-xs-right chat-user-label'>{user.email}</span>
                        {user.username}
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
          { (discussionInfo.payload && discussionInfo.payload.username) === (user.payload && user.payload.username) &&
            <div>
              <a className='online-users-chat' data-toggle='collapse' href='#invite-users' aria-expanded='false' aria-controls='invite-users'>
                <li className='list-group-item m-b-1'>
                  <strong>Invite Users:</strong>
                  <i className='fa fa-arrow-down pull-xs-right' aria-hidden='true'></i>
                </li>
              </a>
              <div className='collapse' id='invite-users'>
                <div className='card card-block'>
                  {this.renderUsersSelect()}
                  <button type='button'
                          className='btn btn-primary btn-sm m-t-1'
                          onClick={this.inviteUsers.bind(this)}>Invite</button>
                  {discussionInfo.errorUsersInvite &&
                    <div className='pull-xs-right m-t-1 error-users-invite'>
                      <span>{discussionInfo.errorUsersInvite.message}:</span><br/>
                      <span>{discussionInfo.errorUsersInvite.users.map(user => `${user} `)}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
          <li className='list-group-item'>
            <strong>Name:</strong>
            <div className='chat-info-description'>{discussionInfo.payload.name}</div>
          </li>
          <li className='list-group-item'>
            <strong>Description:</strong>
            <div className='chat-info-description'>{discussionInfo.payload.description}</div>
          </li>
          <li className='list-group-item'>
            <strong>Created At:</strong>
            <div className='chat-info-description'>{moment(discussionInfo.payload.created_at).format('DD MMM YYYY H:mm:ss')}</div>
          </li>
          <li className='list-group-item'>
            <strong>Creator:</strong>
            <div className='pull-xs-right'>{discussionInfo.payload.username}</div>
          </li>
          <li className='list-group-item'>
            <strong>Type:</strong>
            <div className='pull-xs-right'>{discussionInfo.payload.type_name}</div>
          </li>
          <li className='list-group-item'>
            <strong>Attributes:</strong>
            <div className='my-discussion-labels pull-xs-right'>
              {(discussionInfo.payload.is_private)
                ? <span className='label label-warning'>Private</span>
                : <span className='label label-primary'>Public</span>}
              {(discussionInfo.payload.is_limited)
                ? <span className='label label-info'>Limited</span>
                : null}
            </div>
          </li>
          <li className='list-group-item'>
            <strong>Tags:</strong>
            <div className='tag-labels pull-xs-right'>
              {discussionInfo.payload.tags && discussionInfo.payload.tags.map((tag, index) => {
                return <span key={index} className='label label-default'>{tag}</span>
              })}
            </div>
          </li>
          <DiscussionExpiredTimer discussionInfo={discussionInfo}/>
        </ul>
      )
    }

    return (
      <div>
        <div className='col-sm-12 col-md-12 col-lg-8'>
          <form>
            <fieldset className='form-group chat-area'>
              <DiscussionChatMessages clientHeight={clientHeight}
                                      setStartLoadMessages={this.props.setStartLoadMessages}
                                      setEndLoadMessages={this.props.setEndLoadMessages}
                                      loadDiscussionMessages={this.loadDiscussionMessages.bind(this)}
                                      discussionMessages={discussionMessages}
                                      setScrollToBottom={this.props.setScrollToBottom}/>
              {this.typingMessage()}
              {this.renderEmojiPopover()}
              <ContentEditable className='chat-message'
                               ref='addMessage'
                               placeholder='Write something'
                               tabIndex='0'
                               onMouseDown={this.emojiCursorPosition.bind(this)}
                               onKeyDown={this.sendMessage.bind(this)}
                               onChange={this.changeChatMessage.bind(this)}
                               html={discussionMessages.chatMessage}/>
              <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4 p-a-0'>
                <button type='button'
                        className='btn btn-primary pull-xs-left m-t-1'
                        onClick={this.sendMessage.bind(this)}>Send</button>
              </div>
              <div className='col-xs-12 col-sm-8 col-md-8 col-lg-8 p-a-0'>
                <span className='pull-xs-right m-t-1'>Press <kbd>Shift + Enter</kbd> for newline message.</span>
              </div>
            </fieldset>
          </form>
        </div>
        <div className='col-sm-12 col-md-12 col-lg-4'>
          {discussionInfoRender}
        </div>
      </div>
    )
  }
}

export default DiscussionForm
