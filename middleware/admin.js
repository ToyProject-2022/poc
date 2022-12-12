export default async ({ app, route, store, redirect }) => {
  if (process.client && route.path.includes('/admin')) {
    // console.log('middleware @@ admin.js', route, store, redirect)
    console.log('middleware @@ admin.js 1 :: ', route.path)
    const auth = await app.$_auth._checkAuth()
    console.log('middleware @@ auth :: ', auth)
    const member = store.getters['auth/member']
    console.log('middleware @@ member :: ', member)

    if (member.expires === 0) {
      console.log(1)
      const is_none_auth = route.meta[0]?.is_none_auth
      if (!is_none_auth) {
        await app.$_auth._logout()
      }
    } else if (member.expires > 0 && member.expires < app.$dayjs().valueOf()) {
      console.log(2)
      await app.$_auth._logout()
    } else if (route.path === '/admin/login' || route.path === '/admin/join') {
      console.log(3)
      await redirect('/admin')
    }
  }
}
