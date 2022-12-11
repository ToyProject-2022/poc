<template>
  <div class="app">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'AdminLayouts',
  mounted() {
    console.log(this)
    this.$_auth._init()
  },
  methods: {},
}
</script>
