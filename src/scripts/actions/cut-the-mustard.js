module.exports = function cutTheMustard() {

  var requirements = [
    {
      title: 'the selectors API',
      test: document.querySelector
    },
    {
      title: 'DOM level 2 events',
      test: window.addEventListener
    },
    {
      title: 'the web storage API',
      test: window.localStorage
    },
    {
      title: 'DOM parsing and serialization APIs',
      test: window.XMLSerializer
    },
    {
      title: 'XSL Transformations',
      test: window.XSLTProcessor
    },
    {
      title: 'ES5 array extras',
      test: Array.isArray
    }
  ]

  var i, len

  for (i = 0, len = requirements.length; i < len; i++) {
    if (!requirements[i].test) {
      alert('Your browser does not support ' + requirements[i].title + ' so this application is unable to run.')
      return false
    }
  }

  return true
}