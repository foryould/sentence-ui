<template>
  <div class="nav-menu">
    <el-menu class="el-menu-vertical-demo" router :default-active="activeIndex">
      <el-menu-item
        v-for="item in menuItems"
        :key="item.id"
        :index="item.index"
      >
        <i class="iconfont" style="font-size: 20px" v-html="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'NavMenu',
  components: {},
  data() {
    return {
      menuItems: [
        { id: 1, name: '诗词', index: '/', icon: '&#xeb8e;' },
        { id: 2, name: '朝代', index: '/dynasty', icon: '&#xe6bc;' },
      ],
    }
  },
  computed: {
    activeIndex() {
      return this.$route.path
    },
  },
}
</script>
<style lang="scss">
.nav-menu {
  width: 240px;
  height: 100%;
}

.el-menu-vertical-demo {
  height: 100%;
}
</style>
