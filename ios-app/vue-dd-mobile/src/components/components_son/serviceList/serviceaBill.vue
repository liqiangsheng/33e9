<template>
  <div class="servicea_bill_box">
    <div>
      <C_header left_show="true" right_show="true" center_text="服务清单"></C_header>
    </div>
    <div class="service_bill">
      <div class="service_bill_one">
        <span  @click="work_list_click" style="font-size:.26rem;">工单报备</span>
      </div>

      <div class="service_bill_two">
        <div class="service_bill_two_son">
          <div></div>
          <div style="font-size: .3rem;">账单发送成功</div>
          <div style="font-size:.24rem;">请耐心等待用户完成付款</div>
        </div>
      </div>

      <!--<div class="service_bill_three">-->
      <!--<div @click="receipt_click">代收说明</div>-->
      <!--<div v-if="receipt">-->
      <!--<textarea placeholder="请输入代收说明" v-model="user_textarea"></textarea>-->
      <!--<span>还可以输入{{100-result}}字符</span>-->
      <!--</div>-->
      <!--<div v-if="receipt">-->
      <!--<button :disabled="receipt_btn" :class="{'active':!receipt_btn}"  @click="receipt_btn_click">确定</button>-->
      <!--</div>-->
      <!--</div>-->

      <div class="service_bill_four">
        <div class="service_bill_four_title" @click="allow_show_click" style="padding:0 .1rem">
          <span>待收款<i>￥{{dai_shou_kuan_data.toFixed(2)}}/元</i></span>
          <span>查看明細<i v-if="allow_upper_show" style="">△</i><i v-if="allow_lower_show">∨</i></span>
        </div>
        <div v-if="allow_lower_show">
          <div class="job_list">
            <div class="job_list_number">
              <span>工单号：2017251525555415</span>
              <span @click="revise_the_bill_click">修改账单</span>
            </div>
            <div class="job_list_number_details">
              <div>空调维修</div>
              <div class="bill_details">
                <span>维修费</span>
                <span>￥200</span>
              </div>
              <div class="bill_details">
                <span>配件费</span>
                <span>￥200</span>
              </div>
              <div class="bill_details">
                <span>高空费</span>
                <span>￥200</span>
              </div>
            </div>
            <div class="job_list_number_totai">
              <div class="bill_details bill_details_color">
                <span>合计</span>
                <span>￥350</span>
              </div>
              <div class="bill_details bill_details_color">
                <span>已收款</span>
                <span>￥200</span>
              </div>
              <div class="bill_details bill_details_weight">
                <span>代收款</span>
                <span>￥200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  export default{
    data(){
      return{
        receipt:false, //代收说明显示
        receipt_btn:false, //代收说明确定按钮
        user_textarea:'', //textarea輸入框的v-model
        allow_upper_show:true,//向上箭头
        allow_lower_show:false,//向下箭头
        dai_shou_kuan_data:'',//代收款
      }
    },
    computed:{
      result:function(){
        return this.user_textarea.toString().replace(/\s/g,"").length;
      }
    },
    created(){

      let _this=this;
      _this.dai_shou_kuan_data=_this.$store.getters.dai_shou_kuan; //代收款给到 dai_shou_kuan_data

      if(_this.$store.getters.home_data.coremainorder){
        let id=_this.$store.getters.home_data.coremainorder.id;
        let dataReq={
          token:common.token(), //取store里的token
          mainOrderId:id, //当前的订单ID
        };
        _this.$axios.post(_this.$addressUrl+_this.$allUrl.dian_ji_gong_dan,dataReq).then(function(res) { //单个订单信息
          console.log("1232131231",res,"fdsfgsdfdsffffffffffffffffff");
          if(res.data.code=='0000'){

            if(res.data.result.serviceTotalWaitPay == 0){
//              _this.$router.push({name:'serviceSuccess'});
            }else{
              _this.dai_shou_kuan_data=res.data.result.serviceTotalWaitPay;
            }
          }
        });
      }
      console.log(_this.dai_shou_kuan_data,"ufgsdfsdfa85585222222222")
      common.sysmsgNewData(_this,common.token());//通知消息 res.data.result.token
    },
    watch:{
      user_textarea(newVal,oldVal){
        if(this.user_textarea.length!=0){
          this.receipt_btn=false;
        }else{
          this.receipt_btn=true;
        }
      }
    },
    methods:{
      receipt_click(){ //点击代收说明
        this.receipt=!this.receipt;
      },
      allow_show_click(){ //点击查看明细
        let _this=this;

        if(_this.$store.getters.home_data.coremainorder){
          let id=_this.$store.getters.home_data.coremainorder.id;
          let dataReq={
            token:common.token(), //取store里的token
            mainOrderId:id, //当前的订单ID
          };
          _this.$axios.post(_this.$addressUrl+_this.$allUrl.dian_ji_gong_dan,dataReq).then(function(res) { //单个订单信息
            console.log("单个订单信息再次拿",res,"hjxasfgjaskfgkjasfsdakjfkja");
            if(res.data.code=='0000'){
              _this.$store.dispatch('click_single_order',res.data.result);
              _this.$router.push({name:'orderDetails'});
            }
          });
        }

      },
      revise_the_bill_click(){
        this.$router.push({name:'serviceList'});
      },
      work_list_click(){ //工单报备点击按钮
        let _this=this;
        console.log(_this.$store.getters.home_data.coremainorder);
        if(_this.$store.getters.home_data.coremainorder){
          let id = _this.$store.getters.home_data.coremainorder.id;
          _this.$store.dispatch('order_report_id',id);
          _this.$router.push({name:'report',params: { address:'serviceBill' }});
        }
      },
      receipt_btn_click(){ //代收说明确定按钮
        console.log(this.user_textarea);
      }
    }
  }
</script>
<style scoped lang="scss">
  .active{
    background-color:#2F80ED !important;
  }

  .servicea_bill_box{
    height: 100%;
  }
  .service_bill{
    height: 93%;
    /*padding: 0 .2rem;*/
    background-color:#fff;
  }
  .service_bill_one{
    padding-top: .2rem;
    text-align: right;
  }
  .service_bill_one span{
    display: inline-block;
    height: .6rem;
    line-height: .6rem;
    /*font-size: .18rem;*/
    font-size: .22rem;
    padding:.03rem .4rem;
    /*padding: .08rem .3rem;*/
    color:#EE6D34;
    border-radius: .3rem;
    background-color:#FEEDDB;
  }

  .service_bill_two{
    margin-top: .8rem;
  }
  .service_bill_two .service_bill_two_son{

    div:nth-of-type(1){
      height: 2rem;
      background:url("../../../assets/images/billsend.png")center center no-repeat;
      -webkit-background-size:2rem;
      background-size:1.7rem;
    }
    div:nth-of-type(2){
      margin-top: .4rem;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
    }
    div:nth-of-type(3){
      height: .4rem;
      line-height: .4rem;
      font-size: 0.16rem;
      color: #D5D5D7;
      text-align: center;
    }
  }

  .service_bill_three{
    margin-top: .5rem;

    div:nth-of-type(1){
      height: .5rem;
      line-height: .5rem;
      color: #B1B1B1;
      border-bottom: .01rem solid #B1B1B1;
    }
    div:nth-of-type(2){
      margin-top: .1rem;
      height: 1rem;

      textarea{
        height: 100%;
        width: 100%;
        background-color:rgba(200,200,203,.5);
      }
      span{
        color: #9D9D9D;
        font-size: .16rem;
      }
    }
    div:nth-of-type(3){
      height: 1rem;
      text-align: right;

      button{
        margin-top: .2rem;
        width: 1.2rem;
        height: .6rem;
        line-height: .6rem;
        color: #fff;
        border-radius: .08rem;
        background-color:#C8C8CB;
      }
    }
  }

  .service_bill_four{
    padding-top:5.18rem;

    .service_bill_four_title{
      height: 1rem;
      line-height: 1rem;
      background-color:#E3E3E5;
      display: flex;
      justify-content:space-between;

      span:nth-of-type(2){

        i{
          display: inline-block;
          width: .4rem;
          height: .4rem;
          line-height: .4rem;
          margin-left: .16rem;
          text-align: center;
          border-radius: 50%;
          color: #fff;
          background-color:#C8C8CB;
        }
      }
    }
    /*账单列表*/
    .job_list{

      .job_list_number{
        height: .6rem;
        line-height: .6rem;
        display: flex;
        justify-content: space-between;
        border-bottom:.01rem solid #EAEAEA;

        span:nth-of-type(1){
          color:#9D9D9D;
        }
        span:nth-of-type(2){
          text-decoration: underline;
          color: #EB5718;
        }
      }
      .job_list_number_details{
        border-bottom: .01rem solid #E5E5E5;
        padding: 0 .12rem;

        div:nth-of-type(1){
          margin: .1rem 0 .08rem;
          font-size: .3rem;
          font-weight: 600;
        }
        .bill_details{
          height: .46rem;
          line-height: .46rem;
          display: flex;
          justify-content: space-between;
          color: #A8A8A8;
        }
      }
      .job_list_number_totai{
        margin-top: .2rem;
        padding: 0 .12rem;

        .bill_details_color{
          color:#9C9C9C;
        }
        .bill_details_weight{
          font-size: .3rem;
          font-weight: 600;
        }
        .bill_details{
          height: .46rem;
          line-height: .46rem;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>
