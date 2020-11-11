<template>
  <div style="margin-bottom:200px;">
    <div class="send_home" v-if="isLogin&&isCompany">
      <div class="send_model">
        <div class="send_model_text">兼职名称</div>
        <input
          class="send_model_input"
          placeholder="如发布传单2-12字"
          v-model="workList.title"
        />
      </div>
      <div class="send_model">
        <div class="send_model_text">兼职类别</div>
        <el-select v-model="workList.workType" placeholder="请选择">
          <el-option
            v-for="item in optionsByType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="send_model">
        <div class="send_model_text">招聘人数</div>
        <input
          class="send_model_input"
          placeholder="请填写1-999之间的数字"
          v-model="workList.workNeedCount"
        />
      </div>
      <div class="send_model">
        <div class="send_model_text">兼职时段</div>
        <input
          class="send_model_input"
          placeholder="请填写兼职的详细时间"
          v-model="workList.workTime"
        />
      </div>
      <div class="send_model">
        <div class="send_model_text">薪资水平</div>
        <input
          class="send_model_input"
          placeholder="请填写1-999之间的数字"
          v-model="workList.salary"
        />
        <div class="send_model_text">元/天</div>
      </div>
      <div class="send_model">
        <div class="send_model_text">结薪方式</div>
        <el-select v-model="workList.payment" placeholder="请选择">
          <el-option
            v-for="item in optionsByPayment"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="send_model">
        <div class="send_model_text">详细地址</div>
        <input
          class="send_model_input"
          placeholder="请填写详细地址"
          v-model="workList.position"
        />
      </div>
      <div class="send_BigModel">
        <div class="send_model_text">工作内容</div>
        <textarea
          class="send_model_input"
          placeholder="请填写工作内容"
          v-model="workList.workDescription"
        />
      </div>
      <div class="send_canAddModel">
        <div class="send_model_canAddText">工作标签</div>
        <div class="send_canAddDiv">
          <input
            class="send_model_canAddInput"
            placeholder="能突出工作特色,4字"
            v-for="(model, index) in workList.tagsList"
            :key="index"
            v-model="workList.tagsList[index]"
            maxlength="4"
          />
        </div>
        <div class="add_input" @click="addInput">+</div>
      </div>
      <div class="grey_style_block"></div>
      <div class="send_model">
        <div class="send_model_text">联系人</div>
        <input class="send_model_input" placeholder="如：李华" />
      </div>
      <div class="send_model">
        <div class="send_model_text">联系方式</div>
        <input
          class="send_model_input"
          placeholder="请输入手机号"
          v-model="workList.userTel"
        />
      </div>
    </div>
    <div class="send" v-if="isLogin&&isCompany">
      <el-button type="primary" class="send_button" @click="send"
        >发布</el-button
      >
    </div>
    <div v-if="isLogin&&!isCompany"><h1 style="font-size:66px;">您没有权限，请注册为企业用户</h1><el-button type="primary" style="width:200px;height:100px;font-size:60px;margin-top:40px;">认证</el-button></div>
    <div v-if="!isLogin&&!isCompany"><h1 style="font-size:66px;">您没有权限，请登录</h1></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      optionsByType: [
        {
          value: "1",
          label: "普工"
        },
        {
          value: "2",
          label: "特工"
        }
      ],
      optionsByPayment: [
        {
          value: "1",
          label: "微信"
        },
        {
          value: "2",
          label: "支付宝"
        },
        {
          value: "3",
          label: "本程序"
        },
        {
          value: "4",
          label: "面结"
        }
      ],
      workList: {
        title: "",
        salary: "",
        workType: "",
        tagsList: [""],
        tags: "",
        position: "",
        workDescription: "",
        workNeedCount: "",
        sendTime: "",
        /* 网络请求*/

        userID: "",
        payment: "",
        userTel: "",
        workTime: ""
      },
      isLogin: false,
      isCompany:false
    };
  },
  created() {
    var myDate = new Date();
    var time = myDate
      .toLocaleDateString()
      .split("/")
      .join("-");
    this.workList.sendTime = time;
    if (window.localStorage.getItem("token") != null) {
      this.isLogin = true
      this.isCompanyFunc();
      this.init();
    }
  },
  methods: {
    async isCompanyFunc() {
      const { data: res } = await this.$http.get("user/isCompany", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          token: window.localStorage.getItem("token")
        }
      });
      this.isCompany = res.message.message=="是公司";
    },
    async init() {
      let qs = this.$qs;
      const { data: res } = await this.$http.get("user/loginByToken", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          token: window.localStorage.getItem("token")
        }
      });
      const { data: result } = await this.$http.get(
        "user/getUserById?id=" + res.data.id
      );
      this.workList.userID = result.data.id;
    },
    async send() {
      let qs = this.$qs;
      var tagsStr = "";
      for (var i = 0; i < this.workList.tagsList.length; i++) {
        if (i == this.workList.tagsList.length - 1) {
          tagsStr += this.workList.tagsList[i];
          break;
        }
        tagsStr += this.workList.tagsList[i] + "*-*-*";
      }
      this.workList.tags = tagsStr;
      for(var i = 0 ; i < this.workList.tagsList.length ; i ++){
        if(this.workList.tagsList[i]=="")return this.$toast({
            message: "缺少标签", //弹窗内容
            position: "middle", //弹窗位置
            duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
            className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
          });
        
      }
      for (var key in this.workList) {
        if (!this.workList[key])
          return this.$toast({
            message: "缺少" + key, //弹窗内容
            position: "middle", //弹窗位置
            duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
            className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
          });
      }

      const { data: result } = await this.$http.post(
        "work/registerWorkInfo",
        qs.stringify(this.workList),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            token: window.localStorage.getItem("token")
          }
        }
    
      );
      this.$toast({
          message: "发送成功", //弹窗内容
          position: "middle", //弹窗位置
          duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
          className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
        })

        this.$router.push({
          path: '/index'
        });

    },
    addInput() {
      if (this.workList.tagsList.length >= 3) return false;
      this.workList.tagsList.push("");
    }
  }
};
</script>
<style lang="scss" scoped>
.grey_style_block {
  width: 100%;
  height: px2rem(20);
  background: rgba(180, 180, 180, 0.4);
  border-top: px2rem(1) rgb(80, 80, 80) solid;
  border-bottom: px2rem(1) rgb(80, 80, 80) solid;
}
.send_home {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.send_model,
.send_BigModel,
.send_canAddModel {
  width: 90%;
  font-size: px2rem(28);
  border-bottom: px2rem(1) solid rgb(150, 150, 150);
  display: flex;
}
.send_model,
.send_BigModel {
  height: px2rem(80);
  display: flex;
  align-items: center;
}
.send_model_text,
.send_model_canAddText {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.send_model_canAddText {
  height: px2rem(80);
}
.send_model_input {
  width: 60%;
  height: 100%;
}

.send_model_canAddInput {
  width: 70%;
  height: px2rem(80);
}
.send_BigModel {
  height: px2rem(240);
}
.send_canAddDiv {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.add_input {
  width: 8%;
  height: px2rem(50);
  border-radius: 50%;
  background: rgba(114, 114, 114, 0.25);
  border: px2rem(1) black solid;
  font-size: px2rem(50);
  margin-top: px2rem(10);
}
.send {
  margin-top: px2rem(40);
}
.send_button {
  font-size: px2rem(40);
  font-weight: bold;
}
</style>