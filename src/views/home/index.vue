<template>
  <div class="home">
    <div class="body-header"></div>
    <div class="body">
      <div class="nav">
        <!-- <div class="header-logo">
          <div>诗词歌赋</div>
        </div> -->
        <nav-menu />
      </div>
      <div class="content tab-container"></div>
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
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  background: #eee;
  overflow: hidden;
  .nav {
    height: 100%;
  }
}

.body {
  display: flex;
  flex: 1;
  height: 100%;
}

.body-header {
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0px 0px 14px #d7ccc8;
}

.content {
  flex: 1;
}
</style>
