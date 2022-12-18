<template>
  <div class="easy-container">
    <div class="container">
      <header class="header">
        <div>
          <poc-button color="gray" type="icon">
            <svg-icon icon-class="arrow-left" style="font-size: 20px" />
          </poc-button>
        </div>
      </header>
      <div class="canvas-wrap"></div>
    </div>
    <div class="form-container">
      <ValidationObserver ref="validator">
        <form @submit.prevent="handleSubmit">
          <ValidationProvider ref="name" v-slot="{ errors }" rules="required|email">
            <poc-input v-model="form.name" label="이름" type="text" />
            <span class="valid-message">{{ errors[0] }}</span>
          </ValidationProvider>
          <br />
          <br />
          <ValidationProvider ref="name" v-slot="{ errors }" rules="required" class="mg-t-15">
            <poc-input v-model="form.team" label="소속팀" type="text" />
            <span class="valid-message">{{ errors[0] }}</span>
          </ValidationProvider>
          <br />
          <br />
          <ValidationProvider ref="duty" v-slot="{ errors }" rules="required">
            <poc-input v-model="form.duty" label="직무" type="text" />
            <span class="valid-message">{{ errors[0] }}</span>
          </ValidationProvider>
          <poc-button @click="handleSubmit">버툰</poc-button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import PocInput from '@/components/input'
import SvgIcon from '@/components/svgIcon'
import PocButton from '@/components/button'
export default {
  name: 'FrontIndex',
  components: { PocButton, SvgIcon, PocInput },
  layout: 'front',
  data() {
    return {
      test: '',
      form: {
        name: '',
        team: '',
        duty: '',
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {},
    handleSubmit() {
      const { validator } = this.$refs
      validator.validate().then((result) => {
        console.log(result)
        if (result.valid) {
          console.log('post api')
        } else {
          console.error('form invalid')
        }
      })
    },
  },
}
</script>
<style lang="scss"></style>
