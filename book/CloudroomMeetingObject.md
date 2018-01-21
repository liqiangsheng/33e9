# <font color="#2674ba">CloudroomMeeting对象</font>

>CloudroomMeeting是核心控件，实现登录、队列、呼叫、通话建立、音频采集播入、视频采集编解码、屏幕共享、录制、影音播放等

<!-- 1 -->
### <font color="#0099cc">获取sdk的版本信息</font> {#Version}

<p style="background:#f7f7f7;color:#718c00">属性 Version</p>

>string Version

- **功能**:获取sdk的版本信息

- **返回值**:无

- **参数**:无

>可读

<!-- 2 -->
### <font color="#0099cc">SDK初始化</font> {#init}

<p style="background:#f7f7f7;color:#718c00">方法 init ()</p>

>CRMEETSDK_ERR_DEF init(string oemid, string sdkFilePath)

- **功能**:SDK初始化

- **返回值**:CRMEETSDK_NOERR为成功，否则是失败代码

- **参数**:
 + oemid ----- 向云屋申请的开发商ID
 + sdkFilePath ------ sdk配置、临时文件存放位置，可为空

>每次init后，都应对一次uninit

<!-- 3 -->
### <font color="#0099cc">SDK反初始化</font> {#uninit}

<p style="background:#f7f7f7;color:#718c00">方法 uninit ()</p>

>void uninit()

- **功能**:SDK反初始化

- **返回值**:无

- **参数**:无

<!-- 4 -->
### <font color="#0099cc">设置服务器地址、获取设置的服务器地址</font> {#loginServerAddr}

<p style="background:#f7f7f7;color:#718c00">属性 loginServerAddr</p>

>string loginServerAddr

- **功能**:设置服务器地址、获取设置的服务器地址

- **返回值**:无

- **参数**:无

>可读、可写.支持单个服务器地址（如：www.cloudroom.com）或多个服务器地址串（如：www.cloudroom.com:8080;183.60.47.52:8080;）

<!-- 5 -->
### <font color="#0099cc">登陆服务器</font> {#login}

<p style="background:#f7f7f7;color:#718c00">方法 login ()</p>

>void login( string authAcnt, string authPswd, string nickName, string privAcnt,  string privAuthCode,  string cookie)

- **功能**:登陆服务器

- **返回值**:无

- **参数**:
  + authAcnt ------ 云屋鉴权帐号
  + authPswd ------ 云屋鉴权密码
  + nickName ------ 昵称
  + privAcnt------ 自定义帐号，不需要时传空字符串
  + privAuthCode ------ 自定义验证码(有复杂要求的，可以使用json格式)，不需要时传空字符串
  + cookie ------ 自定义数据 (在回调时，回传给调用者)，不需要时传空字符串

>成功事件[loginSuccess](#loginSuccess);失败事件[loginFail](#loginFail)

<!-- 6 -->
### <font color="#0099cc">注销本次登陆</font>

<p style="background:#f7f7f7;color:#718c00">方法 logout ()</p>

>void logout()

- **功能**:注销本次登陆

- **返回值**:无

- **参数**:无

>无事件

<!-- 7 -->
### <font color="#0099cc">设置免打扰状态</font> {#setDNDStatus}

<p style="background:#f7f7f7;color:#718c00">方法 setDNDStatus ()</p>

>void setDNDStatus(int DNDStatus,  string cookie)

- **功能**:设置免打扰状态

- **返回值**:无

- **参数**:
  + DNDStatus ------ 0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义
  + cookie ------ 自定义数据(在回调时，回传给调用者)，不需要时传空字符串

>成功事件[setDNDStatusSuccess](#setDNDStatusSuccess);失败事件[setDNDStatusFail](#setDNDStatusFail)

<!-- 8 -->
### <font color="#0099cc">创建会议</font> {#CreateMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 CreateMeeting ()</p>

>void createMeeting(string meetSubject,  string cookie)

- **功能**:创建会议

- **返回值**:无

- **参数**:
  + meetSubject ------ 会议主题（字符长度最大值50）
  + cookie ------ 自定义数据(在回调时，回传给调用者)，不需要时传空字符串

>成功事件[createMeetingSuccess](#createMeetingSuccess);失败事件[createMeetingFail](#createMeetingFail)

<!-- 9 -->
### <font color="#0099cc">呼叫成功，双方开始进入本次视频会话</font> {#enterMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 enterMeeting  ()</p>

>void enterMeeting(int meetID, string pswd)

- **功能**:呼叫成功，双方开始进入本次视频会话

- **返回值**:无

- **参数**:
  + meetID  ------ 视频会话ID
  + pswd ------ 本次会议中的密码（系统自动生成，在呼叫回调中取得）

>响应事件[enterMeetingRslt](#enterMeetingRslt)

<!-- 10 -->
### <font color="#0099cc">判断某个用户是否在会话中</font> {#isUserInMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 isUserInMeeting ()</p>

>int isUserInMeeting(string userID)

- **功能**:判断某个用户是否在会话中

- **返回值**:1：在，0：不在

- **参数**:
  + userID ------ 用户的id
  + pswd ------ 本次会议中的密码（系统自动生成，在呼叫回调中取得）

<!-- 11 -->
### <font color="#0099cc">结束会话</font> {#stopMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 stopMeeting ()</p>

>void stopMeeting()

- **功能**:结束会话

- **返回值**:无

- **参数**:无

>响应事件 [endMeetingRslt](#endMeetingRslt);会话被他人结束回调事件 [meetingStopped](#meetingStopped)

<!-- 12 -->
### <font color="#0099cc">离开会话</font> {#exitMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 exitMeeting ()</p>

>void exitMeeting()

- **功能**:离开会话

- **返回值**:无

- **参数**:无


>他人离开会话的回调事件[userLeftMeeting](#userLeftMeeting)

<!-- 13 -->
### <font color="#0099cc">获取某个用户的信息</font>

<p style="background:#f7f7f7;color:#718c00">方法 getMemberInfo ()</p>

>string getMemberInfo(string userID)

- **功能**:获取某个用户的信息

- **返回值**:json格式的字符串,详见下表

- **参数**:
 + userID ------ 用户ID

json串中含单个成员信息，如

<p style="background:#f7f7f7;color:#8959A8">{"userID":"222","nickName":"bbb","audioStatus":"1","videoStatus":"1"}</p>

- userID ------ 用户ID

- nickname ------ 设备名称

- audioStatus ------ 音频状态,数值参考麦克风状态ASTATUS

- videoStatus ------ 视频状态,数值参考视频状态定义VSTATUS

<!-- 14 -->
### <font color="#0099cc">获取所有用户的信息</font> {#getAllMembers}

<p style="background:#f7f7f7;color:#718c00">方法 getAllMembers ()</p>

>string getAllMembers()

- **功能**:获取所有用户的信息

- **返回值**:json格式的字符串,详见下表

- **参数**:无

json串中含单个成员信息，如:

<p style="background:#f7f7f7;color:#8959A8">["userID":"111","nickName":"aaa","audioStatus":"1","videoStatus":"1"}{"userID":"222","nickName":"bbb","audioStatus":"1","videoStatus":"1"}]</p>

- userID ------ 用户ID

- nickname ------ 设备名称

- audioStatus ------ 音频状态,数值参考麦克风状态[ASTATUS](#Constant.md#ASTATUS)

- videoStatus ------ 视频状态,数值参考视频状态定义[VSTATUS](#Constant.md#VSTATUS)

<!-- 15 -->
### <font color="#0099cc">获取某个用户的昵称</font> {#getMemberNickName}

<p style="background:#f7f7f7;color:#718c00">方法 getMemberNickName ()</p>

>string getMemberNickName(string userID)

- **功能**:获取某个用户的昵称

- **返回值**:用户的昵称

- **参数**:
 + userID ------ 用户ID

<!-- 16 -->
### <font color="#0099cc">获取系统上的麦克风列表</font> {#getAudioMicNames}

<p style="background:#f7f7f7;color:#718c00">方法 getAudioMicNames ()</p>

>string getAudioMicNames()

- **功能**:获取系统上的麦克风列表

- **返回值**:麦克风列表，以’\n’分割；

- **参数**:无

<!-- 17 -->
### <font color="#0099cc">获取系统上的扬声器列表</font> {#getAudioSpkNames}

<p style="background:#f7f7f7;color:#718c00">方法 getAudioSpkNames ()</p>

>string getAudioSpkNames ()

- **功能**:获取系统上的扬声器列表

- **返回值**:麦克风列表，以’\n’分割；

- **参数**:无

<!-- 18 -->
### <font color="#0099cc">获取音频参数</font> {#getAudioCfg}

<p style="background:#f7f7f7;color:#718c00">方法 getAudioCfg ()</p>

>string getAudioCfg() 

- **功能**:获取音频参数

- **返回值**:
 + json格式的字符串,详见下列详解

- **参数**:无

json格式说明:

- "micName": "aaa" ------- 麦克风设备名称
- "speakerName": "aaa" ------- 扬声器名称
- "privEC": "0" ------- 是否开启云屋私有回声消息0：不开启；1：开启
- "privAgc": "0" ------- 是否开启云屋私有语音自动增益0：不开启；1：开启

<!-- 19 -->
### <font color="#0099cc">设置音频参数</font> {#setAudioCfg}

<p style="background:#f7f7f7;color:#718c00">方法 setAudioCfg ()</p>

>void setAudioCfg(string json) 

- **功能**:设置音频参数

- **返回值**:无

- **参数**:
  + json ------ json格式的字符串,详见下列详解

json格式说明:

- "micName": "aaa" ------- 麦克风设备名称
- "speakerName": "aaa" ------- 扬声器名称
- "privEC": "0" ------- 是否开启云屋私有回声消息0：不开启；1：开启
- "privAgc": "0" ------- 是否开启云屋私有语音自动增益0：不开启；1：开启

<!-- 20 -->
### <font color="#0099cc">设置、获取麦克风音量大小</font> {#micVolume}

<p style="background:#f7f7f7;color:#718c00">属性 micVolume</p>

>int micVolume 

- **功能**:设置、获取麦克风音量大小

- **返回值**:无

- **参数**:无

> 可读、可写.音量等级（0-255）

<!-- 21 -->
### <font color="#0099cc">设置、获取本地扬声器音量</font> {#speakerVolume}

<p style="background:#f7f7f7;color:#718c00">属性 speakerVolume</p>

>int speakerVolume

- **功能**:设置、获取本地扬声器音量

- **返回值**:无

- **参数**:无

> 可读、可写.音量等级（0-255）

<!-- 22 -->
### <font color="#0099cc">获取用户说话声音大小</font> {#getMicEnergy}

<p style="background:#f7f7f7;color:#718c00">方法  getMicEnergy ()</p>

>int getMicEnergy(string userID)

- **功能**:获取用户说话声音大小

- **返回值**:音量大小（0~10）

- **参数**:
 + userID ------ 登录成功后分配的userID

<!-- 23 -->
### <font color="#0099cc">打开用户的麦克风</font> {#openMic}

<p style="background:#f7f7f7;color:#718c00">方法  openMic ()</p>

>void openMic(string userID)

- **功能**:打开用户的麦克风

- **返回值**:无

- **参数**:
 + userID ------ 用户的ID

> 打开麦克风时，先会进入到AOPENING状态，等服务器处理后才会进入AOPEN状态，此时说话才能被采集到；

<!-- 24 -->
### <font color="#0099cc">关闭用户的麦克风</font> {#closeMic}

<p style="background:#f7f7f7;color:#718c00">方法  closeMic ()</p>

>void closeMic(string userID)

- **功能**:关闭用户的麦克风

- **返回值**:无

- **参数**:
 + userID ------ 用户的ID

> 关麦操作是立即生效的，会立即停止采集

<!-- 25 -->
### <font color="#0099cc">获取用户的麦状态</font> {#getAudioStatus}

<p style="background:#f7f7f7;color:#718c00">方法  getAudioStatus  ()</p>

>int getAudioStatus(string userID)

- **功能**:获取用户的麦状态

- **返回值**:麦克风设备状态，请参见[ASTATUS](Constant.md#ASTATUS)定义

- **参数**:
 + userID ------ 登录成功后分配的userID

<!-- 26 -->
### <font color="#0099cc">视频的显示尺寸</font> {#videoFPS}

<p style="background:#f7f7f7;color:#718c00">属性  videoFPS</p>

>int videoFPS

- **功能**:视频帧率

- **返回值**:无

- **参数**:无

>可读、可写.取值范围：5-30


<!-- 27 -->
### <font color="#0099cc">视频的显示尺寸</font> {#curVideoSize}

<p style="background:#f7f7f7;color:#718c00">属性  curVideoSize</p>

>int curVideoSize

- **功能**:视频的显示尺寸

- **返回值**:无

- **参数**:无

>可读、可写.详见视频尺寸定义[VIDEO_SHOW_SIZE](Constant.md#VIDEO_SHOW_SIZE)

<!-- 28 -->
### <font color="#0099cc">获取指定视频尺寸的码率</font> {#getVideoBitrates}

<p style="background:#f7f7f7;color:#718c00">方法  getVideoBitrate ()</p>

>int getVideoBitrate(int videoSizeType)

- **功能**:获取指定视频尺寸的码率

- **返回值**:kbps 比特率；（-1代表使用sdk内部默认值）

- **参数**:
 + videoSizeType ----- 视频尺寸，请参见[VIDEO_SHOW_SIZE](Constant.md#VIDEO_SHOW_SIZE)定义

<!-- 29 -->
### <font color="#0099cc">设置指定视频尺寸的码率</font> {#setVideoBitrate}

<p style="background:#f7f7f7;color:#718c00">方法  setVideoBitrate ()</p>

>void setVideoBitrate(int videoSizeType，int kbps)

- **功能**:设置指定视频尺寸的码率

- **参数**:
 + videoSizeType ------ 视频尺寸，请参见[VIDEO_SHOW_SIZE](Constant.md#VIDEO_SHOW_SIZE)定义
 + kbps ------ 比特率；（-1代表使用sdk内部默认值）

 <!-- 30 -->
### <font color="#0099cc">获取用户的摄像头状态</font> {#getVideoStatus}

<p style="background:#f7f7f7;color:#718c00">方法  getVideoStatus ()</p>

>VSTATUS getVideoStatus(string userID)

- **功能**:获取用户的摄像头状态

- **返回值**:麦克风摄像头状态，请参见[VSTATUS](Constant.md#VSTATUS)定义

- **参数**:
 + userID ------ 用户的ID

  <!-- 31 -->
### <font color="#0099cc">打开用户的摄像头，以便本地、远端显示视频图像</font> {#openVideo}

<p style="background:#f7f7f7;color:#718c00">方法  openVideo ()</p>

>void openVideo(string userID)

- **功能**:打开用户的摄像头，以便本地、远端显示视频图像

- **返回值**:无

- **参数**:
 + userID ------ 用户的ID

>请见事件[videoStatusChanged](#videoStatusChanged)

  <!-- 32 -->
### <font color="#0099cc">关闭用户的摄像头</font> {#closeVideo}

<p style="background:#f7f7f7;color:#718c00">方法  closeVideo ()</p>

>void closeVideo(string userID)

- **功能**:关闭用户的摄像头

- **返回值**:无

- **参数**:
 + userID ------ 用户的ID

>请见事件[videoStatusChanged](#videoStatusChanged)

 <!-- 33 -->
### <font color="#0099cc">关闭所有用户的麦克风</font> {#setAllAudioClose}

<p style="background:#f7f7f7;color:#718c00">方法  setAllAudioClose ()</p>

>void setAllAudioClose()

- **功能**:关闭所有用户的麦克风

- **返回值**:无

- **参数**:无

>请见事件[audioStatusChanged](#audioStatusChanged)

 <!-- 34 -->
### <font color="#0099cc">取得观看设备列表</font> {#getWatchVideos}

<p style="background:#f7f7f7;color:#718c00">方法  getWatchVideos ()</p>

>string getWatchVideos()

- **功能**:取得观看设备列表

- **返回值**:json格式的字符串,详见下列详解

- **参数**:无

json串中含有多个设备列表：

<p style="background:#f7f7f7;color:#8959A8">[
{"userID":"aaa","videoID":A},
{"userID":"aaa","videoID":B},
...
]</p>
- userID ------ 用户id
- videoID ------ 设备id

 <!-- 35 -->
### <font color="#0099cc">获取指定用户的最新图像</font> {#getVideoImg}

<p style="background:#f7f7f7;color:#718c00">方法  getVideoImg ()</p>

>string getVideoImg(string userID，int videoID)

- **功能**:获取指定用户的最新图像

- **返回值**:json格式的字符串,详见下列详解

- **参数**:
 + userID ------ 用户ID
 + videoID ------ 摄像头ID

获取到的图像帧可能比通知的图像帧更新（界面消息机制引起）；如果通知的frmTime比显示的帧要更小，那就没必要再去获取图像并进行显示了。：

<p style="background:#f7f7f7;color:#8959A8">{"format": 1, "dat":"FKLEOFJXKFD…","width":1024, "height":768,"frameTime":3213123123123}</p> 

- format ------ 图像格式,数值参考视频图像格式VIDEO_FORMAT
- dat ------ 图像数据 
- width ------ 图像宽度
- height ------ 图像高度
- frameTime ------ 图像产生的时间，从1970-01-01 00:00:00到现在为止，过去的毫秒时间

 <!-- 36 -->
### <font color="#0099cc">设置默认的摄像头</font> {#setDefaultVideo}

<p style="background:#f7f7f7;color:#718c00">方法  setDefaultVideo ()</p>

>void setDefaultVideo(string userID，long videoID)

- **功能**:设置默认的摄像头

- **返回值**:无

- **参数**:
 + userID ------ 用户ID
 + videoID ------ 摄像头ID

>videoID，应该从[getAllVideoInfo](#getAllVideoInfo)返回值中获取。

 <!-- 37 -->
### <font color="#0099cc">获取指定用户的默认摄像头</font> {#getDefaultVideo}

<p style="background:#f7f7f7;color:#718c00">方法  getDefaultVideo ()</p>

>int getDefaultVideo(string userID)

- **功能**:获取指定用户的默认摄像头

- **返回值**:摄像头ID

- **参数**:
 + userID ------ 用户ID

>如果用户没有摄像头，返回0；

 <!-- 38 -->
### <font color="#0099cc">查询用户是否启用多摄像头</font> {#getEnableMutiVideo}

<p style="background:#f7f7f7;color:#718c00">方法  getEnableMutiVideo ()</p>

>int getEnableMutiVideo(string userID)

- **功能**:查询用户是否启用多摄像头

- **返回值**:1表示开启了，0表示未开启

- **参数**:
 + userID ------ 用户ID

  <!-- 39 -->
### <font color="#0099cc">设置用户是否启用多摄像头</font> {#setEnableMutiVideo}

<p style="background:#f7f7f7;color:#718c00">方法  setEnableMutiVideo ()</p>

>void setEnableMutiVideo(string userID, int bEnable)

- **功能**:设置用户是否启用多摄像头

- **返回值**:无

- **参数**:
 + userID ------ 用户ID
 + bEnable ------ 1表示开启，0表示关闭

>（用户实现同时打开多个视频设备）

  <!-- 40 -->
### <font color="#0099cc">获取用户所有的摄像头信息</font> {#getAllVideoInfo}

<p style="background:#f7f7f7;color:#718c00">方法  getAllVideoInfo ()</p>

>string getAllVideoInfo(string userID)

- **功能**:获取用户所有的摄像头信息

- **返回值**:json格式的字符串,详见下列详解

- **参数**:
 + userID ------ 用户ID

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">[
{"userID":"111","videoID":1,"videoName":"camera1"},
{"userID":"111","videoID":2,"videoName":"camera2"},
...
]</p>

- userID ------ 用户id
- videoID ------ 设备id
- videoName -------设备名称

  <!-- 41 -->
### <font color="#0099cc">获取会议内所有可观看的摄像头</font> {#getWatchableVideos}

<p style="background:#f7f7f7;color:#718c00">方法  getWatchableVideos ()</p>

>string getWatchableVideos()

- **功能**:获取会议内所有可观看的摄像头

- **返回值**:json格式的字符串,详见下列详解

- **参数**:无

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">[
{"userID":"111","videoID":1},
{"userID":"222","videoID":2},
...
]</p>

- userID ------ 用户id
- videoID ------ 设备id

  <!-- 42 -->
### <font color="#0099cc">获取当前屏幕共享配置</font> {#getScreenShareCfg}

<p style="background:#f7f7f7;color:#718c00">方法  getScreenShareCfg ()</p>

>string getScreenShareCfg() 

- **功能**:获取当前屏幕共享配置

- **返回值**:json格式的字符串,详见下列详解

- **参数**:无

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">{"encodeType":0, "catchRect":{"left":10,"top":10,"right":100,"bottom":100}, "catchWnd":1234, "maxFPS":8, "maxKbps":800000 }</p>

- encodeType ------ 编码类型,详见屏幕共享的编码类型ENCODE_TYPE
- catchRect ------ 共享区域,可存放多个区域
- catchWnd ------ 共享的窗口的窗口句柄
- maxFPS ------ 最大帧率 缺省为8
- maxKbps ------ 最大码率，缺省800kbps

  <!-- 43 -->
### <font color="#0099cc">设置当前屏幕共享配置</font> {#setScreenShareCfg}

<p style="background:#f7f7f7;color:#718c00">方法  setScreenShareCfg ()</p>

>void setScreenShareCfg(string json) 

- **功能**:设置当前屏幕共享配置

- **返回值**:无

- **参数**:json格式的字符串,详见下列详解

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">{"encodeType":0, "catchRect":{"left":10,"top":10,"right":100,"bottom":100}, "catchWnd":1234, "maxFPS":8, "maxKbps":800000 }</p>

- encodeType ------ 编码类型,详见屏幕共享的编码类型ENCODE_TYPE
- catchRect ------ 共享区域,可存放多个区域
- catchWnd ------ 共享的窗口的窗口句柄
- maxFPS ------ 最大帧率 缺省为8
- maxKbps ------ 最大码率，缺省800kbps

  <!-- 44 -->
### <font color="#0099cc">检查屏幕共享是否已开启</font> {#isScreenShareStarted}

<p style="background:#f7f7f7;color:#718c00">属性  isScreenShareStarted</p>

>int isScreenShareStarted

- **功能**:检查屏幕共享是否已开启

- **返回值**:无

- **参数**:无

>可读.0：没有开启，1：已经开启

  <!-- 45 -->
### <font color="#0099cc">开启屏幕共享</font> {#startScreenShare}

<p style="background:#f7f7f7;color:#718c00">方法  startScreenShare ()</p>

>void startScreenShare()

- **功能**:开启屏幕共享

- **返回值**:无

- **参数**:无

>响应事件startScreenShareRslt

 <!-- 46 -->
### <font color="#0099cc">停止屏幕共享</font> {#stopScreenShare}

<p style="background:#f7f7f7;color:#718c00">方法  stopScreenShare ()</p>

>void stopScreenShare ()

- **功能**:停止屏幕共享

- **返回值**:无

- **参数**:无

>响应事件stopScreenShareRslt

<!-- 47 -->
### <font color="#0099cc">支持的最大屏幕宽度</font> {#supportMaxScreenWidth}

<p style="background:#f7f7f7;color:#718c00">属性  supportMaxScreenWidth</p>

>int supportMaxScreenWidth

- **功能**:支持的最大屏幕宽度

- **返回值**:无

- **参数**:无

>可读

<!-- 48 -->
### <font color="#0099cc">支持的最大屏幕高度</font> {#supportMaxScreenHeight}

<p style="background:#f7f7f7;color:#718c00">属性  supportMaxScreenHeight</p>

>int supportMaxScreenHeight

- **功能**:支持的最大屏幕高度

- **返回值**:无

- **参数**:无

>可读

  <!-- 49 -->
### <font color="#0099cc">设获取屏幕共享解码图像</font> {#getShareScreenDecodeImg}

<p style="background:#f7f7f7;color:#718c00">方法  getShareScreenDecodeImg ()</p>

>string getShareScreenDecodeImg()

- **功能**:设获取屏幕共享解码图像

- **返回值**:json格式的字符串,详见下列详解

- **参数**:无

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">{"format": 1, "dat":"FKLEOFJXKFD…","width":1024, "height":768, "frameTime":3213123123123 }</p>

- format ------ 图像格式,数值参考视频图像格式VIDEO_FORMAT
- dat ------ 图像数据 
- width ------ 图像宽度
- height ------ 图像高度
- frameTime ------ 图像产生的时间，从1970-01-01 00:00:00到现在为止，过去的毫秒时间

<!-- 50 -->
### <font color="#0099cc">设置、获取自定义抓屏功能</font> {#customizeCatchScreen}

<p style="background:#f7f7f7;color:#718c00">属性  customizeCatchScreen</p>

>int customizeCatchScreen

- **功能**:设置、获取自定义抓屏功能

- **返回值**:无

- **参数**:无

>可读、可写.0：默认抓屏处理；1：自定议抓屏设置自定义抓屏后，sdk需要图像时将产生notiyCatchScreen事件，使用者再通过setCustomizeScreenImg接口送入图像

<!-- 51 -->
### <font color="#0099cc">设置自定义的抓屏图像数据</font> {#setCustomizeScreenImg}

<p style="background:#f7f7f7;color:#718c00">方法  setCustomizeScreenImg ()</p>

>void setCustomizeScreenImg(int format, int width, int height, VARIANT dat)

- **功能**:设置自定义的抓屏图像数据

- **返回值**:无

- **参数**:

 + format ------ 参见VIDEO_FORMAT；
 + width ------ 图像的宽度；
 + height ------ 图像的高度；
 + dat ------ SafeArray对象，承载argb数据；

>当前只支持VFMT_ARGB32格式；如果在收到notiyCatchScreen事件时，暂当前无图像可送时，可送空数据进去(width=0, height=0, dat为空)

<!-- 52 -->
### <font color="#0099cc">设置要录制的视频</font> {#setRecordVideos}

<p style="background:#f7f7f7;color:#718c00">方法  setRecordVideos ()</p>

>void setRecordVideos(string json)

- **功能**:设置要录制的视频

- **返回值**:无 录制类型REC_VCONTENT_TYPE

- **参数**:json格式的字符串,详见说明

>如果为录屏方式时，配置不生效

<!-- 53 -->
### <font color="#0099cc">开启录制</font> {#startRecording}

<p style="background:#f7f7f7;color:#718c00">方法  startRecording ()</p>

>int startRecording(string json)

- **功能**:开启录制

- **返回值**:0：开启失败； 1：开启成功

- **参数**:json 录制参数,json格式的字符串,详见下列详解

json详解：

<p style="background:#f7f7f7;color:#8959A8">{"filePathName": "D:\\1.mp4" "audioType":"FKLEOFJXKFD…","recordWidth":640, "recordHeight":320,"frameRate":8, "bitRate":500000, 
"defaultQP":28, "recDataType":1}</p>

- filePathName ------ 录像存储的路径文件名,使用完整路径
- audioType ------ 录制语音类型，详见定义RECORD_AUDIO_TYPE 
- recordWidth ------ 录制结果中视频尺寸宽度
- recordHeight ------ 录制结果中视频尺寸宽度
- frameRate ------ 录制的帧率
- bitRate ------ 录制的最高码率<font color="red">(当图像变化小时，实际码率会低于此值。建议：
640*360: 500000; (500kbps)
1280*720：1000000; (1mbps)
1920*1080: 2000000; (2mbps)) </font>
- defaultQP ------ -录制的缺省质量<font color="red">(缺省值：28
取值范围：0~51;  (0完全无损, 51质量非常差)
推荐：高质量取值18, 中质量28， 低质量38)</font>
- recDataType ------ 录制内容类型（视频+音频），值参考定义REC_DATATYPE

<!-- 54 -->
### <font color="#0099cc">停止录制</font> {#stopRecording}

<p style="background:#f7f7f7;color:#718c00">方法  stopRecording ()</p>

>void stopRecording()

- **功能**:停止录制

- **返回值**:无

- **参数**:无

<!-- 55 -->
### <font color="#0099cc">得到录制结果文件大小</font> {#getRecFileSize}

<p style="background:#f7f7f7;color:#718c00">方法  getRecFileSize ()</p>

>int getRecFileSize()

- **功能**:得到录制结果文件大小

- **返回值**:无

- **参数**:无

<!-- 56 -->
### <font color="#0099cc">得到录制的时长</font> {#getRecDuration}

<p style="background:#f7f7f7;color:#718c00">方法  getRecDuration ()</p>

>int getRecDuration()

- **功能**:得到录制的时长

- **返回值**:无

- **参数**:无

<!-- 57 -->
### <font color="#0099cc">取得所有录制文件信息</font> {#getAllRecordFiles}

<p style="background:#f7f7f7;color:#718c00">方法  getAllRecordFiles ()</p>

>string getAllRecordFiles()

- **功能**:取得所有录制文件信息

- **返回值**:json格式的字符串,详见下列详解

- **参数**:无

json串中包含多个录制文件信息：

<p style="background:#f7f7f7;color:#8959A8">[{"fileName":"D:\\1.mp4","state":1,"uploadPercent":100}{"fileName":"D:\\2.mp4","state":2,"uploadPercent":80}...]</p>

- fileName ------ 录像存储的路径文件名,使用完整路径
- state ------ 录制语音类型，详见定义RECORD_AUDIO_TYPE
- uploadPercent ------ 录制结果中视频尺寸宽度 

<!-- 58 -->
### <font color="#0099cc">删除本地的录制文件，上传中的文件会被取消上传</font> {#removeFromFileMgr}

<p style="background:#f7f7f7;color:#718c00">方法  removeFromFileMgr ()</p>

>void removeFromFileMgr(string filename)

- **功能**:删除本地的录制文件，上传中的文件会被取消上传

- **返回值**:无

- **参数**:
 + filename ------ 文件名，全路径

<!-- 59 -->
### <font color="#0099cc">上传文件</font> {#uploadRecordFile}

<p style="background:#f7f7f7;color:#718c00">方法  uploadRecordFile  ()</p>

>void uploadRecordFile(string filename)

- **功能**:上传文件

- **返回值**:无

- **参数**:
 + filename ------ 文件名，全路径

<!-- 60 -->
### <font color="#0099cc">取消上传中的录制文件</font>{#cancelUploadRecordFile}

<p style="background:#f7f7f7;color:#718c00">方法  cancelUploadRecordFile ()</p>

>void cancelUploadRecordFile(string filename)

- **功能**:取消上传中的录制文件

- **返回值**:无

- **参数**:
 + filename ------ 文件名，全路径

<!-- 61 -->
### <font color="#0099cc">回放录制文件</font>{#playbackRecordFile}

<p style="background:#f7f7f7;color:#718c00">方法  playbackRecordFile ()</p>

>void playbackRecordFile(string filename)

- **功能**:回放录制文件

- **返回值**:无

- **参数**:
 + filename ------ 文件名，全路径

>可创建影音控件显示录制内容，功能同接口startPlayMedia

 <!-- 62 -->
### <font color="#0099cc">发送IM消息</font>{#sendIMmsg}

<p style="background:#f7f7f7;color:#718c00">方法  sendIMmsg ()</p>

>string sendIMmsg(string text, string toUsrID=””, string cookie=””)

- **功能**:发送IM消息

- **返回值**:taskID 发送任务id 

- **参数**:
 + text ------ 发送的文本消息
 + toUsrID ------ 目标用户，如果用户ID为空，消息发送给会议内所有用户 
 + cookie ------ 自定义用户数据

>发送结果事件sendIMmsgRlst

<!-- 63 -->
### <font color="#0099cc">播放是否静音</font>{#speakerMute}

<p style="background:#f7f7f7;color:#718c00">属性  speakerMute</p>

>int speakerMute

- **功能**:播放是否静音

- **返回值**:无

- **参数**:无

>可读、可写. 对会议内所有声音生效.0:不静音 ; 1:静音

<!-- 64 -->
### <font color="#0099cc">赋予控制权限</font>{#giveCtrlRight}

<p style="background:#f7f7f7;color:#718c00">方法  giveCtrlRight ()</p>

>void giveCtrlRight(string userID)

- **功能**:赋予控制权限

- **返回值**:无

- **参数**:
 + userID ------ 目标用户

>控制权限更改通知事件notifyGiveCtrlRight

<!-- 65 -->
### <font color="#0099cc">收回控制权限</font>{#releaseCtrlRight}

<p style="background:#f7f7f7;color:#718c00">方法  releaseCtrlRight ()</p>

>void releaseCtrlRight(string userID)

- **功能**:收回控制权限

- **返回值**:无

- **参数**:
 + userID ------ 目标用户

>收回控制权限通知事件notifyReleaseCtrlRight

<!-- 66 -->
### <font color="#0099cc">发送鼠标控制消息</font> {#sendMouseCtrlMsg}

<p style="background:#f7f7f7;color:#718c00">方法  sendMouseCtrlMsg ()</p>

>void sendMouseCtrlMsg(int msgType, int key, int ptX, int ptY)

- **功能**:发送鼠标控制消息

- **返回值**:无

- **参数**:
 + msgType ------ 鼠标事件类型(数值详见MOUSE_MSG_TYPE类型)
 + key ------ 鼠标键类型(数值详见MOUSE_KEY_TYPE类型)
 + ptX ------ 鼠标在屏幕中的横坐标
 + ptY ------ 鼠标在屏幕中的纵坐标
 
<!-- 67 -->
### <font color="#0099cc">发送键盘控制消息</font> {#sendKeyCtrlMsg}

<p style="background:#f7f7f7;color:#718c00">方法  sendKeyCtrlMsg ()</p>

>void sendKeyCtrlMsg(int keyMsgType, int vk, int bExtendedKey)

- **功能**:发送键盘控制消息

- **返回值**:无

- **参数**:
 + keyMsgType ------ 键盘事件类型(数值详见KEY_MSG_TYPE类型)
 + vk ------ 键盘虚拟键值
 + bExtendedKey  ------

<!-- 68 -->
### <font color="#0099cc">发送小块数据</font> {#sendCmd}

<p style="background:#f7f7f7;color:#718c00">方法  sendCmd ()</p>

>string sendCmd(string targetUserId, ByteArray data)

- **功能**:发送小块数据

- **返回值**:分配的任务ID

- **参数**:
 + targetUserId ------ 目标用户ID
 + data ------ 发送的数组数据

>一次性发送，不会有进度通知.发送结果事件sendCmdRlst

<!-- 69 -->
### <font color="#0099cc">发送大块数据</font> {#sendBuffer}

<p style="background:#f7f7f7;color:#718c00">方法  sendBuffer ()</p>

>string sendBuffer(string targetUserId, ByteArray data)

- **功能**:发送大块数据

- **返回值**:分配的任务ID

- **参数**:
 + targetUserId ------ 目标用户ID
 + data ------ 发送的数组数据

>分块发送，进度通知事件sendProgress.发送结果事件 sendBufferRlst.取消发送 cancelSend

<!-- 70 -->
### <font color="#0099cc">取消数据发送</font> {#cancelSend}

<p style="background:#f7f7f7;color:#718c00">方法  cancelSend ()</p>

>void cancelSend(string taskID)

- **功能**:取消数据发送

- **返回值**:分配的任务ID

- **参数**:
 + taskID ------ 任务ID

>取消结果通知事件 cancelSendRlst

<!-- 71 -->
### <font color="#0099cc">发送文件</font> {#sendFile}

<p style="background:#f7f7f7;color:#718c00">方法  sendFile ()</p>

>string sendFile(string targetUserId, string fileName)

- **功能**:发送文件

- **返回值**:分配的任务ID

- **参数**:
 + targetUserId ------ 目标用户ID
 + fileName ------ 需要发送的文件名 

>分块发送，进度通知事件sendProgress.发送结果事件sendFileRlst.取消发送cancelSend

<!-- 72 -->
### <font color="#0099cc">功能切换</font> {#switchToPage}

<p style="background:#f7f7f7;color:#718c00">方法  switchToPage ()</p>

>void switchToPage(int mainPage, string jsonSubPage)

- **功能**:功能切换

- **返回值**:无

- **参数**:
 + mainPage ------ 功能类型(mainPage 数值参见MAIN_PAGE_TYPE定义)
 + jsonSubPage ------ json格式的字符串,详见下列详解 

jsonSubPage格式说明:

<p style="background:#f7f7f7;color:#8959A8">{"userID": 1, "boardID":1}</p>

- userID ------ 用户id
- boardID ------ 白板id

<!-- 73 -->
### <font color="#0099cc">获取当前主功能区</font> {#getCurrentMainPage}

<p style="background:#f7f7f7;color:#718c00">方法  getCurrentMainPage ()</p>

>int getCurrentMainPage()

- **功能**:获取当前主功能区

- **返回值**:mainPage 数值参见MAIN_PAGE_TYPE定义

- **参数**:无

<!-- 74 -->
### <font color="#0099cc">获取当前子功能区</font> {#getCurrentSubPage}

<p style="background:#f7f7f7;color:#718c00">方法  getCurrentSubPage ()</p>

>string getCurrentSubPage ()

- **功能**:获取当前子功能区

- **返回值**:json格式的字符串,详见下列详解 

- **参数**:无

jsonSubPage格式说明:

<p style="background:#f7f7f7;color:#8959A8">{"userID": 1, "boardID":1}</p>

- userID ------ 用户id
- boardID ------ 白板id

<!-- 75 -->
### <font color="#0099cc">设置视频墙分屏模式</font> {#setVideoWallMode}

<p style="background:#f7f7f7;color:#718c00">方法  setVideoWallMode ()</p>

>void setVideoWallMode(int videoWallMode)

- **功能**:设置视频墙分屏模式

- **返回值**:无

- **参数**:
  + videoWallMode ------ 分屏模式

>videoWallMode数值参见VIDEOLAYOUTMODE定义

<!-- 76 -->
### <font color="#0099cc">当前哪个用户为主视频</font> {#mainVideo}

<p style="background:#f7f7f7;color:#718c00">属性mainVideo</p>

>string mainVideo

- **功能**:当前哪个用户为主视频

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 77 -->
### <font color="#0099cc">创建白板</font> {#createBoard}

<p style="background:#f7f7f7;color:#718c00">方法  createBoard ()</p>

>QString createBoard(string title, int width, int height)

- **功能**:创建白板

- **返回值**:json格式的字符串,详见下列详解 

- **参数**:
 + title ------ 白板名称
 + width ------ 白板宽度
 + height ------ 白板高度

json格式说明:

<p style="background:#f7f7f7;color:#8959A8">{"userID": 1, "boardID":1}</p>

- userID ------ 用户id
- boardID ------ 白板id

<!-- 78 -->
### <font color="#0099cc">关闭白板</font> {#closeBoard}

<p style="background:#f7f7f7;color:#718c00">方法  closeBoard ()</p>

>void closeBoard(string json)

- **功能**:关闭白板

- **返回值**:无

- **参数**:json格式的字符串,详见下列详解 

json格式说明:

<p style="background:#f7f7f7;color:#8959A8">{"userID": 1, "boardID":1}</p>

- userID ------ 用户id
- boardID ------ 白板id

<!-- 79 -->
### <font color="#0099cc">添加图元信息</font> {#addBoardElement}

<p style="background:#f7f7f7;color:#718c00">方法  addBoardElement ()</p>

>ElementID addBoardElement(SubPage boardID, ElementData element)

- **功能**:添加图元信息

- **返回值**:图元ID，参见对象ElementID的定义

- **参数**:
 + boardID ------ 白板ID，参见对象SubPage 的定义
 + element ------ 图元信息，参见对象ElementData 的定义

<!-- 80 -->
### <font color="#0099cc">删除图元</font> {#delBoardElement}

<p style="background:#f7f7f7;color:#718c00">方法  delBoardElement ()</p>

>void delBoardElement(SubPage boardID, ElementIDs elementIDs)

- **功能**:删除图元

- **返回值**:无

- **参数**:
 + boardID ------ 白板ID，参见对象SubPage 的定义
 + elementIDs ------ 图元数组，参见对象ElementIDs 的定义

<!-- 81 -->
### <font color="#0099cc">设置鼠标热点消息</font>{#setMouseHotSpot}

<p style="background:#f7f7f7;color:#718c00">方法  setMouseHotSpot ()</p>

>void setMouseHotSpot(SubPage boardID, LONG x, LONG y)

- **功能**:设置鼠标热点消息

- **返回值**:无

- **参数**:
 + boardID ------ 白板ID，参见对象SubPage 的定义
 + x ------ 屏幕横坐标
 + y ------ 屏幕纵坐标

<!-- 82 -->
### <font color="#0099cc">影音播放的清晰度</font>{#vDefinition}

<p style="background:#f7f7f7;color:#718c00">属性  vDefinition</p>

>int vDefinition

- **功能**:影音播放的清晰度

- **返回值**:无

- **参数**:无

>可读、可写. 音量等级（0-255）

<!-- 83 -->
### <font color="#0099cc">影音播放的音量</font>{#mediaVolume}

<p style="background:#f7f7f7;color:#718c00">属性  mediaVolume</p>

>int mediaVolume

- **功能**: 影音播放的音量

- **返回值**:无

- **参数**:无

>可读、可写. 音量等级（0-255）

<!-- 84 -->
### <font color="#0099cc">登录成功响应</font>{#loginSuccess}

<p style="background:#f7f7f7;color:#718c00">事件  loginSuccess ()</p>

>void loginSuccess(string usrID,  string cookie)

- **功能**: 登录成功响应

- **参数**:
 + usrID  ------ 用户账户
 + cookie ------ 自定义用户数据

<!-- 85 -->
### <font color="#0099cc">登录失败响应</font>{#loginFail}

<p style="background:#f7f7f7;color:#718c00">事件  loginFail ()</p>

>void loginFail(int sdkErr,  string cookie)

- **功能**: 登录失败响应

- **参数**:
 + sdkErr ------ 操作失败代码，定义见 CRMEETSDK_ERR_DEF
 + cookie ------ 自定义用户数据

<!-- 86 -->
### <font color="#0099cc">SDK通知自己掉线</font>{#lineOff}

<p style="background:#f7f7f7;color:#718c00">事件  lineOff ()</p>

>void lineOff(CRMEETSDK_ERR_DEF sdkErr)

- **功能**: SDK通知自己掉线

- **参数**:
 + sdkErr ------ 掉线的错误代码

<!-- 87 -->
### <font color="#0099cc">客户端设置免打扰状态操作成功响应</font>{#setDNDStatusSuccess}

<p style="background:#f7f7f7;color:#718c00">事件  setDNDStatusSuccess ()</p>

>void setDNDStatusSuccess(string cookie)

- **功能**: 客户端设置免打扰状态操作成功响应

- **参数**:
 + cookie ------ 自定义用户数据

<!-- 88 -->
### <font color="#0099cc">客户端设置免打扰状态操作失败响应</font>{#setDNDStatusFail}

<p style="background:#f7f7f7;color:#718c00">事件  setDNDStatusFail ()</p>

>void setDNDStatusFail(int sdkErr,  string cookie)

- **功能**: 客户端设置免打扰状态操作失败响应

- **参数**:
 + sdkErr ------ 操作失败代码，数值参考CRMEETSDK_ERR_DEF
 + cookie ------ 自定义用户数据

<!-- 89 -->
### <font color="#0099cc">创建会议成功响应</font>{#createMeetingSuccess}

<p style="background:#f7f7f7;color:#718c00">事件  createMeetingSuccess ()</p>

>void createMeetingSuccess(int meetID, string psw, string cookie)

- **功能**: 创建会议成功响应

- **参数**:
 + meetID ------ 系统自动分配的会议ID
 + psw ------ 系统自动分配的会议密码，可为空
 + cookie ------ 自定义用户数据

<!-- 90 -->
### <font color="#0099cc">创建会议失败响应</font>{#createMeetingFail}

<p style="background:#f7f7f7;color:#718c00">事件  createMeetingFail ()</p>

>void createMeetingFail(int sdkErr, string cookie)

- **功能**: 创建会议失败响应

- **参数**:
 + sdkErr ------ 操作失败代码，数值参考CRMEETSDK_ERR_DEF
 + cookie ------ 自定义用户数据

<!-- 91 -->
### <font color="#0099cc">某用户进入了会议</font>{#userEnterMeeting}

<p style="background:#f7f7f7;color:#718c00">事件  userEnterMeeting ()</p>

>void userEnterMeeting(string userID)

- **功能**: 某用户进入了会议

- **参数**:
 + userID ------ 进入会议的用户id

<!-- 92 -->
### <font color="#0099cc">SDK通知从会议里掉线</font>{#meetingDropped}

<p style="background:#f7f7f7;color:#718c00">事件  meetingDropped ()</p>

>void meetingDropped()

- **功能**: SDK通知从会议里掉线了，sdk外部收到该通知后可以调用enterMeeting尝试重新入会<font color="red">（如果用到了呼叫队列，必须调用hungupCall释放本次呼叫）</font>

- **参数**:无

<!-- 93 -->
### <font color="#0099cc">会议已被结束</font>{#meetingStopped}

<p style="background:#f7f7f7;color:#718c00">事件  meetingStopped ()</p>

>void meetingStoped()

- **功能**:会议已被结束

- **参数**:无

<!-- 94 -->
### <font color="#0099cc">通知结束视频会议结果</font>{#endMeetingRslt}

<p style="background:#f7f7f7;color:#718c00">事件  endMeetingRslt ()</p>

>void endMeetingRslt(int code)

- **功能**:通知结束视频会议结果

- **参数**
 + code ------ 数值参考CRMEETSDK_ERR_DEF，值为CRMEETSDK_NOERR时结束成功，否则为不成功代码。 

<!-- 95 -->
### <font color="#0099cc">某用户进入了会议</font>{#userEnterMeeting}

<p style="background:#f7f7f7;color:#718c00">事件  userEnterMeeting ()</p>

>void userEnterMeeting(string userID)

- **功能**:某用户进入了会议

- **参数**:
 + userID ------ 进入会议的用户id

<!-- 96 -->
### <font color="#0099cc">某用户离开了会议</font>{#userLeftMeeting}

<p style="background:#f7f7f7;color:#718c00">事件  userLeftMeeting ()</p>

>void userLeftMeeting(string userID)

- **功能**:某用户离开了会议

- **参数**:
 + userID------ 离开会议的用户id

<!-- 97 -->
### <font color="#0099cc">SDK通知我的网络变化</font>{#netStateChanged}

<p style="background:#f7f7f7;color:#718c00">事件  netStateChanged ()</p>

>void netStateChanged(long level)

- **功能**:SDK通知我的网络变化

- **参数**:
 + level ------ 网络状况等级(0~10，10分为最佳网络)

<!-- 98 -->
### <font color="#0099cc">SDK通知用户的说话声音强度更新</font>{#micEnergyUpdate}

<p style="background:#f7f7f7;color:#718c00">事件  micEnergyUpdate ()</p>

>void micEnergyUpdate( string userID, long oldLevel, long newLevel)

- **功能**:SDK通知用户的说话声音强度更新

- **参数**:
 + userID ------ 用户标识ID
 + oldLevel ------ 原来的说话声音强度(0~10)
 + newLevel ------ 现在的说话声音强度(0~10)

<!-- 99 -->
### <font color="#0099cc">SDK通知本地音频设备有变化</font>{#audioDevChanged}

<p style="background:#f7f7f7;color:#718c00">事件  audioDevChanged ()</p>

>void audioDevChanged()

- **功能**:SDK通知本地音频设备有变化

- **参数**:无

<!-- 100 -->
### <font color="#0099cc">SDK通知打开本地音频状态变化</font>{#audioStatusChanged}

<p style="background:#f7f7f7;color:#718c00">事件  audioStatusChanged ()</p>

>void audioStatusChanged(string userID, int oldStatus, int newStatus)

- **功能**:SDK通知打开本地音频状态变化

- **参数**:
 + userID ------ 会话中设备的所有者
 + oldStatus ------ 旧状态，数值参考麦克风状态定义ASTATUS
 + newStatus ------ 新状态，数值参考麦克风状态定义ASTATUS

<!-- 101 -->
### <font color="#0099cc">SDK通知打开本地视频状态变化</font>{#videoStatusChanged}

<p style="background:#f7f7f7;color:#718c00">事件  videoStatusChanged ()</p>

>void videoStatusChanged(string userID, int oldStatus, int newStatus)

- **功能**:SDK通知打开本地视频状态变化

- **参数**:
 + userID ------ 会话中设备的所有者
 + oldStatus ------ 旧状态，数值参考视频状态定义VSTATUS
 + newStatus ------ 新状态，数值参考视频状态定义VSTATUS

<!-- 102 -->
### <font color="#0099cc">通知用户有新的视频数据</font>{#notifyVideoData}

<p style="background:#f7f7f7;color:#718c00">事件  notifyVideoData ()</p>

>void notifyVideoData(string userID， LONGLONG frmTime)

- **功能**:通知用户有新的视频数据

- **参数**:
 + userID ------ 用户标识ID
 + frmTime ------ 图像的创建时戳

>收到此通知消息后，可能过getVideoImg获取图像显示；但如果之前显示的帧时戳更大，说明此通知消息已过时，直接忽略即可；

<!-- 103 -->
### <font color="#0099cc">SDK通知用户的视频设备有变化</font>{#videoDevChanged}

<p style="background:#f7f7f7;color:#718c00">事件  videoDevChanged ()</p>

>void videoDevChanged(string userID)

- **功能**:SDK通知用户的视频设备有变化

- **参数**:
 + userID ------ 设备变化的用户ID

<!-- 104 -->
### <font color="#0099cc">开启屏幕共享的响应事件 </font>{#startScreenShareRslt}

<p style="background:#f7f7f7;color:#718c00">事件  startScreenShareRslt ()</p>

>void startScreenShareRslt(int sdkErr)

- **功能**:开启屏幕共享的响应事件 

- **参数**:
 + sdkErr ------ 操作失败代码,数值参考CRMEETSDK_ERR_DEF

<!-- 105 -->
### <font color="#0099cc">停止屏幕共享的响应事件</font>{#stopScreenShareRslt}

<p style="background:#f7f7f7;color:#718c00">事件  stopScreenShareRslt ()</p>

>void stopScreenShareRslt (int sdkErr)

- **功能**:停止屏幕共享的响应事件  

- **参数**:
 + sdkErr ------ 操作失败代码,数值参考CRMEETSDK_ERR_DEF

<!-- 106 -->
### <font color="#0099cc">通知他人开启了屏幕共享</font>{#notifyScreenShareStarted}

<p style="background:#f7f7f7;color:#718c00">事件  notifyScreenShareStarted ()</p>

>void notifyScreenShareStarted()

- **功能**:通知他人开启了屏幕共享  

- **参数**:无

<!-- 107 -->
### <font color="#0099cc">通知他人停止了屏幕共享</font>{#notifyScreenShareStopped}

<p style="background:#f7f7f7;color:#718c00">事件  notifyScreenShareStopped ()</p>

>void notifyScreenShareStopped ()

- **功能**:通知他人停止了屏幕共享  

- **参数**:无

<!-- 108 -->
### <font color="#0099cc">通知对端屏幕图像有变化</font>{#notifyScreenShareData}

<p style="background:#f7f7f7;color:#718c00">事件  notifyScreenShareData ()</p>

>void notifyScreenShareData(OleRect changedRt)

- **功能**:通知对端屏幕图像有变化  

- **参数**:
 + changedRt ------ 变化的区域；（可以只重绘这块区域）

<!-- 109 -->
### <font color="#0099cc">自定义抓屏时，ocx通知使用者抓屏</font>{#notiyCatchScreen}

<p style="background:#f7f7f7;color:#718c00">事件  notiyCatchScreen ()</p>

>void notiyCatchScreen()

- **功能**:自定义抓屏时，ocx通知使用者抓屏 

- **参数**:无

>在收到通知时， 一定要及时setCustomizeScreenImg，如果没图像时，可以先送入空图像；

<!-- 110 -->
### <font color="#0099cc">发送IM消息时，ocx通知使用者发送结果</font>{#sendIMmsgRlst}

<p style="background:#f7f7f7;color:#718c00">事件  sendIMmsgRlst ()</p>

>void sendIMmsgRlst(string taskID, int sdkErr, string cookie)

- **功能**:发送IM消息时，ocx通知使用者发送结果

- **参数**:
 + taskID ------ 发送任务id
 + sdkErr ------ 数值参考CRMEETSDK_ERR_DEF
 + cookie ------ 用户自定义数据

<!-- 111 -->
### <font color="#0099cc">ocx通知收到IM消息</font>{#notifyIMmsg}

<p style="background:#f7f7f7;color:#718c00">事件  notifyIMmsg ()</p>

>void notifyIMmsg(string fromUserID, string text)

- **功能**:ocx通知收到IM消息

- **参数**:
 + fromUserID ------ 消息来源
 + text ------ 消息内容

<!-- 111 -->
### <font color="#0099cc">录制异常，录制将自动停止</font>{#recordErr}

<p style="background:#f7f7f7;color:#718c00">事件  recordErr ()</p>

>void recordErr(CRMEETSDK_ERR_DEF sdkErr)

- **功能**:录制异常，录制将自动停止

- **参数**:无

<!-- 113 -->
### <font color="#0099cc">ocx通知远程控制权限给予了某人</font>{#notifyGiveCtrlRight}

<p style="background:#f7f7f7;color:#718c00">事件  notifyGiveCtrlRight ()</p>

>void notifyGiveCtrlRight(string operId, string targetId)

- **功能**:ocx通知远程控制权限给予了某人

- **参数**:
 + operId ------ 操作的用户id
 + targetId ------ 控制权限给予了谁

<!-- 114 -->
### <font color="#0099cc">ocx通知收回远程控制</font>{#notifyReleaseCtrlRight}

<p style="background:#f7f7f7;color:#718c00">事件  notifyReleaseCtrlRight ()</p>

>void notifyReleaseCtrlRight(string operId, string targetId)

- **功能**:ocx通知收回远程控制

- **参数**:
 + operId ------ 操作的用户id
 + targetId ------ 收回了谁的控制权限

<!-- 115 -->
### <font color="#0099cc">发送数据时，ocx通知发送结果</font>{#sendCmdRlst}

<p style="background:#f7f7f7;color:#718c00">事件  sendCmdRlst ()</p>

>void sendCmdRlst(string taskID, CRMEETSDK_ERR_DEF sdkErr, string cookie)

- **功能**:发送数据时，ocx通知发送结果

- **参数**:
 + taskID ------ 发送任务id
 + sdkErr ------ 失败代码
 + cookie ------ 用户自定义数据

<!-- 116 -->
### <font color="#0099cc">发送数据时，ocx通知发送结果</font>{#sendBufferRlst}

<p style="background:#f7f7f7;color:#718c00">事件  sendBufferRlst ()</p>

>void sendBufferRlst(string taskID, CRMEETSDK_ERR_DEF sdkErr, string cookie)

- **功能**:发送数据时，ocx通知发送结果

- **参数**:
 + taskID ------ 发送任务id
 + sdkErr ------ 失败代码
 + cookie ------ 用户自定义数据

<!-- 117 -->
### <font color="#0099cc">发送文件时，ocx通知发送结果</font>{#sendFileRlst}

<p style="background:#f7f7f7;color:#718c00">事件  sendFileRlst ()</p>

>void sendFileRlst(string taskID, string fileName, CRMEETSDK_ERR_DEF sdkErr, string cookie)

- **功能**:发送文件时，ocx通知发送结果

- **参数**:
 + taskID ------ 发送任务id
 + fileName ------ 文件名
 + sdkErr ------ 失败代码
 + cookie ------ 用户自定义数据

<!-- 118 -->
### <font color="#0099cc">发送数据时，ocx通知发送进度</font>{#sendProgress}

<p style="background:#f7f7f7;color:#718c00">事件  sendProgress ()</p>

>void sendProgress(string taskID, long sendedLen, long totalLen, string cookie)

- **功能**:发送数据时，ocx通知发送进度

- **参数**:
 + taskID ------ 发送任务id
 + sendedLen ------ 已发送的数据长度
 + totalLen ------ 需要发送的总长度
 + cookie ------ 用户自定义数据

<!-- 119 -->
### <font color="#0099cc">取消发送</font>{#cancelSendRlst}

<p style="background:#f7f7f7;color:#718c00">事件  cancelSendRlst ()</p>

>void cancelSendRlst(string taskID)

- **功能**:取消发送

- **参数**:
 + taskID ------ 发送任务id

<!-- 120 -->
### <font color="#0099cc">ocx通知收到小块数据</font>{#notifyCmdData}

<p style="background:#f7f7f7;color:#718c00">事件  notifyCmdData ()</p>

>void notifyCmdData(string sourceUserId, ByteArray data)

- **功能**:ocx通知收到小块数据

- **参数**:
 + sourceUserId ------ 数据来源
 + data ------ 参见对象ByteArray定义

<!-- 121 -->
### <font color="#0099cc">ocx通知收到大块数据</font>{#notifyBufferData}

<p style="background:#f7f7f7;color:#718c00">事件  notifyBufferData ()</p>

>void notifyBufferData(string sourceUserId, ByteArray data)

- **功能**:ocx通知收到大块数据

- **参数**:
 + sourceUserId ------ 数据来源
 + data ------ 参见对象ByteArray定义

<!-- 122 -->
### <font color="#0099cc">ocx通知收到文件数据</font>{#notifyFileData}

<p style="background:#f7f7f7;color:#718c00">事件  notifyFileData ()</p>

>void notifyFileData(string sourceUserId, string tmpFile, string orgFileName)

- **功能**:ocx通知收到文件数据

- **参数**:
 + sourceUserId ------ 数据来源
 + tmpFile ------ 临时文件，不需要时，请移除或删除对应文件
 + orgFileName ------ 源始文件名 

>收到的文件生成在系统临时目录下，请尽快移走对应文件

<!-- 123 -->
### <font color="#0099cc">ocx通知功能切换</font>{#notifySwitchToPage}

<p style="background:#f7f7f7;color:#718c00">事件  notifySwitchToPage ()</p>

>void notifySwitchToPage(LONG mainPage，SubPage subPage)

- **功能**:ocx通知功能切换

- **参数**:
 + mainPage ------ 功能类型(数值参见MAIN_PAGE_TYPE定义)
 + subPage ------ 参见对象SubPage 定义

<!-- 124 -->
### <font color="#0099cc">ocx通知视频分屏模式切换</font>{#notifyVideoWallMode}

<p style="background:#f7f7f7;color:#718c00">事件  notifyVideoWallMode ()</p>

>void notifyVideoWallMode(LONG model)

- **功能**:ocx通知视频分屏模式切换

- **参数**:
 + model ------ 分屏模式(数值参见VIDEOLAYOUTMODE定义)

<!-- 125 -->
### <font color="#0099cc">ocx通知主视频更改</font>{#notifyMainVideo}

<p style="background:#f7f7f7;color:#718c00">事件  notifyMainVideo ()</p>

>void notifyMainVideo(string userID)

- **功能**:ocx通知主视频更改

- **参数**:
 + userID ------ 用户ID

<!-- 126 -->
### <font color="#0099cc">ocx通知之前已经创建好的白板</font>{#notifyInitBoards}

<p style="background:#f7f7f7;color:#718c00">事件  notifyInitBoards ()</p>

>void notifyInitBoards(SubPages boards)

- **功能**:ocx通知之前已经创建好的白板

- **参数**:
 + boards ------ 已经创建好的白板列表

<!-- 127 -->
### <font color="#0099cc">ocx通知之前已经创建好的白板上的图元数据</font>{#notifyInitBoardElements}

<p style="background:#f7f7f7;color:#718c00">事件  notifyInitBoardElements ()</p>

>void notifyInitBoardElements(SubPage boardID, StrArray elementData)

- **功能**:ocx通知之前已经创建好的白板上的图元数据

- **参数**:
 + boardID ------ 当前白板
 + elementData ------ 白板上的图元数据json字符串数组

>白板上每一个图元数据就是一个json字符串

<!-- 128 -->
### <font color="#0099cc">ocx通知创建白板</font>{#notifyCreateBoard}

<p style="background:#f7f7f7;color:#718c00">事件  notifyCreateBoard ()</p>

>void notifyCreateBoard(SubPage sub，string title，LONG width，LONG height，string operatorID)

- **功能**:ocx通知创建白板

- **参数**:
 + sub ------ 白板ID，参见对象SubPage的定义
 + title ------ 白板名称
 + width ------ 白板宽度
 + heigh ------ 白板高度
 + operatorID ------ 创建白板的用户ID

<!-- 129 -->
### <font color="#0099cc">关闭白板</font>{#notifyCloseBoard}

<p style="background:#f7f7f7;color:#718c00">方法  notifyCloseBoard ()</p>

>void notifyCloseBoard(SubPage boardID，string operatorID)

- **功能**:关闭白板

- **参数**:
 + boardID ------ 参见对象SubPage 的定义
 + operatorID ------ 关闭白板的用户ID

<!-- 130 -->
### <font color="#0099cc">ocx通知添加图元信息</font>{#notifyAddBoardElement}

<p style="background:#f7f7f7;color:#718c00">方法  notifyAddBoardElement ()</p>

>void notifyAddBoardElement(SubPage boardID, ElementID elementID，ElementData element，string operatorID)

- **功能**:ocx通知添加图元信息

- **参数**:
 + boardID ------ 白板ID，参见对象SubPage 的定义
 + elementID ------ 图元ID，参见对象ElementID的定义
 + element ------ 图元信息，参见对象ElementData 的定义
 + operatorID ------ 添加图元的用户ID

<!-- 131 -->
### <font color="#0099cc">ocx通知删除图元</font>{#notifyDelBoardElement}

<p style="background:#f7f7f7;color:#718c00">方法  notifyDelBoardElement ()</p>

>void notifyDelBoardElement(SubPage boardID, ElementIDs elementIDs，string operatorID)

- **功能**:ocx通知删除图元

- **参数**:
 + boardID ------ 白板ID，参见对象SubPage 的定义
 + elementIDs ------ 图元数组，参见对象ElementIDs 的定义
 + operatorID ------ 删除图元的用户ID

<!-- 132 -->
### <font color="#0099cc">ocx通知设置鼠标热点消息</font>{#notifyMouseHotSpot}

<p style="background:#f7f7f7;color:#718c00">方法  notifyMouseHotSpot ()</p>

>void notifyMouseHotSpot(SubPage boardID, LONG x, LONG y，string operatorID)

- **功能**:ocx通知设置鼠标热点消息

- **参数**:
 + boardID ------ 白板ID，参见对象SubPage 的定义
 + x ------ 屏幕横坐标
 + y ------ 屏幕纵坐标
 + operatorID ------ 删除图元的用户ID