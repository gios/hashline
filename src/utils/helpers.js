export function DOMtoArray(obj) {
  let array = [];

  for (let i = obj.length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}
export function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250)
  let last
  let deferTimer

  return () => {
    let context = scope || this
    let now = +new Date
    let args = arguments

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, threshhold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}