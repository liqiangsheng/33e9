<template>
  <div class="router_box">

    <div class="add_router" >
      <div  class="header_input_border">
        <mt-field label="手机号"  placeholder="请输入手机号" class="" v-model.trim="userNumber"></mt-field>
      </div>

      <div  class="header_input_border">
        <mt-field label="验证码" placeholder="请输入验证码"  v-model="userVerification"  class="" >
          <button class="get_btn_verification" @click="setTime" :disabled="disabled_click">{{get_phone_text}}</button>
        </mt-field>
      </div>


    </div>

    <div style="height: 1rem"></div>
    <mt-button class="add_router_btn" :disabled="disabled_btn_click"  type="primary" size="large" v-on:keyup.enter="primary"  @click.native="primary">确定</mt-button>
    <p class="why_router remind">点击确定表示已同意叮叮快修<span class="agreement" :href="KFmelinkr" @click="why_router_href">《师傅管理协议》</span></p>

  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  const KFmelinkr='#'
  export default {
    name: 'add_router',
    data(){
      return {
        KFmelinkr:KFmelinkr,
        why_router:true,
//        userNumber:'18666287471',
        userNumber:'',
        userVerification:'',
        get_phone_text:"获取验证码",//获取验证码
        disabled_click:true, //获取验证码按钮是否可点击
        disabled_btn_click:true,//确定按钮是否可点击

        permit_href_d_plate:false,//是否允许跳转到叮板
      }
    },
    components:{

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

      if(localStorage.getItem("dd_local_tel"))
      {
        console.log('relogin',home_data);
        common.relogin(_this,common,_this.d_plate_href);
//        common.d_plate_order(_this,common,res,_this.d_plate_href);//首页订单

      }
      else
      {
        console.log('primary',_this.$store.getters);
        this.primary()
      }

      if(sessionStorage.getItem("dd_tel")){
        this.userNumber=JSON.parse(sessionStorage.getItem("dd_tel"));
      }
      if(localStorage.getItem('dd_local_tel')){
        this.userNumber=JSON.parse(localStorage.getItem("dd_local_tel"));
      }
    },
    watch:{
      userNumber(newVal,oldVal){
        if(/^1(3|4|5|7|8)\d{9}$/.test(newVal)){
          this.disabled_click=false;//手机号和验证码正确就允许点击获取验证码
        }
      },
      userVerification(newVal,oldVal){
        if(/^[0-9]{4}$/.test(newVal)  && /^1(3|4|5|7|8)\d{9}$/.test(this.userNumber)){
          this.disabled_btn_click=false;//确定按钮
        }else{
          this.disabled_click=true;
        }
      }
    },
    methods:{
      primary(){

        let _this=this;
        if(!/^1(3|4|5|7|8)\d{9}$/.test(this.userNumber)){
          this.$toast('请输入手机号')
          return false;
        }
        if(!/^[0-9]{4}$/.test(this.userVerification)){
          this.$toast('请输入验证码')
          return false
        }

        _this.$indicator.open('登陆中...');

        _this.$axios.post(_this.$addressUrl+_this.$allUrl.deng_lu,{phoneNum:_this.userNumber,authCode:_this.userVerification}).then(function(res){ //点击登录
          console.log("点击登录",res.data.result);
          if(res.data.code=='0000'){
            sessionStorage.removeItem("dd_token")
            sessionStorage.removeItem("dd_tel")
            localStorage.removeItem("dd_local_tel")
            localStorage.removeItem("dd_local_token")
            sessionStorage.setItem("dd_token",JSON.stringify(res.data.result.token));//取token 到sessionStorage
            sessionStorage.setItem("dd_tel",JSON.stringify(res.data.result.phoneNum));//取手机号 到sessionStorage
            localStorage.setItem("dd_local_tel",JSON.stringify(res.data.result.phoneNum));//取手机号 到localStorage
            localStorage.setItem("dd_local_token",JSON.stringify(res.data.result.token));//取token 到sessionStorage
            _this.$store.dispatch('login',res.data.result);   //把数据挂载到store上面
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

            common.personal_data(_this,common);//请求个人资料
            common.d_plate_order(_this,common,res,_this.d_plate_href);//首页订单

            common.sysmsgNewData(_this,common.token());//通知消息 res.data.result.token

//            //拿微信的appid相关参数
//            let dataReq_location_href={url:window.location.href};
//            common.weixinAppid(_this,dataReq_location_href);//微信


//              if(res.data.result.certificateState==0 || res.data.result.certificateState=='0'){//0未认证 1认证中 2认证通过 3认证驳回
//                    _this.$router.push({name:'JumpAuthen'})  //跳转到认证界面
//              }else if(res.data.result.certificateState==2 || res.data.result.certificateState=='2'){
//                  setTimeout(function () {
//                    _this.$router.push({name:'d_plate'})  //跳转到叮板
//                  },1500);
//              }
          }else{
            _this.$toast(res.data.error);
          }
        });


      },
      weixin_get_appid(){
        let indexPath=window.location.href.indexOf("#/")+2;
        return window.location.href.substring(0,indexPath);
      },

      d_plate_href(self,data,res){ //回调去确认是否登录到叮板
        let _this=self;
        console.log("首页订单回调",data);
        if(data.data.code == '0000'){
          if(res.data.result.certificateState==0 || res.data.result.certificateState=='0'){//0未认证 1认证中 2认证通过 3认证驳回
            _this.$indicator.close();//关闭加载圈圈
            _this.$router.push({name:'JumpAuthen'})  //跳转到认证界面
          }else if(res.data.result.certificateState==2 || res.data.result.certificateState=='2'){
            _this.$indicator.close();//关闭加载圈圈
            _this.$router.push({name:'d_plate'})  //跳转到叮板
          }
        }
      },
      why_router_href(){
        this.$router.push({name:'loginManagement'});
      },
      login_ajax(){
        let _this=this;
        _this.$axios.post(_this.$addressUrl+_this.$allUrl.yan_zheng,{phoneNum:_this.userNumber}).then(function(res){ //点击发送验证码
          console.log("发送验证码",res);

        });
      },


      setTime:function(){//定时器
        console.log("点击定时器");
        var _this=this;
        _this.disabled_click=true;

        _this.login_ajax(); //调用验证码login_ajax
        //输入验证码倒计时
        var getCodeClicked = false,timer=null;
        function show_img_up(){ //获取验证码倒计时
          if(getCodeClicked){
            return
          }
          var j=60;
          timer = window.setInterval(function(){ //定时器开始
            if(j>=0){
              _this.get_phone_text=j+'秒后重发';
              j--;
            }else{
              _this.get_phone_text="重新获取";
              _this.disabled_click=false;
              // 恢复点击按钮
              getCodeClicked = false;
              window.clearInterval(timer);
            }
          },1000);
          getCodeClicked = true;
        };
        show_img_up()
      }
    }
  }
</script>
<style scoped lang="scss">
  .router_box{
    width: 100%;
    height: 100%;
    /*background-color: #fff;*/
  }
  .add_router{
    height: 100%;
    width: 100%;
    background-color: #fff;
    /*-webkit-border-radius:.4rem;*/
    /*-moz-border-radius:.4rem;*/
    /*border-radius:.4rem;*/
  }
  .router_box .header_input_border{
    /*margin-top: .12rem;*/
    /*border-bottom: .01rem solid  #EBEBEB;*/
  }

  /*按钮上间距*/
  .router_box .add_router_btn{
    width:94%;
    margin: 0 auto;
    margin-top: 1rem;
    background-color:#26a2ff;
  }

  .add_router_head{
    text-align: left;
    padding: 0rem .1rem .2rem 0;
    text-indent: .3rem;
    /*display: none;*/
  }

  .why_router{
    margin-top: .42rem;
    text-align:center;

  }

  /*获取点击按钮*/
  .get_btn_verification{
    border:none;
    background-color:#fff;
  }
  /*主色*/
  .router_box .agreement{
    color:#428CEF;
  }

  .why_router remind{
    /*padding-bottom: 3rem;*/
  }
</style>
