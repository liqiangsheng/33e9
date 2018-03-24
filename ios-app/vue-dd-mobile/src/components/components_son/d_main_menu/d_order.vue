<template>
  <div>
    <div class="selected_sup">
      <mt-navbar v-model="selected">
        <mt-tab-item id="one">今日待办</mt-tab-item>
        <mt-tab-item id="two">全部待办</mt-tab-item>
        <mt-tab-item id="three">已完成</mt-tab-item>
        <mt-tab-item id="four">遗留</mt-tab-item>
      </mt-navbar>
    </div>

    <div class="selected_sub">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="one">
          <mt-loadmore :top-method="loadTop1" :bottom-method="loadBottom1"  @top-status-change="handleTopChange"  :bottom-all-loaded="allLoaded1" ref="loadmore1">
            <div v-if="order_type1.orders.length >= 1" class="c_order_style">
              <div>
                <C_all_order :order_data="item" v-for="(item,index) in order_type1.orders" v-if="order_type1.orders.length"></C_all_order>
              </div>
            </div>
            <div  v-if="order_type1.orders.length == 0">
              <c_no_order></c_no_order>
            </div>
          </mt-loadmore>

        </mt-tab-container-item>

        <mt-tab-container-item id="two">
          <mt-loadmore :top-method="loadTop2" :bottom-method="loadBottom2"  @top-status-change="handleTopChange"   :bottom-all-loaded="allLoaded2" ref="loadmore2">
            <div class="c_order_style">
              <div>
                <C_all_order :order_data="item" v-for="(item,index) in order_type2.orders" v-if="order_type2.orders.length"></C_all_order>
              </div>
            </div>
            <div v-if="order_type2.orders.length==0">
              <c_no_order></c_no_order>
            </div>
          </mt-loadmore>
        </mt-tab-container-item>

        <mt-tab-container-item id="three">
          <mt-loadmore :top-method="loadTop3" :bottom-method="loadBottom3"  @top-status-change="handleTopChange"   :bottom-all-loaded="allLoaded3" ref="loadmore3">
            <div v-if="order_type3.orders.length==0">
              <c_no_order></c_no_order>
            </div>
            <div class="c_order_style">
              <div>
                <C_all_order :order_data="item" v-for="(item,index) in order_type3.orders" v-if="order_type3.orders.length"></C_all_order>
              </div>
            </div>
          </mt-loadmore>
        </mt-tab-container-item>

        <mt-tab-container-item id="four">
          <mt-loadmore :top-method="loadTop4" :bottom-method="loadBottom4"  @top-status-change="handleTopChange"   :bottom-all-loaded="allLoaded4" ref="loadmore4">
            <div v-if="order_type4.orders.length==0">
              <c_no_order></c_no_order>
            </div>
            <div class="c_order_style">
              <div>
                <C_all_order :order_data="item" v-for="(item,index) in order_type4.orders" v-if="order_type4.orders.length"></C_all_order>
              </div>
            </div>
          </mt-loadmore>
        </mt-tab-container-item>

      </mt-tab-container>
    </div>



  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default{
      data(){
          return{
            selected:'one', //点击后的ID
            topStatus: '',
            allLoaded1:false,  //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            allLoaded2:false,  //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            allLoaded3:false,  //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            allLoaded4:false,  //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
          }
      },
      watch:{

      },
      computed:{
      ...mapGetters([  //order订单
          "home_data", //首页订单的数据
          "order_type1",//今日待办
          "order_type2",//全部待办
          "order_type3",//已完成
          "order_type4",//遗留
          "order_type5",//历史订单
        ]),
      },
      created(){
         let _this=this;     
      let home_data=_this.$store.getters.home_data;
      console.log('检测登陆',(!home_data));     
        
         if((!home_data)&&localStorage.getItem("dd_local_tel"))
      {
        // console.log('relogin',home_data);
        // common.relogin(_this,common);
      
       _this.$router.push({name:'login'});
      } 
      else
        this.$store.dispatch('order_report_three','three');//进订单就已完成订单不显示报备
      },
      watch:{
        selected(newVal,oldVal){ //检测点击后的ID
          console.log(newVal, oldVal);
//          if(newVal=="two"){
//            this.$store.dispatch('order_report_two',newVal);
//          }else{
//            this.$store.dispatch('order_report_two','');
//          }

          if(newVal=="three"){
            this.$store.dispatch('order_report_three',newVal);
          }else{
            this.$store.dispatch('order_report_three','');
          }

          if(newVal=="three"){
            this.$store.dispatch('order_report_three',newVal);
          }else{
            this.$store.dispatch('order_report_three','');
          }
        }
      },
      components:{

      },
      methods:{
        handleTopChange(status) {
          console.log(status);
          if(status=='loading'){
            console.log("去拿数据");
          }
            this.topStatus =status;
        },
          loadTop1(){// 下拉加载更多数据
            let _this=this;
              setTimeout(()=>{
                _this.$refs.loadmore1.onTopLoaded();  //下拉完后调用一次，用于重新定位
              },1500);
          },
          loadTop2(){
            let _this=this;
            setTimeout(()=>{
              _this.$refs.loadmore2.onTopLoaded();
            },1500);
          },
          loadTop3(){
            let _this=this;
            setTimeout(()=>{
              _this.$refs.loadmore3.onTopLoaded();
            },1500);
          },
          loadTop4(){
            let _this=this;
            setTimeout(()=>{
              _this.$refs.loadmore4.onTopLoaded();
            },1500);
          },
          loadBottom1() {// 上拉加载更多数据
              this.allLoaded1= true;// 上拉后若数据已全部获取完毕
              this.$refs.loadmore1.onBottomLoaded();
            console.log(111);
          },
          loadBottom2() {
              this.allLoaded2= true;
              this.$refs.loadmore2.onBottomLoaded();
          },
          loadBottom3() {
              this.allLoaded3= true;
              this.$refs.loadmore3.onBottomLoaded();
          },
          loadBottom4() {
              this.allLoaded4= true;
              this.$refs.loadmore4.onBottomLoaded();
              console.log(this.order_type4)
          },
      }
  }
</script>
<style scoped lang="scss">
  .mint-navbar{
    /*background-color:red;*/
  }
.selected_sup{
  height: 100%;
  background-color:#E8E1E1;
}
.selected_sub{
  /*margin-top:.2rem;*/
  background-color:#ECECEC;
  overflow: auto;

  .c_order_style{
    /*height: 11rem;*/
    margin-bottom: .2rem;
    /*background-color:#C5C5C5;*/
    margin-top: .2rem;
    /*padding-bottom: 1rem;*/

    >div{
       height: 100%;
      overflow: auto;

        .work_order_box:last-child{
          margin-bottom: 1rem;
        }
     }
  }
}

.mint-loadmore{
  height: 100%;
}
.mint-loadmore-content is-dropped{
  height: 100%;
}

  .work_order_box:nth-of-type(1){
  }
</style>
