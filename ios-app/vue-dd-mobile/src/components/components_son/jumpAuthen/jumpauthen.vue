<template>
  <div class="jumpauthen_box">
    <div>
      <img src="../../../assets/images/jumpauthen.png" alt="">
    </div>
    <div class="btn_box"  v-if="login.certificateState && login.certificateState==0">
      <div @click="btn_box_click" >
        <C_button class="btn_box_btn" btn_disabled="2" btn_text="立即认证"></C_button>
      </div>
    </div>
    <div class="switch"  v-if="login.certificateState && login.certificateState==0">
      <span @click="switch_click">切换帐号</span>
    </div>
    <div class="authen_state"  v-if="login.certificateState && login.certificateState==1">资料认证中,请耐心等待....</div>
    <div  class="authen_state"  v-if="login.certificateState && login.certificateState==3">认证未通过,请重新认证</div>
  </div>
</template>
<script>
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  import  C_button from '../../common/c_button.vue'
  export default{
      data(){
          return{

          }
      },
      computed:{
        ...mapGetters([  //登录后返回的数据
          "login"
        ]),
      },
      components:{
        C_button
      },
      methods:{
        switch_click(){
            this.$router.push({name:'login'});
        },
        btn_box_click(){
          this.$router.push({name:'authen'});
        }
      }
  }
</script>
<style scoped lang="scss">
.jumpauthen_box{

      .btn_box{
        width: 100%;
        height: 100%;
        margin-top: 1rem;

        .btn_box_btn{
          width: 82%;
          margin: 0 auto;
        }
    }

    .switch{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color:#26a2ff;
    }
}

.authen_state{
  height: 1rem;
  line-height: 1rem;
  text-align: center;
}

</style>
