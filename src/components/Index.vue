<template>
  <div class="all">
    <el-card class="index_title">
      <el-row :gutter="5">
        <el-col :span="4"
          ><div class="choose_city"><p>大连▼</p></div></el-col
        >
        <el-col :span="15">
          <el-input
            placeholder="请输入内容"
            v-model="value.value"
            class="index_title_input"
            @change="searchText"
          >
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <div class="index_menu">
      <div class="index_menu_model" v-for="model in list" :key="model.id">
        <img :src="model.imgSrc" />
        <div class="index_menu_model_text">{{ model.name }}</div>
      </div>
    </div>
    <div class="grey_style_block"></div>
    <div class="index_job_recommendation">
      <div class="index_job_recommendation_title">
        <div class="index_job_text">猜你喜欢</div>
      </div>
      <div class="index_job_model" v-for="model in list1" :key="model.id">
        <el-row :gutter="20" class="index_job_model_top">
          <el-col :span="12"
            ><div class="index_job_model_title" :class="isLoad">
              <p>{{ model.title }}</p>
            </div></el-col
          >
          <el-col :span="12"
            ><div class="index_job_model_city" :class="isLoad">
              <p>{{ model.position }}</p>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="2" class="index_job_model_salary" :class="isLoad">
          <el-col :span="8"
            ><div class="index_job_model_money">
              <p>{{ model.salary }}元</p>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="index_job_model_jobType">
              <p>{{ model.workType == 1 ? "普工" : "特工" }}</p>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="8" class="index_job_model_tag_home">
          <el-col :span="4" v-for="tags in model.tags" :key="tags.id"
            ><div class="index_job_model_tag" :class="isLoad">
              <p>{{ tags }}</p>
            </div></el-col
          >
          <el-col :span="8" style="float:right;"
            ><div>
              <el-button
                type="primary"
                class="index_job_model_tag_button"
                @click="workDetails(model.id)"
                >查看详情</el-button
              >
            </div></el-col
          >
        </el-row>
        <el-row :gutter="4" class="index_job_model_author">
          <el-col :span="4"
            ><img
              src="https://fybgame.top/img/YouZhi/part-time-job.png"
              class="index_job_model_headImg"
          /></el-col>
          <el-col :span="16"
            ><div class="index_job_model_author" :class="isLoad">
              <p>{{ model.userID }}</p>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoad:"load",
      page: {
        pageNum: 1,
        pageSum: 10
      },
      value: {
        value: ""
      },
      list: [
        {
          id: 1,
          name: "服务行业",
          imgSrc: "https://fybgame.top/img/YouZhi/服务.png"
        },
        {
          id: 2,
          name: "IT行业",
          imgSrc: "https://fybgame.top/img/YouZhi/电脑.png"
        },
        {
          id: 3,
          name: "志愿者",
          imgSrc: "https://fybgame.top/img/YouZhi/人.png"
        },
        {
          id: 4,
          name: "艺术设计",
          imgSrc: "https://fybgame.top/img/YouZhi/艺术.png"
        },
        {
          id: 5,
          name: "校内兼职",
          imgSrc: "https://fybgame.top/img/YouZhi/教育-校园.png"
        }
      ],
      list1: [
        {
          id: 1,
          title: "                ",
          position: "      ",
          salary: "       ",
          jobType: "     ",
          tags: ["     ", "     ", "     "],
          userID: "         "
        },
        {
          id: 2,
          title: "                ",
          position: "      ",
          salary: "       ",
          jobType: "     ",
          tags: ["     ", "     ", "     "],
          userID: "         "
        },
        {
          id: 3,
          title: "                ",
          position: "      ",
          salary: "       ",
          jobType: "     ",
          tags: ["     ", "     ", "     "],
          userID: "         "
        },
        {
          id: 4,
          title: "                ",
          position: "      ",
          salary: "       ",
          jobType: "     ",
          tags: ["     ", "     ", "     "],
          userID: "         "
        }
      ]
    };
  },
  created() {
    if (window.localStorage.getItem("path") != "/index") {
      window.localStorage.setItem("path", "/index");
      this.$router.go(0);
    }
    this.init();
  },
  methods: {
    async searchText() {
      if (this.value.value == "") {
        this.init();
        return false;
      }
      let qs = this.$qs;
      const { data: result } = await this.$http.post(
        "work/searchWorkInfo",
        qs.stringify(this.value),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }
      );
      if (result.message.code == 1) {
        this.list1 = result.data;
        for (var i = 0; i < result.data.length; i++) {
          this.list1[i].tags = result.data[i].tags.split("*-*-*");
        }
      } else {
        this.list1 = null;
      }
    },
    async init() {
      const { data: result } = await this.$http.get(
        "work/getAllWorkInfo?pageNum=" +
          this.page.pageNum +
          "&pageSum=" +
          this.page.pageSum
      );
      this.list1 = result.data;
      this.isLoad = 'none'
      for (var i = 0; i < result.data.length; i++) {
        this.list1[i].tags = result.data[i].tags.split("*-*-*");
      }
    },
    workDetails(id) {
      this.$router.push({
        path: "/work",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.load{
  background: rgba(192, 192, 192,0.6);
  height:px2rem(20);
  border-radius: px2rem(40);
}
.grey_style_block {
  width: 100%;
  height: px2rem(20);
  background: rgba(180, 180, 180, 0.4);
  border-top: px2rem(1) rgb(80, 80, 80) solid;
  border-bottom: px2rem(1) rgb(80, 80, 80) solid;
}
.all {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.index_title {
  width: 100%;
  height: px2rem(80);
}
.choose_city {
  height: px2rem(40);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: px2rem(30);
}
.index_title_input {
  font-size: px2rem(20);
  height: px2rem(50);
}
.index_menu {
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: px2rem(30);
}
.index_job_recommendation {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: px2rem(140);
}
.index_job_recommendation_title {
  width: 100%;
  height: px2rem(80);
}
.index_menu_model {
  width: 16%;
  height: px2rem(100);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: px2rem(10);
}
.index_menu_model img {
  width: px2rem(65);
  height: px2rem(65);
}
.index_menu_model_text {
  margin-top:px2rem(15);
  font-size: px2rem(24);
  font-weight: bold;
}
.index_job_text {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 25%;
  height: 100%;
  font-size: px2rem(33);
  font-weight: bold;
}
.index_job_model {
  width: 100%;
  height: px2rem(200);
  border-bottom: px2rem(1) solid black;
  margin: px2rem(10) 0 px2rem(10) 0;
  font-size: px2rem(30);
}
.index_job_model_top {
  height: 24%;
}
.index_job_model_salary {
  height: 18%;
}
.index_job_model_tag_home {
  height: 24%;
}
.index_job_model_author {
  height: 34%;
}
.index_job_model_title {
  font-size: px2rem(40);
  font-weight: bold;
  text-align: left;
}
.index_job_model_city {
  text-align: right;
}
.index_job_model_money {
  color: rgb(255, 95, 95);
  text-align: left;
}
.index_job_model_tag {
  border: 1px solid black;
  border-radius: px2rem(2);
  font-size: px2rem(25);
  margin-top: px2rem(10);
}
.index_job_model_tag_button {
  font-size: px2rem(28);
  color: white;
}
.index_job_model_headImg {
  height: px2rem(60);
  width: px2rem(60);
  border-radius: 50%;
}
.index_job_model_author {
  font-size: px2rem(28);
  display: flex;
  align-items: center;
}
</style>