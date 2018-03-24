<template>
  <div class="work_order_box">
    <div class="work_order">
      <div class="work_order_one">
        <div>工单号：{{order_data.id || "无"}}</div>
        <div>{{order_data.fLabelBusiness}}</div>
      </div>

      <div class="work_order_two">
        <div>
          <div>
            <img src="../../assets/images/master_worker_face.png" alt="">
          </div>
        </div>
        <div  @click="work_order_details">
          <p>预约时间：{{order_data.appointmentDatetimeStr}}</p>
          <p>联系人：{{order_data.linkmanName}}</p>
          <!--<p>地址：{{order_data.linkmanDetails}}</p>-->
          <p>地址：{{order_data.linkmanArea + order_data.linkmanAddress}}</p>
          <!-- <p>故障描述：{{order_data.fLabelBusiness}}</p> -->
        </div>
      </div>

      <div class="work_order_three"  v-if="work_order_three_show">
        <!--<div  @click="contact_user(order_data.linkmanPhoneNum)" >联系用户</div>-->
        <div>
          <a :href="'tel:'+order_data.linkmanPhoneNum">联系用户</a>
        </div>
        <div @click="presenta_user">报备</div>
      </div>

    </div>
  </div>
</template>
<script>

  import common from '../../assets/js/common'
  export default{
    data(){
      return{
        work_order_three_show:true,  //联系用户和报备是否显示
      }
    },
//    props:["order_data"],
    props:{
      order_data: {
        type: Object,
        default: function () {
          return {
              id: '',
              fLabelBusiness:"",
              appointmentDatetimeStr:'',
              linkmanName:"",
              linkmanArea:"",
              linkmanAddress:"",
              linkmanPhoneNum:''
          }
        }
      },
    },
    components:{

    },
    created(){
      let _this=this;
      if(_this.$route.path=='/mainMenu/d_order'){
//        _this.work_order_three_show=false; //如果是订单页面就不显示报备
      }
      if(_this.$route.path=='/mainMenu/d_order' && _this.$store.getters.order_report_two=='two'){
        _this.work_order_three_show=true; //是今日订单就显示报备
      }
    },
    mounted(){

    },
    methods:{
      contact_user(tel){ //点击联系用户
        console.log("联系用户",tel);
      },
      presenta_user(){ //点击报备
        console.log("点击报备");
        this.$store.dispatch('order_report_id',this.order_data.id);
        this.$router.push({name:'report'});
      },
      work_order_details(){//订单详情
        let _this=this;
        let dataReq={
            token:common.token(), //取store里的token
            mainOrderId:_this.order_data.id, //当前的订单ID
          };
        _this.$axios.post(_this.$addressUrl+_this.$allUrl.dian_ji_gong_dan,dataReq).then(function(res) { //单个订单信息
          console.log("单个订单信息",res,"asddddddddddddddddddddddddd");
          if(res.data.code=='0000'){
            _this.$store.dispatch('click_single_order',res.data.result);
            _this.callback_router(_this);
          }
        });
      },
      callback_router(self){//路由跳转
        let _this=self;
        _this.$router.push({name:'orderDetails'});
      },
    }
  }
</script>
<style scoped lang="scss">
  .work_order{
    width: 94%;
    margin: 0 auto;
    font-size: .26rem;
    background-color:#fff;

    .work_order_one{
      height:.5rem;
      line-height: .5rem;
      display: flex;
      justify-content:space-between;
      /*padding: 0 .1rem;*/
    }
    .work_order_two{
      padding-top: .12rem;
      display: flex;

      div:nth-of-type(1){
        flex: 1;
        position: relative;
        div{
            position:absolute;
            left: .24rem;
            top:.2rem;
            border-radius: 50%;
            width:1.1rem;
            height:1.1rem;

            img{
              display: inline-block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
        }
      }
      div:nth-of-type(2){
        flex: 4;

        p{
          height: .5rem;
          line-height: .5rem;
        }
      }
    }
    .work_order_three{
        height: .9rem;
        line-height: .9rem;
        display: flex;

        div{
          text-align: center;
          border-top:.01rem solid #DCDCDC;
        }
        div:nth-of-type(1){
          flex: 1;
          border-right:.01rem solid #DCDCDC;
        }
        div:nth-of-type(2){
          flex: 1;
        }
    }
  }
</style>
