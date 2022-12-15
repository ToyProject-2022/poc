<template>
  <el-container>
    <el-header class="flex x-between y-center bg-white">
      <el-input
        v-model="searchFilter.searchKeyword"
        class="width-300"
        placeholder="이름, 직무등을 검색하세요"
        clearable
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i
      ></el-input>
      <template v-if="!editMode">
        <el-button type="default" @click="handleToggleEditMode">편집</el-button>
      </template>
      <template v-else>
        <div>
          <el-button type="default" @click="handleToggleEditMode">취소</el-button>
          <el-button type="danger">삭제</el-button>
          <el-button type="primary">다운로드</el-button>
        </div>
      </template>
    </el-header>
    <el-main>
      <div class="flex y-start x-start flex-wrap">
        <el-card
          v-for="item in list"
          :key="item.itemId"
          :body-style="{ padding: '0px', width: '260px', height: '260px' }"
          class="mg-x-8 mg-y-8 text-center item"
          :class="[{ 'is-selected': selectedItem.includes(item.itemId) }]"
          @click.native="handleClickEditModeCard(item.itemId)"
        >
          <el-image class="width-260 height-260" :src="item.fileUrl" fit="fit"></el-image>
          <div v-if="!editMode" class="hover-area">
            <div class="pd-x-8 pd-y-8 width-260 text-area">
              {{ item.originName }}
            </div>
            <div class="button-area mg-t-16">
              <el-button icon="el-icon-download" type="primary" circle />
              <el-button icon="el-icon-delete" type="danger" circle />
            </div>
          </div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'PagesAdminIndexArchive',
  data() {
    return {
      editMode: false,
      list: [],
      totalCount: 0,
      selectedItem: [],
      searchFilter: {
        itemCategory: '',
        size: 10,
        page: 1,
        searchKeyword: '',
      },
      categoryOptions: [
        { id: 0, type: '', value: '전체' },
        { id: 1, type: 'FACE', value: '얼굴' },
        { id: 2, type: 'HAIR', value: '머리' },
        { id: 3, type: 'TOP', value: '상의' },
        { id: 4, type: 'ITEM', value: '아이템' },
      ],
    }
  },
  created() {
    this.getListSearch()
  },
  methods: {
    getListSearch() {
      this.searchFilter.page = 1
      this.getList()
    },
    async getList() {
      // TODO. archive getList api 필요
      const result = await this.$_axios.$get('/poc/v1/item', {
        params: this.searchFilter,
      })
      if (result) {
        const { contents, totalCount } = result
        this.list = contents
        this.totalCount = totalCount
      } else {
        this.list = []
        this.totalCount = 0
      }
    },
    handleToggleEditMode() {
      if (this.selectedItem.length > 0) {
        this.$confirm('편집을 위해 선택된 아이템이 있습니다. 초기화 하시겠습니까?', '편집 취소', {
          confirmButtonText: '초기화',
          cancelButtonText: '취소',
          type: 'warning',
        })
          .then(() => {
            this.selectedItem = []
            this.editMode = false
          })
          .catch(() => {})
      } else {
        this.editMode = !this.editMode
      }
    },
    handleClickEditModeCard(itemId) {
      if (this.editMode) {
        if (this.selectedItem.includes(itemId)) {
          this.selectedItem = this.selectedItem.filter((item) => {
            return item !== itemId
          })
        } else {
          this.selectedItem.push(itemId)
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.page-container {
  width: calc(100vw - 200px);
}

.bg-white {
  background-color: #fff;
}

.item {
  position: relative;
  border-width: 4px;
  border-color: transparent;

  &.is-selected {
    border-style: solid;
    border-color: #5ec3b9;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #5ec3b9;
      opacity: 0.4;
      z-index: 10;
    }
  }

  &-add {
    position: relative;
    transition: all 0.2s;
    font-weight: bold;
    color: #e3e3e3;
    cursor: pointer;
    background-color: transparent;
    border-style: dashed;
    border-color: #fff;
    border-radius: 8px;

    &:hover {
      color: #97a6e7;
      border-color: #97a6e7;
    }
  }

  .hover-area {
    visibility: hidden;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    transition: visibility 0.25s;

    .text-area,
    .button-area {
      z-index: 2;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: black;
      opacity: 0.8;
      z-index: 1;
    }
  }

  &:hover {
    .hover-area {
      visibility: visible;
    }
  }
}

.gray {
  color: #e3e3e3;
}
</style>
