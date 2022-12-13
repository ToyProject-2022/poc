export default ({ app, store, route, redirect }, inject) => {
  inject('_auth', {
    async _init() {
      if (!store.getters['app/first_loading']) {
        if (await this._checkAuth()) {
          await redirect('/admin')
        } else {
          await redirect('/admin/login')
        }
        await store.dispatch('app/setFirstLoading', true)
      }
    },
    async _login(email, password) {
      const result = await app.$_axios.$get('/poc/v1/member/login', {
        params: {
          email,
          password,
        },
      })
      if (result) {
        const expires_at = app.$dayjs().add(1, 'hour').valueOf()
        const member = { member_id: result.memberId, email: result.email, expires: expires_at }
        app.$_cookie._setObjectOption('_m', member, { expires: 1 / 24 })
        await store.dispatch('auth/setMember', member)
        await redirect('/admin')
        return true
      } else {
        app.$_cookie._remove('_m')
        await store.dispatch('auth/resetMember')
        return false
      }
    },
    async _logout() {
      app.$_cookie._remove('_m')
      await store.dispatch('auth/resetMember')
      redirect('/admin/login')
    },
    async _checkAuth() {
      const cookie_member = await app.$_cookie._getObject('_m')
      if (cookie_member && cookie_member.expires > app.$dayjs().valueOf()) {
        const member = { ...cookie_member }
        member.expires = app.$dayjs().add(1, 'hour').valueOf()
        app.$_cookie._setObjectOption('_m', member, { expires: 1 / 24 })
        await store.dispatch('auth/setMember', member)
        return true
      } else {
        app.$_cookie._remove('_m')
        await store.dispatch('auth/resetMember')
        return false
      }
    },
  })
}
