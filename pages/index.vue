<template>
  <div class="wrapper">
    <div class="poc-card">
      <h1>POC TOY PROJECT - 2022 빌드테스트</h1>
      <h1 class="font-size-32">POC TOY PROJECT - 2022</h1>
      <div class="link-wrap">
        <!--        <span><nuxt-link to="admin">Admin</nuxt-link></span>-->
        <poc-button @click="pageMove('admin')"> admin </poc-button>
        <poc-button color="gray" class="mg-l-6" @click="pageMove('front/btte')">
          원경
        </poc-button>
        <poc-button
          color="gray"
          class="mg-l-6"
          @click="pageMove('front/oneway')"
        >
          도걸
        </poc-button>
        <poc-button color="gray" class="mg-l-6" @click="pageMove('front/easy')">
          지현
        </poc-button>
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
import PocButton from '@/components/button'

export default {
  name: 'IndexPage',
  components: { PocButton },
  layout: 'default',
  layouts: 'IndexLayout',
  data() {
    return {
      id: '',
      password: '',
      test: '',
    }
  },
  methods: {
    pageMove(path) {
      this.$router.push(path)
    },
    handleClickApiTest() {
      fetch('/v1/api/test').then((res) => {
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
  text-align: center;
}
.link-wrap {

.button-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
</style>
