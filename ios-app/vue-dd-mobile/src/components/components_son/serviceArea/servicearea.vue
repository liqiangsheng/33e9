<template>
  <div class="address_box">
    <C_header left_show="true" right_show="1" center_text="服务区域"  right_number="2"   @callback_city="callback_header_preservation"></C_header>


    <div class="address_header">
      <div class="address_header_son">
          <span class="address_header_individual" v-for="(item,index) in address_header">
            {{item.name}}
            <i @click="address_header_delete(index)">×</i>
          </span>
      </div>
    </div>
    <div class="address_title">
      <div>区</div>
      <div>街道</div>
    </div>
    <div class="address_exhibition">
      <div class="address_exhibition_left">
        <div v-for="(item,index) in address_region"  :class="{'active_region':active_region_number==index}"  @click="region_click(item,index)">
          {{item.name}}
        </div>
      </div>
      <div class="address_exhibition_right">
        <div v-for="(item,index) in address_street" :class="{'active_street':active_street_number==index}"   @click="street_click(item,index)">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:['',''],
    data(){
      return{
        address_header:[],//头部存放选择的地址(不包含id)
        address_region:[],//技能品类
        address_street:[],//维修名称

        active_region_number:0,//给品类active为true的方式
        active_street_number:0,//给维修名称active为true的方式
      }
    },
    computed:{

    },
    created(){
      let _this=this,dd_skill=null;
      if(sessionStorage.getItem('dd_city')){//把省市的value存在localStorage
        dd_skill=JSON.parse(sessionStorage.getItem('dd_city'));
      }
      _this.$axios.post(_this.$addressUrl + _this.$allUrl.qu_yu+`${dd_skill[0].id}`).then((data)=>{
        if(data.data.code=='0000'){
          if(data.data.result[0].id){   //如果默认第一个为空就给无的提示
            _this.address_region=data.data.result
            _this.$axios.post(_this.$addressUrl + _this.$allUrl.qu_yu+data.data.result[0].id).then((data)=>{
              if(data.data.code=='0000'){
                _this.address_street=data.data.result
              }
            });
          }else{
            _this.address_region=[{name:"无"}]
            _this.address_street=[{name:"无"}]
          }
        }else{
          console.log("请求失败");
        }
      }).catch((err)=>{
        console.log(err);
      });
    },
    mounted(){
      let _this=this;
      if(sessionStorage.getItem('dd_area')){//做缓存，每次选择的时候去localStorage里面去查找然后去显示
        let dd_skill=sessionStorage.getItem('dd_area');
        let dd_skill_length=JSON.parse(dd_skill);
        _this.address_header=dd_skill_length;
      }
    },
    components:{

    },
    methods:{
      region_click(item,index){ //点击省份
        let _this=this;
        _this.active_region_number=index;  //点击谁，谁就为true
        _this.address_street=[];  //把城市清空

        this.$axios.post(_this.$addressUrl+ this.$allUrl.cheng_shi+'id='+item.id).then((data)=>{ //点击哪个省就去请求哪个省下面市的数据
          _this.address_street=data.data.result;
        });
      },
      street_click(item,index){ //点击城市
        this.active_street_number=index;  //点击谁，谁就为true

        let item1=item,address_header_arr=true; //每次点击去遍历是否重复选择
        this.address_header.map((arr,index)=>{
          if(arr.name==item1.name)address_header_arr=false;
        });
        if(address_header_arr && item.name!=="无"){
//          this.address_header.push({id:item.id,name:item.name});  //点击谁就把谁的地址往address_header数组里面添加
          this.address_header.push(item);  //点击谁就把谁的地址往address_header数组里面添加
        }
      },
      address_header_delete(index){ //删除头部选择
        this.address_header.splice(index,1);
      },
      callback_header_preservation(data){ //把城市存储到localStorage
        if(this.address_header.length<1){
          this.$toast('请选择区域');
//          return false;
        }
        if(data){
          sessionStorage.setItem('dd_area',JSON.stringify(this.address_header));
          this.$router.push({name:'authen'});
        }
      },
    }
  }
</script>
<style scoped lang="scss">
  .address_box{
  .active_region{
    background-color:#fff !important;
    color: #6FA7F2;
  }
  .active_street{
    color: #6FA7F2;
  }

  .address_header{
    background: #ECECEC;

  .address_header_son{
    width:96%;
    margin:.12rem auto;

  .address_header_individual{
    display: inline-block;
    width: 2.12rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    background-color:#56CCF2;
    border-radius:.13rem;
    margin:.09rem .14rem;
    position: relative;

  i{
    position: absolute;
    top:-.14rem;
    right: -.14rem;
    color: #fff;
    width: .36rem;
    height: .36rem;
    line-height: .36rem;
    border-radius: 50%;
    text-align: center;
    background-color: rgba(117,117,117,.8);
  }
  }
  }

  }

  .address_title{
    text-align: center;
    border-bottom: .01rem solid #DFDFDF;
    height:.8rem;
    line-height: .8rem;
    display: flex;

  div:last-child{
    flex:1;
  }
  div:first-of-type{
    flex:1;
  }
  }

  .address_exhibition{
    height: .8rem;
    line-height: .8rem;
    display: flex;
    text-align: center;

  .address_exhibition_left{
    flex: 2;

  div{
    background-color:#ECECEC;
  }
  }
  .address_exhibition_right{
    flex: 3;

  div{
    background-color:#FFFFFF;
  }
  }
  }
  }
</style>
