<template>
  <div class="router_box">
    <div class="add_router">
      <p class="add_router_head remind" v-if="why_router">您还未拥抱李玉锋，请亲吻后再继续操作。</p>
      <mt-field label="设备编号" placeholder="请输入设备编号" v-model="userNumber"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码"  v-model="userVerification">
        <img src="" height="45px" width="100px" style="background-color:red;width: 1.6rem;">
      </mt-field>
      <mt-button class="add_router_btn"  type="primary" size="large" @click.native="primary">完成添加</mt-button>
    </div>
    <p class="why_router remind"><a :href="KFmelinkr" @click="why_router_href">如何查找百度</a></p>
  </div>

</template>
<script>
  const KFmelinkr='http://www.baidu.com'
  export default {
    name: 'add_router',
    data(){
      return {
        KFmelinkr:KFmelinkr,
        why_router:true,
        userNumber:'',
        userVerification:''
      }
    },
    components:{

    },
    methods:{
      primary(){
        let _this=this;
        if(this.userNumber==''){
          this.$toast('请输入编号')
          return false;
        }
        if(this.userVerification==''){
          this.$toast('请输入验证码')
          return false
        }
        this.$toast('正在提交')

        setTimeout(function(){
          _this.$router.push({name:'serviceRechargeBox'})
        },1200)
      },
      why_router_href(){
          alert("单页")
      }
    }
  }
</script>
<style scoped>
  .router_box{
    width: 100%;
    height: 100%;
  }
  .add_router{
    height: 100%;
    width: 100%;
    /*-webkit-border-radius:.4rem;*/
    /*-moz-border-radius:.4rem;*/
    /*border-radius:.4rem;*/
  }
  .add_router_head{
    text-align: left;
    padding: 0rem .1rem .2rem 0;
    text-indent: .3rem;
    /*display: none;*/
  }
.add_router_btn{
  position: fixed;
  bottom: 0;
  left: 0;
}
  .why_router{
    padding:.2rem 0;
    text-align: right;
  }
</style>
