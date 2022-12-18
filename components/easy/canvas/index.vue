<template>
  <div>
    <canvas ref="canvas" width="360" height="360" class="canvas" />
  </div>
</template>

<script>
export default {
  name: 'PocCanvas',
  props: {
    color: {
      type: String,
      default: '',
    },
  },
  watch: {
    color() {
      this.draw(this.color)
    },
  },
  mounted() {
    this.draw(this.color)
  },
  methods: {
    draw() {
      this.$refs.canvas.style.background = this.color
    },
  },
}
</script>
