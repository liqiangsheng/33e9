<!-- 会议核心 -->
# <font color="#2674ba">CloudroomVideoMeeting对象</font>

>CloudroomVideoMeeting是会议核心控件，实现通话建立、音频采集播入、视频采集编解码、屏幕共享、录制、影音播放等

<!-- 1 -->
### <font color="#0099cc">设置、获取麦克风音量大小</font> {#micVolume}

<p style="background:#f7f7f7;color:#718c00">属性micVolume</p>

>int micVolume

- **功能**:设置、获取麦克风音量大小

- **返回值**:无

- **参数**:无

>可读、可写.音量等级（0-255）

<!-- 2 -->
### <font color="#0099cc">设置、获取本地扬声器音量</font> {#speakerVolume}

<p style="background:#f7f7f7;color:#718c00">属性speakerVolume</p>

>int speakerVolume

- **功能**:设置、获取本地扬声器音量

- **返回值**:无

- **参数**:无

>可读、可写.音量等级（0-255)

<!-- 3 -->
### <font color="#0099cc">检查屏幕共享是否已开启</font> {#isScreenShareStarted}

<p style="background:#f7f7f7;color:#718c00">属性isScreenShareStarted</p>

>int isScreenShareStarted

- **功能**:检查屏幕共享是否已开启

- **返回值**:无

- **参数**:无

>可读.0：没有开启，1：已经开启

<!-- 4 -->
### <font color="#0099cc">支持的最大屏幕宽度</font> {#supportMaxScreenWidth}

<p style="background:#f7f7f7;color:#718c00">属性supportMaxScreenWidth</p>

>int supportMaxScreenWidth

- **功能**:支持的最大屏幕宽度

- **返回值**:无

- **参数**:无

>可读

<!-- 5 -->
### <font color="#0099cc">支持的最大屏幕高度</font> {#supportMaxScreenHeight}

<p style="background:#f7f7f7;color:#718c00">属性supportMaxScreenHeight</p>

>int supportMaxScreenHeight

- **功能**:支持的最大屏幕高度

- **返回值**:无

- **参数**:无

>可读

<!-- 6 -->
### <font color="#0099cc">设置、获取自定义抓屏功能</font> {#customizeCatchScreen}

<p style="background:#f7f7f7;color:#718c00">属性customizeCatchScreen</p>

>int customizeCatchScreen

- **功能**:设置、获取自定义抓屏功能

- **返回值**:无

- **参数**:无

>可读、可写.0：默认抓屏处理；1：自定议抓屏设置自定义抓屏后，sdk需要图像时将产生notiyCatchScreen事件，使用者再通过setCustomizeScreenImg接口送入图像

<!-- 7 -->
### <font color="#0099cc">播放是否静音</font> {#speakerMute}

<p style="background:#f7f7f7;color:#718c00">属性speakerMute</p>

>int speakerMute

- **功能**:播放是否静音

- **返回值**:无

- **参数**:无

>可读、可写. 对会议内所有声音生效0:不静音 1:静音

<!-- 8 -->
### <font color="#0099cc">当前哪个用户为主视频</font> {#mainVideo}

<p style="background:#f7f7f7;color:#718c00">属性mainVideo</p>

>string mainVideo

- **功能**:当前哪个用户为主视频

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 9 -->
### <font color="#0099cc">影音播放的音量</font> {#mediaVolume}

<p style="background:#f7f7f7;color:#718c00">属性mediaVolume</p>

>int mediaVolume

- **功能**: 影音播放的音量

- **返回值**:无

- **参数**:无

>可读、可写. 音量等级(0-255)

<!-- 10 -->
### <font color="#0099cc">呼叫成功，双方开始进入本次视频会议</font> {#enterMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 enterMeeting ()</p>

>void enterMeeting(int meetID, string pswd , string userID, string nickName)

- **功能**:呼叫成功，双方开始进入本次视频会议

- **返回值**:无

- **参数**:
  + meetID  ------ 视频会议ID
  + pswd ------ 本次会议中的密码（在创建会议时）

>响应事件enterMeetingRslt

<!-- 11 -->
### <font color="#0099cc">判断某个用户是否在会议中</font> {#isUserInMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 isUserInMeeting  ()</p>

>int isUserInMeeting(string userID)	 

- **功能**:判断某个用户是否在会议中

- **返回值**:1：在，0：不在

- **参数**:
  + userID ------ 用户的id

<!-- 12 -->
### <font color="#0099cc">结束会议</font> {#stopMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 stopMeeting ()</p>

>void stopMeeting(int meetID, string cookie)	 

- **功能**:结束会议

- **返回值**:无

- **参数**:
  + meetID ------ 会议id
  + cookie ------ 自定义数据(在回调时，回传给调用者)

>响应事件 stopMeetingRslt   会议被他人结束时的回调事件 meetingStopped

<!-- 13 -->
### <font color="#0099cc">离开会议</font> {#exitMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 exitMeeting ()</p>

>void exitMeeting()

- **功能**:离开会议

- **返回值**:无

- **参数**:无

>他人离开会议的回调事件userLeftMeeting

<!-- 14 -->
### <font color="#0099cc">获取所有用户的信息</font> {#getAllMembers}

<p style="background:#f7f7f7;color:#718c00">方法 getAllMembers ()</p>

>string getAllMembers()

- **功能**:获取所有用户的信息

- **返回值**:json格式的字符串,详见MembersObj说明

- **参数**:无

<!-- 15 -->
### <font color="#0099cc">获取某个用户的信息</font> {#getMemberInfo}

<p style="background:#f7f7f7;color:#718c00">方法 getMemberInfo  ()</p>

>string getMemberInfo(string userID)   

- **功能**:获取某个用户的信息

- **返回值**:json格式的字符串,详见MemberObj说明

- **参数**:
 + userID ------ 用户ID 

<!-- 16 -->
### <font color="#0099cc">获取某个用户的昵称</font> {#getMemberNickName}

<p style="background:#f7f7f7;color:#718c00">方法 getMemberNickName ()</p>

>string getMemberNickName(string userID)

- **功能**:获取某个用户的昵称

- **返回值**:用户的昵称

- **参数**:
 + userID ------ 用户ID

<!-- 17 -->
### <font color="#0099cc">获取系统上的麦克风列表</font> {#getAudioMicNames }

<p style="background:#f7f7f7;color:#718c00">方法 getAudioMicNames ()</p>

>string getAudioMicNames()

- **功能**:麦克风列表，以’\n’分割；

- **返回值**:无

- **参数**:无

<!-- 18 -->
### <font color="#0099cc">获取系统上的扬声器列表</font> {#getAudioSpkNames}

<p style="background:#f7f7f7;color:#718c00">方法 getAudioSpkNames ()</p>

> string getAudioSpkNames()	 

- **功能**:获取系统上的扬声器列表

 **返回值**:无

- **参数**:无

<!-- 19 -->
### <font color="#0099cc">获取音频参数</font> {#getAudioCfg}

<p style="background:#f7f7f7;color:#718c00">方法 getAudioCfg ()</p>

>string getAudioCfg()

- **功能**:获取音频参数

- **返回值**:json格式的字符串,详见AudioCfgObj说明

- **参数**:无

<!-- 20 -->
### <font color="#0099cc">设置音频参数</font> {#setAudioCfg}

<p style="background:#f7f7f7;color:#718c00">方法 setAudioCfg ()</p>

> void setAudioCfg(string json) 	 

- **功能**:设置音频参数

- **返回值**:无

- **参数**:
 + json ------ json格式的字符串,详见AudioCfgObj说明

<!-- 21 -->
### <font color="#0099cc">获取用户说话声音大小</font> {#getMicEnergy}

<p style="background:#f7f7f7;color:#718c00">方法 getMicEnergy ()</p>

> int getMicEnergy(string userID) 	 

- **功能**:获取用户说话声音大小

- **返回值**:音量大小（0~10)

- **参数**:
 + userID  ------ 登录成功后分配的userID

<!-- 22 -->
### <font color="#0099cc">打开用户的麦克风</font> {#openMic}

<p style="background:#f7f7f7;color:#718c00">方法 openMic ()</p>

>void openMic(string userID)	 

- **功能**:打开用户的麦克风

- **返回值**:无

- **参数**:
 + userID  ------ 用户的ID

>打开麦克风时，先会进入到AOPENING状态，等服务器处理后才会进入AOPEN状态，此时说话才能被采集到

<!-- 24 -->
### <font color="#0099cc">关闭用户的麦克风</font> {#closeMic}

<p style="background:#f7f7f7;color:#718c00">方法 closeMic ()</p>

>void closeMic(string userID)	 

- **功能**:关闭用户的麦克风

- **返回值**:无

- **参数**:
 + userID  ------ 用户的ID

>关麦操作是立即生效的，会立即停止采集

<!-- 25 -->
### <font color="#0099cc">获取用户的麦状态</font> {#getAudioStatus}

<p style="background:#f7f7f7;color:#718c00">方法 getAudioStatus ()</p>

>int getAudioStatus(string userID)	 

- **功能**:获取用户的麦状态

- **返回值**:麦克风设备状态，请参见[ASTATUS](Constant.md#ASTATUS)定义无

- **参数**:
 + userID  ------ 登录成功后分配的userID

<!-- 26 -->
### <font color="#0099cc">设置摄像头参数</font> {#setVideoCfg}

<p style="background:#f7f7f7;color:#718c00">方法 setVideoCfg ()</p>

>void setVideoCfg(string jsonCfg)	 

- **功能**:设置摄像头参数

- **返回值**:无

- **参数**:
 + jsonCfg  ------ json格式的字符串，详见[VideoCfgObj](ObjectstructureDing.md#VideoCfgObj)说明

<!-- 27 -->
### <font color="#0099cc">获取用户的摄像头状态</font> {#getVideoStatus}

<p style="background:#f7f7f7;color:#718c00">方法 getVideoStatus ()</p>

>VSTATUS getVideoStatus(string userID)	 

- **功能**:获取用户的摄像头状态

- **返回值**:麦克风摄像头状态，请参见[VSTATUS](Constant.md#VSTATUS)定义

- **参数**:
 + userID  ------ 用户的ID

<!-- 28 -->
### <font color="#0099cc">打开用户的摄像头，以便本地、远端显示视频图像</font> {#openVideo}

<p style="background:#f7f7f7;color:#718c00">方法 openVideo ()</p>

>void openVideo(string userID)	 

- **功能**:打开用户的摄像头，以便本地、远端显示视频图像

- **返回值**:无

- **参数**:
 + userID  ------ 用户的ID

>请见事件[videoStatusChanged](#videoStatusChanged)

<!-- 29 -->
### <font color="#0099cc">关闭用户的摄像头</font> {#closeVideo}

<p style="background:#f7f7f7;color:#718c00">方法 closeVideo ()</p>

>void closeVideo(string userID)

- **功能**:关闭用户的摄像头

- **返回值**:无

- **参数**:
 + userID  ------ 用户的ID

>请见事件[videoStatusChanged](#videoStatusChanged)

<!-- 30 -->
### <font color="#0099cc">关闭所有用户的麦克风</font> {#setAllAudioClose}

<p style="background:#f7f7f7;color:#718c00">方法 setAllAudioClose ()</p>

>void setAllAudioClose()

- **功能**:关闭所有用户的麦克风

- **返回值**:无

- **参数**:无

>请见事件[audioStatusChanged](#audioStatusChanged)

<!-- 31 -->
### <font color="#0099cc">获取指定用户的最新图像</font> {#getVideoImg}

<p style="background:#f7f7f7;color:#718c00">方法 getVideoImg ()</p>

>string getVideoImg(string userID，int videoID)

- **功能**:获取指定用户的最新图像

- **返回值**:json格式的字符串,详见[VideoImgObj](ObjectstructureDing.md#VideoImgObj)说明

- **参数**:
 + userID ------ 用户ID
 + videoID ------ 摄像头ID

<!-- 32 -->
### <font color="#0099cc">设置默认的摄像头</font> {#setDefaultVideo}

<p style="background:#f7f7f7;color:#718c00">方法 setDefaultVideo ()</p>

>void setDefaultVideo(string userID，long videoID)

- **功能**:设置默认的摄像头

- **返回值**:无

- **参数**:
 + userID ------ 用户ID
 + videoID ------ 摄像头ID

>videoID，应该从getAllVideoInfo返回值中获取

<!-- 33 -->
### <font color="#0099cc">获取指定用户的默认摄像头</font> {#getDefaultVideo}

<p style="background:#f7f7f7;color:#718c00">方法 getDefaultVideo ()</p>

>int getDefaultVideo(string userID)

- **功能**:获取指定用户的默认摄像头

- **返回值**:摄像头ID

- **参数**:
 + userID ------ 用户ID

>如果用户没有摄像头，返回0

<!-- 34 -->
### <font color="#0099cc">查询用户是否启用多摄像头</font> {#getEnableMutiVideo}

<p style="background:#f7f7f7;color:#718c00">方法 getEnableMutiVideo ()</p>

>int getEnableMutiVideo(string userID)

- **功能**:查询用户是否启用多摄像头

- **返回值**: 1表示开启了，0表示未开启

- **参数**:
 + userID ------ 用户ID

<!-- 34 -->
### <font color="#0099cc">设置用户是否启用多摄像头</font> {#setEnableMutiVideo}

<p style="background:#f7f7f7;color:#718c00">方法 setEnableMutiVideo ()</p>

>void setEnableMutiVideo(string userID, int bEnable)

- **功能**:设置用户是否启用多摄像头

- **返回值**: 无

- **参数**:
 + userID ------ 用户ID
 + bEnable ------ bEnable: 1表示开启，0表示关闭

<!-- 35 -->
### <font color="#0099cc">获取用户所有的摄像头信息</font> {#getAllVideoInfo }

<p style="background:#f7f7f7;color:#718c00">方法 getAllVideoInfo ()</p>

>string getAllVideoInfo(string userID)

- **功能**:获取用户所有的摄像头信息

- **返回值**: json格式的字符串,详见[VideoInfosObj](ObjectstructureDing.md#VideoInfosObj)说明

- **参数**:
 + userID ------ 用户ID

<!-- 36 -->
### <font color="#0099cc">获取会议内所有可观看的摄像头</font> {#getWatchableVideos }

<p style="background:#f7f7f7;color:#718c00">方法 getWatchableVideos ()</p>

>string getWatchableVideos()

- **功能**:获取会议内所有可观看的摄像头

- **返回值**: json格式的字符串,详见[VideoIDObjs](ObjectstructureDing.md#VideoIDObjs)说明

- **参数**:无

<!-- 37 -->
### <font color="#0099cc">将图片资源设置给sdk</font> {#setPicResource }

<p style="background:#f7f7f7;color:#718c00">方法 setPicResource ()</p>

>void setPicResource(string picID, string jsonVal) 

- **功能**:将图片资源设置给sdk

- **返回值**: 无

- **参数**:
 + picID ------ 资源唯一标识；（可以uuid，也可以序号方式）
 + jsonVal ------ 资源内容，json格式，详见[PicResourceObj](ObjectstructureDing.md#PicResourceObj)说明。（注：如果jsonVal为空串，代表移除资源。）

<!-- 38 -->
### <font color="#0099cc">获取当前屏幕共享配置</font> {#getScreenShareCfg }

<p style="background:#f7f7f7;color:#718c00">方法 getScreenShareCfg ()</p>

>string getScreenShareCfg() 

- **功能**:获取当前屏幕共享配置

- **返回值**: json格式的字符串,详见[ScreenShareCfgObj](ObjectstructureDing.md#ScreenShareCfgObj)说明

- **参数**:无

<!-- 39 -->
### <font color="#0099cc">设置当前屏幕共享配置</font> {#setScreenShareCfg }

<p style="background:#f7f7f7;color:#718c00">方法 setScreenShareCfg ()</p>

>void setScreenShareCfg(string json) 

- **功能**:设置当前屏幕共享配置

- **返回值**: 无

- **参数**:json格式的字符串,详见[ScreenShareCfgObj](ObjectstructureDing.md#ScreenShareCfgObj)说明

<!-- 40 -->
### <font color="#0099cc">开启屏幕共享</font> {#startScreenShare }

<p style="background:#f7f7f7;color:#718c00">方法 startScreenShare ()</p>

>void startScreenShare()

- **功能**:开启屏幕共享

- **返回值**: 无

- **参数**:无

>响应事件startScreenShareRslt

<!-- 41 -->
### <font color="#0099cc">停止屏幕共享</font> {#stopScreenShare }

<p style="background:#f7f7f7;color:#718c00">方法 stopScreenShare ()</p>

>void stopScreenShare()

- **功能**:停止屏幕共享

- **返回值**: 无

- **参数**:无

>响应事件stopScreenShareRslt

<!-- 42 -->
### <font color="#0099cc">获取屏幕共享解码图像</font> {#getShareScreenDecodeImg }

<p style="background:#f7f7f7;color:#718c00">方法 getShareScreenDecodeImg ()</p>

>string getShareScreenDecodeImg()

- **功能**:获取屏幕共享解码图像

- **返回值**: json格式的字符串,详见[VideoImgObj](ObjectstructureDing.md#VideoImgObj)说明

- **参数**:无

<!-- 43 -->
### <font color="#0099cc">设置自定义的抓屏图像数据</font> {#setCustomizeScreenImg }

<p style="background:#f7f7f7;color:#718c00">方法 setCustomizeScreenImg ()</p>

>void setCustomizeScreenImg(int format, int width, int height, string dat)

- **功能**:设置自定义的抓屏图像数据

- **返回值**: json格式的字符串,详见[VideoImgObj](ObjectstructureDing.md#VideoImgObj)说明

- **参数**:
 + format ------ 参见[VIDEO_FORMAT](Constant.md#VIDEO_FORMAT)
 + width ------ 图像的宽度
 + height ------ 图像的高度
 + dat ------ 承载argb数据,base64编码

>当前只支持VFMT_ARGB32格式；如果在收到notiyCatchScreen事件时，暂当前无图像可送时，可送空数据进去(width=0, height=0, dat为空)

<!-- 44 -->
### <font color="#0099cc">设置要录制的视频</font> {#setRecordVideos }

<p style="background:#f7f7f7;color:#718c00">方法 setRecordVideos ()</p>

>void setRecordVideos(string json)

- **功能**:设置要录制的视频

- **返回值**:无 

- **参数**: json格式的字符串,详见[RecordVideosObj](ObjectstructureDing.md#RecordVideosObj)说明(录制过程中配置有效)

<!-- 45 -->
### <font color="#0099cc">开启录制</font> {#startRecording }

<p style="background:#f7f7f7;color:#718c00">方法 startRecording ()</p>

>int startRecording(string json)

- **功能**:开启录制

- **返回值**: 0：开启失败； 1：开启成功

- **参数**:json 录制参数,json格式的字符串,详见[RecordCfgObj](ObjectstructureDing.md#RecordCfgObj)说明
