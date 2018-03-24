<template>
    <div class="lee_serviceRecharge">
      <transition name="fade">
        <p class="lee_serviceRecharge_title remind" v-if="title_close" v-color="'red'">
            <span>■</span>
            <span>续费啊啊啊啊啊啊啊啊啊啊啊啊啊啊</span>
            <span @click="lee_serviceRecharge_title_close">×</span>
        </p>
      </transition>
      <div class="lee_serviceRecharge_box">
        <p>核对信息</p>
        <p>
          <span>编号:</span><span>2014NB2556S</span>
        </p>
        <p>
          <span>有效期:</span><span>2017-07-22 10-10-10</span>
        </p>
        <p class="remind" style="line-height:.4rem;">
          选择其他设备
        </p>
      </div>

      <div class="lee_serviceRecharge_money_tips">
        <p>续费时长</p>
        <div class="money_tips_two  active " style="padding: 0 .2rem">
          一年￥<span>200</span>.00
        </div>
      </div>

      <div class="lee_serviceRecharge_money_tips clearfix">
        <p>发票信息</p>
        <div class="money_tips_two fl  " @click="money_tips_false" :class="{active:noActive}">
          不需要
        </div>
        <div class="Invoice_information">
          <div class="money_tips_two  "  @click="money_tips_true" :class="{active:yesActive}">
            开具发票
          </div>
          <p class="remind">开缴纳4%税费</p>
        </div>

        <transition name="fade">
          <div class="yes_invoice" v-show="money_tips_block">
              <mt-field label="用户名" placeholder="请输入用户名" v-model="username" class="lee_mt_field"></mt-field>
              <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="username" class="lee_mt_field"></mt-field>
              <p>
                <span>收货地址</span>
                <span>李玉锋</span>
                <span>15994237374</span>
              </p>
              <p>
                <span>广东省深圳市宝安区乱搞测试</span>
                <span @click="vuexClick">></span>
              </p>
          </div>
        </transition>

      </div>

      <div class="lee_serviceRecharge_money_tips">
        <p><span>应付金额:</span><span class="lee_user_money_number">￥{{money_number}}</span></p>
        <p class="remind">包含服务费用￥{{money_number}}，发票税费￥14.00，快递费用￥10.00</p>
      </div>


      <mt-button class="mt-button"  size="large" @click.native="lee_serviceRecharge_click" style="background-color:#4CAF50;margin-top: .76rem;">微信支付</mt-button>

    </div>
</template>

<script>

    export default {
        name: 'a',
        components: {

        },
        data(){
          return{
            title_close:true, //点击关闭头部提醒
            lee_switch_value:'',
            money_tips_block:false, //显示发票和地址框
            username:'', //发票抬头
            money_number:200,
            active:true, //点击显示隐藏
            noActive:true,//点击显示隐藏
            yesActive:false,//点击显示隐藏
            list:[],

          }
        },
        mounted(){

        },
        computed: { //计算属性，data变就触发
//            ...mapGetters([
//                'todoList',
//                'selected'
//            ]),
        },
          watch:{// 如果路由有变化，会再次执行该方法
            username(newVal,oldVal){
            console.log(newVal, oldVal);
          }
        },
        created(){
          document.querySelector('body').style.backgroundColor='#fff';
          console.log(this.$router.match(location.href));
//          console.log(this.$router.beforeEach((to, from, next) => {
//            // to 和 from 都是 路由信息对象
//          }));
        },
      directives:{ //自定义指令
          color(el,binding){
              el.style.color=binding.value
          }
      },
      methods:{  //事件对象
          lee_serviceRecharge_title_close(){  //v-if头部关闭
            this.title_close=false
          },
          money_tips_false(){  //不需要
            this.money_tips_block=false
            if(this.yesActive==true)this.noActive=true,this.yesActive=false
          },
          money_tips_true(){ //需要
            this.money_tips_block=true
            if(this.noActive==true)this.noActive=false,this.yesActive=true
          },
          lee_serviceRecharge_click(){  //支付
              alert("成功")
          },
          vuexClick(){
            this.$router.push({name:'vuxTestBox'})
          }
        }
    }
</script>

<style scoped>
  .lee_serviceRecharge{
    background-color: #fff;
  }
  .lee_serviceRecharge_title{
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    text-indent:.22rem;
    background-color: rgba(38,162,255,.96);
    text-align: left;
    position: absolute;
    margin-top: -.16rem;
  }
  .lee_serviceRecharge_box{
    background-color: #fff;
    text-align: left;
    border-bottom: 1px solid #7B7B7B;
  }
  .lee_serviceRecharge_box p{
    line-height: .5rem;
  }
  .lee_serviceRecharge_box p:nth-of-type(2)，
  .lee_serviceRecharge_box p:nth-of-type(3){
    width: 100%;
  }
  .lee_serviceRecharge_box p:nth-of-type(2) span:nth-of-type(1){
    display: inline-block;
    width: 30%;
    text-align: right;
  }
  .lee_serviceRecharge_box p:nth-of-type(2) span:nth-of-type(2){
    display: inline-block;
    width: 68%;
  }
  .lee_serviceRecharge_box p:nth-of-type(3) span:nth-of-type(1){
    display: inline-block;
    width: 30%;
    text-align: right;
  }
  .lee_serviceRecharge_box p:nth-of-type(3) span:nth-of-type(2){
    display: inline-block;
    width: 68%;
  }
  /*选择其他设备*/
  .lee_serviceRecharge_box p:nth-of-type(4){
    text-align: right;
    color: blue;
  }
  /*续费时长*/
  .lee_serviceRecharge_money_tips{
    padding: .2rem 0;
    border-bottom: 1px solid #7B7B7B;
  }
  .lee_serviceRecharge_money_tips p:nth-of-type(1){
    padding: 0 0 .1rem 0;
  }
  .lee_serviceRecharge_money_tips .lee_user_money_number{
    color: red;
  }
  .money_tips_two{
    width: 2rem;
    height: .68rem;
    border-radius:.1rem;
    line-height: .68rem;
    background-color:#7B7B7B;
    text-align: center;
    display: inline-block;
  }

  .Invoice_information{
    display: inline-block;
    /*width: 70%;*/
    height: 1.2rem;
    margin-left: .4rem;
  }
  .Invoice_information p:nth-of-type(1){
    line-height: .6rem;
    padding: 0;
  }
/*开具发票显示信息框*/
.yes_invoice p{
  background-color:rgba(123,123,123,.2);
  }
.yes_invoice>p:nth-of-type(1) span{
  overflow: hidden;
  display: inline-block;
  box-sizing: border-box;
}
.yes_invoice>p:nth-of-type(1) span:nth-of-type(1){
  width: 32%;
  text-align: center;
}
.yes_invoice>p:nth-of-type(1) span:nth-of-type(2){
  min-width: 20%;
}
.yes_invoice>p:nth-of-type(1) span:nth-of-type(3){
  min-width: 36%;
}
.yes_invoice>p:nth-of-type(2){
  position: relative;
}
  .yes_invoice>p:nth-of-type(2) span:nth-of-type(1){
    display: inline-block;
    /*text-indent: .16rem;*/
    width: 94.6%;
  }
.yes_invoice>p:nth-of-type(2) span:nth-of-type(2){
  display: inline-block;
  position: absolute;
  right:0rem;
  bottom: 0rem;
  width: .55rem;
  height:.43rem;
  border-radius:.05rem;
  line-height: .43rem;
  text-align: center;
  background-color:#26a2ff;
}

/*mt修改样式*/
.lee_mt_field{
  min-height:35px;
  text-align: center;
  background-color:rgba(123,123,123,.2);
}
/*支付按钮*/
  .mt-button{
    color: white;
    width: 96%;
    margin: 0 auto;
  }
  .active{
    background-color:#26a2ff;
    color: #fff;
  }


  /*transition的样式*/
  .fade-enter-active, .fade-leave-active {
    transform-style: preserve-3d;
    transition: all 1s ease-out;
  }
  /*.fade-enter, .fade-leave-active {*/
  /*!*transition:all 1s ease;*!*/
  /*opacity: 0;*/
  /*}*/

  /*进入*/
  .fade-enter {
    -webkit-transform:perspective(200px) translateZ(-500px);
    -moz-transform: perspective(200px) translateZ(-500px);
    -ms-transform: perspective(200px) translateZ(-500px);
    -o-transform: perspective(200px) translateZ(-500px);
    transform: perspective(200px) translateZ(-500px);
  }
  /*离开*/
  .fade-leave-active{
    -webkit-transform:perspective(200px)  translateZ(-500px);
    -moz-transform:perspective(200px)  translateZ(-500px);
    -ms-transform:perspective(200px)  translateZ(-500px);
    -o-transform:perspective(200px)  translateZ(-500px);
    transform:perspective(200px)  translateZ(-500px);
  }
</style>
