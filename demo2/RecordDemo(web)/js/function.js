//弹窗封装
//alert({
//  title:'提示',
//  content:'我是弹窗',
//  noText:'取消',
//  yesText:'确定'
//})
var alert = function(param){
	
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

//**********************************************************************

//登陆的方法

function login(){
	//初始化
	var init = CRVideo_Init("CLOUDROOM",g_location_dir)
	//是否初始化
	g_init = true;
	if(init == CRVideo_WEB_OCX_NOTINSTALLED){
            // 弹出层封装
            alert({
            	  title:'提示',
				  content:'ocx未安装',
				  noText:'取消',
				  yesText:'确定'
            	});
        }else if(init == CRVideo_OCX_VERSION_NOTUPPORTED){
        	alert({
            	  title:'提示',
				  content:'不支持的浏览器',
				  noText:'取消',
				  yesText:'确定'
            });
        }else if(init == CRVideo_WEB_BROWER_NOTUPPORTED){
        	alert({
            	  title:'提示',
				  content:'不支持的插件版本',
				  noText:'取消',
				  yesText:'确定'
            });
        }else if(init != 0){
        	alert({
            	  title:'提示',
				  content:"CRVideo_init sdkErr"+"出错了"+init,
				  noText:'取消',
				  yesText:'确定'
           });
	
        }
     //登陆状态
    if(g_logining ==false){
    	var g_serverName = $("#server_name").val()
           
            if(g_serverName && g_serverName != ""){
            //    console.log(444)
                cr_account= $("#login_cpyname").val() ||"demo@cloudroom.com";
                //md5加密
                cr_psw = md5($("#login_psd").val()) || "e10adc3949ba59abbe56e057f20f883e";
                //昵称
                g_nickname = uuid(32,16)
                //自定义账号
                g_userID = uuid(32,16)
                //设置服务器地址
                CRVideo_SetServerAddr(g_serverName)
                //登录     操作成功则回调CRVideo_LoginSuccess,失败则回调CRVideo_LoginFail
                CRVideo_Login(cr_account, cr_psw, g_nickname, g_userID, "")
                //修改登录状态
                g_logining = true;
		    }else{
		    	$("#login_bnt").attr({"disabled":false}).css({background:"#eb5405"})
		    }

	}
    
}


//*******************************video配置***********************************************
function updateVideoCfg(sizeType,fps,qp){
	var cfg = {};
	cfg.sizeType = sizeType;
	fps = parseInt($("frame_input").val());
	if(fps<5){
		fps = 5;
	}else if(fps>20){
		fps = 20;
	}
	cfg.fps = fps;
	maxbps = video_size_arr[sizeType][2]*1000;
	if(qp == 1){
            cfg.qp_min = 22
            cfg.qp_max = 36
        }else if(qp == 0){
            cfg.qp_min = 22
            cfg.qp_max = 25
        }
    // 系统视频参数设置 
        CRVideo_SetVideoCfg(cfg);
        
    // 图像质量参数 
        CRVideo_SetMediacfg(cfg);
}
//*******************************进入房间***********************************************
function enterRoom(){
	console.log(111)
	$(".menu_box").css("display","none");
	$(".login_box").css("display","none");
	$(".videoPage").css("display","block");
	
}

//*******************************点击了客户信息 基础信息*******************************
$("#showBaseinfo").click(function(){
	showBaseinfo()
});

function showBaseinfo(){
	$("#baseinfoTab").attr("class", "on_tab1"); 
	$("#IdentityATab").removeClass(); 
	$("#IdentityBTab").removeClass(); 
	$("#gereninfo").css("display","block")
	$("#sfzzm").css("display","none")
	$("#sfzfm").css("display","none")
};
//*******************************点击了客户信息 ID正面*******************************
$("#showIdentityA").click(function(){
	showIdentityA()
});

function showIdentityA(){
	$("#baseinfoTab").removeClass(); 
	$("#IdentityATab").attr("class", "on_tab1"); 
	$("#IdentityBTab").removeClass(); 
	$("#gereninfo").css("display","none")
	$("#sfzzm").css("display","block")
	$("#sfzfm").css("display","none")
};


//*******************************点击了客户信息 ID反面*******************************
$("#showIdentityB").click(function(){
	showIdentityB()
});

function showIdentityB(){
	$("#baseinfoTab").removeClass(); 
	$("#IdentityATab").removeClass(); 
	$("#IdentityBTab").attr("class", "on_tab1");
	$("#gereninfo").css("display","none")
	$("#sfzzm").css("display","none")
	$("#sfzfm").css("display","block")
};
//*******************************点击了playImg,suspendImg,stopImg*******************************
$("#playImg").click(function(){
	$("#playImg").css("display","none");
	$("#suspendImg").css("display","block");
	$("#stopImg").css("display","block");
})

$("#suspendImg").click(function(){
	$("#playImg").css("display","block");
	$("#suspendImg").css("display","none");
	$("#stopImg").css("display","block");
})

$("#stopImg").click(function(){
	$("#playImg").css("display","block");
	$("#suspendImg").css("display","none");
	$("#stopImg").css("display","none");
})
//*******************************点击了设置*******************************
$("#setUp").click(function(){
	$("#box").css({"width":$(document).width(),"height":$(document).height(),"display":"block"})
	$("#full_page_div2").css({"display":"block"});
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
})

//*******************************录制,视频设置*******************************
$("#tab2").click(function(){
	$("#full_page_msg2").css({"display":"block"})
	$("#full_page_div4").css({"display":"none"});
	$("#tab2").addClass("ontab");
	$("#tab1").removeClass("ontab");
})

$("#tab1").click(function(){
	$("#full_page_msg2").css({"display":"none"})
	$("#full_page_div4").css({"display":"block"});
	$("#tab1").addClass("ontab");
	$("#tab2").removeClass("ontab");
})

//*******************************点击了-，X，取消*******************************
$("#closepage").click(function(){
	$("#box").css({"display":"none"})
	$("#full_page_div2").css({"display":"none"});
	$("#list_container").css({"display":"none"});
	layoutB()
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
})
$("#closepage1").click(function(){
	$("#box").css({"display":"none"})
	$("#list_container").css({"display":"none"});
	layoutB()
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
})


$("#minpage").click(function(){
	$("#box").css({"display":"none"})
	$("#full_page_div2").css({"display":"none"});
	layoutB()
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
})

$(".full_page_cancle2").click(function(){
	$("#box").css({"display":"none"})
	$("#full_page_div2").css({"display":"none"});
	layoutB()
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
})

//*******************************确定****************************
$(".full_page_submit2").click(function(){ //还有其他操作
	$("#box").css({"display":"none"})
	$("#full_page_div2").css({"display":"none"});
	layoutB()
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
})

//**************************点击录制文件*************************************
$("#recordMrg").click(function(){
	$("#box").css({"width":$(document).width(),"height":$(document).height(),"display":"block"})
	$("#list_container").css({"display":"block"});
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
})
//*************************点击单摄像头***************************************
$("#singleCamera").click(function(){
	flag1 = 0;
	$("#singleCamera").attr("disabled","disabled")
	$("#doubleCamera").attr("disabled",false)
	$(".videoPage_right_view_box").empty();
	flag++;
	if(flag == 1){
		layoutA()
	}
})
//**************************创建单摄像头************************************************
function layoutA(){
		g_videoAObj = CRVideo_CreatVideoObj();
		g_videoAObj.id("videoAObj");
		g_videoAObj.width(534);
		g_videoAObj.height(300);
		$(".videoPage_right_view_box").append(g_videoAObj.handler());
	    g_videoAObj.hide();
	    g_videoAObj.left(124);
		g_videoAObj.top(10);
		
		updateVideo()
		
}
//*************************点击双摄像头***************************************
$("#doubleCamera").click(function(){
	flag =0;
	$("#singleCamera").attr("disabled",false)
	$("#doubleCamera").attr("disabled","disabled")
	$(".videoPage_right_view_box").empty();
	flag1++
	if(flag1 == 1){
		layoutB()
	}
})

//**************************创建双摄像头************************************************
function layoutB(){
		g_videoAObj = CRVideo_CreatVideoObj();
		g_videoAObj.id("videoAObj");
		g_videoAObj.width(375);
		g_videoAObj.height(210);
		$(".videoPage_right_view_box").append(g_videoAObj.handler());
	    g_videoAObj.hide();
	    g_videoAObj.left(0);
		g_videoAObj.top(40);
		
		g_videoBObj = CRVideo_CreatVideoObj();
		g_videoBObj.id("videoBObj");
		g_videoBObj.width(375);
		g_videoBObj.height(210);
		$(".videoPage_right_view_box").append(g_videoBObj.handler());
	    g_videoBObj.hide();
	    g_videoBObj.left(375);
		g_videoBObj.top(40);
		
		updateVideo()
		
}

//*************************点击开始录制***************************************
$("#startRecord").click(function(){
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
})
//*************************点击回放***************************************
$("#playback").click(function(){
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	alertLayer("还没录制")
})
//*************************点击上传***************************************
$("#upload").click(function(){
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	$("#box").css({"width":$(document).width(),"height":$(document).height(),"display":"block"})
	$("#full_page_div").css("display","block");
})

$("#name_del1Img,.full_page_cancle").click(function(){
	
	$("#box").css({"display":"none"});
	$("#full_page_div").css("display","none");
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	layoutB()
})
//*****************************弹层（还没录制）********************************************

function alertLayer(msg){
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
    $(".alert_label_detail").text(msg);
    $("#box").css({"width":$(document).width(),"height":$(document).height(),"display":"block"})
    $(".alert_palyer").css("display","block");
    
}

//  点击弹出层的确定 x
$("#alert_name_delImg").click(function(){
   $("#box").css({"display":"none"});
	$("#alert_palyer").css("display","none");
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	layoutB()
})
$(".alertr_page_commit").click(function(){
   $("#box").css({"display":"none"});
	$("#alert_palyer").css("display","none");
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	layoutB()
})

 /** * **************************更新摄像头**********************************/
function updateVideo(){
        //获取用户所有摄像头信息 还会列表
	var devices = CRVideo_GetAllVideoInfo(g_userID);
	
	try{
	
	    if(g_videoAObj && devices.length > 0){
	        //g_videoAObj里面的内置方法setVideo（usrID,videoID）,setVisibleNickName(value);
	       
	        g_videoAObj.setVideo(g_userID,devices[0]["videoID"]);
	        g_videoAObj.setVisibleNickName(false);
	    }
	    if(g_videoBObj && devices.length > 1){
	        g_videoBObj.setVideo(g_userID,devices[1]["videoID"]);
	                g_videoBObj.setVisibleNickName(false);
	            }
	
	        }catch(e){ }
       
}

