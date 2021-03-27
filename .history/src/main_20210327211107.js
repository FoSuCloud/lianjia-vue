import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/index.scss";
import axios from '@/api/axios.js'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios()
Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");