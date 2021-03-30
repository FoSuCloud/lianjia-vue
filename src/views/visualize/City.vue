<template>
  <div class="city">
    <div class="city-header">{{ city }}租房数据可视化</div>
    <div class="city-content">
      <p>房源分布</p>
      <div id="heat-map"></div>
    </div>
  </div>
</template>

<script>
import { guangzhou } from "@/assets/map/gz.js";
import { shanghai } from "@/assets/map/sh.js";
import { beijing } from "@/assets/map/bj.js";
import { shenzhen } from "@/assets/map/sz.js";
import { RequestConstant } from "@/api/RequestConstant.js";

export default {
  name: "City",
  data() {
    return {
      city: "",
      path: "",
      geoJson: "",
      heatMapData: [],
    };
  }, 
  created() {
    this.setRoute();
  },
  mounted() {
    this.$axios
      .get(RequestConstant.CITY_HEAT, { params: { city: this.path } })
      .then((response) => {
        this.heatMapData = response.data;
        this.setHeatMap();
      });
  },
  methods: {
    setRoute() {
      let name = this.$route.path;
      name = name.replace(/\/visualize\//, "");
      this.path = name;
      switch (name) {
        case "gz":
          this.city = "广州";
          this.geoJson = guangzhou;
          break;
        case "sh":
          this.city = "上海";
          this.geoJson = shanghai;
          break;
        case "bj":
          this.city = "北京";
          this.geoJson = beijing;
          break;
        case "sz":
          this.city = "深圳";
          this.geoJson = shenzhen;
          break;
        default:
          break;
      }
    },
    setHeatMap() {
      let map = document.getElementById("heat-map");
      let myChart = this.$echarts.init(map);
      this.$echarts.registerMap(this.path, this.geoJson);
      myChart.setOption({
        title: {
          text: this.city + "各区域的房源分布热力图",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} (元 / m2)",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        visualMap: {
          min: 10,
          max: 250,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
        },
        series: [
          {
            name: this.city + "各区域的房源分布热力图",
            type: "map",
            mapType: this.path, // 自定义扩展图表类型
            label: {
              show: true,
            },
            data: this.heatMapData
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss">
.city {
  .city-content {
    #heat-map {
      display: inline-block;
      width: 700px;
      height: 800px;
      transform: rotate(90edg);
    }
  }
}
</style>
