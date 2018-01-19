<!-- 集成指南 -->
# <font color="#2674ba">SDK集成指南 </font> {#IntegratedGuide}

>为开发者集成音视频会话及相关高级功能提供相关指导，以下均为 js 代码，详细代码请参考 Examples 目录下 Demo 源代码。

    文档中“会议”和“会话”含义等同。

##开始音视频会话 {#startMeeting}

> 快速创建并进入一个简单的音视频会话；
>
> 请先准备[说明]中的相关内容：1.[安装视频SDK插件](Explain.md#install), 2.[运行环境要求](Explain.md#runEvn), 3.[开发环境配置](Explain.md#developEvn)以及连接相关的麦克风摄像头并确认设备工作正常。

基本步骤如下：

1. [初始化SDK](#init)
1. [登录连接视频服务器](#login)
1. [创建视频会话](#create)
1. [进入会话](#enter)
1. [打开麦克风/摄像头](#audio)
1. [有其他人进入会话](#userEnter)
1. [退出会话](#exit)
1. [注销登陆](#logout)

### 1. [初始化SDK]{#init}

> 初始化是整个SDK的使用基础，通常在程序启动的时候进行初始化([init](BaseInterface.md#init))，退出的时候进行反初始化([uninit](BaseInterface.md#init))，整个程序的生命周期中只进行一次初始化和反初始化。
>
> 相关API参考请见 [初始化/反初始化](BaseInterface.md#init)

    SDK内部的组件多为单例组件，整个程序中只能有一个实例，比如“基础组件”，“会议管理组件”，“视频会议组件”，具体请参见各个组件说明。

    {
        //初始化
        //"CLOUDROOM"为向云屋科技申请的代理商ID
        //g_location_dir为路径
        var init = CRVideo_Init("CLOUDROOM", g_location_dir);
        

        //确定初始化
        g_init=true;

        //初始化失败会返回对应的错误码
        if(init == CRVideo_WEB_OCX_NOTINSTALLED){
            
            alertLayer("ocx未安装");
            
        }else if(init == CRVideo_OCX_VERSION_NOTUPPORTED){

            alertLayer("不支持的浏览器");

        }else if(init == CRVideo_WEB_BROWER_NOTUPPORTED){

            alertLayer("不支持的插件版本");

        }else if(init != 0){

            alertLayer("CRVideo_init sdkErr"+"出错了"+init);
        }

    }

### 2. [登录连接视频服务器]{#login}

> 设置视频服务器地址，使用云屋授权账号和自定义用户编号登录
>
> 相关API请参考 [服务器地址](BaseInterface.md#serverAddr)，[登录/注销](MeetingMrg.md#login)

    {     
        //服务器名字
        g_serverName = $("#server_name").val()

        //账号
        cr_account= $("#login_cpyname").val() ||"demo@cloudroom.com";

        //md5加密
        cr_psw = md5($("#login_psd").val()) || "e10adc3949ba59abbe56e057f20f883e";

        //昵称
        g_nickname = uuid(32,16)

        //自定义账号
        g_userID = uuid(32,16)

        //设置服务器地址
        CRVideo_SetServerAddr(g_serverName)

        //登录     
        CRVideo_Login(cr_account, cr_psw, g_nickname, g_userID, "")

         //登陆成功 操作成功则回调CRVideo_LoginSuccess,
        CRVideo_LoginSuccess.callback = function(userID,cookie){

            //登录成功，开始创建视频会话，见下一步
        }
         //登录失败 失败则回调CRVideo_LoginFail
        CRVideo_LoginFail.callback = function(sdkErr,cookie){
            
            //登录出错，可以弹出错误提示，或调用登录接口再次重试登录
        }
    }

### 3. [创建视频会话] {#create}

> 输入会议标题，创建一个没有密码的视频会话
>
> 相关API请参考 [创建/销毁视频会议](MeetingMrg.md#createMeeting)

    {
        //创建会议
         CRVideo_CreateMeeting("会议的的主题长度50字内")

        //创建会议成功
        CRVideo_CreateMeetingSuccess.callback=function(meetObj,cookie){
            

        }

        //创建会议失败
        CRVideo_CreateMeetingFail.callback = function(sdkErr,cookie){
            
        }

        //监控会议掉线
        CRVideo_MeetingDropped.callback=function(){
            
        }

        //会议掉线
        CRVideo_LineOff.callback=function(sdkErr){
        
        }
    }

### 4. [进入会话]{#enter}

> 用创建成功的会话信息（会议ID和密码）进入会话，其他用户也是利用此会话信息进入该会话。
>
> 相关API请参考 [进入/退出/结束会议](VideoMeeting.md#enterMeeting)

      {  
          //进入会议
          //1.会议id 2.会议密码 3.用户id 4.用户昵称
         CRVideo_EnterMeeting(g_meetingId,g_meetingPsw,g_userID,g_nickname)
         
         //进入会议完成响应
         CRVideo_EnterMeetingRslt.callback=function(sdkErr){
            // CRVideo_NOERR==没有错误 成功
           if(sdkErr == CRVideo_NOERR){
            // * 暂未定义  1* @param {string} picID -  2 * @param {object} jsonval - 
            CRVideo_SetPicResource(g_logo_id,{
                //资源格式， 可取值："yuv420p"，"rgb32"，"picfile"，"picdat"
                "fmt":"picdat",
                // fmt为"yuv420p"时： dat存放的是base64(yuv420p数据)；
                // fmt为"rgb32"时： dat存放的是base64(rgb32数据)；
                // fmt为"picfile"时： dat存放的是“本地文件名”；
				"dat":"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"
					
            });
      }

### 5. [打开麦克风/摄像头]{#audio}

> 进入会话成功后，配置并打开自己的麦克风和摄像头
>
> 相关API请参考 [麦克风/扬声器列表](VideoMeeting.md#getAudioMicNames)，[麦克风设置](VideoMeeting.md#getAudioCfg)，[摄像头设备列表](VideoMeeting.md#getAllVideoInfo)，[视频设置](VideoMeeting.md#setVideoCfg)，[会议内可观看摄像头列表](meeting.md#getWatchableVideos)，[开/关摄像头](VideoMeeting.md#openVideo)，[视频状态](VideoMeeting.md#getVideoStatus)，[获取/设置默认视频](VideoMeeting.md#setDefaultVideo)，[成员视频UI显示组件](VideoUi.md#videoui)  
> 相关结构定义请参考 [音频配置](ObjectstructureDing.md#AudioCfgObj)，[用户视频信息](ObjectstructureDing.md#VideoInfoObj)，[用户视频信息列表](ObjectstructureDing.md#VideoInfosObj)

    {
        CRVideo_SetEnableMutiVideo(g_userID,true);   // 是否可以打开更多的摄像头 传用户ID，bool
        CRVideo_OpenMic(g_userID)  //打开麦克风 传用户ID

        // 获取系统上的麦克风设备列表// {string[]} 返回麦克风设备字符串列表
        var micArr = CRVideo_GetAudioMicNames();

        //获取音频参数 {CRVideo_AudioCfg} 返回cfg对象
        var audioCfg = CRVideo_GetAudioCfg();

        var micArrOptionsStr = "";

        for(var i = 0;i<micArr.length;i++){
			if(audioCfg.micName == micArr[i]){
				micArrOptionsStr += "<option value=\""+micArr[i]+"\" selected=\"true\">"+micArr[i]+"</option>"
			}else{
				micArrOptionsStr += "<option value=\""+micArr[i]+"\" >"+micArr[i]+"</option>"
			}
		}
		micArrOptionsStr = "<option value=\"\" >默认设备</option>" + micArrOptionsStr
		$(micArrOptionsStr).appendTo("#mic_select");

        // 获取系统上的扬声器设备列表
        // * @access public
        // * @returns {string[]} 返回扬声器设备列表
        var spkerArr =CRVideo_GetAudioSpkNames()
        
        var spkerArrOptionsStr = "";
        for(var i = 0;i<spkerArr.length;i++){
			if(audioCfg.speakerName == spkerArr[i]){
				spkerArrOptionsStr += "<option value=\""+spkerArr[i]+"\" selected=\"true\">"+spkerArr[i]+"</option>"
			}else{
				spkerArrOptionsStr += "<option value=\""+spkerArr[i]+"\" >"+spkerArr[i]+"</option>"
			}
		}
		spkerArrOptionsStr = "<option value=\"\" >默认设备</option>" + spkerArrOptionsStr
		$(spkerArrOptionsStr).appendTo("#spker_select")

        // 设置默认的摄像头
        // * @access public
        // * @param {string} userID - 用户ID
        // * @param {number} videoID - 摄像头ID
		CRVideo_SetDefaultVideo(g_userID,$("#video_select").val())

        // 获取用户所有的摄像头信息 userID @returns {CRVideo_VideoDeviceInfo[]} 返回设备列表
	    var videoList = CRVideo_GetAllVideoInfo(g_userID)

        
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

        //打开用户的摄像头，以便本地、远端显示视频图像
		CRVideo_OpenVideo(g_userID)

        // * 获取用户的摄像头状态
        // * @access public
        // * @param {string} userID - 用户ID
        // * @returns {CRVideo_VSTATUS} 麦克风摄像头状态
		var vStatus = CRVideo_GetVideoStatus(g_userID)
        if(vStatus == 0){
			this.popup("没有可打开的视频设备")

		}else if(vStatus ==  2){
            //打开用户的摄像头，以便本地、远端显示视频图像
			CRVideo_OpenVideo(g_userID);
			
		}else {
            // 关闭用户的摄像头
			CRVideo_CloseVideo(g_userID);
		
		}

    }

### 6. [有其他人进入会话]{#userEnter}

> 其他人入会的步骤也是上述的[4、5]步，拿到会议信息后进入到他人创建的会议，此步骤的目的是为了实时关注比自己晚进来的人并刷新摄像头画面显示；如果想要获取之前进来的人，可以调用 [getAllMembers](VideoMeeting.md#getAllMembers) 获取会议成员列表，也可以调用 [getWatchableVideos](VideoMeeting.md#getWatchableVideos) 获取所有可以观看的摄像头列表进行加载。
>
> 用[成员视频UI显示组件](VideoUi.md#videoui)创建多个视频窗口，来显示进入会议内的成员。
>
> 相关API请参考 [有人进入/离开会议通知](VideoMeeting.md#userEnterMeeting)，[成员视频UI显示组件](VideoUi.md#videoui)，[会议内可观看摄像头列表](VideoMeeting.md#getWatchableVideos)  
> 相关结构定义请参考 [用户视频信息列表](ObjectstructureDing.md#VideoInfoObjs)

    {
        * 获取会议内所有可观看的摄像头
        * 只有摄像头打开才能被获取到,能获取到自已的和会议里其他人的；
        * @access public
        * @returns {CRVideo_VideoIDsObj[]} 对象VideoIDArray
        */
         var  videoArr = CRVideo_GetWatchableVideos()

        * 获取所有用户的信息
        * @access public
        * @return {CRVideo_MemberInfo[]} 返回含多个成员信息
        */	
        var meber = $.parseJSON(CRVideo_GetAllMembers());// 获取所有会员信息

        //用户进入会议  相当于第二方监听第三方加入会议
			CRVideo_UserEnterMeeting.callback = function(usrID){
                第三方进入的相关操作
            }

        // 通知某用户离开了会议exitMeeting
			CRVideo_UserLeftMeeting.callback = function(id){

                //第三方离开的相关操作
            }
            
> **至此，一个简单的音视频会话就建立起来了。**       

### 7. [退出会话]{#exit}

### 7.退出会话 {#exit}

> 在未注销的情况下可反复的进入退出同一个会议。
>
> 相关API请参考 [进入/退出/结束会议](VideoMeeting.md#enterMeeting)

    {
      /**
	 * 离开会话
	 * 他人离开会话的回调事件CRVideo_UserLeftMeeting
	 * @access public
	 */	
	  CRVideo_ExitMeeting()
      
     * 某用户离开了会议
	 * @callback CRVideo.CbProxy~CRVideo_UserLeftMeeting
	 * @param {number} id - 离开会议的用户ID
	 */
      CRVideo_UserLeftMeeting.callback=function(用户ID){
           
      }
        
    }

### 8. [注销登陆]{#logout}

> 可重复的登录和注销。
>
> 相关API请参考 [进入/退出/结束会议](VideoMeeting.md#enterMeeting)，[登录/注销](MeetingMrg.md#login)，[初始化/反初始化](BaseInterface.md#init)

    {
        //注销本次登陆
        CRVideo_Logout()
    }

### 9.反初始化，退出SDK {#uninit}

> 执行反初始化后SDK功能不再可用。
>
> 相关API请参考 [初始化/反初始化](cloudroomsdk.md#init)

     {
        //反初始化
        CRVideo_Uninit();
    }

## 添加音视频会话功能 {#add}

> 添加会议内的高级功能

### 音视频控制 {#AVSet}

> 进入会话后实现设备的加载、选择、设置
>
> 1. [开关麦克风](#openMic)
> 1. [监控麦克风状态变化](#audioStatusChanged)
> 1. [设置麦克风和扬声器音量](#Volume)
> 1. [监控麦克风声音大小变化](#micEnergyUpdate)

#### 1.开关麦克风 {#openMic}

    通过传入参数来控制开关的对象，如果是本地机器上的麦克风，需要传入自己的ID，如果要远程开关他人麦克风，则传入对方的ID

* 相关API请参考 [麦克风、扬声器设备的获取](#audio)，[开/关麦克风](VideoMeeting.md#openMic)

```cs
    /**
	 * 打开自己的麦克风
	 * 打开自已的麦克风时，先会进入到AOPENING状态，等服务器处理后才会进入AOPEN状态，此时说话才能被采集到；
	 * @param {string} userID - 用户的ID
	 * @access public
	 */
	CRVideo_OpenMic(userid);
```

```cs
    /**
	 * 关闭自己的麦克风
	 * 关麦操作是立即生效的，本地会立即停止采集；
	 * @access public
	 * @param {string} userID - 登录成功后分配的userID
	 */
	CRVideo_CloseMic(userid);
```

#### 2.监控麦克风状态变化 {#audioStatusChanged}

    1. 开关自己或他人的的麦克风都会收到该回调函数
    2. 自己的麦克风被他人开关也会收到该回调函数
    3. 也可主动获取麦克风状态，一般用于各种判断

* 相关API请参考 [麦克风状态变化](VideoMeeting.md#audioStatusChanged)  
* 相关结构定义请参考 [麦克风状态](Constant.md#ASTATUS)

```cs
//连接状态变化委托
 //摄像头列表更新 通知用户的视频设备有变化	
    CRVideo_VideoDevChanged.callback =function(userID){
       
    }
```

```cs
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
       /* 视频状态
	   * @enum { number }
	   */
        CRVideo_VSTATUS = 
        {
		/**视频状态未知*/
		VUNKNOWN:0,
		/**没有视频设备*/
		VNULL:1,
		/**视频处于关闭状态（软开关）*/
		VCLOSE:2,
		/**视频处于打开状态（软开关）*/
		VOPEN:3,
		/**向服务器发送打开消息中	*/
		VOPENING:4,
	}
```

#### 3.设置麦克风和扬声器音量 {#Volume}

* 相关API请参考 [麦克风音量](VideoMeeting.md#micVolume),[扬声器音量](VideoMeeting.md#speakerVolume)

````cs
     /**
	 * 设置麦克风音量大小
	 * @access public
	 * @param {number} level - 音量等级（ 取值范围：0~255）
	 * @returns {bool} 设置成功则返回true,否则返回false
	 */
	var SetMicVolume = CRVideo_SetMicVolume(level)

    /**
	 * 设置本地扬声器音量
	 * @access public
	 * @param {number} level - 音量等级（ 取值范围：0~255）
	 * @returns {bool} 设置成功则返回true,否则返回false
	 */
	var SetSpeakerVolume = CRVideo_SetSpeakerVolume(value)
````

#### 4.监控麦克风声音变化 {#micEnergyUpdate}

    可用来实时展示当前麦克风采集到声音的大小

* 相关API请参考 [麦克风声音变化](VideoMeeting.md#micEnergyUpdate)

```cs
     //麦克风音量波动
     /**
	 * SDK通知用户的说话声音强度更新
	 * @callback CRVideo.CbProxy~CRVideo_MicEnergyUpdate
	 * @param {string} userID - 用户ID
	 * @param {number} oldLevel - 原来的说话声音强度
	 * @param {number} newLevel - 现在的说话声音强度
	 */
     CRVideo_MicEnergyUpdate.callback=function(userID ,oldLevel,newLevel){
       
     }
```

### 录制 {#record}

> 实现摄像头和屏幕录制，并可上传到服务器
>
> 1. [录制内容配置](#setRecordVideos)
> 1. [开始、停止录制](#startRecording)
> 1. [录制文件的大小、时长、状态](#getRecFileSize)
> 1. [设置录制文件是否加密](#setRecordFileEncrypt)
> 1. [录制文件列表](#getAllRecordFiles)
> 1. [录制文件列表添加、删除文件](#addFileToRecordMgr)
> 1. [上传、取消上传录制文件](#uploadRecordFile)
> 1. [回放录制文件](#playbackRecordFile)

#### 1.录制内容配置 {#setRecordVideos}

* 相关API请参考 [录制内容配置](VideoMeeting.md#setRecordVideos)  
* 相关结构定义请参考 [录制内容配置](ObjectstructureDing.md#RecordVideosObj)

```cs

    /**
	 * 开始录制
	 * @access public
	 * @param {string} recordPath - 录像存储的路径
	 * @param {CRVideo_RECORD_AUDIO_TYPE} audioType - 音频类型
	 * @param {number} frameRate - 帧率，建议不要太高；(取值1~24)
	 * @param {number} recordWidth - 视频宽度
	 * @param {number} recordHeight - 视频高度
	 * @param {number} bitRate - 录制的最高码率，当图像变化小时，实际码率会低于此值。建议：640*360: 500000; (500kbps)，1280*720：1000000; (1mbps)，1920*1080: 2000000; (2mbps)
	 * @param {number} defaultQP - 目标质量(推荐:36, 中:28,  高:22)
	 * @param {CRVideo_REC_DATATYPE} recDataType - 录制内容类型（视频+音频）
	 * @param {number} recDataType - 录制内容类型（视频+音频）
	 * @param {number} isUploadOnRecording - 是否录制的同时上传 1为是，0为否
	 */	

     CRVideo_StartRecordIng(recordPath,audioType,frameRate,recordWidth,recordHeight,bitRate,defaultQP,recDataType,isUploadOnRecording)
    
    //布局
    if(){
        布局1
    }else if(){
        布局2
    }else{
        布局3.。。
    }
```

```cs
               //配置录制内容
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

```

#### 2.开始/停止录制 {#startRecording}

    1. 先开始录制，配置好录制文件信息
    2. 然后更新录制内容配置
    3. 在录制过程中可以多次更新录制配置，从而变更录制内容

* 相关API请参考 [开始/停止录制](VideoMeeting.md#startRecording)  
* 相关结构定义请参考 [录制内容类型](Constant.md#REC_VCONTENT_TYPE)，[录制文件配置](ObjectstructureDing.md#RecordCfgObj)

```cs
        //定义录制文件参数
        var cfg = {}；
        var date = new Date();
        var year = date.getFullYear();
        var mouth = date.getMonth()+1;
        var day =date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        cfg.filePathName = year+'-'+mouth+'-'+day+'-'+hour+'-'+minute+'-'+second+'.mp4';;
        cfg.recordWidth = 1280; //宽度
        cfg.recordHeight = 720; //高度
        cfg.frameRate = 15;     //帧率
        cfg.bitRate = 1000000;  //码率
        cfg.defaultQP = 24;     //清晰度
        cfg.recDataType = recDataType; //录制内容
        //开始录制
        CRVideo_StartRecordIng(cfg)

        //开始录制后，更新录制配置
        updateRecord(); //上方自定义函数
```

```cs
        //停止录制
        CRVideo_StopRecord();
```

#### 3.录制文件的大小、时长、状态 {#getRecFileSize}

* 相关API请参考[录制文件大小](VideoMeeting.md#getRecFileSize)，[时长](VideoMeeting.md#getRecDuration)，[录制状态变化通知](VideoMeeting.md#recordStateChanged)  
* 相关结构定义请参考 [错误码定义](Constant.md#CRVIDEOSDK_ERR_DEF), [录制状态](Constant.md#RECORD_STATE)，[通知录制文件状态变化](VideoMeeting.md#notifyRecordFileStateChanged)

```cs
        /**
        * 获取当前录制的文件大小（以字节为单位）
        * @access public
        * @returns {number} 返回录制文件大小（以字节为单位）
        */	//获取当前录制的文件大小（以字节为单位）
        var CRVideo_GetRecFileSize = CRVideo_GetRecFileSize()
        
         /**
        * 获取录制的文件时长（以秒为单位）
        * @access public
        * @returns {number} 返回录制的文件时长（以秒为单位）
        */	
	   var CRVideo_GetRecDuration =  CRVideo_GetRecDuration()

```
```cs
        //录制异常，录制将自动停止
        CRVideo_RecordErr.callback=function(sdkErr){
        //录制发生错误，代码： 见[错误码定义]
        }
```

```cs
        // sdk通知录制文件状态更改 fileName本地文件路径 state - 状态 0 未上传 1 上传中 2已上传
        CRVideo_NotifyRecordFileStateChanged.callback=function(fileName,state){
        //fileName, 文件名
        //state, 状态
}
```

#### 4.设置录制文件是否加密 {#setRecordFileEncrypt}

    启动录制时调用，则本次录制是否加密本地录制文件，也可全局配置，这样每一次录制都是加密的。

* 相关API请参考 [设置录制文件是否加密](VideoMeeting.md#setRecordFileEncrypt)

```cs
/**
	 * 设置本地生成的录制文件是否加密
	 * @access public
	 * @param {number} encrypt - 1表示加密 0表示不加密
	 */	
	 CRVideo_SetRecordFileEncrypt (encrypt)
```

#### 5.录制文件列表 {#getAllRecordFiles}

* 相关API请参考 [录制文件列表](VideoMeeting.md#getAllRecordFiles)  
* 相关结构定义请参考 [录制文件列表](json.md#RecordFilesObj)

```cs
        /* 取得所有录制文件信息
        * @access public
        * @return {CRVideo_RecordFileInfo[]} - 返回含多个录制文件信息
        */	
        var  g_getAll_videfile_list = CRVideo_GetAllRecordFiles();
```

#### 6.录制文件列表添加、删除文件 {#addFileToRecordMgr}

    1. 添加录制文件到录制文件列表，这样此文件便可上传和回放
    2. 移除文件时本地文件会被删掉，正在上传的文件会被取消上传，已经上传的文件不受影响

* 相关API请参考 [录制列表添加/删除文件](VideoMeeting.md#addFileToRecordMgr)

```cs
        /**
        * 第三方录制文件调用此接口后可进行本地回放和上传到服务器record下
        * @typedef {object} CRVideo_AddFileToRecordMgr - 添加本地文件到录制文件管理中
        * @property {string} fileName - 文件名，不含路径
        * @property {string} filePath - 文件路径，不含文件名
        * @access public
        * @return {CRVideo_AddFileToRecordMgr[]} - -1：本地文件不存在，0：成功，1：文件已经被添加过
        */
        var AddFileToRecordMgr = CRVideo_AddFileToRecordMgr(fileName,filePath);
```

```cs
        /**
        * 删除本地的录制文件，上传中的文件会被取消上传
        * @access public
        * @param {string} filename - 文件名，全路径
        */	
        CRVideo_RemoveFromFileMgr(filename)
```

#### 7.上传、取消上传录制文件 {#uploadRecordFile}

    参数是绝对路径文件名

* 相关API请参考 [上传/取消上传录制文件](VideoMeeting.md#uploadRecordFile)，[通知录制文件上传进度](VideoMeeting.md#notifyRecordFileUploadProgress)，[通知录制文件状态变化](VideoMeeting.md#notifyRecordFileStateChanged)  
* 相关结构定义请参考 [录制文件列表](ObjectstructureDing.md#RecordFilesObj)

```cs
        // /上传文件 filename - 文件名，全路径
        CRVideo_UploadRecordFile(fileName);

        // 取消视频上传的方法
        CRVideo_CancelUploadRecordFile(fileName);
```



```cs
        // 通知录制文件上传进度 fileName - 文件名 percent - 进度0-100
       CRVideo_NotifyRecordFileUploadProgress.callback = function(fileName,percent){
            // 上传文件：fileName
            // 上传进度：percent
        }
```

```cs
//sdk通知录制文件状态更改 fileName本地文件路径 state - 状态 0 未上传 1 上传中 2已上传
CRVideo_NotifyRecordFileStateChanged.callback = function(fileName,state){
    //fileName, 文件名
    //state， 状态
}
```

#### 8.回放录制文件 {#playbackRecordFile}

    此接口需要配合影音共享UI显示组件或者影音播放相关的接口进行画面和声音展示

> 相关API请参考 [回放录制文件](VideoMeeting.md#playbackRecordFile)

```cs
        //开始回放 fileName 文件名
        CRVideo_PlaybackRecordFile(fileName)
```

### 文件上传下载 {#netdisk}

> 1. [网盘容量、文件列表](#getNetDiskSummary)
> 1. [网盘文件操作（上传、下载、暂停、删除）](#netDiskOpr)

#### 1.网盘容量、已上传文件列表 {#getNetDiskSummary}

    获取网盘的使用情况和已经上传到服务器的文件列表

* 相关API请参考 [会议网盘容量](VideoMeeting.md#getNetDiskSummary)，[获取网盘文件列表](VideoMeeting.md#getNetDiskFileList)  
* 相关结构定义请参考 [网盘文件](ObjectstructureDing.md#NetFileObj)，[网盘文件列表](ObjectstructureDing.md#NetFileObjs)

```cs
    /**
        * 获取会议网盘的容量信息 说明：调用结果请见事件getNetDiskSummaryRslt
        * @access public
        */
        CRVideo_GetNetDiskSummary(public) ;

    /**
        * 获取网盘用户共享文件列表，即使用makeNetDiskFileID中参数fileType为0的生成的fileID上传的文件
        * @access public
        */
	    CRVideo_GetNetDiskFileList(public)

```

```cs
    /* SDK通知获取网盘容量信息结果
        * @callback CRVideo.CbProxy~CRVideo_GetNetDiskSummaryRslt
        * @param {number} diskLimit - 网盘总容量
        * @param {number} diskUsed - 网盘已用容量
        */
        CRVideo_GetNetDiskSummaryRslt.callback=function(diskLimit,diskUsed){
            
        }
```

```cs
    /**
        * SDK通知获取网盘文件列表
        * @callback CRVideo.CbProxy~CRVideo_GetNetDiskFileListRslt
        * @param {string[]} fileList - 网盘文件列表，json格式，定义见NetDiskObjs
        */
        CRVideo_GetNetDiskFileListRslt .callback=function(fileList){

        }
```

#### 2.网盘文件操作 {#netDiskOpr}

    1.上传、下载、删除、暂停（上传下载）、取消操作
    2.上传时需要调用SDK接口生成网盘文件ID

* 相关API请参考 [生成网盘文件ID](VideoMeeting.md#makeNetDiskFileID)，[上传/下载/删除网盘文件](VideoMeeting.md#uploadNetDiskFile)，[取消网盘文件操作](VideoMeeting.md#cancleNetDiskFile)，[暂停/继续网盘文件传输](VideoMeeting.md#setNetDiskTransportPause)，[获取网盘容量信息结果](VideoMeeting.md#getNetDiskSummaryRslt)，[获取网盘文件列表结果](VideoMeeting.md#getNetDiskFileListRslt)，[删除网盘文件结果](VideoMeeting.md#notifyNetDiskFileDeleteRslt)，[网盘容量不足通知](VideoMeeting.md#notifyNetDiskIsFull)，[通知网盘文件传输进度](VideoMeeting.md#notifyNetDiskTransforProgress)

```cs
    /**
        * 生成网盘文件全局唯一ID
        * @access public
        * @param {number} fileType - 文件类型，0:用户共享文件，1:程序使用文件
        * @param {string} newFileName - 传入的全局唯一文件名，建议带文件后缀
        * 说明：1.fileType等于0时，为会议网盘共享文件，上传的文件可通过;
        * 		 2.getNetDiskFileList获取到文件列表详情
        * 		 3.fileType等于1时，用户程序内资源文件，如白板的背景图片，无法获取文件详情
        * 		 4.两种文件类型都要调用uploadNetDiskFile和downloadNetDiskFile进行上传和下载
        */
        CRVideo_MakeNetDiskFileID(fileType,newFileName)

    /**
        * 上传文件到网盘
        * @access public
        * @param {string} fileID - 网盘文件ID
        * @param {string} localFilePath - 本地文件路径,含文件名
        */
        CRVideo_Uploadnetdiskfile(fileID,localFilePath)
```

```cs
    /**
        * 从网盘中下载文件
        * @access public
        * @param {string} fileID - 网盘文件ID
        * @param {string} localFilePath - 本地文件路径，全路径
        */
        CRVideo_Downloadnetdiskfile(fileID,localFilePath)
```

```cs
    /**
        * 删除网盘文件
        * @access public
        * @param {string} fileID - 网盘文件ID
        */
       CRVideo_Deletenetdiskfile(fileID)
```

```cs
    /**
        * 设置网盘文件传输暂停或继续
        * @access public
        * @param {string} fileID - 网盘文件ID
        * @param {bool} bTranPause - 是否暂停
        */
        CRVideo_SetNetDiskTransportPause(fileID,bTranPause)
```

```cs
    /**
        * 取消网盘文件操作（上传/下载）
        * @access public
        * @param {string} fileID - 网盘文件ID
	    */
        CRVideo_Canclenetdiskfile(fileID)
```

```cs
    /* SDK通知删除网盘文件结果
        * @callback CRVideo.CbProxy~CRVideo_NotifyNetDiskFileDeleteRslt
        * @param {string} fileID - 网盘文件id
        * @param {number} isSucceed - 是否成功 1 成功 0 失败
        */
        CRVideo_NotifyNetDiskFileDeleteRslt.callback=function(fileID,isSucceed){
            
        }
```

```cs
    /* SDK通知网盘上传或下载进度
        * @callback CRVideo.CbProxy~CRVideo_NotifyNetDiskTransforProgress
        * @param {string} fileID - 网盘文件id
        * @param {number} percent - 进度0-100
        * @param {number} isUpload -  是否是上传 1 上传 0 下载
	    */
        CRVideo_NotifyNetDiskTransforProgress.callback=function(fileID,percent,isUpload){

        }
```

### 屏幕共享 {#screenshare}

> 1. [开始、停止共享](#starshare)
> 1. [远程操作权限](#remoteOpr)

#### 1.开始、停止共享 {#starshare}

    使用接口启动共享，出现共享内容显示组件后，用组件上的功能开始标注和结束共享。

* 相关API请参考 [屏幕共享配置](VideoMeeting.md#getScreenShareCfg)，[开始/停止屏幕共享](VideoMeeting.md#startScreenShare)，[屏幕共享状态](VideoMeeting.md#isScreenShareStarted)，[开始/停止屏幕共享操作结果](VideoMeeting.md#startScreenShareRslt)，[开始/停止屏幕共享通知](VideoMeeting.md#notifyScreenShareStarted)  
* 相关结构定义请参考 [屏幕共享配置](ObjectstructureDing.md#ScreenShareCfgObj)

```cs
    /**
        * 设置屏幕共享配置
        * @access public
        * @param {CRVideo_ScreenShareCfgObj} jsonCfg 屏幕共享配置
        */	
        CRVideo_SetScreenShareCfg(jsonCfg)
    /**
        * 开启屏幕共享
        * 操作完成则回调CRVideo_StartScreenShareRslt
        * @access public
        */	
        CRVideo_StartScreenShare(public)
```

```cs
    /**
        * 停止屏幕共享
        * @access public
        */	
        CRVideo_StopScreenShare(public)
```

```cs
    /**
        * 开启屏幕共享的响应事件 
        * @callback CRVideo.CbProxy~CRVideo_StartScreenShareRslt
        * @param {number} sdkErr - 操作失败代码,定义见cr/error
        */
        CRVideo_StartScreenShareRslt.callback=function(sdkErr){
 
        }
```

```cs
    /**
        * 停止屏幕共享的响应事件
        * @callback CRVideo.CbProxy~CRVideo_StopScreenShareRslt
        * @param {number} sdkErr - 操作失败代码,定义见cr/error
        */
        CRVideo_StopScreenShareRslt.callback=function(sdkErr){
 
        }
```

```cs
    /**
        * 通知他人开启了屏幕共享
        * @callback CRVideo.CbProxy~CRVideo_NotifyScreenShareStarted
        */
        CRVideo_NotifyScreenShareStarted.callback=function(){

        }
```

```cs
    /**
        * 通知他人停止了屏幕共享
        * @callback CRVideo.CbProxy~CRVideo_NotifyScreenShareStopped
        */
         CRVideo_NotifyScreenShareStopped.callback=function(){

        }
```

#### 2.远程操作权限 {#remoteOpr}

    把共享区域的操作控制权限赋予某人，自己也可以获取他人赋予的操作权限

* 相关API请参考 [赋予/收回远程屏幕控制权限](VideoMeeting.md#giveCtrlRight)，[通知赋予/收回屏幕共享操作权限](VideoMeeting.md#notifyGiveCtrlRight)

```cs

```cs
    /**
        * SDK通知远程控制权限给予了某人
        * @callback CRVideo.CbProxy~CRVideo_NotifyGiveCtrlRight
        * @param {string} operId - 操作的用户ID
        * @param {string} targetId - 控制权限给予了谁
        */
        CRVideo_NotifyGiveCtrlRight(operId,targetId)
```

```cs
    /**
        * SDK通知收回远程控制
        * @callback CRVideo.CbProxy~CRVideo_NotifyReleaseCtrlRight
        * @param {string} operId - 操作的用户ID
        * @param {string} targetId - 收回了谁的控制权限
        */
        CRVideo_NotifyReleaseCtrlRight(operId,targetId)
```

### 影音播放共享 {#media}

> 1. [播放配置](#cfg)
> 1. [播放、暂停、停止](#play)
> 1. [设置播放进度](#pos)
> 1. [文件列表、播放信息、播放音量](#list)

#### 1.播放配置 {#cfg}

    此配置主要是为了定义共享播放时会议内其他人看到的效果

* 相关API请参考 [影音播放配置](VideoMeeting.md#setMediaCfg )  
* 相关结构定义请参考 [视频尺寸定义](Constant.md#VIDEO_SHOW_SIZE)

```cs
    /**
        * 配置远程影音共享时，图像质量参数
        * @access public
        * @param {string} jsonCfg - json格式的字符串，详见VideoCfgOjb说明
        */
         CRVideo_SetMediacfg(jsonCfg);
```

#### 2.播放、暂停、停止 {#play}

    每次只能播放一个视频，当前播放需要先停止然后才能进行下一个视频播放；
    开始播放参数可控制此播放是只有自己可见还是会议内所有人可见。

* 相关API请参考 [开始/暂停/停止影音播放](VideoMeeting.md#startPlayMedia)，[通知影音打开/播放/暂停/停止](VideoMeeting.md#notifyMediaOpened)，[通知更新影音播放进度](VideoMeeting.md#notifyPlayPosSetted)

```cs
    /**
        * 开始播放影音
        * @access public
        * 响应事件 如果播放成功，请关注通知事件notifyMediaOpened 如果播放失败，请关注通知事件notifyMediaStop
        * @param {string} filename  - 文件名，全路径
        * @param {number} locPlay  - 是否仅仅本地播放（1:本地播放，0：会议内播放）
        * @param {number} bPauseWhenFinished  - 是否播放完毕自动暂停在最后一帧
        */
        CRVideo_StartPlayMedia(filename,locPlay,bPauseWhenFinished)
```

```cs
    /**
        * 暂停或恢复播放影音
        * @access public
        * @param {bool} bPause - ture为暂停，false为恢复
        */	
        CRVideo_PausePlayMedia(bPause)
```cs
    /**
        * 停止播放影音
        * @access public
        */	
        CRVideo_StopPlayMedia()
```

#### 3.设置播放进度 {#pos}

    可以通过播放组件上的工具条拖动来调整播放进度，也可以用代码来设置播放的进度

* 相关API请参考 [设置播放进度](VideoMeeting.md#setMediaPlayPos)

```cs
    /**
        * 设置播放进度
        * @access public
        * @param {number} pos - 设置播放位置，单位：秒
        */
        CRVideo_SetMediaplaypos(pos)
```

#### 4.文件列表、播放信息、播放音量 {#list}

* 相关API请参考 [影音文件列表](VideoMeeting.md#getAllFilesInMediaPath)，[影音播放信息](VideoMeeting.md#getMediaInfo)，[影音播放音量](VideoMeeting.md#mediaVolume)  
* 相关结构定义请参考 [影音文件](ObjectstructureDing.md#MediaInfoObj)

```cs
    /**
        * 取得播放路径下的所有可播放文件
        * @access public
        * @return {string[]} - 文件名列表；
        */	
       var GetAllFilesInMediaPaths = CRVideo_GetAllFilesInMediaPath()
```

```cs

    /**
        * 取得影音文件信息
        * @access public
        * @param {string} userID - 用户id
        * @returns {CRVideo_MediaInfoObj} - 影音文件信息
        */
        var getmediainfo =  CRVideo_Getmediainfo(userID)
```

```cs
//设置当前播放的影音声音
int vol = 24;
    /**
        * 设置本地扬声器音量
        * @access public
        * @param {number} level - 音量等级（ 取值范围：0~255）
        * @returns {bool} 设置成功则返回true,否则返回false
        */
        CRVideo_SetSpeakerVolume(value) = vol;
```

### 聊天 {#IM}

> 实现会话内文本聊天，如果需要更加丰富的聊天内容，可自己传输文本格式，并进行相关解析

* 相关API请参考 [发送IM文本消息](VideoMeeting.md#sendIMmsg)，[通知收到IM消息](VideoMeeting.md#notifyIMmsg)

```cs
    /**
        * 发送IM消息
        * 响应事件CRVideo_SendIMmsgRlst
        * @access public
        * @param {string} text - 发送的文本消息
        * @param {string} UserID - 目标用户，如果用户ID为空，消息发送给会议内所有用户 
        * @param {string} cookie - 自定义用户数据
        * @returns {string} - 任务id 
        */	
        var CRVideo_SendIMmsgID = CRVideo_SendIMmsg(text,UserID,cookie)
```

```cs

    /**
        * 发送IM消息，SDK通知使用者发送结果
        * @callback CRVideo.CbProxy~CRVideo_SendIMmsgRlst
        * @param {string} taskID - 发送任务id
        * @param {number} sdkErr - 操作结果代码,定义见cr/error
        * @param {string} cookie - 自定义用户数据
        */
        CRVideo_SendIMmsgRlst.callback=function(taskID,sdkErr,cookie){

        }
```

```cs
    /**
        * SDK通知收到IM消息
        * @callback CRVideo.CbProxy~CRVideo_NotifyIMmsg
        * @param {string} fromUserID - 消息来源
        * @param {string} text - 消息内容
        * @param {number} sendTime - 消息发送时间戳，从1970开始算起
        */
        CRVideo_NotifyIMmsg.callback=function(fromUserID,text,sendTime){

        }
```




































### 参会成员管理 {#members}

> 获取会话内人员及相关信息，得到成员的userID后可以对其进行相关的远程音视频操作

* 相关API请参考 [会议成员列表](meeting.md#getAllMembers)，[会议成员信息](meeting.md#getMemberInfo)  
* 相关结构定义请参考 [会议成员](json.md#MemberObj)

```cs
//获取所有参会人
List<MemberInfo> allMembers = JsonConvert.DeserializeObject<List<MemberInfo>>(Login.Instance.CRVideo.Meeting.getAllMembers());
```

```cs
//获取某个参会人的信息
MemberInfo memInfo = JsonConvert.DeserializeObject<MemberInfo>(Login.Instance.CRVideo.Meeting.getMemberInfo("user_00005"));
```

### 功能页同步 {#page}

> 用户会话内同步所有人的功能，包括视频墙、影音共享、屏幕共享、电子白板

* 相关API请参考 [设置/获取会话内主功能页](meeting.md#switchToPage)，[会话内主功能页切换通知](meeting.md#notifySwitchToPage)  
* 相关结构定义请参考 [主功能类型](constant.md#MAIN_PAGE_TYPE)

```cs
//视频墙、共享、白板、影音共享
enum MAIN_PAGE_TYPE { MAINPAGE_VIDEOWALL, MAINPAGE_SHARE, MAINPAGE_WHITEBOARD, MAINPAGE_MEDIASHARE};
```

```cs
//切换功能页
MAIN_PAGE_TYPE mainPage = MAINPAGE_VIDEOWALL;
Login.Instance.CRVideo.Meeting.switchToPage((int)mainPage, "");
```

```cs
//关联相关委托
Login.Instance.CRVideo.Meeting.notifySwitchToPage += new ICloudroomVideoMeetingEvents_notifySwitchToPageEventHandler(notifySwitchToPage);
```

```cs
//当他人切换功能页时，收到通知消息
private void notifySwitchToPage(object sender, ICloudroomVideoMeetingEvents_notifySwitchToPageEvent e)
{
    switch (e.p_mainPage)
    {
        case (int)MAIN_PAGE_TYPE.MAINPAGE_VIDEOWALL:
            //...
            break;
        case (int)MAIN_PAGE_TYPE.MAINPAGE_SHARE:
            //...
            break;
        case (int)MAIN_PAGE_TYPE.MAINPAGE_WHITEBOARD:
           //...
           //p_subPageID 大功能内部的小功能页
            break;
        case (int)MAIN_PAGE_TYPE.MAINPAGE_MEDIASHARE:
           //...
            break;
        default:
            // 错误的功能页
            break;
    }
}
```

### 队列管理 {#queue}

> 利用队列功能，实现用户分配。使用队列时通常会有两种角色，坐席和客户，队列模块把排队的客户分配给某个服务队列的坐席。
>
> 组件介绍请参考 [队列管理组件](queue.md#initQueueDat)
>
> 1. [初始化队列，获取队列数据](#initQueue)
> 1. [坐席队列操作](#servicesOpr)
> 1. [坐席请求用户](#reqAssignUser)
> 1. [系统自动给坐席分配用户](#autoAssignUser)
> 1. [客户排队操作](#clientQueue)

#### 1.初始化队列，获取队列数据 {#initQueue}

    在登录成功后初始化队列数据

* 相关API请参考 [初始化队列](queue.md#initQueueDat)，[初始化队列结果](queue.md#initQueueDatRslt)，[查询所有队列](queue.md#getAllQueueInfo)  
* 相关结构定义请参考 [会话信息](json.md#SesssionObj)，[队列信息](json.md#QueueObj)

```cs
//关联队列初始化结果委托
CRVideo.Queue.initQueueDatRslt += new ICloudroomQueueEvents_initQueueDatRsltEventHandler(initQueueDatRslt);
```

```cs
//可在登录成功后初始化队列数据
private void loginSuccess(object sender, ICloudroomVideoMgrEvents_loginSuccessEvent e)
{
    CRVideo.Queue.initQueueDat("");  //初始化专家坐席用户队列
}
```

```cs
//队列初始化响应
private void initQueueDatRslt(object sender, ICloudroomQueueEvents_initQueueDatRsltEvent e)
{
    if (e.p_sdkErr != 0)
    {
        // "队列初始化出错，请重新登录"
        return;
    }
    //队列初始化成功后获取上一次意外结束的视频会话信息，如果存在，则可以选择恢复会话
    VideoSessionInfo sessionInfo = JsonConvert.DeserializeObject<VideoSessionInfo>(CRVideo.Queue.getSessionInfo());
    if (sessionInfo.callID != "" && sessionInfo.duration > 0)
    {
        if (MessageBox.Show("是否恢复意外关闭的视频会话？", "提示", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
        {
            //进入之前的会话
        }
        else
        {
            //结束上次的会话，准备新的会话
        }
    }
    //取到所有的队列信息
    List<QueueInfo> queues = JsonConvert.DeserializeObject<List<QueueInfo>>(CRVideo.Queue.getAllQueueInfo());
    //选择坐席加载队列信息还是客户加载信息
    //ServicesShow(queues);
    // or
    //ClientsShow(queues);
}
```

#### 2.坐席队列操作 {#servicesOpr}

    坐席角色开始和停止服务队列，以及操作后队列状态的变化

* 相关API请参考 [开始/停止服务队列](queue.md#startService)，[开始/停止队列服务结果](queue.md#startServiceRslt)  
* 相关结构定义请参考 [队列状态](json.md#QueueStatusObj)

```cs
//开始服务队列
Login.Instance.CRVideo.Queue.startService(queID, "");
```

```cs
//停止服务队列
Login.Instance.CRVideo.Queue.stopService(queID, "");
```

```cs
//获取服务的所有队列
string[] queIDs = Login.Instance.CRVideo.Queue.getServingQueues().Split('\n');
```

```cs
//关联相关委托
Login.Instance.CRVideo.Queue.startServiceRslt += new ICloudroomQueueEvents_startServiceRsltEventHandler(startServiceRslt);
Login.Instance.CRVideo.Queue.stopServiceRslt += new ICloudroomQueueEvents_stopServiceRsltEventHandler(stopServiceRslt);

Login.Instance.CRVideo.Queue.queueStatusChanged += new ICloudroomQueueEvents_queueStatusChangedEventHandler(queueStatusChanged);
```

```cs
//开始队列服务结果
public void startServiceRslt(object sender, ICloudroomQueueEvents_startServiceRsltEvent e)
{
    //
}
```

```cs
//通知队列服务结果
public void stopServiceRslt(object sender, ICloudroomQueueEvents_stopServiceRsltEvent e)
{
    //
}
```

```cs
//队列状态变化通知
public void queueStatusChanged(object sender, ICloudroomQueueEvents_queueStatusChangedEvent e)
{
    QueueStatus state = JsonConvert.DeserializeObject<QueueStatus>(e.p_jsonQueStatus);
}
```

#### 3.坐席请求用户 {#reqAssignUser}

    在设置DND免打扰状下态，系统不再自动分配，需要手动申请用户

* 相关API请参考 [免打扰](meetingMgr.md#setDNDStatus)，[设置免打扰结果](meetingMgr.md#setDNDStatusSuccess)，[请求分配用户](queue.md#reqAssignUser)，[请求分配用户结果](queue.md#reqAssignUserRslt)

```cs
Login.Instance.CRVideo.Queue.reqAssignUserRslt += new ICloudroomQueueEvents_reqAssignUserRsltEventHandler(reqAssignUserRslt);
```

```cs
//设置免打扰状态，关掉系统自动推送
Login.Instance.CRVideo.Mgr.setDNDStatus(1, "");
```

```cs
//手动请求一个用户
Login.Instance.CRVideo.Queue.reqAssignUser("");
```

```cs
//请求用户的结果
public void reqAssignUserRslt(object sender, ICloudroomQueueEvents_reqAssignUserRsltEvent e)
{
    if (e.p_sdkErr == (int)VCALLSDK_ERR_DEF.VCALLSDK_NOERR)
    {
        UserInfo user = JsonConvert.DeserializeObject<UserInfo>(e.p_jsonUsr);
        // 请求用户成功
    }
    else if(e.p_sdkErr == (int)VCALLSDK_ERR_DEF.VCALLSDK_QUE_NOUSER)
    {
        // 队列中没有排队人员
    }
    else
    {
       // 手动请求用户失败，代码：e.p_sdkErr
    }
}
```

```cs
//取消免打扰，开启系统自动推送
Login.Instance.CRVideo.Mgr.setDNDStatus(0, "");
```

#### 4.系统自动给坐席分配用户 {#autoAssignUser}

    系统自动分配的用户在坐席还未选择接受或拒绝时，系统可以撤回分配

* 相关API请参考 [自动分配用户通知](queue.md#autoAssignUser)，[接受/拒绝分配的用户](queue.md#acceptAssignUser)，[自动分配用户被取消](queue.md#cancelAssignUser)

```cs
Login.Instance.CRVideo.Queue.autoAssignUser += new ICloudroomQueueEvents_autoAssignUserEventHandler(autoAssignUser);
Login.Instance.CRVideo.Queue.cancelAssignUser += new ICloudroomQueueEvents_cancelAssignUserEventHandler(cancelAssignUser);
Login.Instance.CRVideo.Queue.responseAssignUserRslt += new ICloudroomQueueEvents_responseAssignUserRsltEventHandler(responseAssignUserRslt);
```

```cs
//系统自动分配用户通知
public void autoAssignUser(object sender, ICloudroomQueueEvents_autoAssignUserEvent e)
{
    UserInfo user = JsonConvert.DeserializeObject<UserInfo>(e.p_jsonUsr);
    if(MessageBox.Show("是否接受系统分配的用户:" + user.name +" ?", "提示", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
    {
        Login.Instance.CRVideo.Queue.acceptAssignUser(user.queID, user.userID, "");
        // do something with this user...
    }
    else
    {
        Login.Instance.CRVideo.Queue.rejectAssignUser(user.queID, user.usrID, "");
    }
}
```

```cs
//接受或拒绝分配的用户操作响应
public void responseAssignUserRslt(object sender, ICloudroomQueueEvents_responseAssignUserRsltEvent e)
{
    //
}
```

```cs
//系统撤回分配此用户通知
public void cancelAssignUser(object sender, ICloudroomQueueEvents_cancelAssignUserEvent e)
{
    //取消分配用户的弹框
}
```

#### 5.客户排队操作 {#clientQueue}

    客户选择一个队列进行排队，每次只能排一个队列

* 相关API请参考 [开始/停止排队](queue.md#startQueuing)，[开始/停止排队操作结果](queue.md#startQueuingRslt)，[队列状态变化](queue.md#queueStatusChanged)，[排队信息变化](queue.md#queuingInfoChanged)  
* 相关结构定义请参考 [队列状态](json.md#QueueStatusObj)，[排队信息](json.md#QueuingObj)

```cs
//关联相关委托
Login.Instance.CRVideo.Queue.startQueuingRslt += new ICloudroomQueueEvents_startQueuingRsltEventHandler(startQueuingRslt);
Login.Instance.CRVideo.Queue.stopQueuingRslt += new ICloudroomQueueEvents_stopQueuingRsltEventHandler(stopQueuingRslt);

Login.Instance.CRVideo.Queue.queueStatusChanged += new ICloudroomQueueEvents_queueStatusChangedEventHandler(queueStatusChanged);
Login.Instance.CRVideo.Queue.queuingInfoChanged += new ICloudroomQueueEvents_queuingInfoChangedEventHandler(queuingInfoChanged);
```

```cs
//开始排队
int queID = 1;
Login.Instance.CRVideo.Queue.startQueuing(queID, "");
```

```cs
//停止排队
Login.Instance.CRVideo.Queue.stopQueuing("");
```

```cs
//开始排队结果
public void startQueuingRslt(object sender, ICloudroomQueueEvents_startQueuingRsltEvent e)
{
    if (e.p_sdkErr != 0) //开始排队失败
    {
        // ....
    }
}
```

```cs
//停止排队结果
public void stopQueuingRslt(object sender, ICloudroomQueueEvents_stopQueuingRsltEvent e)
{
    //……
}
```

```cs
//队列状态变化通知
public void queueStatusChanged(object sender, ICloudroomQueueEvents_queueStatusChangedEvent e)
{
    QueueStatus state = JsonConvert.DeserializeObject<QueueStatus>(e.p_jsonQueStatus);
}
```

```cs
//排队信息更新
public void queuingInfoChanged(object sender, ICloudroomQueueEvents_queuingInfoChangedEvent e)
{
    QueuingInfo queuingInfo = JsonConvert.DeserializeObject<QueuingInfo>(e.p_queuingInfo);
}
```

### 呼叫他人 {#call}

> 实现用户到用户的呼叫，以此来实现会话信息的分发以及相关信息的传递
>
> 1. [主叫](#call)
> 1. [被叫](#called)

#### 1.主叫 {#call}

    呼叫发起方

* 相关API请参考 [开始呼叫](meetingMgr.md#call)，[挂断呼叫](meetingMgr.md#hungupCall)，[开始呼叫结果](meetingMgr.md#callSuccess)，[挂断呼叫结果](meetingMgr.md#hungupCallSuccess)，[通知呼叫被对方接受/拒绝](meetingMgr.md#notifyCallAccepted)

```cs
//关联相关委托
Login.Instance.CRVideo.Mgr.callSuccess += new ICloudroomVideoMgrEvents_callSuccessEventHandler(callSuccess);
Login.Instance.CRVideo.Mgr.callFail += new ICloudroomVideoMgrEvents_callFailEventHandler(callFailed);

Login.Instance.CRVideo.Mgr.notifyCallAccepted += new ICloudroomVideoMgrEvents_notifyCallAcceptedEventHandler(notifyCallAccepted);
Login.Instance.CRVideo.Mgr.notifyCallRejected += new ICloudroomVideoMgrEvents_notifyCallRejectedEventHandler(notifyCallRejected);
```

```cs
//开始呼叫，meetObj为之前创建的会议对象字符串
string userID = "user_000007";
string callID = Login.Instance.CRVideo.Mgr.call(userID, meetObj, "", "");
```

```cs
//挂断呼叫
Login.Instance.CRVideo.Mgr.hungupCall(callID, "", "");
```

```cs
//呼叫成功发出，等待对方响应
public void callSuccess(object sender, ICloudroomVideoMgrEvents_callSuccessEvent e)
{
   //
}
```

```cs
//呼叫发出失败
public void callFailed(object sender, ICloudroomVideoMgrEvents_callFailEvent e)
{
    // 呼叫失败，代码： e.p_sdkErr
}
```

```cs
//我的呼叫被对方接受，得到会议对象，可以进入会议
public void notifyCallAccepted(object sender, ICloudroomVideoMgrEvents_notifyCallAcceptedEvent e)
{
    MeetObj meet = JsonConvert.DeserializeObject<MeetObj>(e.p_meetObj);
    Login.Instance.CRVideo.Meeting.enterMeeting(meet.ID, meet.pswd, MyUserId, MyNickname, "");
    //打开会话界面……
}
//我的呼叫被对方拒绝
public void notifyCallRejected(object sender, ICloudroomVideoMgrEvents_notifyCallRejectedEvent e)
{
    //被拒绝了 o.o ……
}
```

#### 2.被叫 {#called}

    被呼叫方

* 相关API请参考 [通知有人呼入](meetingMgr.md#notifyCallIn)，[接受/拒绝他人的呼叫](meetingMgr.md#acceptCall)，[接受/拒绝他人呼叫结果](meetingMgr.md#acceptCallSuccess)

```cs
//关联委托
Login.Instance.CRVideo.Mgr.notifyCallIn += new ICloudroomVideoMgrEvents_notifyCallInEventHandler(notifyCallIn);
```

```cs
//有呼叫进入
public void notifyCallIn(object sender, ICloudroomVideoMgrEvents_notifyCallInEvent e)
{
    if(/*接受呼叫， 进入会议*/)
    {
        Login.Instance.CRVideo.Mgr.acceptCall(e.p_callID, e.p_meetObj, "", "");
        MeetObj meet = JsonConvert.DeserializeObject<MeetObj>(e.p_meetObj);
        Login.Instance.CRVideo.Meeting.enterMeeting(meet.ID, meet.pswd, MyUserId, MyNickname, "");
        //打开会话界面……
    }
    else //拒绝对方的呼叫
    {
        Login.Instance.CRVideo.Mgr.rejectCall(e.p_callID, "", "", "");
    }
}
```

### 透明传输 {#datatransfer}

> 独立于会话的传输功能，对SDK透明，发送对象必须要先成功登录
>
> 1. [发送命令、文本、文件](#send)
> 1. [收到命令、数据、文件](#receive)

#### 1.发送命令、文本、文件 {#send}

    小数据走命令接口，大数据走文本接口，命令的发送不可以被取消，也没有进度通知

* 相关API请参考 [发送命令/数据/文件](meetingMgr.md#sendCmd)，[取消发送](meetingMgr.md#cancelSend)，[发送命令/数据/文件结果](meetingMgr.md#sendCmdRlst)，[发送进度](meetingMgr.md#sendProgress)，[取消发送结果](meetingMgr.md#cancelSendRlst)

```cs
//发送命令和数据
private void btnSendCmd_Click(object sender, RoutedEventArgs e)
{
    string userID = "user_000008";
    byte[] cmdBytes = Encoding.Default.GetBytes(txtCmdData.Text.Trim());
    //小数据走sendcmd接口，大数据走sendbuffer接口
    if (0 < cmdBytes.Length < 50000)
    {
        Login.Instance.CRVideo.Mgr.sendCmd(userID, Convert.ToBase64String(cmdBytes));
    }
    else
    {
        Login.Instance.CRVideo.Mgr.sendBuffer(userID, Convert.ToBase64String(cmdBytes));
    }
}
```

```cs
//发送文件
private void sendFile()
{
    using (FileStream stream = new FileInfo(mSelectedFile).OpenRead())
    {
        label_sendBuffer_desc.Text = "文件大小：" + stream.Length / 1024 + "KB";
    }
    string userID = "user_000022";
    mFileTaskID = (string)Login.Instance.CRVideo.Mgr.sendFile(userID, mSelectedFile);
}
```

```cs
//取消发送
Login.Instance.CRVideo.Mgr.cancelSend(mFileTaskID);
```

```cs
//关联相关事件委托
Login.Instance.CRVideo.Mgr.sendCmdRlst += new ICloudroomVideoMgrEvents_sendCmdRlstEventHandler(sendCmdRlst);
Login.Instance.CRVideo.Mgr.sendBufferRlst += new ICloudroomVideoMgrEvents_sendBufferRlstEventHandler(sendBufferRlst);
Login.Instance.CRVideo.Mgr.sendFileRlst += new ICloudroomVideoMgrEvents_sendFileRlstEventHandler(sendFileRlst);

Login.Instance.CRVideo.Mgr.cancelSendRlst += new ICloudroomVideoMgrEvents_cancelSendRlstEventHandler(cancelSendRlst);
Login.Instance.CRVideo.Mgr.sendProgress += new ICloudroomVideoMgrEvents_sendProgressEventHandler(sendProgress);
```

```cs
//发送大数据和文件的进入通知
private void sendProgress(object sender, ICloudroomVideoMgrEvents_sendProgressEvent e)
{
    string text = "总大小：" + e.p_totalLen + ", 已发送" + e.p_sendedLen;
    //发完了
    if (e.p_sendedLen == e.p_totalLen)
    {
        //发送成功
    }
}
```

```cs
//发送命令结果
private void sendCmdRlst(object sender, ICloudroomVideoMgrEvents_sendCmdRlstEvent e)
{
    if (e.p_sdkErr != 0)
    {
        //发送命令数据失败：e.p_sdkErr
    }
}
```

```cs
//发送数据结果
private void sendBufferRlst(object sender, ICloudroomVideoMgrEvents_sendBufferRlstEvent e)
{
    if (e.p_sdkErr != 0)
    {
        //发送失败: e.p_sdkErr
    }
}
```

```cs
//发送文件结果
private void sendFileRlst(object sender, ICloudroomVideoMgrEvents_sendFileRlstEvent e)
{
    if (e.p_sdkErr != 0)
    {
        mBufferTaskID = "";
        //发送失败: e.p_sdkErr
    }
}
```

```cs
//取消发送的结果
private void cancelSendRlst(object sender, ICloudroomVideoMgrEvents_cancelSendRlstEvent e)
{
    if (e.p_sdkErr != 0)
    {
       //取消发送失败"
    }
}
```

#### 2.收到命令、数据、文件 {#receive}

    收到别人发送数据的通知

* 相关API请参考 [通知有命令/数据/文件发来](meetingMgr.md#notifyCmdData)

```cs
Login.Instance.CRVideo.Mgr.notifyCmdData += new ICloudroomVideoMgrEvents_notifyCmdDataEventHandler(notifyCmdData);
Login.Instance.CRVideo.Mgr.notifyBufferData += new ICloudroomVideoMgrEvents_notifyBufferDataEventHandler(notifyBufferData);
Login.Instance.CRVideo.Mgr.notifyFileData += new ICloudroomVideoMgrEvents_notifyFileDataEventHandler(notifyFileData);
```

```cs
//收到命令
private void notifyCmdData(object sender, ICloudroomVideoMgrEvents_notifyCmdDataEvent e)
{
    byte[] cmdBytes = Convert.FromBase64String(e.p_data);
    string text = "来自[" + e.p_sourceUserId + "]的命令:" + Encoding.Default.GetString(cmdBytes);
}
```

```cs
//收到大数据
private void notifyBufferData(object sender, ICloudroomVideoMgrEvents_notifyBufferDataEvent e)
{
    byte[] byteArray = Convert.FromBase64String(e.p_data);
    string text = "来自[" + e.p_sourceUserId + "]的数据" + Encoding.Default.GetString(byteArray);
}
```

```cs
//收到文件
private void notifyFileData(object sender, ICloudroomVideoMgrEvents_notifyFileDataEvent e)
{
    string text = "收到" + e.p_sourceUserId + "发来的文件：" + e.p_orgFileName + "，临时存放位置：" + e.p_tmpFile;
}
```



