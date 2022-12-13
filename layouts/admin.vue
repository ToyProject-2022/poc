<template>
  <div v-if="is_first_loading" class="admin">
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
  mounted() {
    this.$nextTick(() => {
      this.$_auth._init()
    })
  },
  methods: {
    ...mapActions({
      setFirstLoading: 'app/setFirstLoading',
    }),
  },
}
</script>
<style lang="scss">
.admin {
  min-width: 768px;
  * {
    box-sizing: border-box;
  }
}
</style>
