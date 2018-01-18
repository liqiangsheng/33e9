# <font color="#2674ba">云屋视频SDK参考</font>

<p style="background:#f7f7f7;font-size:14px;height:50px;line-height:50px;">此版本适合V3.6版本的SDK</p>

<p style="width:100%;height:4px;background:#f7f7f7;"></p>

## <font color="#0099cc">说明</font>

>会议SDK结构、SDK开发流程、SDK浏览器开发环境。CloudroomVideo SDK for Web支持的浏览器有：IE8,IE9,IE10,IE11，chrome44及以下(包含chrome44)。

#### <font color="#0099cc">sdk说明</font>


> - doc<font color="#f77a0b">(文档说明文件夹）</font>
   + fonts
   + scripts
   + styles
   + callback.js.html
   + CloudroomVideoSDK for Web开发指南.docx<font color="#f77a0b">（web端开发指南）</font>
   + CRMeet.CbProxy.html
   + CRVideo.CbProxy.html
   + CRVideo.Container.html
   + CRVideo.MediaContainer.html
   + CRVideo.ScreenShareContainer.html
   + CRVideo.VideoContainer.html
   + error.js.html
   + global.html
   + index.html<font color="#f77a0b">（入口文件）</font>
   + init.js.html
   + live.js.html
   + module-cr_callback.html
   + module-cr_error.html

> - examples<font color="#f77a0b">(四个demo案例文件夹)</font>
   + Meeting(web)<font color="#f77a0b">（会议demo）</font>
   + RecordDemo(web)<font color="#f77a0b">（本地双录demo）</font>
   + RemoteRecordDemo(web)<font color="#f77a0b">（远程双录demo）</font>
   + VideoCall(web)<font color="#f77a0b">（视频会议demo）</font>

> - js
   + CloudroomVideoSDK.js<font color="#f77a0b">（js sdk文件）</font>
   + CloudroomVideoSDK.min.js<font color="#f77a0b">（js sdk压缩文件）</font>
   + CloudroomVideoSDK_iePatch.js<font color="#f77a0b">（ie8专用js sdk文件）</font>

> - CloudroomVideoSDK.exe<font color="#f77a0b">（客户端插件）</font>

> - history.txt<font color="#f77a0b">（历史版本文件）</font>

> - readme.txt<font color="#f77a0b">（readme文件</font>

## <font color="#0099cc">开发准备</font>

<p style="width:100%;background:#f7f7f7;">JavaScript 的开发工具有很多，开发者可根据自己的喜好进行选择。在此，我们推荐开发者使用<font color="#718c00"> dreamwaver</font> 作为自己的开发工具，本套开发指南也是针对<font color="#718c00"> dreamwaver </font>开发环境下进行编写的。</p>

#### <font color="#0099cc">安装插件</font>

- 首先要安装开发插件，CloudroomVideo SDK for Web 提供的所有 JavaScript 接口都是基于这个插件实现，进行web开发之前需要确保插件已经安装成功，双击SDK目录下的开发环境下进行编写的。

 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/1.png)

 选择安装

 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/2.png)

 插件会自动开始安装

 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/3.png)

 完成安装

 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/4.png)

#### <font color="#0099cc">导入SDK文件</font>

- 将SDK包js子目录下的CloudroomVideoSDK.js和CloudroomVideoSDK_iePatch.js文件拷贝到自己的web开发环境当中
 
 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/5.png)

 引用CloudroomVideoSDK.js

 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/6.png) 

 如果是IE开发，还需要引用补丁文件

 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/7.png) 
 
#### <font color="#0099cc">浏览器版本的支持说明</font>

- Cloudroom SDK支持chrome 44及以下版本（chrome45版本后不再支持npapi插件），chrome 42以上版本缺省不支持插件，需要手工打开，打开方式如下：

 **一：在chrome浏览器输入“chrome://flags”**

 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/8.png) 
 
  **二：启用**
 
 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/9.png) 

  **三：在chrome浏览器输入“chrome://plugins”**

  **四：找到“CloudroomVideoSDK”，“启用”并勾选“始终允许运行”**

 ![CloudroomVideoSDK.exe安装](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/10.png) 

  **五：重启浏览器**

## <font color="#0099cc">基本流程</font>

>流程1：<font color="red">（不登录，只参加会议）SDK初始化 -> 设置服务器地址->（参会）-> 反初始化</font>

>流程2：<font color="red">（登录后拥有身份，可进行“排队、呼叫、创建会议、参会”等业务）SDK初始化 -> 设置服务器地址-> 登录 ->（排队、呼叫、创建会议、参会）-> 注消 -> 反初始化</font>
 
 #### <font color="#0099cc">SDK初始化</font>

 ![基本流程](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/jblc1.png)

 其中oemID为向云屋科技申请的代理商ID，初始化失败会返回对应的错误码
 
 ![基本流程](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/jblc2.png)
 
 成功返回

 ![基本流程](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/jblc3.png)
 
 #### <font color="#0099cc">SDK反初始化</font>
 
 ![基本流程](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/jblc4.png)

 #### <font color="#0099cc">设置服务器地址</font>

 ![基本流程](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/jblc5.png)
 
  &emsp;&emsp;支持单个服务器地址（如：www.cloudroom.com）或多个服务器地址串（如：www.cloudroom.com:8080;183.60.47.52:8080;）,此接口并不会对服务器地址的有效性进行验证，请保证地址准确。

 #### <font color="#0099cc">登录</font>

 ![基本流程](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/jblc6.png)
 
 &emsp;&emsp;登录会有结果事件通知，成功事件CRVideo_LoginSuccess，失败事件CRVideo_LoginFail，失败事件的错误码参见CloudroomVideoSDK.js文件的详细描述。
  
  #### <font color="#0099cc">注销</font>

 ![基本流程](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/jblc7.png)

  &emsp;&emsp;退出程序时，必须注销本次登录，然后再进行SDK反初始化操作
  
## <font color="#0099cc">呼叫和排队</font>

<p style="background:#f7f7f7">&emsp;&emsp;CloudroomVideo SDK for Web为开发者提供呼叫、排队功能。</p>
<p style="background:#f7f7f7">&emsp;&emsp;SDK目录的examples/VideoCall(web)文件夹为视频呼叫的demo。这个demo主要展示的某坐席用户服务于某个队列，系统把这个队列里的排队用户分配给此坐席用户，经过一系列握手之后，再进行视频通话的功能。</p>

## <font color="#0099cc">业务流程说明</font>

>坐席客户:<font color="red">初始化SDK->登录->取得队列信息->服务于某个队列->接受某个排队用户->创建会议->呼叫排队用户->进入会议->音视频通话->挂断/被挂断->停止服务->注销->卸载SDK</font>

>排队客户:<font color="red">初始化SDK->取得队列信息->排队于某个队列->接受呼叫->进入会议->音视频通话->挂断/被挂断->注销->卸载SDK</font>

#### <font color="#0099cc">时序图</font>

坐席客户与排队客户通讯的时序图如下所示:

![时序图](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/sxt1.png)

&emsp;&emsp;坐席客户在接受排队用户时，需要创建一个会议，创建成功后把排队用户呼叫进会议中，再进行后面的业务功能操作。用户与用户之间的各种通信功能，如音视频通话，屏幕共享，影音共享等等，必须依托于会议存在。后面还会对会议功能有更详细的说明。

#### <font color="#0099cc">注意事项</font>
 
 A.队列不能由SDK创建，应在Web上先配好;

 B.一个客服可以服务多个队列，但一个客户只在一个队列排队；

 C.多个坐席客户可同时服务于一个队列;

 D.队列有优先级，客服服务多个队列时，将从高优先级的队列服务起。（不同优先级的客户可以通过排队不同队列来实现。 这样比在一个队列插队好，不会引起其他排队用户等待数增加）

## <font color="#0099cc">会议</font>

<p style="background:#f7f7f7">&emsp;&emsp;CloudroomVideo SDK for Web为开发者提供的音视频通信功能，屏幕共享，影音共享等功能，须在会议里进行。</p>

#### <font color="#0099cc">业务流程说明</font>

>创建一个会议:<font color="red">初始化SDK->登录->创建会议->其他用户参加会议->音视频通话、屏幕共享、影音共享等->离开会议->注销->卸载SDK</font>

>参加一个会议：<font color="red">(此处用户未登录参会，实际上登录也可参会)初始化SDK->根据会议号加入一个会议->音视频通话、屏幕共享、影音共享等->离开会议->卸载SDK</font>

#### <font color="#0099cc">时序图</font>

一次完整的会议时序图如下所示:

![时序图](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/sxt2.png)

#### <font color="#0099cc">注意事项</font>

A.在SDK初始化且登录会议成功后，才能进行各种会议功能。

B.如果只是参会，可以不登录；（如上图参会者）

C.离开会议是没有响应消息的（在网络不通时离开会议也不会退不出去），但“结束会议”时有响应的, 只有收到结束成功消息，才真正算结束成功了。

## <font color="#0099cc">音视频通讯</font>

<p style="background:#f7f7f7">&emsp;&emsp;CloudroomVideo SDK for Web为开发者提供便捷的音视频通讯接口，通过以下几步的操作，可以在会议中集成音视频交互功能。音视频通讯需在会议里进行。</p>

#### <font color="#0099cc">参会人信息</font>

&emsp;&emsp;会议里可以通过接口CRVideo_GetAllMembers获取当前参加会议的所有成员的详细信息，接口如下所示：

![音视频通讯](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/sptx1.png)

&emsp;&emsp;会议里可以通过接口CRVideo_GetMemberInfo获取指定成员的详细信息，接口如下所示：

![音视频通讯](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/sptx2.png)

#### <font color="#0099cc">打开音频</font>

先可以通过接口CRVideo_SetAudioCfg设置本地的音频参数，接口如下所示：

![音视频通讯](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/sptx3.png)

通过接口CRVideo_SetMicVolume设置麦克风的音量大小，接口如下所示：

![音视频通讯](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/sptx4.png)

通过接口CRVideo_OpenMic和CRVideo_CloseMic打开和关闭自已或他人的麦克风，接口如下所示：

![音视频通讯](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/sptx5.png)

![音视频通讯](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/sptx6.png)

<font color="red">(取得用户麦克风是否开启或关闭，可通过接口CRVideo_GetMemberInfo获取)</font>


#### <font color="#0099cc">打开视频</font>

计算机可拥有多个摄像头，通过接口CRVideo_GetVideoDevices获取指定用户的视频设备列表(CRVideo_VideoDeviceInfo:用户ID,设备id,设备名称)，接口如下所示：

![打开视频](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/dksp1.png)

通过接口CRVideo_SetDefaultVideo设置指定用户的默认摄像头，接口如下所示:

![打开视频](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/dksp2.png)


通过接口CRVideo_SetVideoCfg配置视频的清晰度、帧率、码率等；

通过接口CRVideo_OpenVideo和CRVideo_CloseVideo开启或关闭指定用户的摄像头，接口如下所示：

![打开视频](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/dksp3.png)

![打开视频](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/dksp4.png)

<font color="red">(取得用户摄像头是否开启或关闭，可通过接口CRVideo_GetMemberInfo获取)</font>

#### <font color="#0099cc">会议录制</font>

参会过程中可将视频、音频录制成视频。

&emsp;&emsp;先通过接口CRVideo_StartRecord开启录制，参数说明请参考截图，接口如下所示：

![会议录制](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/lzsp1.png)

&emsp;&emsp;再通过接口CRVideo_SetRecordVideos，配置录制的视频内容； 

&emsp;&emsp;可以通过接口CRVideo_StopRecord停止录制，接口如下所示：

![会议录制](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/lzsp2.png)

## <font color="#0099cc">其他接口</font>

&emsp;&emsp;更多的功能接口，请参考SDK目录的doc文件夹。如图所示，打开doc文件夹下的index.html。

![其他接口](https://raw.githubusercontent.com/liqiangsheng/33e9/master/book/images/qt1.png)

### 主要组件 {#mainClass}

> SDK是由众多的DLL组件组合而成的，对外提供以下几个组件：

* [基础组件 CloudroomVideoSDK](#CloudroomVideoSDK)
* [管理组件 CloudroomVideoMgr](#CloudroomVideoMgr)
* [队列组件 CloudroomQueue](#CloudroomQueue)
* [Http文件管理组件 CloudroomHttpFileMgr](#CloudroomHttpFileMgr)
* [视频会议组件 CloudroomVideoMeeting](#CloudroomVideoMeeting)
  * [视频显示组件 CloudroomVideoUI](#CloudroomVideoUI)
  * [屏幕共享画面显示组件 CloudroomScreenShareUI](#CloudroomScreenShareUI)
  * [影音显示组件 CloudroomMediaUI](#CloudroomMediaUI)

#### 基础组件CloudroomVideoSDK {#CloudroomVideoSDK}

    CLSID: {07EFD662-A1BB-4d8d-9BEE-F7E43E5FEBF5}
    ProgID: npCloudroomVideoSDK.CloudroomVideoSDK
    MIME TYPE: application/x-cloudroom-videosdk

CloudroomVideoSDK是基础组件，是整个SDK使用的基础。

该组件一个进程内只能创建一个实例，直到应用退出时才反初始化并销毁。

组件使用过程主要包括：

    1. 创建组件实例
    2. 执行初始化
    3. 程序退出时执行反初始化

#### 管理组件CloudroomVideoMgr {#CloudroomVideoMgr}

    CLSID: {120AD2B0-68F2-46c6-88D8-52173F501C0F}
    ProgID: npCloudroomVideoSDK.CloudroomVideoMgr
    MIME TYPE: application/x-cloudroom-videomgr

CloudroomVideoMgr是登录、呼叫、会议创建管理和透明传输类。

该组件一个进程内只能创建一个实例，实现了入会前的相关功能。

组件使用过程主要包括：

    1. 创建组件实例
    2. 登录
    3. 创建会议

注意: 只有在CloudroomVideoSDK Init初始化成功后接口才可用。

#### 队列组件CloudroomQueue {#CloudroomQueue}

    CLSID: {9AAD199D-A02F-4513-875D-AA81091E44B9}
    ProgID: npCloudroomVideoSDK.CloudroomQueue
    MIME TYPE: application/x-cloudroom-queue

CloudroomQueue是队列组件，它实现队列功能。

该组件一个进程内只能创建一个实例，是可选组件，用于用户分发，您可以使用它，也可以自已另外实现，这并不影响视频呼叫、音视频通话功能。

组件使用过程主要包括：

    1. 创建组件实例，执行初始化
    2. 队列获取，客户排队/座席服务

注意：只有在CloudroomVideoMgr登录成功后接口才可用。

#### Http文件管理组件CloudroomHttpFileMgr {#CloudroomHttpFileMgr}

    CLSID: {7E44F8C9-7C8D-4004-8F45-D9819D78663C}
    ProgID: npCloudroomVideoSDK.CloudroomHttpFileMgr
    MIME: application/x-cloudroom-httpfilemgr

CloudroomHttpFileMgr是Http文件上传下载及文件管理类。

该组件一个进程内只能创建一个实例，主要应用于单方文件归档，单方文件下载，支持非云屋http服务器对接。

如果会议内临时文件共享，请使用CloudroomVideoMeeting中的会议网盘功能。

下载支持断点续传，上传暂不支持断点机制。

注意：只有在CloudroomVideoSDK初始化后接口才可用。

#### 视频会议组件CloudroomVideoMeeting {#CloudroomVideoMeeting}

    CLSID: {9E9DD983-A9F8-4dff-B694-B1AE1C708B1E}
    ProgID: npCloudroomVideoSDK.CloudroomVideoMeeting
    MIME TYPE: application/x-cloudroom-videomeeting

CloudroomVideoMeeting是视频会议类。

该组件一个进程内只能创建一个实例，包含了视频会话相关的全部功能。

组件使用过程主要包括：

    1. 创建组件实例
    2. 进入会议
    3. 会议内的各功能处理
    4. 退出会议

注意：只有在CloudroomVideoSDK Init初始化成功后接口才可用。

进入视频会议可用以下组件：

##### 视频显示组件CloudroomVideoUI {#CloudroomVideoUI}

    CLSID: {8A6BBBDC-C6BE-4a47-92F3-F9581C3FB95E}
    ProgID: npCloudroomVideoSDK.CloudroomVideoUI
    MIME: application/x-cloudroom-videoui

CloudroomVideoUI是视频显示组件，它显示设定的用户的视频。

该组件可以创建多个实例，然后分别配置大小、位置并设置要显示的用户ID和摄像头ID即可。

注意：只有在CloudroomVideoMeeting入会成功后才能正常工作。

##### 屏幕共享画面显示组件CloudroomScreenShareUI {#CloudroomScreenShareUI}

    CLSID: {6FF142C5-8A36-49d7-B627-D60B803550FC}
    ProgID: npCloudroomVideoSDK.CloudroomScreenShareUI
    MIME: application/x-cloudroom-screenshareui

  CloudroomScreenShareUI是屏幕共享显示组件，它用于显示会议内对方共享的屏幕图像。

  该组件一个进程内只能创建一个实例，整个程序只能创建一个CloudroomScreenShareUI对象，用来接受显示他人开启共享后传过来的画面, 开启共享的接口是CloudroomVideoMeeting中的接口[startScreenShare](meeting.md#startScreenShare)。

  注意：只有在CloudroomVideoMeeting入会成功后才能正常工作。

##### 影音显示组件CloudroomMediaUI {#CloudroomMediaUI}

    CLSID: {93A618D5-2535-42d0-B72B-95705263F398}
    ProgID: npCloudroomVideoSDK.CloudroomMediaUI
    MIME: application/x-cloudroom-mediaui

CloudroomMediaUI是影音显示组件，它用于显示自己或者对方会议内播放的影音图像和声音。

该组件一个进程内只能创建一个实例，整个程序只能创建一个CloudroomMediaUI对象，影音控制接口由CloudroomVideoMeeting统一提供。

注意：只有在CloudroomVideoMeeting入会成功后才能正常工作。

# <font color="#2674ba">会议CloudroomMeetingSDK(V3.1)</font>

>CloudroomMeetingSDK是由众多的DLL组合而成，对外提供有四个控件：

   &emsp;&emsp;a.[<font color="#718c00">云屋会议控件CloudroomMeeting</font>](#CloudroomMeeting)

   &emsp;&emsp;b.[<font color="#718c00">视频界面控件VideoUI</font>](#VideoUI)

   &emsp;&emsp;c.[<font color="#718c00">屏幕共享界面控件ScreenShareUI</font>](#ScreenShareUI)

   &emsp;&emsp;d.[<font color="#718c00">媒体界面控件MediaUI</font>](#MediaUI)
    
### <a id="CloudroomMeeting"><font color="#0099cc">CloudroomMeeting</font></a>

>- <p>CLSID:<font face="微软雅黑"> {BDEB623E-D629-49d5-AE39-5B43E7572A62}</font>;</p>
-  <p>ProgID: npCloudroomMeetingSDK.ScreenShareUI;</p>
-  <p>MIME TYPE: application/x-cloudroom-meetingsdk;</p>
-  <p>CloudroomMeeting是核心控件，它实现会议的基础功能;</p>
-  <p>一个进程内只能创建一个实例，直到应用退出时才反初始化并销毁;</p>

   + CloudroomMeeting控件使用过程主要包括:

    a.创建控件实例，执行初始化;

    b.登录;

    c.通话;

### <a id="VideoUI"><font color="#0099cc">VideoUI</font></a>

>- <p>CLSID: {5872A9E0-2401-4abb-B75A-D6F361099C81};</p>
-  <p>ProgID: npCloudroomMeetingSDK.VideoUI;</p>
-  <p>MIME TYPE: application/x-cloudroom-videoui;</p>
-  <p>VideoUI是视频显示控件，它显示设定的用户的视频;</p>
-  <p>VideoUI可以创建多个实例，然后分别配置大小、位置并设置要显示的用户ID即可;</p>
-  <p>也可以不使用VideoUI控件，而是接收CloudroomMeeting的notifyVideoData事件，然后使用CloudroomMeeting的getVideoImg接口来获取图像，自已实现显示功能;</p>
<font color="red">&emsp;&emsp;注意：CloudroomMeetingSDK视频统一采用16:9的尺寸编码，为了保证显示的图像不变形，请尽量保证VideoUI的宽高比为16:9。</font>

### <a id="ScreenShareUI"><font color="#0099cc">ScreenShareUI</font></a>

>- <p>CLSID: {CLSID: {11A191A8-4E28-4952-99F6-D5CBC862FEB4};</p>
-  <p>ProgID: ProgID: npCloudroomMeetingSDK.ScreenShareUI;</p>
-  <p>MIME TYPE: application/x-cloudroom-screenshareui;</p>
-  <p>ScreenShareUI是屏幕共享显示控件，它用于显示对方共享的屏幕图像；</p>
-  <p>也可以不使用ScreenShareUI控件，而是接收CloudroomMeeting的notifyScreenShareData事件，然后使用CloudroomMeetig的getShareScreenDecodeImg接口来获取图像，自已实现显示功能;</p>

### <a id="MediaUI"><font color="#0099cc">MediaUI</font></a>

>- <p>CLSID: {8344A9F9-EBC1-4A27-B20D-A100D68ACC7B};</p>
-  <p>ProgID: npCloudroomMeetingSDK.MediaUI;</p>
-  <p>MIME TYPE: application/x-cloudroom-mediaui;</p>
-  <p>MediaUI是影音显示控件，它用于显示自己或者对方播放的影音图像;</p>
-  <p>可以创建多个影音控件，但显示的都是当前播放的影音内容，影音控制接口由CloudroomMeetig统一提供</p>

