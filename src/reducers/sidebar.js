import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { MOBILE_MAX_WIDTH } from '../constants'
import { TOGGLE_SIDEBAR,
         MOBILE_SIDEBAR,
         REQUEST_USER_INFO,
         SUCCESS_USER_INFO,
         FAILURE_USER_INFO,
         REQUEST_SIDEBAR_TYPES,
         SUCCESS_SIDEBAR_TYPES,
         FAILURE_SIDEBAR_TYPES} from '../actions/sidebarAction'

let currentMode = (window.innerWidth < MOBILE_MAX_WIDTH) ? true : false
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

const sidebarGetState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

function sidebarGetInit(state, action, ...types) {
  switch (action.type) {
    case types[0]:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case types[1]:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case types[2]:
      return state.merge({
        isFetching: false,
        payload: action.payload.response,
        error: true
      })
    default:
      return state
  }
}

function userInfo(state = sidebarGetState, action) {
  return sidebarGetInit(state, action, REQUEST_USER_INFO, SUCCESS_USER_INFO, FAILURE_USER_INFO)
}

function sidebarTypes(state = sidebarGetState, action) {
  return sidebarGetInit(state, action, REQUEST_SIDEBAR_TYPES, SUCCESS_SIDEBAR_TYPES, FAILURE_SIDEBAR_TYPES)
}

export let sidebar = combineReducers({
  sidebarView,
  sidebarTypes,
  userInfo
})