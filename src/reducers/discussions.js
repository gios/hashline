import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { REQUEST_GET_DISCUSSIONS,
         SUCCESS_GET_DISCUSSIONS,
         FAILURE_GET_DISCUSSIONS,
         SET_DISCUSSIONS_ARCHIVE,
         SET_SENT_DISCUSSIONS_ARCHIVE,
         DELETE_DISCUSSION_FROM_ARCHIVE,
         CLEAR_DISCUSSIONS_ARCHIVE } from '../actions/discussionsAction'

const discussionsGetState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false,
  discussionsArchive: Immutable.List.of()
})

function getDiscussions(state = discussionsGetState, action) {
  switch (action.type) {
    case REQUEST_GET_DISCUSSIONS:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS_GET_DISCUSSIONS:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE_GET_DISCUSSIONS:
      return state.merge({
        isFetching: false,
        payload: action.payload.response,
        error: true
      })
    case SET_DISCUSSIONS_ARCHIVE:
      return state.merge({
        discussionsArchive: state.get('discussionsArchive').push(...action.discussionsArchive)
      })
    case SET_SENT_DISCUSSIONS_ARCHIVE:
      return state.merge({
        discussionsArchive: state.get('discussionsArchive').unshift(action.sentDiscussions)
      })
    case DELETE_DISCUSSION_FROM_ARCHIVE:
      return state.merge({
        discussionsArchive: state.get('discussionsArchive').delete(state.get('discussionsArchive').findIndex(item => {
          return item.id === action.id
        }))
      })
    case CLEAR_DISCUSSIONS_ARCHIVE:
      return state.merge({
        discussionsArchive: state.get('discussionsArchive').clear()
      })
    default:
      return state
  }
}

export let discussions = combineReducers({
  getDiscussions
})