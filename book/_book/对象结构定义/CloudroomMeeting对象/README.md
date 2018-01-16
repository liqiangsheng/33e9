# <font color="#2674ba">CloudroomMeeting对象</font>

>CloudroomMeeting是核心控件，实现登录、队列、呼叫、通话建立、音频采集播入、视频采集编解码、屏幕共享、录制、影音播放等；

<!--  -->
### <font color="#0099cc">获取sdk的版本信息</font>

<p style="background:#f7f7f7;color:#718c00">属性Version</p>

>string Version

- **功能**:获取sdk的版本信息

- **返回值**:无

- **参数**:无

>可读

<!--  -->
### <font color="#0099cc">SDK初始化</font>

<p style="background:#f7f7f7;color:#718c00">方法init()</p>

>CRMEETSDK_ERR_DEF init(string oemid, string sdkFilePath)

- **功能**:SDK初始化

- **返回值**:CRMEETSDK_NOERR为成功，否则是失败代码

- **参数**:
 + oemid向云屋申请的开发商ID
 + sdkFilePath sdk配置、临时文件存放位置，可为空

>每次init后，都应对一次uninit

<!--  -->
### <font color="#0099cc">SDK反初始化</font>

<p style="background:#f7f7f7;color:#718c00">方法uninit ()</p>

>void uninit()

- **功能**:SDK反初始化

- **返回值**:无

- **参数**:无

<!--  -->
### <font color="#0099cc">设置服务器地址、获取设置的服务器地址</font>

<p style="background:#f7f7f7;color:#718c00">属性loginServerAddr</p>

>string loginServerAddr

- **功能**:设置服务器地址、获取设置的服务器地址

- **返回值**:无

- **参数**:无

><font face="微软雅黑">可读、可写.支持单个服务器地址（如：www.cloudroom.com）或多个服务器地址串（如：www.cloudroom.com:8080;183.60.47.52:8080;）</font>

<!--  -->
### <font color="#0099cc">登陆服务器</font>

<p style="background:#f7f7f7;color:#718c00">方法login ()</p>

>void login( string authAcnt, string authPswd, string nickName, string privAcnt,  string privAuthCode,  string cookie)

- **功能**:登陆服务器

- **返回值**:无

- **参数**:
  + authAcnt云屋鉴权帐号
  + authPswd云屋鉴权密码
  + nickName昵称
  + privAcnt自定义帐号，不需要时传空字符串
  + privAuthCode自定义验证码(有复杂要求的，可以使用json格式)，不需要时传空字符串
  + cookie 自定义数据 (在回调时，回传给调用者)，不需要时传空字符串

>成功事件loginSuccess;失败事件loginFail

<!--  -->
### <font color="#0099cc">注销本次登陆</font>

<p style="background:#f7f7f7;color:#718c00">方法logout ()</p>

>void logout()

- **功能**:注销本次登陆

- **返回值**:无

- **参数**:无

>无事件

<!--  -->
### <font color="#0099cc">设置免打扰状态</font>

<p style="background:#f7f7f7;color:#718c00">方法setDNDStatus ()</p>

>void setDNDStatus(int DNDStatus,  string cookie)

- **功能**:设置免打扰状态

- **返回值**:无

- **参数**:
  + DNDStatus，0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义
  + cookie 自定义数据(在回调时，回传给调用者)，不需要时传空字符串

>成功事件setDNDStatusSuccess;失败事件setDNDStatusFail

<!--  -->
### <font color="#0099cc">创建会议</font>

<p style="background:#f7f7f7;color:#718c00">方法CreateMeeting ()</p>

>void createMeeting(string meetSubject,  string cookie)

- **功能**:创建会议

- **返回值**:无

- **参数**:
  + meetSubject 会议主题（字符长度最大值50）
  + cookie 自定义数据(在回调时，回传给调用者)，不需要时传空字符串

>成功事件createMeetingSuccess;失败事件createMeetingFail

<!--  -->
### <font color="#0099cc">呼叫成功，双方开始进入本次视频会话</font>

<p style="background:#f7f7f7;color:#718c00">方法enterMeeting  ()</p>

>void enterMeeting(int meetID, string pswd)

- **功能**:呼叫成功，双方开始进入本次视频会话

- **返回值**:无

- **参数**:
  + meetID  视频会话ID
  + pswd 本次会议中的密码（系统自动生成，在呼叫回调中取得）

>响应事件enterMeetingRslt

<!--  -->
### <font color="#0099cc">判断某个用户是否在会话中</font>

<p style="background:#f7f7f7;color:#718c00">方法isUserInMeeting ()</p>

>int isUserInMeeting(string userID)

- **功能**:判断某个用户是否在会话中

- **返回值**:<font face="微软雅黑">1：在，0：不在</font>

- **参数**:
  + userID 用户的id
  + pswd 本次会议中的密码（系统自动生成，在呼叫回调中取得）

<!--  -->
### <font color="#0099cc">结束会话</font>

<p style="background:#f7f7f7;color:#718c00">方法stopMeeting ()</p>

>void stopMeeting()

- **功能**:结束会话

- **返回值**:无

- **参数**:无


>响应事件 endMeetingRslt;会话被他人结束回调事件 meetingStopped

<!--  -->
### <font color="#0099cc">离开会话</font>

<p style="background:#f7f7f7;color:#718c00">方法exitMeeting ()</p>

>void exitMeeting()

- **功能**:离开会话

- **返回值**:无

- **参数**:无


>他人离开会话的回调事件userLeftMeeting

<!--  -->
### <font color="#0099cc">获取某个用户的信息</font>

<p style="background:#f7f7f7;color:#718c00">方法getMemberInfo ()</p>

>string getMemberInfo(string userID)

- **功能**:获取某个用户的信息

- **返回值**:json格式的字符串,详见下表

- **参数**:
 + userID: 用户ID

json串中含单个成员信息，如

<p style="background:#f7f7f7;color:#8959A8"><font face="微软雅黑">{"userID":"222","nickName":"bbb","audioStatus":"1","videoStatus":"1"}</font></p>

- userID-----用户ID

- nickname-----设备名称

- audioStatus------音频状态,数值参考麦克风状态ASTATUS

- videoStatus------视频状态,数值参考视频状态定义VSTATUS

<!--  -->
### <font color="#0099cc">获取所有用户的信息</font>

<p style="background:#f7f7f7;color:#718c00">方法getAllMembers ()</p>

>string getAllMembers()

- **功能**:获取所有用户的信息

- **返回值**:json格式的字符串,详见下表

- **参数**:无

json串中含单个成员信息，如:

<p style="background:#f7f7f7;color:#8959A8">[{<font face="微软雅黑">"userID":"111","nickName":"aaa","audioStatus":"1","videoStatus":"1"</font>}
{<font face="微软雅黑">"userID":"222","nickName":"bbb","audioStatus":"1","videoStatus":"1"</font>}]</p>

- userID-----用户ID

- nickname-----设备名称

- audioStatus------音频状态,数值参考麦克风状态ASTATUS

- videoStatus------视频状态,数值参考视频状态定义VSTATUS

<!--  -->
### <font color="#0099cc">获取某个用户的昵称</font>

<p style="background:#f7f7f7;color:#718c00">方法getMemberNickName ()</p>

>string getMemberNickName(string userID)

- **功能**:获取某个用户的昵称

- **返回值**:用户的昵称

- **参数**:
 + userID: 用户ID

<!--  -->
### <font color="#0099cc">获取系统上的麦克风列表</font>

<p style="background:#f7f7f7;color:#718c00">方法getAudioMicNames ()</p>

>string getAudioMicNames()

- **功能**:获取系统上的麦克风列表

- **返回值**:麦克风列表，以’\n’分割；

- **参数**:无

<!--  -->
### <font color="#0099cc">获取系统上的扬声器列表</font>

<p style="background:#f7f7f7;color:#718c00">方法getAudioSpkNames ()</p>

>string getAudioSpkNames ()

- **功能**:获取系统上的扬声器列表

- **返回值**:麦克风列表，以’\n’分割；

- **参数**:无

<!--  -->
### <font color="#0099cc">获取音频参数</font>

<p style="background:#f7f7f7;color:#718c00">方法getAudioCfg ()</p>

>string getAudioCfg() 

- **功能**:获取音频参数

- **返回值**:
 + json格式的字符串,详见下列详解

- **参数**:无

json格式说明:

- "micName": "aaa"--------麦克风设备名称
- "speakerName": "aaa"--------扬声器名称
- <font face="微软雅黑">"privEC": "0"--------是否开启云屋私有回声消息0：不开启；1：开启</font>
- <font face="微软雅黑">"privAgc": "0"--------是否开启云屋私有语音自动增益0：不开启；1：开启</font>

<!--  -->
### <font color="#0099cc">设置音频参数</font>

<p style="background:#f7f7f7;color:#718c00">方法setAudioCfg ()</p>

>void setAudioCfg(string json) 

- **功能**:设置音频参数

- **返回值**:无

- **参数**:
  + json: json格式的字符串,详见下列详解

json格式说明:

- "micName": "aaa"--------麦克风设备名称
- "speakerName": "aaa"--------扬声器名称
- <font face="微软雅黑">"privEC": "0"--------是否开启云屋私有回声消息0：不开启；1：开启</font>
- <font face="微软雅黑">"privAgc": "0"--------是否开启云屋私有语音自动增益0：不开启；1：开启</font>

<!--  -->
### <font color="#0099cc">设置、获取麦克风音量大小</font>

<p style="background:#f7f7f7;color:#718c00">属性micVolume</p>

>int micVolume 

- **功能**:设置、获取麦克风音量大小

- **返回值**:无

- **参数**:无

> 可读、可写.音量等级（0-255）

<!--  -->
### <font color="#0099cc">设置、获取本地扬声器音量</font>

<p style="background:#f7f7f7;color:#718c00">属性speakerVolume</p>

>int speakerVolume

- **功能**:设置、获取本地扬声器音量

- **返回值**:无

- **参数**:无

> 可读、可写.音量等级（0-255）

<!--  -->
### <font color="#0099cc">获取用户说话声音大小</font>

<p style="background:#f7f7f7;color:#718c00">方法getMicEnergy</p>

>int getMicEnergy(string userID)

- **功能**:获取用户说话声音大小

- **返回值**:音量大小（0~10）

- **参数**:
 + userID 登录成功后分配的userID

<!--  -->
### <font color="#0099cc">关闭用户的麦克风</font>

<p style="background:#f7f7f7;color:#718c00">方法openMic ()</p>

>void openMic(string userID)

- **功能**:关闭用户的麦克风

- **返回值**:无

- **参数**:
 + userID 用户的ID

> 关麦操作是立即生效的，会立即停止采集；

<!--  -->
### <font color="#0099cc">获取用户的麦状态</font>

<p style="background:#f7f7f7;color:#718c00">方法getAudioStatus  ()</p>

>int getAudioStatus(string userID)

- **功能**:获取用户的麦状态

- **返回值**:麦克风设备状态，请参见ASTATUS定义

- **参数**:
 + userID 登录成功后分配的userID

<!-- 26 -->
### <font color="#0099cc">视频的显示尺寸</font>

<p style="background:#f7f7f7;color:#718c00">属性videoFPS</p>

>int videoFPS

- **功能**:视频帧率

- **返回值**:无

- **参数**:无

>可读、可写.取值范围：<font face="微软雅黑">5-30</font>


<!-- 27 -->
### <font color="#0099cc">视频的显示尺寸</font>

<p style="background:#f7f7f7;color:#718c00">属性curVideoSize</p>

>int curVideoSize

- **功能**:视频的显示尺寸

- **返回值**:无

- **参数**:无

>可读、可写.详见视频尺寸定义VIDEO_SHOW_SIZE

<!-- 28 -->
### <font color="#0099cc">获取指定视频尺寸的码率</font>

<p style="background:#f7f7f7;color:#718c00">方法getVideoBitrate ()</p>

>int getVideoBitrate(int videoSizeType)

- **功能**:获取指定视频尺寸的码率

- **返回值**:kbps 比特率；<font face="微软雅黑">（-1代表使用sdk内部默认值）</font>

- **参数**:
 + videoSizeType 视频尺寸，请参见VIDEO_SHOW_SIZE定义

<!-- 29 -->
### <font color="#0099cc">设置指定视频尺寸的码率</font>

<p style="background:#f7f7f7;color:#718c00">方法setVideoBitrate ()</p>

>void setVideoBitrate(int videoSizeType，int kbps)

- **功能**:设置指定视频尺寸的码率

- **参数**:
 + videoSizeType 视频尺寸，请参见VIDEO_SHOW_SIZE定义
 + kbps 比特率；<font face="微软雅黑">（-1代表使用sdk内部默认值）</font>

 <!-- 30 -->
### <font color="#0099cc">获取用户的摄像头状态</font>

<p style="background:#f7f7f7;color:#718c00">方法getVideoStatus ()</p>

>VSTATUS getVideoStatus(string userID)

- **功能**:获取用户的摄像头状态

- **返回值**:麦克风摄像头状态，请参见VSTATUS定义

- **参数**:
 + userID用户的ID

  <!-- 31 -->
### <font color="#0099cc">打开用户的摄像头，以便本地、远端显示视频图像</font>

<p style="background:#f7f7f7;color:#718c00">方法openVideo ()</p>

>void openVideo(string userID)

- **功能**:打开用户的摄像头，以便本地、远端显示视频图像

- **返回值**:无

- **参数**:
 + userID 用户的ID

>请见事件[videoStatusChanged](#videoStatusChanged)

  <!-- 32 -->
### <font color="#0099cc">关闭用户的摄像头</font>

<p style="background:#f7f7f7;color:#718c00">方法closeVideo ()</p>

>void closeVideo(string userID)

- **功能**:关闭用户的摄像头

- **返回值**:无

- **参数**:
 + userID 用户的ID

>请见事件[videoStatusChanged](#videoStatusChanged)

 <!-- 33 -->
### <font color="#0099cc">关闭所有用户的麦克风</font>

<p style="background:#f7f7f7;color:#718c00">方法setAllAudioClose ()</p>

>void setAllAudioClose()

- **功能**:关闭所有用户的麦克风

- **返回值**:无

- **参数**:无

>请见事件[audioStatusChanged](#audioStatusChanged)

 <!-- 34 -->
### <font color="#0099cc">取得观看设备列表</font>

<p style="background:#f7f7f7;color:#718c00">方法getWatchVideos ()</p>

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
- userID-------用户id
- videoID-------设备id

 <!-- 35 -->
### <font color="#0099cc">获取指定用户的最新图像</font>

<p style="background:#f7f7f7;color:#718c00">方法getVideoImg ()</p>

>string getVideoImg(string userID，int videoID)

- **功能**:获取指定用户的最新图像

- **返回值**:json格式的字符串,详见下列详解

- **参数**:
 + userID: 用户ID
 + videoID: 摄像头ID

获取到的图像帧可能比通知的图像帧更新（界面消息机制引起）；如果通知的frmTime比显示的帧要更小，那就没必要再去获取图像并进行显示了。：

<p style="background:#f7f7f7;color:#8959A8">{<font face="微软雅黑">"format": 1, "dat":"FKLEOFJXKFD…","width":1024, "height":768,"frameTime":3213123123123</font>}</p> 

- format-------图像格式,数值参考视频图像格式VIDEO_FORMAT
- dat-------图像数据 
- width-------图像宽度
- height-------图像高度
- frameTime-------图像产生的时间，从1970-01-01 00:00:00到现在为止，过去的毫秒时间

 <!-- 36 -->
### <font color="#0099cc">设置默认的摄像头</font>

<p style="background:#f7f7f7;color:#718c00">方法setDefaultVideo ()</p>

>void setDefaultVideo(string userID，long videoID)

- **功能**:设置默认的摄像头

- **返回值**:无

- **参数**:
 + userID: 用户ID
 + videoID: 摄像头ID

>videoID，应该从getAllVideoInfo返回值中获取。

 <!-- 37 -->
### <font color="#0099cc">获取指定用户的默认摄像头</font>

<p style="background:#f7f7f7;color:#718c00">方法getDefaultVideo ()</p>

>int getDefaultVideo(string userID)

- **功能**:获取指定用户的默认摄像头

- **返回值**:摄像头ID

- **参数**:
 + userID: 用户ID

>如果用户没有摄像头，返回0；

 <!-- 38 -->
### <font color="#0099cc">查询用户是否启用多摄像头</font>

<p style="background:#f7f7f7;color:#718c00">方法getEnableMutiVideo ()</p>

>int getEnableMutiVideo(string userID)

- **功能**:查询用户是否启用多摄像头

- **返回值**:1表示开启了，0表示未开启

- **参数**:
 + userID: 用户ID

  <!-- 39 -->
### <font color="#0099cc">设置用户是否启用多摄像头</font>

<p style="background:#f7f7f7;color:#718c00">方法setEnableMutiVideo ()</p>

>void setEnableMutiVideo(string userID, int bEnable)

- **功能**:设置用户是否启用多摄像头

- **返回值**:无

- **参数**:
 + userID: 用户ID
 + bEnable: 1表示开启，0表示关闭

>（用户实现同时打开多个视频设备）

  <!-- 40 -->
### <font color="#0099cc">获取用户所有的摄像头信息</font>

<p style="background:#f7f7f7;color:#718c00">方法getAllVideoInfo ()</p>

>string getAllVideoInfo(string userID)

- **功能**:获取用户所有的摄像头信息

- **返回值**:json格式的字符串,详见下列详解

- **参数**:
 + userID: 用户ID

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">[
{<font face="微软雅黑">"userID":"111","videoID":1,"videoName":"camera1"</font>},
{<font face="微软雅黑">"userID":"111","videoID":2,"videoName":"camera2"</font>},
...
]</p>

- userID-------用户id
- videoID-------设备id
- videoName-------设备名称

  <!-- 41 -->
### <font color="#0099cc">获取会议内所有可观看的摄像头</font>

<p style="background:#f7f7f7;color:#718c00">方法getWatchableVideos ()</p>

>string getWatchableVideos()

- **功能**:获取会议内所有可观看的摄像头

- **返回值**:json格式的字符串,详见下列详解

- **参数**:无

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">[
{<font face="微软雅黑">"userID":"111","videoID":1</font>},
{<font face="微软雅黑">"userID":"222","videoID":2</font>},
...
]</p>

- userID-------用户id
- videoID-------设备id

  <!-- 42 -->
### <font color="#0099cc">获取当前屏幕共享配置</font>

<p style="background:#f7f7f7;color:#718c00">方法getScreenShareCfg ()</p>

>string getScreenShareCfg() 

- **功能**:获取当前屏幕共享配置

- **返回值**:json格式的字符串,详见下列详解

- **参数**:无

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">{<font face="微软雅黑"> "encodeType":0, "catchRect":{"left":10,"top":10,"right":100,"bottom":100}, "catchWnd":1234, "maxFPS":8, "maxKbps":800000 </font>}</p>

- encodeType-------编码类型,详见屏幕共享的编码类型ENCODE_TYPE
- catchRect-------共享区域,可存放多个区域
- catchWnd-------共享的窗口的窗口句柄
- maxFPS-------最大帧率 缺省为<font face="微软雅黑">8</font>
- maxKbps-------最大码率，缺省<font face="微软雅黑">800kbps</font>

  <!-- 43 -->
### <font color="#0099cc">设置当前屏幕共享配置</font>

<p style="background:#f7f7f7;color:#718c00">方法setScreenShareCfg ()</p>

>void setScreenShareCfg(string json) 

- **功能**:设置当前屏幕共享配置

- **返回值**:无

- **参数**:json格式的字符串,详见下列详解

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">{<font face="微软雅黑"> "encodeType":0, "catchRect":{"left":10,"top":10,"right":100,"bottom":100}, "catchWnd":1234, "maxFPS":8, "maxKbps":800000 </font>}</p>

- encodeType-------编码类型,详见屏幕共享的编码类型ENCODE_TYPE
- catchRect-------共享区域,可存放多个区域
- catchWnd-------共享的窗口的窗口句柄
- maxFPS-------最大帧率 缺省为<font face="微软雅黑">8</font>
- maxKbps-------最大码率，缺省<font face="微软雅黑">800kbps</font>

  <!-- 44 -->
### <font color="#0099cc">检查屏幕共享是否已开启</font>

<p style="background:#f7f7f7;color:#718c00">属性isScreenShareStarted</p>

>int isScreenShareStarted

- **功能**:检查屏幕共享是否已开启

- **返回值**:无

- **参数**:无

>可读.0：没有开启，1：已经开启

  <!-- 45 -->
### <font color="#0099cc">开启屏幕共享</font>

<p style="background:#f7f7f7;color:#718c00">方法startScreenShare ()</p>

>void startScreenShare()

- **功能**:开启屏幕共享

- **返回值**:无

- **参数**:无

>响应事件startScreenShareRslt

 <!-- 46 -->
### <font color="#0099cc">停止屏幕共享</font>

<p style="background:#f7f7f7;color:#718c00">方法stopScreenShare ()</p>

>void stopScreenShare ()

- **功能**:停止屏幕共享

- **返回值**:无

- **参数**:无

>响应事件stopScreenShareRslt

<!-- 47 -->
### <font color="#0099cc">支持的最大屏幕宽度</font>

<p style="background:#f7f7f7;color:#718c00">属性supportMaxScreenWidth</p>

>int supportMaxScreenWidth

- **功能**:支持的最大屏幕宽度

- **返回值**:无

- **参数**:无

>可读

<!-- 48 -->
### <font color="#0099cc">支持的最大屏幕高度</font>

<p style="background:#f7f7f7;color:#718c00">属性supportMaxScreenHeight</p>

>int supportMaxScreenHeight

- **功能**:支持的最大屏幕高度

- **返回值**:无

- **参数**:无

>可读

  <!-- 49 -->
### <font color="#0099cc">设获取屏幕共享解码图像</font>

<p style="background:#f7f7f7;color:#718c00">方法getShareScreenDecodeImg ()</p>

>string getShareScreenDecodeImg()

- **功能**:设获取屏幕共享解码图像

- **返回值**:json格式的字符串,详见下列详解

- **参数**:无

json格式的字符串,详见说明：

<p style="background:#f7f7f7;color:#8959A8">{<font face="微软雅黑"> "format": 1, "dat":"FKLEOFJXKFD…","width":1024, "height":768, "frameTime":3213123123123 </font>}</p>

- format-------图像格式,数值参考视频图像格式VIDEO_FORMAT
- dat-------图像数据 
- width-------图像宽度
- height-------图像高度
- frameTime-------<font face="微软雅黑">图像产生的时间，从1970-01-01 00:00:00到现在为止，过去的毫秒时间</font>

<!-- 50 -->
### <font color="#0099cc">设置、获取自定义抓屏功能</font>

<p style="background:#f7f7f7;color:#718c00">属性customizeCatchScreen</p>

>int customizeCatchScreen

- **功能**:设置、获取自定义抓屏功能

- **返回值**:无

- **参数**:无

><font face="微软雅黑">可读、可写.0：默认抓屏处理；1：自定议抓屏设置自定义抓屏后，sdk需要图像时将产生notiyCatchScreen事件，使用者再通过setCustomizeScreenImg接口送入图像</font>

<!-- 51 -->
### <font color="#0099cc">设置自定义的抓屏图像数据</font>

<p style="background:#f7f7f7;color:#718c00">方法setCustomizeScreenImg ()</p>

>void setCustomizeScreenImg(int format, int width, int height, VARIANT dat)

- **功能**:设置自定义的抓屏图像数据

- **返回值**:无

- **参数**:

 + format-------参见VIDEO_FORMAT；
 + width-------图像的宽度；
 + height-------图像的高度；
 + dat-------SafeArray对象，承载argb数据；

><font face="微软雅黑">当前只支持VFMT_ARGB32格式；如果在收到notiyCatchScreen事件时，暂当前无图像可送时，可送空数据进去(width=0, height=0, dat为空)</font>

<!-- 52 -->
### <font color="#0099cc">设置要录制的视频</font>

<p style="background:#f7f7f7;color:#718c00">方法setRecordVideos ()</p>

>void setRecordVideos(string json)

- **功能**:设置要录制的视频

- **返回值**:无 录制类型REC_VCONTENT_TYPE

- **参数**:json格式的字符串,详见说明

>如果为录屏方式时，配置不生效

<!-- 53 -->
### <font color="#0099cc">开启录制</font>

<p style="background:#f7f7f7;color:#718c00">方法startRecording ()</p>

>int startRecording(string json)

- **功能**:开启录制

- **返回值**:<font face="微软雅黑">0：开启失败； 1：开启成功</font>

- **参数**:json 录制参数,json格式的字符串,详见下列详解

json详解：

<p style="background:#f7f7f7;color:#8959A8">{<font face="微软雅黑">"filePathName": "D:\\1.mp4" "audioType":"FKLEOFJXKFD…","recordWidth":640, "recordHeight":320,"frameRate":8, "bitRate":500000, 
"defaultQP":28, "recDataType":1</font>}</p>

- filePathName-------录像存储的路径文件名,使用完整路径
- audioType-------录制语音类型，详见定义RECORD_AUDIO_TYPE 
- recordWidth-------录制结果中视频尺寸宽度
- recordHeight-------录制结果中视频尺寸宽度
- frameRate-------录制的帧率
- bitRate-------录制的最高码率<font color="red" face="微软雅黑">(当图像变化小时，实际码率会低于此值。建议：
640*360: 500000; (500kbps)
1280*720：1000000; (1mbps)
1920*1080: 2000000; (2mbps)) </font>
- defaultQP-------录制的缺省质量<font color="red" face="微软雅黑">(缺省值：28
取值范围：0~51;  (0完全无损, 51质量非常差)
推荐：高质量取值18, 中质量28， 低质量38)</font>
- recDataType-------录制内容类型（视频+音频），值参考定义REC_DATATYPE

<!-- 54 -->
### <font color="#0099cc">停止录制</font>

<p style="background:#f7f7f7;color:#718c00">方法stopRecording ()</p>

>void stopRecording()

- **功能**:停止录制

- **返回值**:无

- **参数**:无

<!-- 55 -->
### <font color="#0099cc">得到录制结果文件大小</font>

<p style="background:#f7f7f7;color:#718c00">方法getRecFileSize ()</p>

>int getRecFileSize()

- **功能**:得到录制结果文件大小

- **返回值**:无

- **参数**:无

<!-- 56 -->
### <font color="#0099cc">得到录制的时长</font>

<p style="background:#f7f7f7;color:#718c00">方法getRecDuration ()</p>

>int getRecDuration()

- **功能**:得到录制的时长

- **返回值**:无

- **参数**:无

<!-- 57 -->
### <font color="#0099cc">取得所有录制文件信息</font>

<p style="background:#f7f7f7;color:#718c00">方法getAllRecordFiles ()</p>

>string getAllRecordFiles()

- **功能**:取得所有录制文件信息

- **返回值**:json格式的字符串,详见下列详解

- **参数**:无

json串中包含多个录制文件信息：

<p style="background:#f7f7f7;color:#8959A8">[{<font face="微软雅黑">"fileName":"D:\\1.mp4","state":1,"uploadPercent":100</font>}{<font face="微软雅黑">"fileName":"D:\\2.mp4","state":2,"uploadPercent":80</font>}...]</p>

- fileName-------录像存储的路径文件名,使用完整路径
- state-------<font face="微软雅黑">录制语音类型，详见定义RECORD_AUDIO_TYPE </font>
- uploadPercent-------<font face="微软雅黑">录制结果中视频尺寸宽度 </font>

<!-- 58 -->
### <font color="#0099cc">删除本地的录制文件，上传中的文件会被取消上传</font>

<p style="background:#f7f7f7;color:#718c00">方法removeFromFileMgr ()</p>

>void removeFromFileMgr(string filename)

- **功能**:删除本地的录制文件，上传中的文件会被取消上传

- **返回值**:无

- **参数**:
 + filename------文件名，全路径

 <!-- 59 -->
### <font color="#0099cc">上传文件</font>

<p style="background:#f7f7f7;color:#718c00">方法uploadRecordFile  ()</p>

>void uploadRecordFile(string filename)

- **功能**:上传文件

- **返回值**:无

- **参数**:
 + filename------文件名，全路径

  <!-- 60 -->
### <font color="#0099cc">取消上传中的录制文件</font>

<p style="background:#f7f7f7;color:#718c00">方法cancelUploadRecordFile ()</p>

>void cancelUploadRecordFile(string filename)

- **功能**:取消上传中的录制文件

- **返回值**:无

- **参数**:
 + filename------文件名，全路径

   <!-- 61 -->
### <font color="#0099cc">回放录制文件</font>

<p style="background:#f7f7f7;color:#718c00">方法playbackRecordFile ()</p>

>void playbackRecordFile(string filename)

- **功能**:回放录制文件

- **返回值**:无

- **参数**:
 + filename------文件名，全路径

>可创建影音控件显示录制内容，功能同接口startPlayMedia

   <!-- 62 -->
### <font color="#0099cc">发送IM消息</font>

<p style="background:#f7f7f7;color:#718c00">方法sendIMmsg ()</p>

>string sendIMmsg(string text, string toUsrID=””, string cookie=””)

- **功能**:发送IM消息

- **返回值**:taskID 发送任务id 

- **参数**:
 + text ------发送的文本消息
 + toUsrID------目标用户，如果用户ID为空，消息发送给会议内所有用户 
 + cookie ------自定义用户数据

>发送结果事件sendIMmsgRlst









