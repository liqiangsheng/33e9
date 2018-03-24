<template>
  <div class="work_order_box">
    <div class="work_order">
      <div class="work_order_one">
        <div>工单号：{{order_data.order.id || "无"}}</div>
        <div>{{order_data.order.fLabelBusiness}}</div>
      </div>

      <div class="work_order_two">
        <div>
          <div>
            <img src="../../assets/images/master_worker_face.png" alt="">
          </div>
        </div>
        <div  @click.stop="work_order_details(order_data.order.id)">
          <p>预约时间：{{order_data.order.appointmentDatetimeStr}}</p>
          <p>联系人：{{order_data.order.linkmanName}}</p>
          <!--<p>地址：{{order_data.linkmanDetails}}</p>-->
          <p>地址：{{order_data.order.linkmanArea + order_data.order.linkmanAddress}}
            <!--<span v-if="order_report_two == 'two'"  @click.stop="click_map(order_data.order.linkmanDetails)" style="color: #116DEA;">-地图</span>-->
          </p>
          <!-- <p>故障描述：{{order_data.order.fLabelBusiness}}</p> -->
        </div>
      </div>

      <div class="work_order_three"  v-if="work_order_three_show">
        <!--<div  @click="contact_user(order_data.order.linkmanPhoneNum)" >-->
        <div>
          <a :href="'tel:'+order_data.order.linkmanPhoneNum">联系用户</a>
        </div>
        <div @click="presenta_user">报备</div>
      </div>

    </div>
  </div>
</template>
<script>

  import common from '../../assets/js/common'
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
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
            id: '无',
            fLabelBusiness:"无",
            appointmentDatetimeStr:'无',
            linkmanName:"无",
            linkmanArea:"无",
            linkmanAddress:"无",
            linkmanPhoneNum:'无',
          }
        }
      },
    },
    computed:{
      ...mapGetters([  //是否是今日订单 'two'
        "order_report_two",
        "order_report_three"
      ])
    },
    components:{

    },
    created(){
      let _this=this;
    },
    mounted(){
      let _this=this;
      if(_this.$route.path=='/mainMenu/d_order') {
        _this.work_order_three_show = true; //如果是订单页面并且是已完成就不显示报备
      }
      if(_this.$route.path =='/userList/historyOrder'){
        _this.work_order_three_show=false; //如果是历史订单页面就不显示报备
      }
      if(this.$store.getters.order_report_three == 'three'){
        this.work_order_three_show=false;
      }else{
        this.work_order_three_show=true;
      }
    },
    watch:{
      order_report_three(newVal,oldVal){
        if(newVal == "three") {
          this.work_order_three_show = false; //如果是订单页面已完成就不显示报备
        }else{
          this.work_order_three_show = true;
        }
        if(oldVal=="one"){
          this.work_order_three_show = true;
        }
      }
    },
    methods:{
      contact_user(tel){ //点击联系用户
        console.log("联系用户",tel);
      },
      presenta_user(){ //点击报备
        console.log("点击报备");
        this.$router.push({name:'report'});
      },
      work_order_details(id){//订单详情
        let _this=this;
        let dataReq={
          token:common.token(), //取store里的token
          mainOrderId:id, //当前的订单ID
        };
        _this.$axios.post(_this.$addressUrl+_this.$allUrl.dian_ji_gong_dan,dataReq).then(function(res) { //单个订单信息
          console.log("单个订单信息",res);
          if(res.data.code=='0000'){
            _this.$store.dispatch('click_single_order',res.data.result);
            _this.$router.push({name:'orderDetails'});
          }
        });
      },

      click_map(address){//点击地图
        console.log(address);
        window.open('https://uri.amap.com/search?keyword='+address)
      },
    }
  }
</script>
<style scoped lang="scss">
  .work_order_box{
    margin-bottom: .2rem;
  }
  .work_order{
    width: 94%;
    margin: 0 auto;
    font-size: .26rem;
    border-radius: .089rem;
    background-color:#fff;

    .work_order_one{
      height:.5rem;
      line-height: .5rem;
      display: flex;
      justify-content:space-between;
      padding: 0 .13rem;
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
