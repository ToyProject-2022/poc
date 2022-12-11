import Cookies from 'js-cookie'

export default ({ app, store, route, redirect }, inject) => {
  inject('_cookie', {
    _get(key) {
      return Cookies.get(key) ? Cookies.get(key) : null
    },
    _getObject(key) {
      return Cookies.get(key) ? JSON.parse(Cookies.get(key)) : null
    },
    _set(key, str) {
      Cookies.set(key, str)
    },
    _setObject(key, obj) {
      Cookies.set(key, JSON.stringify(obj))
    },
    _setOption(key, str, opt) {
      Cookies.set(key, str, opt)
    },
    _setObjectOption(key, obj, opt) {
      Cookies.set(key, JSON.stringify(obj), opt)
    },
    _remove(key) {
      Cookies.remove(key)
    },
  })
}
