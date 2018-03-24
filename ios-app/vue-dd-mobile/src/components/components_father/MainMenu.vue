<template>
  <div class="main_box">
    <C_header left_show="true" right_show="true"  center_text="叮板" right_number="3"></C_header>

    <transition name="">
      <router-view></router-view>
    </transition>

    <!--<mt-tabbar v-model="selected">-->
      <!--<mt-tab-item id="叮板">-->
        <!--<span @click="d_plate_click">叮板</span>-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="订单">-->
        <!--<span @click="d_order_click">订单</span>-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="我的">-->
        <!--<span  @click="d_my_click">我的</span>-->
      <!--</mt-tab-item>-->
    <!--</mt-tabbar>-->

    <div class="main_footer">
      <div class="main_footer_son">
        <div @click="d_plate_click" :class="{'active':activeNum==1}">
          <p><i class="iconfont icon-ddkx_ding"></i></p>
          <p>叮板</p>
        </div>
        <div @click="d_order_click" :class="{'active':activeNum==2}">
          <p><i class="iconfont icon-ddkx_dingdan"></i></p>
          <p>订单</p>
        </div>
        <div @click="d_my_click" :class="{'active':activeNum==3}">
          <p><i class="iconfont icon-ddkx_wode"></i></p>
          <p>我的</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../../assets/js/common'
export default{
    data(){
        return{
          selected:'叮板',
          activeNum:1,
        }
    },
    created(){
      if(this.$route.path=='/mainMenu/d_order'){
        this.activeNum=2
      }
    },
    watch:{
      selected(newVal,oldVal){

      },
      '$route' (to, from) {// 对路由变化作出响应
//        if(to.path=='/mainMenu/d_plate'){
        if(to.name=='d_plate'){
          this.activeNum=1
        }
        if(to.name=='d_order'){
          this.activeNum=2
        }
        if(to.name=='d_my'){
          this.activeNum=3
        }
      }
    },
    components:{

    },
    methods:{
      d_plate_click(){ //点击叮板
        let _this=this;
          console.log("点击叮板");
          this.$router.push({name:'d_plate'});
          this.activeNum=1; //让active为true改变样式

          common.d_plate_order_report(_this,common,_this.d_plate_href);//首页订单
      },
      d_order_click(){ //点击订单
        let _this=this;
        console.log("点击订单");
          this.$router.push({name:'d_order'});
          this.activeNum=2;

          common.d_plate_order_report(_this,common,_this.d_plate_href);//首页订单
      },
      d_my_click(){ //点击我的
        let _this=this;
          console.log("点击我的");
          this.$router.push({name:'d_my'});
          this.activeNum=3;

          common.d_plate_order_report(_this,common,_this.d_plate_href);//首页订单
      },
      d_plate_href(self,data){//主面板切换的时候去查询有没有首页订单
        let _this=self;
        console.log('主面板去查询有没有首页订单',data);
      },
    }
}
</script>
<style scoped lang="scss">
  .active{
    color: #116DEA;
    background-color: #fff;
  }
  .main_box{
    width: 100%;
    height: 100%;
    position: relative;

    .main_footer{
      background-color: #fff;
      font-size: .26rem;
      width:100%;
      padding-top: .12rem;
      padding-bottom: .12rem;
      text-align: center;
      position: fixed;
      bottom:0;
      left:0;

      .main_footer_son{
        display: flex;
        width:100%;

        >div{
          flex: 1;
         }
        div:nth-of-type(1){
          p:nth-of-type(1){
            height: .5rem;
            line-height: .5rem;
          }
          p:nth-of-type(2){
            height: .4rem;
            line-height: .4rem;
          }
        }
        div:nth-of-type(2){
          p:nth-of-type(1){
            height: .5rem;
            line-height: .5rem;
          }
          p:nth-of-type(2){
            height: .4rem;
            line-height: .4rem;
          }

        }
        div:nth-of-type(3){
          p:nth-of-type(1){
            height: .5rem;
            line-height: .5rem;
          }
          p:nth-of-type(2){
            height: .4rem;
            line-height: .4rem;
          }
        }
      }

    }
  }

.mint-tabbar{
  position: fixed !important;
}
</style>
