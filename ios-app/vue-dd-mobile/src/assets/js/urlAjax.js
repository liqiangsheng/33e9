export default {

  /*
  * 四个地方需要改变地址
  * addressUrl  总地址
  * weixinConfig  微信appid地址
  * equipmentPrice_iframe 价格列表跳转到微信用户端的价格列表地址
  * shang_chuan_img  上传图片地址
  * */

     addressUrl: 'http://master.test.dingdingkuaixiu.com', //测试环境 _this.$addressUrl
  // addressUrl: 'http://master.pre.dingdingkuaixiu.com', //预发布环境 _this.$addressUrl
//addressUrl:'http://192.168.20.86:8021', //测试环境

  weixinConfig: 'http://app.test.dingdingkuaixiu.com/userInfo/accessSharingSign',//微信公众号的appId
  equipmentPrice_iframe: 'http://wechat.test.dingdingkuaixiu.com',//价格列表跳转到微信公众号的地址

  url: { // this.$allUrl
    //上传图片地址
    shang_chuan_img_one: 'http://master.test.dingdingkuaixiu.com/order/submitOrderPicDataIOS', //上传照a片路径
    shang_chuan_img_two: 'http://admin.test.dingdingkuaixiu.com/upload/sendWechatPicIOS', //上传照片路径
    // shang_chuan_img_one: 'http://192.168.20.106:8021/order/submitOrderPicDataIOS', //上传照a片路径
    // shang_chuan_img_two: 'http://192.168.20.106:8011/upload/sendWechatPicIOS', //上传照片路径

    /*
    * 四个地方需要改变地址
    * addressUrl  总地址
    * weixinConfig  微信appid地址
    * equipmentPrice_iframe 价格列表跳转到微信用户端的价格列表地址
    * shang_chuan_img  上传图片地址
    * */

      yan_zheng: '/authCodeInfo/getValidationCodeIOS', //获取验证码
      deng_lu: '/authCodeInfo/confirmMasterLoginIOS',   //登陆
      deng_lu1: '/authCodeInfo/confirmmasterIsloginIOS', //是否登录过
      


      // cheng_shi: 'http://master.test.dingdingkuaixiu.com/areainfo/findListareaInfo?', //城市
      // qu_yu: 'http://master.test.dingdingkuaixiu.com/areainfo/findListareaInfo?id=', //区域

      //地址放着测试地址 s
      cheng_shi: '/areainfo/findListareaInfo?', //城市
      qu_yu: '/areainfo/findListareaInfo?id=', //区域
      //地址放着测试地址 e


      ping_lei: '/getFLabelBusinessTypeIOS', //品类
      wei_xiu_ming_chen: '/getFLabelBusinessTypeSecondIOS',//维修民称
      ti_jiao_ren_zheng: '/masterinfo/authenticationIOS', //提交认证信息
      huo_qu_fu_wu_qing_dan: '/order/getMasterOrderIOS',//获取服务清单
      fu_wu_qing_dan_wei_xiu: '/articleinfo/findMasterListServiceInfoIOS',//服务清单去拿服务列表findListServiceInfoIOS
      tian_jia_fu_wu: '/articleinfo/findMasterListServiceInfo',   //添加服务
      que_ren_zhang_dan: '/order/submitServiceListIOS',//确认账单


      shou_ye_ding_dan: "/order/findHomeDataIOS",  //首页订单
      shou_ye_ding_dan_zhuang_tai: "/order/updateOrderStateIOS",  //发送首页订单状态1
      ding_dan_bao_beo: '/exceptionrecord/saveExceptionRecordIOS',//报备1
      ding_dan_bao_beo_xian_xia: '/exceptionrecord/savePayOfflineIOS',//线下结款报备1 /exceptionrecord/savePayOfflineIOS
      dian_ji_gong_dan: '/order/getMasterOrderIOS',  //点击单个工单去获取详情
      ding_dan_fen_ye: '/order/findPageIOS', //订单列表查询分页

      //我的
      qing_jia: '/masterleaveapplyfor/saveMasterLeaveApplyForIOS', //请假
      yi_jian_fan_kui: '/feedback/savemasterfeedbackIOS', //意见反馈
      xi_tong_xiao_xi: '/sysMessage/findMasterNewListIOS',//系统消息
      ge_ren_zi_liao: '/masterinfo/findmasterAreaAndSkillIOS',//个人资料
    }

  }

