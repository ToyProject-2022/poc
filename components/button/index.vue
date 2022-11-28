<template>
  <button
    type="button"
    class="button"
    :class="[color, { disabled: disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'PocButton',
  props: {
    disabled: {
      type: Boolean,
    },
    color: { type: String, default: 'primary' },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>
<style lang="scss">
.button {
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
  &.primary {
    background-color: #6174c3;
    color: #ffffff;
    border: 1px solid #6174c3;
  }
  &:hover {
    background-color: #4f64bc;
  }
  &:active {
    background-color: #374682;
  }
}
</style>
