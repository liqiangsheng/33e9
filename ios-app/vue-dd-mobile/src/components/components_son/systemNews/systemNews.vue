<template>
  <div class="system_news">
    <div>
      <C_header left_show="true" right_show="false" center_text="消息通知"></C_header>
      <div class="system_news_box" v-for="(item,index) in systemMsg">
        <div class="system_one">
          <!--<div >【您有新的消息】</div>-->
          <!--<div>{{item.createTime}}</div>-->
          {{item.createTime}}
        </div>
        <!--<div class="system_two">-->
          <!--<div>[预约时间更改]</div>-->
          <!--<div>{{item.createTime}}</div>-->
        <!--</div>-->
        <div class="system_three">{{item.content}}</div>
      </div>


    </div>
  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default{
      data(){
          return{
              msgData:{},
          }
      },
      computed:{
        ...mapGetters([  //消息
          "systemMsg",
        ])
      },
      created(){
          let _this=this;

          common.sysmsgNewData(_this,common.token());//通知消息 res.data.result.token

//          let dataReq={
////              "type":'SysMessage',
//                 token:common.token(),
//          }
//        _this.$axios.post(_this.$addressUrl+_this.$allUrl.xi_tong_xiao_xi,dataReq).then(function (res){
//          console.log(res);
//        });
      },
      methods:{

      }
  }
</script>
<style scoped lang="scss">
  .system_news{
    width: 100%;
    height: 100%;
    margin-top: .2rem;

  }
  .system_news_box{
    width:92%;
    margin: 0 auto;
    margin-bottom: .2rem;
    padding: 0 .15rem;
    border-radius:.14rem;
    background-color: #fff;

  >div{
     line-height: .5rem;
   }
  }
  .system_one{
    /*background-color:yellow;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*color: #F07E4D;*/
    color:gray;
    text-align: center;
    font-size: .24rem;
  }
  .system_two{
    display: flex;
    justify-content: space-between;
  }
  .system_three{
    /*background-color:hotpink;*/
  }
</style>
