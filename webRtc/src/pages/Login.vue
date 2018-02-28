<template>
  <div id="login">
       

            <div id="login-page">
                <img :src= 'LogImg'>
            </div>

            <div id="login-page1">
                <input type="text">
            </div>

             <div id="login-page2">
                <button>登陆</button>
            </div>

            <div id="login-page3">
                <button>服务器设置</button>
            </div>  
    
  </div>
</template>

<script>

export default {

  data () {
    return {
        LogImg:'./static/images/meeting2.png'
    }
  }
}

</script>

<style scoped>

#login,login1{
 width: 100%;
 height: 100%;
}
#login-page{
    width: 100%;
    height: 50%;
}
#login-page img{
    width: 60%;
    height: 50%;
    margin: 30% 20% 10% 20%;
}



</style>