<template>
  <el-dialog
    :top="top"
    :title="`${title} ${submitText}`"
    :visible="visible"
    width="432px"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :disabled="id > 0" @submit.native.prevent>
      <el-form-item
        prop="file"
        :rules="{
          // validator: validateEmail,
          required: true,
          trigger: 'submit',
        }"
      >
        <el-button
          class="drag-button width-full pd-x-32 pd-y-32"
          plain
          :disabled="id > 0"
          @drop.native.prevent="drop"
          @click.prevent="handleClickUploadFile"
        >
          <template v-if="!previewSrc">
            <i class="el-icon-picture font-size-40"></i>
            <p class="mg-y-0">drag & drop</p>
          </template>
          <template v-else>
            <img width="100px" height="100px" :src="previewSrc" alt="preview" />
            <p class="mg-y-0">{{ previewFileName }}</p>
          </template>
        </el-button>
      </el-form-item>
      <el-form-item
        prop="itemCategoryId"
        label="카테고리"
        :rules="{
          // validator: validateEmail,
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
      <el-button v-if="id < 1" type="primary" @click="handleSubmit">{{ submitText }}</el-button>
    </div>

    <input
      ref="file"
      type="file"
      style="display: none"
      accept="image/*"
      @change="handleFileUpload"
    />
  </el-dialog>
</template>

<script>
export default {
  name: 'ComponentAdminItemInsert',
  props: {
    id: {
      type: Number,
      default: 0,
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
        file: null,
        itemCategoryId: '',
      },
      categoryOptions: [],
      fileAccept: '.svg',
      previewSrc: '',
      previewFileName: '',
    }
  },
  computed: {
    submitText() {
      return this.id > 0 ? `수정` : '추가'
    },
  },
  watch: {
    async visible(val) {
      if (val) {
        await this.getCategory()
        if (this.id > 0) {
          await this.getDetail()
        }
      } else {
        await this.resetData()
      }
    },
  },
  methods: {
    resetData() {
      this.form.file = null
      this.form.name = ''
      this.form.itemCategoryId = ''
      this.previewSrc = ''
    },
    async getCategory() {
      const result = await this.$_axios.$get('/poc/v1/item-category')
      if (result) {
        this.categoryOptions = result
      }
    },
    async getDetail() {
      const result = await this.$_axios.$get(`/poc/v1/item/${this.id}`)
      if (result) {
        this.previewSrc = result.fileUrl
        this.form.itemCategoryId = result.itemCategoryId
      }
    },
    drop(event) {
      const dropped_file = event.dataTransfer.files
      if (dropped_file) {
        this.form.file = dropped_file
        this.handleOpenFileUpload()
      }
    },
    handleClickUploadFile() {
      this.handleOpenFileUpload()
    },
    handleOpenFileUpload() {
      this.$nextTick(() => {
        this.$refs.file.click()
      })
    },
    handleFileUpload() {
      let file = this.form.file
      if (this.$refs.file.files[0]) {
        file = this.$refs.file.files[0]
      }
      if (file) {
        this.setPreview(file)
        const isValidAccept = this.validUploadFileAccept(file)
        if (isValidAccept) {
          this.form.file = file
        } else {
          this.$message.closeAll()
          this.$message({
            showClose: true,
            message: `'${file.name}'의 파일 형식을 확인해주세요`,
            type: 'error',
            duration: 3000,
          })
          this.form.file = null
          this.$refs.file.value = ''
        }
      }
    },
    setPreview(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewSrc = e.target.result
      }
      reader.readAsDataURL(file)
      this.previewFileName = file.name
    },
    validUploadFileAccept(file) {
      if (this.fileAccept !== '*/*') {
        const str = file.name.split('.')
        const extension = `.${str[str.length - 1]}`

        if (!this.fileAccept.includes(extension)) {
          return false
        }
      }
      return true
    },
    handleClose(reset) {
      this.$emit('handleClose', reset === true)
    },
    async handleSubmit() {
      const fileAxios = this.$_axios
      fileAxios.setHeader('Content-Type', 'multipart/form-data', ['post'])
      const data = new FormData()
      data.append('itemCategoryId', this.form.itemCategoryId)
      data.append('file', this.form.file)
      const result = await fileAxios.$post('/poc/v1/item', data)
      if (result) {
        this.$message.closeAll()
        this.$message({
          showClose: true,
          message: `'${this.form.file.name}' ${this.title} ${this.submitText} 완료되었습니다`,
          type: 'error',
          duration: 3000,
        })
        this.handleClose(true)
      }
    },
  },
}
</script>
<style scoped lang="scss">
.test {
  background: black !important;
  padding: 30px !important;
}

.el-dialog__body {
  padding: 0 !important;
}
.drag-button {
  border: 1px dashed gray;

  &.is-hover {
    border-color: #e3e3e3;
  }
}
</style>
