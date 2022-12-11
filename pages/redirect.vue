<script>
export default {
  name: 'PageRedirect',
  created() {
    const { path } = this.$route.params
    if (path) {
      this.$router.replace('/' + path)
    } else {
      this.$router.replace('/')
    }
  },
  render(h) {
    return h() // avoid warning message
  },
}
</script>
