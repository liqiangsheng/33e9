<template>
  <div id="service">
       <div id="header" class="one-bottom-px">
           <button>注销</button>
           <b>雅信达，欢迎你！</b>
           <img :src="serviceImg">
       </div>
       <ul id="center">
            <li>
                 <div>雅信达专用，勿入</div>
                 <p>排队人数:<b>0</b></p>
                 <p>工作人员:<b>0</b></p>
                 <p>正在进行:<b>0</b></p>
                 <button @click="SerialNumber1" v-show="SerialNumberA">服务此业务</button>
                 <span @click="SerialNumber11" v-show="SerialNumberAA">停止服务此业务</span>
            </li> 
                
            <li>
                <div>web</div>
                 <p>排队人数:<b>0</b></p>
                 <p>工作人员:<b>0</b></p>
                 <p>正在进行:<b>0</b></p>
                 <button @click="SerialNumber2" v-show="SerialNumberB">服务此业务</button>
                 <span @click="SerialNumber22" v-show="SerialNumberBB">停止服务此业务</span>
            </li> 

            <li>
                <div>iso test</div>
                 <p>排队人数:<b>0</b></p>
                 <p>工作人员:<b>0</b></p>
                 <p>正在进行:<b>0</b></p>
                 <button @click="SerialNumber3" v-show="SerialNumberC">服务此业务</button>
                 <span @click="SerialNumber33" v-show="SerialNumberCC">停止服务此业务</span>
            </li> 

            <li>
                <div>pc test</div>
                 <p>排队人数:<b>0</b></p>
                 <p>工作人员:<b>0</b></p>
                 <p>正在进行:<b>0</b></p>
                 <button @click="SerialNumber4" v-show="SerialNumberD">服务此业务</button>
                 <span @click="SerialNumber44" v-show="SerialNumberDD">停止服务此业务</span>
            </li> 
       </ul>
      <div id="foot1">
           
        </div>
        <div id="foot">
           <div>
                <span></span>
            </div>
            <p>自动分配</p>
            <button @click="nextCustomer">下一位客户</button>
        </div>
        <Queue v-if="isQueue"></Queue>
  </div>
</template>

<script>
import Queue from "./queue.vue"
export default {

  data () {
    return {
       serviceImg:"",
       SerialNumberA:true,
       SerialNumberB:true,
       SerialNumberC:true,
       SerialNumberD:true,
       SerialNumberAA:false,
       SerialNumberBB:false,
       SerialNumberCC:false,
       SerialNumberDD:false,
       isQueue:false
      
    }
  },
  components:{
       Queue:Queue
  },
  methods:{
      SerialNumber1:function(){
        this.SerialNumberA=false,
        this.SerialNumberAA=true,
        this.SerialNumberB=true,
        this.SerialNumberBB=false,
        this.SerialNumberC=true,
        this.SerialNumberCC=false,
        this.SerialNumberD=true,
        this.SerialNumberDD=false,
        this.isQueue = true
      },
      SerialNumber11:function(){
        this.SerialNumberA=true,
        this.SerialNumberAA=false,
        this.SerialNumberB=true,
        this.SerialNumberBB=false,
        this.SerialNumberC=true,
        this.SerialNumberCC=false,
        this.SerialNumberD=true,
        this.SerialNumberDD=false,
        this.isQueue = false
      },
      SerialNumber2:function(){
        this.SerialNumberA=true,
        this.SerialNumberAA=false,
        this.SerialNumberB=false,
        this.SerialNumberBB=true,
         this.SerialNumberC=true,
        this.SerialNumberCC=false,
        this.SerialNumberD=true,
        this.SerialNumberDD=false,
        this.isQueue = true
      },
      SerialNumber22:function(){
        this.SerialNumberA=true,
        this.SerialNumberAA=false,
        this.SerialNumberB=true,
        this.SerialNumberBB=false,
        this.SerialNumberC=true,
        this.SerialNumberCC=false,
        this.SerialNumberD=true,
        this.SerialNumberDD=false,
        this.isQueue = false
      },
      SerialNumber3:function(){
        this.SerialNumberA=true,
        this.SerialNumberAA=false,
        this.SerialNumberB=true,
        this.SerialNumberBB=false,
        this.SerialNumberC=false,
        this.SerialNumberCC=true,
        this.SerialNumberD=true,
        this.SerialNumberDD=false,
        this.isQueue = true
      },
      SerialNumber33:function(){
        this.SerialNumberA=true,
        this.SerialNumberAA=false,
        this.SerialNumberB=true,
        this.SerialNumberBB=false,
        this.SerialNumberC=true,
        this.SerialNumberCC=false,
        this.SerialNumberD=true,
        this.SerialNumberDD=false,
        this.isQueue = false
      },
      SerialNumber4:function(){
        this.SerialNumberA=true,
        this.SerialNumberAA=false,
        this.SerialNumberB=true,
        this.SerialNumberBB=false,
        this.SerialNumberC=true,
        this.SerialNumberCC=false,
        this.SerialNumberD=false,
        this.SerialNumberDD=true,
        this.isQueue = true
      },
      SerialNumber44:function(){
        this.SerialNumberA=true,
        this.SerialNumberAA=false,
        this.SerialNumberB=true,
        this.SerialNumberBB=false,
        this.SerialNumberC=true,
        this.SerialNumberCC=false,
        this.SerialNumberD=true,
        this.SerialNumberDD=false,
        this.isQueue = false
      },
      nextCustomer:function(){
        //   下一个客户
      }
  }
}

</script>

<style scoped>
#service{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #f3eded;
    overflow: auto;
}
#header{
    width: 100%;
    height: 50px;
    background: #ffffff;
    line-height: 50px;
    text-align: center;
    position: relative;
}
#header button{
    position: absolute;
    left: 10px;
    top: 10px;
    border:0;
    width: 50px;
    height: 30px;
    font-size: 16px;
    background: none;
    color: hsl(244, 91%, 50%);
}
#header b{
    font-size: 14px;
    font-family: "微软雅黑";
    color:black;
}
#header img{
    display: block;
    width: 30px;
    height: 30px;
    background: red;
    position: absolute;
    right: 10px;
    top: 10px;
    border: 0;
}
#center{
    width: 100%;
}
#center li{
    width: 100%;
    height: 150px;
    background: #fff;
    margin-top: 10px;
    position: relative;
}
#center li div{
    width: 90%;
    height: 30px;
    line-height: 30px;
    margin: 0 5%;
    font-size: 16px;
    font-weight: 900;
    color:#00ccff;
}
#center li p{
    width: 90%;
    height: 30px;
    line-height: 30px;
    margin: 0 5%;
    font-size: 14px;
    color: black;
    font-weight: 900;
}
#center li p b{
    margin: 0 3px;
    font-size: 14px;
    color: black;
    font-weight: 900;
}
#center li button{
    background:aqua;
    width: 40%;
    border-radius:5px;
    border: 0;
    position: absolute;
    right:20px;
    top: 60px;
    height: 40px;
    font-size: 14px;
}
#center li span{
    display: block;
    text-align: center;
    line-height: 40px;
    background:red;
    width: 50%;
    border-radius:5px;
    border: 0;
    position: absolute;
    right:20px;
    top: 60px;
    height: 40px;
    font-size: 16px;
}

#foot1{
    width: 100%;
    height: 49px;
    background:black;
    opacity: 0.7;
    position: fixed;
    bottom: 0;
    left: 0;
}
#foot{
    width: 100%;
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
}
#foot div{
    width: 30px;
    height: 30px;
    border: 1px solid green;
    margin: 10px;
    border-radius: 50%;
    float: left;

   
}
#foot div span{
    display: block;
    width: 20px ;
    height: 20px;
    background: green;
    margin: 5px;
    border-radius: 50%;
}
#foot p{
    width:80px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    float: left;
    color: #fff;
    margin: 10px;
}
#foot button{
    float: right;
    border: 0;
    background: rgb(38, 133, 241);
    width: 40%;
    height: 30px;
    line-height: 30px;
    margin: 10px;  
    font-size: 14px;  
    color: #fff;
}

</style>