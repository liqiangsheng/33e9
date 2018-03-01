<template>
  <div id="queue">
       <div id="header" class="one-bottom-px">
           <button>注销</button>
           <b>雅信达，欢迎你！</b>
           <img :src="serviceImg">
       </div>
       
  </div>
</template>

<script>
export default {

  data () {
    return {
       
      
    }
  },
  components:{
  },
  methods:{
    
  }
}

</script>

<style scoped>
#queue{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #f3eded;
}
#queue #header{
    width: 100%;
    height: 50px;
    background: #ffffff;
    line-height: 50px;
    text-align: center;
    position: relative;
}
#queue #header button{
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
#queue #header b{
    font-size: 14px;
    font-family: "微软雅黑";
    color:black;
}
#queue #header img{
    display: block;
    width: 30px;
    height: 30px;
    background: red;
    position: absolute;
    right: 10px;
    top: 10px;
    border: 0;
}

</style>