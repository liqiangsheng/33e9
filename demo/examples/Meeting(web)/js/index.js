
var g_is_init = false; // 是否初始化
var g_server_addr; // 服务器地址
var g_user_id; // 登录用户id
var g_nick_name; // 登录昵称
var g_master; // 是否是主持人身份 1-是 0-否
var g_logining = false; // 是否登录
var g_meeting = false; // 是否在会议中
var g_meet_id; // 视频会议ID
var g_meet_number; // 会议号
var g_meet_pswd; // 本次会议中的密码
var g_meet_video; // 主视频
var g_main_id; // 主视频的ID
var g_me_user_id; // 自己的ID
var g_meet_video1; // 参会者的视频
var g_meet_video2; // 参会者的视频
var g_meet_video3; // 参会者的视频
var g_meet_video4; // 参会者的视频
var g_meet_video5; // 参会者的视频
var getVideoList; // 所有的摄像头
var g_meet_mode; // 视频墙分屏 2-二分屏 3-四分屏 5-六分屏
var video_size_arr=[[0,0,0],[144,80,56],[224,128,72],[288,160,100],[336,192,150],[448,256,200],[512,288,250],[576,320,300],[640,360,350],[720,400,420],[848,480,500],[1024,576,650],[1280,720,1000],[1920,1080,2000]]; // 视频码率
var g_video_size_type = 8;
var g_video_fps = 15;
var g_video_qp = 0;
var g_wh_rate = 0; // 尺寸比例
var g_chat_id;
var g_isScreenShare = false;
var g_bg_color = 0;
var g_residual_timer = -1;
var g_muti_video = 0; // 是否启用多摄像头 1-开启 0-关闭
var g_current_page; // 当前功能页 视频墙-0 共享-1 白板-2
var g_screenShareObj; // 屏幕共享对象
var g_is_first_meeting = 0;
var cr_account; // 云屋授权账号
var cr_psw;//云屋授权密码

//目录地址
var g_location_dir = function() {
	var location_dir = location.href;
	var end = location_dir.lastIndexOf('/');
	var start = location_dir.indexOf('file:///');
	if(start > -1) {
		start = 8;
	}else {
		start = 0;
	}
	location_dir = location_dir.slice(start,end)+"/home/";
	location_dir = decodeURIComponent(location_dir);
	return location_dir;
}()

$(function() {

	/**
	 * 登录会议
	 */
	// 登录服务器的点击事件
	$(".remeber_server").click(function(){
		if($(this).attr("src") == "image/pull_down.png"){
			$(this).attr("src","image/pull_up.png");
			$(".pull_down_server").css("display","block");
		}else{
			$(this).attr("src","image/pull_down.png");
			$(".pull_down_server").css("display","none");
		}
	});
	// 登录用户名的点击事件
	$(".remeber_name").click(function(){
		if($(this).attr("src") == "image/pull_down.png"){
			$(this).attr("src","image/pull_up.png");
			$(".pull_down_name").css("display","block");
		}else{
			$(this).attr("src","image/pull_down.png");
			$(".pull_down_name").css("display","none");
		}
	});
	// 主持人的点击事件
	$(".remeber_master").click(function() {
		if($(this).attr("src") == "image/pull_down.png"){
			$(this).attr("src","image/pull_up.png");
			$(".pull_down_master").css("display","block");
		}else{
			$(this).attr("src","image/pull_down.png");
			$(".pull_down_master").css("display","none");
		}
	});
	// server 的下拉菜单
	$(".pull_down_server li").mouseover(function(){
		$(this).addClass("onserver");
	}).mouseout(function(){
		$(this).removeClass("onserver");
	}).mouseup(function(){
		$("#login_serverName").val($(this).text());
		$(".remeber_server").attr("src","image/pull_down.png");
		$(".pull_down_server").css("display","none");

	});
	//name 的下拉菜单事件
	$(".pull_down_name li").mouseover(function(){
		$(this).addClass("onname");
	}).mouseout(function(){
		$(this).removeClass("onname");
	}).mouseup(function(){
		$("#login_nickName").val($(this).text());
		$(".remeber_name").attr("src","image/pull_down.png");
		$(".pull_down_name").css("display","none");

	});
	// master 的下拉菜单
	$(".pull_down_master li").mouseover(function() {
		$(this).addClass("onmaster");
	}).mouseout(function() {
		$(this).removeClass("onmaster");
	}).mouseup(function() {
		$("#login_master").val(($(this).text()));
		$(".remeber_master").attr("src","image/pull_down.png");
		$(".pull_down_master").css("display","none");
	});

	$('.entermeet_login_tab li').click(function() {
		var i = $(this).index();
		$(this).siblings().removeClass("onentermeet");
		$(this).addClass("onentermeet");
		$('.entermeet_tab_items').css("display","none");
		$('.entermeet_tab_items').eq(i).css("display","block");
	});
	$(".inputLayer1").click(function(){
		$(".inputLayer1").hide();
		$("#login_serverName").val("").focus();
		$(".pull_down_server").hide();
	});
	$(".inputLayer2").click(function(){
		$(".inputLayer2").hide();
		$("#login_nickName").val("").focus();
	});
	$(".inputLayer3").click(function(){
		$(".inputLayer3").hide();
		$(".pull_down_master").hide();
	});
	$(".inputLayer4").click(function(){
		$(".inputLayer4").hide();
		$("#login_cpyName").val("").focus();
	});
	$(".inputLayer5").click(function(){
		$(".inputLayer5").hide();
		$("#login_psd").val("").focus();
	});

	// 创建并进入会议
	$('#createMeetBtn').click(function() {
		var m_name = $('#meeting_name').val();
		if(m_name != '') {
			$('.loadDiv').css('display','block');
			$('#createMeetBtn').attr("disabled", true);
			$('#createMeetBtn').css({"backgroundColor":"#ccc","border":"1px solid #ccc"});
			CRVideo_CreateMeeting(m_name);
		} else {
			popTip("会议主题不能为空！");
		}
	});

	// 会议号入会
	$('#nunEnterMeetBtn').click(function() {
		g_meet_number = $('#meeting_number').val();
		if(g_meet_number != '') {
			$('.loadDiv').css('display','block');
			CRVideo_EnterMeeting(g_meet_number,"",g_user_id,g_nick_name);
		} else {
			popTip("会议号不能为空！");
		}
	});

	/**
	 * 会议详情
	 */
	$('.meetingDetail_tab_left li').click(function() {
	 	var i = $(this).index();
	 	$(this).siblings().removeClass("onmeetingDetail");
		$(this).addClass("onmeetingDetail");
		$('.meetingDetail_tab_items').css("display","none");
		$('.meetingDetail_tab_items').eq(i).css("display","block");
		if(i == 0) {
			g_current_page = 0;
			if(g_meet_mode == 2 || g_meet_mode == 0) {
				$('.meetingDetail_radio_bg').removeClass('onradio');
				$('.meetingDetail_radio_bg').eq(0).addClass('onradio');
				modeTwo();
			} else if(g_meet_mode == 3) {
				$('.meetingDetail_radio_bg').removeClass('onradio');
				$('.meetingDetail_radio_bg').eq(1).addClass('onradio');
				modeFour();
			} else if(g_meet_mode == 5) {
				$('.meetingDetail_radio_bg').removeClass('onradio');
				$('.meetingDetail_radio_bg').eq(2).addClass('onradio');
				modeSix();
			}
			setTimeout(function() {
				updateVideo();
			},500);
			CRVideo_Switchtopage(0,"");
		} else if(i == 1) {
			g_current_page = 1;
			CRVideo_Switchtopage(1,"");
		} else if(i == 2){
			CRVideo_Switchtopage(2,"");
			// 获取会议网盘的容量信息
			CRVideo_GetNetDiskSummary();
			// 获取网盘用户共享文件列表
			CRVideo_GetNetDiskFileList();

			uploadFileCont();
		}
	});

	// 视频墙切换
	$('.meetingDetail_radio_bg').click(function() {
		var radioVal = $(this).data("radio");
		$('.meetingDetail_radio_bg').removeClass('onradio');
		$('.meetingDetail_radio_bg').eq(radioVal).addClass('onradio');
		if(radioVal == "0") {
			CRVideo_Setvideowallmode(2);
		} else if(radioVal == "1") {
			CRVideo_Setvideowallmode(3);
		} else if(radioVal == "2") {
			CRVideo_Setvideowallmode(5);
		}
	});

	// 屏幕共享
	$('.screen_share_btn').click(function() {
		if(g_isScreenShare) {
			layerTip("正在屏幕共享中");
			return;
		}

		var str = '<div class="screenShare_box">'
	    		+		'<div class="screen_share_item">'
	    		+			'<span class="screen_share_opt"><input onclick="choseShareTY(\'0\')" type="radio" name="chooseScreenType" value="0" checked />屏幕共享</span>'
	    		+			'<span class="screen_share_opt"><input onclick="choseShareTY(\'1\')" type="radio" name="chooseScreenType" value="1" />区域共享</span>'
	    		+		'</div>'
	    		+		'<div class="screen_share_item">'
	    		+			'<span class="screen_share_opt"><input onclick="choseShareFR(\'0\')" type="radio" name="chooseScreenFirst" value="0" checked />画质优先</span>'
	    		+			'<span class="screen_share_opt"><input onclick="choseShareFR(\'1\')" type="radio" name="chooseScreenFirst" value="1" />速度优先</span>'
	    		+		'</div>'
	    		+		'<div class="screen_share_btn_wrap">'
	    		+			'<button id="screenShareSure">确定</button>'
	    		+			'<button id="screenShareCancel">取消</button>'
	    		+		'</div>'
	    		+	'</div>';
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				type: 1,
				title: ['屏幕共享', 'font-size:14px;'],
				skin: 'layui-layer-rim',
				area: ['480px', '300px'],
				content: str,
				success: function(index, layero) {
					
					$('#screenShareSure').click(function() {
						var obj = {};
						var encodeType = parseInt($("input[name='chooseScreenFirst']:checked").val());
		                var catchRect =  $("input[name='chooseScreenType']:checked").val();
		                obj.encodeType = encodeType;
		                if(catchRect == "1") {
		                	obj.catchRect = {"left":10,"top":10,"width":400,"height":400};
		                }
		                // else
	                 //    {
	                 //        g_screenShareX = 0;
	                 //        g_screenShareY = 0;
	                 //        obj.maxFPS = 8;
	                 //        obj.maxKbps = 800000;
	                 //    }
		                CRVideo_SetScreenShareCfg(obj);
	               		CRVideo_StartScreenShare();
						layer.closeAll();
					});
					$('#screenShareCancel').click(function() {
						layer.closeAll();
					});
				},
				end: function() {
					// $('.meetingDetail_box').css('display','block');
					// updateVideo();
				}
			});
		});
	});
	var g_isStartScreenShare = false;
	var g_screenShareX = 0;
	var g_screenShareY = 0;
	var g_screenShareWidth = 0;
	var g_screenShareHeight = 0;
	// 退出会议
	$("#exitMeetBtn").click(function() {
		g_meeting = false;
		if(g_isScreenShare) {
			g_isScreenShare = false;
		}
		CRVideo_ExitMeeting();
		CRVideo_SetDNDStatus(0);
		$("#chatsList div").remove();
		$(".entermeet_box").css("display","block");
		$(".meetingDetail_box").css("display","none");
	});

	// 文件中转站刷新
	$("#refreshBtn").click(function() {
		CRVideo_GetNetDiskFileList();
	});
})
CRVideo_NotifyShareRectChanged.callback = function(x,y,w,h)
{
    g_screenShareX = x
    g_screenShareY = y
    g_screenShareWidth = w;
    g_screenShareHeight = h;
}

// 登录
function login() {
	// 插件是否初始化
	if(!g_is_init) {
		var result = CRVideo_Init("CLOUDROOM",g_location_dir);
		if(result == CRVideo_WEB_OCX_NOTINSTALLED) {
			// 没有安装
			popTip("没有安装插件");
			return;
		} else if(result == CRVideo_OCX_VERSION_NOTUPPORTED) {
			// 版本过低
			popTip("插件版本过低");
			return;
		} else if(result == CRVideo_WEB_BROWER_NOTUPPORTED) {
			// 不支持的浏览器
			popTip("不支持的浏览器");
			return;
		} else if(result != 0) {
			// 其他错误
			popTip("CRVideo_init sdkErr:"+result);
			return;
		} else {
			g_is_init = true;
		}
	}
	$('.loadDiv').css('display','block');
	$('#loginBtn').attr("disabled", true);
	$('#loginBtn').css({"backgroundColor":"#ccc","border":"1px solid #ccc"})

	g_server_addr = $('#login_serverName').val();
	g_user_id = $('#login_nickName').val();
	g_nick_name = $('#login_nickName').val();
	g_master = $('#login_master').val();
	// 云屋授权账号
	cr_account = $("#login_cpyName").val() || "demo@cloudroom.com";
	// 云屋授权账号的密码
	cr_psw =   md5($("#login_psd").val()) || "e10adc3949ba59abbe56e057f20f883e";

	if(!g_server_addr) {
		popTip("服务器地址不能为空");
		$('.loadDiv').css('display','none');
		$('#loginBtn').attr("disabled", false);
		$('#loginBtn').css({"backgroundColor":"#3aabfb","border":"1px solid #3aabfb"})
		return;
	} else if(!g_nick_name) {
		popTip("昵称不能为空");
		$('.loadDiv').css('display','none');
		$('#loginBtn').attr("disabled", false);
		$('#loginBtn').css({"backgroundColor":"#3aabfb","border":"1px solid #3aabfb"})
		return;
	} else if(!g_master) {
		popTip("主持人不能为空");
		$('.loadDiv').css('display','none');
		$('#loginBtn').attr("disabled", false);
		$('#loginBtn').css({"backgroundColor":"#3aabfb","border":"1px solid #3aabfb"})
	} else {
		if(g_master == "是") {
			g_master = 1;
		} else if(g_master == "否") {
			g_master = 0;
		}
		CRVideo_SetServerAddr(g_server_addr);
		CRVideo_Login(cr_account,cr_psw,g_nick_name,g_user_id,"");
	}
}

// 登录成功
CRVideo_LoginSuccess.callback = function(usrID,cookie) {
	$('.loadDiv').css('display','none');
	$('#loginBtn').attr("disabled", false);
	$('#loginBtn').css({"backgroundColor":"#3aabfb","border":"1px solid #3aabfb"});
	$('.login_box').css('display','none');
	$('.entermeet_box').css('display','block');
	$('#username').html(usrID);
	g_me_user_id = usrID;
	g_logining = true;
}

// 登录失败
CRVideo_LoginFail.callback = function(sdkErr,cookie) {
	$('.loadDiv').css('display','none');
	$('#loginBtn').attr("disabled", false);
	$('#loginBtn').css({"backgroundColor":"#3aabfb","border":"1px solid #3aabfb"});
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.msg("登录失败 错误码:"+sdkErr, {time: 1000}, function() {
			location.replace(location.href);
		});
	});
}

// 创建会议成功
CRVideo_CreateMeetingSuccess.callback = function(meetObj,cookie) {
	g_meet_id = meetObj.ID;
	g_meet_pswd = meetObj.pswd;
	CRVideo_EnterMeeting(g_meet_id,g_meet_pswd,g_user_id,g_nick_name);	
}

// 创建会议失败
CRVideo_CreateMeetingFail.callback = function(sdkErr,cookie) {
	$('.loadDiv').css('display','none');
	$('#createMeetBtn').attr("disabled", false);
	$('#createMeetBtn').css({"backgroundColor":"#3aabfb","border":"1px solid #3aabfb"});
	popTip("创建会议失败 错误码:"+sdkErr);
}

// 进入会议的结果
CRVideo_EnterMeetingRslt.callback = function(sdkErr) {
	$('.loadDiv').css('display','none');
	$('#createMeetBtn').attr("disabled", false);
	$('#createMeetBtn').css({"backgroundColor":"#3aabfb","border":"1px solid #3aabfb"});
	if(sdkErr == CRVideo_NOERR) {
		$("#chatsList div").remove();
		g_meeting = true;
		if(g_meet_id) {
			$('#meetingID').html(g_meet_id);
		} else {
			$('#meetingID').html(g_meet_number);
		}
		
		$('.entermeet_box').css("display", "none");
		$('.meetingDetail_box').css("display", "block");

		if(g_meet_video === undefined) {
			g_meet_video = CRVideo_CreatVideoObj();
			g_meet_video.id("videoObj");
			$(".videoContainer").append(g_meet_video.handler());
			g_meet_video.setVisibleNickName(0);
			g_meet_video.keepAspectRatio(true);
		}
		if(g_meet_video1 === undefined) {
			g_meet_video1 = CRVideo_CreatVideoObj();
			g_meet_video1.id("videoObj1");
			$(".videoContainer1").append(g_meet_video1.handler());
			g_meet_video1.setVisibleNickName(0);
			g_meet_video1.keepAspectRatio(true);
		}
		if(g_meet_video2 === undefined) {
			g_meet_video2 = CRVideo_CreatVideoObj();
			g_meet_video2.id("videoObj2");
			$(".videoContainer2").append(g_meet_video2.handler());
			g_meet_video2.setVisibleNickName(0);
			g_meet_video2.keepAspectRatio(true);
		}
		if(g_meet_video3 === undefined) {
			g_meet_video3 = CRVideo_CreatVideoObj();
			g_meet_video3.id("videoObj3");
			$(".videoContainer3").append(g_meet_video3.handler());
			g_meet_video3.setVisibleNickName(0);
			g_meet_video3.keepAspectRatio(true);
		}
		if(g_meet_video4 === undefined) {
			g_meet_video4 = CRVideo_CreatVideoObj();
			g_meet_video4.id("videoObj4");
			$(".videoContainer4").append(g_meet_video4.handler());
			g_meet_video4.setVisibleNickName(0);
			g_meet_video4.keepAspectRatio(true);
		}
		if(g_meet_video5 === undefined) {
			g_meet_video5 = CRVideo_CreatVideoObj();
			g_meet_video5.id("videoObj5");
			$(".videoContainer5").append(g_meet_video5.handler());
			g_meet_video5.setVisibleNickName(0);
			g_meet_video5.keepAspectRatio(true);
		}
		if(g_screenShareObj == undefined) {
			g_screenShareObj = CRVideo_CreatScreenShareObj();
			g_screenShareObj.id("screenShareObj");
			$("#screenShareContainer").append(g_screenShareObj.handler());
		}
		CRVideo_SetDNDStatus(1); // 设置呼叫免打扰
		// 打开摄像头
		CRVideo_OpenVideo(g_user_id);
		// 默认关闭多摄像头
		CRVideo_SetEnableMutiVideo(g_user_id,g_muti_video);
		// 打开麦克风
		CRVideo_OpenMic(g_user_id);
		// 初始化音频设备
		var cfg = {};
		cfg.micName = "";
		cfg.speakerName = "";
		cfg.privAgc = 0;
		cfg.privEC =0;
		CRVideo_SetAudioCfg(cfg);
		g_residual_timer = setInterval(function() {
		 	if(g_bg_color != "#10132b"){
		 		$(".video_wall_content").css("background-color","#10132c");
		 		g_bg_color = "#10132b";
		 	}else{
		 		$(".video_wall_content").css("background-color","#10132b");
		 		g_bg_color = "#10132c";
		 	}
		},500);
		$('.meetingDetail_tab_left li').removeClass("onmeetingDetail");
		$('.meetingDetail_tab_items').css("display","none");
		g_current_page = CRVideo_Getcurrentmainpage(); // 获取当前功能页
		g_meet_mode = CRVideo_GetVideoWallMode(); // 获取视频墙当前分屏模式
		if(g_current_page == 0) {
			$('.meetingDetail_tab_left li').eq(0).addClass("onmeetingDetail");
			$('.meetingDetail_tab_items').eq(0).css("display","block");
			if(g_meet_mode == 2 || g_meet_mode == 0) {
				$('.meetingDetail_radio_bg').removeClass('onradio');
				$('.meetingDetail_radio_bg').eq(0).addClass('onradio');
				modeTwo();
				updateVideo();
			} else if(g_meet_mode == 3) {
				$('.meetingDetail_radio_bg').removeClass('onradio');
				$('.meetingDetail_radio_bg').eq(1).addClass('onradio');
				modeFour();
				updateVideo();
			} else if(g_meet_mode == 5) {
				$('.meetingDetail_radio_bg').removeClass('onradio');
				$('.meetingDetail_radio_bg').eq(2).addClass('onradio');
				modeSix();
				updateVideo();
			}
		} else if(g_current_page == 1) {
			$('.meetingDetail_tab_left li').eq(1).addClass("onmeetingDetail");
			$('.meetingDetail_tab_items').eq(1).css("display","block");
		} 
		// 更新video配置
		updateVideoCfg(g_video_size_type,g_video_fps,g_video_qp,g_wh_rate);
		setMemberList();
	}else {
		if(sdkErr == 803) {
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg("会议号错误！");
			});
			CRVideo_ExitMeeting();
		} else {
			// 进入会议失败 是否重连
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.open({
					type: 0,
					closeBtn: 0,
					area: '400px',
					title : ['提示', 'font-size:14px;'],
					content: '进入会议失败,是否重连',
					btn: ['确定','取消'],
					yes: function(index, layero) {
						layer.close(index);
						$('.loadDiv').css('display','block');
						if(g_meet_id) {
							CRVideo_EnterMeeting(g_meet_id,g_meet_pswd,g_user_id,g_nick_name);
						} else if(g_meet_number) {
							CRVideo_EnterMeeting(g_meet_number,"",g_user_id,g_nick_name);
						}
					},
					btn2: function(index, layero) {
						layer.close(index);
					}
				})
			});
		}
	}
}

// 用户进入会议
CRVideo_UserEnterMeeting.callback = function(usrID) {
	setMemberList();
	// updateVideo();
	//$("#chatsList div").remove();
}

// 离线
CRVideo_LineOff.callback = function(sdkErr) {
	$('.meetingDetail_box').css('display','none');
	layui.use('layer', function() {
		layer.open({
			type : 0,
			closeBtn: 0,
			btnAlign: 'c',
			title : ['提示'],
			content: '会议掉线,是否重新登录',
			btn: ['重新登录','退出'],
			end: function() {
				location.replace(location.href);
			}
		});
	});
}

// 会议掉线
CRVideo_MeetingDropped.callback = function() {
	if(g_meet_id) {
		CRVideo_EnterMeeting(g_meet_id,g_meet_pswd,g_user_id,g_nick_name);
	} else if(g_meet_number) {
		CRVideo_EnterMeeting(g_meet_number,"",g_user_id,g_nick_name);
	}
}

// 摄像头状态改变
CRVideo_VideoStatusChanged.callback = function(userID, oldStatus, newStatus) {
	updateVideo();
	//if(g_is_first_meeting == 0 || userID != g_user_id){
		setMemberList(); // 会议成员列表
		//g_is_first_meeting = 1;
	//}
	var memberList = JSON.parse(CRVideo_GetAllMembers());
	if(memberList != "") {
		if(newStatus == 3) {
			for(var i = 0; i < memberList.length; i++) {
				if(userID == $("#member_flag"+i+"").html()) {
					$("#member_flag"+i+"").next(".icon_video img").attr("src", "image/video_open.png");
					$("#member_flag"+i+"").next(".icon_video").attr("title", "3");
				}
			}
		}else if(newStatus == 2) {
			for(var i = 0; i < memberList.length; i++) {
				if(userID == $("#member_flag"+i+"").html()) {
					$("#member_flag"+i+"").next(".icon_video img").attr("src", "image/video_close.png");
					$("#member_flag"+i+"").next(".icon_video").attr("title", "2");
				}
			}
		}
	}
}

//摄像头设备改变
CRVideo_VideoDevChanged.callback = function(userID) {
	if(g_meeting) {
		updateVideo();
		var vStatus = CRVideo_GetVideoStatus(userID);
		if(vStatus == 0) {
		// 	// 没有可打开的音频设备
			//meetTip("没有可打开的视频设备");
		}else if(vStatus == 3){
			// 如果没有禁音
			CRVideo_OpenVideo(userID);
		}else if(vStatus == 2){
			CRVideo_OpenVideo(userID);
		}
	}
}

// 麦克风
CRVideo_AudioStatusChanged.callback = function(userID, oldStatus, newStatus) {
	setMemberList(); // 会议成员列表
	var memberList = JSON.parse(CRVideo_GetAllMembers());
	if(memberList != undefined) {
		if(newStatus == 3) {
			for(var i = 0; i < memberList.length; i++) {
				if(userID == $("#member_flag"+i+"").html()) {
					$("#member_flag"+i+"").siblings(".icon_mic img").attr("src","image/voice_1.png");
					$("#member_flag"+i+"").siblings(".icon_mic").attr("title","3");
				}
			}
		}else if(newStatus == 2) {
			for(var i = 0; i < memberList.length; i++) {
				if(userID == $("#member_flag"+i+"").html()) {
					$("#member_flag"+i+"").siblings(".icon_mic img").attr("src","image/mic_close1.png");
					$("#member_flag"+i+"").siblings(".icon_mic").attr("title","2");
				}
			}
		}
	}
}

// SDK通知主视频更改
CRVideo_NotifyMainVideoChanged.callback = function() {
	g_main_id = CRVideo_GetMainVideo();
}

// SDK通知功能切换
CRVideo_NotifySwitchToPage.callback = function(mainPage,pageID) {
	$('.meetingDetail_tab_left li').removeClass("onmeetingDetail");
	$('.meetingDetail_tab_items').css("display","none");
	if(mainPage == 0) {
		g_current_page = mainPage;
		$('.meetingDetail_tab_left li').eq(0).addClass("onmeetingDetail");
		$('.meetingDetail_tab_items').eq(0).css("display","block");
		if(g_meet_mode == 2 || g_meet_mode == 0) {
			$('.meetingDetail_radio_bg').removeClass('onradio');
			$('.meetingDetail_radio_bg').eq(0).addClass('onradio');
			modeTwo();
		} else if(g_meet_mode == 3) {
			$('.meetingDetail_radio_bg').removeClass('onradio');
			$('.meetingDetail_radio_bg').eq(1).addClass('onradio');
			modeFour();
		} else if(g_meet_mode == 5) {
			$('.meetingDetail_radio_bg').removeClass('onradio');
			$('.meetingDetail_radio_bg').eq(2).addClass('onradio');
			modeSix();
		}
		updateVideo();
	} else if(mainPage == 1) {
		$('.meetingDetail_tab_left li').eq(1).addClass("onmeetingDetail");
		$('.meetingDetail_tab_items').eq(1).css("display","block");
	} else if(mainPage == 2) {
		$('.meetingDetail_tab_left li').eq(2).addClass("onmeetingDetail");
		$('.meetingDetail_tab_items').eq(2).css("display","block");
	}
}

// 某用户离开了会议
CRVideo_UserLeftMeeting.callback = function(id) {
	layerTip(id+"离开了会议");
	setMemberList();
}

// 开启屏幕共享的响应事件
CRVideo_StartScreenShareRslt.callback = function(sdkErr) {
	if(sdkErr == 0) {
		g_isScreenShare = true;
	}
}
// 通知他人开启了屏幕共享
CRVideo_NotifyScreenShareStarted.callback = function() {
	//g_screenShareObj = document.getElementById("crScreenShareObj");
	//$("#screenShareContainer").append(g_screenShareObj)
	g_isScreenShare = true;
	$("#screenShareContainer").css({"display":"block","left":"0px","top":"0px","width":"848px","height":"480px"});
	g_screenShareObj.width(848);
	g_screenShareObj.height(480);
   	g_screenShareObj.keepAspectRatio(1);
}

// 停止屏幕共享的响应事件
CRVideo_StopScreenShareRslt.callback = function(sdkErr) {
	if(sdkErr == 0) {
		g_isScreenShare = false;
	}
}

// 通知他人停止了屏幕共享
CRVideo_NotifyScreenShareStopped.callback = function() {
	g_isScreenShare = false;
	g_screenShareObj.clear();
	$("#screenShareContainer").css({"display":"none"});
}

// SDK通知视频分屏模式切换
CRVideo_NotifyVideoWallMode.callback = function(model) {
	if(model == 2) {
		g_meet_mode = 2;
		modeTwo();
		updateVideo();
		$('.meetingDetail_radio_bg').removeClass('onradio');
		$('.meetingDetail_radio_bg').eq(0).addClass('onradio');
	} else if(model == 3) {
		g_meet_mode = 3;
		modeFour();
		updateVideo();
		$('.meetingDetail_radio_bg').removeClass('onradio');
		$('.meetingDetail_radio_bg').eq(1).addClass('onradio');
	} else if(model == 5) {
		g_meet_mode = 5;
		modeSix();
		updateVideo();
		$('.meetingDetail_radio_bg').removeClass('onradio');
		$('.meetingDetail_radio_bg').eq(2).addClass('onradio');
	}
}

// 选项
function videoOptions() {
	$('.meetingDetail_box').css('display','none');
	$('.videoSelect_panel').css('display','block');

	$("#size_select").val(g_video_size_type);
	$("#frame_ipt").val(g_video_fps);
	$("input[name='meet_yx'][value="+ g_video_qp+"]").attr("checked",true);
	$("input[name='videoSizeType'][value="+ g_wh_rate+"]").attr("checked",true);

	var videoID = CRVideo_GetDefaultVideo(g_user_id); // 指定用户的默认摄像头 没有摄像头返回0
	var videoList = CRVideo_GetAllVideoInfo(g_user_id); // 用户所有摄像头信息
	var videoListOptStr = '';
	for(var i = 0; i < videoList.length; i++) {
		if(videoID == videoList[i].videoID) {
			videoListOptStr += '<option value="'+videoList[i].videoID+'" selected="selected">'+videoList[i].videoName+'</option>';
		} else {
			videoListOptStr += '<option value="'+videoList[i].videoID+'">'+videoList[i].videoName+'</option>';
		}
	}
	$('#video_select').empty();
	$('#video_select').append(videoListOptStr);

	if(CRVideo_GetEnableMutiVideo(g_user_id) == 1) {
		$("#mutiVideo").attr('checked', true);
	}

	var audioCfg = CRVideo_GetAudioCfg(); // 获取音频参数
	var micArr = CRVideo_GetAudioMicNames(); // 获取系统上的麦克风列表
	var micArrOptStr = "";
	for(var i = 0; i < micArr.length; i++) {
		if(audioCfg.micName == micArr[i]) {
			micArrOptStr += '<option value="'+micArr[i]+'" selected="selected">'+micArr[i]+'</option>';
		} else {
			micArrOptStr += '<option value="'+micArr[i]+'">'+micArr[i]+'</option>';
		}
	}
	$('#mic_select').empty();
	$('#mic_select').append(micArrOptStr);

	var spkerArr =CRVideo_GetAudioSpkNames(); // 获取系统上的扬声器列表
	var spkerArrOptStr = "";
	for(var i = 0; i < spkerArr.length; i++) {
		if(audioCfg.speakerName == spkerArr[i]) {
			spkerArrOptStr += '<option value="'+spkerArr[i]+'" selected="selected">'+spkerArr[i]+'</option>';
		} else {
			spkerArrOptStr += '<option value="'+spkerArr[i]+'">'+spkerArr[i]+'</option>';
		}
	}
	$('#spker_select').empty();
	$('#spker_select').append(spkerArrOptStr);

	// 改变视频质量
	$("input[name='meet_yx'").change(function() {
		$(this).attr("checked","checked");
		$(this).siblings().attr("checked",false);
	});
	// 改变画面比例
	$("input[name='meet_ratio'").change(function() {
		$(this).attr("checked","checked");
		$(this).siblings().attr("checked",false);
	});

	$('#video_select').change(function() {
		CRVideo_SetDefaultVideo(g_user_id, $(this).val());
	});
	$('#mic_select').change(function() {
		var cfg = {};
		cfg.micName = $("#mic_select").val();
		cfg.speakerName = $("#spker_select").val();
		cfg.privAgc = 0;
		cfg.privEC = 0;
		CRVideo_SetAudioCfg(cfg);
	});
	$('#spker_select').change(function() {
		var cfg = {};
		cfg.micName = $("#mic_select").val();
		cfg.speakerName = $("#spker_select").val();
		cfg.privAgc = 0;
		cfg.privEC = 0;
		CRVideo_SetAudioCfg(cfg);
	});
	$("#frame_ipt").on("blur",function() {
	    var v = parseInt($(this).val());
	    if(v > 20) {
	    	$(this).val(20);
	    } else if(v < 6){
	   		$(this).val(6);
	    }
	});
}

// 选项确定
function setSure() {
	$('.videoSelect_panel').css('display', 'none');
	$('.meetingDetail_box').css('display', 'block');
	if($("#mutiVideo").attr("checked") == "checked") {
		g_muti_video = 1;
		CRVideo_SetEnableMutiVideo(g_user_id,g_muti_video);
	} else {
		g_muti_video = 0;
		CRVideo_SetEnableMutiVideo(g_user_id,g_muti_video);
	}
	g_video_size_type = $("#size_select").val(); // 视频尺寸
	g_video_fps =  $("#frame_ipt").val(); // 视频帧率
	g_video_qp = $("input[name='meet_yx']:checked").val(); // 视频质量
	g_wh_rate = $("input[name='meet_ratio']:checked").val(); // 画面比例
	updateVideoCfg(parseInt(g_video_size_type),parseInt(g_video_fps),parseInt(g_video_qp),parseInt(g_wh_rate));
	updateVideo();
}

// 选项取消
function setCancel() {
	$('.videoSelect_panel').css('display', 'none');
	$('.meetingDetail_box').css('display', 'block');
	updateVideo();
}

// 刷新或关闭浏览器
window.onbeforeunload = function() {
	if(g_meeting) {
		CRVideo_ExitMeeting();
		CRVideo_SetDNDStatus(0);
	}
	if(g_is_init){
		CRVideo_Uninit();
	}
	if(g_logining){
		logout();
	}
}
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
}
// 屏蔽右键
window.document.oncontextmenu = function(){ return false; };

// 注销
function logout() {
	CRVideo_Logout();
	setTimeout(function() {
		location.replace(location.href);
	},200);
}

// 设置主视频列表
function setVideoList() {
	$('.video_wall_setmainvideo').empty();
	var memberList = JSON.parse(CRVideo_GetAllMembers());
	var mainListStr = '';
	mainListStr += '<option value="-1">请选择</option>';
	for(var i = 0; i < memberList.length; i++) {
		if(i <= 5) {
			if(g_main_id == memberList[i].userID) {
				mainListStr += '<option value="'+memberList[i].userID+'" selected="selected">'+memberList[i].nickName+'</option>';
			} else {
				mainListStr += '<option value="'+memberList[i].userID+'">'+memberList[i].nickName+'</option>';
			}
		}
	}
	$('.video_wall_setmainvideo').append(mainListStr);

	$('.video_wall_setmainvideo').change(function() {
		if($(this).val() != -1) {
			g_main_id = $(this).val();
			CRVideo_SetMainVideo(g_main_id);
		}
	});
}

// 会议成员列表
function setMemberList() {
	var allMemberList = JSON.parse(CRVideo_GetAllMembers());
	var memberListStr = '';
	for(var i = 0; i < allMemberList.length; i++) {
			memberListStr += '<li><span id="member_flag'+i+'">'+allMemberList[i].nickName+'</span>'
			if(allMemberList[i].videoStatus == 3) {
				memberListStr +='<span title="3" class="icon_video" onclick="videoChange(\''+allMemberList[i].userID+'\',this)"><img src="image/video_open.png"/></span>'
			} else if(allMemberList[i].videoStatus == 2 || allMemberList[i].videoStatus == 4) {
				memberListStr +='<span title="2" class="icon_video" onclick="videoChange(\''+allMemberList[i].userID+'\',this)"><img src="image/video_close.png"/></span>'
			}
			if(allMemberList[i].audioStatus == 3) {
				//允许发言
				memberListStr +='<span title="3" class="icon_mic" onclick="micChange(\''+allMemberList[i].userID+'\',this)"><img src="image/voice_1.png"/></span>'
			}else if(allMemberList[i].audioStatus == 2 || allMemberList[i].audioStatus == 4) {
				memberListStr +='<span title="2" class="icon_mic" onclick="micChange(\''+allMemberList[i].userID+'\',this)"><img src="image/mic_close1.png"/></span>'
			}
			memberListStr +='<span onclick="shotPic(\''+allMemberList[i].userID+'\')" class="icon_shot"></span></li>'
	}
	$('#meetMemberList').empty();
	$('#meetMemberList').append(memberListStr);
}
CRVideo_MicEnergyUpdate.callback = function(userID,oldLevel,newLevel)
{
 	var memberList = $.parseJSON(CRVideo_GetAllMembers());
 	var macImg = "image/voice_1.png";
 	if(newLevel == 0){
 		macImg = "image/voice_1.png";
 	}else if(newLevel == 1 || newLevel == 2){
 		macImg = "image/voice_2.png";
 	}else if(newLevel == 3){
 		macImg = "image/voice_3.png";
 	}else if(newLevel == 4){
 		macImg = "image/voice_4.png";
 	}else if(newLevel == 5){
 		macImg = "image/voice_5.png";
 	};
	if(memberList != "") {
		for(var i = 0; i < memberList.length; i++) {
			if(userID == $("#member_flag"+i+"").html()){
				if($("#member_flag"+i+"").siblings(".icon_mic").attr("title") == "3"){
					// 如果没有禁音
				   $("#member_flag"+i+"").siblings(".icon_mic").children().attr("src",macImg);
				}else{
					$("#member_flag"+i+"").siblings(".icon_mic").children().attr("src","image/mic_close1.png");
				}
			}
		}
	}
 	
 }
// 设置摄像头参数
function updateVideoCfg(sizeType,fps,qp,rate) {
	var cfg = {};
	cfg.sizeType = sizeType;
	var fps = parseInt($("#frame_ipt").val());
	if(fps < 5) {
		fps = 5;
	} else if(fps > 20) {
		fps = 20;
	}
	cfg.fps = fps;
	cfg.maxbps = video_size_arr[sizeType][2]*1000;
	if(qp == 1) {
		cfg.qp_min = 22;
		cfg.qp_max = 36;
	} else if(qp == 0) {
		cfg.qp_min = 22;
		cfg.qp_max = 25;
	}
	cfg.wh_rate = rate;
	CRVideo_SetVideoCfg(cfg);
}

// 更新摄像头
function updateVideo() {
	getVideoList = JSON.parse(CRVideo_GetWatchableVideos());
	if(g_current_page == 0 && $('.video_wall_wrap').css("display") == "block") {
		if(g_meet_mode == 2 || g_meet_mode == 0) {
			if(g_meet_video !== undefined && g_meet_video !== "") {
				g_meet_video.clear();
				g_meet_video.setVideo("",0);
			}
			if(g_meet_video1 !== undefined && g_meet_video1 !== "") {
				g_meet_video1.clear();
				g_meet_video1.setVideo("",0);
			}
			if(getVideoList.length == 1) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
			} else if(getVideoList.length >= 2) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
				g_meet_video1.setVideo(getVideoList[1].userID,getVideoList[1].videoID);
			}
		} else if(g_meet_mode == 3) {
			if(g_meet_video !== undefined && g_meet_video !== "") {
				g_meet_video.clear();
				g_meet_video.setVideo("",0);
			}
			if(g_meet_video1 !== undefined && g_meet_video1 !== "") {
				g_meet_video1.clear();
				g_meet_video1.setVideo("",0);
			}
			if(g_meet_video2 !== undefined && g_meet_video2 !== "") {
				g_meet_video2.clear();
				g_meet_video2.setVideo("",0);
			}
			if(g_meet_video3 !== undefined && g_meet_video3 !== "") {
				g_meet_video3.clear();
				g_meet_video3.setVideo("",0);
			}
			if(getVideoList.length == 1) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
			} else if(getVideoList.length == 2) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
				g_meet_video1.setVideo(getVideoList[1].userID,getVideoList[1].videoID);
			} else if(getVideoList.length == 3) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
				g_meet_video1.setVideo(getVideoList[1].userID,getVideoList[1].videoID);
				g_meet_video2.setVideo(getVideoList[2].userID,getVideoList[2].videoID);
			} else if(getVideoList.length >= 4) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
				g_meet_video1.setVideo(getVideoList[1].userID,getVideoList[1].videoID);
				g_meet_video2.setVideo(getVideoList[2].userID,getVideoList[2].videoID);
				g_meet_video3.setVideo(getVideoList[3].userID,getVideoList[3].videoID);
			}
		} else if(g_meet_mode == 5) {
			if(g_meet_video !== undefined && g_meet_video !== "") {
				g_meet_video.clear();
				g_meet_video.setVideo("",0);
			}
			if(g_meet_video1 !== undefined && g_meet_video1 !== "") {
				g_meet_video1.clear();
				g_meet_video1.setVideo("",0);
			}
			if(g_meet_video2 !== undefined && g_meet_video2 !== "") {
				g_meet_video2.clear();
				g_meet_video2.setVideo("",0);
			}
			if(g_meet_video3 !== undefined && g_meet_video3 !== "") {
				g_meet_video3.clear();
				g_meet_video3.setVideo("",0);
			}
			if(g_meet_video4 !== undefined && g_meet_video4 !== "") {
				g_meet_video4.clear();
				g_meet_video4.setVideo("",0);
			}
			if(g_meet_video5 !== undefined && g_meet_video5 !== "") {
				g_meet_video5.clear();
				g_meet_video5.setVideo("",0);
			}
			if(getVideoList.length == 1) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
			} else if(getVideoList.length == 2) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
				g_meet_video1.setVideo(getVideoList[1].userID,getVideoList[1].videoID);
			} else if(getVideoList.length == 3) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
				g_meet_video1.setVideo(getVideoList[1].userID,getVideoList[1].videoID);
				g_meet_video2.setVideo(getVideoList[2].userID,getVideoList[2].videoID);
			} else if(getVideoList.length == 4) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
				g_meet_video1.setVideo(getVideoList[1].userID,getVideoList[1].videoID);
				g_meet_video2.setVideo(getVideoList[2].userID,getVideoList[2].videoID);
				g_meet_video3.setVideo(getVideoList[3].userID,getVideoList[3].videoID);
			} else if(getVideoList.length == 5) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
				g_meet_video1.setVideo(getVideoList[1].userID,getVideoList[1].videoID);
				g_meet_video2.setVideo(getVideoList[2].userID,getVideoList[2].videoID);
				g_meet_video3.setVideo(getVideoList[3].userID,getVideoList[3].videoID);
				g_meet_video4.setVideo(getVideoList[4].userID,getVideoList[4].videoID);
			} else if(getVideoList.length >= 6) {
				g_meet_video.setVideo(getVideoList[0].userID,getVideoList[0].videoID);
				g_meet_video1.setVideo(getVideoList[1].userID,getVideoList[1].videoID);
				g_meet_video2.setVideo(getVideoList[2].userID,getVideoList[2].videoID);
				g_meet_video3.setVideo(getVideoList[3].userID,getVideoList[3].videoID);
				g_meet_video4.setVideo(getVideoList[4].userID,getVideoList[4].videoID);
				g_meet_video5.setVideo(getVideoList[5].userID,getVideoList[5].videoID);
			}
		}
	}
}

// 提示框
function popTip(msg) {
	layui.use('layer', function(){
		var index = layer.open({
			type: 0,
		    skin: 'layui-layer-lan',
		    title: '提示',
		    closeBtn: 0,
		    shadeClose: true,
			content: msg,
			yes: function() {
				layer.close(index);
			}
		});
	});
}

// 视频墙提示框
function meetTip(msg) {
	$('.meetingDetail_box').css('display','none');
	layui.use('layer', function(){
		var layer = layui.layer;
		layer.open({
			type: 0,
			title: ['提示', 'font-size:14px;'],
			skin: 'layui-layer-rim',
			content: msg,
			end: function() {
				$('.meetingDetail_box').css('display','block');
				updateVideo();
			}
		});
	});
}

// 弹窗提示
function layerTip(msg) {
	$('.meetingDetail_box').css("display", "none");
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.msg(msg, {time: 1000}, function() {
			$('.meetingDetail_box').css("display", "block");
			updateVideo();
		});
	});
}

function choseShareTY(num) {
	if(num == "0"){
		$("input[name='chooseScreenType']").eq(1).attr("checked",false);
		$("input[name='chooseScreenType']").eq(0).attr("checked",true);
	}else if(num == "1"){
		$("input[name='chooseScreenType']").eq(0).attr("checked",false);
		$("input[name='chooseScreenType']").eq(1).attr("checked",true);
	}
}

function choseShareFR(num) {
	if(num == "0") {
		$("input[name='chooseScreenFirst']").eq(1).attr("checked",false);
		$("input[name='chooseScreenFirst']").eq(0).attr("checked",true);
	} else if(num == "1") {
		$("input[name='chooseScreenFirst']").eq(0).attr("checked",false);
		$("input[name='chooseScreenFirst']").eq(1).attr("checked",true);
	}
}

// 设置视频墙分屏模式
function setVideoMode(mode) {
	if(mode == 2 || mode == 0) {
		$('.meetingDetail_radio_bg').removeClass('onradio');
		$('.meetingDetail_radio_bg').eq(0).addClass('onradio');
		modeTwo();
	} else if(mode == 3) {
		$('.meetingDetail_radio_bg').removeClass('onradio');
		$('.meetingDetail_radio_bg').eq(1).addClass('onradio');
		modeFour();
	} else if(mode == 5) {
		$('.meetingDetail_radio_bg').removeClass('onradio');
		$('.meetingDetail_radio_bg').eq(2).addClass('onradio');
		modeSix();
	}
}

// 二分屏
function modeTwo() {
	$('.videoContainer2').css('display', 'none');
	$('.videoContainer3').css('display', 'none');
	$('.videoContainer4').css('display', 'none');
	$('.videoContainer5').css('display', 'none');
	$('.videoContainer').css({"display":"block","left":"6px","top":"162px","width":"480px","height":"270px"});
	g_meet_video.width(480);
	g_meet_video.height(270);
	$('.videoContainer1').css({"display":"block","left":"494px","top":"162px","width":"480px","height":"270px"});
	g_meet_video1.width(480);
	g_meet_video1.height(270);
	// updateVideo();
}

// 四分屏
function modeFour() {
	$('.videoContainer4').css('display', 'none');
	$('.videoContainer5').css('display', 'none');
	$('.videoContainer').css({"display":"block","left":"6px","top":"26px","width":"480px","height":"270px"});
	g_meet_video.width(480);
	g_meet_video.height(270);
	$('.videoContainer1').css({"display":"block","left":"494px","top":"26px","width":"480px","height":"270px"});
	g_meet_video1.width(480);
	g_meet_video1.height(270);
	$('.videoContainer2').css({"display":"block","left":"6px","top":"304px","width":"480px","height":"270px"});
	g_meet_video2.width(480);
	g_meet_video2.height(270);
	$('.videoContainer3').css({"display":"block","left":"494px","top":"304px","width":"480px","height":"270px"});
	g_meet_video3.width(480);
	g_meet_video3.height(270);
	// updateVideo();
}

// 六分屏
function modeSix() {
	$('.videoContainer').css({"display":"block","left":"6px","top":"26px","width":"640px","height":"360px"});
	g_meet_video.width(640);
	g_meet_video.height(360);
	$('.videoContainer1').css({"display":"block","left":"654px","top":"26px","width":"320px","height":"180px"});
	g_meet_video1.width(320);
	g_meet_video1.height(180);
	$('.videoContainer2').css({"display":"block","left":"654px","top":"210px","width":"320px","height":"180px"});
	g_meet_video2.width(320);
	g_meet_video2.height(180);
	$('.videoContainer3').css({"display":"block","left":"6px","top":"394px","width":"320px","height":"180px"});
	g_meet_video3.width(320);
	g_meet_video3.height(180);
	$('.videoContainer4').css({"display":"block","left":"330px","top":"394px","width":"320px","height":"180px"});
	g_meet_video4.width(320);
	g_meet_video4.height(180);
	$('.videoContainer5').css({"display":"block","left":"654px","top":"394px","width":"320px","height":"180px"});
	g_meet_video5.width(320);
	g_meet_video5.height(180);
	// updateVideo();
}

// 打开、关闭摄像头
function videoChange(val,_this) {
	var vStatus = CRVideo_GetVideoStatus(val);
	if(g_master == 1) {
		if(vStatus == 0 || vStatus == 1) {
		// 	// 没有可打开的音频设备
			//meetTip("没有可打开的视频设备");
		}else if(vStatus == 3){
			// 如果没有禁音
			CRVideo_CloseVideo(val);
		    $(_this).children().attr("src", "image/video_close.png");
		}else if(vStatus == 2){
			CRVideo_OpenVideo(val);
			$(_this).children().attr("src", "image/video_open.png");
		}
		
	} else if(g_master == 0 && val == g_me_user_id) {
		if(vStatus == 0 || vStatus == 1) {
			//meetTip("没有可打开的视频设备");
		}else if(vStatus == 3){
			// 如果没有禁音
			CRVideo_CloseVideo(val);
		    $(_this).children().attr("src", "image/video_close.png");
		}else if(vStatus == 2){
			CRVideo_OpenVideo(val);
			$(_this).children().attr("src", "image/video_open.png");

		}
	}
}

// 打开、关闭麦克风
function micChange(val,_this) {
	var aStatus = CRVideo_GetAudioStatus(val);
	if(g_master == 1) {
		if(aStatus == 0 || aStatus == 1) {
		// 	// 没有可打开的音频设备
			meetTip("没有可打开的音频设备");
		}else if(aStatus == 3){
			// 如果没有禁音
			CRVideo_CloseMic(val);
		    $(_this).children().attr("src", "image/mic_close1.png");
		}else if(aStatus == 2){
			CRVideo_OpenMic(val);
			$(_this).children().attr("src", "image/voice_1.png");
		}
	} else if(g_master == 0 && val == g_me_user_id) {
		if(aStatus == 0 || aStatus == 1) {
		// 	// 没有可打开的音频设备
			meetTip("没有可打开的音频设备");
		}else if(aStatus == 3){
			// 如果没有禁音
			CRVideo_CloseMic(val);
		    $(_this).children().attr("src", "image/mic_close1.png");
		}else if(aStatus == 2){
			CRVideo_OpenMic(val);
			$(_this).children().attr("src", "image/voice_1.png");

		}
	}
}

// 截图
function shotPic(val) {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var picName = year + "-" + month + "-" + day + "-" + hour+'-' + minute + '-' + second+".png";

	if(val == g_meet_video._usrID) {
		if(g_meet_video.isPicEmpty() == 0) {
			g_meet_video.savePic(g_location_dir+"img/"+picName);
			meetTip("截图位置("+g_location_dir+"img/"+picName+")");
		}
	} else if(val == g_meet_video1._usrID) {
		if(g_meet_video1.isPicEmpty() == 0) {
			g_meet_video1.savePic(g_location_dir+"img/"+picName);
			meetTip("截图位置("+g_location_dir+"img/"+picName+")");
		}
	} else if(val == g_meet_video2._usrID) {
		if(g_meet_video2.isPicEmpty() == 0) {
			g_meet_video2.savePic(g_location_dir+"img/"+picName);
			meetTip("截图位置("+g_location_dir+"img/"+picName+")");
		}
	} else if(val == g_meet_video3._usrID) {
		if(g_meet_video3.isPicEmpty() == 0) {
			g_meet_video3.savePic(g_location_dir+"img/"+picName);
			meetTip("截图位置("+g_location_dir+"img/"+picName+")");
		}
	} else if(val == g_meet_video4._usrID) {
		if(g_meet_video4.isPicEmpty() == 0) {
			g_meet_video4.savePic(g_location_dir+"img/"+picName);
			meetTip("截图位置("+g_location_dir+"img/"+picName+")");
		}
	} else if(val == g_meet_video5._usrID) {
		if(g_meet_video5.isPicEmpty() == 0) {
			g_meet_video5.savePic(g_location_dir+"img/"+picName);
			meetTip("截图位置("+g_location_dir+"img/"+picName+")");
		}
	} else {
		layerTip("没有可保存的图像");
	}
}

/**
 * 文件中转站
 */
// SDK通知获取网盘容量信息结果
CRVideo_GetNetDiskSummaryRslt.callback = function(diskLimit,diskUsed) {
	var val = ((diskLimit - diskUsed)/1024).toFixed(1)
	$("#freeSpace").html(val);
}
// SDK通知获取网盘文件列表
CRVideo_GetNetDiskFileListRslt.callback = function(fileList) {
	var fileListStr = '';
	for(var i = 0; i < fileList.length; i++) {
		fileListStr += '<tr>'
                    +        '<td width="35%">ucXXXXXxxxx.exe</td>'
                    +        '<td width="10%">lisa</td>'
                    +        '<td width="20%">2017-10-18 14:56:45</td>'
                    +        '<td width="10%">49,928KB</td>'
                    +        '<td class="file_station_td" width="25%"><span class="b1">下载</span><span class="b1">删除</span></td>'
                    +    '</tr>'
	}
	$("#fileStationList").html(fileListStr);
}
// 上传本地文件至中转站
function getImgURL(dFile) {

	var fileName = "";
	if(dFile.files && dFile.files[0]) {
        var videoFile = dFile.files[0];
        fileName = videoFile.name;
        var fileID = CRVideo_MakeNetDiskFileID(0,fileName);
        CRVideo_Uploadnetdiskfile(fileID,$(dFile).val());
        var fileUploadStr = '';
        	fileUploadStr += '<tr>'
	                            +'<td width="30%">'+videoFile.name+'</td>'
	                            +'<td width="20%">'+videoFile.size+'KB</td>'
	                            +'<td width="30%"><span>17%</span></td>'
	                            +'<td class="file_upload_td" width="20%">'
	                            +	'<span class="b1">暂停</span>'
	                           	+ 	'<span class="b1">取消</span>'
	                            +'</td>'
	                        +'</tr>';
        $("#fileUploadList").append(fileUploadStr);
    }
}

CRVideo_NotifyNetDiskTransforProgress.callback = function(fileID,percent,isUpload) {
	if(isUpload == 1) {
		
	} else if(isUpload == 0) {

	}
}

