<template>
  <div class="data">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="city" label="城市" :render-header="renderCity">
        <template v-slot="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column prop="dist" label="区域" width="180"> </el-table-column>
      <el-table-column prop="bizcircle_name" label="商圈"> </el-table-column>
      <el-table-column prop="rent_price_listing" label="房租"></el-table-column>
      <el-table-column prop="layout" label="类型"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { RequestConstant } from "@/api/RequestConstant.js";
import ListPopover from "@/components/list-popover/ListPopover";
export default {
  name: "Data",
  data() {
    return {
      tableData: [],
      cityList: [
        { name: "深圳", key: "sz" },
        { name: "北京", key: "bj" },
        { name: "上海", key: "sh" },
        { name: "广州", key: "gz" },
      ],
    };
  },
  components: {
    ListPopover,
  },
  created() {
    this.$axios
      .get(RequestConstant.List, { params: { city: "sz", page: 1, size: 20 } })
      .then((response) => {
        this.tableData = response.data.records;
      });
  },
  methods: {
    renderCity(h) {
      return (
        <ListPopover
          list={this.cityList}
          vOn:clickPopover={this.clickPopover}
        ></ListPopover>
      );
    },
    clickPopover(key) {
      console.log(key);
    },
  },
};
</script>

<style lang="scss"></style>
