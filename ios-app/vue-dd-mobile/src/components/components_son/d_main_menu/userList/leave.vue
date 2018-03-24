<template>
  <div class="time_box">
    <C_header left_show="true" center_text="请假"></C_header>
    <div>

      <div class="select_time">
        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              开始时间：
            </div>
            <div class="input_total_right"  @click="startPicker">
              <div>
                <input type="text" readonly="readonly"  placeholder="请选择开始时间" v-model="startTime">
              </div>
              <div>
                ＞
              </div>
            </div>
          </div>
        </div>

        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              结束时间：
            </div>
            <div class="input_total_right"  @click="endPicker">
              <div>
                <input type="text" readonly="readonly"  placeholder="请选择结束时间" v-model="endTime">
              </div>
              <div>
                ＞
              </div>
            </div>
          </div>
        </div>

        <div class="input_border">
          <div class="input_total">
            <div class="input_total_left">
              请假时长：
            </div>
            <div class="input_total_right">
              <div>
                <input type="text" readonly="readonly"  placeholder="0天" v-model="longTime">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="textarea_time">
        <div class="textarea_time_title">
          请假事由
        </div>
        <div class="textarea_field">
          <textarea  maxlength ="100" id="textarea_field_textarea" v-model="user_textarea" placeholder="请输入请假事由">

          </textarea>
          <span>还可以输入{{100-result}}字符</span>
          <!--<div class="textarea_div" contenteditable="true">-->
            <!--&lt;!&ndash;可输入内容的div&ndash;&gt;-->
          <!--</div>-->
        </div>
      </div>

      <div class="leave_button">
        <C_button class="c_leave_button" :btn_disabled="btn_disabled_num" @callback_c_btn="submit_btn" btn_text="提交"></C_button>
      </div>

      <mt-datetime-picker
        ref="picker_start"
        type="date"
        v-model="valueStart"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        @confirm="handleChangeStart">
      </mt-datetime-picker>

      <mt-datetime-picker
        ref="picker_end"
        type="date"
        v-model="valueEnd"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        @confirm="handleChangeEnd">
      </mt-datetime-picker>

    </div>
  </div>
</template>
<script>
  import common from '../../../../assets/js/common' //公共js方法
export default{
    data(){
        return{
          startDate:new Date(Date.parse(new Date()) + 1000 * 60 * 60 * 24), //开始时间
          valueStart: null,//日期开始的值
          valueEnd: null,//日期结束的值
          startTime:'',//开始时间
          endTime:'',//结束时间
          longTime:'',//请假时长
          startNum:0,
          endNum:0,
          user_textarea:'',//文本域
          btn_disabled_num:'2', //提交按钮是否可点击
        }
    },
    watch:{

    },
    computed:{
      result:function(){
          return this.user_textarea.toString().replace(/\s/g,"").length;
      }
    },
    components:{},
    methods:{
      startPicker() {
        this.$refs.picker_start.open();
      },
      endPicker() {
        this.$refs.picker_end.open();
      },
      handleChangeStart(value) {
        var d = new Date(value);
        let youWant1=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        let youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        console.log(youWant);
        this.startNum=(d.getFullYear()+d.getMonth() + 1+d.getDate())*1;
        this.startTime=youWant; //把开始时间的值给输入框
        if(this.endNum){
          if(this.endNum<=this.startNum){
            this.endTime=this.startTime;
          }
        }
        this.longTime=(this.endNum-this.startNum+1)*1+'天';//请假天数
        if((this.endNum-this.startNum+1)*1<0){
          this.longTime=1+'天';
        }
        //new Date('Thu May 12 2016 08:00:00 GMT+0800 (中国标准时间)')
      },
      handleChangeEnd(value) {
        var d = new Date(value);
        let youWant1=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        let youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        console.log(youWant);
        this.endNum=(d.getFullYear()+d.getMonth() + 1+d.getDate())*1;
        this.endTime=youWant; //把结束时间的值给输入框
        if(this.startNum){
          if(this.startNum>=this.endNum){
            this.endTime=this.startTime;
            }
        }
        if(this.startTime && this.endTime){
          this.longTime='';
          this.longTime=(this.endNum-this.startNum+1)*1+'天';//请假天数
          if((this.endNum-this.startNum+1)*1<0){
            this.longTime=1+'天';
          }
        }
      },
      checkLength:function(index){ //文本域
        return index <= 1 ? 10: ''
      },
      submit_btn(data){
        let _this=this;
        if(_this.startTime==''){
          this.$toast('请输入开始时间');
          return
        }
        if(_this.endTime==''){
          this.$toast('请输入结束时间');
          return
        }
        if(_this.user_textarea==''){
          this.$toast('请输入请假原因');
          return
        }
        let token1=JSON.parse(sessionStorage.getItem("token"));
        if(!token1){
          this.$toast('提交成功');
          return
        }
        _this.btn_disabled_num='1';//禁止点击按钮
        let dataUrl={
            token:token1,
            startTimeString:_this.startTime,
            endTimeString:_this.endTime,
            applyForCause:_this.user_textarea
        }
        _this.$axios.post(_this.$addressUrl+_this.$allUrl.qing_jia,dataUrl).then(function (res) {
            if(res.data.code == '0000'){
              _this.$toast('提交成功');
              _this.$router.push({name:'d_my'});
            }else{
              _this.$toast('提交失败，请重新提交');
              _this.btn_disabled_num='2';//允许点击按钮
          }
        });
      }
    },
}
</script>
<style scoped lang="scss">
$border-bottom: .01rem solid #E3E3E3;
.time_box{
  width: 100%;
  height: 100%;
  background-color:#ECECEC;
}
.select_time{
  margin:.3rem 0;
  background-color:#fff;

    .input_border{
      height: .9rem;
      border-bottom:$border-bottom;

        .input_total{
          width: 100%;
          height: .9rem;
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
                margin: 0;
                font-size:.28rem;
                height: 100%;
                width: 100%;
              }
            }
            div:nth-of-type(2){
              flex:1;
              text-align: center;
              /*background-color:red;*/
            }
          }
        }
    }
}

.textarea_time{
    width: 100%;
    background:#fff;

    .textarea_time_title{
      height:.9rem;
      line-height: .9rem;
      padding-left: .6rem;
      border-bottom:$border-bottom;
    }
    .textarea_field{
      width: 6.6rem;
      margin: 0 auto;
      margin-top: .28rem;
      height: 2.8rem;
      /*取消焦点边距*/
      outline:none;
      /*取消拖动*/
      resize:none;

      #textarea_field_textarea{
        width: 100%;
        /*margin-left:.13rem;*/
        /*padding: 0 .6rem;*/
        background-color:#ECECEC;
        height: 2.2rem;
        font-size: .32rem;
      }
      span{
        display: inline-block;
        width: 100%;
        height: .5rem;
        line-height: .5rem;
        font-size: .15rem;
        text-align: right;
      }
      /*.textarea_div{*/
        /*width: 100%;*/
        /*height: 2rem;*/
        /*background-color:aquamarine;*/

        /*div{*/
          /*height: 2rem;*/
        /*}*/
      /*}*/
    }
}

.leave_button{

  .c_leave_button{
    width:94%;
    margin: 0 auto;
    margin-top:1.2rem;
  }
}
</style>
