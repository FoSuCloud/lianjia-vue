<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  min-height: 640px;
  min-width: 1080px;
}
</style>
