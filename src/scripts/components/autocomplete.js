var SELF_CLOSING = /\/$/
var PREVIOUS_TAG = /([^<]+\/?)$/
var TAG_NAME = /^([a-z-:]+)/i
var WHITESPACE_INDENT = /^(\s*)/
var CURRENT_LINE = /(^|[\n\r])(.+)$/

function insertClosingQuote(string, position, newChar) {
  var prevChar = this.prevCharacter(string, position)
  var nextChar = this.nextCharacter(string, position)

  if (newChar != prevChar && newChar != nextChar) {
    this.insertAfter(string, position, newChar)
  }
}

function insertClosingTag(string, position) {
  var prevTag = string.slice(0, position).match(PREVIOUS_TAG)

  if (prevTag && !SELF_CLOSING.test(prevTag[1])) {
    var tagName = prevTag[1].match(TAG_NAME)

    if (tagName) {
      this.insertAfter(string, position, '</' + tagName.pop() + '>')
    }
  }
}

function indentNewLine(string, position) {
  var nextChar = this.nextCharacter(string, position)
  var currentLine = string.slice(0, position).match(CURRENT_LINE)

  if (currentLine) {
    var indent = '\n' + currentLine.pop().match(WHITESPACE_INDENT).pop()

    if (nextChar == '<') {
      string = this.insert(string, position, indent)
    }

    this.insertBefore(string, position, indent)
  }
}

function insertTab(string, position) {
  this.insertBefore(string, position, '\t')
}

function Autocomplete(target) {
  this.el = target
  this.el.onkeypress = this.onKeypress.bind(this)
  this.el.onkeydown = this.onKeydown.bind(this)
}

Autocomplete.prototype.onKeypress = function(e) {
  var args = [ this.el.value, this.el.selectionStart, String.fromCharCode(e.charCode) ]

  switch (e.charCode) {
    case 34:
    case 39:
      insertClosingQuote.apply(this, args)
      break
    case 62:
      insertClosingTag.apply(this, args)
      break
  }
}

Autocomplete.prototype.onKeydown = function(e) {
  var args = [ this.el.value, this.el.selectionStart ]
  var preventDefault = true

  switch (e.keyCode) {
    case 13:
      indentNewLine.apply(this, args)
      break
    case 9:
      insertTab.apply(this, args)
      break
    default:
      preventDefault = false
  }

  preventDefault && e.preventDefault()
}

Autocomplete.prototype.prevCharacter = function(string, position) {
  return string.slice(position - 1, position)
}

Autocomplete.prototype.nextCharacter = function(string, position) {
  return string.slice(position, position + 1)
}

Autocomplete.prototype.insert = function(string, position, content) {
  return [string.slice(0, position), content, string.slice(position)].join('')
}

Autocomplete.prototype.insertBefore = function(string, position, content) {
  var caretPosition = position + content.length
  this.el.value = this.insert.apply(this, arguments)
  this.el.setSelectionRange(caretPosition, caretPosition)
}

Autocomplete.prototype.insertAfter = function(string, position, content) {
  this.el.value = this.insert.apply(this, arguments)
  this.el.setSelectionRange(position, position)
}

module.exports = Autocomplete
