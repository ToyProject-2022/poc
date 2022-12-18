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
      <ul class="category-area flex x-start y-center">
        <li
          v-for="item in categoryTabMenus"
          :key="item.itemCategoryId"
          class="category-item flex x-start y-center"
          :class="[{ 'is-active': selectedTabId === item.itemCategoryId }]"
          @click="handleClickTabItem(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="contents-area">
        <ul class="color-list flex x-start y-center">
          <li
            v-for="item in colorList"
            :key="item.itemCategoryDefaultColorId"
            class="color-item"
            :class="[{ 'is-active': selectedColorId === item.itemCategoryDefaultColorId }]"
            :style="[{ backgroundColor: `#${item.color}` }]"
            @click="handleClickColorItem(item)"
          ></li>
        </ul>
        <div class="item-list"></div>
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
    return {
      categoryTabMenus: [],
      selectedTabId: 0,
      colorList: [],
      selectedColorId: 0,
      itemList: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.getCategory()
      await this.getColorList(this.categoryTabMenus[0].itemCategoryId)
      await this.handleClickTabItem(this.categoryTabMenus[0])
    },
    async getCategory() {
      const result = await this.$_axios.$get('/poc/v1/item-category')
      const tabMenus = result.filter((item) => item.parentItemCategoryId === null)
      if (result) {
        this.categoryTabMenus = [...tabMenus, { itemCategoryId: -1, name: '배경' }]
      }
    },
    async getColorList(itemCategoryId) {
      const result = await this.$_axios.$get(
        `/poc/v1/item-category-default-color/${itemCategoryId}`,
      )
      if (result) {
        this.colorList = [...result, { itemCategoryDefaultColorId: -1, color: null }]
      }
    },
    async handleClickTabItem(item) {
      this.selectedTabId = item.itemCategoryId
      if (item.itemCategoryId > 0) {
        await this.getColorList(item.itemCategoryId)
        await this.handleClickColorItem(this.colorList[0])
      } else {
        console.log('1')
      }
    },
    handleClickColorItem(item) {
      console.log('### :: ', item)
      this.selectedColorId = item.itemCategoryDefaultColorId
      if (item.itemCategoryDefaultColorId > 0) {
        console.log('1')
      } else {
        console.log('2')
      }
    },
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
    width: 100%;
    height: 40%;
    .category {
      &-area {
        box-sizing: border-box;
        position: relative;
        overflow-x: auto;
        background-color: #fff;
        transition: all ease 0.2s;
        border-top: 1px solid #ccc;
      }
      &-item {
        position: relative;
        height: 40px;
        padding: 0 20px;
        white-space: nowrap;
        font-weight: 500;
        color: #808080;

        &.is-active {
          color: #6787ff;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 3px;
            background-color: #6787ff;
            z-index: 1;
          }
        }
      }
    }

    .contents-area {
      position: relative;
      padding: 8px 8px;
      overflow-x: auto;
      border-top: 3px solid #ccc;
      border-bottom: 1px solid #ccc;
      .color-item {
        flex-shrink: 0;
        border: 1px solid #ccc;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin: 0 8px;

        &.is-active {
          border-color: #6787ff;
        }
      }
    }
  }
}
</style>
