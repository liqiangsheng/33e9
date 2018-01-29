$(function(){
   
      //调用cookie()
      cookie()
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


    var g_logo_id = "6cb4d64a-5647-11e7-bbc9-989096d01cf2";
    var end = g_location_dir.lastIndexOf('/');
    var start = g_location_dir.indexOf('file:///');
    if(start > -1)
    {
        start = 8
    }else
    {
        start = 0;
    }
    g_location_dir = g_location_dir.slice(start,end)+"/home/";
    g_location_dir = decodeURIComponent(g_location_dir);
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
        if(g_layout != null){
            $(".detail_box").css('display','none');
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
        // console.log(1111)
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
            // console.log(222)
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
                // console.log(333)
            }else{
             
                // console.log("服务器地址不能为空");

                $("#login_bnt").attr({"disabled":false}).css({background:"#eb5405"})
            }
           
        }
    }
        //登陆成功
        CRVideo_LoginSuccess.callback = function(userID,cookie){
            // console.log(userID)//FBB9A453BAA78E8F2A10CE00ABE553D2
            // console.log(cookie)
            $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
            g_userID = userID;
            createMeet();
        }
        //登录失败
        CRVideo_LoginFail.callback = function(sdkErr,cookie){
            
            // console.log(sdkErr)//202 服务器没有响应
            // console.log(cookie)//
            $("#login_bnt").attr({"disabled":false}).css({background:"#eb5405"})
            g_logining = false;
            // console.log("登录失败 错误码:"+sdkErr)
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
            // console.log(5555)
        }

        //创建会议成功
        CRVideo_CreateMeetingSuccess.callback=function(meetObj,cookie){
            // console.log(meetObj)
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
        	//进入会议
            CRVideo_EnterMeeting(g_meetingId,g_meetingPsw,g_userID,g_nickname)
            // console.log(6666)
        }
        //进入会议完成响应
        CRVideo_EnterMeetingRslt.callback=function(sdkErr){
            // CRVideo_NOERR==没有错误 成功
           if(sdkErr == CRVideo_NOERR){
            // * 暂未定义  1* @param {string} picID -  2 * @param {object} jsonval - 
            CRVideo_SetPicResource(g_logo_id,{
                //资源格式，可取值："yuv420p"，"rgb32"，"picfile"，"picdat"
                "fmt":"picdat",
                // fmt为"yuv420p"时： dat存放的是base64(yuv420p数据)；
                // fmt为"rgb32"时： dat存放的是base64(rgb32数据)；
                // fmt为"picfile"时： dat存放的是“本地文件名”；
				"dat":"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAWfSURBVHjapJd7bFRFFIfPbLetFYMKvkANBhFbHjaiKKQK4R1SRcHWRFADRgIqJKBYY9SoJCZK1IBgoGKMj2ii8lDRJkIAKYjiA5oYRIj4hwQoBHwCfex2r9+ce9zebrelLLP57Zl77pyZc+Y8Zq5rWVYm6RYPANSBGP2Y5NO7kedboSWgB0iBw6BOAvkK7FNO4MI3LXJGLd4B3y98LxPOhw7uRL4ZbAQvglrJocWy8Ppj1WZpcW+BwUA6QQGYKCm3BZnlyHY7WwWGYXUtKNPtPDPMRokv6F2YqwuK8d8acGkHY/0y/5pM1NJ/CBpcEHj+8+BD4qEcmuiaAmHQ5BFoKxDs1W6Ek/38L8a6bdBTFqI9+L8LOg/+blPC7+ZOMA48Df/ZrrkgyXxJmY6+I6GSgWr4Q8Fx+ovARlAD5kjCrYZ/Lf0CcDMYBIaY3GOgJMt87RBnknxx7pEsyi3Hiqeg67DW5+rfmnqhCyaDqezYy9CJvN+mwdvauiE7E/ro6V2QQHsn12fwf2XyheKCT+j7xV/neQ1+LtXtdu5x+n6BBSzEs8yg/3XGHLcj4w1o6FyBpCvLwl/KxGNZaAT9JSwwD1zJhCPgvwrvED6/G1oIFoKPwZdgQmSOfowdAP2x8xhodsVA2iAhW/HxVPoJsFjLTVIOwH+O53WgN1jBmDdNZgyoaT+P6wskjaRVygi8C3pkKIWv3QnoQNP+BgliCYQPkiu+RJ9n4waB7uB3HetkPRZntp6RbFIl3CmSpZGHIB0DLpUhlGdoNj2vZvBDmopJ/OrcqIza4IOykTF5ukj72hG2BhY/4cLqkHDpN3GWOZQh5C28BHwD7rE6v0CzoW3bYcWmt40dnKWG1KuljeYSZ7U3Fo2BhKtr57tmNxn+SigKugr6s6CHI76tA3PpV4Ej4FuVaX3fANZKk9shJ2OhxbGOsqDZbdUtFDknwp+J5tVovIh+Ff0i5TmNl2aefU14iedRWvkCGU//OpN9R0tyoLWgEv4V4A/bse2ZJTpOnP/CQH+klrcpJCLvk3akYuCFXwA+7Q6Yz33JPgpGI9vAAktN7mHwqRYxkUkZ7vDtJzDfjvCQnaoY7SPSW7Kp3f4EKCfygF5AnOa493OTWhLo+T8J/mvQc7UeBPIBz7UWQ+EM4e4WmuePapYFnBUp+ShUYNKY/4d6K+Z0cApu0iAMNOUo3ZqilWCAjdljbqiJBON6lQvUtU28Gw79y07U++EPBXtdqjytQBFJ9xm9sTlcbOZa2lbb83tgL5hm1zdv/Q9Wlp80N77hjY7phjapeANleUp4ykWqV9ewHUyxvs+WndBK5psG3QJ+A6XwW6C7bdx43k+IS2Ob/EhowDk9WDjPg/MlS3XJCJRjBOtJhhUbw98JbsK61dBdBDHx4bbxvIIx/ay6+kPtcmQHxjPuLffp1gjnuXifYZU/doVzP6yO0ea383vG+Ng5CAoiMePd0TfMBtc/cvtqkXQR9pa5WFy3o3XAbOu/AqYbRYmgkBLcy2p/wO8YpJ4JiizdvFX7LD19PVgG7gTH7dkf6xdosIY3JrHY2BPdAX8nGBKx0Efz22HUOn8R+Rn8aQHFQq7UsiAebrWsRbGR9Pvo+SF8M+guas57RevN+mE2/2ZkNrhUSfoIfxCslNza52BG6BK5ynirwHdW1Br0fhDuqlf4JLrcggJ1cT2jw3aZ5N5uw7bhTDjNlPFX8wpwR3hh1QOu0MYmNW2d7qreiKIZcDatCvhPuCcsmMvsC6tnZMwuLfFCxWy9kqVfrrJozkWRfK3zgV5Ql9B/l74/vi+2wGXL5Qjv/DfHM7yrN0XafJjsN+TW9ANVLy4+4GbZ1u+z8uvj4BpwkY0uz6ZA7s27sUUzu0+E212/rLO33qf7Oj4zy5Pps2+DfT01diJRaNVS238CDAAJMxEnQFPLmQAAAABJRU5ErkJggg=="
					
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
            // 更新video 配置
            updateVideoCfg(g_video_size_type,g_video_fps,g_video_qp);
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
        var g_isUploadOnRecording = 0; // 是否边录边传
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
            //正在播放的列表 调showVideoFileList(list)方法;
            showVideoFileList(g_video_filename_list);
            //显示出播放页面  其他页面掩藏
            $(".full_page").css({display:"none"});
            $(".full_page_div").css({display:"none"});
            $(".menu_box").css({display:"none"});
            $(".detail_box").css({display:"block"});

            //创建Medio对象 主
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
            setTimeout(updateVideo,500);
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
            // console.log(g_videoAObj)
            //隐藏主播放页面
            $("#mediaContainer").css({display:"none"});
            //是否单摄像头
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
				g_videoAObj.css({"display":"block","left":"0px","top":"40px","width":"375px","height":"210px"});
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
                    videoBStampContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;//==4
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
        //    console.log(g_mediaObj)
            //获取用户所有摄像头信息 还会列表
            var devices = CRVideo_GetAllVideoInfo(g_userID);
            // console.log(devices);//[Object];
            try{

                if(g_videoAObj && devices.length > 0){
                    //g_videoAObj里面的内置方法setVideo（usrID,videoID）,setVisibleNickName(value);
                    // console.log(g_videoAObj)
                    // console.log(g_userID)
                    // console.log(devices[0]["videoID"])
                    g_videoAObj.setVideo(g_userID,devices[0]["videoID"]);
                    g_videoAObj.setVisibleNickName(false);
                }
                if(g_videoBObj && devices.length > 1){
                    //g_videoBObj里面的内置方法setVideo（usrID,videoID）,setVisibleNickName(value);
                    g_videoBObj.setVideo(g_userID,devices[1]["videoID"]);
                    g_videoBObj.setVisibleNickName(false);
                }

            }catch(e){ }
           
       };
    
       //摄像头状态改变
       //   1会话中设备的所有者ID 2旧状态 3新状态
      CRVideo_VideoStatusChanged.callback = function(userID,oldStatus,newStatus){

          if(g_userID == userID){
            /**视频处于打开状态（软开关）*/          /**向服务器发送打开消息中	*/
              if(newStatus !=CRVideo_VSTATUS.VOPEN && newStatus !=CRVideo_VSTATUS.VOPENING){
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
    
    // 点击设置
    $("#openSetVideoPanel").click(function(){
        openSetVideoPanel()
    })
    //设置摄像头
    function openSetVideoPanel(){
        // 吊 当视频页面隐藏的时候 的方法（）detail里面
            videoContainerHide()
        
        $(".full_page").css({display:"block"});
        $(".full_page_div2").css('display','block');
        //    设置视频和媒体 的方法（）detail里面
           setVideoAndMedia();
   }

    /****
     * 
     * 播放、停止媒体
     */
    //播放媒体
    var g_playbacking = false;  // 是否回放状态
    var g_uploading = false; // 视频是否正在上传
    function video_play(videoName,num){
        // console.log(videoName)
        //如果播放的文件不等于false
       if(g_nowTime_play_num != -1){
            // 如果现在没有播放，则开始播放点击的影音
            $("#videoList"+g_nowTime_play_num+" "+".voice1_item_play").css("display","block");
            $("#videoList"+g_nowTime_play_num+" "+".voice1_item_stop").css('display','none'); 
            $("#videoList"+g_nowTime_play_num+" "+".voice1_item_pause").css('display','none');
        }
            //正在播放影音全局变量变为当前播放的影音编号
        g_nowTime_play_num = num;
            //
        if(g_layout != 'layoutA'){
                // 如果不是A布局则停止播放
                CRVideo_StopPlayMedia();
        }
        g_playbacking = false;
        $('#playbackBtn').html("回放")
        $("#videoList"+num+" "+".voice1_item_play").css("display","none");
        $("#videoList"+num+" "+".voice1_item_stop").css('display','block'); 
        $("#videoList"+num+" "+".voice1_item_pause").css('display','none');

        // 调用布局B
        $(".detail_right_video").css('display','none');

        layoutB();
        //视频是否正在上传
        if(g_uploading == false){
                $(".detail_right_video").css('display','block');
                //更新视频
				updateVideo();
        }
        // 开始播放
		CRVideo_StartPlayMedia(videoName);
      
    }
    //停止播放媒体
    function video_stop(num){
            // 调用A布局
			layoutA();
			$("#videoList"+num+" "+".voice1_item_play").css("display","block");
			$("#videoList"+num+" "+".voice1_item_stop").css('display','none'); 
            $("#videoList"+num+" "+".voice1_item_pause").css('display','none');
            //如果播放的文件没有 改回没有
            g_nowTime_play_num = -1;
            // 没有影音播放，停止媒体播放 (没参数)
			CRVideo_StopPlayMedia();
			
    }
    //恢复播放媒体
    function video_pause_false(num){

        $("#videoList"+num+" "+".voice1_item_play").css("display","none");
        $("#videoList"+num+" "+".voice1_item_stop").css('display','block'); 
        $("#videoList"+num+" "+".voice1_item_pause").css('display','none');
        // 恢复影音播放，true为暂停播放 false为开始部播放
        CRVideo_PausePlayMedia(false);
    }
    //暂停播放媒体
    function video_pause_true(num){
        $("#videoList"+num+" "+".voice1_item_play").css("display","none");
        $("#videoList"+num+" "+".voice1_item_stop").css('display','none'); 
        $("#videoList"+num+" "+".voice1_item_pause").css('display','block'); 
        // 恢复影音播放，true为暂停播放 false为开始部播放
        CRVideo_PausePlayMedia(true);
    }
    //SDK通知影音播放停止 //媒体停止播放通知
    CRVideo_NotifyMediaStop.callback=function(userid){
        // 当停止影音播放时就调用A布局
        $("#list_container").hide();
        $("#full_page_div2").hide();
        $("#full_page_div").hide();
        $("#warning_palyer").hide();
        $("#alert_palyer").hide();
        $("#full_page").hide();
        if(userid == g_userID){
            //是否回放
            g_playbacking = false;
            $('#playbackBtn').html("回放")
            //吊A布局
            layoutA();
            $("#videoList"+g_nowTime_play_num+" "+".voice1_item_play").css("display","block");
            $("#videoList"+g_nowTime_play_num+" "+".voice1_item_stop").css('display','none'); 
            $("#videoList"+g_nowTime_play_num+" "+".voice1_item_pause").css('display','none');
            //更新摄像头
            updateVideo()

        }
    }
    // SDK通知打开影音文件                      影音时长(秒) 宽度 高度 
    CRVideo_NotifyMediaOpened.callback=function(totalTime,width,height){
       
        // C布局且比例为4:3
        if(g_layout =="layoutC" && width/height == 4/3){
            $("#mediaContainer").css({"display":"block","top":"1px","left":"176px","height":"297px"})
            g_mediaObj.width(396);
            g_mediaObj.height(297);
        }
    }

    /**
     * 录制
     * 
     */
     //点击录像录像
     var g_record;  // 录制视频的文件名称
    $("#startRecord").click(function(){
        startRecord()
    })
     //开始录像
    function startRecord(){
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
        // 开始录制           录像存储的路径             录制音频类型./**录制所有*/ ,帧率，建议不要太高；(取值1~24)视频宽度,视频高度,录制的最高码率,目标质量(推荐:36, 中:28,  高:22),录制内容类型,0是否录制的同时上传
        CRVideo_StartRecordIng(g_location_dir+g_record,CRVideo_RECORD_AUDIO_TYPE.REC_AUDIO_TYPE_ALL,g_frameRate,g_recordWidth,g_recordHeight,g_bitRate,22,g_recDataType,g_isUploadOnRecording);
        //回放状态
        g_startRecord = true;
        $("#startRecordCon").css("display","none");
        $("#stopRecordCon").css("display","block");
        //判断是那个布局
        if(g_layout == 'layoutA'){
            layoutA();
        }else if(g_layout == 'layoutB')
        {
            layoutB();
        }else if(g_layout == 'layoutC')
        {
            layoutC();
        }
    }
    //点击停止录制
    $("#stopRecord").click(function(){
        stopRecord()
    })
    //停止录制
    function stopRecord(){
        //停止录制
        CRVideo_StopRecord();
        $("#startRecordCon").css("display","block");
        $("#stopRecordCon").css("display","none");
        // 回放改回
        g_startRecord = false;
    }
    //点击回放
    $("#playbackBtn").click(function(){
        playbackRecord(g_record);
    })
    //回放录像 传入文件
    function playbackRecord(fileName){

        if(g_playbacking){
            // 如果正在回放时点击回放则停止播放
            CRVideo_StopPlayMedia(); 
        }else{
            // 如果文件没有
            if(fileName == null){
                   // 如果回放文件名为空则return
					alertLayer("还没录制");
					return;
            }
            if(g_layout != "layoutA"){
                // 如果布局不为A则停止播放影音
                //调停止播放媒体video_stop(num)
                video_stop(g_nowTime_play_num);
            }
            //该回放状态
            g_playbacking = true;
            // 布局改为C布局
            layoutC();
            $('#playbackBtn').html("停止回放")
            
            //回放视频
            //keepAspectRatio->true: 保持比例不拉伸， false:不保持比例进行拉伸
            g_mediaObj.keepAspectRatio(true);
            //回放视频	
            CRVideo_PlaybackRecordFile(fileName)
        }
        
    }
    /*
      上传
    */
    //点击了上传
    $("#upload").click(function(){
        // console.log(g_record)
        upload(g_record);
    })
    //上传
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
        if($(".list_container").css("display") == "block"){
            
        }
        //掉视频隐藏的方法
        videoContainerHide();
        $(".full_page").css('display','block');
        $(".full_page_div").css('display','block');
        // /上传文件 filename - 文件名，全路径
        CRVideo_UploadRecordFile(fileName);

    }
    //点击了上传里面的取消
    $(".full_page_cancle").click(function(){
        cancle_upload(g_record);
    })
    //点击了上传里面的  x   
    $(".name_del1").click(function(){
        cancle_upload(g_record);
    })
    //取消上传
    function cancle_upload(fileName){

        var fileNameDetail = fileName;
        $(".full_page_div").css('display','none');
        if($(".list_container").css("display") == "block"){
           // 重新展示视频列表
           g_getAll_videfile_list = CRVideo_GetAllRecordFiles();//返回列表数组
        //    调得到视频文件列表（传列表数组）
           getAllVideoList(g_getAll_videfile_list)
        }else{
            // 容器显示视频
            videoContainerShow();
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

            $(".full_page").css('display','none');
        }else{

            $(".full_page").css('display','block');
        }
        
    }
    // sdk通知录制文件状态更改 fileName本地文件路径 state - 状态 0 未上传 1 上传中 2已上传
    CRVideo_NotifyRecordFileStateChanged.callback=function(fileName,state){

        $("#file_name").html(fileName);
        if(state ==2 ){
            $('#upload_status').html("上传完成");
            $("#percent_item").css("width","100%");
            $("#upload_num_percert").html("100%");
            $('.full_page_cancle').html("确定");
            $(".full_page_submit").css("display","inline-block");
            //是否在上传
            g_uploading = false;
        }else if(state == 1){
            $(".full_page_submit").css("display","none");
            $('#upload_status').html("上传中...");
            $('.full_page_cancle').html("取消上传");
        }else if(state == 0 && g_uploading){
            $(".full_page_submit").css("display","none");
            $('#upload_status').html("准备上传...");
            $('.full_page_cancle').html("取消上传");
            $("#percent_item").css("width","0");
        }
    }
    // 通知录制文件上传进度 fileName - 文件名 percent - 进度0-100
    CRVideo_NotifyRecordFileUploadProgress.callback = function(fileName,percent){

        $(".full_page_submit").css("display","none");
        $("#percent_item").css("width",percent+"%");
        $("#upload_num_percert").html(percent + "%");

    }

    // 上传文件失败通知 fileName - 本地文件路径 sdkErr - 操作失败代码,定义见cr/error
    CRVideo_UploadRecordFileErr.callback=function(fileName,sdkErr){
        $('#upload_status').html("上传失败")
        $('.full_page_cancle').html("确定")
        //是否在上传
        g_uploading = false;
    }



    var video_size_arr=[[0,0,0],[144,80,56],[224,128,72],[288,160,100],[336,192,150],[448,256,200],[512,288,250],[576,320,300],[640,360,350],[720,400,420],[848,480,500],[1024,576,650],[1280,720,1000],[1920,1080,2000]];
    
    //更新video配置
    function updateVideoCfg(sizeType,fps,qp){
        var cfg = {};
        cfg.sizeType = sizeType;

        var fps = parseInt($("frame_input").val());
        if(fps<5){
            fps = 5;
        }else if(fps >20){
           fps = 20;
        }
        cfg.fps = fps;
        cfg.maxbps = video_size_arr[sizeType][2]*1000;
        if(qp == 1){
            cfg.qp_min = 22
            cfg.qp_max = 36
        }else if(qp == 0){
            cfg.qp_min = 22
            cfg.qp_max = 25
        }
        // 系统视频参数设置 cfg - 设置参数
        CRVideo_SetVideoCfg(cfg);
        
        // 配置远程影音共享时，图像质量参数 jsonCfg - json格式的字符串，详见VideoCfgOjb说明
        CRVideo_SetMediacfg(cfg);
    }

   /**
    *  设置
    */
    // 点击设置的确定
    var g_video_size_type = 8; 
    var g_first_set_video_and_med = true;
    var g_video_fps = 15
    var g_video_qp = 0;
    $(".full_page_submit2").click(function(){
        setSubmit();
    })
    function setSubmit(){
        $(".full_page").css('display','none');
        $(".full_page_div2").css('display','none');
        if($(".list_container").css("display") == "block"){
        }else{
            //显示视频容器
            videoContainerShow()
            //更新视频
            updateVideo();
        }
        g_FURate = $("#fuRate").val()*1024;
        g_bitRate = $("#bitRate").val() * 1000;
        g_frameRate = $("#frameRate").val();
        g_recDataType = $("input[name='recDataType'][checked]").val();
        g_isUploadOnRecording = $("input[name='recUpType'][checked]").val();
        var recordWH = $("#recordWH").val();
        if(recordWH == 1){
            // 录制视频的宽度
            g_recordWidth = 640;
            // 录制视频的高度
            g_recordHeight = 360;
        }else if(recordWH == 2){
            // 录制视频的宽度
            g_recordWidth = 848;
            // 录制视频的高度
            g_recordHeight = 480;
        }else if(recordWH == 3){
            // 录制视频的宽度
            g_recordWidth = 1280;
            // 录制视频的高度
            g_recordHeight = 720;
        }else if(recordWH == 4){
            // 录制视频的宽度
            g_recordWidth = 1920;
            // 录制视频的高度
            g_recordHeight = 1080;
        }else if(recordWH == 5){
            // 录制视频的宽度
            g_recordWidth = 640;
            // 录制视频的高度
            g_recordHeight = 480;
        }
        // 文件上传的流量控制(SDK默认不开启流控,目前对文件上传控制的功能有：录制文件上传、网盘文件上传。)
        // maxbps - 每秒上传的最大字节数，小于等于0表示不开启流控
        CRVideo_SetFileUploadRate(g_FURate);
        g_video_size_type = $("#size_select").val();
        g_video_fps =  $("#frame_input").val();
        g_video_qp = $("input[name='meet_yx']:checked").val();
        updateVideoCfg(parseInt(g_video_size_type),parseInt(g_video_fps),parseInt(g_video_qp));
    }
    //点击了设置里(取消 - X ) 
    $(".full_page_cancle2").click(function(){
        setCancle()
    })
    $(".name_min2").click(function(){
        setCancle()
    })
    $(".name_del2").click(function(){
        setCancle()
    })
    // 设置取消
    function setCancle(){
        $(".full_page").css('display','none');
        $(".full_page_div2").css('display','none');
        if($(".list_container").css("display") == "block"){
        }else{
            //视频容器显示
            videoContainerShow();
            //更新视频
            updateVideo();
        }
        $("#fuRate").val(g_FURate/1024);
        $("#bitRate").val(g_bitRate/1000) ;
        $("#frameRate").val(g_frameRate);
        $("input[name='recDataType'][value="+ g_recDataType+"]").attr("checked",true);

        if(g_recordHeight == 360) {

            var recordWH = $("#recordWH").val(1);

        }else if(g_recordHeight == 480){

            if(g_recordWidth == 640) {

                var recordWH = $("#recordWH").val(5);
            }else {

                var recordWH = $("#recordWH").val(2);
            }
            
        }else if(g_recordHeight == 720){

            var recordWH = $("#recordWH").val(3);

        }else if(g_recordHeight == 1080){

            var recordWH = $("#recordWH").val(4);
        }

    }

  
  	// 正在播放的列表
      function showVideoFileList(list){
        if(list && list != "" && list != null){
            var listLength = list.length;
            var str = "";
            var listI;
            
            for(var i=0;i< listLength; i++){
                var listname = list[i].split("Media/")[1];
                listI = list[i];
            //     console.log(list)
            //    console.log(list[i])
            //    console.log(i)
                str += "<li id='videoList"+ i +"'>"
                    +	"<span class='detail_right_voice1_item_name'>" + listname +"</span>"
                    +	"<span class='detail_right_voice1_item_img'>"
                    +		"<div class='voice1_item_play'>"
                    +		"<img src='image/icon_04.png' />"
                //  +    "<img src='image/icon_04.png' onclick='video_play(\""+list[i]+"\","+i+")'/>"
                    +		"</div>"
                    +		"<div class='voice1_item_stop' style='display:none'>"
                    +			"<img src='image/icon_02.png' id='video_pause_true'/>"
                    +			"<img src='image/icon_03.png' id='video_stop'/>"
                    +		"</div>"
                    +		"<div class='voice1_item_pause' style='display:none'>"
                    +			"<img src='image/icon_04.png' id='video_pause_false'/>"
                    +			"<img src='image/icon_03.png' id='video_stop'/>"
                    +		"</div>"
                    +	"</span>"
                    +"</li>"
               
            }
            str += "<div style='height:0;clear:both;'></div>"
            $("#detail_video_lists").append(str);
            // 点击风险告知与提醒 里面的播放 暂停 再次开始
            $(".voice1_item_play img").map(function(index,item){
                $(this).click(function(){
                    // console.log(index)//0
                    // console.log(listI)//C:/Users/admin/Desktop/git/demo1/examples/RecordDemo(web)/home/Media/风险提示1.mp4
                    video_play(listI,index)
                })
            });
           
            $(".voice1_item_stop #video_pause_true").map(function(index){
                $(this).click(function(){
                    video_pause_true(index)
                })
            });
            $(".voice1_item_stop #video_stop").map(function(index){
                $(this).click(function(){
                    video_stop(index)
                })
            });
            $(".voice1_item_pause #video_pause_false").map(function(index){
                $(this).click(function(){
                    video_pause_false(index)
                })
            });
            $(".voice1_item_pause #video_stop").map(function(index){
                $(this).click(function(){
                    video_stop(index)
                })
            });
        }
    }
    // 回放list table中的视频
    function playbackList(i){
        // 弹出层隐藏 并开始回放
        var fileName = $("#fileName"+ i).text();
        //关闭列表的方法
        closelistPage();
        if(g_playbacking)
        {
            // 停止播放影音
            CRVideo_StopPlayMedia();
        }
        playbackRecord(fileName);

        //显示视频容器
        videoContainerShow();
        // 更新视频
        updateVideo();
    }
    // tableList 中的删除事件
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








     // 点击了录制文件管理
    $("#showAllList").click(function(){
        showAllList()
    }); 

       // 点击显示列表
        function showAllList(){
            //显示所有的播放文件 还回数组
            g_getAll_videfile_list = CRVideo_GetAllRecordFiles();
            
            getAllVideoList(g_getAll_videfile_list);
            $(".full_page").css("display","block");
            $(".list_container").css("display","block");
            //当视频页面隐藏的时候 
            videoContainerHide()
        }

        // 得到视频文件列表（传列表数组）
        function getAllVideoList(list){
            //$("#table_list_container").remove(".list_all_items")
            $(".list_all_items").remove();
            if(list && list != "" && list != null){
                var listLength = list.length;
                var str = "",str1="";
                for(var i=0;i< listLength; i++){
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
                    // console.log(777)
                    $(this).click(function(){
                        // console.log(index)
                        deleteFile(index);
                    })
                })
                //点击了上传
                $("#table_list_container #uploadFile").map(function(index){
                    // console.log(888)
                    $(this).click(function(){
                        // console.log(index)
                        uploadFile(index);
                    })
                })
                 //点击了回放
                 $("#table_list_container #playbackList").map(function(index){
                    // console.log(999)
                    $(this).click(function(){
                        // console.log(index)
                        playbackList(index);
                    })
                })

            }

        }
        //点击了录制文件管理里面的X
        $(".list_name_del").click(function(){
            closelistPage()
        })

        // 关闭列表页 
        function closelistPage(){
            $(".full_page").css({"display":"none"});
            $(".list_container").css({"display":"none"});
            if(g_uploading == false)
            {   //当视频页面隐藏的时候 
                videoContainerShow();
                //跟新视频
                updateVideo();
            }
        }
        //点击了单摄像头
        $("#changeSingle").click(function(){
            changeSingle()
        });
        // 换为单摄像头
        function changeSingle()
        {
            if(g_single_video)
                return
            g_single_video = true;
            if(g_layout == 'layoutA') {
                layoutA();
            }
            else if(g_layout == 'layoutB') {
                layoutB();
            }
            // 跟新视频
            updateVideo();
        }
        //点击了双色相头
        $("#changeDouble").click(function(){
            changeDouble();
        })
        // 换为双摄像头
        function changeDouble(){
            if(!g_single_video)
                return
            g_single_video = false
            if(g_layout == 'layoutA')
                layoutA();
            else if(g_layout == 'layoutB')
                layoutB();
                //跟新视频
            updateVideo();
        }
        //decimal 
        // 十进制的 
        function decimal(num,v){
            var vv = Math.pow(10,v);
            return Math.round(num*vv)/vv;
        }
        var  videoOperateBtn = 	"关闭";
                var  micOperateBtn = "关闭";
        // 设置视频和媒体
        function setVideoAndMedia(){
            $("input[name='meet_yx'][value="+ g_video_qp+"]").attr("checked",true);
            $("#size_select").val(g_video_size_type)
            $("#frame_input").val(g_video_fps)
        //获取音频参数 {CRVideo_AudioCfg} 返回cfg对象
            var audioCfg = CRVideo_GetAudioCfg();
            // 获取系统上的麦克风设备列表// {string[]} 返回麦克风设备字符串列表
            var micArr = CRVideo_GetAudioMicNames();
            
            var micArrOptionsStr = "";
            
            if(g_first_set_video_and_med){
		for(var i = 0;i<micArr.length;i++){
			if(audioCfg.micName == micArr[i]){
				micArrOptionsStr += "<option value=\""+micArr[i]+"\" selected=\"true\">"+micArr[i]+"</option>"
			}else{
				micArrOptionsStr += "<option value=\""+micArr[i]+"\" >"+micArr[i]+"</option>"
			}
		}
		micArrOptionsStr = "<option value=\"\" >默认设备</option>" + micArrOptionsStr
		$(micArrOptionsStr).appendTo("#mic_select");
    }
    // 获取系统上的扬声器设备列表
    // * @access public
    // * @returns {string[]} 返回扬声器设备列表
	
	var spkerArr =CRVideo_GetAudioSpkNames();
	var spkerArrOptionsStr = "";
	if(g_first_set_video_and_med){
		for(var i = 0;i<spkerArr.length;i++){
			if(audioCfg.speakerName == spkerArr[i]){
				spkerArrOptionsStr += "<option value=\""+spkerArr[i]+"\" selected=\"true\">"+spkerArr[i]+"</option>"
			}else{
				spkerArrOptionsStr += "<option value=\""+spkerArr[i]+"\" >"+spkerArr[i]+"</option>"
			}
		}
		spkerArrOptionsStr = "<option value=\"\" >默认设备</option>" + spkerArrOptionsStr
		$(spkerArrOptionsStr).appendTo("#spker_select")
    }
    // * 获取指定用户的默认摄像头
    // * 如果用户没有摄像头，返回0； userID - 用户ID 还回摄像头ID
    var videoID = CRVideo_GetDefaultVideo(g_userID)
    // 获取用户所有的摄像头信息 userID @returns {CRVideo_VideoDeviceInfo[]} 返回设备列表
	var videoList = CRVideo_GetAllVideoInfo(g_userID);
	var videoListOptionsStr = "";
	if(g_first_set_video_and_med){
		for(var i = 0;i < videoList.length;i++){
			var item = videoList[i];
			if(videoID == item.videoID){
				videoListOptionsStr += "<option value=\""+item.videoID+"\" selected=\"true\">"+item.videoName+"</option>"
			}else{
				videoListOptionsStr += "<option value=\""+item.videoID+"\" >"+item.videoName+"</option>"
			}
		}
		videoListOptionsStr = "<option value=\"-1\" >默认设备</option>" + videoListOptionsStr
		$(videoListOptionsStr).appendTo("#video_select")
    }
    
	$("#video_operate_btn").click(function(){
        // * 获取用户的摄像头状态
        // * @access public
        // * @param {string} userID - 用户ID
        // * @returns {CRVideo_VSTATUS} 麦克风摄像头状态
		var vStatus = CRVideo_GetVideoStatus(g_userID);
		if(vStatus == 0){
			this.popup("没有可打开的视频设备")

		}else if(vStatus ==  2){
            //打开用户的摄像头，以便本地、远端显示视频图像
			CRVideo_OpenVideo(g_userID);
			$("#video_operate_btn").text("关闭");
			videoOperateBtn = "关闭";
		}else {
            // 关闭用户的摄像头
			CRVideo_CloseVideo(g_userID);
			$("#video_operate_btn").text("打开");
			videoOperateBtn = "打开";
		}
	})

	$("#mic_operate_btn").click(function(){
        // * 获取用户的麦状态
		var aStatus = CRVideo_GetAudioStatus(g_userID);
		if(aStatus == 0){
			this.popup("没有可打开的音频设备")


		}else if(aStatus ==  2){
            // * 打开自己的麦克风
            // * 打开自已的麦克风时，先会进入到AOPENING状态，等服务器处理后才会进入AOPEN状态，此时说话才能被采集到；
			CRVideo_OpenMic(g_userID);
			$("#mic_operate_btn").text("关闭");
			micOperateBtn = "关闭";
		}else{
            // 关闭自己的麦克风
            // * 关麦操作是立即生效的，本地会立即停止采集；
			CRVideo_CloseMic(g_userID);
			$("#mic_operate_btn").text("打开");
			micOperateBtn = "打开";

		}
    })
    
	$("#video_select").change(function(){
        // 设置默认的摄像头
        // * @access public
        // * @param {string} userID - 用户ID
        // * @param {number} videoID - 摄像头ID
		CRVideo_SetDefaultVideo(g_userID,$("#video_select").val());
	});
	$("#spker_select").change(function(){
		var cfg = {};
		cfg.micName = $("#mic_select").val();
		cfg.speakerName = $("#spker_select").val();
		cfg.privAgc = 0;
        cfg.privEC = 0;
        // 系统音频参数设置
		CRVideo_SetAudioCfg(cfg);
	});
	$("#mic_select").change(function(){
		var cfg = {};
		cfg.micName = $("#mic_select").val();
		cfg.speakerName = $("#spker_select").val();
		cfg.privAgc = 0;
        cfg.privEC = 0;
        //系统音频参数设置
		CRVideo_SetAudioCfg(cfg);
	});
	g_first_set_video_and_med = false;
}

    //  如果是有媒体存在时，展示三个元素 layoutA时没有媒体 g_single_video只有一个摄像头
    function mediaBlockHide(){
        if(g_single_video){
            g_mediaObj.width(1);
            g_mediaObj.height(1);
            g_videoAObj.width(1);
            g_videoAObj.height(1);
        }else{
            g_mediaObj.width(1);
            g_mediaObj.height(1);
            g_videoAObj.width(1);
            g_videoAObj.height(1);
            g_videoBObj.width(1);
            g_videoBObj.height(1);
        }
    }
    // 如果是有媒体存在需要隐藏对应的三个元素
    //当变化布局时就需要重新变化即可
    function recordObjHide(){
        if(g_single_video){
            g_mediaObj.width(1);
            g_mediaObj.height(1);
        }else{
            g_mediaObj.width(1);
            g_mediaObj.height(1);
        }
    }
    //当视频页面隐藏的时候 
    function videoContainerHide(){
        if(g_layout == "layoutA"){
            $(".detail_right_video").css('display','none');
        }else if(g_layout == "layoutB"){
            mediaBlockHide()
        }else if(g_layout == "layoutC"){
            recordObjHide();
        }
    }
    // 容器显示视频
    function videoContainerShow(){
        if(g_layout == "layoutA"){
            $(".detail_right_video").css('display','block');
            layoutA();
        }else if(g_layout == "layoutB"){
            $(".detail_right_video").css('display','block');
            layoutB();
        }else if(g_layout == "layoutC"){
            $(".detail_right_video").css('display','block');
            layoutC();
        }
    }

            // 弹出层封装
        function alertLayer(msg){
            $(".alert_label_detail").text(msg);
            $(".full_page").css("display","block");
            $(".alert_palyer").css("display","block");
            $(".detail_right_video").css('display','none');
        }
        
        //  点击弹出层的确定 x
        $(".alert_name_del").click(function(){
            closeAlert()
        })
        $(".alertr_page_commit").click(function(){
            closeAlert()
        })

        // 关闭alert弹层
        function closeAlert(){
            $(".alert_label_detail").text(" ");
            $(".full_page").css("display","none");
            $(".alert_palyer").css("display","none");
            if($(".list_container").css("display") == "block" || $(".full_page_div2").css("display") == "block" || $(".warning_palyer").css("display") == "block" || $(".full_page_div").css("display") == "block"){

            }else{
                $(".detail_right_video").css('display','block');
                updateVideo();
            }
        } 
        $(".radio_contain .radio_label").map(function(index){
            $(this).click(function(){
                choseMeetYx(index+1)
            })
        })

        function choseMeetYx(num){
            if(num == "0"){
                $("input[name='meet_yx']").eq(1).attr("checked",false);
                $("input[name='meet_yx']").eq(0).attr("checked",true);
            }else if(num == "1"){
                $("input[name='meet_yx']").eq(0).attr("checked",false);
                $("input[name='meet_yx']").eq(1).attr("checked",true);
            }
            //alert($("input[name='meet_yx']:checked").val())
        }
  
 
})