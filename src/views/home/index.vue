<template>
  <div class="home">
    <div class="body-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><a href="javascript:;">文本处理</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>
          <a href="javascript:;">句子</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ breadName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="body">
      <div class="nav">
        <nav-menu />
      </div>
      <div class="content tab-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'
export default {
  name: 'HomePage',
  components: { NavMenu },
  data() {
    return {}
  },
  computed: {
    breadName() {
      return this.$route.name
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  background: #eee;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  .nav {
    height: 100%;
    padding-top: 10px;
  }
}

.body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.body-header {
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0px 0px 14px #d7ccc8;
}

.content {
  flex: 1;
  overflow: hidden;
  padding: 10px 0px 0px 10px;
}

.body-header {
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}
</style>
