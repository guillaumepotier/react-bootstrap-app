// fetch polyfill from github
import 'whatwg-fetch'
import 'svgxuse'

// IE11 element.remove()
// https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
/* eslint-disable */
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this)
    }
  }
}

// global.requestAnimationFrame = function (callback) {
//   setTimeout(callback, 0)
// }

// IE 11 event.path not available
// https://stackoverflow.com/questions/39245488/event-path-undefined-with-firefox-and-vue-js/39245638#39245638
export function composedPath(el) {
  let path = []
  while (el) {
    path.push(el)
    if (el.tagName === 'HTML') {
      path.push(document)
      path.push(window)
      return path
    }
    el = el.parentElement
  }
}

// IE11 nodelist foreach polyfill
// https://developer.mozilla.org/fr/docs/Web/API/NodeList/forEach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}

/* eslint-enable */
