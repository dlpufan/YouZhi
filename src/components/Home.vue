<template>
  <div>
    <router-view></router-view>
    <div class="bottom_menu" v-show="isShow">
      <div class="bottom_menu_flex">
        <div
          class="bottom_menu_icon"
          :class="{ isClick: menuClick[0] }"
          @click="clickItem('/index', 0)"
        >
          <i class="iconfont icon-shouye"></i>
          <p>首页</p>
        </div>
        <div
          class="bottom_menu_icon"
          :class="{ isClick: menuClick[1] }"
          @click="clickItem('/dynamic', 1)"
        >
          <i class="iconfont icon-dongtai"></i>
          <p>动态</p>
        </div>
        <div
          class="bottom_menu_icon"
          :class="{ isClick: menuClick[2] }"
          @click="clickItem('/release', 2)"
        >
          <i class="iconfont icon-fabu"></i>
          <p>发布</p>
        </div>
        <div
          class="bottom_menu_icon"
          :class="{ isClick: menuClick[3] }"
          @click="clickItem('/message', 3)"
        >
          <i class="iconfont icon-ai-message"></i>
          <p>消息</p>
        </div>
        <div
          class="bottom_menu_icon"
          :class="{ isClick: menuClick[4] }"
          @click="clickItem('/mine', 4)"
        >
          <i class="iconfont icon-wodedangxuan"></i>
          <p>我的</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "bottom",
      menuClick: [false, false, false, false, false],
      menuName: ["/index", "/dynamic", "/release", "/message", "/mine"],
      originalHeight: 0, //原始高度
      screenHeight: 0, //实时高度
      isShow: true
    };
  },
  created() {
    var lastClick = this.menuName.indexOf(window.localStorage.getItem("path"));
    this.menuClick[lastClick == -1 ? 0 : lastClick] = true;
  },
  mounted() {
    //首次进入的原始高度
    this.originalHeight = document.documentElement.clientHeight;
    window.addEventListener("resize", this.watchResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.watchResize);
  },

  watch: {
    screenHeight(newHeight) {
      //监听屏幕高度变化
      this.isShow = this.originalHeight <= newHeight;
    }
  },

  methods: {
    watchResize() {
      //实时变化的窗口高度
      this.screenHeight = document.documentElement.clientHeight;
    },

    clickItem(path, index) {
      window.localStorage.setItem("path", path);
      if (!this.menuClick[index]) this.$router.push(path);
      for (var i = 0; i < this.menuClick.length; i++) {
        this.menuClick[i] = false;
      }
      this.menuClick[index] = true;
    }
  }
};
</script>
<style lang="scss" scoped>
i {
  font-size: px2rem(50);
  margin-top: px2rem(10);
  margin-bottom: px2rem(10);
  width: px2rem(100);
  height: px2rem(50);
}
.isClick {
  color: rgb(116, 192, 255);
}
.bottom_menu {
  width: 100%;
  height: px2rem(130);
  position: fixed;
  bottom: 0;
  background: rgb(226, 226, 226);
}
.bottom_menu_flex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
}
.bottom_menu_icon {
  width: px2rem(100);
  height: 100%;

  display: flex;
  font-size: 33px;
  flex-direction: column;
}
</style>