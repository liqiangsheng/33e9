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
//*******************************点击了playImg,suspendImg,playImg1,stopImg*******************************
$("#playImg").click(function(){
	$("#playImg").css("display","none");
	$("#suspendImg").css("display","block");
	$("#playImg1").css("display","none");
	$("#stopImg").css("display","block");
	flag2++
	$(".videoPage_right_view_box").empty();
	if(flag2 == 1){
		layoutC();
		flag2 = 0;
		flag = 0;
		flag1 = 0;
	}
	g_playbacking = true;
	$("#singleCamera").attr("disabled",false)
	$("#doubleCamera").attr("disabled",false)
	
	 // 开始播放
	CRVideo_StartPlayMedia(g_location_dir+"/Media/"+$(".videoPage_right_voice_left_list_box1").html())
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
	$("#playImg").css("display","block");
	$("#suspendImg").css("display","none");
	$("#playImg1").css("display","none");
	$("#stopImg").css("display","none");
	
	//停止媒体播放
	CRVideo_StopPlayMedia();
	g_playbacking = false;
	$(".videoPage_right_view_box").empty();
	layoutB()
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
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	$("#box").css({"display":"none"})
	$("#list_container").css({"display":"none"});
	layoutB()
	
	
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

//**************************点击录制文件管理*************************************
$("#recordMrg").click(function(){
	$("#box").css({"width":$(document).width(),"height":$(document).height(),"display":"block"})
	$("#list_container").css({"display":"block"});
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
	g_getAll_videfile_list = CRVideo_GetAllRecordFiles();
     console.log(g_getAll_videfile_list)      
    getAllVideoList(g_getAll_videfile_list);
	 updateVideo();
})
//*************************点击单摄像头***************************************
$("#singleCamera").click(function(){
	    
	    $("#singleCamera").attr("disabled","disabled")
		$("#doubleCamera").attr("disabled",false)
		$(".videoPage_right_view_box").empty();
		flag1 = 0;
		flag++;
	if(flag == 1){
		if(g_playbacking == false){
				layoutA()
				flag = 0;
		}else{
			g_mediaObj = CRVideo_CreatMediaObj();
			g_mediaObj.id("mediaObj");
			g_mediaObj.width(375);
			g_mediaObj.height(210);
			$(".videoPage_right_view_box").append(g_mediaObj.handler());
			g_mediaObj.keepAspectRatio(true)
			g_mediaObj.hide();
			g_mediaObj.left(0);
			g_mediaObj.top(40);
			
			g_videoAObj = CRVideo_CreatVideoObj();
			g_videoAObj.id("videoAObj");
			g_videoAObj.width(375);
			g_videoAObj.height(210);
			$(".videoPage_right_view_box").append(g_videoAObj.handler());
		    g_videoAObj.hide();
		    g_videoAObj.left(375);
			g_videoAObj.top(40);
			
			updateVideo()
			flag = 0;
		}
	}
})
//**************************创建单摄像头************************************************
function layoutA(){
	    
	    layout ="layoutA";
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
		
		if(g_playbacking == false){
			layoutB();
			flag1 = 0;
		}else{
			layoutC()
			flag2 = 0;
		}
	}
})

//**************************创建双摄像头************************************************
function layoutB(){
	
	    layout = "layoutB"
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
//*************************创建媒体播放器***************************************
function layoutC(){
	g_mediaObj = CRVideo_CreatMediaObj();
	g_mediaObj.id("mediaObj");
	g_mediaObj.width(500);
	g_mediaObj.height(280);
	$(".videoPage_right_view_box").append(g_mediaObj.handler());
	g_mediaObj.keepAspectRatio(true)
	g_mediaObj.hide();
	g_mediaObj.left(10);
	g_mediaObj.top(0);
	
	g_videoAObj = CRVideo_CreatVideoObj();
	g_videoAObj.id("videoAObj");
	g_videoAObj.width(250);
	g_videoAObj.height(140);
	$(".videoPage_right_view_box").append(g_videoAObj.handler());
    g_videoAObj.hide();
    g_videoAObj.left(510);
	g_videoAObj.top(0);
	
	g_videoBObj = CRVideo_CreatVideoObj();
	g_videoBObj.id("videoBObj");
	g_videoBObj.width(250);
	g_videoBObj.height(140);
	$(".videoPage_right_view_box").append(g_videoBObj.handler());
    g_videoBObj.hide();
    g_videoBObj.left(510);
	g_videoBObj.top(140);
	
	updateVideo()

}

//*************************点击开始录制***************************************
$("#startRecord").click(function(){
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
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
	
	if(layout == "layoutA"){
		  layoutA()
		  
		  if(g_startRecord){
                //录制内容
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
               

                    videoAContent["type"] = 0;  //录制类型 
                    videoAContent["left"] = sX; //左
                    videoAContent["top"] = sY;  //上
                    videoAContent["width"] = sWidth; //宽
                    videoAContent["height"] = sHeight; //高
                    // 用户id.摄像头id, videoAObj对象里面的getVideoID()方法
                    videoAContent["param"] = {"camid":g_userID+"."+g_videoAObj.getVideoID()};
                    //加入到录音内容中
                    recContents.push(videoAContent);
                    
	                // A视频标志内容
	                //图像 
	                videoAlogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC; //==1
					videoAlogoContent["left"] = videoAContent["left"]+3;
					videoAlogoContent["top"] = videoAContent["top"]+3;
					videoAlogoContent["width"] = 32;
					videoAlogoContent["height"] = 32;
					videoAlogoContent["param"] = {"resourceid":g_logo_id};
					recContents.push(videoAlogoContent);
					
					
	                //时间戳水印
					videoAStampContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;// == 4
					videoAStampContent["left"] = videoAContent["left"]+35;
					videoAStampContent["top"] = videoAContent["top"]+3;
					videoAStampContent["width"] = 175;
					videoAStampContent["height"] = 32;
	                recContents.push(videoAStampContent);

                // 设置录制视频信息
                CRVideo_SetRecordVideos(recContents)
            }

		  //A录制文件的样式
	}else if(layout == "layoutB"){
		  layoutB()
		  
		  if(g_startRecord){ 
                //
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
                
                var videoBContent = {};// B视频内容
                var videoBStampContent = {};//B视频内容的邮票
                var videoBlogoContent = {};//B视频标志内容
                    
                    //B
                    videoBContent["type"] = 0;
                    videoBContent["left"] = sX ;
                    videoBContent["top"] =  sY ;
                    videoBContent["width"] = sWidth;
                    videoBContent["height"] = sHeight ;
                    videoBContent["parma"] =  {"camid":g_userID+"."+g_videoBObj.getVideoID()} ;
                    recContents.push(videoBContent);
                     // B 图像
                    videoBlogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC;
                    videoBlogoContent["left"] = videoBContent["left"] +3;
                    videoBlogoContent["top"] =videoBContent["top"] +3;
                    videoBlogoContent["width"] = 32;
                    videoBlogoContent["height"] =32;
                    videoBlogoContent["parma"] ={"resourceid":g_logo_id};
                    recContents.push(videoBlogoContent);
                     // B 时间戳水印
                    videoBStampContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;
                    videoBStampContent["left"] = videoBContent["left"]+35;
                    videoBStampContent["top"] = videoBContent["top"] +3;
                    videoBStampContent["width"] = 175;
                    videoBStampContent["height"] =32;
                    recContents.push(videoBStampContent);
               
              
                // 调用设置摄像头的方法
                CRVideo_SetRecordVideos(recContents)
            }

		//B录制文件的样式
	}
})
//*************************点击停止录制***************************************
$("#stopRecord").click(function(){
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	$(".videoPage_right_view_list").css("display","block");
	$(".videoPage_right_view_list1").css("display","none");
	if(layout == "layoutA"){
		  layoutA()
		  //停止录制
          CRVideo_StopRecord();
          g_startRecord = false
	}else if(layout == "layoutB"){
		  layoutB()
		  //停止录制
          CRVideo_StopRecord();
          g_startRecord = false
	};
})
//*************************点击回放***************************************
$("#playback").click(function(){
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
	$("#doubleCamera").attr("disabled",false);
	$("#singleCamera").attr("disabled",false);
	if(g_playbacking){
		// 如果正在回放时点击回放则停止播放
		CRVideo_StopPlayMedia();
		
	}else{
		if(g_record == null){
			alertLayer("还没录制");
			return;
		}
		
		layoutC();
		$('#playback').css("display","none")
		$('#playback1').css("display","block")
		//该回放状态
        g_playbacking = true;
        g_mediaObj.keepAspectRatio(true);
        //回放视频	
        CRVideo_PlaybackRecordFile(g_record)
	}
	
})
//*************************点击停止回放***************************************
$("#playback1").click(function(){
	flag = 0;
	flag1 = 0;
	$(".videoPage_right_view_box").empty();
	$("#doubleCamera").attr("disabled",false);
	$("#singleCamera").attr("disabled",false);
	$('#playback').css("display","block");
	$('#playback1').css("display","none");
	g_playbacking = false;
	if(layout == "layoutA"){
		  layoutA()
		  
	}else if(layout == "layoutB"){
	      layoutB()
		 
	}
})


//*************************点击上传***************************************
$("#upload").click(function(){
	flag = 0;
	flag1 = 0;
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
	layoutB()
})
//确定
$(".full_page_cancle1").click(function(){
	flag = 0;
	flag1 = 0;
	$("#box").css({"display":"none"});
	$("#full_page_div").css("display","none");
	$(".videoPage_right_view_box").empty();
	$("#doubleCamera").attr("disabled",false);
	$("#singleCamera").attr("disabled",false);
	layoutB()
})
//取消上传
$(".full_page_cancle2").click(function(){
	$("#box").css({"display":"none"});
	$("#full_page_div").css("display","none");
	$(".videoPage_right_view_box").empty();
	$("#doubleCamera").attr("disabled",false);
	$("#singleCamera").attr("disabled",false);
	cancle_upload(g_record);
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
	if(layout == "layoutA"){
		layoutA()
	}else if(layout == "layoutB"){
		layoutB()
	}
	
})
$(".alertr_page_commit").click(function(){
   $("#box").css({"display":"none"});
	$("#alert_palyer").css("display","none");
	$("#doubleCamera").attr("disabled",false)
	$("#singleCamera").attr("disabled",false)
	if(layout == "layoutA"){
		layoutA()
	}else if(layout == "layoutB"){
		layoutB()
	}
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
                   
                })
                //点击了上传
                $("#table_list_container #uploadFile").map(function(index){
                  
                })
                 //点击了回放
                 $("#table_list_container #playbackList").map(function(index){
               
                   
                })

            }

        }
//***************************** 十进制的  **************************************
function decimal(num,v){
    var vv = Math.pow(10,v);
    return Math.round(num*vv)/vv;
}