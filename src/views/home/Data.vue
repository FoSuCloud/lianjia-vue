<template>
  <div class="data">
    <div class="data-content">
      <el-card class="data-card">
        <div>
          <p class="data-p">城市:</p>
          <el-dropdown placement="bottom">
            <el-button type="primary" class="data-button">
              请选择城市<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="data-dropdown" slot="dropdown">
              <el-dropdown-item
                @click.native="filterTag(item.value)"
                v-for="item in cityList"
                :key="item.value"
              >
                {{ item.text }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p class="data-p">区域:</p>
          <el-dropdown placement="bottom">
            <el-button type="primary" class="data-button">
              请选择区域<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu
              v-if="zone.length"
              class="data-dropdown"
              slot="dropdown"
            >
              <el-dropdown-item
                @click.native="handleZone(item.name)"
                v-for="(item, index) in zone"
                :key="index"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
            <el-dropdown-menu v-else slot="dropdown">
              <el-dropdown-item>请先选择城市</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button class="data-button" type="primary" @click="getList"
            >搜索</el-button
          >
          <el-button class="data-button" @click="clear">重置</el-button>
        </div>
        <el-table
          @sort-change="sortChange"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column prop="city" label="城市"> </el-table-column>
          <el-table-column prop="dist" label="区域"> </el-table-column>
          <el-table-column prop="bizcircle_name" label="商圈">
          </el-table-column>
          <el-table-column
            prop="rent_price_listing"
            sortable="custom"
            label="房租"
          ></el-table-column>
          <el-table-column prop="layout" label="类型"></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="currentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </div>
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
      currentPageSize: 10,
      total: 0,
      filterCity: "sz",
      zone: [],
      filterZone: "",
      order: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    clear() {
      this.currentPage = 1;
      this.currentPageSize = 10;
      this.filterCity = "";
      this.filterZone = "";
    },
    sortChange(column) {
      this.order = column.order;
      this.getList();
    },
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.getList();
    },
    handleZone(val) {
      if (this.filterCity !== "sz") {
        val = val
          .split("")
          .slice(0, val.length - 1)
          .join("");
      }
      this.filterZone = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    filterTag(value) {
      this.filterCity = value;
      this.filterZone = "";
      this.getZone();
    },
    /**
     * 获取区域
     * */
    getZone() {
      this.$axios
        .get(RequestConstant.CITY_ZONE, {
          params: {
            city: this.filterCity
          }
        })
        .then(res => {
          this.zone = res.data;
        });
    },
    getList() {
      let model = {
        page: this.currentPage,
        size: this.currentPageSize
      };
      if (this.filterCity) {
        model.city = this.filterCity;
      }
      if (this.filterZone) {
        model.zone = this.filterZone;
      }
      if (this.order) {
        model.order = this.order;
      }
      this.$axios
        .get(RequestConstant.LIST, {
          params: model
        })
        .then(response => {
          this.tableData = response.data.list;
          this.total = response.data.total;
        });
    }
  }
};
</script>

<style lang="scss">
.data {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: calc(100% - 180px);
  background: rgba(220, 220, 220, 0.3);
  padding: 20px;
  .data-content {
    height: 100%;
    // background: white;
    .data-card {
      margin: 10px 10px 10px 10px;
      .data-p {
        margin-left: 10px;
        display: inline-block;
        font-size: 20px;
      }
      .data-button {
        font-size: 16px;
        margin: 0 20px;
      }
    }
    .el-table {
      position: static;
      height: calc(100% - 40px);
      font-size: 20px !important;
      .el-table__body-wrapper {
        height: calc(100% - 51px);
        overflow: auto;
      }
    }
    .el-pagination {
      text-align: right;
      // height: 60px;
      // font-size: 16px !important;
    }
  }
}

.data-dropdown.el-dropdown-menu {
  width: 133px !important;
  text-align: center;
}
</style>
