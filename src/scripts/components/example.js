var pubsub = require('../actions/pubsub')

var exampleXML = [
  '<hello-world>',
  '  <greeter>an XSLT Programmer</greeter>',
  '  <greeting>Hello, World!</greeting>',
  '</hello-world>'
]

var exampleXSL = [
  '<?xml version="1.0"?>',
  '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">',
  '  <xsl:template match="//hello-world">',
  '    <h1><xsl:value-of select="greeting" /></h1>',
  '    <xsl:apply-templates select="greeter" />',
  '  </xsl:template>',
  '  <xsl:template match="greeter">',
  '    <p>from <em><xsl:value-of select="." /></em></p>',
  '  </xsl:template>',
  '</xsl:stylesheet>'
]

function Example(target) {
  this.el = {
    xml: document.querySelector(target.getAttribute('data-element-xml')),
    xsl: document.querySelector(target.getAttribute('data-element-xsl'))
  }

  target.onclick = this.onClick.bind(this)
}

Example.prototype.onClick = function() {
  var prefill = this.el.xml.value || this.el.xsl.value

  if (prefill && !confirm('Are you sure?')) {
      return
  }

  prefill && pubsub('warning', 'Previous code overwritten')

  this.el.xml.value = exampleXML.join('\n')
  this.el.xsl.value = exampleXSL.join('\n')
}

module.exports = Example
