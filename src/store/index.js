import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: 1, // 1是用户，2是管理员
    status: 200, // 上次请求的状态码
    showLogin: false
  },
  mutations: {
    handleRole(state, role) {
      state.role = role;
    },
    handleStatus(state, status) {
      state.status = status;
    },
    handleShowLogin(state,status){
      state.showLogin = status;
    }
  },
  actions: {},
  modules: {}
});
