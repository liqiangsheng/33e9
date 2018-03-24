<template>
  <div>
    <div>
      <C_header left_show="true" center_text="订单详情"></C_header>
    </div>
    <div class="order_details_main">
      <div class="order_details_main_one">
        <p>
          <span>服务类别：</span>
          <span>{{data_click_single_order.order.fLabelBusiness}}</span>
        </p>
        <p>
          <span>服务时间：</span>
          <span>{{data_click_single_order.order.appointmentDatetimeStr}}</span>
        </p>
        <p>
          <span>服务地址：</span>
          <span>{{data_click_single_order.order.linkmanArea + data_click_single_order.order.linkmanAddress}}</span>
        </p>
        <p>
          <span>服务电话：</span>
          <span>{{data_click_single_order.order.linkmanName}}</span>
        </p>
        <p>
          <span>遗留原因：</span>
          <span>{{data_click_single_order.order.abnormalHangUpRemark || '无'}}</span>
        </p>
      </div>

      <div class="order_details_main_two">
        <div class="main_two_flex details_height" v-for="(item,index) in data_click_single_order.services" key="index">
          <div class="details_lineheight" >{{item.serviceFullName}}</div>
          <!--<div>{{item.price2Sale}}</div>-->
          <!--<div>{{item.price2Original}}</div>-->
          <!--<div>{{item.price2Original}}</div>-->
          <!--<div>{{item.price2Discount}}</div>-->
          <!--<div>{{item.price2Sale}}</div>-->
          <div>
            <!--<p>{{item.price2.toFixed(2)}}</p>-->
            <p>{{!item.price2Sale || item.price2Sale == 0 ? (item.price2Original && item.price2Discount ? item.price2Original * item.price2Discount : 0).toFixed(2)  : item.price2Sale.toFixed(2)}}</p>
            <p>×{{item.serviceSize}}</p>
          </div>
        </div>
        <!--<div class="main_two_flex" v-if="data_click_single_order.order.price1">-->
        <div class="main_two_flex">
          <span>上门费</span>
          <span>￥{{data_click_single_order.order.price1.toFixed(2)}}</span>
        </div>
        <div class="main_two_flex">
          <span>服务费</span>
          <span>￥{{(data_click_single_order.order.price2Sale || data_click_single_order.order.price2).toFixed(2)}}</span>
        </div>
        <div class="main_two_flex" v-if="data_click_single_order.order.price3">
          <span>配件费</span>
          <span>￥{{data_click_single_order.order.price3.toFixed(2)}}</span>
        </div>
        <div class="main_two_flex" v-if="data_click_single_order.order.price4">
          <span>高空费</span>
          <span>￥{{data_click_single_order.order.price4.toFixed(2)}}</span>
        </div>
        <div class="main_two_flex details_height details_lineheight details_border">
          <span>合计</span>
          <span v-if="data_click_single_order.order.price1 + data_click_single_order.order.price2Sale != 0">
              <!--￥{{(data_click_single_order.order.price1 + data_click_single_order.order.price2Sale).toFixed(2)}}-->
              ￥{{total_price_box}}
            </span>
          <span v-else>
              ￥{{(data_click_single_order.order.price2 + data_click_single_order.order.price3 + data_click_single_order.order.price4).toFixed(2)}}
            </span>
        </div>
        <div class="main_two_flex" v-if="data_click_single_order.order.discountPrice">
          <span>平台优惠</span>
          <span>￥{{data_click_single_order.order.discountPrice.toFixed(2)}}</span>
        </div>
        <div class="main_two_flex">
          <span>已付款</span>
          <span>￥{{data_click_single_order.serviceTotalPay.toFixed(2)}}</span>
        </div>
        <div class="main_two_flex details_height details_lineheight">
          <span>应付款</span>
          <span class="details_height_total">
              ￥{{payment_should_be_text}}
            <!--{{-->
            <!--((click_single_order.order.price1+(click_single_order.order.price2Sale || click_single_order.order.price2)+-->
            <!--click_single_order.order.price3+click_single_order.order.price4) == click_single_order.serviceTotalWaitPay ?-->
            <!--click_single_order.serviceTotalWaitPay - click_single_order.serviceTotalPay :-->
            <!--click_single_order.serviceTotalWaitPay).toFixed(2)-->
            <!--}}-->
            </span>
        </div>
      </div>

      <div class="order_details_main_three">
        <div>
          <span>订单编号：</span>
          <span>{{data_click_single_order.order.id}}</span>
        </div>
        <div>
          <span>下单时间：</span>
          <span>{{data_click_single_order.order.createTimeStr}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  export default{
    data(){
      return{
        data_click_single_order:{},
        total_price_box:0,//合计
        payment_should_be_text:'',//应付款
      }
    },
    created(){
      let _this=this;

//        this.$nextTick(function () {
      _this.data_click_single_order=_this.$store.getters.click_single_order;

      _this.total_computed();
      _this.service_total_price();
      _this.payment_should_be();
//        });
    },
    computed:{
      ...mapGetters([
        'click_single_order' //点击单个订单
      ])
    },
    methods:{
      total_computed(){//合计
        let _this=this;
        console.log('合计');
        let data=_this.data_click_single_order;
        console.log(data.order.price1);
        console.log(data.order.price2Sale != 0 ? data.order.price2Sale : data.order.price2);
        console.log(data.order.price3 + data.order.price4 == data.serviceTotalWaitPay ? data.serviceTotalWaitPay - data.serviceTotalPay : data.serviceTotalWaitPay);
      },
      service_total_price(){//合计
        let _this=this;
        let a=_this.$store.getters.click_single_order.order.price1, //上门费
          b=_this.$store.getters.click_single_order.order.price2Sale || data_click_single_order.order.price2, //服务费
          c=_this.$store.getters.click_single_order.order.price3,//配件费
          d=_this.$store.getters.click_single_order.order.price4; //高空费
//                e=_this.$store.getters.click_single_order.order.services[0].price2;//常见故障
        let a_price,b_price,c_price,d_price,e_price;
        let price_total=0;
        if(a && a != ''){
          a_price=a;
        }
        if(b && b != ''){
          b_price=b;
        }
        if(c && c!=''){
          c_price=c;
        }
        if(d && d != ''){
          d_price=d;
        }
//                if(e && e != ''){
//                  e_price=e;
//                }
//                price_total=(a_price || 0)+(b_price || 0)+(c_price || 0)+(d_price || 0) +(e_price || 0);
        price_total=(a_price || 0)+(b_price || 0)+(c_price || 0)+(d_price || 0);
        _this.total_price_box=price_total.toFixed(2);
      },
      payment_should_be(){ //应付款
        let _this=this;
        let a, b, c, d, e, f, g;
        let shanMen=0,fuWu=0,peiJian=0,gaoKong=0,jieGuo=0; //上门，服务，配件，高空
        a=_this.$store.getters.click_single_order.order.price1; //上门费 不等于null
        b=_this.$store.getters.click_single_order.order.price2Sale;//服务费  不等于null
        c=_this.$store.getters.click_single_order.order.price2;
        d=_this.$store.getters.click_single_order.order.price3;//配件费  不等于null
        e=_this.$store.getters.click_single_order.order.price4;//高空费  不等于null
        f=_this.$store.getters.click_single_order.serviceTotalWaitPay; //待付款
        g=_this.$store.getters.click_single_order.serviceTotalPay;//已付款

        if(a && a != ''){//上门费
          shanMen=a;
        }
        if(b && b != ''){//服务费
          fuWu = b;
        }else{
          fuWu = c;
        }
        if(d && d != ''){//配件
          peiJian = d;
        }
        if(e && e != ''){//高空
          gaoKong = e;
        }
        if(( shanMen + fuWu + peiJian + gaoKong ) == f){
          jieGuo = f - g;
        }else{
          jieGuo = f;
        }
        console.log((shanMen + fuWu + peiJian + gaoKong),"11111");
        console.log(f,"222222");
        console.log('订单详情的结果',jieGuo);
        _this.payment_should_be_text = jieGuo;
      },
    }
  }
</script>
<style scoped>
  .order_details_main{
    background-color:#ECECEC;
  }
  .order_details_main .order_details_main_one,
  .order_details_main .order_details_main_two{
    background-color:#fff;
  }

  .order_details_main .order_details_main_one p{
    height: .8rem;
    line-height: .8rem;
    padding-left: .2rem;
    /*background-color:red;*/
  }
  .order_details_main .order_details_main_two{
    margin-top: .3rem;
  }
  .order_details_main .order_details_main_two .main_two_flex{
    display: flex;
    justify-content:space-between;
    height: .5rem;
    line-height: .5rem;
    padding: 0 .2rem;
    font-size: .28rem;
  }
  .order_details_main .order_details_main_two .details_height{
    height:.9rem;
    font-size: .28rem;
    /*background-color:yellow;*/
  }
  .order_details_main .order_details_main_two .details_height div:nth-of-type(2){
    height: .45rem;
    line-height: .45rem;
  }
  .order_details_main .order_details_main_two .details_height  .details_height_total{
    color:#79ADEC;
  }
  .order_details_main .order_details_main_two  .details_lineheight{
    line-height: .9rem;
    overflow: hidden;
  }
  .order_details_main .order_details_main_two  .details_border{
    margin-bottom: .01rem;
  }

  /* .order_details_main_three{

  } */
  .order_details_main_three div{
    height: .5rem;
    line-height: .5rem;
    font-size: .24rem;
    padding-left: .2rem;
  }
</style>
