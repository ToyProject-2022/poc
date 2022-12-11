export default ({ app, store, route, redirect }, inject) => {
  inject('_auth', {
    async _init() {
      if (await this._checkAuth()) {
        console.log('checkin')
      }
    },
    async _login() {},
    async _checkAuth() {
      const expires = await app.$_cookie._get('expires')
      console.log(expires)
    },
  })
}
