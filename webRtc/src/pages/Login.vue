<template>
  <div id="login">
       

            <div id="login-page">
                <img :src= 'LogImg'>
            </div>

            <div id="login-page1">
                <input type="text" placeholder="请输入登陆账号">
            </div>

             <div id="login-page2">
                <button @click="login">登陆</button>
            </div>

            <div id="login-page3">
                <button @click="server">服务器设置</button>
            </div>  
           <Service v-show="service"></Service>
  </div>
</template>

<script>
import Service from "./Service.vue"
export default {

  data () {
    return {
        LogImg:'./static/images/meeting2.png',
        "Account-number":"",
        service:false
    }
  },
  components:{
    Service :Service
  },
  methods:{
      login:function (){
          this.service = true;
      },
      server: function (){
            console.log("选择服务器")
      }
  }
}

</script>

<style scoped>
#login{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
}

#login-page,#login-page1,#login-page2{
    width: 100%;
    height: 50%;
}
#login-page img{
    width: 60%;
    height: 50%;
    margin: 30% 20% 10% 20%;
}
#login-page1,#login-page2,#login-page3{
    height: 40px;
    margin-bottom: 5%;
}
#login-page1 input{
    width: 90%;
    height: 100%;
    margin: 0 5%;
    font-size: 14px;
    border: 0;
    border: 1px solid black;
    border-radius: 3%;
}
#login-page2{
    margin-bottom: 2%;
}
#login-page2 button{
    width: 90%;
    height: 100%;
    margin: 0 5%;
    border: 0;
    border: 1px solid #149df8;
    border-radius: 3%;
    background: #149df8;
    font-size: 20px;
    font-weight: 900;
    color: #fff;
}
#login-page3{
    width: 90%;
    margin: 0 5%;
}
#login-page3 button{
    border: 0;
    background: #ffffff;
    color: #00eeff;
    float: right;
    padding: 0;
    

}



</style>