<template>
  <div class="lianjia-header">
     <i class="el-icon-user lianjia-header__icon" @click="toUserCenter"></i>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{
      toUserCenter(){
          this.$router.push('/visualize/gz')
      }
  }
};
</script>

<style lang="scss">
.lianjia-header{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 40px;
    background: #e4fbff;
    .lianjia-header__icon{
        width: 24px;
        font-size: 18px;
    }
}
</style>
