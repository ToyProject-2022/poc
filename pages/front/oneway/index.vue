<template>
  <section class="oneway-container">
    <header class="header-area flex x-between y-center pd-x-16">
      <div class="left-area flex x-start y-center">
        <poc-button type="icon" color="gray">
          <svg-icon icon-class="dice" style="font-size: 20px" />
        </poc-button>
        <poc-button type="icon" color="gray" class="mg-l-8">
          <svg-icon icon-class="reset" style="font-size: 20px" />
        </poc-button>
      </div>
      <div class="right-area flex x-start y-center">
        <poc-button type="icon" color="gray">
          <svg-icon icon-class="arrow-right" style="font-size: 20px" />
        </poc-button>
      </div>
    </header>
    <div class="preview-area flex y-center">
      <div class="preview"></div>
    </div>
    <article class="combiner-area">
      <ul class="category-area">
        <li class="category-item">얼굴</li>
        <li class="category-item">헤어</li>
        <li class="category-item">상의</li>
        <li class="category-item">아이탬</li>
        <li class="category-item">배경</li>
      </ul>
      <div class="contents-area">
        <div class="contents-color"></div>
        <div class="contents-item"></div>
      </div>
    </article>
  </section>
</template>

<script>
import PocButton from '@/components/button/index.vue'

export default {
  name: 'FrontOneway',
  components: { PocButton },
  layout: 'front',
  data() {
    return {}
  },
}
</script>
<style scoped lang="scss">
.oneway-container {
  position: relative;
  max-width: 768px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header-area {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: calc(32px + 40px);
  }
  .preview-area {
    width: 100%;
    height: calc(100vh - 40%);
    .preview {
      width: min(100vw, 100%);
      height: min(100vw, 100%);
      background: #97a6e7;
    }
  }
  .combiner-area {
    background-color: gray;
    width: 100%;
    height: 40%;
  }
}
</style>
