import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/index.scss";
import "@/assets/iconfont/iconfont.scss";
import md5 from "js-md5";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent
} from "echarts/components";
import { MapChart } from "echarts/charts";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
import "echarts-wordcloud";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as tf from "@tensorflow/tfjs";
import service from "@/api/axios.js";
Vue.prototype.$tfvis = tfvis;
Vue.prototype.$tf = tf;

// 注册必须的组件
echarts.use([
  TitleComponent,
  LineChart,
  TooltipComponent,
  VisualMapComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  MapChart,
  CanvasRenderer
]);
//vue全局注入
Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = service;
// Vue.use具有install方法
Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
