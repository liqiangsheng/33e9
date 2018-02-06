 //即将离开当前页面触发的事件
window.onbeforeunload = function() { 
    if(g_logining){
        //注销本次登陆
        CRVideo_Logout();
    }
    if(g_init){
        //反初始化
        CRVideo_Uninit();
    }
    if(g_residual_timer != -1){
        clearInterval(g_residual_timer);
        g_residual_timer = -1;
    }
    if(layout != null){
        $(".videoPage").css('display','none');
    }
}
//按下键盘的事件
document.onkeydown = function (e) {
    var ev = window.event || e;
    var code = ev.keyCode || ev.which;
    //F5刷新
    if (code == 116) {
        // 谷歌的兼容
        if(ev.preventDefault) {
            ev.preventDefault();
            //替换登陆的地址
            location.replace(location.href)
        } else {
            // IE的兼容
            ev.keyCode = 0;
            ev.returnValue = false;
            location.replace(location.href)
        }
    }
}
//阻止右键
window.document.oncontextmenu=function(){
    return false;
}
  
    //键盘回车
$("body").keydown(function(e){
   
    if(event.keyCode == "13"){
       login()
       $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
    }
});

//登陆
 //点击下拉 设置登录名
$("#login_server_img").click(function(){
    $(".pull_down_name").css({display:"block"})
})
//
$("#login_server_pull li").mouseover(function(){
    $(this).addClass("onhover")
}).mouseout(function(){
    $(this).removeClass("onhover")
}).mouseup(function(){
    $("#server_name").val($(this).html())
    $(".pull_down_name").css({display:"none"})
});
//点击聚焦 账号
$(".inputLayer").click(function(){
    $(".inputLayer").css({display:"none"});
    $("#server_name").val("").focus();
    })
   //账号
$(".inputLayer1").click(function(){
    $(".inputLayer1").css({display:"none"});
    $("#login_cpyname").val("").focus();
   
})
//密码
$(".inputLayer2").click(function(){
    $(".inputLayer2").css({display:"none"});
    $("#login_psd").val("").focus();
     if($("#login_psd").val()==""||$("#login_cpyname").val()==null){
    	  alert({
        	  title:'提示',
			  content:'密码不能为空',
			  noText:'取消',
			  yesText:'确定'
            });
        }
    })

  //点击事件
$("#login_bnt").click(function(){
    $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
    //获取input框的值跟后台数据对比判断
    login()
})

 //登陆成功
    CRVideo_LoginSuccess.callback = function(userID,cookie){
     
        $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
        //登陆
        g_logining = true;
        //用户ID
        g_userID = userID;
        
        //创建会议
        createMeeting()
    }
//登录失败
CRVideo_LoginFail.callback = function(sdkErr,cookie){
      alert({
    	  title:'提示',
		  content:'登陆失败'+sdkErr,
		  noText:'取消',
		  yesText:'确定'
    });
    $("#login_bnt").attr({"disabled":false}).css({background:"#eb5405"})
    //不登陆
    g_logining = false;
}



//*****************************创建会议**************************************************
function createMeeting(){
	CRVideo_CreateMeeting("财富宝货币市场基金  00034")
}
//创建会议成功回调
CRVideo_CreateMeetingSuccess.callback = function(meetObj,cookie){
//		console.log(meetObj.ID)

	g_meetingId = meetObj.ID;
	g_meetingPsw = meetObj.pswd;
	//进入会议
	enterMeeting()
	
}
//创建会议失败响应	
CRVideo_CreateMeetingFail.callback = function(sdkEr ,cookie){
	alert({
		  title:'提示',
		  content:'创建会议失败'+sdkEr,
		  noText:'取消',
		  yesText:'确定'
	})
	g_logining = false;
}
//**************************进入会议********************************************
function enterMeeting(){
    CRVideo_EnterMeeting(g_meetingId,g_meetingPsw,g_userID,g_nickname);
  
}
//进入会议完成响应 
CRVideo_EnterMeetingRslt.callback = function(sdkEr){
	//没有错误
	if(sdkEr == CRVideo_NOERR){
		// * 暂未定义  1* @param {string} picID -  2 * @param {object} jsonval - 
		    // fmt为"yuv420p"时： dat存放的是base64(yuv420p数据)；
            // fmt为"rgb32"时： dat存放的是base64(rgb32数据)；
            // fmt为"picfile"时： dat存放的是“本地文件名”；
		CRVideo_SetPicResource(g_logo_id, {
			"fmt" : "picdat",
            "dat" : "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"
		});
		// 打开本地摄像头 传用户ID
		CRVideo_OpenVideo(g_userID);
		// 是否可以打开更多的摄像头 传用户ID，bool
        CRVideo_SetEnableMutiVideo(g_userID,true); 
        //打开麦克风 传用户ID
        CRVideo_OpenMic(g_userID);
        //初始化会议房间
        if(g_init_room == false){
        	g_init_room = true;
            //登录页面隐藏。房间页面显示
            $(".login_box").css({"display":"none"});
            $(".menu_box").css({"display":"block"});
        }else{
        	alert({
				  title:'提示',
				  content:'初始化会议房间失败'+sdkEr,
				  noText:'取消',
				  yesText:'确定'
			})
        }
        //视频更新配置
        updateVideoCfg(g_video_size_type,g_video_fps,g_video_qp);
        console.log(g_video_size_type)
        console.log(g_video_fps)
        console.log(g_video_qp)
        
	}else{
		alert({
				  title:'提示',
				  content:' 进入会议失败'+sdkEr,
				  noText:'取消',
				  yesText:'确定'
			})
	}
	//修改回未登录状态
    g_logining = false;
   //文件的流量控制
   CRVideo_SetFileUploadRate(g_FURate);
   //是否加密 1加密 0不加密
   CRVideo_SetRecordFileEncrypt(1);
   // 获取所有视频的列表信息
   g_getAll_videfile_list = CRVideo_GetAllRecordFiles();
} 

//**********************点击对应的下标进入对应的会议房间********************************
$(".menu_right_detail dl").map(function(index,item){
	$(this).click(function(){
	    enterRoom()
		$("#doubleCamera").attr("disabled",false)
	    $("#singleCamera").attr("disabled",false)
	    })
});
//**********************通知打开影音文件    ********************************
CRVideo_NotifyMediaOpened.callback=function(totalTime,width,height){
	if(layout =="layoutC" && width/height == 4/3){
		  g_mediaObj.hide();    
		  g_mediaObj.width(396);
		  g_mediaObj.height(297);
		  g_mediaObj.left(176);
		  g_mediaObj.top(1);
	 }
}
//*****************************媒体停止通知****************************************
  CRVideo_NotifyMediaStop.callback=function(userid){
 
        if(userid == g_userID){
            //是否回放
        g_playbacking = false;
        $("#playback").css("display","block");
        $("#playback1").css("display","none");
        $("#singleCamera").attr("disabled",false);
        $("#doubleCamera").attr("disabled",false);
        //吊A布局
        $(".videoPage_right_view_box").empty();
        enterRoom()
        $("#playImg").css("display","block");
		$("#suspendImg").css("display","none");
		$("#playImg1").css("display","none");
		$("#stopImg").css("display","none");
        //更新摄像头
        updateVideo()

    }
}

//*************************上传视频的回掉*******************************************
// sdk通知录制文件状态更改
CRVideo_NotifyRecordFileStateChanged.callback=function(fileName,state){

    $("#file_name").html(fileName);
    if(state ==2 ){
        $('#upload_status').html("上传完成");
        $("#percent_item").css("width","100%");
        $("#upload_num_percert").html("100%");
        $('.full_page_cancle1').css("display","block");
        $('.full_page_cancle3').css("display","none");
        $(".full_page_submit").css("display","inline-block");
        //是否在上传
        g_uploading = false;
    }else if(state == 1){
        $(".full_page_submit").css("display","none");
        $('#upload_status').html("上传中...");
        $('.full_page_cancle1').css("display","none");
        $('.full_page_cancle3').css("display","block");
    }else if(state == 0 && g_uploading){
        $(".full_page_submit").css("display","none");
        $('#upload_status').html("准备上传...");
        $('.full_page_cancle1').css("display","none");
        $('.full_page_cancle3').css("display","block");
        $("#percent_item").css("width","0");
    }
}
//************************** 通知录制文件上传进度********************************************
CRVideo_NotifyRecordFileUploadProgress.callback = function(fileName,percent){

    $(".full_page_submit").css("display","none");
    $("#percent_item").css("width",percent+"%");
    $("#upload_num_percert").html(percent + "%");

}

//************************************** 上传文件失败通知 ******************************************
CRVideo_UploadRecordFileErr.callback=function(fileName,sdkErr){
    $('#upload_status').html("上传失败")
    $('.full_page_cancle1').css("display","block");
    $('.full_page_cancle3').css("display","none");
    $(".full_page_submit").css("display","none");
    //是否在上传
    g_uploading = false;
}
//*********************************************摄像头状态改变*************************************
CRVideo_VideoStatusChanged.callback = function(userID,oldStatus,newStatus){

      if(g_userID == userID){
        /**视频处于打开状态（软开关）*/          /**向服务器发送打开消息中	*/
          if(newStatus !=CRVideo_VSTATUS.VOPEN && newStatus !=CRVideo_VSTATUS.VOPENING){
             CRVideo_OpenVideo(g_userID);
          }
      }
 }
//*************************摄像头列表更新 通知用户的视频设备有变化	************************************
CRVideo_VideoDevChanged.callback =function(userID){
   if(g_userID == userID){
        updateVideo();
   }
}
//******************************************会议掉线*********************************************
CRVideo_LineOff.callback=function(sdkErr){
	alert({
	    title:'提示',
	    content:'会议掉线:'+sdkErr,
	    noText:'取消',
	    yesText:'确定'
	})
}
//**************************************监控会议掉线********************************************************
CRVideo_MeetingDropped.callback=function(){
  
   $("#box").css({"display":"block"});
   $("#lineOff").css("display","block");
   $(".login_box").css("display","block");
   $(".menu_box").css("display","none");
   $(".videoPage").css("display","none");
   
   var temp = setInterval(function(){
   	num --;
   	$("#lineOff_center").html("会议掉线:"+num+"秒后自动登陆");
   	if(num == 0){
   		clearInterval(temp);
   		$("#lineOff").remove();
		$("#box").css({"display":"none"});
	   	login()
	    $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
   	}
   	
   },1000)
}
$("#lineOff_yes").click(function(){
	$("#lineOff").remove();
	$("#box").css({"display":"none"});
	location.href = "./index.html";
	login()
    $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
})
$("#lineOff_no").click(function(){
	$("#lineOff").remove();
	$("#box").css({"display":"none"});
	location.href = "./index.html";
})