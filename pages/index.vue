<template>
  <div class="wrapper">
    <div class="poc-card">
      <h1 class="font-size-32">POC TOY PROJECT - 2022 빌드테스트</h1>
      <div class="link-wrap">
        <poc-button @click="pageMove('admin')"> admin </poc-button>
        <poc-button color="gray" class="mg-l-6" @click="pageMove('front/easy')"> front </poc-button>
      </div>
    </div>
    <div ref="test" class="test mg-y-8">
      <img src="~assets/eye.png" alt="1" style="position: absolute; z-index: 20; top: 0; left: 0" />
      <img
        src="~assets/face.png"
        alt="2"
        style="position: absolute; z-index: 10; top: 0; left: 0"
      />
      <img
        src="~assets/mouse.png"
        alt="2"
        style="position: absolute; z-index: 20; top: 0; left: 0"
      />
      <img
        src="~assets/nose.png"
        alt="2"
        style="position: absolute; z-index: 20; top: 0; left: 0"
      />
    </div>
    <div class="poc-card" style="margin-top: 16px">
      <div class="link-wrap">
        {{ test }}
      </div>
      <div>
        {{ $dayjs() }}
      </div>
      <poc-button @click="handleClickApiTest">API TEST</poc-button>
      <poc-button @click="handleClickExportImage">CANVAS TEST</poc-button>
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
      this.$_axios
        .$get('/api/test')
        .then((res) => {
          console.log('apiTest Success :: ', res)
          this.test = this.$_copy(res)
        })
        .catch((error) => {
          console.error('apiTest error :: ', error)
          this.test = 'error'
        })
    },
    handleClickExportImage() {
      this.$_canvas._exportElementToImage('png', 'test', this.$refs.test)
    },
  },
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

.button-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
.test {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  > img {
    width: 100%;
    height: auto;
  }
}
</style>
