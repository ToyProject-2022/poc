<template>
  <button
    type="button"
    class="button"
    :class="[color, { disabled: disabled }, type]"
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
    type: {
      type: String,
      default: 'primary',
    },
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
  &.gray {
    background-color: white;
    color: #333;
    border: 1px solid grey;
  }

  &:hover {
    opacity: 0.6;
  }

  &.icon {
    padding: 0;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  //&:active {
  //  background-color: #374682;
  //}
}
</style>
