<template>
  <div class="add-login">
    <!--<C_header  left_show="true" right_show="true" center_text="登录"></C_header>-->

      <C_header   center_text="登录"></C_header>
      <AddLogin class="login" ></AddLogin>
  </div>
</template>
<script>
  import AddLogin from '../components_son/login/login'
export default {
  name: 'loginBox',
  data () {
    return {

    }
  },
  components:{
    AddLogin
  },
  methods:{

  }
}
</script>
<style scoped lang="scss">
  .add-login{
    width:100%;

    .login{
      padding-top: .8rem;
    }
  }

</style>
