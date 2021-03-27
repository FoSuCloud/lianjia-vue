<template>
  <div class="home">
    <div id="home-bar"></div>
    <div id="home-type"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    this.initBar();
    this.initType();
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
          data: ["Mon", "Tue", "Wed", "Thu"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80],
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
          data: ["Forest", "Steppe", "Desert", "Wetland"],
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
            data: ["2012", "2013", "2014", "2015"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Forest",
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334],
          },
          {
            name: "Steppe",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  #home-bar,
  #home-type {
    width: 300px;
    height: 400px;
  }
}
</style>
