// Adapted from <https://gist.github.com/gaohailang/5291190>

module.exports = (function(l, u, r, i) {
  return function(n, f) {
    r = l[n] = l[n] || [], i = -1
    if (f && f.call) {
      r.push(f)
    } else {
      while (r[++i]) {
        r[i].call(u, f)
      }
    }
  }
})({})
