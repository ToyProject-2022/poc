<template>
  <div class="wrapper">
    <h1>POC TOY PROJECT - 2022</h1>
    <div class="button-wrap">
      <span><nuxt-link to="auth/login">로그인</nuxt-link></span>
      <spa><nuxt-link to="auth/join">회원가입</nuxt-link></spa>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layouts: 'IndexLayout',
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  background-color: antiquewhite;
}
</style>
