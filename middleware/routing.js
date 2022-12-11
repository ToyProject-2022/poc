export default ({ app, route, store, redirect }) => {
  console.log('middleware @@ routing.js', route, store, redirect)
  console.log(route.path.includes('/admin'))
  if (route.path.includes('/admin')) {
    console.log(app)
  }
}
