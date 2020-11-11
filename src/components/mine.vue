<template>
  <div class="all">
    <div class="title">
      <div class="userInfo" @click="gotoPage('/login')">
        <div class="user_headImg">
          <img src="@/assets/headImg.jpg" />
        </div>
        <div class="userName">
          <p v-if="isLogin">登录成功</p>
          <p v-else>立即登录></p>
        </div>
      </div>
      <div class="userHuDong">
        <div class="userHuDong_model">
          <p>----</p>
          <p>关注</p>
        </div>
        <div class="userHuDong_model">
          <p>----</p>
          <p>收藏</p>
        </div>
        <div class="userHuDong_model">
          <p>----</p>
          <p>积分</p>
        </div>
      </div>
      <div class="resume_div">
        <div class="resume_info">
          <p>简历完成度：--</p>
        </div>
        <div class="resume_button">
          <button @click="gotoPage('/resume')" v-if="isLogin">编辑简历</button>
          <div v-else>请先登录</div>
        </div>
      </div>
    </div>
    <div class="menu">
      <div class="menu_model" @click="gotoPage('/personal')">
        <div>个人信息</div>
        <div style="color:gray;">></div>
      </div>
      <div class="menu_model">
        <div>设置</div>
        <div style="color:gray;">></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isLogin:false
    }
  },
  created(){
    this.isLogin = window.localStorage.getItem('token')?true:false;
  },
  methods: {
    gotoPage(path){
      if(this.isLogin == true && path == "/login"){
        this.$toast({
          message: "您已登录,退出中...", //弹窗内容
          position: "middle", //弹窗位置
          duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
          className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
        })
        var that = this;
        window.setTimeout(function(){
          that.$router.go(0);
          window.localStorage.removeItem("token");
        }
        ,500)

      }
      else{
        this.$router.push({
          path: path
        });
      }

    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  height: px2rem(400);
  background-image: linear-gradient(aqua, white);
  border-radius: 0 0 20% 20%;
  display: flex;
  flex-direction: column;
  transition:all 1s;
  align-items: center;
  
}
.userInfo {
  width: 100%;
  height: px2rem(200);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.userInfo:active{
  
  background-image: linear-gradient(aqua, aqua);
}
.user_headImg {
  width: 35%;
  height: 80%;
  > img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
  }
}
.userName {
  width: 40%;
  height: 80%;
  display: flex;
  align-items: center;
  font-size: px2rem(26);
  color: white;
  font-family: "微软雅黑";
}
.userHuDong{
  width:90%;
  height:px2rem(80);
  font-size: px2rem(26);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.userHuDong_model{
  width:px2rem(100);
  height:px2rem(60);
  line-height: px2rem(30);
}
.resume_div{
  width:90%;
  height:px2rem(120);
  margin-top:px2rem(20);
  background: rgb(160, 236, 255);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.resume_info{
  font-size: px2rem(32);
  color:rgb(0, 189, 189);
  width:40%;
}
.resume_button{
  width:20%;
  margin-right:px2rem(10);
  >button{
    font-size: px2rem(28);
    color:white;
    background:rgb(0, 189, 189);
    border:px2rem(6) solid rgb(0, 189, 189);
    }
}
.menu{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.menu_model{
  width:100%;
  height:px2rem(80);
  border-bottom: px2rem(2) solid rgb(176, 176, 176);
  display: flex;
  justify-content: space-between;
  font-size: px2rem(30);
  >div{
    height:100%;
    display: flex;
    align-items: center;
    margin-left:px2rem(30);
    margin-right:px2rem(30);
  }
}
</style>