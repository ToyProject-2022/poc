<template>
  <div class="admin-container">로그인 완료</div>
</template>

<script>
export default {
  name: 'AdminIndex',
  layout: 'admin',
  data() {
    return {
      id: '',
      password: '',
    }
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

.poc-card {
  min-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
}

.button-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
</style>
