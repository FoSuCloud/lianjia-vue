<template>
  <div class="list-popover-container">
    <el-popover placement="bottom" trigger="click" popper-class="list-popover">
      <div>
        <div
          v-for="item in list"
          :key="item.key"
          @click="clickPopover(item.key)"
        >
          {{ item.name }}
        </div>
      </div>
      <div slot="reference">城市</div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "ListPopover",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickPopover(key) {
      this.$emit("clickPopover", key);
    }
  }
};
</script>

<style lang="scss"></style>
