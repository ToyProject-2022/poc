<template>
  <div>
    <!--    <canvas ref="canvas" width="360" height="360" class="canvas" />-->
    <img
      ref="face"
      :src="face"
      alt="1"
      style="position: absolute; max-width: 360px; height: 360px; margin: 0 auto; z-index: 1"
    />

    <img
      ref="top"
      :src="top"
      alt="3"
      style="position: absolute; max-width: 360px; height: 360px; margin: 0 auto; z-index: 2"
    />
    <img
      ref="hair"
      :src="hair"
      alt="3"
      style="position: absolute; max-width: 360px; height: 360px; margin: 0 auto; z-index: 3"
    />
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
    face: {
      type: String,
      default:
        'https://springboot-webservice-poc.s3.ap-northeast-2.amazonaws.com/poc/8d8fa539-479e-465a-8dcf-9056d0816bab-face_type_1.svg',
    },
    top: {
      type: String,
      default:
        'https://springboot-webservice-poc.s3.ap-northeast-2.amazonaws.com/poc/393a79b0-ba5c-4166-9765-9050ea8003e5-clothes_type_1.svg',
    },
    hair: {
      type: String,
      default:
        'https://springboot-webservice-poc.s3.ap-northeast-2.amazonaws.com/poc/70739720-2306-408e-a857-3a00b6aa95b7-fhair_type_1.svg',
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
      // this.$refs.canvas.style.background = this.color
      this.$refs.face.src = this.face
      this.$refs.top.src = this.top
      this.$refs.hair.src = this.hair
    },
  },
}
</script>
