<template>
  <el-container>
    <el-header class="flex x-end y-center bg-white">
      <template v-if="!editMode">
        <el-button key="btn_1" type="default" @click="handleToggleEditMode">편집</el-button>
        <el-button key="btn_2" type="primary" @click="handleOpenFormDialog({ title: '아이템' })"
          >추가</el-button
        >
      </template>
      <template v-else>
        <el-button key="btn_3" type="default" @click="handleToggleEditMode">취소</el-button>
        <el-button
          key="btn_4"
          type="danger"
          :disabled="selectedItem.length < 1"
          @click="handleClickDeleteItem"
          >삭제 ({{ selectedItem.length }})</el-button
        >
        <el-button key="btn_5" type="primary" :disabled="selectedItem.length < 1"
          >이동 ({{ selectedItem.length }})</el-button
        >
      </template>
      <el-select
        v-model="searchFilter.itemCategoryId"
        class="mg-l-10 width-300"
        :disabled="editMode"
        @change="getListSearch"
      >
        <el-option
          v-for="category in categoryOptions"
          :key="category.itemCategoryId"
          :label="`${category.name}`"
          :value="category.itemCategoryId"
        >
        </el-option>
      </el-select>
    </el-header>
    <el-main>
      <div class="flex y-start x-start flex-wrap">
        <button
          v-if="!editMode"
          class="mg-x-8 mg-y-8 width-268 height-268 text-center flex x-center y-center item-add"
          @click="handleOpenFormDialog({ title: '아이템' })"
        >
          <div class="flex x-center y-center height-260">
            <i class="el-icon-plus font-size-40"></i>
          </div>
        </button>
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
              <el-button
                icon="el-icon-edit-outline"
                type="primary"
                circle
                @click="handleOpenFormDialog({ title: '아이템', id: item.itemId })"
              />
              <el-button
                icon="el-icon-delete"
                type="danger"
                circle
                @click="handleClickDeleteItem([item.itemId])"
              />
            </div>
          </div>
        </el-card>
      </div>
    </el-main>
    <component-admin-item-insert
      :id="formDialog.id"
      :visible="formDialog.visible"
      :title="formDialog.title"
      @handleSubmit="handleSubmitFormDialog"
      @handleClose="handleCloseFormDialog"
    >
      <div></div>
    </component-admin-item-insert>
  </el-container>
</template>

<script>
import ComponentAdminItemInsert from '@/components/admin/item/form.vue'

export default {
  name: 'PagesAdminIndexItem',
  components: { ComponentAdminItemInsert },
  data() {
    return {
      editMode: false,
      list: [],
      totalCount: 0,
      selectedItem: [],
      searchFilter: {
        itemCategoryId: '',
        size: 10,
        page: 1,
      },
      categoryOptions: [],
      formDialog: {
        visible: false,
        id: 0,
        title: '',
      },
    }
  },
  created() {
    this.getListSearch()
    this.getCategory()
  },
  methods: {
    getListSearch(val) {
      this.searchFilter.page = 1
      this.getList()
    },
    async getCategory() {
      const result = await this.$_axios.$get('/poc/v1/item-category')
      if (result) {
        this.categoryOptions = [{ itemCategoryId: '', name: '전체' }, ...result]
      }
    },
    async getList() {
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
    handleOpenFormDialog({ title = '', id = 0 }) {
      this.formDialog.title = title
      this.formDialog.id = id
      this.formDialog.visible = true
    },
    handleSubmitFormDialog() {
      this.handleCloseFormDialog(true)
    },
    handleCloseFormDialog(reset) {
      this.formDialog.visible = false
      this.formDialog.title = ''
      if (reset) {
        this.getListSearch()
      }
    },
    handleClickDeleteItem(item = []) {
      this.$confirm(
        `${item.length > 0 ? '해당 아이템' : '선택된 아이템들'}을 삭제 하시겠습니까?`,
        '삭제',
        {
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
          type: 'error',
        },
      )
        .then(() => {
          if (item.length > 0) {
            // 아이템 삭제
          } else {
            // 멀티 아이템 삭제
          }
        })
        .catch(() => {})
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
