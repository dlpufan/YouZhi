<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import "./assets/reset.scss";
import Vue from "vue";
window.Vue = Vue;

export default {
  name: "App",
  data() {
    return {
      transitionName: "fade"
    };
  },
  created: function() {},
  methods: {},
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack;
      if (this.$router.isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>

<style>
#app {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 28px;
}
.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%)
}
.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translateX(-100%)
}
.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: .5s;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
