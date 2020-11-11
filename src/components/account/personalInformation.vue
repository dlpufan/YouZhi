<template>
  <div class="all">
      <div class="title">
        <div class="title_model return" @click="backToIndex"><p>&lt;</p></div>
        <div class="title_model title_text"><p>个人信息</p></div>
    </div>
  </div>
</template>

<script>
export default {
  created(){

  },
  methods: {
    async init(){
      
    },
    backToIndex(){
       this.$router.go(-1);
    },
 }
};
</script>
<style lang="scss" scoped>

</style>