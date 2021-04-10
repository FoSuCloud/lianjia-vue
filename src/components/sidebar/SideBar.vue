<template>
  <div class="lianjia-sidebar">
    <img
      :src="require('../../../public/logo.png')"
      class="lianjia-sidebar__logo"
    />
    <el-menu
      v-if="routes.length"
      :default-active="$route.parentPath || $route.path"
      class="el-menu-vertical-demo"
      router
      unique-opened
    >
      <el-submenu
        v-for="(item, index) in routes"
        :key="index"
        :index="item.path"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </template>
        <div v-for="(sub, sIndex) in item.children" :key="sIndex">
          <el-menu-item
            v-if="!sub.hiddenSidebar && (!sub.Admin || viewUser)"
            :index="sub.path"
            >{{ sub.name }}</el-menu-item
          >
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      routes: [],
      viewUser: false // 是否可以查看用户界面
    };
  },
  created() {
    this.routes = this.$router.options.routes.filter(item => item.permission);
    if (this.$store.state.role === 2) {
      this.viewUser = true;
    }
  }
};
</script>

<style lang="scss">
.lianjia-sidebar {
  height: 100%;
  width: 160px;
  border-right: 1px solid rgba(220, 220, 220, 0.5);
  .lianjia-sidebar__logo {
    width: 100px;
    height: 60px;
    margin: 20px auto;
  }
  .el-menu {
    height: calc(100% - 100px);
    border: none;
    .el-menu-item {
      min-width: 0;
    }
  }
}
</style>
