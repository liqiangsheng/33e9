<template>
  <div class="d_plate">
    <!--<keep-alive>-->
    <div class="">
      <div class="d_plate_one">
        <!--<span @click="weixin_click">-->
        <span>
              <!--{{-->
          <!--home_order_number.coremainorder.state == '05' ? '开始上工' : home_order_number.coremainorder.state == '06' ? '待抵达' : home_order_number.coremainorder.state == '07' ? '拍照'-->
          <!--: home_order_number.coremainorder.state == '07' ? '服务完成' : home_order_number.coremainorder.state == '10' ? '服务完成' : home_order_number.coremainorder.state == '11' ? '确认账单'-->
          <!--: '请联系客服'-->
          <!--}}-->
              {{title_text}}
            </span>
      </div>
      <div class="d_plate_two">
        <div class="d_plate_two_flex">
          <div>{{login_data.complainOrder || 0}}</div>
          <div>今日单量</div>
        </div>
        <div class="d_plate_two_flex">
          <div>{{login_data.completeCount || 0}}</div>
          <div>完成单量</div>
        </div>
        <!--<div class="d_plate_two_flex">-->
        <!--<div>10</div>-->
        <!--<div>今日单量</div>-->
        <!--</div>-->
        <!--<div class="d_plate_two_flex">-->
        <!--<div>10</div>-->
        <!--<div>今日单量</div>-->
        <!--</div>-->
      </div>
      <div class="d_plate_three">
        <div  @click="today_done">
            <span>
              今日待办
              <!--<span class="done_number">12</span>-->
            </span>
        </div>
        <div></div>
        <div @click="parts_price_list">配件价格表</div>
      </div>

    </div>

    <div>
      <div class="d_plate_four">
        <C_order  v-if="home_order_number.coremainorder" :order_data="home_order_number.coremainorder ? home_order_number.coremainorder  : null"></C_order>
        <div v-else class="no_order" style="margin-top:-.2rem;">
          <c_no_order></c_no_order>
        </div>
      </div>

      <div class="d_plate_five" v-if="home_order_number.coremainorder" >
        <div @click="masterClick('点击')">
          <!--{{home_order_number.coremainorder.state == '05' ? '开始上工' : home_order_number.coremainorder.state == '06' ? '待抵达' : home_order_number.coremainorder.state == '07' ? '拍照'-->
          <!--: home_order_number.coremainor-->
          {{master_text}}
        </div>
        <div  @click="masterClick('跳过')" v-if="master_text_show && home_order_number.coremainorder" style="padding-bottom:.3rem;padding-top:.15rem;text-align: center;">
          跳过
        </div>
      </div>
    </div>



    <!--</keep-alive>-->
  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  import weiXinCommon from '../../../assets/js/weixinIMG'
  export default{
    data(){
      return{
        login_data:{},//登录拿到的信息有今日单量之类
        home_order_number:{},//首页订单
        master_text:'开始上工',
        serviceId_data:[],
        linkmanAreaId_data:[],
        title_text:'空闲中',//订单状态

        master_text_show:false,//如果是拍照就显示
      }
    },
    computed:{
      ...mapGetters([  //首页订单的数据
        "home_data",
      ])
    },
    created(){

      let _this=this;
      let home_data=_this.$store.getters.home_data;
      console.log('检测登陆',(!home_data));

      if((!home_data)&&localStorage.getItem("dd_local_tel"))
      {
        // console.log('relogin',home_data);

        common.relogin(_this,common,_this.d_plate_href);
         //setTimeout(()=>{
           _this.$router.push({name:'login'});
        // },1)

      }else
      {
        _this.initdata();
      }


    },

    beforeRouteUpdate(){
      let _this=this;
      _this.home_order_number=_this.$store.getters.home_data; //把home_data给home_order_number
      _this.state_home_data();//查看状态然后现在不同的内容
    },
    mounted(){
      let _this=this;
      _this.home_order_number=_this.$store.getters.home_data; //把home_data给home_order_number

      _this.state_home_data();//查看状态然后现在不同的内容
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
    computed:{

    },
    watch:{
      home_data(newVal,oldVal){
        let _this=this;
        _this.state_home_data();//查看状态然后现在不同的内容
      },
      master_text(newVal,oldVal){
        let _this=this;
        if(newVal=='拍照'){ //如果字显示是拍照就显示跳过
          _this.master_text_show=true;
        }else{
          _this.master_text_show=false;
        }
        if(newVal == '抵达维修点' || newVal == '拍照' || newVal == '服务完成' || newVal == '确认账单' ){
          _this.title_text='服务中';
        }else{
          _this.title_text='空闲中';
        }
      },

    },
    components:{

    },
    methods:{
      again_home_data(self,res,login_res){//再次请求首页订单
        let _this=self;
        console.log('首页订单的再次请求d_plate',res);
      },
//      isWeiXin(){//识别微信
//         var ua = window.navigator.userAgent.toLowerCase();
//         if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//           return true;
//         }else{
//           return false;
//         }
//      },
      weixin_config(self){
        let _this=self;

        //微信的config s
        let data=_this.$store.getters.weiXinAppid;
        data.timestamp=data.timestamp+'';
        console.log('微信的config',data);
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp:data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['chooseImage', 'uploadImage','downloadImage']
        });
        //微信的config e
      },
      weixin_click(){
        var _this=this;
        //拍照s
        wx.chooseImage({
          count: 1,//默认9
          sizeType: ['original', 'compressed'],//可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera'],//可以指定来源是相册还是相机，默认二者都有 ['album', 'camera']
          success: function (res){
            console.log('11111');
            var localIds = res.localIds;//返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            if(localIds){
              _this.weixin_click_shang_chuan(localIds.toString(),_this);
              _this.master_text='服务完成';
            }
          }
        });
        //拍照e
      },
      weixin_click_shang_chuan(localIds){
        let _this=this;
        //上传图片到服务器s
        wx.uploadImage({
          //localId: localIds.toString(),
          localId: localIds,
          // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId;// 返回图片的服务器端ID
            _this.weixin_click_xia_zai(serverId.toString());
          },
          fail:function () {
            alert('拍照失败，请刷新重试');
            return false;
          }
        });
        //上传图片到服务器e
      },
      weixin_click_xia_zai(serverId){
        console.log('微信下载img',serverId);

        let _this=this;
        //下载图片到本地服务器s
        let url='';
//        _this.$axios.post(url,{img:serverId}).then(function (res) {
//          console.log('下载图片到本地服务器',res);
//        });
        //下载图片到本地服务器e


      },
      today_done(){ //点击今日待办
        console.log("今日待办");
        this.$router.push({name:'d_order'});
      },
      parts_price_list(){ //点击配件价格表
        console.log("配件价格表");
        this.$router.push({name:'equipmentPrice'});
      },
initdata(){
       let loginStore=_this.$store.getters.login;


      if(_this.$store.getters.home_data){//如果没有首页订单就去请求
        console.log('有首页订单', 'serviceList');
        common.d_plate_order(_this,common,loginStore,_this.again_home_data);//首页订单 res.data.result->login
      }else{
        console.log('没有首页订单', 'serviceList');
        common.d_plate_order(_this,common,loginStore,_this.again_home_data);//首页订单 res.data.result->login
      }

      _this.login_data=_this.$store.getters.login; //把login给login_data
      _this.home_order_number=_this.$store.getters.home_data; //把home_data给home_order_number

      _this.state_home_data();//查看状态然后现在不同的内容

      //拿微信的appid相关参数
      let dataReq_location_href={url:window.location.href.split('#')[0]};
      common.weixinAppid(_this,dataReq_location_href,_this.weixin_config);//微信

      common.sysmsgNewData(_this,common.token());//通知消息 res.data.result.token
    },
      state_home_data(){//每次进来的时候显示状态
        let _this=this;
        _this.home_order_number=_this.$store.getters.home_data;

        if(_this.home_order_number.coremainorder){
          console.log(_this.home_order_number.coremainorder.state);
          if(_this.home_order_number.coremainorder.state=='05'){
            _this.master_text='开始上工';
          }
          if(_this.home_order_number.coremainorder.state=='06'){
            _this.master_text='抵达维修点';
          }
          if(_this.home_order_number.coremainorder.state=='07'){
            _this.master_text='拍照';
//            if(common.isWeiXin()){//判断是否是微信浏览器
//              _this.weixin_click();//调取微信拍照
//            }
          }
          if(_this.home_order_number.coremainorder.state=='10'){
            _this.master_text='确认账单';

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
          if(_this.home_order_number.coremainorder.state=='11'){
            _this.master_text='确认账单';
          }
        }

        if(_this.$store.getters.login.workState){
          if(_this.$store.getters.login.workState == 'Leisure'){
            _this.title_text='空闲中';
          }
          if(_this.$store.getters.login.workState == 'Working'){
            _this.title_text='工作中';
          }
          if(_this.$store.getters.login.workState == 'BeOnLeave'){
            _this.title_text='请假中';
          }
        }
      },
      once_again_state_home_data(self,data){//每次进来的时候显示状态，再次点击
        console.log('回调的data111',data);
        let _this=self;
        if(data == '05'){
          _this.master_text='开始上工';
        }
        if(data == '06'){
          _this.master_text='抵达维修点';
        }
        if(data == '07'){
          _this.master_text='拍照';
//          if(common.isWeiXin()){//判断是否是微信浏览器
//            _this.weixin_click();//调取微信拍照
//          }
        }
        if(data == '10'){
          _this.master_text='服务完成';

          let dataReq={ //请求获取服务清单数据
            mainOrderId:_this.$store.getters.home_data.coremainorder.id,
            token:common.token(),
          };
          common.get_service_order(_this,dataReq,_this.get_order_list_callback); //请求获取服务清单
        }
        if(data == '11'){
          _this.master_text='确认账单';

          let loginStore=_this.$store.getters.login;
          _this.$router.push({name:'serviceaBill'});//如果状态是11就跳到清单页面
          common.d_plate_order(_this,common,loginStore,_this.again_home_data);//首页订单 res.data.result->login
        }
      },
      state_home_data_callback(self,data){ //给请求后回调的状态
        let _this=self;


        _this.$indicator.close();//关闭加载圈圈

        console.log('d_plate_给请求后回调的状态',self, data);
        _this.once_again_state_home_data(_this,data);
      },

      masterClick(data){ //点击开始上工按钮
        let _this=this;
//        _this.$indicator.open('提交中...');

      //  if(_this.master_text == '拍照' && data == '点击'){
      //    _this.$indicator.close();//关闭加载圈圈

      //    if(common.isWeiXin()){//判断是否是微信浏览器
      //      _this.weixin_click();//调取微信拍照
      //    }
      //    return false
      //  }
//        alert(data)
        let dataReq={
          coreMainOrder:{
            id:_this.home_order_number.coremainorder.id,
            masterId:_this.home_order_number.coremainorder.masterId,
            masterName :_this.home_order_number.coremainorder.masterName,
            state :_this.home_order_number.coremainorder.state,
          },
          token:common.token()
        };
//        console.log(_this.master_text,"zzzzzzzzzzz");

//        common.req_order_state(_this,dataReq,_this.state_home_data_callback);//修改订单状态

//        console.log(_this.master_text);
//        console.log(_this.home_order_number.coremainorder.state);

        if(data=="跳过"){
          common.req_order_state(_this,dataReq,_this.state_home_data_callback);//修改订单状态
        }else {
          if(_this.master_text != '拍照'){
            common.req_order_state(_this,dataReq,_this.state_home_data_callback);//修改订单状态
          }else if(_this.master_text == '拍照'){
            if(common.isWeiXin()){//判断是否是微信浏览器
            _this.weixin_click();//调取微信拍照
          }
            _this.once_again_state_home_data(_this,"07");
            _this.home_order_number.coremainorder.state='07';
          }
        }
//          let coremainorder_state_num=_this.home_order_number.coremainorder.state * 1;  //把'05','0','07','10','11'字符串变number类型
        if(_this.master_text == '抵达维修点' || _this.master_text == '拍照' || _this.master_text == '服务完成' || _this.master_text == '确认账单'){
          let dataReq={ //请求获取服务清单数据
            mainOrderId:_this.$store.getters.home_data.coremainorder.id,
            token:common.token(),
          };
          common.get_service_order(_this,dataReq,_this.get_order_list_callback); //请求获取服务清单
        }
        if(_this.master_text=='服务完成'){
//          _this.master_text ='确认账单';
//          _this.once_again_state_home_data(_this,"10");
//          _this.home_order_number.coremainorder.state='10';
          setTimeout(function () {
            _this.$indicator.close();//关闭加载圈圈
            _this.$router.push({name:'serviceList'});//跳转服务清单页面
          },1000);
        }
        if(_this.master_text == '确认账单'){
          console.log(_this.home_order_number.coremainorder.state);
          if(_this.home_order_number.coremainorder.state=='11'){
            let loginStore=_this.$store.getters.login;
            _this.$router.push({name:'serviceaBill'});//如果状态是11就跳到清单页面
            common.d_plate_order(_this,common,loginStore,_this.again_home_data);//首页订单 res.data.result->login
          }
        }else if(_this.home_order_number.coremainorder.state=='10'){
          _this.$store.getters.home_data.coremainorder.state='10';
          setTimeout(function () {
            _this.$indicator.close();//关闭加载圈圈
            _this.$router.push({name:'serviceList'});//跳转服务清单页面
          },1000);
        }




      },
      get_order_list_callback(self){ //先获取清单然后回调清单列表
        let _this=self;
        //请求服务清单价格列表参数
        if(_this.$store.getters.order_service_list!=null){
          //serviceId
          _this.$store.getters.order_service_list.services.map((arr,index)=>{
            _this.serviceId_data.push(arr.serviceId.substring(0, arr.serviceId.length - 3));
          });
          //linkmanAreaId
          _this.linkmanAreaId_data.push(_this.$store.getters.order_service_list.order.linkmanAreaId.substring(0,4));
          let dataReq={
            token:common.token(),
            labelId:_this.serviceId_data.join(""),
            areaId:_this.linkmanAreaId_data.join(""),
          };
          common.get_service_order_list(_this,dataReq,_this.get_service_order_list_callback);//请求服务清单价格列表

        }
      },
      get_service_order_list_callback(self){
        let _this=this;
        _this.coremainorder_state(_this);
      },
      coremainorder_state(self){ //根据请求的清单价格列表来跳转
        let _this=self
        if(_this.$store.getters.home_data.coremainorder){
          let coremainorder_state_num=_this.home_order_number.coremainorder.state * 1;  //把'05','0','07','10','11'字符串变number类型
          if(coremainorder_state_num == 10){

            _this.$indicator.close();//关闭加载圈圈

            _this.$router.push({name:'serviceList'});//跳转服务清单页面
          }
          if(coremainorder_state_num == 11){

            _this.$indicator.close();//关闭加载圈圈

            //待收款给 _this.service_list_total_collection
            _this.$store.dispatch('dai_shou_kuan',0);
            console.log('代收款存起来',_this.$store.getters.order_service_list.serviceTotalWaitPay);
            _this.$store.dispatch('dai_shou_kuan',_this.$store.getters.order_service_list.serviceTotalWaitPay);

            _this.$router.push({name:'serviceaBill'});//如果状态是11就跳到清单页面
            let loginStore=_this.$store.getters.login;
            common.d_plate_order(_this,common,loginStore,_this.again_home_data);//首页订单 res.data.result->login
          }
        }
      },


    }
  }
</script>
<style scoped lang="scss">
  .d_plate{
    position: relative;
    width:100%;
    height:100%;

    >div:nth-of-type(1){
      background: linear-gradient(-180deg, #56CCF2 0%, #2F80ED 100%) !important;
    }

    .d_plate_one{
      padding:.2rem;
      padding-top:.3rem;
      padding-bottom:.3rem;

      span{
        display: inline-block;
        height: .6rem;
        line-height: .6rem;
        padding:.025rem .38rem;
        border-radius:.3rem;
        font-size: .24rem;
        color: #fff;
        background-color:#A4DCF7;
      }
    }
    .d_plate_two{
      display: flex;

      .d_plate_two_flex{
        flex:1;
        color: #fff;
        text-align: center;

        div:nth-of-type(1){
          font-size: .32rem;
          height:.6rem;
          line-height: .6rem;
        }
        div:nth-of-type(2){
          font-size: .24rem;
          height: .4rem;
          line-height: .4rem;
        }
      }
    }
    .d_plate_three{
      height: 1.4rem;
      line-height: 1.4rem;
      background-color:#ECECEC;
      display: flex;
      justify-content:space-between;
      padding:.1rem 0;

      div{
        text-align: center;
        background-color:#fff;
      }
      div:nth-of-type(1),
      div:nth-of-type(3){
        flex: 100;
      }
      div:nth-of-type(2){
        flex:3;
        background-color:#ECECEC;
      }
      div:nth-of-type(1){
        span{
          position: relative;
          .done_number{
            width: .4rem;
            height: .4rem;
            line-height: .4rem;
            position: absolute;
            top: -.28rem;
            right: -.32rem;
            font-size: .12rem;
            border-radius:50%;
            color: #fff;
            background-color:#EB5312;
          }
        }
      }
    }

    .d_plate_four{
      background-color: #fff;
    }
    .d_plate_five{
      width: 100%;
      margin-top:0.5rem;
      /*position: fixed;*/
      /*bottom:2rem;*/
      /*background-color:red;*/

      div:nth-of-type(1){
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        /*border: .1rem solid #5E9BED;*/
        border: .1rem solid #46AEF0;
        margin: 0 auto;
        text-align: center;
        /*background-color:#2F80ED;*/
        background-color:#3489EE;
        border-radius: 50%;
        color: #fff;
      }
    }

  }
</style>
