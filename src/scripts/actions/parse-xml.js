var domParser = new DOMParser

module.exports = function parseXML(input, html) {
  var type = html ? 'text/html' : 'text/xml'
  var output = domParser.parseFromString(input, type)

  if (output.querySelector('parsererror')) {
    return new Error('Could not parse ' + type + ' input')
  }

  return output
}
