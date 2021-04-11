<template class="siderbar">
  <div class="lianjia-sidebar">
    <img
      :src="require('../../../public/logo.png')"
      class="lianjia-sidebar__logo"
    /> 
    <!-- 菜单 -->
    <el-menu
      v-if="routes.length"
      :default-active="$route.parentPath || $route.path"
      class="el-menu-vertical-demo"
      router
      unique-opened
    >
    <!-- 子菜单 -->
      <el-submenu
        v-for="(item, index) in routes"
        :key="index"
        :index="item.path"
      >
      <!-- 标题 -->
        <template slot="title" class="title">
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </template>
        <!--  -->
        <div v-for="(sub, sIndex) in item.children" :key="sIndex">
          <!-- 子标题 -->
          <el-menu-item
            v-if="!sub.hiddenSidebar && (!sub.Admin || viewUser)"
            :index="sub.path"
          >
          {{ sub.name }}
          </el-menu-item>
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
  background-color: rgba(168, 213, 243, 0.5);
  height: 100%;
  width: 180px;
  border-right: 1px solid rgba(220, 220, 220, 0.5);
  .lianjia-sidebar__logo {
    width: 100px;
    height: 60px;
    margin: 20px auto;
  }
  .el-menu {  
    background-color: rgba(168, 213, 243, 0.5);
    height: calc(100% - 100px);
    border: none;
    span{
      font-size: 20px;
     
     }
      .el-menu-item {
      min-width: 0;
     
      font-size: 16px;
      }
  }

  
  
}


</style>
