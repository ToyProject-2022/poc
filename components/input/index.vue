<template>
  <div class="input-wrap">
    <input
      ref="input"
      class="input"
      v-bind="$attrs"
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
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;
.input-wrap {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
}

.input {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1.3rem;
  color: #333;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}

.label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
}

.input:focus {
  ~ .label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}
/* reset input */
.input {
  &:required,
  &:invalid {
    box-shadow: none;
  }
}
/* demo */
//
//.input {
//  .label {
//    display: block;
//    font-size: 16px;
//    font-weight: bold;
//    margin-bottom: 8px;
//  }
//  .input {
//    display: block;
//    width: 100%;
//    color: #333;
//    outline: transparent;
//    border-radius: 5px;
//    background-color: #fff;
//    border: transparent;
//    font-size: 14px;
//    box-sizing: border-box;
//    overflow: hidden;
//  }
//}
</style>
