<template>
  <div>
    <div>
      <div>
        <C_header left_show="true" center_text="异常报备"></C_header>
      </div>
      <div>
        <div>
          <div class="report_list" v-for="(item,index) in reportList" :class="{'active':activeNum==item.number}" @click="reportListClick(item.number,item.text)">{{item.text}}</div>
        </div>
        <!-- 备注 carter修改-->
        <div class="report_input"> 
          <div>
            <textarea  maxlength ="100" v-model="report_value" placeholder="输入原因">,</textarea>
          </div>
          <!-- <span>还可以输入{{100-result}}字符</span> -->
        </div>
        <div class="report_btn">
          <C_button class="c_button"  btn_text="提交" :disabled_bool="btn_disabled" @callback_c_btn="btn"></C_button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import common from '../../../../assets/js/common'
  export default{
    data(){
      return{
        reportList:[{text:'已抵达,点不了开始服务',number:0},{text:'已抵达,用户家里没人',number:1},{text:'客户电话打不通,联系不到客户',number:2},{text:'用户要求更改服务时间',number:3},
          {text:'找不到配件,无法完成维修',number:4},{text:'不会修,无法完成维修',number:5},{text:'打通电话,用户取消工单',number:6},{text:'无法当场完成维修,待后续服务',number:7},
          {text:'其他',number:8}],
        activeNum:-1,
        // show:false,//输入框隐藏
        report_value:'',//输入原因的value
        req_text:'',//发送给后台的文字
        btn_disabled:'1',//按钮是否能点击
      }
    },
    created(){
      let _this=this;
      console.log('query');
      console.log('$route.query.id',_this.$route.params);
//          if(_this.$route.params.address){ //如果有address说明是从订单清单页面跳过来的
//
//          }
      if(_this.$store.getters.order_report_two == 'two'){
        console.log(_this.reportList);
      }
//      if(_this.$route.path=='/serviceaBill'){
      if(_this.$route.params.address == 'serviceBill'){
        _this.reportList=[{text:'已收现金',number:0},{text:'已抵达,用户家里没人',number:1},{text:'客户电话打不通,联系不到客户',number:2},{text:'用户要求更改服务时间',number:3},
          {text:'找不到配件,无法完成维修',number:4},{text:'不会修,无法完成维修',number:5},{text:'打通电话,用户取消工单',number:6},{text:'无法当场完成维修,待后续服务',number:7},
          {text:'已抵达,点不了开始服务',number:8},{text:'其他',number:9}];
      }
    },
    watch:{
      'router':function (to,form) {
        console.log('router123',to, form);
      },
      req_text(newVal,oldVal){
        if(newVal!=''){
          this.btn_disabled='2';
        }
      },
      report_value(newVal,oldVal){
        if(newVal!=''){
          this.btn_disabled='2';
        }
      },
    },
    computed:{
      result:function(){
        return this.report_value.toString().replace(/\s/g,"").length;
      },
//      'router':function (to,from) {
//        console.log('路由123',to, from);
//      }
    },
    methods:{
      reportListClick(index,text){
        this.activeNum=index;
        // if(text=='已收现金' || text=='其他'){
        //   this.show=true;
        // }else{
        //   this.show=false;
        // }
        this.req_text=text;
      },
      btn(number,text){
        let _this=this;

        if(_this.activeNum==-1){
          _this.$toast('请选择报备条件');
          return false
        }
        if(_this.req_text=='其他'){
          if(_this.report_value==''){
            _this.$toast('请填写相关信息');
            return false
          }
        }

        _this.$indicator.open('报备中...');

        let dataReq={
          mainOrderId:_this.$store.getters.order_report_id,
          reasonOfComplaint:_this.req_text+_this.report_value,
          token:common.token()
        };
        console.log(dataReq);
        if(_this.reportList[0].text == '已收现金' && _this.activeNum == 0){
          common.req_order_report_offline(_this,dataReq,_this.report_req);//线下结款
        }else{
          common.req_order_report(_this,dataReq,_this.report_req);//非线下结款
        }
      },
      report_req(self,data){//发送订单报备后的回调
        let _this=self;

        _this.$indicator.close();//关闭加载圈圈

        console.log("订单报备回调",data);
        if(data.data.code != '0000'){
          _this.$toast(data.data.error);
          return
        }
        if(data.data.code == '0000'){
          _this.$toast('报备成功');
          console.log(data.data)
        }

        common.d_plate_order_report(_this,common,_this.d_plate_href);//首页订单

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
      },
      d_plate_href(self,data){//报备回调
        let _this=self;
        console.log('报备后回调的首页订单请求',data);
        _this.$router.push({name:'d_plate'});//跳转到叮板

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

        common.sysmsgNewData(_this,common.token());//通知消息 res.data.result.token
      },
    }
  }
</script>
<style scoped>
  .active{
    color:#26a2ff;
  }
  .report_list{
    width: 98%;
    height: .8rem;
    line-height: .8rem;
    background-color:#fff;
    margin-top:.15rem;
    padding-left: 2%;
  }
  .report_input{
    width: 100%;
    height: 1.8rem;
    /*line-height: .8rem;*/
    margin-top:.15rem;
  }
  .report_input>div{
    width: 100%;
    height:100%;
    margin: 0 auto;
  }
  .report_input>div textarea{
    font-size: .32rem;
    width: 100%;
    height:100%;
    font-size: .32rem;
  }
  /* .report_input>span{
    display: inline-block;
    width:98%;
    height: .5rem;
    padding-right: 2%;
    font-size:.16rem;
    text-align: right;
    占满一行在换行
    white-space:pre;
  } */
  .report_btn{
    margin-top: 1rem;
  }
</style>
