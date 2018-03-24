<template>
  <div>
    <div>
      <C_header left_show="true" center_text="常见问题"></C_header>
    </div>
    <div class="user_list">

      <div @click="commonProblemSonClick('1')" :class="{'active':activeNum=='1'}">
        <div>
          <span>一、收费标准</span>
        </div>
        <div>＞</div>
      </div>
      <div @click="commonProblemSonClick('2')" :class="{'active':activeNum=='2'}">
        <div>
          <span>二、高空问题</span>
        </div>
        <div>＞</div>
      </div>
      <div @click="commonProblemSonClick('3')"  :class="{'active':activeNum=='3'}">
        <div>
          <span>三、配件问题</span>
        </div>
        <div>＞</div>
      </div>
      <div @click="commonProblemSonClick('4')" :class="{'active':activeNum=='4'}">
        <div>
          <span>四、质保期</span>
        </div>
        <div>＞</div>
      </div>

    </div>
  </div>
</template>
<script>
export default{
    data(){
        return{
          activeNum:"",
        }
    },
    methods:{
      commonProblemSonClick(index){//点第几个
        let _this=this;
        this.activeNum=index;
        setTimeout(function () {
          _this.$router.push({name:'commonProblemSon',params:{ranking:index}});
        },300);
      }
    }
}
</script>
<style scoped lang="scss">
  .user_list{
  margin-top:.2rem;

  >div{
     display: flex;
     justify-content:space-between;
     height:.88rem;
     line-height: .88rem;
     border-top:.01rem solid #ECECEC;
     border-bottom:.01rem solid #ECECEC;
     background-color:#fff;
      padding:0 .2rem;
    }
  }

  .active{
    background-color:#2F80ED !important;
    color: #fff;
  }
</style>
