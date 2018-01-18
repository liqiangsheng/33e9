# <font color="#2674ba">集成指南</font>

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
 