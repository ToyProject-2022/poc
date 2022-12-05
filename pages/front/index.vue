<template>
  <div class="front-container">
    <ValidationProvider v-slot="{ errors }" rules="required">
      <poc-input v-model="test" label="TEST" type="text" />
      <span class="valid-message">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
import PocInput from '@/components/input'
export default {
  name: 'FrontIndex',
  components: { PocInput },
  layout: 'front',
  data() {
    return {
      test: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.front-container {
  padding: 40px;
}
.valid-message {
  display: inline;
  color: brown;
  position: absolute;
  margin-top: 6px;
}
</style>
