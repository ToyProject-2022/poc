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
      <div class="preview" :style="[{ backgroundColor: `${selectedColorHex}` }]">
        <img
          v-for="item in selectedItemList"
          :key="item.itemId"
          :src="item.fileUrl"
          :alt="item.originName"
          :style="[{ zIndex: item.zIndex }]"
        />
      </div>
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
        <ul class="item-list">
          <li
            v-for="item in itemList"
            :key="item.itemId"
            class="item"
            :class="[{ 'is-active': selectedItemId === item.itemId }]"
            @click="handleClickItem(item)"
          >
            <img :src="item.fileUrl" :alt="item.originName" />
          </li>
        </ul>
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
      selectedColorHex: '#fff',
      itemList: [],
      selectedItemId: 0,
      selectedItemList: [],
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
    async getItemList() {
      const result = await this.$_axios.$get(`/poc/v1/item`, {
        params: {
          itemCategoryId: this.selectedTabId,
          page: 1,
          size: 10,
        },
      })
      if (result && result.contents && result.contents.length > 0) {
        this.itemList = [...result.contents]
      } else {
        this.itemList = []
      }
    },
    async handleClickTabItem(item) {
      this.selectedTabId = item.itemCategoryId
      if (item.itemCategoryId > 0) {
        await this.getColorList(item.itemCategoryId)
        await this.handleClickColorItem(this.colorList[0])
        await this.getItemList()
      } else {
        console.log('1')
      }
    },
    handleClickColorItem(item) {
      console.log('### :: ', item)
      this.selectedColorId = item.itemCategoryDefaultColorId
      this.selectedColorHex = `#${item.color}`
      if (item.itemCategoryDefaultColorId > 0) {
        console.log('1')
      } else {
        console.log('2')
      }
    },
    handleClickItem(item) {
      this.selectedItemId = item.itemId
      this.selectedItemList.push(item)
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
      position: relative;
      width: min(100vw, 100%);
      height: min(100vw, 100%);
      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
      }
    }
  }

  .combiner-area {
    width: 100%;
    height: calc(100vh - 60%);

    .category {
      &-area {
        box-sizing: border-box;
        position: relative;
        overflow: auto hidden;
        background-color: #fff;
        transition: all ease 0.2s;
        border-top: 1px solid #ccc;
        height: 40px;
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
      height: calc(100% - 40px);

      .color {
        &-list {
          height: 48px;
          padding: 8px 8px;
          border-top: 3px solid #ccc;
          border-bottom: 1px solid #ccc;
          overflow: auto hidden;
        }

        &-item {
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

      .item-list {
        height: calc(100% - 48px);
        padding: 8px;
        overflow-y: auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 84px;
        justify-items: center;

        .item {
          width: 70px;
          height: 70px;
          flex-shrink: 0;
          border: 1px solid #ccc;
          border-radius: 10px;
          margin: 8px;
          overflow: hidden;
          background-color: #ececec;

          &.is-active {
            border-color: #6787ff;
          }

          > img {
            object-fit: fill;
            width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }
}
</style>
