export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'

export function increase(amount) {
  return { type: INCREASE, amount };
}

export function decrease(amount) {
  return { type: DECREASE, amount };
}
