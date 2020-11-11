"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../components/Home.vue"));

var _Index = _interopRequireDefault(require("../components/Index.vue"));

var _dynamic = _interopRequireDefault(require("../components/dynamic.vue"));

var _release = _interopRequireDefault(require("../components/release.vue"));

var _message = _interopRequireDefault(require("../components/message.vue"));

var _mine = _interopRequireDefault(require("../components/mine.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/home",
  redirect: "/index",
  component: _Home["default"],
  children: [{
    path: "/index",
    component: _Index["default"]
  }, {
    path: "/dynamic",
    component: _dynamic["default"]
  }, {
    path: "/release",
    component: _release["default"]
  }, {
    path: "/message",
    component: _message["default"]
  }, {
    path: "/mine",
    component: _mine["default"]
  }]
}, {
  path: "/",
  redirect: "/home"
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;