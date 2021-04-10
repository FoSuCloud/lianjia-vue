import axios from "axios";
import router from "@/router";
import { RouterConstant } from "@/router/RouterConstant";
import { MessageBox, Message } from "element-ui";
import store from "@/store";

// 创建 axios 实例
let service = axios.create({
  timeout: 60000
});

// 设置 post、put 默认 Content-Type
service.defaults.headers.post["Content-Type"] = "application/json";
service.defaults.headers.put["Content-Type"] = "application/json";

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (config.method === "post" || config.method === "put") {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data);
    }
    // 请求发送前进行处理
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    store.commit("handleStatus", 200);
    let { data } = response;
    return data;
  },
  error => {
    let info = {},
      { status, statusText, data } = error.response;
    if (store.state.status !== 401 && status === 401) {
      // 之后不显示弹窗
      store.commit("handleStatus", 401);
      MessageBox.confirm("请先登录～", "提示", {
        confirmButtonText: "确定",
        showCancelButton: false,
        showClose: false,
        type: "error"
      }).then(() => {
        router.push(RouterConstant.LOGIN);
      });
    }

    if (!error.response) {
      info = {
        code: 5000,
        msg: "Network Error"
      };
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      };
    }
    return info;
  }
);

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function() {
  return service;
}
