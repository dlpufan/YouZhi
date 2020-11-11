<template>
  <div class="all">
    <div class="backgroundDiv">
      <img src="@/assets/loginBackground.jpg" alt="" />
    </div>
    <div class="title">
      <div class="title_model return" @click="backToIndex"><p>&lt;</p></div>
      <div class="title_model title_text"><p>登录</p></div>
    </div>
    <div class="form">
      <input placeholder="在此输入用户名" v-model="loginInfo.username" />
      <input placeholder="密码" type="password" v-model="loginInfo.password" />
      <div class="forget_password">
        <div class="forget_password_text">忘记密码？</div>
      </div>
      <div class="login_button_div">
        <el-button type="primary" class="login_button" @click="userLogin"
          >登录</el-button
        >
      </div>
    </div>
    <div class="register">
      <div @click="gotoPage('/userRegister')">没有新账号？注册</div>
    </div>
  </div>
</template>
<script>
const userName = "";
function login() {
  this.userName = "博博";
}
export default {
  userName,
  login,
  data() {
    return {
      loginInfo: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    gotoPage(path){
        this.$router.push({
          path: path
        });
    },
    backToIndex() {
      this.$router.go(-1);
    },
    async userLogin() {
      let qs = this.$qs;
      const { data: result } = await this.$http.post(
        "user/login",
        qs.stringify(this.loginInfo),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }
      );
      
      if (result.message.code == 0) {
        return this.$toast({
          message: "账户名或密码错误", //弹窗内容
          position: "middle", //弹窗位置
          duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
          className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
        });
      }
      window.localStorage.setItem("token", result.data.token);
      this.$toast({
        message: "登录成功", //弹窗内容
        position: "middle", //弹窗位置
        duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
        className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
      }),
        this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>

.all,
.backgroundDiv,
.backgroundDiv img {
  width: 100%;
  height: 100%;
}
.backgroundDiv {
  position: absolute;
  z-index: -1;
}
.form {
  width: 90%;
  height: px2rem(260);
  margin-top: px2rem(400);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.forget_password {
  height: px2rem(40);
  display: flex;
  flex-direction: row-reverse;
}
.register {
  margin-top:px2rem(400);
  height: px2rem(60);
  font-size: px2rem(34);
  color:rgb(119, 119, 119);
}
.forget_password_text {
  width: 27%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: px2rem(22);
  color: rgb(119, 119, 119);
}
.login_button_div {
  height: px2rem(60);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_button {
  width: px2rem(200);
  font-size: px2rem(35);
  border: px2rem(8) solid #409eff;
}
input {
  width: 85%;
  height: px2rem(80);
  background: rgba(0, 0, 0, 0);
  font-size: px2rem(25);
  border-bottom: px2rem(1.5) solid rgba(255, 164, 164, 0);
}
input:focus {
  border-bottom: px2rem(1.5) solid rgb(255, 164, 164);
}
</style>