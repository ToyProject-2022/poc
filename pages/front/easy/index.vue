<template>
  <div class="easy-container">
    <div class="container">
      <header class="header">
        <div>
          <template v-if="!is_next_step">
            <poc-button color="gray" type="icon" class="mg-r-8" @click="handleClickRandom">
              <svg-icon icon-class="dice" style="font-size: 20px" />
            </poc-button>
            <poc-button color="gray" type="icon" class="mg-r-8" @click="handleClickReset">
              <svg-icon icon-class="reset" style="font-size: 20px" />
            </poc-button>
          </template>
          <template v-else>
            <poc-button color="gray" type="icon" @click="nextPrev">
              <svg-icon icon-class="arrow-left" style="font-size: 20px" />
            </poc-button>
          </template>
        </div>
        <div v-if="!is_next_step">
          <poc-button color="gray" type="icon" @click="nextStep">
            <svg-icon icon-class="arrow-right" style="font-size: 20px" />
          </poc-button>
        </div>
      </header>

      <div class="canvas-wrap">
        <poc-canvas :color="colors" />
        <!--    <client-only>-->
        <!--      <chrome-picker :value="colors" class="colorPicker" @input="updateValue" />-->
        <!--    </client-only>-->
      </div>
    </div>
    <template v-if="!is_next_step">
      <Tabs @handleChange="getListSearch">
        <div class="default-color">
          <template v-for="color in default_colors">
            <span
              :key="color"
              :style="{ 'background-color': color }"
              @click="handleChangeColor(color)"
            ></span>
          </template>

          <span class="random" @click="handleClickRandom"></span>
        </div>
        <template v-for="item in tabs">
          <Tab
            :key="item.itemCategoryId"
            class="item-wrap"
            :name="item.name"
            :selected="item.selected"
          >
            <div v-for="face in item_list" :key="face.itemID">
              <div class="item-box" @click="handleClickItem(item)">
                <img :src="face.fileUrl" :alt="face.itemCatrgory" />
              </div>
            </div>
          </Tab>
        </template>
      </Tabs>
    </template>

    <template v-else>
      <div class="form-container">
        <ValidationObserver ref="validator">
          <form @submit.prevent="handleSubmit">
            <ValidationProvider ref="name" v-slot="{ errors }" rules="required|email">
              <poc-input v-model="form.name" label="이름" type="text" />
              <span class="valid-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <br />
            <br />
            <ValidationProvider ref="name" v-slot="{ errors }" rules="required" class="mg-t-15">
              <poc-input v-model="form.team" label="소속팀" type="text" />
              <span class="valid-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <br />
            <br />
            <ValidationProvider ref="duty" v-slot="{ errors }" rules="required">
              <poc-input v-model="form.duty" label="직무" type="text" />
              <span class="valid-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <poc-button @click="handleSubmit">버툰</poc-button>
          </form>
        </ValidationObserver>
      </div>
    </template>
  </div>
</template>

<script>
import PocCanvas from '@/components/easy/canvas'
import Tabs from '@/components/easy/tab/tabs'
import Tab from '@/components/easy/tab/tab'
import SvgIcon from '@/components/svgIcon'
import PocButton from '@/components/button'
import PocInput from '@/components/input'
export default {
  name: 'FrontIndex',
  components: { PocButton, SvgIcon, PocCanvas, Tabs, Tab, PocInput },
  layout: 'front',
  data() {
    return {
      is_next_step: false,
      colors: '#194d33',
      default_colors: ['#ffffff', '#fff6f4', '#feeae3', '#f8cec3', '#d9b5a8', '#bd9f97'],
      item_list: [],
      tabs: [],
      default_tab_id: 1,
      search_filter: {
        size: 10,
        page: 1,
      },
      form: {
        name: '',
        team: '',
        duty: '',
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
    nextPrev() {
      this.is_next_step = false
    },
    nextStep() {
      this.is_next_step = true
    },
    handleClickItem(item) {
      console.log(item)
    },
    handleSubmit() {
      const { validator } = this.$refs
      validator.validate().then((result) => {
        console.log(result)
        if (result.valid) {
          console.log('post api')
        } else {
          console.error('form invalid')
        }
      })
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
        })
        .catch((error) => {
          console.error(error)
        })
    },
    handleClickRandom() {
      alert('랜덤')
    },
    handleClickReset() {
      alert('초기화')
    },
  },
}
</script>
<style lang="scss">
.tabs {
  position: absolute;
  top: 360px;
  left: 0;
  right: 0;
}
.tabs-details {
  overflow: scroll;
  position: relative;
  top: 40px;
  height: calc(100vh - 400px);
}
</style>
