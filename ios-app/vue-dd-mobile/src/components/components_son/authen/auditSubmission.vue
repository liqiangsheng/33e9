<template>
  <div class="main">
    <div>
      <C_header  center_text="叮板"  right_show="true"  right_number="3"></C_header>
    </div>
    <div class="auditSubmission_img">
      <div>
        <img src="../../../assets/images/jumpauthen.png" alt="">
      </div>
      <div>注册资料已提交,审核中...</div>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return{

          }
      },
      methods:{

      }
  }
</script>
<style scoped lang="scss">
  .main{
    background-color: #fff;
  }
.auditSubmission_img{
  margin-top: 2.5rem;
  width:100%;

  >div:nth-of-type(1){
      width: 100%;
      margin: 0 auto;

      img{
        width: 100%;
        height: 100%;
      }
   }
   >div:nth-of-type(2){
      margin-top: .6rem;
      text-align: center;
    }
}
</style>
