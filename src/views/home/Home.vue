<template>
  <div class="home">
    <p>各城市平均月租金</p>
    <div id="home-bar"></div>
    <p>各城市租房类型分布</p>
    <div id="home-type"></div>
  </div>
</template>

<script>
import { RequestConstant } from "@/api/RequestConstant.js";
export default {
  name: "Home",
  data() {
    return {
      barData: {},
      typeData: {},
    };
  },
  created() {
    this.$axios.get(RequestConstant.RENT).then((response) => {
      this.barData = response.data;
      this.initBar();
    });
    this.$axios.get(RequestConstant.HOUSE_TYPE).then((response) => {
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
            type: "shadow",
          },
        },
        xAxis: {
          data: this.barData.nameList,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            interval: 0,
          },
          data: [2000, 4000, 6000, 8000, 10000],
        },
        series: [
          {
            data: this.barData.values,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
    },
    initType() {
      let type = this.$echarts.init(document.getElementById("home-type"));
      type.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: this.typeData.legendList,
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.typeData.cityList,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: this.typeData.values.map((item) => {
          return {
            name: item.name,
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: item.values,
          };
        }),
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  #home-bar,#home-type {
    display: inline-block;
    width: 450px;
    height: 350px;
    padding: 0;
    margin: 0;
  }
}
</style>
