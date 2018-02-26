//***************************各种弹层************************************888
//弹出提示层
function popupTipLayer(content)
{
	if(g_meeting)
	{
		$(".meeting_containt").css("display","none")
	}
	layui.use('layer', function(){ 
		var layer = layui.layer;
		layer.open({
		  title: ['提示', 'font-size:14px;'],
		  content:content, //这里content是一个普通的String
		  end:function()
		  {
			if(g_meeting)
			{
				$(".meeting_containt").css("display","block")
				if(g_call_video !== undefined && g_me_video !== undefined)
				{
					g_call_video.setVideo(g_call_user_id);
					g_me_video.setVideo(g_me_user_id);
				}

			}

		  }
		});
	});
}
//删除加载层
function removeLodingLayer()
{
	if(g_loading_index != -1)
	{
		
		layui.use('layer', function()
		{ 
			var layer = layui.layer;
			layer.close(g_loading_index);
			g_loading_index = -1;
			g_loading_deleted = false;
		})
	}else
	{
		g_loading_deleted = true;
	}
}
//弹出加载层
function popupLodingLayer()
{
	if(g_meeting)
	{
		$(".meeting_containt").css("display","none")
	}
	layui.use('layer', function(){ 
		var layer = layui.layer;
		g_loading_deleted = false;
		g_loading_index = layer.load({end:function()
		  {
					if(g_meeting)
					{
						$(".meeting_containt").css("display","block")
						if(g_call_video !== undefined && g_me_video !== undefined)
						{
							g_call_video.setVideo(g_call_user_id);
							g_me_video.setVideo(g_me_user_id);
						}

					}
			}

		  });
		if(g_loading_deleted)
		{
			removeLodingLayer();
		}
	});
}
//********************************代码开始之前************************************* */
//刷新
window.onbeforeunload = function(){
	CRVideo_Logout();//注销
	CRVideo_Uninit();//反初始化
};
//回车键
document.onkeydown = function (e) {
	var ev = window.event || e;
	var code = ev.keyCode || ev.which;
	if (code == 116) {
		if(ev.preventDefault) {
			ev.preventDefault();
			location.replace(location.href)
		} else {
			ev.keyCode = 0;
			ev.returnValue = false;
			location.replace(location.href)
		}
	}
};
// 屏蔽右键
window.document.oncontextmenu = function(){ return false;};

//刷新队列
function refresh_que(){
	$("#queue_list li").remove();
	setTimeout(function(){
		CRVideo_InitQueueDat();//队列初始化
	},1000);
};

/*******************************login 代码开始**************************************8*/

// 登录服务器的点击事件
$("#login_server_img").click(function(){
	$("#login_server_pull").css("display","block");
});

// 登录服务器 的下拉菜单
$("#login_server_pull li").mouseover(function(){
	$(this).addClass("onhover");
}).mouseout(function(){
	$(this).removeClass("onhover");
}).mouseup(function(){
	$("#login_server_name").val($(this).text());
	$("#login_server_pull").css("display","none");
});

$(".inputLayer1").click(function(){
	$(".inputLayer1").hide();
	$("#login_server_pull").css("display","none");
	$("#login_server_name").val("").focus();
});

// 登录昵称：的点击事件
$("#login_name_img").click(function(){
	$("#login_name_pull").css("display","block");
});

// 登录昵称： 的下拉菜单
$("#login_name_pull li").mouseover(function(){
	$(this).addClass("onhover");
}).mouseout(function(){
	$(this).removeClass("onhover");
}).mouseup(function(){
	$("#login_name_name").val($(this).text());
	$("#login_name_pull").css("display","none");
});

// 登录昵称：聚焦事件
$(".inputLayer2").click(function(){
	$(".inputLayer2").hide();
	$("#login_name_pull").css("display","none");
	$("#login_name_name").val("").focus();
});

// 坐席：的点击事件
$("#login_style_img").click(function(){
	$("#login_style_pull").css("display","block");
});

// 坐席：： 的下拉菜单
$("#login_style_pull li").mouseover(function(){
	$(this).addClass("onhover");
}).mouseout(function(){
	$(this).removeClass("onhover");
}).mouseup(function(){
	$("#login_style_name").val($(this).text());
	$("#login_style_pull").css("display","none");
});

/********************************8startServer 代码开始***********************************/

$(".start_server_footer_left .checkbox_item .check_label").bind("click", function(){
	if($(this).hasClass("onSelect")){
		$(this).siblings("input").removeAttr("checked");
		$(this).removeClass("onSelect");
		
		//当前成员checkbox
		$("input[name='start_server_disturb']").removeAttr("checked");
		$("#all_member_check_label").removeClass("onSelect");
	}else{
		//$(this).siblings("input").prop("checked","checked");
		$(this).addClass("onSelect");
	}
});
//打开服务
function openServer(){
	layui.use('layer', function(){ 
		var layer = layui.layer;
		layer.open({
			type : 0, 
			area: '400px',
			title : ['用户分配中', 'font-size:14px;'],
			content: '系统为您分配【兔兔】', //注意，如果str是object，那么需要字符拼接。
			btn: ['确定', '取消'],
			yes: function(index, layero){
						//按钮【按钮一】的回调
			},
			btn2: function(index, layero){
				//按钮【按钮二】的回调
				//return false 开启该代码可禁止点击该按钮关闭
				},
		});
		layer.config({
			skin: 'demo-class',

		});	
	});
}

/**************************************************queue 代码开始********************************/
function openQueueList(){
	layui.use('layer', function(){ 
		var layer = layui.layer;
		layer.open({
			type : 0, 
			area: '500px',
			title : ['开始排队', 'font-size:14px;'],
			content: '【信雅达专用，请勿入】排队中，已等待时间：11秒您已排到最前，请耐心等待...', //注意，如果str是object，那么需要字符拼接。
			btn: ['取消'],
 		 	btn2: function(index, layero){
   				//按钮【按钮二】的回调
   				//return false 开启该代码可禁止点击该按钮关闭
			 },
		});
		layer.config({
		  skin: 'demo-class',

		});	
	});
}

/*************************************************meeting 代码开始**********************************/

$(".meet_show_record_radio .radio_label").click(function(){
	if($(this).hasClass("ongray")){

	}else{
		$(".meet_show_record_radio .radio_label").removeClass("ongray");
		$(".meet_show_record_radio .radio_label").find("input").removeAttr("checked");
		var $input = $(this).siblings("input");
		$input.prop("checked","checked");
		$(this).addClass("ongray");
		if($input.val() == "0") {//当选择时间为 0 天时
			
		} else if($input.val() == "1") {//选择时间为 1 天时
		
		}
	}
});

$("#meet_reset_video_yx .radio_label").click(function(){
	if($(this).hasClass("ongray")){

	}else{
		$("#meet_reset_video_yx .radio_label").removeClass("ongray");
		$("#meet_reset_video_yx .radio_item").find("input").removeAttr("checked");
		var $input = $(this).siblings();
		$input.attr("checked","true");
		$(this).addClass("ongray");
		updateVideoCfg();
		if($input.val() == "0") {//当选择时间为 0 天时
			
		} else if($input.val() == "1") {//选择时间为 1 天时
		
		}
	}
});

$("#showSendMsg").mouseover(function(){
	$(".meet_show_send_msg").css("display","block")
}).mouseout(function(){
	$(".meet_show_send_msg").css("display","none")
});

$("#showRecordMsg").mouseover(function(){
	$(".meet_show_record").css("display","block");
}).mouseout(function(){
	$(".meet_show_record").css("display","none");
});

$("#meet_reset_speaker .checkbox_item .check_label").bind("click", function(){
	if($(this).hasClass("onSelect")){
		$(this).siblings("input").removeAttr("checked");
		$(this).removeClass("onSelect");
		
		//当前成员checkbox
		$("input[name='is_no_vioce']").removeAttr("checked");
		$("#is_no_vioce_label").removeClass("onSelect");
	}else{
		$(this).addClass("onSelect");
	}
});

function meetStartRecord(){
	$(".meet_show_record").css("display","none")
};
function meetSendMsg(){
	$(".meet_show_send_msg").css("display","none")
};

//*********************************登陆*************************************** */

$('.login_button').click(function(){

	if(!g_is_init){//插件是否初始化
					
						//初始化sdk
	var result = CRVideo_Init("CLOUDROOM",g_location_dir);
	if(result == CRVideo_WEB_OCX_NOTINSTALLED){//没有安装
						
		$('.login_containt').css('display',"none");
		$('#not_installed_tip').css('display',"block");
		return;
	}else if(result == CRVideo_OCX_VERSION_NOTUPPORTED){//版本过低
						
		$('.login_containt').css('display',"none");
		$('#version_low_tip').css('display',"block");

		return;
	}else if(result == CRVideo_WEB_BROWER_NOTUPPORTED){//不支持的浏览器
						
		popupTipLayer('不支持的浏览器' );
		return;
	}else if(result != 0){//其它错误
							
		popupTipLayer('初始化插件错误:'+result );
		return;
	}else{
			g_is_init = true
		}
						
	}
					
	g_server_addr = $('#login_server_name').val();
	g_user_id = $('#login_name_name').val();
	g_nick_name = $('#login_name_name').val();

	if($('#login_style_name').val() == '坐席'){
		g_login_type = 2;
	}else{
		g_login_type = 1;
	}				
	//账号
	var cr_account = "demo@cloudroom.com";
	//密码
	var cr_psw = "e10adc3949ba59abbe56e057f20f883e";
	if(!g_user_id){
		popupTipLayer('用户名不能为空' );
		return 
	}else if(g_user_id.length > 10){
		popupTipLayer('用户名过长' );
		return 
	}else if(!g_login_type){
		popupTipLayer('用户类型不能为空' );
		return 
	}else if(!g_server_addr)
	{
		popupTipLayer('服务器地址不能为空' );
		return 
	}else
	{
		CRVideo_SetServerAddr(g_server_addr);//设置服务器
		CRVideo_Login(cr_account,cr_psw,g_nick_name,g_user_id,"");//登陆
	}
	popupLodingLayer();
});
//登陆成功回调
CRVideo_LoginSuccess.callback = function(usrID,cookie){
	removeLodingLayer();
	g_me_user_id = usrID;
	//初始化队列数据
	CRVideo_InitQueueDat();
	$('.login_containt').css('display',"none");
	//根据登陆的角色显示对应的用户界面
	if(g_login_type == 1){ //客户
		$('.queue_containt').css('display',"block");
		$('.queue_username').text('欢迎'+g_me_user_id+'...')
		
	}else if(g_login_type == 2){	//坐席
		$('.start_server_containt').css('display',"block");
		$('.start_server_username').text(g_me_user_id+'...')
	}	

};

//失败的回调
CRVideo_LoginFail.callback = function(sdkErr,cookie){
		removeLodingLayer();
		popupTipLayer('登录失败:'+ sdkErr);

};
//********************************配置******************************************* */
//视频配置
updateRecord = function(){
	if(g_recording){
		var recContents = [];
		var size = record_size_arr[12]
		var w = size[0]
		var h = size[1]
		if(g_call_user_id !== undefined){
			var videoAContent = {};
			videoAContent["type"] = 0;
			videoAContent["left"] = 0;
			videoAContent["top"] = 0;
			videoAContent["width"] = w;
			videoAContent["height"] = h;
			//获取默认视频
			videoAContent["param"] = {"camid":g_call_user_id+"."+CRVideo_GetDefaultVideo(g_call_user_id)};
			videoAContent["keepAspectRatio"] = 1;
			recContents.push(videoAContent);
		}
		
		if(g_me_user_id !== undefined){
			var videoBContent = {};

			videoBContent["type"] = 0;
			videoBContent["left"] = w/4*3;
			videoBContent["top"] = h/4*3;
			videoBContent["width"] = w/4;
			videoBContent["height"] = h/4;
			// 获取默认视频
			videoBContent["param"] = {"camid":g_me_user_id+"."+CRVideo_GetDefaultVideo(g_me_user_id)};
			videoBContent["keepAspectRatio"] = 1;
			recContents.push(videoBContent);
		}

		CRVideo_SetRecordVideos(recContents);//录制内容配置
	}
};

//************************************设备更新***************************************** */
//更新设备
updateDevices = function(){
	var oldvideoSelectValue = $("#mic_select").val();
	var oldmicSelectValue = $("#spker_select").val();
	var oldspkerSelectValue = $("#video_select").val();
	$("#mic_select").empty()
	$("#spker_select").empty()
	$("#video_select").empty()

	var micArr = CRVideo_GetAudioMicNames();//麦克风设备列表
	var micArrOptionsStr = "";
	for(var i = 0;i<micArr.length;i++){
		if(oldmicSelectValue == micArr[i]){
			micArrOptionsStr += "<option value=\""+micArr[i]+"\" selected=true>"+micArr[i]+"</option>"
		}else{
			micArrOptionsStr += "<option value=\""+micArr[i]+"\">"+micArr[i]+"</option>"
		}
		
	}
	$(micArrOptionsStr).appendTo("#mic_select")
	
	var spkerArr =CRVideo_GetAudioSpkNames();//扬声器设备列表
	var spkerArrOptionsStr = "";
	for(var i = 0;i<spkerArr.length;i++){
		if(oldspkerSelectValue == spkerArr[i]){
			spkerArrOptionsStr += "<option value=\""+spkerArr[i]+"\" selected=true>"+spkerArr[i]+"</option>"
		}else{
			spkerArrOptionsStr += "<option value=\""+spkerArr[i]+"\">"+spkerArr[i]+"</option>"
		}
	}
	$(spkerArrOptionsStr).appendTo("#spker_select")
	
	var videoList = CRVideo_GetAllVideoInfo(g_me_user_id);//摄像头设备列表
	var videoListOptionsStr = "";
	for(var i = 0;i < videoList.length;i++){
		var item = videoList[i];
		if(oldvideoSelectValue == item.videoID){
			videoListOptionsStr += "<option value=\""+item.videoID+"\" selected=true>"+item.videoName+"</option>"
		}else{
			videoListOptionsStr += "<option value=\""+item.videoID+"\">"+item.videoName+"</option>"
		}
	}
	$(videoListOptionsStr).appendTo("#video_select")
};

// ****************************点击挂断按钮*********************************************
$("#meet_colse_btn").click(function(){
	CRVideo_HungupCall(g_session_call_id);//挂断呼叫
});

//挂断呼叫操作成功响应
CRVideo_HangupCallSuccess.callback = function(callID,cookie){
	CRVideo_ExitMeeting();//推出会议
	g_session_call_id = null;
	if(g_record_timer != -1){
		clearInterval(g_record_timer);
		g_record_timer = -1
	}
	$(".meeting_containt").css("display","none")
	g_meeting = false
	if(g_call_video !== undefined && g_me_video !== undefined ){
		g_call_video.clear();
		g_me_video.clear();
	}
	if(g_login_type == 1) {	//客户
		$('.queue_containt').css('display',"block");
	}
	else if(g_login_type == 2){		//坐席	
		$('.start_server_containt').css('display',"block");
	}
}
//挂断呼叫操作失败响应
CRVideo_HangupCallFail.callback = function(callID,sdkErr,cookie){
	popupTipLayer("挂断呼叫失败！");
	
}
//SDK通知自己呼叫被挂断
CRVideo_NotifyCallHungup.callback = function(callID,usrExtDat){
	CRVideo_ExitMeeting(); //退出会议
	g_session_call_id = null;
	if(g_record_timer != -1){
		clearInterval(g_record_timer);
		g_record_timer = -1
	}
	$(".meeting_containt").css("display","none")
	g_meeting = false
	if(g_call_video !== undefined && g_me_video !== undefined ){
		g_call_video.clear();
		g_me_video.clear();
	}
	
	if(g_login_type == 1) {	//客户
		$('.queue_containt').css('display',"block");
	}
	else if(g_login_type == 2){		//坐席
		$('.start_server_containt').css('display',"block");
	}
	popupTipLayer("对方挂断了呼叫");
}

//**********************************摄像头操作*********************************************** */
$("#video_operate_btn").click(function(){
	var vStatus = CRVideo_GetVideoStatus(g_me_user_id);//摄像头状态
	if(vStatus == 0){
		this.popup("没有可打开的视频设备")

	}
	else if(vStatus ==  2){
		CRVideo_OpenVideo(g_me_user_id);//打开摄像头
		$("#video_operate_btn").text("关闭");
	}
	else{
		CRVideo_CloseVideo(g_me_user_id);//关闭摄像头
		$("#video_operate_btn").text("打开");

	}
});
//**********************************麦克风操作*********************************************** *
$("#mic_operate_btn").click(function(){
	var aStatus = CRVideo_GetAudioStatus(g_me_user_id);//麦克风状态
	if(aStatus == 0){
		this.popup("没有可打开的音频设备");
	}
	else if(aStatus ==  2){
		CRVideo_OpenMic(g_me_user_id);//开启麦克风
		$("#mic_operate_btn").text("关闭");
	}else {
		CRVideo_CloseMic(g_me_user_id);//关闭麦克风
		$("#mic_operate_btn").text("打开");
	}
});
//******************************开始录制********************************************************** */
$("#showRecordMsg").click(function(){
	if(!g_recording){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		
		var recordName = hour+"-"+minute +"-"+second+"-"+year +"-"+month +"-"+day +".mp4" 
		
		var size = record_size_arr[12];
		var frame = 15;
		var zhilaing = 26;
        //开始录制
		CRVideo_StartRecordIng(g_location_dir+"record/"+recordName,CRVideo_RECORD_AUDIO_TYPE.REC_AUDIO_TYPE_ALL,frame,size[0],size[1],size[2]*1000,zhilaing,7);
		
		$("#showRecordMsg").html("<img src=\"image/icon_38.png\"/>停止录制");
		$("#showRecordMsg").text("停止(00:00 0M)")
		if(g_record_timer != -1){
			clearInterval(g_record_timer);
		}
		g_record_timer = setInterval(function(){
			var duration = CRVideo_GetRecDuration();//录制时长
			var size = parseInt(CRVideo_GetRecFileSize()/1024);
			var second = duration%60;
			var second_str = second >= 10? second.toString():"0"+second;
			var minute = parseInt(duration/60);
			var minute_str = minute >= 10? minute.toString():"0"+minute;
			$("#showRecordMsg").text("停止("+minute_str+":"+second_str+" "+parseInt(size/1024*10)/10+"M)")

		},300);
		g_recording = true;
		updateRecord();	
	}else if(g_recording){
		CRVideo_StopRecord();//停止录制
		$("#showRecordMsg").html("<img src=\"image/icon_38.png\"/>开始录制");
		g_recording = false;
		
		if(g_record_timer != -1){
			clearInterval(g_record_timer);
			g_record_timer = -1
		}
	}
});
//*****************************************截图*****************************************8 */
$("#pic_btn").click(function(){
	if(g_call_video.isPicEmpty() == 0){//检查图像是否为空
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		var picName = year + "-" + month + "-" + day + "-" + hour+'-' + minute + '-' + second+".png"

		g_call_video.savePic(g_location_dir+"img/"+picName)//拍照

		popupTipLayer("截图位置("+g_location_dir+"img/"+picName+")");

	}else{
		popupTipLayer("没有图像");
	}
});
//**************************发送小块数据*************************************************************** */
$(".meet_file_name_right").click(function(){
	if($("#cmd_content").val() == ""){
		return;
	}
	CRVideo_SendCmd(g_call_user_id,$("#cmd_content").val());//发送小块数据
});
//发送小块数据回调
CRVideo_SendCmdRlst.callback = function(taskID,sdkErr,cookie){
	if(sdkErr == CRVideo_NOERR){
		$(".cmd_prompt").show(300);
		$("#cmd_content").val("");
		var cmd_prompt_num = 2;
		var cmd_prompt_temp = setInterval(function(){
			cmd_prompt_num--;
			if(cmd_prompt_num == 0){
				$(".cmd_prompt").hide(300);
				
				clearInterval(cmd_prompt_temp);
			}
		},1000)
        
	}
}

//收到小块数据
CRVideo_NotifyCmdData.callback = function(sourceUserId,data){
	popupTipLayer("收到"+sourceUserId+"的消息："+data);
};
//**************************设置默认摄像头*************************************************************** */
$("#video_select").change(function(){
	CRVideo_SetDefaultVideo(g_me_user_id,$("#video_select").val());//设置默认视频 
});
//视频状态变化
CRVideo_VideoStatusChanged.callback = function(userID,oldStatus,newStatus){
	updateRecord();
};
//通知用户的视频默认设备有变化 
CRVideo_DefVideoChanged.callback = function(userID,videoID){
	updateRecord();
};
// 摄像头设备变化
CRVideo_VideoDevChanged.callback = function(userID){
	setTimeout(function(){
		updateRecord()
	},50);
};
//**************************发言参数设置*************************************************************** */
$("#spker_select").change(function(){
	var cfg = {};
	cfg.micName = $("#mic_select").val();
	cfg.speakerName = $("#spker_select").val();
	cfg.privAgc = 0;
	cfg.privEC = 0;
	CRVideo_SetAudioCfg(cfg);
});
//**************************麦克风参数设置*************************************************************** */
$("#mic_select").change = function(e){
	var cfg = {};
	cfg.micName = $("#mic_select").val();
	cfg.speakerName = $("#spker_select").val();
	cfg.privAgc = 0;
	cfg.privEC = 0;
	CRVideo_SetAudioCfg(cfg);//麦克风设置
}
//*****************************视频参数**************************************************************** */
function updateVideoCfg(){
	var cfg = {}
	var sizeType = parseInt($("#size_select").val());
	cfg.sizeType = sizeType;
	
	var fps = parseInt($("#frame_input").val())
	if(fps < 5){
		fps = 5;
	}else if(fps > 20){
		fps = 20;
	}
	cfg.fps = fps;
	cfg.maxbps = record_size_arr[sizeType][2]*1000;
	
	var qp = $("input[name='meet_yx']:checked").val();
	if(qp == 0)
	{
		cfg.qp_min = 22;
		cfg.qp_max = 25;
	}else if(qp == 1)
	{
		cfg.qp_min = 22;
		cfg.qp_max = 36;
	}
	CRVideo_SetVideoCfg(cfg);
}
$("#size_select").change(function(){
	updateVideoCfg();
});

$("#frame_input").change(function(){
updateVideoCfg();
});

//***************************************进入会议结果*************************
CRVideo_EnterMeetingRslt.callback = function(sdkErr){
	removeLodingLayer();
	if(sdkErr == CRVideo_NOERR){
		$('.start_server_containt').css('display',"none");
		$('.queue_containt').css('display',"none");
		$(".meeting_containt").css("display","block")
		g_meeting = true;
		if(g_call_video === undefined){
			g_call_video = CRVideo_CreatVideoObj();//视频的呈现容器 
			g_call_video.width(800)
			g_call_video.height(450)
			$(".meet_video_media_left").append(g_call_video.handler())
		}
		if(g_me_video === undefined){
			g_me_video = CRVideo_CreatVideoObj();//视频的呈现容器 
			g_me_video.width(400)
			g_me_video.height(225)
			$(".meet_video_media_host").append(g_me_video.handler())
		}
		updateDevices();
		//打开麦克风
		CRVideo_OpenMic(g_me_user_id);
		$("#mic_operate_btn").text("关闭");

		//打开视频
		CRVideo_OpenVideo(g_me_user_id);
		$("#video_operate_btn").text("关闭");

		//设置自己视频,延迟显示(ie8有可能组件还没初始化完毕)
		setTimeout(function(){
			g_me_video.setVideo(g_me_user_id)
		},500);
		
		//设置对方的视频,延迟显示(ie8有可能组件还没初始化完毕)
		$(".meeting_titile").text("您正在和【"+g_call_user_id+"】视频会话中...");
		setTimeout(function(){
			g_call_video.setVideo(g_call_user_id)
		},500);

		g_residual_timer = setInterval(function(){
			if(g_bg_color != "#10132b"){
				$(".meeting_media_box").css("background-color","#10132c");
				g_bg_color = "#10132b";
			}else{
				$(".meeting_media_box").css("background-color","#10132b");
				g_bg_color = "#10132c";
			}
			},500);
		updateVideoCfg();
		
	}else{
		$(".meeting_containt").css("display","none");
		g_meeting = false
		g_user_srv_layer_index = layer.open({
			type : 0, 
			area: '400px',
			title : ['提示', 'font-size:14px;'],
			content: '进入会议失败,是否重连', //注意，如果str是object，那么需要字符拼接。
			btn: ['<p style="font-size:14px;">确定</p>','<p style="font-size:14px;">取消</p>'],
			yes: function(index, layero){
				layer.close(index)
				CRVideo_EnterMeeting(g_meet_id,g_meet_pwd,g_user_id,g_nick_name);//进入会议
				popupLodingLayer();

			}.bind(this),
			btn2: function(index, layero){
				layer.close(index);
				logout();
				}.bind(this),
		});
	}
	
}

//***********************会议掉线************************************
CRVideo_MeetingDropped.callback = function(){
	CRVideo_EnterMeeting(g_meet_id,g_meet_pwd,g_user_id,g_nick_name);//进入会议

	$(".meeting_containt").css("display","none");
	g_meeting = false
	popupLodingLayer();
}

//**************************离线************************************
CRVideo_LineOff.callback = function(sdkErr){
    layer.open({
			type : 0, 
			area: '400px',
			title : ['提示', 'font-size:14px;'],
			content: "会话掉线", //注意，如果str是object，那么需要字符拼接。
			btn: ['确定'],
			yes: function(index, layero){
				location.replace(location.href);
				
			 }
		})
};
//*******************************用户进入会议************************************
CRVideo_UserEnterMeeting.callback = function(usrID){
	if(usrID == g_call_user_id){
		//设置对方的视频
		$(".meeting_titile").text("您正在和【"+g_call_user_id+"】视频会话中...");
		
		if(g_call_video !== undefined){
			g_call_video.setVideo(g_call_user_id);
		}
		
	}else if(usrID == g_me_user_id){
		if(g_me_video !== undefined){
			g_me_video.setVideo(g_me_user_id);
		}	
	}
};
//***************************************队列*******************************************/
//查询列队是否在服务中
function getServicedById(queID){
	var servingQues = CRVideo_GetServingQueues();//获取我服务的所有队列 
	var servingQues_length = servingQues.length;
	for(var i = 0;i < servingQues_length;i++){
		var item = servingQues[i];
		if(item == queID){
			return true;
		}
	}
	return false;
};

//设置列队是否免打扰
function setSrvDNDState(state){
	if(state){
		$(".start_server_footer_right").css("display","inline")
		CRVideo_SetDNDStatus(1);//设置默认队列
	}
	else {
		$(".start_server_footer_right").css("display","none")
		CRVideo_SetDNDStatus(0);//0:代表关闭免打扰， 其它值代表开启免打扰
	}
};

//更新队列状态
function updateQue(status){
	for (var name in g_que_dict){
		var item = g_que_dict[name];
		if(item["queId"] == status.queID){
			if(g_login_type == 2){
				item["expertNum_span"].text(status.agent_num);
				item["queNum_span"].text(status.wait_num);
				item["srvNum_span"].text(status.srv_num);
			
			}else{
				item["queNum_span"].text(status.wait_num + "人");
			}
			break;
		}
		
	}
};

//删除请求服务用户层
function removeUserSrvLayer(){
	if(g_user_srv_layer_index != -1){
		layui.use('layer', function(){ 
			var layer = layui.layer;
			layer.close(g_user_srv_layer_index);
			g_user_srv_layer_index = -1;
		})
	}
};

//弹出请求服务用户层
function popupUserSrvLayer(user){
	layui.use('layer', function(){ 
		var layer = layui.layer;
		if(g_user_srv_layer_index != -1){
			layer.close(g_user_srv_layer_index);
		}
	
		g_user_srv_layer_index = layer.open({
			type : 0, 
			area: '400px',
			title : ['用户分配中', 'font-size:14px;'],
			content: '系统为您分配【'+user.usrID+'】', //注意，如果str是object，那么需要字符拼接。
			btn: ['<p style="font-size:14px;">确定</p>','<p style="font-size:14px;">取消</p>'],
			yes: function(index, layero){
					layer.close(index);
					g_call_user_id = user.usrID;
					g_call_user_que = user.queID;
					CRVideo_CreateMeeting("test");// 创建会议
					g_user_srv_layer_index = -1;
					popupLodingLayer();
			}.bind(this),
			btn2: function(index, layero){
				layer.close(index);
				CRVideo_RejectAssignUser(user.queID, user.usrID);//拒绝分配的客户
				g_user_srv_layer_index = -1;
			 }.bind(this),
		});
		layer.config({
		  skin: 'demo-class',

		});	
		
	});
};

//删除请求用户排队层
function removeUserQueLayer(){
	if(g_user_que_layer_index != -1){
		layui.use('layer', function(){ 
			var layer = layui.layer;
			layer.close(g_user_que_layer_index);
			g_user_que_layer_index = -1;
		})
	}
};

//弹出请求用户排队层
function popupUserQueLayer(user){
	layui.use('layer', function(){ 
		var layer = layui.layer;
		var content;
		var timer;
		var s = 0;
		if(g_user_que_layer_index != -1){
			layer.close(g_user_que_layer_index);
		}
	
		g_user_que_layer_index = layer.open({
			type : 0, 
			area: '400px',
			title : ['用户分配中', 'font-size:14px;'],
			content: "你已经排队等待0秒", //注意，如果str是object，那么需要字符拼接。
			btn: ['<p style="font-size:14px;">取消</p>'],
			yes: function(index, layero){
				CRVideo_StopQueuing();
				layer.close(index);
				g_user_que_layer_index = -1;
				
			 },
			nd:function(){
				clearInterval(timer)
		 },
		   success: function(layero, index){
				timer = setInterval(function()
				{
					if(g_queuing_info !== undefined)
					{
						 s++;
						 $(layero).find('.layui-layer-content').html("你已经排队等待"+ s+"秒");
					}
					
				},1000)
			}
		});
		layer.config({
		  skin: 'demo-class',

		});	
		
	});
};

//列队数据初始化返回
CRVideo_InitQueueDatRslt.callback = function(sdkErr,cookie){
	seeisoninfo = CRVideo_GetSessionInfo();// 获取我的会话信息
	if(sdkErr == CRVideo_NOERR){
		if(seeisoninfo.callID != "" && seeisoninfo.duration > 0){
			layui.use('layer', function(){ 
				var layer = layui.layer;
				layer.open({
					area: '500px',
					title : ['提示', 'font-size:14px;'],
					content: '是否恢复意外关闭的视频会话', //注意，如果str是object，那么需要字符拼接。
					btn: ['<p style="font-size:14px;">确定</p>','<p style="font-size:14px;">取消</p>'],
					yes: function(index, layero){
						layer.close(index)
						g_meet_id = seeisoninfo.meetingID;
						g_meet_pwd = seeisoninfo.meetingPswd;
						g_session_call_id = seeisoninfo.callID;
						g_call_user_id = seeisoninfo.peerName;
						CRVideo_EnterMeeting(g_meet_id,g_meet_pwd,g_user_id,g_nick_name);//进入会议
						popupLodingLayer()
					},
					btn2: function(index, layero){
						layer.close(index)
						CRVideo_HungupCall(seeisoninfo.callID);//挂断呼叫

					 },
				});
				
			});
		}
		var que_info = CRVideo_GetAllQueueInfo();//查询队列
		
		//初始化坐席业务列表
		g_que_dict = {};
		
		var queInfos_length = que_info.length;
		for(var i = 0;i < queInfos_length;i++){
			var item = que_info[i];
			if(g_login_type == 2){
				var status = CRVideo_GetQueueStatus(item.queID); //获取队列状态
				var li = $("<li/>")

				var name_span = $("<span>"+item.name+"</span>")
				li.append(name_span);
				
				var expertNum_span = $("<span>"+status.agent_num+"</span>")
				li.append(expertNum_span);
				
				var queNum_span = $("<span>"+status.wait_num+"</span>")
				li.append(queNum_span);
				
				var srvNum_span = $("<span>"+status.srv_num+"</span>")
				li.append(srvNum_span);
				
				var srvStatus_span = $("<span/>")
				var btn = $("<span id=\"srv_open_btn_"+item.queID+"\" class=\"start_server_open_server\">请开启服务</span>")
				if(getServicedById(item.queID)){
					btn.text("服务中...");
					btn.addClass("active");
					
				}else{
					btn.text("请开启服务");
					btn.removeClass("active");
				}
				srvStatus_span.append(btn);
				li.append(srvStatus_span);
				
				var priority_span = $("<span>"+item.prio+"</span>")
				li.append(priority_span);

				g_que_dict[btn.attr("id")] = {"queId":item.queID,"expertNum_span":expertNum_span,"queNum_span":queNum_span,"srvNum_span":srvNum_span,"srvStatus_span":srvStatus_span};
				
				$('#start_server_list').append(li)

				btn.click(function(e){
					queData = g_que_dict[$(this).attr("id")];
					var queID = queData["queId"];
					if(getServicedById(queID)){
						CRVideo_StopService(queID);//停止服务
						$(this).text("请开启服务");
						$(this).removeClass("active");
					}
					else {
						CRVideo_StartService(queID); //开启服务
						$(this).text("服务中...");
						$(this).addClass("active");
					}
				});
			}else{
				var status = CRVideo_GetQueueStatus(item.queID);//获取队列状态
				var li = $("<li id=\"queue_li_"+item.queID+"\" />")

				var name_span = $("<span class=\"queue_list_left\">"
									+"<span>"+item.name+"</span>"
									+"<span>"+item.desc+"</span>"
								+"</span>"
								)
				li.append(name_span);
				var queNum_span = $("<span class=\"queue_list_right\">"+status.wait_num+"人</span>")
				li.append(queNum_span);
				
				
				g_que_dict[li.attr("id")] = {"queId":item.queID,"name_span":name_span,"queNum_span":queNum_span};
				
				$('#queue_list').append(li)
				
				li.click(function(e){
					queData = g_que_dict[$(this).attr("id")];
					var queID = queData["queId"];
					CRVideo_StartQueuing(queID);//开始排队
					popupUserQueLayer();
				});
			}
			
		}

		if(g_login_type == 2){
			setSrvDNDState(0)//设置列队是否免打扰
			
			$(".start_server_footer_right").click(function(e){
				CRVideo_ReqAssignUser(); //请求分配客户操作结果
			})
			
			$("#start_server_disturb").click(function(e){
				var checkVal = $("input[type='checkbox']").is(':checked');
				setSrvDNDState(checkVal)//设置列队是否免打扰
			})
		}
	}
};

//开始排队响应
CRVideo_StartQueuingRslt.callback = function(errCode,cookie){
	if(errCode != 0){
		removeUserQueLayer();
	}
};

//停止排队响应
CRVideo_StopQueuingRslt.callback = function(errCode,cookie){

};

//自己被呼叫
CRVideo_NotifyCallIn.callback = function(callID ,meetObj,callerID,usrExtDat){
	removeUserQueLayer();
	CRVideo_AcceptCall(callID,meetObj)//接受对方发起的视频请求，开始进入视频会话
	
	g_meet_id = meetObj.ID;
	g_meet_pwd = meetObj.pswd;
	g_session_call_id = callID;
	g_call_user_id = callerID;
	popupLodingLayer();
	CRVideo_EnterMeeting(meetObj.ID,meetObj.pswd,g_user_id,g_nick_name);//进入会议
};

//正在排队信息更新
CRVideo_QueuingInfoChanged.callback = function(queuingInfo){
	g_queuing_info = queuingInfo;
};

//列队状态改变
CRVideo_QueueStatusChanged.callback = function(queStatus){
	updateQue(queStatus);
};

//开启队列服务响应
CRVideo_StartServiceRslt.callback = function(queID,sdkErr,cookie){
	if(sdkErr == CRVideo_NOERR)	{//开始服务队列，更新该队列的状态信息
		var status = CRVideo_GetQueueStatus(queID);
		updateQue(status);
	}	
};

//停止队列服务响应
CRVideo_StopServiceRslt.callback = function(queID,sdkErr,cookie){

};

//系统自动安排客户	
CRVideo_AutoAssignUser.callback = function(usr){
	popupUserSrvLayer(usr);
};

//请求分配客户操作结果
CRVideo_ReqAssignUserRslt.callback = function(errCode,usr,cookie){
	if(errCode == CRVideo_NOERR){
		popupUserSrvLayer(usr);
	}else if(errCode == CRVideo_QUE_NOUSER){
		popupTipLayer("目前没有需要服务的客户")
	}else if(errCode == CRVideo_QUE_SERVICE_NOT_START){
		popupTipLayer("未开启队列服务")
	}
};

//系统取消自动安排客户
CRVideo_CancelAssignUser.callback = function(queID,usrID){
	removeUserSrvLayer();

};

//会议创建成功
CRVideo_CreateMeetingSuccess.callback = function(meetObj,cookie){
	CRVideo_Call(g_call_user_id,meetObj);//发起呼叫，邀请用户参加视频会话
	CRVideo_AcceptAssignUser(g_call_user_que, g_call_user_id); //接受系统安排的客户

};
//会议创建失败
CRVideo_CreateMeetingFail.callback = function(sdkErr,cookie){
	removeLodingLayer();
	popupTipLayer("创建会议失败")
};

//呼叫他人操作成功
CRVideo_CallSuccess.callback = function(callID, cookie){

};
//呼叫他人操作失败
CRVideo_CallFail.callback = function(callID, sdkErr,cookie){
	popupTipLayer("呼叫失败");
};

//通知呼叫被对方接受
CRVideo_NotifyCallAccepted.callback = function(callID,meetObj,usrExtDat){
	g_meet_id = meetObj.ID;
	g_meet_pwd = meetObj.pswd;
	g_session_call_id = callID;
	CRVideo_EnterMeeting(g_meet_id,g_meet_pwd,g_user_id,g_nick_name);//进入会议
};
//通知呼叫被对方拒绝
CRVideo_NotifyCallRejected.callback = function(callID, sdkErr,usrExtDat){
	popupTipLayer("呼叫被对方拒绝");
};
//点击注销
$("#start_server_logout,#queue_logout").click(function(){
	logout();
});

//注销
function logout(){
	CRVideo_Logout();
	setTimeout(function()
	{	
		location.replace(location.href)
	},200)//延迟刷新页面防止logout未执行完毕
};
//刷新
$("#queue_uptate").click(function(){
	refresh_que();
})

//****************************弹框***************************************
var BombBox = function(param){
	
	var title = param.title,
    content = param.content,
    yesText = param.yesText || '确定',
    noText = param.noText,
    yesFn = param.yesFn,
    noFn = param.noFn;
    
var htm = "";
htm += '<div class="lacy-alert"><div class="bgd">';
if (title) htm += '<header class="hd">' + title + '</header>';
htm += '<div class="bd">' + content + '</div></div>';
if (!noText){
    htm += '<footer class="fd">' +
    '<a href="#" class=" alert-btn alert-btn-lg" data-role="closeBtn" id="yes_long_btn">' + yesText + '</a>' +
    '</footer>';
    htm += '</div>';
}
else{
    htm += '<footer class="fd">' +
    '<a href="#" class=" alert-btn alert-btn-st" id="yes_btn">' + yesText + '</a>' +
    '<a href="#" class=" alert-btn alert-btn-st" data-role="closeBtn">' + noText + '</a>' +
    '</footer>';
    htm += '</div>';
}

$("body").append(htm);

 var al = $(".lacy-alert");
 al.on("click", '[data-role="closeBtn"]', function() {
     $(".lacy-alert").remove();
 });

 $("#yes_btn,#yes_long_btn").bind("click" , function () {
     $(".lacy-alert").remove();
     if(param.yesFn){
         param.yesFn();
     }
     param = {};
 });
 
	
}

