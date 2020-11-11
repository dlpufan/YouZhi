"use strict";

require("./plugins/element.js");

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("./assets/font/iconfont.css");

require("element-ui/lib/theme-chalk/index.css");

require("./lib/hotcss/hotcss.js");

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _elementUi = _interopRequireDefault(require("element-ui"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.baseURL = "http://localhost:8081/users/";
_vue["default"].prototype.$http = _axios["default"];
_vue["default"].prototype.$qs = _qs["default"];
_vue["default"].config.productionTip = false;

_vue["default"].use(_elementUi["default"]);

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");