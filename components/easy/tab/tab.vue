<template>
  <div v-show="is_active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PocTab',
  props: {
    name: { required: true },
    selected: { default: false },
  },
  // transition: "faker",
  data: () => {
    return {
      is_active: false,
    }
  },
  mounted() {
    this.is_active = this.selected
  },
}
</script>

<style></style>
