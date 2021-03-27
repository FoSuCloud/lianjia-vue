import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/index.scss";
import axios from '@/api/axios.js'
// main.js中引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');

// 引入折线图/柱状图等组件,折线图是line,饼图改为pie,柱形图改为bar
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

//vue全局注入
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios()
Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");