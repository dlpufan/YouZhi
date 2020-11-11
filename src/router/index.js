import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Index from "../components/Index.vue";
import Dynamic from "../components/dynamic.vue";
import Release from "../components/release.vue";
import Message from "../components/message.vue";
import Mine from "../components/mine.vue";
import Work from "../components/index_work/work.vue";
import Login from "../components/account/login.vue";
import Resume from "../components/account/resume.vue";
import Personal from "../components/account/personalInformation.vue";
import Register from "../components/account/register.vue";
import MintUI from 'mint-ui'
Vue.use(MintUI)
Vue.use(VueRouter);
Vue.prototype.userInfo =Login;
const routes = [{
    path: "/home",
    redirect: "/index",
    component: Home,
    children: [{
      path: "/index",
      component: Index
    },
    {
      path: "/dynamic",
      component: Dynamic
    },
    {
      path: "/release",
      component: Release
    },
    {
      path: "/message",
      component: Message
    },
    {
      path: "/mine",
      component: Mine
    }
  ]
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/work",
    component:Work
  },
  {
    path: "/login",
    component:Login
  },
  {
    path: "/resume",
    component: Resume
  },
  {
    path: "/userRegister",
    component: Register
  },
  {
    path: "/personal",
    component: Personal
  }
];

const router = new VueRouter({
  //mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;