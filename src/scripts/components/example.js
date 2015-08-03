var formatXML = require('../actions/format-xml')

function Example(target) {
  if (target.value) {
    return
  }

  var snippet = document.querySelector(target.getAttribute('data-element-snippet'))
  target.value = formatXML(snippet.innerHTML.trim())
}

module.exports = Example
