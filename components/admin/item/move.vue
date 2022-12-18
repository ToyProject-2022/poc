<template>
  <el-dialog
    :top="top"
    :title="`${title} 일괄 이동`"
    :visible="visible"
    width="432px"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" @submit.native.prevent>
      <el-form-item
        prop="itemCategoryId"
        label="카테고리"
        :rules="{
          required: true,
          trigger: 'submit',
        }"
      >
        <el-select v-model="form.itemCategoryId" class="width-full">
          <el-option
            v-for="category in categoryOptions"
            :key="category.itemCategoryId"
            :label="category.name"
            :value="category.itemCategoryId"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="handleClose">취소</el-button>
      <el-button type="primary" @click="handleSubmit">이동</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ComponentAdminItemMove',
  props: {
    itemCategoryId: {
      type: [String, Number],
      default: '',
    },
    selectedItem: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '432px',
    },
    top: {
      type: String,
      default: '20vh',
    },
  },
  data() {
    return {
      form: {
        itemCategoryId: '',
      },
      categoryOptions: [],
    }
  },
  watch: {
    async visible(val) {
      if (val) {
        await this.getCategory()
        this.form.itemCategoryId = this.itemCategoryId
      } else {
        await this.resetData()
      }
    },
  },
  methods: {
    resetData() {
      this.form.itemCategoryId = ''
    },
    async getCategory() {
      const result = await this.$_axios.$get('/poc/v1/item-category')
      if (result) {
        this.categoryOptions = result
      }
    },
    handleClose(reset) {
      this.$emit('handleClose', reset === true)
    },
    async handleSubmit() {
      const result = await this.$_axios.$put('/poc/v1/item', {
        itemCategoryId: this.form.itemCategoryId,
        itemIdList: this.selectedItem,
      })
      if (result) {
        this.$message.closeAll()
        this.$message({
          showClose: true,
          message: `아이템 수정이 완료되었습니다`,
          type: 'success',
          duration: 3000,
        })
        this.handleClose(true)
      } else {
        this.$message.closeAll()
        this.$message({
          showClose: true,
          message: `아이템 수정에 실패하였습니다`,
          type: 'error',
          duration: 3000,
        })
      }
    },
  },
}
</script>
