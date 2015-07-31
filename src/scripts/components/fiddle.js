var XSLT = require('../processes/xslt')
var pubsub = require('../actions/pubsub')

function Fiddle(target) {
  this.xslt = new XSLT

  this.el = {
    type: document.querySelector(target.getAttribute('data-element-type')),
    xml: document.querySelector(target.getAttribute('data-element-xml')),
    xsl: document.querySelector(target.getAttribute('data-element-xsl')),
    output: document.querySelector(target.getAttribute('data-element-output'))
  }

  target.onsubmit = this.onSubmit.bind(this)
}

Fiddle.prototype.onSubmit = function(e) {
  e.preventDefault()

  try {
    this.xslt.source(this.el.xml.value, this.el.type.value == 'HTML').stylesheet(this.el.xsl.value)
  } catch(err) {
    return pubsub('error', err.message)
  }

  this.el.output.value = this.xslt.transform()
  pubsub('success', 'Transform successful')
}

module.exports = Fiddle
