import "./plugins/element.js";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/font/iconfont.css";

import "element-ui/lib/theme-chalk/index.css";
import './lib/hotcss/hotcss.js'
import axios from "axios";
import qs from "qs";
import back from "./components/test.js"
import 'mint-ui/lib/style.css'
import "./plugins/element.js";
axios.defaults.baseURL = "https://fybgame.top:8000/youzhi-project-1.0.0/"
// axios.defaults.baseURL = "http://192.168.43.90:8080/";
// axios.defaults.baseURL = "http://localhost:8082/"
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false;

window.addEventListener(
  "popstate",
  function(e) {
    router.isBack = true;
  },
  false
);
new Vue({
  router,
  store,
  back,
  render: h => h(App)
}).$mount("#app");
