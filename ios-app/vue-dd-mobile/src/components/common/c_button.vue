<template>
  <div>
    <mt-button type="primary" size="large" @click.native="primary" :disabled="disabled_bool">{{btn_text}}</mt-button>
  </div>
</template>
<script>
  /*
  * props:btn_disabled=1 不能点击
  * 是否能点击:disabled_bool
  *
  *
  * */
  export default{
      props:['btn_disabled','btn_text'],
      data(){
          return{
            disabled:false,
          }
      },
      computed:{
        disabled_bool(){
            if(this.btn_disabled=='1'){
              this.disabled=true  //不能点
            }else{
               this.disabled=false //能点
            }
            return  this.disabled;
        }
      },
      components:{

      },
      methods:{
        primary(){
          console.log('点击按钮');
          this.$emit('callback_c_btn',true);
        }
      }
  }
</script>
<style scoped lang="scss">

</style>
