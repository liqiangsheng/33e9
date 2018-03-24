//微信照片

let weixinIMG=function (data) {

  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp:'', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: ['checkJsApi', 'chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });

  wx.checkJsApi({
      jsApiList: [
        'chooseImage'
      ],
      success: function (res) {
        // alert(JSON.stringify(res.checkResult.getLocation));
        if (res.checkResult.getLocation == false) {
          alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
          return;
        }
      }
  });

  // function paizhao(){
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
  //     }
  //   });
  // }


  // //通过ready接口处理成功验证
  // wx.ready(function(){
  //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
  //
  //     takePhoto.addEventListener('click', function() {
  //         wx.chooseImage({
  //           //count: 1,//默认9
  //           sizeType: ['original', 'compressed'],//可以指定是原图还是压缩图，默认二者都有
  //           sourceType: ['camera'],//可以指定来源是相册还是相机，默认二者都有
  //           success: function(res) {
  //             var localIds = res.localIds;//返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
  //             cosPhoto.src = localIds;
  //             txt.innerText = localIds;
  //           },
  //         });
  //     });
  // });
  //
  // //通过error接口处理失败验证
  // wx.error(function(res){
  //   // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  // });
  //
  // //拍照或从手机相册中选图接口
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
  //     }
  //   });
  //   //预览图片接口
  //   wx.previewImage({
  //       current: '', // 当前显示图片的http链接
  //       urls: [] // 需要预览的图片http链接列表
  //   });
  //
  //   //上传图片  备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
  //   wx.uploadImage({
  //     localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
  //     isShowProgressTips: 1, // 默认为1，显示进度提示
  //     success: function (res) {
  //       var serverId = res.serverId; // 返回图片的服务器端ID
  //     }
  //   });
  //
  //   //下载图片接口
  //   wx.downloadImage({
  //     serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
  //     isShowProgressTips: 1, // 默认为1，显示进度提示
  //     success: function (res) {
  //       var localId = res.localId; // 返回图片下载后的本地ID
  //     }
  //   });
  //
  //   //获取本地图片接口  备注：此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题。具体可参考《iOS网页开发适配指南》
  //   wx.getLocalImgData({
  //     localId: '', // 图片的localID
  //     success: function (res) {
  //       var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
  //     }
  //   });
};

let weixinConfig={
    // config:function(data) {
    //   wx.config({
    //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: data.appId, // 必填，公众号的唯一标识
    //     timestamp:data.timestamp, // 必填，生成签名的时间戳
    //     nonceStr: data.nonceStr, // 必填，生成签名的随机串
    //     signature: data.signature,// 必填，签名，见附录1
    //     jsApiList: ['checkJsApi', 'chooseImage','translateVoice',] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //   });
    //
    //   wx.checkJsApi({
    //     jsApiList: [
    //       'chooseImage'
    //     ],
    //     success: function (res) {
    //       // alert(JSON.stringify(res.checkResult.getLocation));
    //       if (res.checkResult.getLocation == false) {
    //         alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
    //         return;
    //       }
    //     }
    //   });
    // },
    // paizhao:function(){
    //   wx.chooseImage({
    //     count: 1, // 默认9
    //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //     sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
    //     success: function (res) {
    //       console.log('微信图片111111',res);
    //       var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    //     }
    //   });
    // }
};

export default weixinConfig;
