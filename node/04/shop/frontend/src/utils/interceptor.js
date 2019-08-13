import Vue from "vue";
import axios from "axios";
import { Loading } from "element-ui";
Vue.prototype.$axios = axios

let loading;

function startLoading() {
  //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, 0.7)"
  });
}
function endLoading() {
  //使用Element loading-close 方法
  loading.close();
}

//showFullScreenLoading() tryHideFullScreenLoading() 用于将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1   needLoadingRequestCount为 0 时，结束 loading

let needLoadingRequestCount = 0;
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}


//http request 拦截器
axios.interceptors.request.use(
  config => {
    showFullScreenLoading();
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios