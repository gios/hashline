import { number } from '../reducers/counter'
import { wonders } from '../reducers/wonders'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  number,
  wonders
})

export default reducers
