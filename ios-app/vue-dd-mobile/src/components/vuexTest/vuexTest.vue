<template>
    <div id="vueTest">
      <!--store模拟-->
        <span @click="jia">+</span>
        <span @click="jian">-</span>
        <span>=</span>
        <span>{{priceBox}}</span>

      <!--模拟请求的mock数据-->
      <div class="mackjs_data">
            <button  @click="lee_axios">点击改变数据</button>
            <input  v-for="(item,index) in list" :value="item.category"/>
      </div>

      <!--data的列表循环-->
      <div class="v_for_list">
        <p v-for="(item,index) in dataList">{{item.name}}----{{index}}</p>
      </div>

      <!--计算属性监视-->
      <footer class="computdata_onchang">
        <input  type="text" v-model="computedData">
        <p>{{"computData:"+computData}}</p>
      </footer>

      <div class="footer_img">
        <img :src="imgSrc" alt="">
        <!--{{'111'+this.$router.params}}-->
      </div>

    </div>
</template>

<script>

    const imgSrc='./static/img/logo.png'
    export default {
        name: 'vueTest',
        components: {

        },
        data(){
            return{
              price:5,
              list:[],
              computedData:'',
              dataList:[
                {
                  name:'0',
                  price:100
                },{
                  name:'one',
                  price:200
                },{
                  name:'two',
                  price:300
                }
              ],
              imgSrc:`${imgSrc}`, //图片路径
            }
        },
        computed:{
//            ...mapGetters([
//                'todoList',
//                'selected'
//            ]),
           priceBox(){
             return this.$store.getters.getIncrement;  //获取
           },
            computData(){  //computedData变化computData就触发
              return this.computedData
            }
        },
        beforeCreate(){  //对data而言，此时data还未创建，data中的数据还是undefined
          console.log(1);
        },
        created:function () { //对data而言，data按照配置已被赋于相应的值
          console.log(2);
        },
        beforeMount(){  //对dom而言，此时dom还是已虚拟dom的形式存在
          console.log(3);
        },
        mounted(){      //对dom而言，dom已被创建，且dom中引用的data被替换成相应的值
            this.lee_axios()//提前执行获取数据
          console.log(4);
        },
        beforeUpdate(){  //对data更新而言，vue的生母周期data会不断发生变化，每次变化前会触发beforeUpdate
          console.log(5);
        },
        updated(){   //对data更新而言，vue的生母周期data会不断发生变化，每次变化后会触发updated
          console.log(6);
        },
        beforeDestroy(){  //对vue实例销毁前而言
          console.log(7);
        },
        destroyed(){  //对vue实例销毁后而言
          console.log(8);
        },
        watch:{// 如果路由有变化，会再次执行该方法

        },
        methods:{
            jia(){
                this.$store.dispatch('increment',this.price)  //dispatch属于actions
            },
            jian(){
                this.$store.dispatch('decrement',this.price)
            },
            lee_axios(){ //mock模拟请求,延迟两秒
  //            setTimeout(function(){  //如果延迟执行dom先渲染，也可以说是异步
              this.$axios.get('/data/list')
                .then(res =>{
                  this.list=res.data.list
                  console.log(this.list);
                })
                .catch(err=>{
                  console.log(err);
                })
  //            },2000)
          }
        }
    }
</script>

<style lang="scss" scoped>
  span{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color:yellow;
    text-align: center;
    line-height: 1rem;
  }
  .mackjs_data{
    background-color:pink;width: 100%;height:4rem;margin-top: 1rem;border: 1px solid pink
  }
  .mackjs_data>button{
    background-color:yellow;padding: .06rem;
  }
  .mackjs_data>input{
    width: 100%;border: 1px solid red;
  }

  .v_for_list{
    width: 100%;height: 1rem;margin-top: 1rem;background-color:aquamarine;
  }

  .computdata_onchang{
    width: 100%;height: 2rem;margin-top: 1rem;background-color:darkcyan;
  }
  .computdata_onchang>input{
    width: 100%;border: 1px solid blue;
  }
  .computdata_onchang>p{
       color: white;
  }

  $width:4rem;
  .footer_img{
    width: 5rem;
    height: $width;
    background:blue;
    padding:.3rem;
    img{
      width: 4rem;
      height: $width;
      margin: 0 auto;
    }
  }
</style>
