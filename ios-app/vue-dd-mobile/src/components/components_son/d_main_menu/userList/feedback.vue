<template>
  <div class="feedback">
    <div>
      <C_header left_show="true" center_text="意见反馈"></C_header>
    </div>
    <div class="feedback_textarea">
      <textarea  maxlength ="100" v-model="feedback_value" placeholder="请输入您对我们产品的意见,我们将不断优化"></textarea>
    </div>
    <div>
      <C_button class="c_button"  :btn_disabled="feedback_btn" @callback_c_btn="submit_btn" btn_text="提交反馈"></C_button>
    </div>
  </div>
</template>
<script>
export default{
    data(){
        return{
          feedback_value:'', //提交反馈的值
          feedback_btn:'1', //点击按钮，1可点，2不可点
        }
    },
    watch:{
      feedback_value(newVal,oldVal){
          if(newVal.length>0){
              this.feedback_btn="2";
          }else{
            this.feedback_btn="1";
          }
      }
    },
    methods:{
      submit_btn(data){
        let _this=this;
        let token1=JSON.parse(sessionStorage.getItem("token"));
        if(!token1){
          this.$toast('提交成功');
          return
        }
        let dataReq={
            token:token1,
            content:_this.feedback_value, //用户意见的文本
        }
        if(data){
            _this.$axios.post(_this.$addressUrl+_this.$allUrl.yi_jian_fan_kui,dataReq).then(function (res) {
              if(res.data.code == '0000'){
                _this.$toast('提交成功');
                _this.$router.push({name:'d_my'});
              }else{
                _this.$toast('提交失败，请重新提交');
              }
            });
        }
      }
    }
}
</script>
<style scoped lang="scss">
.feedback{
  width: 100%;
  height: 100%;

  .feedback_textarea{
    width: 100%;
    height: 3rem;
    margin: .3rem 0  1.2rem;

    textarea{
      width: 100%;
      height: 3rem;
      font-size: .36rem;
    }
  }

  .c_button{
    width: 94%;
    margin: 0 auto;
  }
}
</style>
