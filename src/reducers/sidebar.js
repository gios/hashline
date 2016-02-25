import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { TOGGLE_SIDEBAR,
         MOBILE_SIDEBAR,
         REQUEST_USER_INFO,
         SUCCESS_USER_INFO,
         FAILURE_USER_INFO } from '../actions/sidebarAction'

let currentMode = (window.innerWidth < 721) ? true : false
const sidebarState = Immutable.Map({
  isToggled: currentMode,
  isMobileView: currentMode
})

function sidebarView(state = sidebarState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return state.merge({
        isToggled: action.toggle
      })
    case MOBILE_SIDEBAR:
      return state.merge({
        isToggled: action.mobile,
        isMobileView: action.mobile
      })
    default:
      return state
  }
}

const userInfoState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function userInfo(state = userInfoState, action) {
  switch (action.type) {
    case REQUEST_USER_INFO:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS_USER_INFO:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE_USER_INFO:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: true
      })
    default:
      return state
  }
}

export let sidebar = combineReducers({
  sidebarView,
  userInfo
})