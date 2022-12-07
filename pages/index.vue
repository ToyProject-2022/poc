<template>
  <div class="wrapper">
    <div class="poc-card">
      <h1>POC TOY PROJECT - 2022 빌드테스트</h1>
      <div class="link-wrap">
        <span><nuxt-link to="auth/login">로그인</nuxt-link></span>
        <span><nuxt-link to="auth/join">회원가입</nuxt-link></span>
      </div>
      <br/>
      <br/>
      <poc-input
        v-model="id"
        type="text"
        label="아이디"
        placeholder="아이디"
        required
      />
      <br/>
      <poc-input
        v-model="password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호"
        required
      />
      <div class="button-wrap">
        <poc-button>로그인</poc-button>
      </div>
    </div>
    <div class="poc-card" style="margin-top: 16px">
      <div class="link-wrap">
        {{ test }}
      </div>
      <poc-button @click="handleClickApiTest">API TEST</poc-button>
    </div>
  </div>
</template>

<script>
import PocInput from '@/components/input'
import PocButton from '@/components/button'

export default {
  name: 'IndexPage',
  components: {PocButton, PocInput},
  layouts: 'IndexLayout',
  data() {
    return {
      id: '',
      password: '',
      test: '',
    }
  },
  methods: {
    handleClickApiTest() {
      fetch('http://13.124.73.181:8081/api/test').then((res) => {
        // eslint-disable-next-line no-console
        console.log('apiTest Success :: ', res)
        this.test = res.json()
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('apiTest error :: ', error)
        this.test = 'error'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  background-color: #272e4e;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.poc-card {
  min-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
}

.button-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
</style>
