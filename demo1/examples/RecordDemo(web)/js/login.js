$(function(){
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
   //
    $(".inputLayer1").click(function(){
        $(".inputLayer1").css({display:"none"});
        $("#login_cpyname").val("").focus();
    })
    //密码
    $(".inputLayer2").click(function(){
        $(".inputLayer2").css({display:"none"});
        $("#login_psd").val("").focus();
    })
    
    //
    var g_location_dir=location.href;//获取目录地址
    var g_logining=false; //登陆状态
    var cr_account; // 云屋授权账号
    var cr_psw;//云屋授权密码
    var g_nickname;//用户昵称
    var g_userID;//用户id
    var g_init = false; ///  是否初始化
    var g_residual_timer = -1;//剩余时间
    var g_layout; // 视频和摄像头A 布局 两个视频播放布局


    var g_logo_id = "6cb4d64a-5647-11e7-bbc9-989096d01cf2"
    var end = g_location_dir.lastIndexOf('/')
    var start = g_location_dir.indexOf('file:///')
    if(start > -1)
    {
        start = 8
    }else
    {
        start = 0;
    }
    g_location_dir = g_location_dir.slice(start,end)+"/home/";
    g_location_dir = decodeURIComponent(g_location_dir);

    window.onbeforeunload = function() { 
        if(g_logining){
            CRVideo_Logout();
        }
        if(g_init){
            CRVideo_Uninit();
        }
        if(g_residual_timer != -1){
            clearInterval(g_residual_timer);
            g_residual_timer = -1;
        }
        if(g_layout != null){
            $(".detail_box").css('display','none');
        }
    }
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
    //点击事件
    $("#login_bnt").click(function(){
        $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
        //获取input框的值跟后台数据对比判断
        login()
    })

  
    //键盘回车
    $("body").keydown(function(e){
       
        if(event.keyCode == "13"){
           login()
           $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
        }
    });
    function login(){
        //初始化
        console.log(1111)
        var init = CRVideo_Init("CLOUDROOM", g_location_dir);
        //确定初始化
        g_init=true;
        // console.log(init)//0
        // console.log(g_location_dir)//file:///C:/Users/admin/Desktop/my-project/demo1/examples/RecordDemo(web)/index.html
        if(init == CRVideo_WEB_OCX_NOTINSTALLED){
            // 弹出层封装
            alertLayer("ocx未安装");
        }else if(init == CRVideo_OCX_VERSION_NOTUPPORTED){
            alertLayer("不支持的浏览器");
        }else if(init == CRVideo_WEB_BROWER_NOTUPPORTED){
            alertLayer("不支持的插件版本");
        }else if(init != 0){
            alertLayer("CRVideo_init sdkErr"+"出错了"+init);
        }
       //登陆状态
        if(g_logining == false){
            console.log(222)
            var g_serverName = $("#server_name").val()
           
            if(g_serverName && g_serverName != ""){
               console.log(444)
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
                console.log(333)
            }else{
             
                console.log("服务器地址不能为空");

                $("#login_bnt").attr({"disabled":false}).css({background:"#eb5405"})
            }
           
        }
    }
        //登陆成功
        CRVideo_LoginSuccess.callback = function(userID,cookie){
            console.log(userID)//FBB9A453BAA78E8F2A10CE00ABE553D2
            console.log(cookie)
            $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
            g_userID = userID;
            createMeet();
        }
        //登录失败
        CRVideo_LoginFail.callback = function(sdkErr,cookie){
            
            console.log(sdkErr)//202 服务器没有响应
            console.log(cookie)//
            $("#login_bnt").attr({"disabled":false}).css({background:"#eb5405"})
            g_logining = false;
            console.log("登录失败 错误码:"+sdkErr)
        }

        /*
        *创建会议
        *
        */
        var g_meetingId; // 创建的会议号
        var g_meetingPsw; // 会议密码
        var g_meeLoginTimes = 0; // 记录掉线的次数1
        var g_meeLoginTimes2 = 0; // 记录的掉线次数 2
        var g_init_room = false//是否初始化完房间
        var g_single_video = false//是否单摄像头
        var g_video_filename_list; // 媒体库所有媒体文件
		var g_getAll_videfile_list; // 获取所有视频文件信息
        var g_nowTime_play_num = -1; // 当前播放哪一个文件
        var g_FURate = 100*1024; // 录制视频的上传限制初始值 kb/s
        
        function createMeet(){
            //创建会议
            CRVideo_CreateMeeting("财富宝货币市场基金 00034")
            console.log(5555)
        }

        //创建会议成功
        CRVideo_CreateMeetingSuccess.callback=function(meetObj,cookie){
            console.log(meetObj)
            g_meetingId=meetObj.ID;
            g_meetingPsw=meetObj.pswd;
            enterMeet();

        }
        //创建会议失败
        CRVideo_CreateMeetingFail.callback = function(sdkErr,cookie){
            alertLayer("创建会议失败 错误码:"+sdkErr);
            g_logining = false;
        }
        //监控会议掉线
        CRVideo_MeetingDropped.callback=function(){
            g_meeLoginTimes = g_meeLoginTimes +1;// 每掉线一次，就将其加1 计数
            $("#full_page_msg_normal").css({display:"none"});
            $(".player_page_cancle").html("");
            $(".player_page_submit").html("");

            if(g_meeLoginTimes <= 1){
                //实参 时间 会议id 会议密码
				enterMeetLayer(10,g_meetingId,g_meetingPsw);
			}else if(g_meeLoginTimes >= 2){
				enterMeetLayer(30,g_meetingId,g_meetingPsw);
			}else{
				enterMeetLayer(30,g_meetingId,g_meetingPsw)
			}
        }
        // 弹出重登界面的方法    形参 时间 会议id 会议密码
        function enterMeetLayer(time,meetId,meetPsd){
            //
            $("#login_time").html(time);
            // 提示用户已经离线
            $("#full_page_msg_normal").css("display","none");
            $(".player_page_cancle").html("");
            $(".player_page_submit").html("");
            $(".player_name_label").html("提示面板");
			$("#full_page_msg_time").css("display","block");
			$(".player_page_cancle").html("取消重登");
			$(".player_page_submit").html("立即重登");
			$(".player_page_cancle").css("display","inline-block");
			$(".player_page_submit").css("display","inline-block");
			$(".full_page").css("display","block");
			$(".warning_palyer").css("display","block");
            $(".detail_right_video").css('display','none');
            // 倒计时开始
            var timeNum = parseInt (time);
            var timer = setInterval(function(){
                timeNum -- ;
                if(timeNum <= 0){
                    $("#login_time").html(0);
                    // 小于等于0；进入会议
                    enterMeet();
                    $(".warning_palyer").css("display","none");
					$(".full_page").css("display","none");
					$("#full_page_msg_time").css("display","block");
					$(".player_page_cancle").html("");
					$(".player_page_submit").html("");
					$(".player_page_cancle").css("display","none");
                    $(".player_page_submit").css("display","none");
                    //跟新摄像头

                    //清除定时器
                    clearInterval(timer);
                }else{
                    $("#login_time").html(timeNum);
                }
            },1000)
            //点击了立即登陆
            $("player_page_submit").click(function(){
                enterMeet();
                $(".warning_palyer").css("display","none");
				$(".full_page").css("display","none");
				$("#full_page_msg_time").css("display","none");
				$(".player_page_cancle").text("");
				$(".player_page_submit").text("");
				$(".player_page_cancle").css("display","none");
                $(".player_page_submit").css("display","none");

                 //跟新摄像头

                 //清除定时器
                 clearInterval(timer);
            })
        }
      //会议掉线
      CRVideo_LineOff.callback=function(sdkErr){
        alertLayer("会议离线"+sdkErr);
        if(g_residual_timer != -1){
            clearInterval(g_residual_timer);
            g_residual_timer = -1;
        }
      }
        /*******
         * 
         *  进入会议
         * 
         * 
         */
        function enterMeet(){
            CRVideo_EnterMeeting(g_meetingId,g_meetingPsw,g_userID,g_nickname)
            console.log(6666)
        }
        CRVideo_EnterMeetingRslt.callback=function(sdkErr){
            // CRVideo_NOERR==没有错误 成功
           if(sdkErr == CRVideo_NOERR){
            // * 暂未定义  1* @param {string} picID -  2 * @param {object} jsonval - 
            CRVideo_SetPicResource(g_logo_id,{
                //不明白 (需要问)
                "fmt":"picdat",
				"dat":"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"
					
            });

            CRVideo_OpenVideo(g_userID)// 打开本地摄像头 传用户ID
            CRVideo_SetEnableMutiVideo(g_userID,true);  // 是否可以打开更多的摄像头 传用户ID，bool
            CRVideo_OpenMic(g_userID)//打开麦克风 传用户ID
            // 是否初始化房间
            if(g_init_room == false){
                // 是
                g_init_room = true;
                //登陆消失 双录出现
                $(".login_box").css("display","none")
                $(".menu_box").css('display','block');
            }else{
                //提示
            }
            // 更新video 配置(待写)

           }else{
               // 进入会议失败时弹出错误码
               alertLayer("进入会议失败 错误码:"+sdkErr)
               g_meeLoginTimes2 = g_meeLoginTimes2 +1 ;// 每掉线一次，就将其加1 计数
               $("#full_page_msg_normal").css({display:"none"});
               $(".player_page_cancle").html("");
               $(".player_page_submit").html("");
               if(g_meeLoginTimes2 <= 1){
                  // 弹出重登界面的方法 
				   enterMeetLayer(30,g_meetingId,g_meetingPsw)
               }else if(g_meeLoginTimes2 >= 2){
				   enterMeetLayer(30,g_meetingId,g_meetingPsw)
                
               }else{
				   enterMeetLayer(30,g_meetingId,g_meetingPsw)
               }
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
      
   /********
    *进入会议enterRoom
    *
    *
    */
        var g_mediaObj;  // 创建的 正在播放的媒体对象
        var g_videoAObj; // 创建的 video1 对象
        var g_videoBObj; // 创建的 vidoe2 对象
        var g_bg_color = 0; // 背景颜色初始
        var g_startRecord = false;	// 判断回放状态的全局变量
        var g_recordWidth = 640;  // 录制视频的宽度初始值
		var g_recordHeight = 360; // 录制视频的高度初始值
		var g_bitRate  = 350000;  // 录制视频码率的初始值
		var g_frameRate = 10;  // 录制视频帧率的初始值
		var g_recDataType = 7; // 录制视频的类型 初始值为音频+视频 纯音频为3
       //点击对应的下标进入对应的会议房间
        $(".menu_right_detail dl").map(function(index,item){
            $(this).click(function(){
                enterRoom()
            })
        });

        //实现会议的方法
        function enterRoom(){
            // 取得播放路径下的所有可播放文件
            g_video_filename_list = CRVideo_GetAllFilesInMediaPath();
            //正在播放的列表

            //显示出播放页面  其他页面掩藏
            $(".full_page").css({display:"none"});
            $(".full_page_div").css({display:"none"});
            $(".menu_box").css({display:"none"});
            $(".detail_box").css({display:"block"});

            //创建Medio对象
            g_mediaObj = CRVideo_CreatMediaObj();
            g_mediaObj.id("mediaObj");
            //媒体容器  插入到
            $("#mediaContainer").append(g_mediaObj.handler());
            // 1、表示内容保持比例居中显示，0、表示内容拉伸
            g_mediaObj.keepAspectRatio(true)
            //    console.log(g_mediaObj)
            
            //    创建video对象A 和设置
            g_videoAObj = CRVideo_CreatVideoObj();
            g_videoAObj.id("videoAObj")
            $("#videoAContainer").append(g_videoAObj.handler())
           
             //    创建video对象B 和设置
             g_videoBObj = CRVideo_CreatVideoObj();
             g_videoBObj.id("videoBObj")
            $("#videoBContainer").append(g_videoBObj.handler())

            // A布局，两个视频文件的布局
            layoutA()
            // 更新摄像头
            updateVideo();
            //定时更换背景
            g_residual_timer = setInterval(function(){
                if(g_bg_color != "#10132b"){
                    $(".detail_right_video").css({"background-color":"#10132b"});
                    g_bg_color = "#10132b";
                }else{
                    $(".detail_right_video").css({"background-color":"#10132a"});
                    g_bg_color = "#10132a";
                }
            },100)

        }
     /**
      * 视频和摄像头布局
      */
        // 布局A，单摄像头显示一个，A;双摄像头显示两个AB
        function layoutA(){
            g_layout = "layoutA";
            console.log(g_videoAObj)
            //隐藏主播放页面
            $("#mediaContainer").css({display:"none"});
            if(g_single_video){
                //隐藏主播放页面
                $("#mediaContainer").css({display:"none"});
                //单摄像出现，展示位置
                $("#videoAContainer").css({"display":"block","left":"124px","top":"0px","height":"300px"});
                //设置视频宽高
                g_videoAObj.width(534);
                g_videoAObj.height(300);
                // 双摄的页面隐藏
                $("#videoBContainer").css({display:"none"});
            }else{ 
                 // 双摄像头
                //隐藏主播放页面
                $("#mediaContainer").css({display:"none"});
                // A摄像的大小
				$("#videoAContainer").css({"display":"block","left":"0px","top":"40px","width":"375px","height":"210px"});
				g_videoAObj.width(375);
                g_videoAObj.height(210);
                // B摄像的大小
				$("#videoBContainer").css({"display":"block","left":"375px","top":"40px","width":"375px","height":"210px"});
				g_videoBObj.width(375);
				g_videoBObj.height(210);
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
                 
                if(g_single_video){//如果是单摄像头

                    videoAContent["type"] = 0;  //录制类型 
                    videoAContent["left"] = sX; //左
                    videoAContent["top"] = sY;  //上
                    videoAContent["width"] = sWidth; //宽
                    videoAContent["height"] = sHeight; //高
                    // 用户id.摄像头id, videoAObj对象里面的getVideoID()方法
                    videoAContent["param"] = {"camid":g_userID+"."+g_videoAObj.getVideoID()};
                    //加入到录音内容中
                    recContents.push(videoAContent);
                }else{//双摄像头
                    //A:
                    videoAContent["type"] = 0;
                    videoAContent["left"] = sX;
                    videoAContent["top"] = sY+sHeight/4;
                    videoAContent["width"] = sWidth/2;
                    videoAContent["height"] = sHeight/2;
                   // 用户id.摄像头id, videoAObj对象里面的getVideoID()方法
                    videoAContent["param"] = {"camid":g_userID+"."+g_videoAObj.getVideoID()};
                    //加入到录音内容中
                    recContents.push(videoAContent);
                   
                    //B:
                    videoBContent["type"] = 0;
                    videoBContent["left"] = sX+sWidth/2;
                    videoBContent["top"] = sY+sHeight/4 ;
                    videoBContent["width"] = sWidth/2;
                    videoBContent["height"] = sHeight/2;
                    videoBContent["parma"] = {"camid":g_userID+"."+g_videoBObj.getVideoID()};
                    //加入到录音内容中
                    recContents.push(videoBContent);
                    // B视频标志内容
                    //图像 
                    videoBlogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC;//==1
                    videoBlogoContent["left"] = videoBContent["left"] +3;
                    videoBlogoContent["top"] = videoBContent["top"] +3;
                    videoBlogoContent["width"] = 32;
                    videoBlogoContent["height"] = 32;
                    videoBlogoContent["param"] = {"resourceid":g_logo_id}; //资源独一无二
                    recContents.push(videoBlogoContent);
                    // B视频内容的邮票
                    //时间戳水印
                    videoBStampContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC;//==4
                    videoBStampContent["left"] = videoBContent["left"] +35;
                    videoBStampContent["top"] = videoBContent["top"] +3;
                    videoBStampContent["width"] = 175;
                    videoBStampContent["height"] = 32
                    recContents.push(videoBStampContent);
                }    
                // A视频标志内容
                //图像 
                videoAlogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC; //==1
				videoAlogoContent["left"] = videoAContent["left"]+3;
				videoAlogoContent["top"] = videoAContent["top"]+3;
				videoAlogoContent["width"] = 32;
				videoAlogoContent["height"] = 32;
				videoAlogoContent["param"] = {"resourceid":g_logo_id};
				recContents.push(videoAlogoContent);
				// A视频内容的邮票
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

        }
       
        function layoutB(){
            // B布局：单摄像头显示两个主+A，双摄像头显示三个主+A+B
            g_layout = "layoutB";

            if(g_single_video){//单摄像头
                //主
                $("#mediaContainer").css({display:"block",left:0,top:"40px",width:"375px",height:"210px"});
                g_mediaObj.width(375);
                g_mediaObj.height(210);
                //A
                $("#videoAContainer").css({display:"block",left:0,top:"40px",width:"375px",height:"210px"}) 
                g_videoAObj.width(375);
                g_videoAObj.height(210);
                //B
                $("#videoBContainer").css({display:none})

                //更新视频
                updateVideo();
            }else{//双摄相头
                $("#mediaContainer").css({display:"block",left:0,top:0,width:"500px",height:"280px"});
                g_mediaObj.width(500);
                g_mediaObj.height(280);
                //A
                $("#videoAContainer").css({display:"block",left:"500px",top:0,width:"250px",height:"140px"}) 
                g_videoAObj.width(250);
                g_videoAObj.height(140);
                 //B
                $("#videoBContainer").css({display:"block",left:"500px",top:"140px",width:"250px",height:"140px"}) 
                g_videoBObj.width(250);
                g_videoBObj.height(140);

                //更新视频
                updateVideo()
            }
            if(g_startRecord){ //回放
                
                //回放中
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
                }
                //主 图像
                mediaStamplogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC;
                mediaStamplogoContent["left"] = mediaContent["left"] +3;
                mediaStamplogoContent["top"] = mediaContent["top"] +3;
                mediaStamplogoContent["width"] = 32;
                mediaStamplogoContent["height"] =32;
                mediaStamplogoContent["parma"] = {"resourceid":g_logo_id};
                recContents.push(mediaStamplogoContent)
                //主 时间戳水印
                mediaStampContent["type"] =  CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;
                mediaStampContent["left"] = mediaContent["left"]+35;
                mediaStampContent["top"] = mediaContent["top"] +3;
                mediaStampContent["width"] = 175;
                mediaStampContent["height"] =32;
                recContents.push(mediaStampContent);
                //A 图像
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
      
        function layoutC(){
            // C布局，无论单双摄像头都只显示最大的 主 视频
            g_layout = "layoutC";
            $("#mediaContainer").css({display:"block",left:"124px",top:0,height:"300px"})
            g_mediaObj.width(534);
            g_mediaObj.height(300);
            $("#videoAContainer").css({display:"none"});
            $("#videoBContainer").css({display:"none"})
        }

      /**
       *  摄像头处理
       * 
       * 
       * 更新摄像头
       */
       //有差异 待问try{}catch(e){}
       function updateVideo(){
            //获取用户所有摄像头信息 还会列表
            var devices = CRVideo_GetAllVideoInfo(g_userID);
            console.log(devices)//[Object]
            if(g_videoAObj && devices.length > 0){
                //g_videoAObj里面的内置方法setVideo（usrID,videoID）,setVisibleNickName(value);
                g_videoAObj.setVideo(g_userID,devices[1]["videoID"]);
                g_videoAObj.setVisibleNickName(false);
            }
            if(g_videoBObj && devices.length > 0){
                //g_videoBObj里面的内置方法setVideo（usrID,videoID）,setVisibleNickName(value);
                g_videoBObj.setVideo(g_userID,devices[1]["videoID"]);
                g_videoBObj.setVisibleNickName(false);
            }
       }
    
       //摄像头状态改变
       //   1会话中设备的所有者ID 2旧状态 3新状态
      CRVideo_VideoStatusChanged.callback = function(userID,oldStatus,newStatus){

          if(g_userID == userID){
            /**视频处于打开状态（软开关）*/          /**向服务器发送打开消息中	*/
              if(newStatus !=VOPEN && newStatus !=VOPENING){
                 CRVideo_OpenVideo(g_userID);
              }
          }
      }
    //摄像头列表更新 通知用户的视频设备有变化	
    CRVideo_VideoDevChanged.callback =function(userID){
       if(g_userID == userID){
            updateVideo();
       }
    }


})