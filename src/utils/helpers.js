export function DOMtoArray(obj) {
  let array = []

  for (let i = obj.length >>> 0; i--;) {
    array[i] = obj[i]
  }
  return array
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

export let idToken = {
  setToken: function(token) {
    localStorage.setItem('id_token', token)
  },
  getToken: function() {
    return localStorage.getItem('id_token')
  },
  hasToken: function() {
    return localStorage.getItem('id_token') ? true : false
  },
  removeToken: function() {
    localStorage.removeItem('id_token')
  }
}

export function trimField(str) {
  return str.replace(/^\s+|\s+$/g, '')
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function placeCaretAtEnd(el) {
  el.focus()

  if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
    let range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  } else if (typeof document.body.createTextRange !== 'undefined') {
    let textRange = document.body.createTextRange()
    textRange.moveToElementText(el)
    textRange.collapse(false)
    textRange.select()
  }
}

export function pasteHtmlAtCaret(html) {
  let sel, range

  if(window.getSelection) {
    sel = window.getSelection()

    if(sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0)
      range.deleteContents()

      let el = document.createElement('div')
      el.innerHTML = html
      let frag = document.createDocumentFragment(), node, lastNode
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node)
      }
      range.insertNode(frag)

      if (lastNode) {
        range = range.cloneRange()
        range.setStartAfter(lastNode)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
  } else if(document.selection && document.selection.type != 'Control') {
    document.selection.createRange().pasteHTML(html)
  }
}

export let tabVisibility = (function() {
  let stateKey, eventKey, keys = {
    hidden: 'visibilitychange',
    webkitHidden: 'webkitvisibilitychange',
    mozHidden: 'mozvisibilitychange',
    msHidden: 'msvisibilitychange'
  }

  for(stateKey in keys) {
    if(stateKey in document) {
      eventKey = keys[stateKey]
      break
    }
  }
  return function (c) {
    if(c) document.addEventListener(eventKey, c)
    return !document[stateKey]
  }
})()