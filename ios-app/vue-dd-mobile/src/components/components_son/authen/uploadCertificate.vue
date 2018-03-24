<template>
  <div class="authen_box">
    <!--<C_header left_show="true" right_show="true"  center_text="认证信息" right_number="3"></C_header>-->
    <C_header left_show="true" right_show="true"  center_text="认证信息"></C_header>
    <div class="authen_title">
      <div>① 基本信息</div>
      <div class="active">② 上传证件照</div>
      <div>③ 完成</div>
    </div>

    <div class="upload_img">

      <div class="upload_img_top">
        <div class="upload_img_top_title">身份证正反面照片和本人持有身份证照片</div>
        <div class="top_img">
          <div>
            <div>
              <img src="../../../assets/images/authen_img1.png" alt="">
            </div>
            <div>本人持证件</div>
          </div>
          <div>
            <div>
              <img src="../../../assets/images/authen_img2.png" alt="">
            </div>
            <div>正面</div>
          </div>
          <div>
            <div>
              <img src="../../../assets/images/authen_img3.png" alt="">
            </div>
            <div>反面</div>
          </div>
        </div>
      </div>

      <div class="upload_img_bootom">
        <!--<div class="upload_img_bottom_title">相关资格证书</div>-->
        <div class="bottom_img">
          <!--<div>-->
            <!--<div class="bottom_img_user">-->
              <!--<img src="../../../assets/images/authen_img3.png" alt="">-->
              <!--<span>×</span>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div>-->
            <!--<div class="bottom_img_sample">-->
              <!--<div>-->
                <!--<i class="iconfont icon-xiangji"></i>-->
                <!--<input accept="image/*,audio/*" type="file" @chang="upload_img"/>-->
              <!--</div>-->
              <!--<div>-->
                <!--1/8-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

          <div>
            <!--<div class="upload">-->
              <!--<div class="upload_warp_text">-->
                <!--相关资格证书&nbsp;&nbsp;&nbsp;选中{{imgList.length}}张图片，共{{bytesToSize(this.size)}}-->
              <!--</div>-->
              <!--<input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>-->
              <!--<div class="upload_warp_img">-->
                <!--<div class="upload_warp_img_div" v-for="(item,index) of imgList"  v-show="imgList.length!=0">-->
                  <!--<div class="upload_warp_img_div_top">-->
                    <!--<div class="upload_warp_img_div_text">-->
                      <!--{{item.file.name}}-->
                    <!--</div>-->
                    <!--<img src="../../../../static/img/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">-->
                  <!--</div>-->
                  <!--<img :src="item.file.src">-->
                <!--</div>-->

                <!--<div class="upload_warp_left" @click="fileClick">-->
                  <!--<div>-->
                    <!--<div class="bottom_img_sample">-->
                      <!--<div>-->
                        <!--<i class="iconfont icon-xiangji"></i>-->
                      <!--</div>-->
                      <!--<div>-->
                        <!--{{imgList.length}}/8-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

            <div class="img_box">
              <div class="img_show">
                <div class="img_show_for" v-for="(item,index) in img_file_arr" v-if="img_file_arr.length != 0">
                  <img :src="item" alt="">
                  <span class="img_show_for_close" @click="traditional_file_close(index)">×</span>
                </div>
                <div class="img_upload">
                  <div class="img_upload_file"  v-if="isWeiXinClick"   @click="isWeiXinPaoZhao">
                    <input type="file" ref="file"  id="file"  v-on:change="traditional_file($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                  </div>
                  <div class="img_upload_icon"   @click.stop="isWeiXinPaoZhao">
                    <div>
                      <i data-v-05ed9505="" class="iconfont icon-xiangji"></i>
                    </div>
                    <div>
                      <span>{{img_file_arr_num}}/8</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

    <div>
      <C_button class="c_button"  :btn_disabled="c_disabled" btn_text="提交并审核" @callback_c_btn="lower_submit"></C_button>
    </div>

  </div>
</template>
<script>
  import common from '../../../assets/js/common'
  export default {
    data(){
      return {
        imgList: [],
        size: 0,
        //file图片
        img_file_arr:[],//存储发送后返回的链接保存
        img_file_arr_num:0,

        c_disabled:1,   //默认提交按钮不可点

        isWeiXinClick:true,//是否是给微信的去点击
      }
    },
    created(){
        let _this=this;

        //判断是否是微信浏览器
        if(common.isWeiXin()){
          _this.isWeiXinClick=false;//若是微信就让input去隐藏

          //拿微信的appid相关参数
          let dataReq_location_href={url:window.location.href.split('#')[0]};
          common.weixinAppid(_this,dataReq_location_href,_this.weixin_config);//微信

        }

    },
    mounted(){

    },
    watch:{
      imgList(newVal,oldVal){
        if(this.imgList.length!=0){  //少于0张图片不能点击提交按钮
          this.c_disabled=2;
        }else{
          this.c_disabled=1;
        }
        if(this.imgList.length>8){ //只能传八张图片
          this.imgList.pop(1)
        }
      },
      img_file_arr(newVal,oldVal){//检测图片数量
        let _this=this;
        if(this.img_file_arr.length!=0){  //少于0张图片不能点击提交按钮
          this.c_disabled=2;
        }else{
          this.c_disabled=1;
        }
        _this.img_file_arr_num=this.img_file_arr.length;
        if(this.img_file_arr.length>8){
            _this.img_file_arr.pop(1);
        }
      },
    },
    components: {},
    methods: {
      lower_submit(data){ //提交并审核
        let _this=this;
        if(data){
          if(_this.img_file_arr_num.length <= 0){
            _this.$toast('请上传服务凭证');
            return false;
          }
          let dataReq={
            name:_this.$store.getters.userName,//名字
            IDCard:_this.$store.getters.ID,//身份证
            emergencyContact:_this.$store.getters.emergencyContact,//联系人
            emergencyPhoneNum:_this.$store.getters.emergencyContactTel,//紧急联系人
            cityId:JSON.stringify(common.get_storage('dd_city')[0].id),//城市id
            city:JSON.stringify(common.get_storage('dd_city')[0].name),//城市
            idPhotos:_this.img_file_arr.join(','),//图片
            areaListJson:JSON.stringify(common.get_storage('dd_area')),//服务区域
            labelBusinessListJson:JSON.stringify(common.get_storage('dd_skill')),//服务技能
          };
          console.log("提交认证数据",dataReq);
          common.authen_req(_this,dataReq);
        }
      },
      traditional_file(event){ //inout的file
        let _this=this;
        if(_this.img_file_arr.length>8){
          return
        }
        let filesObj=event.target.files[0];
        let filesName=event.target.files[0].name;
        let param = new FormData(); // 创建form对象
        param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
        let dataReq=param;
        common.file_img_req(_this,dataReq,_this.file_callback)
      },
      isWeiXinPaoZhao(){//上传点击按钮
        console.log('微信按钮点击上传');
        let _this=this;
        if(_this.isWeiXinClick){
            return
        }
        if(_this.img_file_arr.length>8){//返回来的图片
          return
        }
        _this.weixin_click();//调取相机
      },
      weixin_config(self){
        let _this=self;
        //微信的config s
        let data=_this.$store.getters.weiXinAppid;
        data.timestamp=data.timestamp+'';
        console.log('微信的config',data);
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp:data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['chooseImage', 'uploadImage','downloadImage']
        });
        //微信的config e
      },
      weixin_click(){
        let _this=this;
        //拍照s
        wx.chooseImage({
          count: 1,//默认9
          sizeType: ['original', 'compressed'],//可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera'],//可以指定来源是相册还是相机，默认二者都有 ['album', 'camera']
          success: function (res) {
            console.log('11111');
            var localIds = res.localIds;//返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              _this.img_file_arr.push(localIds);//给数组去渲染图片 lee
            _this.weixin_click_shang_chuan(localIds.toString());
          }
        });
        //拍照e
      },
      weixin_click_shang_chuan(localIds){
        let _this=this;
        //上传图片到服务器s
        wx.uploadImage({
          //localId: localIds.toString(),
          localId: localIds,
          // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId;// 返回图片的服务器端ID
            _this.weixin_click_xia_zai(serverId.toString());
          },
          fail:function () {
            alert('拍照失败，请刷新重试');
            return false;
          }
        });
        //上传图片到服务器e
      },
      weixin_click_xia_zai(serverId){
        console.log('微信下载img',serverId);
        let _this=this;
        //下载图片到本地服务器s
//          let filesObj=event.target.files[0];
//          let filesName=event.target.files[0].name;
        let filesObj=serverId;
        let filesName='';
        let param = new FormData(); // 创建form对象
        param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
        let dataReq=param;
        common.file_img_req(_this,dataReq,_this.file_callback);
        //下载图片到本地服务器e
      },
      file_callback(res){ //图片发送成功后的回调
        console.log(res);
        let _this=this;
        if(_this.isWeiXinClick){ //如果为true说明不是微信浏览器
          _this.img_file_arr.push(res); //往图片数组里添加
        }
      },
      traditional_file_close(index){//图片关闭按钮
        let _this=this;
        _this.img_file_arr.splice(index, 1);//点击关闭就删除数组里的图片地址
      },
//      upload_img(){
//        let files=this.files[0];
//        console.log(files);
//      },
//      fileClick() {
//        document.getElementById('upload_file').click()
//      },
//      fileChange(el) {
//        if (!el.target.files[0].size) return;
//        this.fileList(el.target);
//        el.target.value = ''
//      },
//      fileList(fileList) {
//        let files = fileList.files;
//        for (let i = 0; i < files.length; i++) {
//          //判断是否为文件夹
//          if (files[i].type != '') {
//            this.fileAdd(files[i]);
//          } else {
//            //文件夹处理
//            this.folders(fileList.items[i]);
//          }
//        }
//      },
//      //文件夹处理
//      folders(files) {
//        let _this = this;
//        //判断是否为原生file
//        if (files.kind) {
//          files = files.webkitGetAsEntry();
//        }
//        files.createReader().readEntries(function (file) {
//          for (let i = 0; i < file.length; i++) {
//            if (file[i].isFile) {
//              _this.foldersAdd(file[i]);
//            } else {
//              _this.folders(file[i]);
//            }
//          }
//        })
//      },
//      foldersAdd(entry) {
//        let _this = this;
//        entry.file(function (file) {
//          _this.fileAdd(file)
//        })
//      },
//      fileAdd(file) {
//        //总大小
//        this.size = this.size + file.size;
//        //判断是否为图片文件
//        if (file.type.indexOf('image') == -1) {
//          file.src = 'wenjian.png';
//          this.imgList.push({
//            file
//          });
//        } else {
//          let reader = new FileReader();
//          reader.vue = this;
//          reader.readAsDataURL(file);
//          reader.onload = function () {
//            file.src = this.result;
//            this.vue.imgList.push({
//              file
//            });
//          }
//        }
//      },
//      fileDel(index) {
//        this.size = this.size - this.imgList[index].file.size;//总大小
//        this.imgList.splice(index, 1);
//      },
//      bytesToSize(bytes) {
//        if (bytes === 0) return '0 B';
//        let k = 1000, // or 1024
//          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
//          i = Math.floor(Math.log(bytes) / Math.log(k));
//        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
//      },
    }
  }
</script>
<style scoped lang="scss">
  $border-bottom: .01rem solid #E3E3E3;
  .authen_box{
    background:#ECECEC;

  .authen_title{
    border-bottom:$border-bottom;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    background-color: #fff;
    display: flex;

    div{
      flex: 1;
      text-align: center;
    }
  }

  /*上传照片开始*/
  .upload_img{

      .upload_img_top{
        margin-top:.2rem;

        .upload_img_top_title{
          height: .6rem;
          line-height: .6rem;
        }
        .top_img{
          background-color: #fff;
          box-sizing: border-box;
          display: flex;

          >div{
            flex: 1;
          >div:nth-of-type(1){
             width: 2.2rem;
             height: 2.2rem;
             margin: 0 auto;
             margin-top:.1rem;

              img{
                width: 100%;
                height: 100%;
              }
           }
          >div:nth-of-type(2){
             width:2.2rem;
             height:.6rem;
             line-height:.6rem;
             margin: 0 auto;
             text-align: center;
             background-color:#fff;
           }
          }
        }
      }

      .upload_img_bootom{
        margin-top:.2rem;

        .upload_img_bottom_title{
          height: .6rem;
          line-height: .6rem;
        }
        .bottom_img{
          /*width: 100%;*/
          /*display: flex;*/
          /*flex-wrap:wrap;*/

          /*>div{*/
              /*flex: 1;*/

              /*.bottom_img_user{*/
                /*margin:.2rem 0 0 .2rem;*/
                /*position: relative;*/
                /*width: 1.6rem;*/
                /*height: 1.6rem;*/
                  /*span{*/
                    /*position: absolute;*/
                    /*top:-.1rem;*/
                    /*right: -.1rem;*/
                    /*z-index: 9;*/
                    /*width: .4rem;*/
                    /*height: .4rem;*/
                    /*line-height: .4rem;*/
                    /*text-align: center;*/
                    /*background-color:rgba(64,64,64,.6);*/
                    /*border-radius: 50%;*/
                    /*color: #fff;*/
                  /*}*/
              /*}*/
           /*}*/


  /*input的file样式 s*/
  .img_box{
    width: 100%;
    /*height: 1rem;*/
    display: flex;
    /*flex-direction: column ;*/
    /*justify-content: flex-start;*/
    box-sizing: border-box;

    .img_show{
      display: flex;
      width:100%;
      flex-wrap: wrap;

      .img_show_for{
        margin-top: .2rem;
        margin-left: .2rem;
        width: 1.6rem;
        height: 1.6rem;
        /*overflow: hidden;*/
        position: relative;
        background-color:yellow;

      img{
        width: 100%;
        height: 100%;
      }

          .img_show_for_close{
            display: inline-block;
            width:.4rem;
            height: .4rem;
            line-height: .4rem;
            text-align: center;
            color: #fff;
            position: absolute;
            right: -.15rem;
            top: -.15rem;
            z-index: 3;
            border-radius:50%;
            font-size: .32rem;
            background-color:green;
          }
      }
    }

      .img_upload{
        margin-top: .2rem;
        margin-bottom: .2rem;
        margin-left: .2rem;
        width: 1.6rem;
        height: 1.6rem;
        overflow: hidden;
        position: relative;
        border: .01rem dotted #C8C8CB;

      .img_upload_file{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        z-index: 2;

        #file{
          width: 100%;
          height: 100%;
        }
      }
        .img_upload_icon{
          width: 100%;
          height: 100%;
          /*background-color:darkgreen;*/
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          text-align: center;

          div:nth-of-type(1){
            margin-top: .2rem;
            height: .6rem;
            line-height: .6rem;
          }
          div:nth-of-type(2){
            height: .4rem;
            line-height: .4rem;
          }
        }
      }
  }
  /*input的file样式 e*/


          .bottom_img_sample{
            margin:.2rem 0 0 .2rem;
            width: 1.6rem;
            height: 1.6rem;
            text-align: center;
            border:.01rem dotted #CFCFD1;
            color:#CFCFD1;

            >div:nth-of-type(1){
                margin-top: .3rem;
                width: 100%;
                height: .5rem;
                line-height: .5rem;

                i{
                    font-size: .34rem;
                }
             }
             >div:nth-of-type(2){
                width: 100%;
                height:.5rem;
                line-height: .5rem;
                font-size: .29rem;
              }
          }
        }
      }
  }
  /*上传照片结束*/

    .c_button{
      margin-top: 4rem;
    }

  }

  .active{
    color:#26a2ff;
    background-color:#ECECEC;
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
    position: absolute;
    top: 0;
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    background-color: rgba(0, 0, 0, 0.4) !important;
    text-align: left;
    color: #fff;
    font-size: .12rem;
    text-indent: .04rem;
  }

  .upload_warp_img_div_text {
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

</style>
