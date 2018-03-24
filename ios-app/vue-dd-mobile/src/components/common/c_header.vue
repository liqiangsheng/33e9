<template>
  <div>
    <div class="margin_top"> </div>
    <div class="header_box">
      <mt-header  :title="center_text">
        <router-link to="/" slot="left">
          <!--<mt-button icon="back" v-if="left_show" onClick="javascript :history.back(-1);"></mt-button>-->
          <mt-button icon="back" v-if="left_show" @click="vuexClick"></mt-button>
          <!--<mt-button icon="back" v-if="left_show" @click="vuexClick"></mt-button>-->
        </router-link>
        <mt-button icon="" slot="right" v-if="right_show">
          <div v-if="right_number==1"  @click="right_number_one">分享</div>
          <div v-if="right_number==2"  @click="right_number_two">保存</div>
          <div v-if="right_number==3"  @click="right_number_three"><i style="font-size: .42rem;" class="iconfont icon-xiaoxi1"></i></div>

        </mt-button>
      </mt-header>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c_login',
    components: {

    },
    /*
     *left_show 左显示
     * right_show 右显示
     * center_text 问题
     */
    props:['left_show','right_show','center_text','right_number'],
    data(){
      return{

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
//      username(newVal,oldVal){
//        console.log(newVal, oldVal);
//      }
    },
    created(){
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
      c_header_props(){

      },
      vuexClick(){
        //window.history.go(-1); //返回上一页
        console.log(this.$route.path);
        if(this.$route.path=='/serviceSuccess' || this.$route.path=='/serviceaBill'){
          this.$router.back(-1);
        }else{
          if(this.$route.path=='/serviceList'){
            this.$router.back(-1);
          }else{
            this.$router.go(-1);
          }
        }
      },
      right_number_one(){ //分享
        console.log("分享");
      },
      right_number_two(){ //保存
        this.$emit('callback_city',true);
        console.log("保存");
      },
      right_number_three(){ //信封
        console.log("信封");
        this.$router.push({name:'systemNews'});

      }
    }
  }
</script>

<style scoped lang="scss">

  .margin_top{
    height:.92rem;
  }
.mint-header{
  background-image: linear-gradient(-180deg, #56CCF2 0%, #2F80ED 100%) !important;
}
.header_box{

  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.mint-header{
  height: 46px;
  background-color:red;
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
