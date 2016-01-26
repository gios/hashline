import Immutable from 'immutable'
import { INCREASE, DECREASE } from '../actions/counterActions'

const numberState = Immutable.Map({ amount: 1 })

export function number(state = numberState, action) {
  switch (action.type) {
    case INCREASE:
      return state.set('amount', state.get('amount') + action.amount)
    case DECREASE:
      return state.set('amount', state.get('amount') - action.amount)
    default:
      return state;
  }
}
