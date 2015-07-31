var parseXML = require('../actions/parse-xml')
var formatXML = require('../actions/format-xml')

var processor = new XSLTProcessor
var serializer = new XMLSerializer

function XSLT() {
  this.sourceTree = null
  this.stylesheetTree = null
}

XSLT.prototype.source = function(input, html) {
  this.sourceTree = parseXML.apply(null, arguments)

  if (this.sourceTree instanceof Error) {
    throw new Error('Failed to parse the XML source')
  }

  return this
}

XSLT.prototype.stylesheet = function(input) {
  this.stylesheetTree = parseXML.apply(null, arguments)

  if (this.sourceTree instanceof Error) {
    throw new Error('Failed to parse the stylesheet')
  }

  return this
}

XSLT.prototype.transform = function() {
  var fragment = document.implementation.createDocument('', '', null)

  processor.reset()
  processor.importStylesheet(this.stylesheetTree)

  var result = processor.transformToFragment(this.sourceTree, fragment)

  return formatXML(serializer.serializeToString(result))
}

module.exports = XSLT
