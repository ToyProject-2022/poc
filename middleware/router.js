export default (context) => {
  if (process.client) {
    if (
      !context.route.path.includes('/admin/auth') &&
      !context.store.getters['auth/member'].memberId
    ) {
      context.redirect('/admin/auth/login')
    }
  }
}
