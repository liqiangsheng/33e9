<template>
  <div>
    <div>
      <C_header left_show="true" right_show="true" center_text="服务清单"></C_header>
    </div>
    <div class="service_list_main">
      <div class="service_list_main_one">
        <div>
          <span>工单号：</span>
          <span>{{order_service_list.order.id}}</span>
        </div>
        <div>
          {{order_service_list.order.fLabelBusiness}}
        </div>
      </div>
      <div class="service_list_main_two">
        <div>上传服务凭证</div>
        <div>

          <!--<div>-->
            <div class="upload">
              <div class="upload_warp_text">
                相关资格证书&nbsp;&nbsp;&nbsp;选中{{imgList.length}}张图片，共{{bytesToSize(this.size)}}
              </div>
              <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
              <div class="upload_warp_img">
                <div class="upload_warp_img_div" v-for="(item,index) of imgList"  v-show="imgList.length!=0">
                  <div class="upload_warp_img_div_top">
                    <div class="upload_warp_img_div_text">
                      {{item.file.name}}
                    </div>
                    <img src="../../../../static/img/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                  </div>
                  <img :src="item.file.src">
                </div>

                <div class="upload_warp_left" @click="fileClick">
                  <div>
                    <div class="bottom_img_sample">
                      <div class="bottom_img_sample_one">
                        <i class="iconfont icon-xiangji"></i>
                      </div>
                      <div class="bottom_img_sample_two">
                        {{imgList.length}}/8
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            <!--</div>-->
          </div>
        </div>
      </div>
      <div>
        <div class="service_list_main_three" v-for="(item,index) in service_list">
          <div class="service_list_main_three_title">空调维修</div>
          <div class="">
            <div class="three_list" @click="repair_show_click(item,index)"  v-if="item.serviceInfo">
              <div>维修费</div>
              <div>{{repair_value_text['repair_value_text'+index]}}：{{repair_value_num['repair_value_num'+index]}}元</div>
              <div>〉</div>
            </div>
            <!--维修费弹出框开始-->
            <!--<transition name="fade">-->
              <div class="repair_main" v-if="repair_show_none['repair_show_none_alert'+index+'']"  @click="repair_none_click(item,index)">
                <div class="repair_main_box"  v-for="(item1,index1) in item.serviceInfo">
                  <div class="repair_main_title">维修费</div>
                  <div  @click.stop="repair_maintenanceCost_show(item,index)">
                    <mt-radio
                      align="right"
                      v-model="repair_value"
                      :options="options">
                    </mt-radio>
                  </div>
                  <div class="repair_main_bottom">
                    <button @click="maintenance_click(repair_value,item1,index)">确定</button>
                  </div>
                </div>
              </div>
            <!--</transition>-->
            <!--维修费弹出框结束-->
          </div>

          <div>
            <div class="three_list"   @click="high_show_click(item,index)" v-if="item.highAltitudeSettings[0].areaId && item.highAltitudeSettings.length>0">
              <div>高空费</div>
              <div>{{high_value_text['high_value_text'+index]}}：{{high_value_num['high_value_num'+index]}}元</div>
              <div>〉</div>
            </div>
            <!--高空费弹出框开始-->
            <!--<transition name="fade">-->
              <div class="repair_main" v-if="hign_show_none['hign_show_none_alert'+index+'']"  @click="high_none_click(item,index)">
                <div class="repair_main_box" v-for="(item1,index1) in item.highAltitudeSettings">
                  <div class="repair_main_title">高空费</div>
                  <div  @click.stop="high_maintenanceCost_show(item,index)">
                    <mt-radio
                      align="right"
                      v-model="high_value"
                      :options="highFee">
                    </mt-radio>
                  </div>
                  <div class="repair_main_bottom">
                    <button @click="high_fees_click(item1,high_value,index)">确定</button>
                  </div>
                </div>
              </div>
            <!--</transition>-->
            <!--高空费弹出框结束-->
          </div>

          <div>
            <div class="three_list"  @click="parts_show_click(item,index)"  v-if="item.serviceMountings && item.serviceMountings.length>0">
              <div>配件费</div>
              <div>请选择配件</div>
              <div>〉</div>
            </div>
            <!--配件费弹出框结束-->
            <!--<transition name="fade">-->
              <div class="repair_main" v-if="main_show_none['main_show_none_alert'+index+'']"  @click="parts_none_click(item,index)">
                <div class="parts_main_box"  @click.stop="parts_maintenanceCost_show(item,index)">
                  <div class="parts_main_title">配件费</div>
                  <div class="parts_main_content">
                    <div class="parts_main_content_list" v-for="(item_son,index1) in item.serviceMountings">
                      <div>{{item_son.name}}</div>
                      <div>￥{{item_son.price}}</div>
                      <div class="parts_number_click">
                        <span @click="parts_price_click_reduction('-',item_son,index,index1)">-</span>
                        <span>{{item_son.num}}</span>
                        <span @click="parts_price_click_add('+',item_son,index,index1)">+</span>
                      </div>
                    </div>

                    <div class="parts_main_content_list">
                      <div class="parts_main_content_list_input">
                        <input type="text" placeholder="输入配件名">
                      </div>
                      <div class="parts_main_content_list_input">
                        <input type="text" placeholder="输入价格">
                      </div>
                      <div class="parts_number_click">
                        <span>-</span>
                        <span>11</span>
                        <span>+</span>
                      </div>
                    </div>
                    <div class="parts_button_totai">
                      <div>新增其他配件</div>
                      <div>
                        <span>小计：</span>
                        <!--<span>{{service_total_price.parts.toFixed(2)}}</span>-->
                        <span>{{service_total_price['parts'+index+'']}}</span>
                      </div>
                      <div>
                        <button  @click.stop="serviceMountings_click(index)">确定</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <!--</transition>-->
            <!--配件费弹出框结束-->
          </div>

        </div>
      </div>


      <div class="service_list_main_four">
        <div @click="add_service_click">
          <span>＋</span>
          <span>添加服务</span>
        </div>
      </div>

      <div class="service_list_main_five">
        <div>
          <span>合计</span>
          <span>￥{{service_total_price_total_price}}</span>
        </div>
        <div>
          <span>已收款</span>
          <span>￥200</span>
        </div>
        <div>
          <span>待收款</span>
          <span>￥200</span>
        </div>
      </div>

      <div class="service_list_main_six">
        <C_button btn_disabled="2" btn_text="确认账单"></C_button>
      </div>
    </div>

  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default{
      data(){
          return{
            service_list:[], //服务清单所有的数据
            service_total_price:{},//配件费集合合计
            service_total_price_num:0,//最终合计的配件费
            service_total_price_arr:[],//存放配件费的id名称之类的集合
            service_high_total_price:{},//高空费集合
            service_high_total_price_num:0,//最终合计的高空费
            service_high_total_price_arr:[],//存放高空费的id名称之类的集合
            service_repair_total_price:{},//维修费集合
            service_repair_total_price_num:0,//最终合计的维修费
            service_repair_total_price_arr:[],//存放高空费的id名称之类的集合

            options:[  //维修费
              {label: '小修：100元', value: '小修'},
              {label: '中修：150元', value: '中修'},
              {label: '大修：200元',value: '大修'},
              {label: '检测：30元', value: '检测'}
            ],
            repair_value:'小修',//单选的值
            repair_value_text:{}, //维修默认价格文字集合
            repair_value_num:{}, //维修默认价格集合

            highFee:[ //高空费
              {label: '高空费：100元', value: '高空费'},
              {label: '特高空：200元', value: '特高空'},
            ],
            high_value:'高空费',//单选的值
            high_value_text:{}, //高空默认价格文字集合
            high_value_num:{}, //高空费默认价格集合

            main_show_none:{}, //配件费是否显示集合
            hign_show_none:{}, //高空费是否显示集合
            repair_show_none:{}, //维修费是否显示集合

            imgList: [],
            size: 0,

            serviceId_data:[],//存剪切的serviceId
            linkmanAreaId_data:[],//存剪切的linkmanAreaId
            service_total_price_total_price:0,//合计
          }
      },
      watch:{
        repair_value(newVal,oldVal){ //维修费的点击值
//          console.log(newVal);
        },
        high_value(newVal,oldVal){ //高空费的点击值
//          console.log(newVal);
        },
      },
      computed:{
        ...mapGetters([  //首页订单的数据
          "order_service_list",
          "order_service_price_list",
        ])
      },
      created(){
        let _this=this;
          _this.service_list=_this.$store.getters.order_service_price_list;
      },
      mounted(){
          let _this=this;
            _this.$store.getters.order_service_price_list.map((arr,index)=>{ //动态创建配件的价格合计都等于0
              _this.service_total_price['parts'+index]=0;
              _this.service_high_total_price['high'+index]=0;
              _this.service_repair_total_price['repair'+index]=0;

              //维修费
              if(arr.serviceInfo != '' || arr.serviceInfo != null || arr.serviceInfo != undefined){
                _this.$set(_this.repair_value_text,'repair_value_text'+index,'小修');
              }
              if(arr.serviceInfo != '' || arr.serviceInfo != null || arr.serviceInfo != undefined){
                _this.$set(_this.repair_value_num,'repair_value_num'+index,100);
              }
              //高空费
              if(arr.highAltitudeSettings != '' || arr.highAltitudeSettings != null || arr.highAltitudeSettings != undefined){
                _this.$set(_this.high_value_text,'high_value_text'+index,'高空费');
              }
              if(arr.highAltitudeSettings != '' || arr.highAltitudeSettings != null || arr.highAltitudeSettings != undefined){
                _this.$set(_this.high_value_num,'high_value_num'+index,100);
              }
            });
      },
      methods:{
        add_service_click(){
          console.log("添加服务");
          this.$router.push({name:'addService'});
        },
        repair_show_click(item,index){ //维修费弹出框遮罩层点击为true
          let main_repair_none_alert_index=index;
          let _this=this;
          if(_this.service_list.length>0){
            _this.service_list.map((arr,index1)=>{
                if(main_repair_none_alert_index==index1){
                  _this.$set(_this.repair_show_none,'repair_show_none_alert'+index+'',true);
                }else{
                  _this.$set(_this.repair_show_none,'repair_show_none_alert'+index+'',false);
                }
            });
          }
          _this.repair_show_none['repair_show_none_alert' + index + ''] = true;
        },
        repair_none_click(item,index){//维修费弹出框点击点击遮罩层隐藏
          let _this=this;
          _this.repair_show_none['repair_show_none_alert' + index + ''] = false;
        },
        repair_maintenanceCost_show(item,index){ //维修费弹出框点击始终为true
          let _this=this;
          _this.repair_show_none['repair_show_none_alert' + index + ''] = true;
        },
        maintenance_click(val,item,index){ //维修费确定按钮
          let _this=this;
          _this.repair_value_text['repair_value_text'+index]=val;  //点击谁就赋值给repair_value_text文字
          val=='小修'? _this.repair_value_num['repair_value_num'+index]=100 : val=='中修' ?_this.repair_value_num['repair_value_num'+index]=150 : val=='大修' ?
                _this.repair_value_num['repair_value_num'+index]=200 : val=='检测' ? _this.repair_value_num['repair_value_num'+index]=30 : _this.repair_value_num['repair_value_num'+index]=100;

          _this.service_repair_total_price['repair'+index+''] = _this.service_list[index].serviceInfo; //请求的数据给对象存起来
          _this.service_repair_total_price['repair'+index+''].alter_name=val;  //不为空字符串就说明name发生改变
          _this.service_repair_total_price['repair'+index+''].toltal_price=_this.repair_value_num;  //添加总价
          let repair_service_repair_total_price=0;
          for(let key in _this.service_repair_total_price){
              if(_this.service_repair_total_price[key].toltal_price != undefined){
                repair_service_repair_total_price=(repair_service_repair_total_price+(_this.service_repair_total_price[key].toltal_price * 1));
              }
          }
            _this.service_repair_total_price_num=0; //清空
            _this.service_repair_total_price_num=repair_service_repair_total_price; //保存维修费的总数


          _this.service_total_price_total_price=0;//清空
          _this.service_total_price_total_price=(_this.service_total_price_num * 1)+(_this.service_high_total_price_num * 1)+(_this.service_repair_total_price_num * 1);
          console.log("维修费，合计-配件费-高空-维修",_this.service_total_price_num , _this.service_high_total_price_num , _this.service_repair_total_price_num);
        },
        parts_show_click(item,index){ //配件费弹出层遮罩层点击为true
          let main_show_none_alert_index=index;
          let _this=this;
          if(_this.service_list.length>0){
            _this.service_list.map((arr,index1)=>{
              arr.serviceMountings.map((arr1,index2)=>{
                  if(main_show_none_alert_index==index2){
                    _this.$set(_this.main_show_none,'main_show_none_alert'+index+'',true);
                  }else{
                    _this.$set(_this.main_show_none,'main_show_none_alert'+index+'',false);
                  }
              });
            });
          }
          _this.main_show_none['main_show_none_alert' + index + ''] = true;
        },
        parts_none_click(item,index){ //点击透明遮罩层隐藏配件弹出框
            let _this=this;
            _this.main_show_none['main_show_none_alert' + index + ''] = false;
        },
        parts_maintenanceCost_show(item,index){//配件费弹出框自身点击始终为true
          let _this=this;
          _this.main_show_none['main_show_none_alert' + index + ''] = true;
        },
        parts_price_click_add(add,item_son,index,index1){//配件费数量加 //.toFixed(2) 四舍五入取两位
          console.log(add, item_son, index, index1);
          let _this=this;
          _this.service_list[index].serviceMountings[index1].num=_this.service_list[index].serviceMountings[index1].num+1;
          _this.service_list[index].serviceMountings[index1].total_price=_this.service_list[index].serviceMountings[index1].num * item_son.price;
          let param=item_son.price;
          _this.service_total_price['parts'+index+'']+=param;
        },
        parts_price_click_reduction(subtract,item_son,index,index1){//配件费数量减
          let _this=this;
          if(item_son.num<=0){
            _this.service_list[index].serviceMountings[index1].num=0;
            _this.service_list[index].serviceMountings[index1].total_price=0;
          }else{
            _this.service_list[index].serviceMountings[index1].num=_this.service_list[index].serviceMountings[index1].num-1;
            _this.service_list[index].serviceMountings[index1].total_price=_this.service_list[index].serviceMountings[index1].total_price - item_son.price;
          }
          let param=item_son.price;
          _this.service_total_price['parts'+index+'']-=param;
          if( _this.service_total_price['parts'+index+'']<=0){
            _this.service_total_price['parts'+index+'']=0;
          }
        },
        serviceMountings_click(index){//配件费确定按钮
          let _this=this;
          _this.$set(_this.main_show_none,'main_show_none_alert'+index+'',false);
          _this.service_total_price_arr=[];//清空
          _this.service_list.map(function (arr1,index1) {
            arr1.serviceMountings.map(function (arr2,index2) {
              if(arr2.total_price != 0){
                _this.service_total_price_arr.push(arr2);//点击了数量有总价的把当前信息对象添加到数组里存起来
              }
            });
          });
          let parts_service_total_price_num=0;
          if(_this.service_total_price_arr.length>0){
            _this.service_total_price_arr.map(function (arr,index) {
              parts_service_total_price_num+=arr.total_price;
            }) ;
            _this.service_total_price_num=parts_service_total_price_num; //配件费合计
          }


          _this.service_total_price_total_price=0;//清空
          _this.service_total_price_total_price=(_this.service_total_price_num * 1)+(_this.service_high_total_price_num * 1)+(_this.service_repair_total_price_num * 1);
          console.log("配件费，合计-配件费-高空-维修",_this.service_total_price_num , _this.service_high_total_price_num , _this.service_repair_total_price_num);
        },
        high_show_click(item,index){ //高空费弹出层遮罩层点击为true
          console.log("遮罩层",item, index);
          let _this=this;
          let hign_show_none_alert_index=index;
          if(_this.service_list.length>0){
            _this.service_list.map((arr,index1)=>{
              arr.highAltitudeSettings.map((arr1,index2)=>{
                if(hign_show_none_alert_index==index2){
                  _this.$set(_this.hign_show_none,'hign_show_none_alert'+index+'',true);
                }else{
                  _this.$set(_this.hign_show_none,'hign_show_none_alert'+index+'',false);
                }
              });
            });
          }
          _this.hign_show_none['hign_show_none_alert' + index + ''] = true;
        },
        high_none_click(item,index){//点击透明遮罩层隐藏高空费弹出框
          let _this=this;
          _this.hign_show_none['hign_show_none_alert' + index + ''] = false;
        },
        high_maintenanceCost_show(item,index){//高空费弹出框自身点击始终为true
          let _this=this;
          _this.hign_show_none['hign_show_none_alert' + index + ''] = true;
        },
        high_fees_click(item,val,index){ //高空费确定按钮
          let _this=this;
          _this.high_value_text['high_value_text'+index]=val;  //点击谁就赋值给repair_value_text文字
          val=='高空费'? _this.high_value_num['high_value_num'+index]=100 : val=='特高空' ?_this.high_value_num['high_value_num'+index]=200 :_this.high_value_num['high_value_num'+index]=100;

          _this.service_high_total_price['high'+index+'']=item;

          _this.service_total_price_total_price=0;//清空
          _this.service_total_price_total_price=(_this.service_total_price_num * 1)+(_this.service_high_total_price_num * 1)+(_this.service_repair_total_price_num * 1);
          console.log("高空费，合计-配件费-高空-维修",_this.service_total_price_num , _this.service_high_total_price_num , _this.service_repair_total_price_num);
        },
        upload_img(){
          let files=this.files[0];
          console.log(files);
        },
        fileClick() {
          document.getElementById('upload_file').click()
        },
        fileChange(el) {
          if (!el.target.files[0].size) return;
          this.fileList(el.target);
          el.target.value = ''
        },
        fileList(fileList) {
          let files = fileList.files;
          for (let i = 0; i < files.length; i++) {
            //判断是否为文件夹
            if (files[i].type != '') {
              this.fileAdd(files[i]);
            } else {
              //文件夹处理
              this.folders(fileList.items[i]);
            }
          }
        },
        //文件夹处理
        folders(files) {
          let _this = this;
          //判断是否为原生file
          if (files.kind) {
            files = files.webkitGetAsEntry();
          }
          files.createReader().readEntries(function (file) {
            for (let i = 0; i < file.length; i++) {
              if (file[i].isFile) {
                _this.foldersAdd(file[i]);
              } else {
                _this.folders(file[i]);
              }
            }
          })
        },
        foldersAdd(entry) {
          let _this = this;
          entry.file(function (file) {
            _this.fileAdd(file)
          })
        },
        fileAdd(file) {
          //总大小
          this.size = this.size + file.size;
          //判断是否为图片文件
          if (file.type.indexOf('image') == -1) {
            file.src = 'wenjian.png';
            this.imgList.push({
              file
            });
          } else {
            let reader = new FileReader();
            reader.vue = this;
            reader.readAsDataURL(file);
            reader.onload = function () {
              file.src = this.result;
              this.vue.imgList.push({
                file
              });
            }
          }
        },
        fileDel(index) {
          this.size = this.size - this.imgList[index].file.size;//总大小
          this.imgList.splice(index, 1);
        },
        bytesToSize(bytes) {
          if (bytes === 0) return '0 B';
          let k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
          return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
      }
  }
</script>
<style scoped lang="scss">

  /* .box::-webkit-scrollbar {display:none} 隐藏滚动条*/

  /*配件费选择框开始*/
  .parts_main_box{
    background-color:#fff;
    width: 100%;
    min-height: 7rem;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  /*配件费底部的小计和确定按钮开始*/
  .parts_main_box  .parts_button_totai{
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: .9rem;
    line-height: .9rem;
    background-color: #fff;
    /*justify-content: space-between;*/
  }
  .parts_main_box  .parts_button_totai  div:nth-of-type(1){
    flex: 1;
    color: #498FEF;
  }
  .parts_main_box  .parts_button_totai div:nth-of-type(2){
    flex: 1;
    background-color:yellow;
    padding-left: .8rem;
    text-align: left;
  }
  .parts_main_box  .parts_button_totai div:nth-of-type(2) span:nth-of-type(2){
    color:#498FEF;
  }
  .parts_main_box  .parts_button_totai  div:nth-of-type(3){
    flex: 1;
    text-align: right;
  }
  .parts_main_box  .parts_button_totai  div:nth-of-type(3) button{
    width: 60%;
    height: 100%;
    color: #fff;
    background-color:#2F80ED;
  }
  /*配件费底部的小计和确定按钮结束*/
  .parts_main_box  .parts_main_title{
    height: .9rem;
    line-height: .9rem;
    font-weight: 600;
    text-align: center;
  }
  .parts_main_box   .parts_main_content{
    max-height: 6rem;
    overflow-y: auto;
    background-color:azure;
  }
  .parts_main_box   .parts_main_content::-webkit-scrollbar {
    display:none
  }
  .parts_main_box   .parts_main_content_list{
    display: flex;
    /*justify-content: space-between;*/
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    border-bottom: .01rem solid #ECECEC;
  }
  .parts_main_box   .parts_main_content_list  div:nth-of-type(1){
    flex: 4;
    text-align: left;
    overflow: hidden;
  }
  .parts_main_box   .parts_main_content_list  div:nth-of-type(2){
    /*text-align: center;*/
    flex: 1.4;
    /*padding-left: .8rem;*/
    background-color:red;
  }
  .parts_main_box   .parts_main_content_list  div:nth-of-type(3){
    text-align: right;
    flex: 3;
  }
  .parts_main_box   .parts_main_content_list  .parts_main_content_list_input{
      width: 33%;
  }
  .parts_main_box   .parts_main_content_list  .parts_main_content_list_input input{
      width: 50%;
      height: 96%;
      margin: 0 auto;
  }
  /*右边圆点击按钮*/
  .parts_main_box   .parts_main_content_list  .parts_number_click span:nth-of-type(1),
  .parts_main_box   .parts_main_content_list  .parts_number_click span:nth-of-type(3){
    display: inline-block;
    width: .4rem;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    border-radius: 50%;
  }
  .parts_main_box   .parts_main_content_list .parts_number_click span:nth-of-type(1){
    background-color:#C8C8CB;
    color: #fff;
  }
  .parts_main_box   .parts_main_content_list .parts_number_click span:nth-of-type(2){
    display: inline-block;
    width: .6rem;
    text-align: center;
  }
  .parts_main_box   .parts_main_content_list .parts_number_click span:nth-of-type(3){
    background-color:#2F80ED;
    color: #fff;
  }
  /*配件选择框结束*/

  /*维修费选择框开始*/
  .repair_main{
    width: 100%;
    height: 100%;
    /*height:17.6rem;*/
    background:rgba(60,63,65,.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    overflow-y: hidden;
  }
  .repair_main .repair_main_box{
    background-color:#fff;
    min-height: 7rem;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .repair_main .repair_main_box .repair_main_title{
    height: .9rem;
    line-height: .9rem;
    font-weight: 600;
    text-align: center;
  }
  .repair_main .repair_main_box .repair_main_bottom{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .repair_main .repair_main_box .repair_main_bottom button{
    width: 100%;
    height: .8rem;
    background-color:#26A2FF;
    color: #fff;
  }
  /*维修费选择框结束*/


  /*transition的样式开始*/
  .fade-enter-active, .fade-leave-active {
    transform-style: preserve-3d;
    transition: all 1s ease-out;
  }
  /*.fade-enter, .fade-leave-active {*/
  /*!*transition:all 1s ease;*!*/
  /*opacity: 0;*/
  /*}*/

  /*进入*/
  .fade-enter {
    -webkit-transform:perspective(200px) translateY(500px);
    -moz-transform: perspective(200px) translateY(500px);
    -ms-transform: perspective(200px) translateY(500px);
    -o-transform: perspective(200px) translateY(500px);
    transform: perspective(200px) translateY(500px);
  }
  /*离开*/
  .fade-leave-active{
    -webkit-transform:perspective(200px)  translateY(500px);
    -moz-transform:perspective(200px)  translateY(500px);
    -ms-transform:perspective(200px)  translateY(500px);
    -o-transform:perspective(200px)  translateY(500px);
    transform:perspective(200px)  translateY(500px);
  }
  /*transition的样式结束*/


.service_list_main{
  background-color:#ECECEC;
}
  .service_list_main_one{
    padding:0 .2rem;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height:.6rem;
    line-height: .6rem;
  }

  .service_list_main_two{
    /*padding: 0 .2rem;*/
    /*height: 4rem;*/
    background-color: #fff;
  }
  .service_list_main_two div:nth-of-type(1){
    /*height: .6rem;*/
    /*line-height: .6rem;*/
    margin-top: .2rem;
  }
  .service_list_main_two div:nth-of-type(2){
    /*height: 3rem;*/
    /*background-color:red;*/
  }

  .service_list_main_three{
    margin-top: .2rem;
    padding:0 .2rem;
    background-color:#fff;
  }
  .service_list_main_three .service_list_main_three_title{
    height: .6rem;
    line-height: .6rem;
    font-size: .26rem;
    color: #2E7FEC;
  }
  .service_list_main_three .three_list{
     display: flex;
    height: .6rem;
    line-height: .6rem;
   }
  .service_list_main_three .three_list div:nth-of-type(1){
    flex: 8;
    text-align: left;
   }
  .service_list_main_three .three_list div:nth-of-type(2){
    flex: 4;
    text-align: right;
   }
  .service_list_main_three .three_list div:nth-of-type(3){
    flex: 1;
    text-align: right;
   }

  .service_list_main_four{
    padding:0 .2rem;
    background-color:#ECECEC;
    margin:.1rem 0;
  }
  .service_list_main_four div{
    width: 2rem;
    height: .6rem;
    line-height: .6rem;
  }
  .service_list_main_four div span:nth-of-type(1){
    display: inline-block;
    width:.4rem;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    border-radius: 50%;
    border: .01rem solid #2E2E2E;
  }

  .service_list_main_five{
    padding:0 .2rem;
    background-color: #fff;
  }
  .service_list_main_five div{
    display: flex;
    justify-content: space-between;
    height: .6rem;
    line-height: .6rem;
  }

  .service_list_main_six{
    padding:0 .2rem;
    margin-top: 1.6rem;
  }


  /*上传插件*/
  .upload_warp_img_div_del {
    position: absolute;
    top: .07rem;
    width: .26rem;
    height: .26rem;
    right: .04rem;
  }

  .upload_warp_img_div_top {
    margin-top: 0 !important;
    position: absolute;
    top: 0;
    width: 100%;
    font-size: .12rem;
    height: .4rem;
    line-height: .4rem;
    background-color: rgba(0, 0, 0, 0.4);
    background-color:red;
    text-align: left;
    color: #fff;
    text-indent: .04rem;
  }

  .upload_warp_img_div_text {
    margin-top: 0 !important;
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .upload_warp_img_div {
    position: relative;
    height: 1.6rem;
    width: 1.6rem;
    line-height: 1.6rem;
    border: .01rem solid #ccc;
    margin:.2rem 0 0 .2rem;
    float: left;
    display: table-cell;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
  }

  .upload_warp_img {
    width: 100%;
    padding-bottom: .2rem;
    overflow: hidden
  }

  .upload_warp_text {
    font-size:  .26rem;
  }

  .upload_warp_left{
    float: left;
    border-radius:.04rem;
    cursor: pointer;
  }

  .upload_warp_left img {
    width: 100%;
    height:100%;
  }

  .upload {
    width: 100%;
  }


  .bottom_img_sample{
    margin:.2rem 0 0 .2rem;
    width: 1.6rem;
    height: 1.6rem;
    text-align: center;
    border:.01rem dotted #CFCFD1;
    color:#CFCFD1;

  .bottom_img_sample_one{
     margin-top: .3rem;
     width: 100%;
     height: .5rem;
     line-height: .5rem;

    i{
      font-size: .34rem;
    }
  }
  .bottom_img_sample_two{
     width: 100%;
     height:.5rem;
     line-height: .5rem;
     font-size: .29rem;
   }
  }
</style>
