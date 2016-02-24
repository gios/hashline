import Immutable from 'immutable'
import { TOGGLE_SIDEBAR, MOBILE_SIDEBAR } from '../actions/sidebarAction'

let currentMode = (window.innerWidth < 721) ? true : false
const sidebarState = Immutable.Map({
  isToggled: currentMode,
  isMobileView: currentMode
})

export function sidebar(state = sidebarState, action) {
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