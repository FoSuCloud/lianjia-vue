<template>
  <div class="main-layout">
    <Sidebar></Sidebar>
    <div class="main-layout__content">
      <Header></Header>
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/SideBar.vue";
import Header from "@/components/header/Header.vue";
export default {
  name: "MainLayout",
  components: {
    Sidebar,
    Header
  }
};
</script>

<style lang="scss">
.main-layout {
  width: 100%;
  height: 100%;
  display: flex;
  .main-layout__content{
    flex: 1;
  }
}
</style>
