<template>
  <div>
    <el-container>
      <!-- header -->
      <el-header>
        <el-menu mode="horizaontal">
          <el-menu-item index="0">
            <img src="/logo.png" alt />
          </el-menu-item>
          <el-menu-item>
            <nuxt-link to="/"></nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="userInfo.id">
            <a to="/">退出</a>
          </el-menu-item>
          <el-menu-item v-if="userInfo.id">
            <a to="/">{{userInfo.nickname}}</a>
          </el-menu-item>
          <el-menu-item v-if="userInfo.id">
            <nuxt-link to="/editor/new">写文章</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="!userInfo.id">
            <nuxt-link to="/editor">注册</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="!userInfo.id">
            <nuxt-link to="/editor">登录</nuxt-link>
          </el-menu-item>
        </el-menu>
      </el-header>
      <!-- body -->
      <el-main>
        <nuxt />
      </el-main>
      <!-- footer -->
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getUserInfo();
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getUserInfo() {
      const token = localStorage.getItem('token')
      if (token) {
        this.$store.dispatch('usr/detail')
      }
    }
  }
};
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
