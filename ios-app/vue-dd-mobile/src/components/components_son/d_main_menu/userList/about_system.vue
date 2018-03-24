<template>
  <div class="about_system">
    <div>
      <C_header left_show="true"  center_text="关于我们" ></C_header>
    </div>
    <div class="about_one">
        <div class="about_one_logo">
          <div class="about_one_logo_img"></div>
          <div class="about_one_logo_text">{{about_one_logo_text}}</div>
        </div>
    </div>
    <div class="about_two">
        <div>微信公众号：<span>{{about_two_weixin}}</span></div>
        <div>联系方式：<span>{{about_two_tel}}</span></div>
        <div>官网：<span>{{about_two_Official}}</span></div>
      <div @click="system_update_click" class="check_update">检测更新：<span><span>{{about_two_update}}</span><span v-if="new_system_show"></span></span></div>
    </div>


    <div class="system_update" v-if="system_update_show">
      <div class="system_update_content">
        <div>发现新版本v1.2</div>
        <div>
          <p>更新内容</p>
          <p>1.添加师傅请假功能</p>
          <p>2.添加当天预约功能</p>
        </div>
        <div>
          <div @click="system_update_close">以后再说</div>
          <div @click="system_update_determine">立即更新</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default{
      data(){
          return{
            system_update_show:false,  //弹出框显示
            about_one_logo_text:"叮叮快修-师傅端v1.0",  //订单快修标题
            about_two_weixin:"dingdingkuaixiu", //微信公众号
            about_two_tel:"400-999-1891", //联系方式
            about_two_Official:"www.dingdingkuaixiu.com", //官网
            about_two_update:"(v1.0)",    //检测更新
            new_system_show:false, //new图标是否显示
          }
      },
      created(){

      },
      mounted(){

      },
      methods:{
        system_update_click(){
          this.system_update_show=true;
        },
        system_update_close(){ //以后再说
            this.system_update_show=false;
        },
        system_update_determine(){ //确认更新
          console.log("立即更新");
        }
      }
  }
</script>
<style scoped lang="scss">
  .about_system{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
.about_one{
  width: 100%;
  height: 3.6rem;
  position: relative;
  background-image: linear-gradient(-180deg, #56CCF2 0%, #2F80ED 100%) !important;

  .about_one_logo{
    width:5rem;
    height: 1.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -2.5rem;
    margin-top: -.75rem;

    .about_one_logo_img{
      width: 100%;
      height: .9rem;
      background:url("../../../../assets/images/about_logo.png")center center no-repeat;
      -webkit-background-size:100% .9rem;
      background-size:100% .9rem;
    }
    .about_one_logo_text{
      margin-top: .2rem;
      width: 100%;
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      font-size: .28rem;
      color: #fff;
    }
  }
}
.about_two{
  padding: .2rem;
  line-height: 1rem;
  font-size: .36rem;
  background-color: #fff;

  >div:nth-of-type(4){
    >span{
       position: relative;

      >span:nth-of-type(2){
         width: .46rem;
         height: .46rem;
         line-height: .3rem;
         position: absolute;
         top: -.22rem;
         right:-.6rem;
         background:url("../../../../assets/images/new_system.png")center center no-repeat;
         -webkit-background-size:.46rem;
         background-size:.46rem;
       }
     }

   }
}


.system_update{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,.7);

  .system_update_content{
    width: 5.8rem;
    background-color: #fff;
    border-radius: .12rem;
    position: absolute;
    left: 50%;
    top: 40%;
    margin-top: -1.7rem;
    margin-left: -2.9rem;

    >div:nth-of-type(1){
      text-align: center;
      height: .8rem;
      line-height: .8rem;
      font-weight: 600;
      border-radius: .12rem .12rem 0 0;
    }
    >div:nth-of-type(2){
      height: 1.8rem;
      padding-left: .2rem;

      >p{
        height: .5rem;
        line-height: .5rem;
       }
        >p:nth-of-type(1){
            margin-top: .15rem;
         }
        >p:nth-of-type(2),
        >p:nth-of-type(3){
          color: #9B9B9B;
        }
    }
    >div:nth-of-type(3){
      display: flex;
      justify-content: space-between;
      height: .8rem;
      line-height: .8rem;
       border-radius: 0 0 .12rem .12rem ;

      >div{
          width: 50%;
          text-align: center;
       }
       >div:nth-of-type(2){
          background-color:#2F80ED;
          color: #fff;
          border-radius: 0 0 .12rem 0;
        }
    }
  }
}
</style>
