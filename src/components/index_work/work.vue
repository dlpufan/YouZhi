<template>
    <div class="all">
        <div class="title">
            <div class="title_model return" @click="backToIndex"><p>&lt;</p></div>
            <div class="title_model title_text"><p>工作详情</p></div>
            <div class="title_model title_function"><p>☆</p><p class="title_function_text">收藏</p></div>
        </div>
        <div class="center">
            <div class="work_title">
                <div class="center_title_text">{{result.title}}</div>
                <div class="title_salary">
                    <div class="title_salary_model title_salary_text">{{result.salary}}/天</div>
                    <div class="title_salary_model">普工</div>
                    <div class="title_salary_model">{{result.sendTime}}</div>
                    <div class="title_salary_model">{{result.pageViews}}次浏览</div>
                </div>
            </div>
            <div class="work_requirement">
                <div class="work_requirement_model">
                    <div style="color:rgb(150, 150, 150);">招聘人数:</div>
                    <div>{{result.workNeedCount}}人</div>
                </div>

                <div class="work_requirement_model">
                    <div style="color:rgb(150, 150, 150);">兼职时段:</div>
                    <div>{{result.workTime}}</div>
                </div>
                <div class="work_requirement_model">
                    <div style="color:rgb(150, 150, 150);">工作地点:</div>
                    <div>{{result.position}}</div>
                </div>
                <div class="work_requirement_model">
                    <div style="color:rgb(150, 150, 150);">工资发放方式:</div>
                    <div>{{payment}}</div>
                </div>
                <div class="work_requirement_model">
                    <div style="color:rgb(150, 150, 150);">联系方式:</div>
                    <div>{{result.userTel}}</div>
                </div>
            </div>
            <div class="work_describe">
                <div style="color:rgb(150, 150, 150);">兼职描述</div>
                <div class="work_describe_text">{{result.workDescription}}
                </div>
            </div>
        </div>
        <div class="bottom"><p>申请</p></div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            id:0,
            result:"",
            payment:""
        }
    },
    created(){
        this.id = this.$route.query.id
        this.init()

    },
  methods: {
      async init(){
          const {data: result} = await this.$http.get("work/getWorkInfoById?id="+this.id);
          this.result = result.data
            switch(this.result.payment){
            case 1:
                this.payment = '微信';
                break;
            case 2:
                this.payment = '支付宝';
                break;
            case 3:
                this.payment = "本程序";
                break;
            case 4:
                this.payment = "面结";
                break;
            default:
                this.payment = "微信";
        }
      },
    backToIndex(){
       this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>

.title_function{
    width:15%;
    flex-direction: column;
}
.title_function_text{
    font-size: px2rem(27);
}
.bottom{
    position: fixed;
    background: rgb(54, 181, 255);
    width:100%;
    height:px2rem(100);
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: px2rem(40);
    font-weight: bold;
    letter-spacing: px2rem(10);
    color:white;
}
.center{
    width:100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.work_title{
    width:90%;
    height:px2rem(100);
    display: flex;
    flex-direction: column;
    margin-top:px2rem(30);
}
.center_title_text{
    font-size: px2rem(40);
    text-align: left;
    height:60%;
}
.title_salary{
    display: flex;
    font-size: px2rem(23);
}
.title_salary_text{
    color:red;
}
.title_salary_model{
   margin-right:3%;
}

.work_requirement{
    display: flex;
    flex-direction: column;
    width:90%;
    margin-top: px2rem(30);
}
.work_requirement_model{
    width:100%;
    height:px2rem(60);
    display: flex;
    font-size: px2rem(30);
    >div{
        margin-right:px2rem(30);
    }
}
 .work_describe{
     display: flex;
     flex-direction: column;
     justify-content: flex-start;
     font-size: px2rem(30);
     width:90%;
     >div{
         text-align: left;
     }
 }   

</style>