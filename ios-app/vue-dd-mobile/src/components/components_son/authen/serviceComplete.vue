<template>
  <div class="authen_box">
    <!--<C_header left_show="true" right_show="true"  center_text="认证信息" right_number="3"></C_header>-->
    <C_header left_show="true" right_show="true"  center_text="认证信息"></C_header>
    <div class="authen_title">
      <div>① 基本信息</div>
      <div>② 上传证件照</div>
      <div class="active">③ 完成</div>
    </div>

    <div class="complete">
      <div>
        <img src="../../../assets/images/authen_success.png" alt="">
      </div>
      <div>注册资料已提交，审核中...</div>
      <div>将在3个月工作日内完成审核</div>
      <div>结果将以短信方式告知</div>
    </div>

    <div @click="">
      <C_button class="c_button"  btn_disabled="2" btn_text="退出并等待"></C_button>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return {

      }
    },
    components: {},
    methods: {
      lower_submit(){ //退出并等待

      }
    }
  }
</script>
<style scoped lang="scss">
  $border-bottom: .01rem solid #E3E3E3;
  .authen_box{
  background:#fff;

  .authen_title{
    border-bottom:$border-bottom;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    display: flex;

    div{
      flex: 1;
      text-align: center;
    }
  }

  .complete{
    width:100%;
    margin: 1rem 0 .6rem;
    text-align:center;

    >div:nth-of-type(1){
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto;
     }
     >div:nth-of-type(2){
        margin-top: .4rem;
        font-size: .36rem;
      }
     >div:nth-of-type(3){
        color: #9E9E9E;
        margin-top: .2rem;
      }
     >div:nth-of-type(4){
        color: #9E9E9E;
        margin-top: .1rem;
      }
  }

    .c_button{
      margin-top: .6rem;
    }

  }

  .active{
    color:#26a2ff;
    background-color:#ECECEC;
  }
</style>
