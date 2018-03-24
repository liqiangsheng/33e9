<template>
  <div>
    <div>
      <C_header left_show="true" center_text="编辑资料"></C_header>
    </div>
    <div class="main">
      <div class="main_one">
        <div>
          <span>真实姓名</span>
          <span>{{personal_data1.name}}</span>
        </div>
        <div>
          <span>服务城市</span>
          <span>{{personal_data1.city}}</span>
        </div>
        <div>
          <span>所属网点</span>
          <span>{{personal_data1.cityId}}</span>
        </div>
      </div>
      <div class="main_two">
        <div>服务区域</div>
        <div>
          <span  v-for="(item,index) in personal_data1.areas">{{item.area}}</span>
        </div>
      </div>
      <div class="main_two">
        <div>服务技能</div>
        <div>
          <span   v-for="(item,index) in personal_data1.skills">{{item.skillName}}</span>
        </div>
      </div>
      <div class="main_four">
        <C_button class="c_button" @callback_c_btn="submit"  btn_disabled="2" btn_text="退出登录"></C_button>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../../../../assets/js/common'
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default{
    data(){
        return{

        }
    },
    created(){

    },
    computed:{
      ...mapGetters([
          'personal_data1'
      ])
    },
    methods:{
      submit(data){
        let _this=this;
        if(data){
            sessionStorage.removeItem("dd_token")
            sessionStorage.removeItem("dd_tel")
            localStorage.removeItem("dd_local_tel")
            localStorage.removeItem("dd_local_token")
            _this.$router.push({name:'login'})  //跳转到登录页
        }
      }
    }
}
</script>
<style scoped>

  .main{
    background-color:#ECECEC;
  }
  .main .main_one{
    margin-top: .3rem;
    width: 100%;
    padding: .2rem 0;
    background-color: #fff;
  }
  .main .main_one>div{
    width: 96%;
    height: .8rem;
    line-height: .8rem;
    margin:0 auto;


    display: flex;
    justify-content: space-between;
  }

  .main_two{
    margin-top: .3rem;
    padding: .2rem 0;
    background-color: #fff;
  }
  .main_two div:nth-of-type(2){
    width: 100%;
  }
  .main_two div:nth-of-type(2) span{
    display: inline-block;
    padding: 0 .4rem;
    margin-top: .2rem;
    margin-left: .2rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    border-radius:.1rem;
    color: #fff;
    background-color:#26a2ff;
  }

  .main_four{
    margin-top: 1.3rem;
  }
</style>
