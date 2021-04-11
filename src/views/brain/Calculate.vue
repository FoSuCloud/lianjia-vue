<template>
  <div class="calculate">
    <div class="calculate-select">
      <p class="calculate-select__title">信息选择</p>
      <div class="calculate-select__box">
        <div class="box__cell" v-for="(box, index) in boxList" :key="index">
          <p class="box-cell__title">{{ box.title }}：</p>
          <el-dropdown>
            <el-button type="primary">
              {{ box.dropdown.title
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu v-if="box.dropdown.list.length" slot="dropdown">
              <el-dropdown-item
                v-for="(item, dIndex) in box.dropdown.list"
                :key="dIndex"
                @click.native="dropdownClick(box.key, item)"
                ><div
                  class="el-dropdown__calculate"
                  :class="item.key === params[box.key] ? 'is-active' : ''"
                >
                  {{ item.label }}
                </div></el-dropdown-item
              >
            </el-dropdown-menu>
            <el-dropdown-menu slot="dropdown" v-else>
              <el-dropdown-item
                ><div class="el-dropdown__calculate">
                  请先选择城市
                </div></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="calculate-res">
      <p class="calculate-res__title">最低租金预测</p>
      <div class="calculate-res__content">
        {{ minPrice }}
      </div>
    </div>
    <div class="calculate-buttons">
      <el-button @click="clear">重置</el-button>
      <el-button type="primary" @click="getPrice">提交</el-button>
    </div>
  </div>
</template>

<script>
import { RequestConstant } from "@/api/RequestConstant";

export default {
  name: "Calculate",
  data() {
    return {
      boxList: [
        {
          title: "城市",
          key: "city",
          dropdown: {
            title: "选择城市",
            list: [
              {
                label: "深圳",
                key: "sz"
              },
              {
                label: "广州",
                key: "gz"
              },
              {
                label: "上海",
                key: "sh"
              },
              {
                label: "北京",
                key: "bj"
              }
            ]
          }
        },
        {
          title: "面积",
          key: "area",
          dropdown: {
            title: "选择面积",
            list: [
              {
                label: "0-10m2",
                key: "10"
              },
              {
                label: "10-20m2",
                key: "20"
              },
              {
                label: "20-30m2",
                key: "30"
              },
              {
                label: "30-40m2",
                key: "40"
              },
              {
                label: "40-50m2",
                key: "50"
              }
            ]
          }
        },
        {
          title: "区域",
          key: "zone",
          dropdown: {
            title: "选择区域",
            list: []
          }
        },
        {
          title: "模型",
          key: "model",
          dropdown: {
            title: "选择模型",
            list: [
              {
                label: "决策树",
                key: "1"
              },
              {
                label: "最近邻",
                key: "2"
              },
              {
                label: "逻辑回归",
                key: "3"
              }
            ]
          }
        }
      ],
      minPrice: null,
      params: {
        city: "",
        zone: "",
        area: null,
        model: null
      }
    };
  },
  methods: {
    /**
     * @param {string} key 表示选中的box
     * @param {object} item 表示点击的box-item
     * */
    dropdownClick(key, item) {
      this.params[key] = item.key;
      switch (key) {
        case "city":
          this.boxList[0].dropdown.title = item.label;
          break;
        case "area":
          this.boxList[1].dropdown.title = item.label;
          break;
        case "zone":
          this.boxList[2].dropdown.title = item.label;
          break;
        case "model":
          this.boxList[3].dropdown.title = item.label;
          break;
        default:
          break;
      }
      if (key === "city") {
        this.$axios
          .get(RequestConstant.CITY_ZONE, {
            params: {
              city: item.key
            }
          })
          .then(res => {
            this.boxList[2].dropdown.list = res.data.map(item => {
              return {
                key: item.value,
                label: item.name
              };
            });
          });
      }
    },
    getPrice() {
      this.$axios
        .get(RequestConstant.CALCULATE, {
          params: this.params
        })
        .then(res => {
          this.minPrice = res.data.price;
        });
    },
    /**
     * 清空筛选条件
     * */
    clear() {
      this.params = {
        city: "",
        zone: "",
        area: null,
        model: null
      };
      this.boxList[0].dropdown.title = "选择城市";
      this.boxList[1].dropdown.title = "选择面积";
      this.boxList[2].dropdown.title = "选择区域";
      this.boxList[3].dropdown.title = "选择模型";
      this.minPrice = ''
    }
  }
};
</script>

<style lang="scss">
.calculate {
  background: rgba(220, 220, 220, 0.3);
  padding: 20px;
  .calculate-select {
    margin-bottom: 20px;
    padding: 20px;
    background: white;
    .calculate-select__title {
      font-size: 20px;
      font-weight: 500;
      line-height: 40px;
      height: 40px;
    }
    .calculate-select__box {
      margin-top: 30px;
      margin-left: 200px;
      .box__cell {
        display: inline-block;
        width: 40%;
        margin-bottom: 30px;
        text-align: left;
        .box-cell__title {
          display: inline-block;
          font-size: 16px;
        }
        .el-button {
          width: 117px !important;
          font-size: 16px !important;
          i {
            float: right;
          }
        }
      }
    }
  }

  .calculate-res {
    padding: 20px;
    background: white;
    margin-bottom: 20px;

    .calculate-res__title {
      font-size: 20px;
      font-weight: 500;
      line-height: 40px;
      height: 40px;
    }

    .calculate-res__content {
      border: 1px solid gray;
      margin: 20px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 40px;
      font-weight: 500;
    }
  }

  .calculate-buttons {
    padding: 20px;
    background: white;
    text-align: center;
  }
}
.el-dropdown-menu {
  padding: 0;
  .el-dropdown-menu__item {
    padding: 0;
    .el-dropdown__calculate {
      width: 120px;
      text-align: center;
      &.is-active {
        background: #ecf5ff;
        color: #66b1ff;
      }
    }
  }
}
</style>
