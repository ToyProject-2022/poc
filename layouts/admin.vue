<template>
  <div v-if="is_first_loading" class="app">
    {{ is_first_loading }}
    <nuxt />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AdminLayouts',
  computed: {
    ...mapGetters({
      is_first_loading: 'app/first_loading',
    }),
  },
  async mounted() {
    console.log('mounted')
    await this.$_auth._init()
    await this.setFirstLoading(true)
  },
  methods: {
    ...mapActions({
      setFirstLoading: 'app/setFirstLoading',
    }),
  },
}
</script>
