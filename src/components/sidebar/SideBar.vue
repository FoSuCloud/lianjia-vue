<template>
  <div class="lianjia-sidebar">
    <div class="lianjia-sidebar__logo">
      <i class="iconfont iconlogo"></i>
      <p class="logo__title">数据可视化</p>
    </div>
    <el-menu
      v-if="routes.length"
      class="el-menu-vertical-demo"
      router
      unique-opened
    >
      <div v-for="(item, index) in routes" :key="index">
        <el-submenu v-if="!item.hiddenSub" :index="item.path">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.name }}</span>
          </template>
          <div v-for="sub in item.children" :key="sub.path">
            <el-menu-item
              v-if="!sub.hiddenSidebar && (!sub.Admin || viewUser)"
              :index="sub.path"
              >{{ sub.name }}</el-menu-item
            >
          </div>
        </el-submenu>
        <el-menu-item
          class="root-menu-item"
          v-else
          :key="item.path"
          :index="item.path"
        >
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
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
  width: 200px;
  border-right: 1px solid rgba(220, 220, 220, 0.5);
  color: white;
  .lianjia-sidebar__logo {
    height: 60px;
    padding: 20px;
    text-align: center;
    background: #131e6b;
    .iconfont {
      font-size: 40px;
    }
    .logo__title {
      margin-top: 10px;
      font-size: 20px;
    }
  }
  .el-menu {
    height: calc(100% - 100px);
    background: #131e6b;
    border: none;
    .el-submenu__title {
      &:hover,
      &:focus {
        background: #131e6b;
      }
      span {
        color: white;
      }
    }
    span {
      font-size: 18px;
    }
    .el-menu-item {
      min-width: 0;
      padding-left: 49px !important;
      font-size: 16px !important;
      color: white;
      opacity: 0.7;
      &.is-active,
      &:hover,
      &:focus {
        opacity: 1;
        background: #0835cd;
      }
      &.root-menu-item {
        padding-left: 20px !important;
      }
    }
  }
}
</style>
