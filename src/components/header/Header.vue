<template>
  <div class="lianjia-header">
    <el-popover
      placement="top-start"
      trigger="hover"
      popper-class="lianjia-header__popover"
    >
      <div class="popover__logout" @click="toUserCenter">注销</div>
      <i slot="reference" class="el-icon-user lianjia-header__icon"></i>
    </el-popover>
  </div>
</template>

<script>
import { RouterConstant } from "@/router/RouterConstant";
export default {
  name: "Header",
  methods: {
    toUserCenter() {
      document.cookie = "token=;";
      this.$router.push(RouterConstant.LOGIN);
    }
  }
};
</script>

<style lang="scss">
.lianjia-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  background: #e4fbff;
  .lianjia-header__icon {
    width: 24px;
    font-size: 18px;
  }
}
.lianjia-header__popover {
  min-width: 40px !important;
  .popover__logout {
    cursor: pointer;
  }
}
</style>
