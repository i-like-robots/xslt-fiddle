var pubsub = require('../actions/pubsub')

function Notice(type, message) {
  this.el = document.createElement('p')
  this.el.classList.add('Notice', 'Notice--' + type)
  this.el.innerHTML = message
}

Notice.prototype.appendTo = function(target) {
  target.appendChild(this.el)
  return this
}

Notice.prototype.remove = function() {
  this.el.parentNode.removeChild(this.el)
  return this
}

function Notifications(target) {
  this.target = target
  this.stack = []

  pubsub('error', this.error.bind(this))
  pubsub('warning', this.warning.bind(this))
  pubsub('success', this.success.bind(this))
}

Notifications.prototype.add = function(type, message) {
  var notice = this.stack.push(new Notice(type, message).appendTo(this.target))
  setTimeout(this.remove.bind(this, this.stack[notice - 1]), 5000)
}

Notifications.prototype.error = function(message) {
  this.add('error', message)
}

Notifications.prototype.warning = function(message) {
  this.add('warning', message)
}

Notifications.prototype.success = function(message) {
  this.add('success', message)
}

Notifications.prototype.remove = function(notice) {
  this.stack.splice(this.stack.indexOf(notice), 1)[0].remove()
}

module.exports = Notifications
