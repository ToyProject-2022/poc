<template>
  <div class="wrapper">
    <h1>POC TOY PROJECT - 2022</h1>
    <div class="button-wrap">
      <span><nuxt-link to="auth/login">로그인</nuxt-link></span>
      <span><nuxt-link to="auth/join">회원가입</nuxt-link></span>
    </div>
    <poc-input v-model="test" type="text" label="아이디" placeholder="아이디" />
  </div>
</template>

<script>
import PocInput from '@/components/input'
export default {
  name: 'IndexPage',
  components: { PocInput },
  layouts: 'IndexLayout',
  data() {
    return {
      input: '',
      test: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  background-color: #f0f4f7;
  padding: 40px;
}
</style>
