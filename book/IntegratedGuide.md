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

> 初始化是整个SDK的使用基础，通常在程序启动的时候进行初始化([CRVideo_Init](basics.md#CRVideo_Init))，退出的时候进行反初始化([CRVideo_Uninit](basics.md#CRVideo_Uninit))，整个程序的生命周期中只进行一次初始化和反初始化。
>
> 相关API参考请见 [初始化/反初始化](basics.md#CRVideo_Init)

```cs 
SDK内部的组件多为单例组件，整个程序中只能有一个实例，比如“基础组件”，“会议管理组件”，“视频会议组件”，具体请参见各个组件说明。
```

```cs  
//初始化
//"CLOUDROOM"为向云屋科技申请的代理商ID

var init = CRVideo_Init("CLOUDROOM", '路径');

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

```

### 2. [登录连接视频服务器]{#login}

> 设置视频服务器地址，使用云屋授权账号和自定义用户编号登录
>
> 相关API请参考 [服务器地址](basics.md#CRVideo_SetServerAddr)，[登录/注销](meetingMrg.md#CRVideo_Login)

```cs    
//服务器名字
g_serverName = $("#server_name").val()

//账号
cr_account= $("#login_cpyname").val() ||"demo@cloudroom.com";

//md5加密
cr_psw = md5($("#login_psd").val()) || "md5加密后的密码";

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
```

### 3. [创建视频会话] {#create}

> 输入会议标题，创建一个没有密码的视频会话
>
> 相关API请参考 [创建/销毁视频会议](meetingMrg.md#CRVideo_CreateMeeting)

```cs
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
```

### 4. [进入会话]{#enter}

> 用创建成功的会话信息（会议ID和密码）进入会话，其他用户也是利用此会话信息进入该会话。
>
> 相关API请参考 [进入/退出/结束会议](videoMrg.md#CRVideo_EnterMeeting)

```cs  
//进入会议
CRVideo_EnterMeeting(会议id ,会议密码,用户id,用户昵称)

//进入会议完成响应
CRVideo_EnterMeetingRslt.callback=function(sdkErr){

    // CRVideo_NOERR==没有错误 成功
    if(sdkErr == CRVideo_NOERR){

        // * 暂未定义  
        CRVideo_SetPicResource(picID,jsonval)
    }
}
```

### 5. [打开麦克风/摄像头]{#audio}

> 进入会话成功后，配置并打开自己的麦克风和摄像头

> 相关API请参考 [麦克风/扬声器列表](videoMrg.md#CRVideo_GetAudioMicNames)，[麦克风设置](videoMrg.md#CRVideo_GetAudioCfg)，[摄像头设备列表](videoMrg.md#CRVideo_GetAllVideoInfo)，[视频设置](videoMrg.md#CRVideo_SetVideoCfg)，[会议内可观看摄像头列表](videoMrg.md#CRVideo_GetWatchableVideos)，[开/关摄像头](videoMrg.md#CRVideo_OpenVideo)，[视频状态](videoMrg.md#CRVideo_GetVideoStatus)，[获取/设置默认视频](videoMrg.md#CRVideo_SetDefaultVideo) 
> 相关结构定义请参考 [音频配置](json.md#AudioCfgObj)，[用户视频信息](json.md#VideoInfoObj)，[用户视频信息列表](json.md#VideoInfosObj)

```cs
CRVideo_SetEnableMutiVideo(g_userID,true);   // 是否可以打开更多的摄像头 传用户ID，bool
CRVideo_OpenMic(g_userID)  //打开麦克风 传用户ID

//获取音频参数 {CRVideo_AudioCfg} 返回cfg对象
var audioCfg = CRVideo_GetAudioCfg();

// 获取系统上的麦克风设备列表// {string[]} 返回麦克风设备字符串列表
var micArr = CRVideo_GetAudioMicNames();

// 获取系统上的扬声器设备列表
// * @access public
// * @returns {string[]} 返回扬声器设备列表
var spkerArr =CRVideo_GetAudioSpkNames()



// 设置默认的摄像头
// * @access public
// * @param {string} userID - 用户ID
// * @param {number} videoID - 摄像头ID
CRVideo_SetDefaultVideo(g_userID,$("#video_select").val())

// 获取用户所有的摄像头信息 userID @returns {CRVideo_VideoDeviceInfo[]} 返回设备列表
var videoList = CRVideo_GetAllVideoInfo(g_userID)


// 系统视频参数设置 cfg - 设置参数
CRVideo_SetVideoCfg(cfg);

// 配置远程影音共享时，图像质量参数 jsonCfg - json格式的字符串，详见VideoCfgOjb说明
CRVideo_SetMediacfg(cfg);
```
```cs
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
```
### 6. [有其他人进入会话]{#userEnter}

> 其他人入会的步骤也是上述的[4、5]步，拿到会议信息后进入到他人创建的会议，此步骤的目的是为了实时关注比自己晚进来的人并刷新摄像头画面显示；如果想要获取之前进来的人，可以调用 [CRVideo_GetAllMembers](videoMrg.md#CRVideo_GetAllMembers) 获取会议成员列表，也可以调用 [CRVideo_GetWatchableVideos](videoMrg.md#CRVideo_GetWatchableVideos) 获取所有可以观看的摄像头列表进行加载。


> 相关API请参考 [有人进入/离开会议通知](videoMrg.md#CRVideo_UserEnterMeeting)，[会议内可观看摄像头列表](videoMrg.md#CRVideo_GetWatchableVideos)  
> 相关结构定义请参考 [用户视频信息列表](json.md#VideoInfosObj)

```cs
/**
*获取会议内所有可观看的摄像头
* 只有摄像头打开才能被获取到,能获取到自已的和会议里其他人的；
* @access public
* @returns {CRVideo_VideoIDsObj[]} 对象VideoIDArray
*/
var  videoArr = CRVideo_GetWatchableVideos()

/**
*获取所有用户的信息
* @access public
* @return {CRVideo_MemberInfo[]} 返回含多个成员信息
*/	
var meber = $.parseJSON(CRVideo_GetAllMembers());// 获取所有会员信息

//用户进入会议  相当于第二方监听第三方加入会议
CRVideo_UserEnterMeeting.callback = function(usrID){

// 第三方进入的相关操作
}

// 通知某用户离开了会议exitMeeting
CRVideo_UserLeftMeeting.callback = function(id){

// 第三方离开的相关操作
}
```

> **至此，一个简单的音视频会话就建立起来了。**  

### 7.退出会话 {#exit}

> 在未注销的情况下可反复的进入退出同一个会议。
>
> 相关API请参考 [进入/退出/结束会议](videoMrg.md#CRVideo_EnterMeeting)

```cs
/**
* 离开会话
* 他人离开会话的回调事件CRVideo_UserLeftMeeting
* @access public
*/	
CRVideo_ExitMeeting()

/* 
* 某用户离开了会议
* @callback CRVideo.CbProxy~CRVideo_UserLeftMeeting
* @param {number} id - 离开会议的用户ID
*/
CRVideo_UserLeftMeeting.callback=function(用户ID){

}

```

### 8. [注销登陆]{#logout}

> 可重复的登录和注销。
>
> 相关API请参考 [进入/退出/结束会议](videoMrg.md#CRVideo_EnterMeeting)，[登录/注销](meetingMrg.md#CRVideo_Login)，[初始化/反初始化](basics.md#CRVideo_Init)

 ```cs
/** 
*注销本次登陆
*/
CRVideo_Logout()
```

### 9.反初始化，退出SDK {#uninit}

> 执行反初始化后SDK功能不再可用。
>
> 相关API请参考 [初始化/反初始化](basics.md#CRVideo_Init)

```cs
/** 
*反初始化
*/
CRVideo_Uninit();
```

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

* 相关API请参考 [麦克风、扬声器设备的获取](videoMrg.md#CRVideo_GetAudioSpkNames)，[开/关麦克风](videoMrg.md#CRVideo_OpenMic)

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

* 相关API请参考 [麦克风状态变化](videoMrg.md#CRVideo_AudioStatusChanged)  
* 相关结构定义请参考 [麦克风状态](Constant.md#ASTATUS)

```cs
/**
* 连接状态变化委托
*摄像头列表更新 通知用户的视频设备有变化
*/	
    CRVideo_VideoDevChanged.callback =function(userID){
    
}
```

```cs
/**
*摄像头状态改变
*1会话中设备的所有者ID 2旧状态 3新状态
*/
CRVideo_VideoStatusChanged.callback = function(userID,oldStatus,newStatus){

    if(g_userID == userID){
        [视频状态](Constant.md#VSTATUS)/**视频处于打开状态（软开关）*/          /**向服务器发送打开消息中	*/
        if(newStatus !=CRVideo_VSTATUS.VOPEN && newStatus !=CRVideo_VSTATUS.VOPENING){
            CRVideo_OpenVideo(g_userID);
        }
    }
}
```

#### 3.设置麦克风和扬声器音量 {#Volume}

* 相关API请参考 [麦克风音量](videoMrg.md#CRVideo_SetMicVolume),[扬声器音量](videoMrg.md#CRVideo_SetSpeakerVolume)

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

* 相关API请参考 [麦克风声音变化](videoMrg.md#CRVideo_MicEnergyUpdate)

```cs
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

* 相关API请参考 [录制内容配置](videoMrg.md#CRVideo_SetRecordVideos)  
* 相关结构定义请参考 [录制内容配置](json.md#RecordVideosObj)

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

   
```

#### 2.开始/停止录制 {#startRecording}

    1. 先开始录制，配置好录制文件信息
    2. 然后更新录制内容配置
    3. 在录制过程中可以多次更新录制配置，从而变更录制内容

* 相关API请参考 [开始/停止录制](videoMrg.md#CRVideo_StartRecordIng)  
* 相关结构定义请参考 [录制内容类型](Constant.md#REC_VCONTENT_TYPE)，[录制文件配置](json.md#RecordCfgObj)

```cs
/
//开始录制
CRVideo_StartRecordIng(cfg)
```

```cs
//停止录制
CRVideo_StopRecord();
```

#### 3.录制文件的大小、时长、状态 {#getRecFileSize}

* 相关API请参考[录制文件大小](videoMrg.md#CRVideo_GetRecFileSize)，[时长](videoMrg.md#CRVideo_GetRecDuration)，[录制状态变化通知](videoMrg.md#CRVideo_MicEnergyUpdate)  
* 相关结构定义请参考 [错误码定义](Constant.md#CRVIDEOSDK_ERR_DEF), [录制状态](Constant.md#RECORD_STATE)，[通知录制文件状态变化](videoMrg.md#CRVideo_NotifyRecordFileStateChanged)

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

* 相关API请参考 [设置录制文件是否加密](videoMrg.md#CRVideo_SetRecordFileEncrypt)

```cs
/**
* 设置本地生成的录制文件是否加密
* @access public
* @param {number} encrypt - 1表示加密 0表示不加密
*/	
CRVideo_SetRecordFileEncrypt (encrypt)
```

#### 5.录制文件列表 {#getAllRecordFiles}

* 相关API请参考 [录制文件列表](videoMrg.md#CRVideo_GetAllRecordFiles)  
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

* 相关API请参考 [录制列表添加/删除文件](httpMrg.md#CRVideo_AddFileToRecordMgr)

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

* 相关API请参考 [上传/取消上传录制文件](videoMrg.md#CRVideo_UploadRecordFile)，[通知录制文件上传进度](videoMrg.md#CRVideo_NotifyRecordFileUploadProgress)，[通知录制文件状态变化](videoMrg.md#CRVideo_NotifyRecordFileStateChanged)  
* 相关结构定义请参考 [录制文件列表](json.md#RecordFilesObj)

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

> 相关API请参考 [回放录制文件](videoMrg.md#CRVideo_PlaybackRecordFile)

```cs
//开始回放 fileName 文件名
CRVideo_PlaybackRecordFile(fileName)
```

### 文件上传下载 {#netdisk}

> 1. [网盘容量、文件列表](#getNetDiskSummary)
> 1. [网盘文件操作（上传、下载、暂停、删除）](#netDiskOpr)

#### 1.网盘容量、已上传文件列表 {#getNetDiskSummary}

    获取网盘的使用情况和已经上传到服务器的文件列表

* 相关API请参考 [会议网盘容量](videoMrg.md#CRVideo_GetNetDiskSummary)，[获取网盘文件列表](videoMrg.md#CRVideo_GetNetDiskFileList)  
* 相关结构定义请参考 [网盘文件](json.md#NetFileObj)，[网盘文件列表](json.md#NetFileObjs)

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

* 相关API请参考 [生成网盘文件ID](videoMrg.md#CRVideo_MakeNetDiskFileID)，[上传/下载/删除网盘文件](videoMrg.md#CRVideo_Uploadnetdiskfile)，[取消网盘文件操作](videoMrg.md#CRVideo_Canclenetdiskfile)，[暂停/继续网盘文件传输](videoMrg.md#CRVideo_SetNetDiskTransportPause)，[获取网盘容量信息结果](videoMrg.md#CRVideo_GetNetDiskSummaryRslt)，[获取网盘文件列表结果](videoMrg.md#CRVideo_GetNetDiskFileListRslt)，[删除网盘文件结果](videoMrg.md#CRVideo_NotifyNetDiskFileDeleteRslt)，[网盘容量不足通知](videoMrg.md#CRVideo_NotifyNetDiskIsFull)，[通知网盘文件传输进度](videoMrg.md#CRVideo_NotifyNetDiskTransforProgress)

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

* 相关API请参考 [屏幕共享配置](videoMrg.md#CRVideo_GetScreenShareCfg)，[开始/停止屏幕共享](videoMrg.md#CRVideo_StartScreenShare)，[开始/停止屏幕共享操作结果](videoMrg.md#CRVideo_StartScreenShareRslt)，[开始/停止屏幕共享通知](videoMrg.md#CRVideo_NotifyScreenShareStarted)  
* 相关结构定义请参考 [屏幕共享配置](json.md#ScreenShareCfgObj)

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
CRVideo_StartScreenShare()
```

```cs
/**
* 停止屏幕共享
* @access public
*/	
CRVideo_StopScreenShare()
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

* 相关API请参考 [赋予/收回远程屏幕控制权限](videoMrg.md#CRVideo_NotifyGiveCtrlRight)，[通知赋予/收回屏幕共享操作权限](videoMrg.md#CRVideo_NotifyReleaseCtrlRight)

```cs

```cs
/**
* SDK通知远程控制权限给予了某人
* @callback CRVideo.CbProxy~CRVideo_NotifyGiveCtrlRight
* @param {string} operId - 操作的用户ID
* @param {string} targetId - 控制权限给予了谁
*/
CRVideo_NotifyGiveCtrlRight.callback=function(operId,targetId){

}
```

```cs
/**
* SDK通知收回远程控制
* @callback CRVideo.CbProxy~CRVideo_NotifyReleaseCtrlRight
* @param {string} operId - 操作的用户ID
* @param {string} targetId - 收回了谁的控制权限
*/
CRVideo_NotifyReleaseCtrlRight.callback=function(operId,targetId){

}
```

### 影音播放共享 {#media}

> 1. [播放配置](#cfg)
> 1. [播放、暂停、停止](#play)
> 1. [设置播放进度](#pos)
> 1. [文件列表、播放信息、播放音量](#list)

#### 1.播放配置 {#cfg}

    此配置主要是为了定义共享播放时会议内其他人看到的效果

* 相关API请参考 [影音播放配置](videoMrg.md#CRVideo_SetMediacfg )  
* 相关结构定义请参考 [视频尺寸定义](Constant.md#VIDEO_SHOW_SIZE)

```cs
/**
* 配置远程影音共享时，图像质量参数
* @access public
* @param {string} jsonCfg - json格式的字符串，详见VideoCfgOjb说明
*/
CRVideo_SetMediacfg(jsonCfg)
```

#### 2.播放、暂停、停止 {#play}

    每次只能播放一个视频，当前播放需要先停止然后才能进行下一个视频播放；
    开始播放参数可控制此播放是只有自己可见还是会议内所有人可见。

* 相关API请参考 [开始/暂停/停止影音播放](videoMrg.md#CRVideo_StartPlayMedia)，[通知影音打开/播放/暂停/停止](videoMrg.md#CRVideo_NotifyMediaOpened)，[通知更新影音播放进度](videoMrg.md#CRVideo_NotifyPlayPosSetted)

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

/**
* 停止播放影音
* @access public
*/	
CRVideo_StopPlayMedia()
```

#### 3.设置播放进度 {#pos}

    可以通过播放组件上的工具条拖动来调整播放进度，也可以用代码来设置播放的进度

* 相关API请参考 [设置播放进度](videoMrg.md#CRVideo_SetMediaplaypos)

```cs
/**
* 设置播放进度
* @access public
* @param {number} pos - 设置播放位置，单位：秒
*/
CRVideo_SetMediaplaypos(pos)
```

#### 4.文件列表、播放信息、播放音量 {#list}

* 相关API请参考 [影音文件列表](videoMrg.md#CRVideo_GetAllFilesInMediaPath)，[影音播放信息](videoMrg.md#CRVideo_Getmediainfo)，[影音播放音量](videoMrg.md#CRVideo_SetSpeakerVolume)  
* 相关结构定义请参考 [影音文件](json.md#MediaInfoObj)

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
var vol = 24;
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

* 相关API请参考[发送IM文本消息](videoMrg.md#CRVideo_SendIMmsg)，[通知收到IM消息](videoMrg.md#CRVideo_NotifyIMmsg)

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

* 相关API请参考 [会议成员列表](videoMrg.md#CRVideo_GetAllMembers)，[会议成员信息](videoMrg.md#CRVideo_GetMemberInfo)  
* 相关结构定义请参考 [会议成员](json.md#MemberObj)

```cs
/**
* 获取所有用户的信息  //获取所有参会人
* @access public
* @return {CRVideo_MemberInfo[]} 返回含多个成员信息
*/	
var GetAllMembers = CRVideo_GetAllMembers()
```

```cs
/**
* 获取指定用户的信息 //获取某个参会人的信息
* @access public
* @param {string} userID - 用户ID
* @return {CRVideo_MemberInfo} info - 返回用户userID的成员信息

*/	
var GetMemberInfo = CRVideo_GetMemberInfo(userID)
```

### 功能页同步 {#page}

> 用户会话内同步所有人的功能，包括视频墙、影音共享、屏幕共享、电子白板

* 相关API请参考 [设置/获取会话内主功能页](videoMrg.md#CRVideo_Switchtopage)，[会话内主功能页切换通知](videoMrg.md#CRVideo_NotifySwitchToPage)  
* 相关结构定义请参考 [主功能类型](Constant.md#MAIN_PAGE_TYPE)

```cs
/**
* 功能切换
* @access public
* @param {number} mainPage -功能类型
* @param {string} pageID - 子页面标识（如创建白板时返回的boardID）
*/
CRVideo_Switchtopage(mainPage,pageID)
```
```cs
/* SDK通知功能切换 //当他人切换功能页时，收到通知消息
* @callback CRVideo.CbProxy~CRVideo_NotifySwitchToPage
* @param {CRVideo_MAIN_PAGE_TYPE} mainPage  - 功能类型
* @param {string} pageID - 子页面标识
*/
CRVideo_NotifySwitchToPage.callback = function(mainPage,pageID){

}
```

### 队列管理 {#queue}

> 利用队列功能，实现用户分配。使用队列时通常会有两种角色，坐席和客户，队列模块把排队的客户分配给某个服务队列的坐席。
>
> 组件介绍请参考 [队列管理组件](queueMrg.md#queueMrg)
>
> 1. [初始化队列，获取队列数据](#initQueue)
> 1. [坐席队列操作](#servicesOpr)
> 1. [坐席请求用户](#reqAssignUser)
> 1. [系统自动给坐席分配用户](#autoAssignUser)
> 1. [客户排队操作](#clientQueue)

#### 1.初始化队列，获取队列数据 {#initQueue}

    在登录成功后初始化队列数据

* 相关API请参考 [初始化队列](queueMrg.md#CRVideo_InitQueueDat)，[初始化队列结果](queueMrg.md#CRVideo_InitQueueDatRslt)，[查询所有队列](queueMrg.md#CRVideo_GetAllQueueInfo)  
* 相关结构定义请参考 [队列信息](TypeDefinitions.md#CRVideo_QueueInfo)

```cs
    
/**
* 初始化用户队列功能数据。//可在登录成功后初始化队列数据
* 操作完成回调CRVideo_InitQueueDatRslt，初始化成功后才可获取队列队列相关信息。
* @access public
* @param {string} cookie -自定义数据 (在回调时，回传给调用者)
*/
CRVideo_InitQueueDat(cookie)
```

```cs
/**
* 队列初始化操作结果
* @callback CRVideo.CbProxy~CRVideo_InitQueueDatRslt
* @param {number} sdkErr - 操作结果代码,定义见cr/error
* @param {string} cookie - 自定义用户数据
*/
CRVideo_InitQueueDatRslt.callback = function(sdkErr,cookie){

    /**
    * @typedef {object} CRVideo_QueStatus - 队列状态
    * @property {number} queID - 队列id
    * @property {number} agent_num - 坐席数量
    * @property {number} wait_num - 排队客户数量
    * @property {number} srv_num - 正在服务的客户数量

}
        
```

#### 2.坐席队列操作 {#servicesOpr}

    坐席角色开始和停止服务队列，以及操作后队列状态的变化

* 相关API请参考 [开始/停止服务队列](queueMrg.md#CRVideo_StartService)，[开始/停止队列服务结果](queueMrg.md#CRVideo_StartServiceRslt)  
* 相关结构定义请参考 [队列状态](TypeDefinitions.md#CRVideo_QueStatus)

```cs

/**
* 开始服务某个队列(可以多次调用，开启对多个队列的服务) //开始服务队列
* 操作回调CRVideo_StartServiceRslt
* 开启成功后：
* a. 如果没有开启免打挽，那么系统会自动分配客户：VideoCall_Queue_CallBack::autoAssignUser；
* b. 如果开启免打挽，系统就不会分配客户，如需服务客户可调用：reqAssignUser。
* @access public
* @param {string} queID  - 队列ID
* @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
*/
CRVideo_StartService(queID,cookie)
```

```cs

/**
* 停止服务某个队列 //停止服务队列
* 操作完成回调CRVideo_StopServiceRslt
* @access public
* @param {string} queID  - queID 队列ID
* @param {string} cookie - cookie自定义数据 (在回调时，回传给调用者)
*/
CRVideo_StopService(queID,cookie)
```

```cs
/**
* 获取我服务的所有队列
* @access public
* @returns {string[]} 返回我服务的队列列表
*/
var GetServingQueues = CRVideo_GetServingQueues()
```
```cs
/* 开始服务队列操作结果
* @callback CRVideo.CbProxy~CRVideo_StartServiceRslt
* @param {number} queID  - 服务的队列ID
* @param {number} sdkErr - 操作结果代码,定义见cr/error
* @param {string} cookie - 自定义用户数
*/
CRVideo_StartServiceRslt.callback = function(queID,sdkErr,cookie){

}

```

```cs
/**
* 停止服务队列操作结果
* @callback CRVideo.CbProxy~CRVideo_StopServiceRslt
* @param {number} queID  - 服务的队列ID
* @param {number} sdkErr - 操作结果代码,定义见cr/error
* @param {string} cookie - 自定义用户数
*/
CRVideo_StopServiceRslt.callback = function(queID,sdkErr,cookie){

}

```

```cs

/**
* 队列状态变化通知
* @callback CRVideo.CbProxy~CRVideo_QueueStatusChanged
* @param {CRVideo_QueStatus} queStatus  -队列状态
*/
    CRVideo_QueueStatusChanged.callback=function(queStatus){
    /**
    * @typedef {object} CRVideo_QueInfo - 队列信息
    * @property {number} queID - 队列id
    * @property {number} name - 队列名称
    * @property {string} desc - 队列描述
    * @property {number} prio - 优先级，值越小优先级越高
    */
}
```

#### 3.坐席请求用户 {#reqAssignUser}

    在设置DND免打扰状下态，系统不再自动分配，需要手动申请用户

* 相关API请参考 [免打扰](queueMrg.md#CRVideo_SetDNDStatus)，[设置免打扰结果](queueMrg.md#CRVideo_SetDNDStatusSuccess)，[请求分配用户](queueMrg.md#CRVideo_ReqAssignUser)，[请求分配用户结果](queueMrg.md#CRVideo_ReqAssignUserRslt)

```cs
/**
* 设置免打扰状态。
* 操作成功则回调CRVideo_SetDNDStatusSuccess,失败则回调CRVideo_SetDNDStatusFail。
* @access public
* @param {number} DNDStatus - 0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义
* @param {string} cookie -  自定义数据 (在回调时，回传给调用者)
*/
CRVideo_SetDNDStatus(DNDStatus,cookie)
```

```cs
/**
* 请求分配一个客户
* 当关闭免打扰时，系统将自动分配客户，无需调用此函数；
* 当开启免打扰时，系统不再自动分配客户，座席如需服务客户可使用此函数分配；
* @access public
* @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
*/
CRVideo_ReqAssignUser(cookie)
```

```cs
/**
* 请求分配客户操作结果
* @callback CRVideo.CbProxy~CRVideo_ReqAssignUserRslt
* @param {number} sdkErr - 操作结果代码,定义见cr/error
* @param {CRVideo_QueUser} user  - 队列用户信息
* @param {string} cookie - 自定义用户数
*/
CRVideo_ReqAssignUserRslt.callback = function(sdkErr,user,cookie){

}
```

#### 4.系统自动给坐席分配用户 {#autoAssignUser}

    系统自动分配的用户在坐席还未选择接受或拒绝时，系统可以撤回分配

* 相关API请参考 [自动分配用户通知](queueMrg.md#CRVideo_AutoAssignUser)，[接受/拒绝分配的用户](queueMrg.md#CRVideo_AcceptAssignUser)，[自动分配用户被取消](queueMrg.md#CRVideo_CancelAssignUser)

```cs
/* 系统自动安排客户
* @callback CRVideo.CbProxy~CRVideo_AutoAssignUser
* @param {CRVideo_QueUser} user - 队列用户信息
* 如果想停止系统的自动分配，请通setDNDStatus设置免打扰功能
*/
CRVideo_AutoAssignUser.callback = function(user){

}
        
```

```cs
/**
* 响应分配客户操作结果
* @callback CRVideo.CbProxy~CRVideo_ResponseAssignUserRslt
* @param {number} sdkErr - 操作结果代码,定义见cr/error
* @param {string} cookie - 自定义用户数
*/
CRVideo_ResponseAssignUserRslt.callback = function(sdkErr,cookie){

}
```

```cs
/**
* 系统取消已经安排的客户
* @callback CRVideo.CbProxy~CRVideo_CancelAssignUser
* @param {string} queID - 服务的队列
* @param {string} userid - 用户id
*/
CRVideo_CancelAssignUser.callback = function(queID,userid){

}
```

#### 5.客户排队操作 {#clientQueue}

    客户选择一个队列进行排队，每次只能排一个队列

* 相关API请参考 [开始/停止排队](queueMrg.md#CRVideo_StartQueuing)，[开始/停止排队操作结果](queueMrg.md#CRVideo_StartQueuingRslt)，[队列状态变化](queueMrg.md#CRVideo_QueueStatusChanged)，[排队信息变化](queueMrg.md#CRVideo_QueuingInfoChanged)  
* 相关结构定义请参考 [队列状态](TypeDefinitions.md#CRVideo_QueStatus )，[排队信息](TypeDefinitions.md#CRVideo_QueuingInfo)

```cs
/**
* 客户开始排队
* 操作完成回调CRVideo_StartQueuingRslt
* @access public
* @param {string} queID  - queID 队列ID
* @param {string} cookie - cookie自定义数据 (在回调时，回传给调用者)
*/
CRVideo_StartQueuing(queID,cookie)
```

```cs
/**
* 客户停止排队
* 操作完成回调CRVideo_StopQueuingRslt
* @access public
* @param {string} cookie - cookie自定义数据 (在回调时，回传给调用者)
*/
CRVideo_StopQueuing(cookie)
```

```cs
/**
* 开始排队操作结果
* @callback CRVideo.CbProxy~CRVideo_StartQueuingRslt
* @param {number} sdkErr - 操作结果代码,定义见cr/error
* @param {string} cookie - 自定义用户数据
*/
CRVideo_StartQueuingRslt.callback = function(sdkErr,cookie){

}
```

```cs
/**
* 停止排队操作结果
* @callback CRVideo.CbProxy~CRVideo_StopQueuingRslt
* @param {number} sdkErr - 操作结果代码,定义见cr/error
* @param {string} cookie - 自定义用户数
*/
CRVideo_StopQueuingRslt.callback = function(sdkErr,cookie){

}
```

```cs
/**
* 队列状态变化通知
* @callback CRVideo.CbProxy~CRVideo_QueueStatusChanged
* @param {CRVideo_QueStatus} queStatus  -队列状态
*/
CRVideo_QueueStatusChanged.callback = function(queStatus){
        /**
    * @typedef {object} CRVideo_QueInfo - 队列信息
    * @property {number} queID - 队列id
    * @property {number} name - 队列名称
    * @property {string} desc - 队列描述
    * @property {number} prio - 优先级，值越小优先级越高
    */
}
```

```cs
/**
* 排队信息变化通知
* @callback CRVideo.CbProxy~CRVideo_QueuingInfoChanged
* @param {CRVideo_QueInfo} queuingInfo - 队列信息
*/
CRVideo_QueuingInfoChanged.callback = function(queuingInfo){
/**
* 开始排队操作结果
* @callback CRVideo.CbProxy~CRVideo_StartQueuingRslt
* @param {number} sdkErr - 操作结果代码,定义见cr/error
* @param {string} cookie - 自定义用户数据
*/
 }
```

### 呼叫他人 {#call}

> 实现用户到用户的呼叫，以此来实现会话信息的分发以及相关信息的传递
>
> 1. [主叫](#call1)
> 1. [被叫](#called)

#### 1.主叫 {#call1}

    呼叫发起方

* 相关API请参考 [开始呼叫](meetingMrg.md#CRVideo_Call)，[挂断呼叫](meetingMrg.md#CRVideo_HungupCall)，[开始呼叫结果](meetingMrg.md#CRVideo_CallSuccess)，[挂断呼叫结果](meetingMrg.md#CRVideo_CallFail)，[通知呼叫被对方接受/拒绝](meetingMrg.md#CRVideo_NotifyCallAccepted)

```cs
/**
* 发起呼叫，邀请用户参加视频会话。
* 操作成功则回调CRVideo_CallSuccess,失败则回调CRVideo_CallFail。
* 呼叫时，对方迟迟不响应，30秒后系统自动结束呼叫。
* @access public
* @param {string} calledUserID -  被叫用户的账户ID
* @param {CRVideo_MeetInfoObj} meetObj - 会议信息
* @param {string} usrExtDat - 自定义扩展参数
* @param {string} cookie - 自定义数据(在回调时，回传给调用者)
* @returns {string} 返回本次呼叫标识码（呼叫ID）
*/	
var callID =CRVideo_Call(calledUserID,meetObj,usrExtDat,cookie)
```

```cs
/**
* 挂断正在进行的视频呼叫或视频通话
* 操作成功则回调CRVideo_HangupCallSuccess,失败则回调CRVideo_HangupCallFail。
* @access public
* @param {string} callID  - 呼叫ID
* @param {string} usrExtDat - 自定义扩展参数
* @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
*/	
CRVideo_HungupCall(callID,usrExtDat,cookie)
```

```cs
/**
* 呼叫他人操作成功响应
* @callback CRVideo.CbProxy~CRVideo_CallSuccess
* @param {string} callID - 呼叫全局标识 
* @param {string} cookie - 自定义用户数据
*/
CRVideo_CallSuccess.callback = function(callID,callback){

}
```

```cs
/**
* 呼叫他人操作失败响应
* @callback CRVideo.CbProxy~CRVideo_CallFail
* @param {string} callID - 呼叫全局标识 
* @param {number} sdkErr - 操作失败代码,定义见cr/error
* @param {string} cookie - 自定义用户数据
*/
CRVideo_CallFail.callback = function(callID,sdkErr,cookie){

}
```

```cs
/**
* SDK通知自己视频呼叫被对方接受
* @callback CRVideo.CbProxy~CRVideo_NotifyCallAccepted
* @param {string} callID - 呼叫全局标识 
* @param {CRVideo_MeetInfoObj} meetObj - 会议信息
* @param {string} usrExtDat - 自定义扩展参数
*/
CRVideo_NotifyCallAccepted = function(callID,meetObj,usrExtDat){

}

/**
* SDK通知自己呼叫被对方拒绝
* @callback CRVideo.CbProxy~CRVideo_NotifyCallRejected
* @param {string} callID - 呼叫全局标识 
* @param {number} sdkErr - 呼叫被对方拒绝的原因代码,定义见cr/error
* @param {string} usrExtDat - 自定义扩展参数
*/
    CRVideo_NotifyCallRejected = function(callID,sdkErr,usrExtDat){

}
```

#### 2.被叫 {#called}

    被呼叫方

* 相关API请参考 [通知有人呼入](meetingMrg.md#CRVideo_NotifyCallIn)，[接受/拒绝他人的呼叫](meetingMrg.md#CRVideo_AcceptCall)，[接受/拒绝他人呼叫结果](meetingMrg.md#CRVideo_AcceptCallSuccess)

```cs
/**
* SDK通知自己被呼叫
* @callback CRVideo.CbProxy~CRVideo_NotifyCallIn
* @param {string} callID - 呼叫全局标识 
* @param {CRVideo_MeetInfoObj} meetObj - 会议信息
* @param {string} callerID - 呼叫人员的标识ID
* @param {string} usrExtDat - 自定义扩展参数
*/
CRVideo_NotifyCallIn.callback = function(callID,meetObj,callerID,usrExtDat){

}
```

### 透明传输 {#datatransfer}

> 独立于会话的传输功能，对SDK透明，发送对象必须要先成功登录
>
> 1. [发送命令、文本、文件](#send)
> 1. [收到命令、数据、文件](#receive)

#### 1.发送命令、文本、文件 {#send}

    小数据走命令接口，大数据走文本接口，命令的发送不可以被取消，也没有进度通知

* 相关API请参考 [发送命令/数据/文件](meetingMrg.md#CRVideo_SendCmd)，[取消发送](meetingMrg.md#CRVideo_CancelSend)，[发送命令/数据/文件结果](meetingMrg.md#CRVideo_SendCmdRlst)，[发送进度](meetingMrg.md#CRVideo_SendProgress)，[取消发送结果](meetingMrg.md#CRVideo_CancelSendRlst)

```cs
/**
* 发送小块数据(一次性发送不会有进度通知,发送结果事件CRVideo_SendCmdRlst,CRVideo_SendCmd不能被CRVideo_CancelSend)
* @access public
* @param {string} targetUserId  - 目标用户ID
* @param {string} data - 发送的数据
* @returns {string} 分配的任务ID
*/	
var sendCmdID = CRVideo_SendCmd(targetUserId,data);

/**
* 发送大块数据(分块发送，进度通知事件CRVideo_SendProgress,发送结果事件CRVideo_SendBufferRlst,取消发送CRVideo_CancelSend)
* @access public
* @param {string} targetUserId  - 目标用户ID
* @param {string} data - 发送的数据
* @returns {string} 分配的任务ID
*/	
var sendBufferID = CRVideo_SendBuffer(targetUserId,data)


```

```cs
/**
* 发送文件(分块发送，进度通知事件CRVideo_SendProgress,发送结果事件CRVideo_SendFileRlst,取消发送CRVideo_CancelSend)
* @access public
* @param {string} targetUserId  - 目标用户ID
* @param {string} fileName - 需要发送的文件名 
* @returns {string} 分配的任务ID
*/	
var sendvFileID = CRVideo_SendFile(targetUserId,data)
```

```cs
/**
* 取消数据发送
* 操作完成则回调CRVideo_CancelSendRlst。
* @access public
* @param {string} taskID - 任务ID
*/
CRVideo_CancelSend(taskID)
```

```cs
/**
* 发送数据时，SDK通知发送进度
* @callback CRVideo.CbProxy~CRVideo_SendProgress
* @param {string} taskID - 发送任务id
* @param {number} sendedLen  - 已发送的数据长度
* @param {number} totalLen   - 需要发送的总长度
* @param {string} cookie - 自定义用户数据
*/
CRVideo_SendProgress.callback = function(taskID,sendedLen,totalLen,cookie){

}
```

```cs
/**
* 发送数据时，SDK通知发送结果
* @callback CRVideo.CbProxy~CRVideo_SendCmdRlst
* @param {string} taskID - 发送任务id
* @param {number} sdkErr - 操作失败代码,定义见cr/error
* @param {string} cookie - 自定义用户数据
*/
CRVideo_SendCmdRlst.callback = function(taskID,sdkErr,cookie){

}
```

```cs
/**
* 发送数据时，SDK通知发送结果
* @callback CRVideo.CbProxy~CRVideo_SendBufferRlst
* @param {string} taskID - 发送任务id
* @param {number} sdkErr - 操作失败代码,定义见cr/error
* @param {string} cookie - 自定义用户数据
*/
    CRVideo_SendBufferRlst.callback = function(taskID,sdkErr,cookie){

}
```

```cs
/**
* 发送文件时，SDK通知发送结果
* @callback CRVideo.CbProxy~CRVideo_SendFileRlst
* @param {string} taskID - 发送任务id
* @param {number} fileName - 文件名
* @param {number} sdkErr - 操作失败代码,定义见cr/error
* @param {string} cookie - 自定义用户数据
*/
    CRVideo_SendFileRlst.callback = function(taskID,fileName,sdkErr,cookie){

}
```

```cs
/**
* 取消发送响应
* @callback CRVideo.CbProxy~CRVideo_CancelSendRlst
* @param {string} taskID - 发送任务id
* @param {number} sdkErr - 操作失败代码,定义见cr/error
* @param {string} cookie - 自定义用户数据
*/
    CRVideo_CancelSendRlst.callback = function(taskID,sdkErr,cookie){

}
```

#### 2.收到命令、数据、文件 {#receive}

    收到别人发送数据的通知

* 相关API请参考 [通知有命令/数据/文件发来](meetingMrg.md#CRVideo_NotifyCmdData)

```cs
/**
* SDK通知收到小块数据
* @callback CRVideo.CbProxy~CRVideo_NotifyCmdData
* @param {string} sourceUserId - 数据来源
* @param {string} data - 数据
*/
CRVideo_NotifyCmdData.callback = function(sourceUserId,data){

}
```

```cs
/**
* SDK通知收到大块数据
* @callback CRVideo.CbProxy~CRVideo_NotifyBufferData
* @param {string} sourceUserId - 数据来源
* @param {string} data - 数据
*/
CRVideo_NotifyBufferData.callback = function(sourceUserId,data){

}
```

```cs
/**
* SDK通知收到文件数据（收到的文件生成在系统临时目录下，请尽快移走对应文件）
* @callback CRVideo.CbProxy~CRVideo_NotifyFileData
* @param {string} sourceUserId - 数据来源
* @param {string} tmpFile - 临时文件，不需要时，请移除或删除对应文件
* @param {string} orgFileName  - 源始文件名 
*/
CRVideo_NotifyFileData.callback = function(sourceUserId,tmpFile,orgFileName){

}
```



