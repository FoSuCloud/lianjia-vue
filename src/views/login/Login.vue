<template>
  <div>
    <button @click="toRoute">登陆</button>
  </div>
</template>

<script>
import { RouterConstant } from "@/router/RouterConstant";

export default {
  name: "Login",
  methods: {
    toRoute() {
      this.$router.push(RouterConstant.HOME);
    }
  }
};
</script>

<style scoped></style>
