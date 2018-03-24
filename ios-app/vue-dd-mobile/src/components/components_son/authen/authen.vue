<template>
  <div class="authen_box">
    <!--<C_header left_show="true" right_show="true"  center_text="认证信息" right_number="3"></C_header>-->
    <C_header left_show="true" right_show="true"  center_text="认证信息"></C_header>
    <div class="authen_title">
        <div class="active">① 基本信息</div>
        <div>② 上传证件照</div>
        <div>③ 完成</div>
    </div>

    <!--<keep-alive>-->
      <div class="input_box_border">
        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              姓名：
            </div>
            <div class="input_total_right">
              <div>
                <input type="text" placeholder="请填写真实姓名" v-model.trim="userName">
              </div>
            </div>
          </div>
        </div>

        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              身份证号：
            </div>
            <div class="input_total_right">
              <div>
                <input type="text" placeholder="请输入身份证号" v-model.trim="ID">
              </div>
            </div>
          </div>
        </div>

        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              服务城市：
            </div>
            <div class="input_total_right">
              <div @click="serviceCity_click">
                <input type="text" readonly="readonly"  placeholder="请填写工作的城市" v-model.trim="serviceCity">
              </div>
              <div @click="serviceCity_click">
                〉
              </div>
            </div>
          </div>
        </div>

        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              服务区域：
            </div>
            <div class="input_total_right">
              <div  @click="serviceArea_click">
                <input type="text" readonly="readonly" placeholder="选择可服务区域位置" v-model.trim="serviceArea">
              </div>
              <div @click="serviceArea_click">
                〉
              </div>
            </div>
          </div>
        </div>

        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              服务技能：
            </div>
            <div class="input_total_right">
              <div @click="serviceSkill_click">
                <input type="text" readonly="readonly" placeholder="水电维修" v-model.trim="serviceSkills">
              </div>
              <div  @click="serviceSkill_click">
                〉
              </div>
            </div>
          </div>
        </div>

        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              紧急联系人：
            </div>
            <div class="input_total_right">
              <div>
                <input type="text" placeholder="请填写真实姓名" v-model.trim="emergencyContact">
              </div>
            </div>
          </div>
        </div>

        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              联系人电话：
            </div>
            <div class="input_total_right">
              <div>
                <input type="text" placeholder="请填写手机号" v-model.trim="emergencyContactTel">
              </div>
            </div>
          </div>
        </div>
      </div>
    <!--</keep-alive>-->

    <div @click="lower_submit">
      <C_button class="c_button"  btn_disabled="2" btn_text="下一步"></C_button>
    </div>

  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  export default {
    data(){
      return {
        userName:'', //姓名
        ID:'',//身份证
        serviceCity:'',//服务城市
        serviceArea:'',//服务区域
        serviceSkills:'',//服务技能
        emergencyContact:'',//紧急联系人
        emergencyContactTel:'',//紧急联系人电话
      }
    },
    created(){
      this.store_getters(); //created的时候去获取store的getters
    },
    mounted(){
      let _this=this;
      if(sessionStorage.getItem('dd_city')){//把省市的value存在localStorage
        let dd_skill=JSON.parse(sessionStorage.getItem('dd_city'));
        dd_skill.map((arr,index)=>_this.serviceCity+=arr.name+',');
        _this.serviceCity=_this.serviceCity.substring(0,_this.serviceCity.length-1);  //去除字符串最后一位
      }
        if(sessionStorage.getItem('dd_area')){//把区域的value存在localStorage
        let dd_skill=JSON.parse(sessionStorage.getItem('dd_area'));
        dd_skill.map((arr,index)=>_this.serviceArea+=arr.name+',');
        _this.serviceArea=_this.serviceArea.substring(0,_this.serviceArea.length-1);  //去除字符串最后一位
      }
        if(sessionStorage.getItem('dd_skill')){//把技能的value存在localStorage
          let dd_skill=JSON.parse(sessionStorage.getItem('dd_skill'));
          dd_skill.map((arr,index)=>_this.serviceSkills+=arr.name+',');
          _this.serviceSkills=_this.serviceSkills.substring(0,_this.serviceSkills.length-1);  //去除字符串最后一位
        }
    },
    components: {},
    methods: {
      store_dispatch(){//城市，区域，技能点击的时候提交actives
        this.$store.dispatch('userName',this.userName)
        this.$store.dispatch('ID',this.ID)
        this.$store.dispatch('emergencyContact',this.emergencyContact)
        this.$store.dispatch('emergencyContactTel',this.emergencyContactTel)
      },
      store_getters(){ //进入的时候去获取store的getters
        this.userName=this.$store.getters.userName
        this.ID=this.$store.getters.ID
        this.emergencyContact=this.$store.getters.emergencyContact
        this.emergencyContactTel=this.$store.getters.emergencyContactTel
      },
      serviceCity_click(){ //点击箭头，城市
        this.$router.push({name:'serviceCity'});
        this.store_dispatch();
      },
      serviceArea_click(){ //点击箭头，区域
        if(this.serviceCity==""){  //必须先选择省市
            this.$toast('请先选择城市');
            return false;
        }
        this.$router.push({name:'serviceArea'});
        this.store_dispatch();
      },
      serviceSkill_click(){ //点击箭头，技能
        this.$router.push({name:'serviceSkill'});
        this.store_dispatch();
      },
      lower_submit(){ //下一步按钮
        let _this=this;
        if(_this.userName=='' || _this.userName==null){
            this.$toast('请输入姓名');
            return false;
        }else if(/^[0-9]+$/.test(_this.userName)){
            this.$toast('请输入合规的姓名');
            return false;
        }else if(_this.ID=='' || _this.ID==null){
            this.$toast('请输入身份证号');
            return false;
        }else if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(_this.ID)){
          this.$toast('请输入合规的身份证');
          return false;
        }else if(_this.serviceCity==''){
          this.$toast('请输入服务城市');
          return false;
        }else if(_this.serviceArea==''){
          this.$toast('请选择区域');
          return false;
        }else if(_this.serviceSkills==''){
          this.$toast('请选择技能');
          return false;
        }else if(_this.emergencyContact=='' || _this.emergencyContact==null){
          this.$toast('请输入联系人');
          return false;
        }else if(!/^1(3|4|5|7|8)\d{9}$/.test(_this.emergencyContactTel)){
          this.$toast('请输入合规的手机号');
          return false;
        }
        _this.store_dispatch();
//        let dataReq={
//          name:_this.$store.getters.userName,//名字
//          IDCard:_this.$store.getters.ID,//身份证
//          emergencyContact:_this.$store.getters.emergencyContact,//联系人
//          emergencyPhoneNum:_this.$store.getters.emergencyContactTel,//紧急联系人
//          cityId:JSON.stringify(common.get_storage('dd_city')[0].id),//城市id
//          city:JSON.stringify(common.get_storage('dd_city')[0].name),//城市
//          idPhotos:'',//图片
//          areaListJson:JSON.stringify(common.get_storage('dd_area')),//服务区域
//          labelBusinessListJson:JSON.stringify(common.get_storage('dd_skill')),//服务技能
//        };
        console.log("验证成功");
        _this.$router.push({name:'uploadCertificate'})
      }
    }
  }
</script>
<style scoped lang="scss">
$border-bottom: .01rem solid #E3E3E3;
.authen_box{
    .authen_title{
        border-bottom:$border-bottom;
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        display: flex;

        div{
          flex: 1;
          text-align: center;
        }
    }

    .input_box_border{
          .input_border{
            height: .9rem;
            border-bottom:$border-bottom;

            .input_total{
                width: 100%;
                height: .9rem;
                background-color: #fff;
                display: flex;
                -webkit-align-items:center;

                .input_total_left{
                    flex: 2;
                    padding-left: .6rem;
                    text-align: left;
                }
                .input_total_right{
                    flex: 4;
                    display:flex;

                    div:nth-of-type(1){
                      width: 92%;
                      height:100%;
                      flex:4;

                      input{
                        height:.8rem;
                        line-height: .8rem;
                        font-size: .3rem;
                        width: 100%;
                      }
                    }
                    div:nth-of-type(2){
                      height: .8rem;
                      line-height: .8rem;
                      flex:1;
                      text-align: center;
                    }
                }
            }
          }
    }

    .c_button{
      margin-top: 4rem;
    }

}

.active{
  color:#26a2ff;
  background-color:#ECECEC;
}
</style>
