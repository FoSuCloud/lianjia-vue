<template>
  <div class="city">
    <div class="city-header">{{ city }}租房数据可视化</div>
    <div class="city-content">
      <div class="city-content__cell">
        <p>{{ city + "各区域的房源分布热力图" }}</p>
        <div id="house-zone"></div>
      </div>
      <div class="city-content__cell">
        <p>{{ city + "各区域的每平米租金价格热力图" }}</p>
        <div id="heat-map"></div>
      </div>
      <div class="city-content__cell">
        <p>租房数量及均价</p>
        <div id="num-price"></div>
      </div>
      <div class="city-content__cell">
        <p>房子格局与价格关系</p>
        <div id="style-price"></div>
      </div>
      <div class="city-content__cell">
        <p>房屋标签词云图</p>
        <div id="house-cloud"></div>
      </div>
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
      houseZoneData: [],
      numPriceData: [],
      stylePriceData: [],
      wordCloudData: []
    };
  },
  created() {
    this.setRoute();
  },
  mounted() {
    this.$axios
      .get(RequestConstant.CITY_HEAT, { params: { city: this.path } })
      .then(response => {
        this.heatMapData = response.data;
        this.setHeatMap();
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .get(RequestConstant.CITY_ZONE, { params: { city: this.path } })
      .then(response => {
        this.houseZoneData = response.data;
        this.setHouseZone();
      });
    this.$axios
      .get(RequestConstant.CITY_NUM_PRICE, { params: { city: this.path } })
      .then(response => {
        this.numPriceData = response.data;
        this.setNumPrice();
      });
    this.$axios
      .get(RequestConstant.CITY_STYLE_PRICE, { params: { city: this.path } })
      .then(response => {
        this.stylePriceData = response.data;
        this.setStylePrice();
      });
    this.$axios
      .get(RequestConstant.CITY_WORD_CLOUD, { params: { city: this.path } })
      .then(response => {
        this.wordCloudData = response.data;
        this.setWordCloud();
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
          show: false
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} (元 / m2)"
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 10,
          max: 250,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          bottom:'100',
          inRange: {
            color: [
              "#d1d4da",
              "#bacae8",
              "#96b5ef",
              "#6797ef",
              "#3375e4",
              "#035cf5"
            ]
          }
        },
        series: [
          {
            name: this.city + "各区域的每平米租金价格热力图",
            type: "map",
            mapType: this.path, // 自定义扩展图表类型
            label: {
              show: true
            },
            data: this.heatMapData
          }
        ]
      });
    },
    setHouseZone() {
      let zone = document.getElementById("house-zone");
      let myChart = this.$echarts.init(zone);
      this.$echarts.registerMap(this.path, this.geoJson);
      myChart.setOption({
        title: {
          show: false
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} 套"
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 10,
          max: 250,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          bottom:'100',
          inRange: {
            color: [
              "#d1d4da",
              "#bacae8",
              "#96b5ef",
              "#6797ef",
              "#3375e4",
              "#035cf5"
            ]
          }
        },
        series: [
          {
            name: this.city + "各区域的房源分布热力图",
            type: "map",
            mapType: this.path, // 自定义扩展图表类型
            label: {
              show: true
            },
            data: this.houseZoneData
          }
        ]
      });
    },
    setNumPrice() {
      let chartDom = document.getElementById("num-price");
      let myChart = this.$echarts.init(chartDom);
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["租房数量", "均价"]
        },
        xAxis: [
          {
            type: "category",
            data: this.numPriceData.map(item => item.name),
            axisPointer: {
              type: "shadow"
            },
            axisLabel: {
              interval: 0 //代表显示所有x轴标签显示
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "租房数量(套)",
            min: 0,
            max: 300,
            interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "均价(元/m2)",
            min: 0,
            max: 200,
            interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "租房数量",
            type: "bar",
            data: this.numPriceData.map(item => item.num)
          },
          {
            name: "均价",
            type: "line",
            yAxisIndex: 1,
            data: this.numPriceData.map(item => item.value)
          }
        ]
      });
    },
    setStylePrice() {
      let chartDom = document.getElementById("style-price");
      let myChart = this.$echarts.init(chartDom);
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["租房数量", "均价"]
        },
        xAxis: [
          {
            type: "category",
            data: this.stylePriceData.map(item => item.layout),
            axisPointer: {
              type: "shadow"
            },
            axisLabel: {
              interval: 0 //代表显示所有x轴标签显示
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "租房数量(套)",
            min: 0,
            max: 300,
            interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "均价(元/m2)",
            min: 0,
            max: 300,
            interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "租房数量",
            type: "bar",
            data: this.stylePriceData.map(item => item.num)
          },
          {
            name: "均价",
            type: "line",
            yAxisIndex: 1,
            data: this.stylePriceData.map(item => item.value)
          }
        ]
      });
    },
    setWordCloud() {
      var chart = this.$echarts.init(document.getElementById("house-cloud"));
      chart.setOption({
        series: [
          {
            type: "wordCloud",
            shape: "circle",
            left: "center",
            top: "center",
            width: "70%",
            height: "80%",
            right: null,
            bottom: null,
            sizeRange: [18, 80],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 8,
            drawOutOfBound: false,
            layoutAnimation: true,
            textStyle: {
              fontFamily: "sans-serif",
              fontWeight: "bold",
              color: function() {
                return (
                  "rgb(" +
                  [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(",") +
                  ")"
                );
              }
            },
            emphasis: {
              focus: "self",
              textStyle: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: this.wordCloudData
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss">
.city {
  background: rgba(220, 220, 220, 0.3);

  .city-header {
    font-size: 26px;
    margin-bottom: 20px;
  }
  .city-content {
    .city-content__cell {
      text-align: center;
      margin-bottom: 30px;
      background: white;
      padding: 20px 10px;

      p {
        font-size: 18px;
      }

      #house-zone,
      #heat-map{
        display: inline-block;
        width: 700px;
        height: 800px;
      }
      #num-price{
        display: inline-block;
        height: 400px;
        width: 820px;
      }
      #style-price{
        display: inline-block;
        height: 400px;
        width: 600px;
      }
      #house-cloud {
        display: inline-block;
        height: 400px;
        width: 400px;
      }
    }
  }
}
</style>
