<template>
  <div class="data">
    <el-table @filter-change="filterTag" :data="tableData" style="width: 100%">
      <el-table-column
        prop="city"
        label="标签"
        :filters="cityList"
        filter-placement="bottom-end"
      >
      </el-table-column>
      <el-table-column prop="dist" label="区域"> </el-table-column>
      <el-table-column prop="bizcircle_name" label="商圈"> </el-table-column>
      <el-table-column prop="rent_price_listing" label="房租"></el-table-column>
      <el-table-column prop="layout" label="类型"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="currentPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { RequestConstant } from "@/api/RequestConstant.js";
export default {
  name: "Data",
  data() {
    return {
      tableData: [],
      cityList: [
        { text: "深圳", value: "sz" },
        { text: "北京", value: "bj" },
        { text: "上海", value: "sh" },
        { text: "广州", value: "gz" }
      ],
      currentPage: 1,
      currentPageSize: 20,
      total: 0,
      filterCity: "sz"
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    filterTag(value) {
      this.filterCity = value[Object.keys(value)[0]].join(",");
      this.getList();
    },
    getList() {
      let model = {
        page: this.currentPage,
        size: this.currentPageSize
      };
      if (this.filterCity) {
        model.city = this.filterCity;
      }
      this.$axios
        .get(RequestConstant.LIST, {
          params: model
        })
        .then(response => {
          this.tableData = response.data.records;
          this.total = response.data.total;
        });
    }
  }
};
</script>

<style lang="scss">
.data {
  .el-table {
    position: static;
    height: calc(100% - 40px);
    .el-table__body-wrapper {
      height: calc(100% - 51px);
      overflow: auto;
    }
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
