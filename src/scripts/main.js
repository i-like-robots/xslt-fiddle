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
    el.getAttribute('data-component').split(' ').forEach(function(component) {
      components[component] && new components[component](el)
    })
  })

})()
