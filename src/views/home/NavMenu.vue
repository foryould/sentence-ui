<template>
  <div class="nav-menu">
    <el-menu class="el-menu-vertical-demo">
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
import { Menu, MenuItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'NavMenu',
  components: { ElMenu: Menu, ElMenuItem: MenuItem },
  data() {
    return {
      menuItems: [
        { id: 1, name: '诗词', index: '1', icon: '&#xeb8e;' },
        { id: 2, name: '朝代', index: '2', icon: '&#xe6bc;' },
      ],
    }
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
