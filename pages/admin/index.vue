<template>
  <div class="admin-container">
    <el-container class="width-full height-full">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="default_active_value">
          <el-menu-item
            v-for="menu in menus"
            :key="menu.id"
            :index="menu.id"
            @click="handleClickItem(menu)"
          >
            <i :class="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </el-menu-item>
          <el-menu-item @click="handleClickLogout">
            <i class="el-icon-user"></i>
            <span>Logout</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <nuxt-child />
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'PagesAdminIndex',
  layout: 'admin',
  data() {
    return {
      default_active_value: '0',
      menus: [
        { id: '0', title: 'Item', path: '/admin/item', icon: 'el-icon-picture-outline' },
        { id: '1', title: 'Archive', path: '/admin/archive', icon: 'el-icon-camera' },
      ],
    }
  },
  // mounted() {
  //   const paths = this.$route.path.split('/')
  //   const last_path = paths[paths.length - 1]
  //   if (last_path !== 'admin') {
  //     const menu = this.menus.filter((menu) => {
  //       return menu.title.toLowerCase() === paths[paths.length - 1].toLowerCase()
  //     })
  //     this.default_active_value = menu[0].id
  //     this.handleClickItem(menu[0])
  //   } else {
  //     this.default_active_value = this.menus[0].id
  //     this.handleClickItem(this.menus[0])
  //   }
  // },
  methods: {
    handleClickItem(item) {
      this.$router.push(item.path)
    },
    handleClickLogout() {
      this.$confirm('로그아웃 하시겠습니까?', 'Logout', {
        confirmButtonText: '로그아웃',
        cancelButtonText: '취소',
        type: 'info',
      })
        .then(() => {
          this.$message.closeAll()
          this.$message({
            showClose: true,
            message: '로그아웃 되었습니다.',
            type: 'success',
            duration: 3000,
          })
          this.$_auth._logout()
        })
        .catch(() => {})
    },
  },
}
</script>
<style lang="scss" scoped>
.admin-container {
  height: 100vh;
  background-color: #272e4e;
}
</style>
