<template>
  <div class="address_box">
    <C_header left_show="true" right_show="1" center_text="服务城市"  right_number="2"  @callback_city="callback_header_preservation"></C_header>

    <div class="address_header">
      <div class="address_header_son">
          <span class="address_header_individual" v-for="(item,index) in address_header">
            {{item}}
            <i @click="address_header_delete(index)">×</i>
          </span>
      </div>
    </div>
    <div class="address_title">
      <div>区域</div>
      <div>街道</div>
    </div>
    <div class="address_exhibition">
      <div class="address_exhibition_left">
        <div v-for="(item,index) in address_region"  :class="{'active_region':item.show}"  @click="region_click(item,index)">
          {{item.address}}
        </div>
      </div>
      <div class="address_exhibition_right">
        <div v-for="(item,index) in address_street" :class="{'active_street':item.show}"   @click="street_click(item,index)">
          {{item.address}}
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
            address_header:[],//头部存放选择的地址
            ajax_header_data:null,//头部存放选择的地址用来对比每次点击保存的时候是否重复给vuex
            address_region:[{address:'罗湖',show:true},{address:'宝安',show:false},{address:'龙华',show:false},{address:'龙岗',show:false},{address:'南山',show:false}],//区域
            address_street:[{address:'111',show:false},{address:'222',show:false},{address:'333',show:false},{address:'444',show:false},{address:'555',show:false}],//街道
          }
      },
      computed:{

      },
      created(){

      },
      mounted(){
        let _this=this;
        if(localStorage.getItem('dd_city')){//做缓存，每次选择的时候去localStorage里面去查找然后去显示
          let dd_skill=localStorage.getItem('dd_city');
          let dd_skill_length=dd_skill.split(",");
          _this.address_header=dd_skill_length;
        }
      },
      components:{

      },
      methods:{
        region_click(item,index){ //点击区域
            this.address_region.map((arr,index)=>{//循环把数组所有的show为false
              this.address_region[index].show=false;
            })
          this.address_region[index].show=true;//点击当前的index的show为true
        },
        street_click(item,index){ //点击街道
          this.address_street.map((arr,index)=>{  //循环把数组所有的show为false
            this.address_street[index].show=false;
          })
          this.address_street[index].show=true;  //点击当前的index的show为true

          let item1=item,address_header_arr=true; //每次点击去遍历是否重复选择
          this.address_header.map((arr,index)=>{
            if(arr==item1.address)address_header_arr=false;
          });
          if(address_header_arr){
            this.address_header.push(item.address);  //点击谁就把谁的地址往address_header数组里面添加
          }
        },
        address_header_delete(index){ //删除头部选择
          this.address_header.splice(index,1);
        },
//        callback_header_preservation(data){
//          console.log(this.$store.getters.getIncrement);
//          if(data){
//              if(this.address_header.length==0){
//                this.$toast('请选择区域');
//              }else{
//                this.$store.dispatch('increment',this.address_header)  //dispatch属于actions
//              }
//          }
//        },
        callback_header_preservation(data){  //把城市存储到localStorage
          console.log(data);
          if(data){
             localStorage.setItem('dd_city',this.address_header);
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
