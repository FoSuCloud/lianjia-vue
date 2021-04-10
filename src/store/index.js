import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: 1, // 1是用户，2是管理员
    status: 200 // 上次请求的状态码
  },
  mutations: {
    handleRole(state,role){
      state.role = role;
    },
    handleStatus(state,status){
      state.status = status;
    }
  },
  actions: {},
  modules: {}
});
