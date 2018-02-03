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
	g_video_filename_list = CRVideo_GetAllFilesInMediaPath();
	$(".videoPage_right_view_box").empty();
	$(".menu_box").css("display","none");
	$(".login_box").css("display","none");
	$(".videoPage").css("display","block");
	//主播放容器
	g_mediaObj = CRVideo_CreatMediaObj();
	g_mediaObj.id("mediaObj");
	$(".videoPage_right_view_box").append(g_mediaObj.handler());
	g_mediaObj.keepAspectRatio(true);
	//A视频
	g_videoAObj = CRVideo_CreatVideoObj();
    g_videoAObj.id("videoAObj")
    $(".videoPage_right_view_box").append(g_videoAObj.handler())
	//B视频
	g_videoBObj = CRVideo_CreatVideoObj();
    g_videoBObj.id("videoBObj")
    $(".videoPage_right_view_box").append(g_videoBObj.handler())
    
    //吊样式
    layoutA()
    updateVideo()
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
//**************************playImg方法************************************************
function playImg(){
	
	
    if(g_single_video == true){
	

    	g_mediaObj.width(375);
		g_mediaObj.height(210);
		g_mediaObj.hide();
		g_mediaObj.left(0);
		g_mediaObj.top(40);
		
		g_videoAObj.width(375);
		g_videoAObj.height(210);
		g_videoAObj.hide();
		g_videoAObj.left(375);
		g_videoAObj.top(40);
		updateVideo();
    }else{
    	
    	g_mediaObj.width(500);
		g_mediaObj.height(280);
		g_mediaObj.hide();
		g_mediaObj.left(0);
		g_mediaObj.top(0);
		
		g_videoAObj.width(250);
		g_videoAObj.height(140);
		g_videoAObj.hide();
		g_videoAObj.left(500);
		g_videoAObj.top(0);
		
		g_videoBObj.width(250);
		g_videoBObj.height(140);
		g_videoBObj.hide();
		g_videoBObj.left(500);
		g_videoBObj.top(140);
		updateVideo();
    }

	
}
//*******************************点击了playImg,suspendImg,playImg1,stopImg*******************************
$("#playImg").click(function(){
	$("#playImg").css("display","none");
	$("#suspendImg").css("display","block");
	$("#playImg1").css("display","none");
	$("#stopImg").css("display","block");
	$("#singleCamera").attr("disabled",false);
	$("#doubleCamera").attr("disabled",false);
	g_playbacking = false;
	playImg()
	 
   // 开始播放
	CRVideo_StartPlayMedia(g_video_filename_list[0])
})

$("#suspendImg").click(function(){
	$("#playImg").css("display","none");
	$("#suspendImg").css("display","none");
	$("#playImg1").css("display","block");
	$("#stopImg").css("display","block");
	//暂停播放媒体
	CRVideo_PausePlayMedia(true);
})

$("#playImg1").click(function(){
	$("#playImg").css("display","none");
	$("#suspendImg").css("display","block");
	$("#playImg1").css("display","none");
	$("#stopImg").css("display","block");
	//恢复影音播放
	CRVideo_PausePlayMedia(false);
})

$("#stopImg").click(function(){
	layoutA();
	$("#playImg").css("display","block");
	$("#suspendImg").css("display","none");
	$("#playImg1").css("display","none");
	$("#stopImg").css("display","none");
	g_playbacking = false;
	//停止媒体播放
	CRVideo_StopPlayMedia();
	

})
//*******************************点击了设置*******************************
$("#setUp").click(function(){
	$(".videoPage_right_view_box").empty();
	$("#box").css({"width":$(document).width(),"height":$(document).height(),"display":"block"})
	$("#full_page_div2").css({"display":"block"});
	
	
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
//X
$("#closepage").click(function(){
	$("#box").css({"display":"none"})
	$("#full_page_div2").css({"display":"none"});
	$("#list_container").css({"display":"none"});
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	enterRoom()
})
//
$("#closepage1").click(function(){
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	$("#box").css({"display":"none"})
	$("#list_container").css({"display":"none"});
	enterRoom()
})

// - 
$("#minpage").click(function(){
	$("#box").css({"display":"none"})
	$("#full_page_div2").css({"display":"none"});
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	enterRoom()
})

//取消
$(".full_page_cancle2").click(function(){
	$("#box").css({"display":"none"})
	$("#full_page_div2").css({"display":"none"});
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	enterRoom()
})

//*******************************确定****************************
$(".full_page_submit2").click(function(){ //还有其他操作
	$("#box").css({"display":"none"})
	$("#full_page_div2").css({"display":"none"});
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	enterRoom()
})

//**************************点击录制文件管理*************************************
$("#recordMrg").click(function(){
	$(".videoPage_right_view_box").empty();
	$("#box").css({"width":$(document).width(),"height":$(document).height(),"display":"block"})
	$("#list_container").css({"display":"block"});
	
	g_getAll_videfile_list = CRVideo_GetAllRecordFiles();    
    getAllVideoList(g_getAll_videfile_list);
	updateVideo();
})
//*************************点击单摄像头***************************************
$("#singleCamera").click(function(){
	    
	    $("#singleCamera").attr("disabled","disabled")
		$("#doubleCamera").attr("disabled",false)
				if(g_single_video){
					return;
				};
	            g_single_video = true;
	            if(layout == 'layoutA') {
	                layoutA();
	            }
	            else if(layout == 'layoutB') {
	                layoutB();
	            }
	            // 跟新视频
	            updateVideo();
})
//**************************创建单摄像头************************************************
function layoutA(){
	    
	    layout ="layoutA";
	    g_mediaObj.show();
		if(g_single_video){
			//主
			g_mediaObj.show();
			//a
			g_videoAObj.width(534);
			g_videoAObj.height(300);
		    g_videoAObj.hide();
		    g_videoAObj.left(124);
			g_videoAObj.top(10)
			//b
			g_videoBObj.show();
		}else{
			//主
			g_mediaObj.show();
			//a
			g_videoAObj.width(375);
			g_videoAObj.height(210);
		    g_videoAObj.hide();
		    g_videoAObj.left(0);
			g_videoAObj.top(40)
			//b
			g_videoBObj.width(375);
			g_videoBObj.height(210);
		    g_videoBObj.hide();
		    g_videoBObj.left(375);
			g_videoBObj.top(40);
		}
		if(g_startRecord){// 如果是在回放状态
                //录音内容
                var recContents = [];
                //录制视频的高度初始值  录制视频的宽度初始值
                if(g_recordHeight*16/9 > g_recordWidth){
                    var sWidth = g_recordWidth;
                    var sHeight = g_recordWidth/16*9;
                    var sX = 0;
                    var sY = (g_recordHeight-sHeight)/2;
                }else{
                    var sWidth = g_recordHeight*16/9;
                    var sHeight = g_recordHeight;
                    var sX = (g_recordWidth-sWidth)/2;
                    var sY = 0;
                }
                var videoAContent = {};// A视频内容
                var videoAStampContent = {};//A视频内容的邮票
                var videoAlogoContent = {};//A视频标志内容
                var videoBContent = {};// B视频内容
                var videoBStampContent = {};//B视频内容的邮票
                var videoBlogoContent = {};//B视频标志内容
                 
                if(g_single_video){

                    videoAContent["type"] = 0; 
                    videoAContent["left"] = sX;
                    videoAContent["top"] = sY;  
                    videoAContent["width"] = sWidth; 
                    videoAContent["height"] = sHeight; 
                    videoAContent["param"] = {"camid":g_userID+"."+g_videoAObj.getVideoID()};
                    recContents.push(videoAContent);
                }else{
                    //A:
                    videoAContent["type"] = 0;
                    videoAContent["left"] = sX;
                    videoAContent["top"] = sY+sHeight/4;
                    videoAContent["width"] = sWidth/2;
                    videoAContent["height"] = sHeight/2;
                    videoAContent["param"] = {"camid":g_userID+"."+g_videoAObj.getVideoID()};
                    recContents.push(videoAContent);
                   
                    //B:
                    videoBContent["type"] = 0;
                    videoBContent["left"] = sX+sWidth/2;
                    videoBContent["top"] = sY+sHeight/4 ;
                    videoBContent["width"] = sWidth/2;
                    videoBContent["height"] = sHeight/2;
                    videoBContent["parma"] = {"camid":g_userID+"."+g_videoBObj.getVideoID()};
                    recContents.push(videoBContent);
                    // B
                    videoBlogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC;//==1
                    videoBlogoContent["left"] = videoBContent["left"] +3;
                    videoBlogoContent["top"] = videoBContent["top"] +3;
                    videoBlogoContent["width"] = 32;
                    videoBlogoContent["height"] = 32;
                    videoBlogoContent["param"] = {"resourceid":g_logo_id}; //资源独一无二
                    recContents.push(videoBlogoContent);
                    // B
                    videoBStampContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;//==4
                    videoBStampContent["left"] = videoBContent["left"] +35;
                    videoBStampContent["top"] = videoBContent["top"] +3;
                    videoBStampContent["width"] = 175;
                    videoBStampContent["height"] = 32
                    recContents.push(videoBStampContent);
                }    
                // A
                videoAlogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC; //==1
				videoAlogoContent["left"] = videoAContent["left"]+3;
				videoAlogoContent["top"] = videoAContent["top"]+3;
				videoAlogoContent["width"] = 32;
				videoAlogoContent["height"] = 32;
				videoAlogoContent["param"] = {"resourceid":g_logo_id};
				recContents.push(videoAlogoContent);
				// A
				videoAStampContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;// == 4
				videoAStampContent["left"] = videoAContent["left"]+35;
				videoAStampContent["top"] = videoAContent["top"]+3;
				videoAStampContent["width"] = 175;
				videoAStampContent["height"] = 32;
                recContents.push(videoAStampContent);

                // 设置录制视频信息
                CRVideo_SetRecordVideos(recContents)
            }
		
		
		
		
}
//*************************点击双摄像头***************************************
$("#doubleCamera").click(function(){

	$("#singleCamera").attr("disabled",false)
	$("#doubleCamera").attr("disabled","disabled")
			if(!g_single_video){
				return
			};
                
            g_single_video = false
            if(layout == 'layoutA')
                layoutA();
            else if(layout == 'layoutB')
                layoutB();
                //跟新视频
            updateVideo();
})

//**************************创建双摄像头************************************************
function layoutB(){
	
	    layout = "layoutB";
	    if(g_single_video){
	    	//主
	    	g_mediaObj.width(375);
            g_mediaObj.height(210);
            g_mediaObj.hide();
		    g_mediaObj.left(0);
			g_mediaObj.top(40);
            //A
	    	g_videoAObj.width(375);
			g_videoAObj.height(210);
		    g_videoAObj.hide();
		    g_videoAObj.left(0);
			g_videoAObj.top(40);
			//B
			g_videoBObj.show();
			
			updateVideo()
	    	
	    }else{
	    	//主
	    	g_mediaObj.width(500);
            g_mediaObj.height(280);
            g_mediaObj.hide();
		    g_mediaObj.left(0);
			g_mediaObj.top(0);
            //A
	    	g_videoAObj.width(250);
			g_videoAObj.height(140);
		    g_videoAObj.hide();
		    g_videoAObj.left(500);
			g_videoAObj.top(0);
			//B
			g_videoBObj.width(250);
			g_videoBObj.height(140);
		    g_videoBObj.hide();
		    g_videoBObj.left(500);
			g_videoBObj.top(140);
			
			updateVideo()
	    }
	    if(g_startRecord){
                
                
                var recContents = [];
                if(g_recordHeight*16/9 >g_recordWidth){
                   var sWidth = g_recordWidth;
                   var sHeight = g_recordHeight/16*9;
                   var sX = 0;
                   var sY = (g_recordHeight-sHeight)/2
                }else{
                    var sWidth = g_recordHeight*16/9 ;
                    var sHeight = g_recordHeight;
                    var sX = (g_recordWidth-sWidth)/2;
                    var sY = 0;
                }
                var mediaContent = {}; //主视频内容
                var mediaStampContent = {}; //主视频内容的邮票
				var mediaStamplogoContent = {} //主视频标志内容
                var videoAContent = {};// A视频内容
                var videoAStampContent = {};//A视频内容的邮票
                var videoAlogoContent = {};//A视频标志内容
                var videoBContent = {};// B视频内容
                var videoBStampContent = {};//B视频内容的邮票
                var videoBlogoContent = {};//B视频标志内容
                if(g_single_video){
                    //主
                    mediaContent["type"] = 3;
                    mediaContent["left"] =  sX;
                    mediaContent["top"] =  sY + sHeight/4 ;
                    mediaContent["width"] =   sWidth/2;
                    mediaContent["height"] =   sHeight/2;
                    mediaContent["parma"] =  "";
                    recContents.push(mediaContent);
                   //A
                   videoAContent["type"] = 0;
                   videoAContent["left"] = sX+sWidth/2;
                   videoAContent["top"] = sY + sHeight/4;
                   videoAContent["width"] = sWidth/2;
                   videoAContent["height"] = sHeight/2;
                   videoAContent["parma"] = {"camid":g_userID+"."+g_videoAObj.getVideoID()};
                   recContents.push(videoAContent);
                }else{
                    //主
                    mediaContent["type"] = 3;
                    mediaContent["left"] =  sX;
                    mediaContent["top"] =  sY + sHeight/6 ;
                    mediaContent["width"] =   sWidth*2/3;
                    mediaContent["height"] =   sHeight*2/3;
                    mediaContent["parma"] =  "";
                    recContents.push(mediaContent);
                    
                    //A
                    videoAContent["type"] = 0 ;
                    videoAContent["left"] = sX +sWidth*2/3 ;
                    videoAContent["top"] = sY +sHeight/6 ;
                    videoAContent["width"] = sWidth/3;
                    videoAContent["height"] = sHeight/3 ;
                    videoAContent["parma"] = {"camid":g_userID+"."+g_videoAObj.getVideoID()} ;
                    recContents.push(videoAContent);
                    
                    //B
                    videoBContent["type"] = 0;
                    videoBContent["left"] = sX +sWidth*2/3;
                    videoBContent["top"] =  sY +sHeight/2 ;
                    videoBContent["width"] = sWidth/3;
                    videoBContent["height"] = sHeight/3 ;
                    videoBContent["parma"] =  {"camid":g_userID+"."+g_videoBObj.getVideoID()} ;
                    recContents.push(videoBContent);
                     // B
                    videoBlogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC;
                    videoBlogoContent["left"] = videoBContent["left"] +3;
                    videoBlogoContent["top"] =videoBContent["top"] +3;
                    videoBlogoContent["width"] = 32;
                    videoBlogoContent["height"] =32;
                    videoBlogoContent["parma"] ={"resourceid":g_logo_id};
                    recContents.push(videoBlogoContent);
                     // B 
                    videoBStampContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;
                    videoBStampContent["left"] = videoBContent["left"]+35;
                    videoBStampContent["top"] = videoBContent["top"] +3;
                    videoBStampContent["width"] = 175;
                    videoBStampContent["height"] =32;
                    recContents.push(videoBStampContent);
                }
                //主 
                mediaStamplogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC;
                mediaStamplogoContent["left"] = mediaContent["left"] +3;
                mediaStamplogoContent["top"] = mediaContent["top"] +3;
                mediaStamplogoContent["width"] = 32;
                mediaStamplogoContent["height"] =32;
                mediaStamplogoContent["parma"] = {"resourceid":g_logo_id};
                recContents.push(mediaStamplogoContent)
                //主 
                mediaStampContent["type"] =  CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;
                mediaStampContent["left"] = mediaContent["left"]+35;
                mediaStampContent["top"] = mediaContent["top"] +3;
                mediaStampContent["width"] = 175;
                mediaStampContent["height"] =32;
                recContents.push(mediaStampContent);
                //A 
                videoAlogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC;
                videoAlogoContent["left"] = videoAContent["left"] +3;
                videoAlogoContent["top"] = videoAContent["top"] +3;
                videoAlogoContent["width"] = 32;
                videoAlogoContent["height"] =32;
                videoAlogoContent["parma"] = {"resourceid":g_logo_id};
                recContents.push(videoAlogoContent)
                //A 时间戳水印
                videoAStampContent["type"] =  CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;
                videoAStampContent["left"] = videoAContent["left"]+35;
                videoAStampContent["top"] = videoAContent["top"] +3;
                videoAStampContent["width"] = 175;
                videoAStampContent["height"] =32;
                recContents.push(videoAStampContent);

                // 调用设置摄像头的方法
                CRVideo_SetRecordVideos(recContents)
            }

		
		
}
//*************************创建媒体播放器***************************************
function layoutC(){
	layout = "layoutC";
	//主
	g_mediaObj.width(534);
	g_mediaObj.height(300);
	g_mediaObj.hide();
	g_mediaObj.left(124);
	g_mediaObj.top(0);
	//a
	g_videoAObj.show();
	//b
	g_videoBObj.show();

}

//*************************点击开始录制***************************************
$("#startRecord").click(function(){
	
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	$(".videoPage_right_view_list").css("display","none");
	$(".videoPage_right_view_list1").css("display","block");
	if(g_playbacking){

        alertLayer("回放的时候不能录制")
        return;
    }
	var date = new Date();
    var year = date.getFullYear();
    var mouth = date.getMonth()+1;
    var day =date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    g_record = year+'-'+mouth+'-'+day+'-'+hour+'-'+minute+'-'+second+'.mp4';
    CRVideo_StartRecordIng(g_location_dir+g_record,CRVideo_RECORD_AUDIO_TYPE.REC_AUDIO_TYPE_ALL,g_frameRate,g_recordWidth,g_recordHeight,g_bitRate,22,g_recDataType,g_isUploadOnRecording);
	g_startRecord = true;
	
    if(layout == 'layoutA'){
        layoutA();
    }else if(layout == 'layoutB')
    {
        layoutB();
    }else if(layout == 'layoutC')
    {
        layoutC();
    }
	
	
})
//*************************点击停止录制***************************************
$("#stopRecord").click(function(){
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	$(".videoPage_right_view_list").css("display","block");
	$(".videoPage_right_view_list1").css("display","none");
	
	CRVideo_StopRecord();
    g_startRecord = false
	
})
//*************************点击回放***************************************
$("#playback").click(function(){
	
	$("#doubleCamera").attr("disabled","disabled");
	$("#singleCamera").attr("disabled","disabled");
	if(g_playbacking){
		// 如果正在回放时点击回放则停止播放
		CRVideo_StopPlayMedia();
		
	}else{
		if(g_record == null){
			
			alertLayer("还没录制");
			
			return;
		}
		//该回放状态
        g_playbacking = true;
		layoutC();
		$('#playback').css("display","none")
		$('#playback1').css("display","block")
		
        g_mediaObj.keepAspectRatio(true);
        //回放视频	
        CRVideo_PlaybackRecordFile(g_record)
	}
	
})
//*************************点击停止回放***************************************
$("#playback1").click(function(){
	$("#doubleCamera").attr("disabled",false);
	$("#singleCamera").attr("disabled",false);
	$('#playback').css("display","block");
	$('#playback1').css("display","none");
	
	// 如果正在回放时点击回放则停止播放
    CRVideo_StopPlayMedia();
	g_playbacking = false;
	enterRoom()
    // 跟新视频
    updateVideo();
})


//*************************点击上传***************************************
$("#upload").click(function(){
	$(".videoPage_right_view_box").empty();
	$("#box").css({"width":$(document).width(),"height":$(document).height(),"display":"block"})
	upload(g_record)
})
//取消上传 
$("#name_del1Img,.full_page_cancle").click(function(){
	
	$("#box").css({"display":"none"});
	$("#full_page_div").css("display","none");
	$("#doubleCamera").attr("disabled",false);
	$("#singleCamera").attr("disabled",false);
	cancle_upload(g_record);
	enterRoom()
	
})
//确定
$(".full_page_cancle1").click(function(){
	flag = 0;
	flag1 = 0;
	$("#box").css({"display":"none"});
	$("#full_page_div").css("display","none");
	$("#doubleCamera").attr("disabled",false);
	$("#singleCamera").attr("disabled",false);
	enterRoom()
})
//取消上传
$(".full_page_cancle2").click(function(){
	$("#box").css({"display":"none"});
	$("#full_page_div").css("display","none");
	$("#doubleCamera").attr("disabled",false);
	$("#singleCamera").attr("disabled",false);
	cancle_upload(g_record);
	enterRoom()
})
//*****************************弹层（还没录制）********************************************

function alertLayer(msg){
	
	$(".videoPage_right_view_box").empty();
    $(".alert_label_detail").text(msg);
    $("#box").css({"width":$(document).width(),"height":$(document).height(),"display":"block"})
    $(".alert_palyer").css("display","block");
    
}

//  点击弹出层的确定 x
$("#alert_name_delImg").click(function(){
    $("#box").css({"display":"none"});
	$("#alert_palyer").css("display","none");
	$(".videoPage_right_view_list").css("display","block");
	$(".videoPage_right_view_list1").css("display","none");
	$("#doubleCamera").attr("disabled",false);
	$("#singleCamera").attr("disabled",false);
    enterRoom()
	
})
$(".alertr_page_commit").click(function(){
   $("#box").css({"display":"none"});
	$("#alert_palyer").css("display","none");
	$(".videoPage_right_view_list").css("display","block");
	$(".videoPage_right_view_list1").css("display","none");
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	enterRoom()
	
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

//**********************************上传的方法**********************************************

function upload(fileName){

    $("#percent_item").css("width","0");
    $("#upload_num_percert").html("0%");
    if(fileName == null)
    {
        alertLayer("还没录制");
        return;
    }
    //修改上传
    g_uploading = true;
    $(".full_page_div").css('display','block');
    // /上传文件 
    CRVideo_UploadRecordFile(fileName);

}
//***************************取消上传的方法**************************************************
   //取消上传
    function cancle_upload(fileName){

        var fileNameDetail = fileName;
        $(".full_page_div").css('display','none');
        if($(".list_container").css("display") == "block"){
           // 重新展示视频列表
           g_getAll_videfile_list = CRVideo_GetAllRecordFiles();//返回列表数组
          //  调得到视频文件列表（传列表数组）
           getAllVideoList(g_getAll_videfile_list)
        }else{
            // 视频更新
            updateVideo();
        }
        //是否在上传
        if(g_uploading){
            // 如果正在上传视频，则调用取消视频上传的方法
            CRVideo_CancelUploadRecordFile(fileName);
            g_uploading = false;
        }
        if($(".list_container").css("display") == "none"){

            $("#box").css('display','none');
        }else{

            $("#box").css('display','block');
        }
        
    }
//******************************获取视频列表****************************************
        // 得到视频文件列表（传列表数组）
        function getAllVideoList(list){
            $(".list_all_items").remove();
            if(list && list != "" && list != null){
                var str = "",str1="";
                for(var i=0;i< list.length; i++){
                    var listState = "";
                    var listName = list[i].fileName;
                    var duration = list[i].duration;
                    if(list[i].state == 0){
                        listState = "未上传";
                        //str1 = "<span class=\"table_up_del_rec\" onclick=\"uploadFile("+ i +")\">上传</span>"
                    }else if(list[i].state == 1){
                        listState = "上传中";
                        //str1 = "";
                    }else if(list[i].state == 2){
                        listState = "已上传";
                        //str1 = "";
                    }
                    var fileSize = decimal((parseInt(list[i].size) / 1024 / 1024),1);
                    if(parseInt(fileSize) > 0 ){
                        fileSize = decimal((parseInt(list[i].size) / 1024 / 1024),1) + "M";
                    }else{
                        fileSize = decimal((parseInt(list[i].size) / 1024),1)  + "K";
                    }
                    str += "<tr id=\"list_item"+i+"\" class=\"list_all_items\">"
                            +  "<td width=\"25%\"><div id=\"fileName"+ i +"\">"+ listName+ "</div></td>"
                            +  "<td width='18%'><div class=\"list_item_size\">"+ fileSize + "</div></td>"
                            +  "<td width=\"14%\"><div class=\"list_item_state\">"+ duration + "秒</div></td>"
                            +  "<td width=\"10%\"><div class=\"list_item_state\">"+ listState + "</div></td>"
                            +  "<td width=\"33%\">"
                                + "<div class=\"table_done\">"
                                    //+ str1
                                    + "<span class=\"table_up_del_rec\" id='uploadFile'>上传</span>"
                                    + "<span class=\"table_up_del_rec\" id='deleteFile'>本地删除</span>"
                                    + "<span class=\"table_up_del_rec\" id='playbackList'>回放</span>"
                                    //+ "<div class='table_up_perc'></div>"
                                +"</div>"
                            +"</td>"
                        + "</tr>"
                }
                str += "<div style='height:0;clear:both;'></div>"
                $("#table_list_container").append(str);
                //点击了本地删除
                $("#table_list_container #deleteFile").map(function(index){
                   $(this).click(function(){
                        deleteFile(index);
                    })
                })
                //点击了上传
                $("#table_list_container #uploadFile").map(function(index){
                  $(this).click(function(){
                        uploadFile(index);
                    })
                })
                 //点击了回放
                 $("#table_list_container #playbackList").map(function(index){
               
                    $(this).click(function(){
                        playbackList(index);
                    })
                })

            }

        }
//***************************************************************************
  
    function playbackList(i){
        // 弹出层隐藏 并开始回放
        var fileName = $("#fileName"+ i).text();
      console.log(fileName)
        //关闭列表的方法
		$("#box").css({"display":"none"})
		$("#list_container").css({"display":"none"});
        
        if(g_playbacking){
			// 如果正在回放时点击回放则停止播放
			CRVideo_StopPlayMedia();
			
		    }
        //该回放状态
	        g_playbacking = true;
			layoutC();
			$('#playback').css("display","none")
			$('#playback1').css("display","block")
			
	        g_mediaObj.keepAspectRatio(true);
	        //回放视频	
	        CRVideo_PlaybackRecordFile(g_location_dir+fileName)
            console.log(g_location_dir+fileName)
        // 更新视频
        updateVideo();
    }
    // 删除
    function deleteFile(i){
        // 是否回放？
        if(g_playbacking)
        {
            alertLayer("回放状态不能删除");
            return;
        }
        var fileName = $("#fileName"+ i).text();
        // 删除本地的录制文件，上传中的文件会被取消上传 filename - 文件名，全路径
        CRVideo_RemoveFromFileMgr(fileName);
        
        if($("#list_item"+i).length > 0){

            $("#list_item"+i).remove();
        }
    }
    
    function uploadFile(i){
        var fileName = $("#fileName"+ i).text();
        //上传文件的方法
        upload(fileName);
    }
//***************************** 十进制的  **************************************
function decimal(num,v){
    var vv = Math.pow(10,v);
    return Math.round(num*vv)/vv;
}


// // 容器显示视频
//  function videoContainerShow(){
//      if(layout == "layoutA"){
//          
//          layoutA();
//      }else if(layout == "layoutB"){
//         
//          layoutB();
//      }else if(layout == "layoutC"){
//          layoutC();
//      }
//  }