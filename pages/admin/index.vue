<template>
  <div class="admin-container">
    <div class="poc-card">
      <h1 class="font-size-32">POC TOY PROJECT - 2022</h1>
      <div class="link-wrap">
        <span><nuxt-link to="auth/join">회원가입</nuxt-link></span>
      </div>
      <br />
      <br />
      <poc-input
        v-model="id"
        type="text"
        label="아이디"
        placeholder="아이디"
        required
      />
      <br />
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
  </div>
</template>

<script>
import PocInput from '@/components/input'
import PocButton from '@/components/button'

export default {
  name: 'AdminIndex',
  components: { PocButton, PocInput },
  layout: 'admin',
  data() {
    return {
      id: '',
      password: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.admin-container {
  height: 100vh;
  background-color: #272e4e;
  padding: 40px;
  display: flex;
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
