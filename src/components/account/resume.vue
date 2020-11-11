<template>
  <div class="all">
    <div class="title_img">
      <div class="back_text" @click="backToIndex">&lt;</div>
      <img src="@/assets/resumeTitle.png" />
    </div>
    <div class="resume_from">
      <div class="resume_title">
        <div class="resume_upload_img">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>编辑头像</p>
        </div>

        <div class="resume_title_text">
          <div class="resume_title_text_font">真实姓名</div>
          <input type="text" placeholder="姓名" v-model="result.userName" />
          <div class="resume_title_sex">
            <div :class="userSexClassNan" @click="changeSexNan">男</div>
            <div :class="userSexClassNv" @click="changeSexNv">女</div>
          </div>
        </div>
      </div>
      <div class="resume_model">
        <div>请输入手机号:</div>
        <input placeholder="手机号" v-model="result.userTel"/>
      </div>
      <div class="resume_model">
        <div>请输入学校:</div>
        <input placeholder="学校" v-model="result.school" />
      </div>
      <div class="resume_model">
        <div>请选择出生日期:</div>
        <input
          :value="year ? year + '.' + month + '.' + date : '请选择日期'"
          @click="chooseBirth"
        />
        <mt-datetime-picker
          v-model="dateValue"
          type="date"
          ref="datePicker"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          :endDate="new Date()"
          @confirm="handleConfirm"
          :startDate="new Date('1970-1-1')"
          style="margin:0;"
        >
        </mt-datetime-picker>
      </div>
      <div class="resume_model">
        <div>请选择学历:</div>
        <el-select v-model="result.userEdu" placeholder="请选择">
          <el-option
            v-for="item in optionsByEdu"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="change_button">
      <button @click="update">修改</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: {
        headImg:"",
        id:"",
        school:"",
        sex:false,
        userBirth:"",
        userEdu:"",
        userName:"",
        userNativePlace:"",
        userNo:"",
        userProfile:"",
        userTel:"",
        userTimeOn:""
      },
      imageUrl: "https://fybgame.top/img/userHeadImg.jpg",
      userSexClassNan: "resume_title_sex_model",
      userSexClassNv: "resume_title_sex_model",
      dateValue: new Date(),
      year: "",
      month: "",
      date: "",
      edu:"",
      optionsByEdu: [
        {
          value: "1",
          label: "小学"
        },
        {
          value: "2",
          label: "初中"
        },
        {
          value: "3",
          label: "高中"
        },
        {
          value: "4",
          label: "大专"
        },
        {
          value: "5",
          label: "大学本科"
        },
        {
          value: "6",
          label: "研究生"
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
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

      this.result = result.data;
      this.result.userTel = this.result.userTel==0?"":this.result.userTel;
      //  this.resume.name = result.data.userName;
      //  this.userSex = result.data.sex?1:0;
      //  this.resume.tel = result.data.userTel;
      var birData = new Date(result.data.userBirth);
      this.year = birData.getFullYear();
      this.month = birData.getMonth() + 1;
      this.date = birData.getDate();
      
      this.result.sex?this.userSexClassNv="resume_title_sex_model click":this.userSexClassNan="resume_title_sex_model click";
      //  this.userSex?this.changeSexNan():this.changeSexNv();
    },
    backToIndex() {
      this.$router.go(-1);
    },
    chooseBirth() {
      this.$refs.datePicker.open();
    },
    handleConfirm(value) {
      this.year = value.getFullYear();
      this.month = value.getMonth() + 1;
      this.date = value.getDate();
      this.result.userBirth = (this.year + "-" + this.month + "-" + this.date);


    },
    onValuesChange(value) {

    },
    changeSexNv() {
      if (!this.result.sex) {
        var item;
        this.result.sex = !this.result.sex;
        this.userSexClassNan = "resume_title_sex_model";
        this.userSexClassNv = "resume_title_sex_model click";
      }
    },
    changeSexNan() {
      if (this.result.sex) {
        var item;
        this.result.sex = !this.result.sex;
        this.userSexClassNv = "resume_title_sex_model";
        this.userSexClassNan = "resume_title_sex_model click";
      }

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async update() {
      let qs = this.$qs;

      const { data: result } = await this.$http.post(
        "user/updateUser",
        qs.stringify(this.result),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            token: window.localStorage.getItem("token")
          }
        }
      );

      this.$toast({
        message: "修改成功", //弹窗内容
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
.all {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: px2rem(368);
  background: rgb(240, 240, 240);
}
.title_img {
  width: 100%;
  height: px2rem(190);
  display: flex;
  > img {
    width: 100%;
    height: px2rem(190);
    position: absolute;
  }
}
.back_text {
  width: 5%;
  height: px2rem(30);
  margin-top: px2rem(30);
  margin-left: px2rem(30);
  font-size: px2rem(40);
  color: white;
  z-index: 1;
  text-align: left;
}
.resume_from {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: white;
  border-bottom: px2rem(10) solid white;
}
.resume_title,
.resume_model {
  width: 100%;
  height: px2rem(120);
  display: flex;
  align-items: center;
  font-size: px2rem(25);
  border-bottom: px2rem(1) solid rgb(170, 170, 170);
}
.resume_model div {
  margin-left: px2rem(40);
  margin-right: px2rem(10);
}
.resume_title {
  height: px2rem(250);
}
.resume_upload_img {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.resume_title_text {
  width: 50%;
  height: 100%;
  display: flex;
  margin-left: px2rem(20);
  flex-direction: column;

  > input {
    width: 50%;
    height: px2rem(40);
    font-size: px2rem(28);
  }
}
.resume_title_text_font {
  margin-top: px2rem(50);
  margin-bottom: px2rem(10);
  width: 30%;
  color: gray;
  font-size: px2rem(24);
  text-align: left;
}
.resume_title_sex {
  width: 50%;
  height: px2rem(60);
  margin-top: px2rem(40);
  display: flex;
}

.resume_title_sex_model {
  width: 40%;
  border-radius: 30%;
  margin-right: 10%;
  border: px2rem(1) solid rgb(190, 190, 190);
  font-size: px2rem(30);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(190, 190, 190);
  transition: 0.3s;
}
.click {
  border: px2rem(2) solid rgb(255, 50, 50);
  color: rgb(0, 0, 0);
}
.avatar-uploader {
  border: 1px solid #666666;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: px2rem(178);
  height: px2rem(178);
  margin-top: px2rem(30);
}
.avatar-uploader-icon {
  font-size: px2rem(60);
  color: #8c939d;
  width: px2rem(178);
  height: px2rem(178);
  line-height: px2rem(178);
  text-align: center;
}
.avatar {
  width: px2rem(178);
  height: px2rem(178);
  display: block;
}
.change_button {
  width: 100%;
  margin-top: px2rem(30);
  height: px2rem(120);
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    width: 80%;
    height: 80%;
    background: orange;
    font-size: px2rem(28);
    color: white;
  }
}
</style>