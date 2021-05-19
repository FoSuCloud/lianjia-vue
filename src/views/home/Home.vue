<template>
  <div class="home">
    <div>
      <h2>总数据可视化</h2>
    </div>
    <div class="home-map">
      <p>各城市平均每平方米月租金(元/m2)</p>
      <div id="home-bar"></div>
    </div>
    <div class="home-map">
      <p>各城市租房方式统计</p>
      <div id="home-type"></div>
    </div>
  </div>
</template>

<script>
import { RequestConstant } from "@/api/RequestConstant.js";

export default {
  name: "Home",
  data() {
    return {
      barData: {},
      typeData: {}
    };
  },
  created() {
    this.$axios.get(RequestConstant.CITY_RENT).then(response => {
      this.barData = response.data;
      this.initBar();
    });
    this.$axios.get(RequestConstant.CITY_HOUSE_TYPE).then(response => {
      this.typeData = response.data;
      this.initType();
    });
  },
  methods: {
    initBar() {
      let bar = this.$echarts.init(document.getElementById("home-bar"));
      bar.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          axisTick: { show: false },
          data: this.barData.nameList
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.barData.values,
            type: "bar",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            }
          }
        ]
      });
    },
    initType() {
      let type = this.$echarts.init(document.getElementById("home-type"));
      type.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: this.typeData.legendList
        },
        xAxis: {
          type: "category",
          axisTick: { show: false },
          data: this.typeData.cityList
        },
        yAxis: {
          type: "value"
        },
        series: this.typeData.values.map(item => {
          return {
            name: item.name,
            type: "bar",
            emphasis: {
              focus: "series"
            },
            data: item.values
          };
        })
      });
    }
  }
};
</script>

<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  text-align: center;
  background: rgba(220, 220, 220, 0.3);
  .home-map {
    display: inline-block;
    width: 480px;
    height: 450px;
    margin: 10px;

    background: white;
    &:not(:last-child) {
      margin-right: 20px;
    }
    #home-bar,
    #home-type {
      display: inline-block;
      width: 100%;
      height: 350px;
      padding: 0;
      margin: 0;
    }

    p {
      display: inline-block;
      text-align: center;
      height: 24px;
      line-height: 24px;
      padding: 10px;
      margin: 10px 0;
    }
  }
}
</style>
