<template>
  <div v-if="is_active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PocTab',
  props: {
    name: { type: String, required: true },
    selected: { type: Boolean, default: false },
  },
  data: () => {
    return {
      is_active: false,
    }
  },
  mounted() {
    this.is_active = this.selected
  },
  methods: {},
}
</script>

<style></style>
