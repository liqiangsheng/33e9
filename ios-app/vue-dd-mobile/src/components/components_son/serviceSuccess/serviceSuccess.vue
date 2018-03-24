<template>
  <div >
    <div>
      <!--<C_header left_show="true" right_show="true"  center_text="服务清单" right_number="3"></C_header>-->
      <C_header  right_show="true"  center_text="服务清单" right_number="3"></C_header>
    </div>
    <div class="service_success">
      <div class="service_success_fabulous">
        <div></div>
      </div>
      <!--<div class="service_success_total">￥320</div>-->
      <div class="service_success_total_text">收款成功</div>
      <!--<div class="service_success_list">-->
      <!--<span>付款方式</span>-->
      <!--<span>线下收款</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>服务类别：</span>-->
      <!--<span>{{data_click_single_order.order.fLabelBusiness}}</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>描述原因：</span>-->
      <!--<span>{{data_click_single_order.order.fLabelBusiness || '无'}}</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>上门费</span>-->
      <!--&lt;!&ndash;<span>￥{{data_click_single_order.order.price1.toFixed(2)}}</span>&ndash;&gt;-->
      <!--<span>￥{{data_click_single_order.order.price1}}</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>服务费</span>-->
      <!--<span>￥{{(data_click_single_order.order.price2Sale || data_click_single_order.order.price2)}}</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>配件费</span>-->
      <!--<span>￥{{data_click_single_order.order.price3}}</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>高空费</span>-->
      <!--<span>￥{{data_click_single_order.order.price4}}</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>合计</span>-->
      <!--<span  v-if="data_click_single_order.order.price1 + data_click_single_order.order.price2Sale != 0">-->
      <!--￥{{(data_click_single_order.order.price1 + data_click_single_order.order.price2Sale)}}-->
      <!--</span>-->
      <!--<span v-else>-->
      <!--￥{{(data_click_single_order.order.price2 + data_click_single_order.order.price3 + data_click_single_order.order.price4)}}-->
      <!--</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>平台优惠</span>-->
      <!--<span>￥{{data_click_single_order.order.discountPrice}}</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>已付款</span>-->
      <!--<span>￥{{data_click_single_order.serviceTotalPay}}</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>应付款</span>-->
      <!--<span>-->
      <!--￥{{-->
      <!--(data_click_single_order.order.price1 + ( data_click_single_order.order.price2Sale != 0 ? data_click_single_order.order.price2Sale : data_click_single_order.order.price2 ) +-->
      <!--( data_click_single_order.order.price3+data_click_single_order.order.price4 ==  data_click_single_order.serviceTotalWaitPay ? data_click_single_order.serviceTotalWaitPay - data_click_single_order.serviceTotalPay :-->
      <!--data_click_single_order.serviceTotalWaitPay))-->
      <!--}}-->
      <!--</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>订单编号：</span>-->
      <!--<span>{{data_click_single_order.order.id}}</span>-->
      <!--</div>-->
      <!--<div class="service_success_list">-->
      <!--<span>下单时间：</span>-->
      <!--<span>{{data_click_single_order.order.createTimeStr}}</span>-->
      <!--</div>-->

      <div class="service_success_footer">
        <div class="service_success_footer_text">{{the_bottom}}秒后自动跳转首页</div>
        <div class="service_success_footer_btn" @click="jump_d_plate">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  export default{
    data(){
      return{
        data_click_single_order:{},
        the_bottom:4,//倒数数字
      }
    },
    created(){
      let _this=this;
      _this.data_click_single_order=_this.$store.getters.click_single_order;
    },
    mounted(){
      let _this=this;
      _this.setTime();

//          let loginStore=_this.$store.getters.login
//          common.d_plate_order(_this,common,loginStore,_this.again_home_data);//首页订单 res.data.result->login

      _this.$store.dispatch('home_data',null);   //把数据挂载到store上面  清空首页订单先，在去请求挂到store上面
      let loginStore=_this.$store.getters.login;
      common.d_plate_order(_this,common,loginStore,_this.again_home_data);//首页订单 res.data.result->login
    },
    methods:{
      again_home_data(){

      },
      jump_d_plate(){//确定按钮
        let _this=this;

        _this.$indicator.open('返回中...');

        setTimeout(function () {
          _this.$indicator.close();//关闭加载圈圈
          _this.$router.push({name:'d_plate'});
        },800);
      },
      setTime(){//定时器
        let _this=this;
        var getCodeClicked = false,timer=null;
        function show_img_up(){ //获取验证码倒计时
          if(getCodeClicked){
            return
          }
          var j=4;
          timer = window.setInterval(function(){ //定时器开始
            if(j>=0){
              _this.the_bottom=j;
              j--;
              if(j==1){//还有2秒的时候去请求首页订单
                _this.$store.dispatch('home_data',null);   //把数据挂载到store上面  清空首页订单先，在去请求挂到store上面

                let loginStore=_this.$store.getters.login
                common.d_plate_order(_this,common,loginStore,_this.again_home_data);//首页订单 res.data.result->login
              }
            }else{
              _this.$router.push({name:'d_plate'});
              window.clearInterval(timer);
            }
          },1000);
          getCodeClicked = true;
        };
        show_img_up();
      },
    }
  }
</script>
<style scoped lang="scss">
  .service_success{
    margin-top:1rem;

    .service_success_fabulous{

      >div{
        width: 2rem;
        height: 2rem;
        margin:0 auto;
        background:url("../../../assets/images/service_success.png")center center no-repeat;
        -webkit-background-size:1.5rem 1.5rem;
        background-size:1.5rem 1.5rem;
      }
    }

    .service_success_total{
      text-align: center;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      /*font:600  .36rem/1rem  #323232;*/
      font-size: .42rem;
      font-weight: 600;
      color:#323232;
    }
    .service_success_total_text{
      text-align: center;
      color: #AAAAAA;
      height:.4rem;
      line-height: .4rem;
    }
    .service_success_list{
      display: flex;
      justify-content: space-between;
      height: .4rem;
      line-height: .4rem;
      font-size: .26rem;
      color:#AAAAAA;
      padding: 0 .2rem;
    }

    .service_success_footer{
      margin-top: 2rem;

      .service_success_footer_text{
        text-align: center;
      }
      .service_success_footer_btn{
        margin: 0 auto;
        margin-top: .3rem;
        text-align: center;
        width:1.8rem;
        height: .8rem;
        line-height: .8rem;
        border-radius:.08rem;
        color: #fff;
        background-color:#2F80ED;
      }
    }
  }
</style>
