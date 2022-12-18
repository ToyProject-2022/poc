<template>
  <div class="easy-container">
    <header class="header">
      <div>
        <poc-button color="gray" type="icon">
          <svg-icon icon-class="dice" style="font-size: 20px" />
        </poc-button>
        <poc-button color="gray" type="icon">
          <svg-icon icon-class="reset" style="font-size: 20px" />
        </poc-button>
        <poc-button color="gray" type="icon">
          <svg-icon icon-class="arrow-left" style="font-size: 20px" />
        </poc-button>
      </div>
      <div>
        <poc-button color="gray" type="icon">
          <svg-icon icon-class="arrow-right" style="font-size: 20px" />
        </poc-button>
      </div>
    </header>

    <div class="canvas-wrap">
      <poc-canvas v-if="false" :color="colors" />
      <!--    <client-only>-->
      <!--      <chrome-picker :value="colors" class="colorPicker" @input="updateValue" />-->
      <!--    </client-only>-->
    </div>
    <Tabs @handleChange="getListSearch">
      <div class="default-color">
        <div v-for="color in default_colors" :key="color">
          <span :style="{ 'background-color': color }" @click="handleChangeColor(color)"></span>
        </div>
        <div>랜덤</div>
      </div>
      <template v-for="item in tabs">
        <Tab :key="item.itemCategoryId" :name="item.name" :selected="item.selected">
          <div v-for="face in item_list" :key="face.itemID">
            <div>
              <img :src="face.fileUrl" :alt="face.itemCatrgory" />
            </div>
          </div>
        </Tab>
      </template>
    </Tabs>
  </div>
</template>

<script>
import PocCanvas from '@/components/easy/canvas'
import Tabs from '@/components/easy/tab/tabs'
import Tab from '@/components/easy/tab/tab'
import SvgIcon from '@/components/svgIcon'
import PocButton from '@/components/button'
export default {
  name: 'FrontEasy',
  components: { PocButton, SvgIcon, PocCanvas, Tabs, Tab },
  layout: 'front',
  data() {
    return {
      colors: '#194d33',
      default_colors: ['#ffffff', '#fff6f4', '#feeae3', '#f8cec3', '#d9b5a8', '#bd9f97'],
      face_list: null,
      item_list: '',
      tabs: [],
      default_tab_id: 1,
      search_filter: {
        size: 10,
        page: 1,
      },
      itemCategoryId: 1,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    handleChangeColor(color) {
      this.colors = color
    },
    getList() {
      this.$_axios
        .$get('/poc/v1/item-category')
        .then((response) => {
          this.tabs = response.filter((item) => {
            if (item.name === '얼굴') {
              item.selected = true
            }
            this.getListSearch(item)
            return item.parentItemCategoryId === null
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getListSearch(selectedTab) {
      if (selectedTab) {
        this.tabs.forEach((obj) => {
          if (selectedTab.name === obj.name) {
            this.itemCategoryId = obj.itemCategoryId
          }
        })
      }
      this.$_axios
        .$get('/poc/v1/item', {
          params: { itemCategoryId: this.itemCategoryId, page: 1, size: 20 },
        })
        .then((response) => {
          this.item_list = response.contents
          // console.log('111', this.item_list)
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>
<style lang="scss">
.canvas-wrap {
  position: absolute;
  padding-bottom: 360px;
  width: 100%;
  background-color: #9b9b9b;
}
.tabs {
  position: absolute;
  top: 360px;
  left: 0;
  right: 0;
}
.tabs-details {
  height: calc(100vh - 400px);
  overflow: scroll;
  position: relative;
  top: 400px;
}
.default-color {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  overflow-x: auto;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    width: 20px;
    height: 20px;
    display: inline-flex;
    border-radius: 100%;
    border: 1px solid #ddd;
  }
}
</style>
