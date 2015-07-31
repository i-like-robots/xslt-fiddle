var cutTheMustard = require('./actions/cut-the-mustard')

void (function() {

  if (!cutTheMustard()) {
    return
  }

  var components = (function(lib, modules) {
    modules.forEach(function(module) {
        lib[module] = require('./components/' + module.toLowerCase())
    })

    return lib
  })({}, ['Fiddle', 'Example', 'Notifications', 'Autocomplete'])

  Array.prototype.forEach.call(document.querySelectorAll('[data-component]'), function(el) {
    new components[el.getAttribute('data-component')](el)
  })

})()
