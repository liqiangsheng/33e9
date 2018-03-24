<template>
    <div class="add_service">
      <div>
        <C_header left_show="true"  center_text="添加服务"></C_header>
      </div>
      <div class="add_scrvice_main">
          <div class="add_scrvice_main_classifica">
            <div>家电分类</div>
            <div class="classifica_list">
              <span  v-for="(item,index) in classifica_list" :class="{'active':classifica_list_number==index}"  @click="classifica_list_click(item,index)">
                {{item}}
              </span>
            </div>
          </div>

          <div class="add_scrvice_main_classifica">
            <div>问题类型</div>
            <div class="classifica_list">
              <span  v-for="(item,index) in classifica_list" :class="{'active':type_list_number==index}"  @click="type_list_click(item,index)">
                {{item}}
              </span>
            </div>
          </div>

          <div class="add_scrvice_main_classifica">
            <div>问题类型</div>
            <div class="classifica_list">
              <span  v-for="(item,index) in classifica_list" :class="{'active':type_list_number==index}"  @click="type_list_click(item,index)">
                {{item}}
              </span>
            </div>
          </div>

      </div>

      <div class="add_service_btn">
        <C_button btn_disabled="2" btn_text="添加"></C_button>
      </div>

    </div>
</template>
<script>
  export default{
    data(){
      return {
        classifica_list:["1","21","221","1222","122","1222","1222","12222"],
        classifica_list_number:0, //家电分类与index为true就显示active
        type_list_number:0, //问题类型与index为true就显示active
      }
    },
    created(){
      let _this=this;
//      01010201
      _this.$axios.post(_this.$allUrl.shang_chuan_img,{file:_this.submit[index]}).then((data)=>{
        console.log(index,"上传图片",data);
      });
    },
    methods:{
      classifica_list_click(item,index){ //家电分类
        this.classifica_list_number=index;//把index给active
      },
      type_list_click(item,index){//问题类型
        this.type_list_number=index;//把index给active
      }
    }
  }
</script>
<style scoped lang="scss">
  .active{
    background-color:#2F80ED;
    color: #fff;
  }
  .add_service{

      .add_scrvice_main{

        .add_scrvice_main_classifica{
          width:94%;
          border-bottom: .01rem solid #D9D9D9;
          margin: 0 auto;
          margin-top: .2rem;
          margin-bottom: .2rem;
          background-color: #fff;

          div:nth-of-type(1){
            height: .8rem;
            line-height: .8rem;
          }
          .classifica_list{
            box-sizing: border-box;
            display: flex;
            flex-wrap:wrap;

            span{
              display: inline-block;
              margin:.06rem 0;
              padding: 0;
              width:50%;
              height: .6rem;
              line-height: .6rem;
              text-align: center;
              border-radius: .1rem;
            }
          }
        }
      }

      .add_service_btn{
        margin-top: 1rem;
      }
  }
</style>
