<template>
  <div>
    <canvas ref="canvas" width="200" height="200" class="canvas" />
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
<style scoped>
.canvas {
  border: 1px solid #000;
}
</style>
