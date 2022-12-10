<template>
  <div>
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ 'is-active': tab.is_active }"
        @click="selectTab(tab)"
      >
        {{ tab.name }}
      </div>
    </div>
    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PocTabs',
  data: () => {
    return {
      tabs: [],
    }
  },
  created() {
    console.log('children', this.$children)
    this.tabs = this.$children
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.is_active = tab.name === selectedTab.name
      })
    },
  },
}
</script>

<style lang="scss">
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  overflow-x: auto;
  background-color: #fff;
  .tab-item {
    position: relative;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #ccc;
    transition: all ease 0.2s;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 2px;
      background-color: #ccc;
    }

    &.is-active {
      color: cornflowerblue;

      &::before {
        background-color: cornflowerblue;
      }
    }
  }
}
.tabs-details {
  padding: 10px;
}
</style>
