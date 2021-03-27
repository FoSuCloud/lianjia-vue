<template>
  <div class="lianjia-sidebar">
    <img
      :src="require('../../../public/logo.png')"
      class="lianjia-sidebar__logo"
      @click="toData"
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
          <el-menu-item v-if="!sub.hiddenSidebar" :index="sub.path">{{
            sub.name
          }}</el-menu-item>
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
    };
  },
  created() {
    this.routes = this.$router.options.routes.filter((item) => item.permission);
  },
  methods:{
    toData(){
      this.$router.push('/data')
    }
  }
};
</script>

<style lang="scss">
.lianjia-sidebar {
  height: 100%;
  width: 160px;
  .lianjia-sidebar__logo {
    width: 100px;
    height: 60px;
    margin: 20px auto;
  }
  .el-menu {
    height: calc(100% - 100px);
  }
}
</style>
