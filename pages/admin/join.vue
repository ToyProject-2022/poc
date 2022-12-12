<template>
  <div class="admin-container">
    <el-card class="width-500">
      <el-row>
        <el-col>
          <nuxt-link to="login"><i class="el-icon-arrow-left" />뒤로가기</nuxt-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <h1 class="font-size-32">POC Admin 회원가입</h1>
        </el-col>
        <el-col>
          <el-form ref="form" :model="form" @submit.native.prevent>
            <el-form-item
              prop="email"
              label="이메일"
              :rules="{
                validator: validateEmail,
                required: true,
                trigger: 'submit',
              }"
            >
              <el-input
                v-model="form.email"
                type="text"
                label="이메일"
                placeholder="이메일"
                required
              />
            </el-form-item>
            <el-form-item
              prop="password"
              label="비밀번호"
              :rules="{
                validator: validatePassword,
                required: true,
                trigger: 'submit',
              }"
            >
              <el-input
                v-model="form.password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호"
                show-password
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" justify="end">
        <el-button type="primary" @click="handleSubmit">회원가입</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { validEmail, validPassword } from '@/utils/validate'

export default {
  name: 'AdminIndex',
  meta: {
    is_none_auth: true,
  },
  layout: 'admin',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    validateEmail(rule, value, callback) {
      if (validEmail(value)) {
        callback(new Error('이메일을 정확히 입력해 주세요'))
      } else {
        callback()
      }
    },
    validatePassword(rule, value, callback) {
      const check = validPassword(value)
      if (check) {
        callback(new Error(check))
      } else {
        callback()
      }
    },
    validateCheck() {
      let validResult = false
      this.$refs.form.validate((valid) => {
        validResult = valid
      })
      return validResult
    },
    async handleSubmit() {
      if (this.validateCheck()) {
        const result = await this.$_axios.$post('/poc/v1/member/', this.form)
        if (result) {
          console.log(result)
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.admin-container {
  height: 100vh;
  background-color: #272e4e;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
