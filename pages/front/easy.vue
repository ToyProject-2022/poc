<template>
  <div class="easy-container">
    <poc-canvas />

    <client-only>
      <chrome-picker :value="colors" class="colorPicker" @input="updateValue" />
    </client-only>
    <Tabs>
      <div class="default-color">
        <div v-for="color in default_colors" :key="color">
          <span :style="{ 'background-color': color }"></span>
        </div>
        <div>랜덤</div>
      </div>
      <template v-for="item in tabs">
        <Tab :key="item.type" :name="item.label" :selected="item.selected">
          <p class="tab-ani">
            {{ item.value }}
          </p>
        </Tab>
      </template>
    </Tabs>
  </div>
</template>

<script>
import PocCanvas from '@/components/easy/canvas'
import Tabs from '@/components/easy/tab/tabs'
import Tab from '@/components/easy/tab/tab'
export default {
  name: 'FrontEasy',
  components: { PocCanvas, Tabs, Tab },
  layout: 'front',
  data() {
    return {
      colors: '#194d33',
      default_colors: [
        '#ffffff',
        '#fff6f4',
        '#feeae3',
        '#f8cec3',
        '#d9b5a8',
        '#bd9f97',
      ],
      tabs: [
        {
          type: 'FACE',
          value: 'face',
          label: '얼굴',
          selected: true,
        },
        {
          type: 'HEIR',
          value: 'heir',
          label: '헤어',
          selected: false,
        },
        {
          type: 'TOP',
          value: 'top',
          label: '상의',
          selected: false,
        },
        {
          type: 'ITEM',
          value: 'item',
          label: '아이템',
          selected: false,
        },
        {
          type: 'BACKGROUND',
          value: 'background',
          label: '배경',
          selected: false,
        },
      ],
    }
  },
  methods: {
    updateValue(val) {
      // console.log(val)
    },
    setSelected() {},
  },
}
</script>
<style lang="scss">
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
