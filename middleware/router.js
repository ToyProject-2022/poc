export default (context) => {
  if (process.client) {
    console.log(context.store.getters['auth/member'].memberId)
    if (
      context.route.path.includes('/admin') &&
      !context.route.path.includes('/admin/auth') &&
      !context.store.getters['auth/member'].memberId
    ) {
      context.redirect('/admin/auth/login')
    }
  }
}
