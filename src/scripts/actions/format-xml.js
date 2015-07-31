// Adapted from <https://github.com/vkiryukhin/pretty-data>

function createShiftArray(depth) {
  var shift = ['\n']
  var indent = '  '
  var i

  for (i = 0; i < depth; i++) {
    shift.push(shift[i] + indent)
  }

  return shift
}

function createSourceArray(text) {
  return text.replace(/>\s{0,}</g, '><')
    .replace(/</g, '~::~<')
    .replace(/xmlns\:/g, '~::~xmlns:')
    .replace(/xmlns\=/g, '~::~xmlns=')
    .split('~::~')
}

module.exports = function formatXML(text) {
  var source = createSourceArray(text)
  var shift = createShiftArray(100)
  var inComment = false
  var result = ''
  var depth = 0
  var i, len

  for (i = 0, len = source.length; i < len; i++) {

    // start comment or <![CDATA[...]]> or <!DOCTYPE
    if (source[i].search(/<!/) > -1) {
      result += shift[depth] + source[i]
      inComment = true

      // end comment  or <![CDATA[...]]>
      if (source[i].search(/-->/) > -1 || source[i].search(/\]>/) > -1 || source[i].search(/!DOCTYPE/) > -1) {
        inComment = false
      }

      continue
    }

    // end comment  or <![CDATA[...]]>
    if (source[i].search(/-->/) > -1 || source[i].search(/\]>/) > -1) {
      result += source[i]
      inComment = false
      continue
    }

    // <elm></elm>
    if (/^<\w/.exec(source[i - 1]) && /^<\/\w/.exec(source[i]) &&
      /^<[\w:\-\.\,]+/.exec(source[i - 1]) == /^<\/[\w:\-\.\,]+/.exec(source[i])[0].replace('/', '')) {
      result += source[i]

      if (!inComment) {
        depth--
      }

      continue
    }

    // <elm>
    if (source[i].search(/<\w/) > -1 && source[i].search(/<\//) == -1 && source[i].search(/\/>/) == -1) {
      result = !inComment ? result += shift[depth++] + source[i] : result += source[i]
      continue
    }

    // <elm>...</elm>
    if (source[i].search(/<\w/) > -1 && source[i].search(/<\//) > -1) {
      result = !inComment ? result += shift[depth] + source[i] : result += source[i]
      continue
    }

    // </elm>
    if (source[i].search(/<\//) > -1) {
      result = !inComment ? result += shift[--depth] + source[i] : result += source[i]
      continue
    }

    // <elm/>
    if (source[i].search(/\/>/) > -1) {
      result = !inComment ? result += shift[depth] + source[i] : result += source[i]
      continue
    }

    // <? xml ... ?>
    if (source[i].search(/<\?/) > -1) {
      result += shift[depth] + source[i]
      continue
    }

    // xmlns
    if (source[i].search(/xmlns\:/) > -1 || source[i].search(/xmlns\=/) > -1) {
      result += shift[depth] + source[i]
      continue
    }

    result += source[i]
  }

  return result[0] == '\n' ? result.slice(1) : result
}
