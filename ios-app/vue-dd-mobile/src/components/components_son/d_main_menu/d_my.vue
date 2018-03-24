<template>
  <div class="c_my">

    <router-view></router-view>

    <div class="c_my_header">
      <div></div>
      <div>
        <div class="user_img">
          <img src="../../../assets/images/master_worker_face.png" alt="">
        </div>
        <div class="user_name">
          {{login.name}}
        </div>
        <div class="user_address">
          {{login.city}}
        </div>
      </div>
      <div>
        <span @click="user_data_click">个人资料</span>
      </div>
    </div>

    <div class="statistics">
      <div>
        <p>{{login.applauseRate}}%</p>
        <p>好评率</p>
      </div>
      <div>
        <p>{{login.allOrderCount}}</p>
        <p>累计单</p>
      </div>
      <div>
        <p>{{login.completeRate}}%</p>
        <p>完成率</p>
      </div>
    </div>

    <div class="user_list">
      <!-- <div @click="leave_click">
        <div>
          <span></span>
          <span>请假</span>
        </div>
        <div>＞</div>
      </div> -->
      <div  @click="historical_order">
        <div>
          <span></span>
          <span>历史订单</span>
        </div>
        <div>＞</div>
      </div>
      <div @click="call_service">
        <div>
          <span></span>
          <span>联系客服</span>
        </div>
        <div>＞</div>
      </div>
      <div @click="common_problem">
        <div>
          <span></span>
          <span>常见问题</span>
        </div>
        <div>＞</div>
      </div>
      <!-- <div @click="feedback">
        <div>
          <span></span>
          <span>意见反馈</span>
        </div>
        <div>＞</div>
      </div> -->
      <div @click="about_click">
        <div>
          <span></span>
          <span>关于叮叮</span>
        </div>
        <div>＞</div>
      </div>

    </div>

  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  import { MessageBox } from 'mint-ui';  //单独引入弹出提示框
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default{
    data(){
        return{

        }
    },
    computed:{
      ...mapGetters([
        'login'
      ])
    },
    created(){
        let _this=this;
      let home_data=_this.$store.getters.home_data;
      console.log('检测登陆',(!home_data));

      if((!home_data)&&localStorage.getItem("dd_local_tel"))
      {
        // console.log('relogin',home_data);
        //common.relogin(_this,common);

       _this.$router.push({name:'login'});
      }
      else
      {
 /*
       * 2018-01-09
       * 1._this 传入this作用域
       * 2.type类型， token, paheNo几页, pageSize多少条
       * */
      common.order_history_request1(_this,common.order_history_request_dataReq(common,'1',1,20));
      common.order_history_request2(_this,common.order_history_request_dataReq(common,'2',1,20));
      common.order_history_request3(_this,common.order_history_request_dataReq(common,'3',1,20));
      common.order_history_request4(_this,common.order_history_request_dataReq(common,'4',1,20));
      common.order_history_request5(_this,common.order_history_request_dataReq(common,'5',1,20));
      }


    },
    components:{

    },
    methods:{
      user_data_click(){ //个人资料
        console.log("个人资料");
        this.$router.push({name:'personalData'});
      },
      // leave_click(){ //请假
      //   console.log("请假");
      //   this.$router.push({name:'leave'});
      // },
      historical_order(){ //历史订单
        console.log("历史订单");
        this.$router.push({name:'historyOrder'});
      },
      call_service(){ //联系客服
        console.log("联系客服");
        MessageBox({
          title: '4009991891',
          message: '立即叮叮快修客服热线',
          showCancelButton: true,
          confirmButtonText:'立即拨打',
//          confirmButtonText:"<a href='tel:4009991891'>立即拨打</a>",
          cancelButtonText:'暂不需要',
        });

        document.querySelector(".mint-msgbox-confirm").innerHTML="<a style='color:#26a2ff;' href='tel:4009991891'>立即拨打</a>";
      },
      common_problem(){ //常见问题
        console.log("常见问题");
        this.$router.push({name:'commonProblem'});
      },
      // feedback(){ //意见反馈
      //   console.log("意见反馈");
      //   this.$router.push({name:'feedback'});
      // },
      about_click(){ //关于叮叮
        console.log("关于叮叮");
        this.$router.push({name:'aboutSystem'});
      },

    }
}
</script>
<style scoped lang="scss">

.c_my{
  height: 100%;
  padding-bottom: 1rem;
  background:#ECECEC;

  .c_my_header{
    background-image: linear-gradient(-180deg, #56CCF2 0%, #2F80ED 100%);
    padding: .3rem 0;
    display: flex;
    height:2.8rem;

    >div{
      flex: 1;

      text-align: center;
    }
    div:nth-of-type(2){

      >div{
         display: flex;
         align-items: center;
         justify-content: center;
         color: #fff;
       }
      .user_img{
        height: 50%;

        img{
          display: inline-block;
          width: 1rem;
          height: 1rem;
          margin: 0 auto;
        }
      }
      .user_name{
        font-size: .36rem !important;
        height:25%;
      }
      .user_address{
        font-size: .3rem;
        height: 25%;
      }
    }
    div:nth-of-type(3){
      position:relative;

      span{
        display: inline-block;
        width: 1.5rem;
        height: .6rem;
        line-height: .6rem;
        font-size: .25rem;
        padding: .05rem 0;
        border-radius: .6rem 0 0 .6rem;
        position: absolute;
        top:.03rem;
        right: 0rem;
        color: #fff;
        background-color:#56CCF2;
      }
    }
  }

  .statistics{
    height: 1.4rem;
    display: flex;
    border-bottom: .3rem solid #ECECEC;
    background-color:#fff;

    >div{
      flex: 1;
      align-items:center;
      justify-content: center;

      p{
        text-align: center;
      }
      p:nth-of-type(1){
        margin:.2rem 0;
        height: .5rem;
        line-height: .5rem;
        font-size:.4rem;
        color: #2F80ED;
      }
      p:nth-of-type(2){
        font-size: .22rem;
        color: #9B9B9B;
      }
     }
  }

  .user_list{
    /*margin-bottom:3rem;*/

    >div{
        display: flex;
        justify-content:space-between;
        height:.8rem;
        line-height: .8rem;
        /*border-top:.01rem solid #ECECEC;*/
        border-bottom:.01rem solid #ECECEC;
        background-color:#fff;
        padding-right: .2rem;

        >div:nth-of-type(2){
           color: gray;
         }

        span:nth-of-type(1){
          display: inline-block;
          width: .4rem;
          height: .4rem;
          margin-left: .2rem;
          vertical-align: middle;
        }
     }


      div:nth-of-type(1){
        span:nth-of-type(1){
          background: url('../../../assets/images/my_1.png')center center no-repeat;
          background-size:100% 100%;
        }
      }
      div:nth-of-type(2){
        span:nth-of-type(1){
          background: url('../../../assets/images/my_2.png')center center no-repeat;
          background-size:100% 100%;
        }
      }
      div:nth-of-type(3){
        span:nth-of-type(1){
          background: url('../../../assets/images/my_3.png')center center no-repeat;
          background-size:100% 100%;
        }
      }
      div:nth-of-type(4){
        span:nth-of-type(1){
          background: url('../../../assets/images/my_4.png')center center no-repeat;
          background-size:100% 100%;
        }
      }
      div:nth-of-type(5){

        span:nth-of-type(1){
          background: url('../../../assets/images/my_5.png')center center no-repeat;
          background-size:100% 100%;
        }
      }
      div:nth-of-type(6){

        span:nth-of-type(1){
          background: url('../../../assets/images/my_6.png')center center no-repeat;
          background-size:100% 100%;
        }
      }
  }
}

</style>
