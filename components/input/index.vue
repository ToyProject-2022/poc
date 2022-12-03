<template>
  <div class="input-wrap">
    <input
      ref="input"
      class="input"
      v-bind="$attrs"
      required
      @input="$emit('input', $event.target.value)"
    />
    <label class="label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'PocInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
    input_type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.input-wrap {
  position: relative;
  padding: 24px 0 0;
  width: 100%;
}

.input {
  position: relative;
  z-index: 2;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 16px;
  color: #333;
  padding: 8px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .label {
    font-size: 16px;
    cursor: text;
    top: 20px;
  }
}

.label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 14px;
  color: #9b9b9b;
  z-index: 1;
}

.input:focus {
  ~ .label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    color: #4f64bc;
    font-weight: 700;
  }
  font-weight: 700;
  border-width: 2px;
  border-image: linear-gradient(to right, #4f64bc, #a7afcf);
  border-image-slice: 1;
}
</style>
