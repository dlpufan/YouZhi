<template>
  <div class="all">
    <div class="backgroundDiv">
      <img src="@/assets/loginBackground.jpg" alt="" />
    </div>
    <div class="title">
      <div class="title_model return" @click="backToIndex"><p>&lt;</p></div>
      <div class="title_model title_text"><p>注册</p></div>
    </div>
        <div class="form">
      <input placeholder="在此输入用户名" v-model="loginInfo.username" />
      <input placeholder="密码" type="password" v-model="loginInfo.password" />
      <div class="login_button_div">
        <el-button type="primary" class="login_button" @click="userRegister"
          >注册</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
    return {
      loginInfo: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    backToIndex() {
      this.$router.go(-1);
    },
    async userRegister(){
            let qs = this.$qs;
      const { data: result } = await this.$http.post(
        "user/registerUserLogin",
        qs.stringify(this.loginInfo),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }
      );
      if(result.message.code==0){
        return this.$toast({
          message: result.message.message, //弹窗内容
          position: "middle", //弹窗位置
          duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
          className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
        });
      }
      else{
        window.localStorage.setItem("token", result.data.token);
        this.$router.push({
          path: "/mine"
        });
        this.$toast({
          message: "注册成功！", //弹窗内容
          position: "middle", //弹窗位置
          duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
          className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
        });
      }
      
      
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