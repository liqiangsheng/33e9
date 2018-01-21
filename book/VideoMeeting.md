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

<!-- 46 -->
### <font color="#0099cc">停止录制</font> {#stopRecording }

<p style="background:#f7f7f7;color:#718c00">方法 stopRecording ()</p>

>void stopRecording()

- **功能**:停止录制

- **返回值**: 无  

- **参数**:无 

<!-- 47 -->
### <font color="#0099cc">开启录制</font> {#getRecFileSize }

<p style="background:#f7f7f7;color:#718c00">方法 getRecFileSize ()</p>

>int getRecFileSize()

- **功能**:得到录制结果文件大小

- **返回值**: 无

- **参数**:无

<!-- 48 -->
### <font color="#0099cc">得到录制的时长</font> {#getRecDuration }

<p style="background:#f7f7f7;color:#718c00">方法 getRecDuration ()</p>

>int getRecDuration()

- **功能**:得到录制的时长

- **返回值**: 无

- **参数**:无

<!-- 49 -->
### <font color="#0099cc">设置本地生成的录制文件是否加密</font> {#setRecordFileEncrypt}

<p style="background:#f7f7f7;color:#718c00">方法 setRecordFileEncrypt ()</p>

>void setRecordFileEncrypt(int encrypt)

- **功能**:设置本地生成的录制文件是否加密

- **返回值**: 无

- **参数**:
 + encrypt ------ 1表示加密 0表示不加密

>未加密的录制文件用其他播放器也可播放，加密后只能利用SDK回放功能才可播放。回放接口为playbackRecordFile

<!-- 50 -->
### <font color="#0099cc">取得所有录制文件信息</font> {#getAllRecordFiles}

<p style="background:#f7f7f7;color:#718c00">方法 getAllRecordFiles ()</p>

>string getAllRecordFiles()

- **功能**:取得所有录制文件信息

- **返回值**: json格式的字符串,详见[RecordFilesObj](ObjectstructureDing.md#RecordFilesObj)说明

- **参数**:无

<!-- 51 -->
### <font color="#0099cc">添加本地文件到录制文件管理中</font> {#addFileToRecordMgr}

<p style="background:#f7f7f7;color:#718c00">方法 addFileToRecordMgr ()</p>

>int addFileToRecordMgr (string fileName, string filePath)

- **功能**:添加本地文件到录制文件管理中 

- **返回值**: -1：本地文件不存在，0：成功，1：文件已经被添加过

- **参数**:
 + filename ------ 文件名，不含路径
 + filePath ------ 文件路径，不含文件名

>第三方录制文件调用此接口后可进行本地回放和上传到服务器record下

<!-- 52 -->
### <font color="#0099cc">删除本地的录制文件，上传中的文件会被取消上传</font> {#removeFromFileMgr}

<p style="background:#f7f7f7;color:#718c00">方法 removeFromFileMgr ()</p>

>void removeFromFileMgr(string fileName)

- **功能**:删除本地的录制文件，上传中的文件会被取消上传 

- **返回值**: 无 

- **参数**:
 + filename ------ 文件名，全路径

>不影响已上传完成的服务器文件

<!-- 53 -->
### <font color="#0099cc">上传文件</font> {#uploadRecordFile}

<p style="background:#f7f7f7;color:#718c00">方法 uploadRecordFile ()</p>

>void uploadRecordFile(string filename)

- **功能**:上传文件 

- **返回值**: 无 

- **参数**:
 + filename ------ 文件名，全路径

<!-- 54 -->
### <font color="#0099cc">取消上传中的录制文件</font> {#cancelUploadRecordFile}

<p style="background:#f7f7f7;color:#718c00">方法 cancelUploadRecordFile ()</p>

>void cancelUploadRecordFile(string filename)

- **功能**:取消上传中的录制文件 

- **返回值**: 无 

- **参数**:
 + filename ------ 文件名，全路径

<!-- 55 -->
### <font color="#0099cc">回放录制文件</font> {#playbackRecordFile}

<p style="background:#f7f7f7;color:#718c00">方法 playbackRecordFiles ()</p>

>void playbackRecordFile(string filename)

- **功能**:回放录制文件 

- **返回值**: 无 

- **参数**:
 + filename ------ 文件名，全路径

>可创建影音控件显示录制内容，功能同接口startPlayMedia如果录制文件被加密，则只能使用playbackRecordFile来回放。

<!-- 56 -->
### <font color="#0099cc">发送IM消息</font> {#sendIMmsg}

<p style="background:#f7f7f7;color:#718c00">方法 sendIMmsg ()</p>

>string sendIMmsg(string text, string toUsrID, string cookie)

- **功能**:发送IM消息 

- **返回值**: taskID 发送任务id 

- **参数**:
 + text ------ 发送的文本消息
 + toUsrID ------ 目标用户，如果用户ID为空，消息发送给会议内所有用户
 + cookie ------ 自定义用户数据

>发送结果事件[sendIMmsgRlst](#sendIMmsgRlst)

<!-- 57 -->
### <font color="#0099cc">赋予控制权限</font> {#giveCtrlRight}

<p style="background:#f7f7f7;color:#718c00">方法 giveCtrlRight ()</p>

>void giveCtrlRight(string userID)

- **功能**:赋予控制权限 
 
- **返回值**: 无

- **参数**:
 + userID ------ 目标用户

>控制权限更改通知事件[notifyGiveCtrlRight](#notifyGiveCtrlRight)

<!-- 58 -->
### <font color="#0099cc">收回控制权限</font> {#releaseCtrlRight}

<p style="background:#f7f7f7;color:#718c00">方法 releaseCtrlRight ()</p>

>void releaseCtrlRight(string userID)

- **功能**:收回控制权限 
 
- **返回值**: 无

- **参数**:
 + userID ------ 目标用户

>收回控制权限通知事件[notifyReleaseCtrlRight](#notifyReleaseCtrlRight)

<!-- 59 -->
### <font color="#0099cc">发送鼠标控制消息</font> {#sendMouseCtrlMsg}

<p style="background:#f7f7f7;color:#718c00">方法 sendMouseCtrlMsg ()</p>

>void sendMouseCtrlMsg(int msgType, int key, int ptX, int ptY)

- **功能**:发送鼠标控制消息 
 
- **返回值**: 无

- **参数**:
 + msgType ------ 鼠标事件类型
 + key ------  鼠标键类型
 + ptX ------ 鼠标在屏幕中的横坐标
 + ptY ------ 鼠标在屏幕中的纵坐标

>msgType 数值详见[MOUSE_MSG_TYPE](Constant.md#MOUSE_MSG_TYPE)类型;key 数值详见[MOUSE_KEY_TYPE](Constant.md#MOUSE_KEY_TYPE)类型

<!-- 60 -->
### <font color="#0099cc">发送键盘控制消息</font> {#sendKeyCtrlMsg}

<p style="background:#f7f7f7;color:#718c00">方法 sendKeyCtrlMsg ()</p>

>void sendKeyCtrlMsg(int keyMsgType, int vk, int bExtendedKey)

- **功能**:发送键盘控制消息 
 
- **返回值**: 无

- **参数**:
 + keyMsgType ------ 键盘事件类型
 + vk ------  键盘虚拟键值
 + bExtendedKey

>keyMsgType 数值详见[KEY_MSG_TYPE](Constant.md#KEY_MSG_TYPE)类型

<!-- 61 -->
### <font color="#0099cc">功能切换</font> {#switchToPage}

<p style="background:#f7f7f7;color:#718c00">方法 switchToPage ()</p>

>void switchToPage(int mainPage, string pageID)

- **功能**:功能切换 
 
- **返回值**: 无

- **参数**:
 + mainPage ------ 功能类型
 + pageID ------  子页面标识（如创建白板时返回的boardID）
 + bExtendedKey

>mainPage  数值详见[MAIN_PAGE_TYPE](Constant.md#MAIN_PAGE_TYPE)类型

<!-- 62 -->
### <font color="#0099cc">获取当前主功能区</font> {#getCurrentMainPage}

<p style="background:#f7f7f7;color:#718c00">方法 getCurrentMainPage ()</p>

>int getCurrentMainPage()

- **功能**:获取当前主功能区 
 
- **返回值**: mainPage数值详见[MAIN_PAGE_TYPE](Constant.md#MAIN_PAGE_TYPE)类型

- **参数**:无

<!-- 63 -->
### <font color="#0099cc">获取当前子页面</font> {#getCurrentSubPage}

<p style="background:#f7f7f7;color:#718c00">方法 getCurrentSubPage ()</p>

>string getCurrentSubPage ()

- **功能**:获取当前子页面 
 
- **返回值**: 返回pageID

- **参数**:无

<!-- 64 -->
### <font color="#0099cc">设置视频墙分屏模式</font> {#setVideoWallMode}

<p style="background:#f7f7f7;color:#718c00">方法 setVideoWallMode ()</p>

>void setVideoWallMode(int videoWallMode)

- **功能**:设置视频墙分屏模式 
 
- **返回值**: 无

- **参数**:
 + videoWallMode ------ 分屏模式

>videoWallModee数值详见[VIDEOLAYOUTMODE](Constant.md#VIDEOLAYOUTMODE)类型

<!-- 65 -->
### <font color="#0099cc">获取视频墙当前分屏模式</font> {#getVideoWallMode}

<p style="background:#f7f7f7;color:#718c00">方法 getVideoWallMode ()</p>

>int getVideoWallMode()

- **功能**:获取视频墙当前分屏模式 
 
- **返回值**: videoWallModee数值详见[VIDEOLAYOUTMODE](Constant.md#VIDEOLAYOUTMODE)类型

- **参数**:无

<!-- 66 -->
### <font color="#0099cc">创建白板</font> {#createBoard}

<p style="background:#f7f7f7;color:#718c00">方法 createBoard ()</p>

>string createBoard(string title, int width, int height, int pageCount)

- **功能**:创建白板 
 
- **返回值**: 返回boardID(需要所有参会者同步切到此白板，参见[switchToPage](#switchToPage))

- **参数**:
 + title ------ 白板名称
 + width ------ 白板宽度
 + height ------ 白板高度
 + pageCount ------ 白板内有多个页（一般空白板1页，文档白板为实际页数）

>其他参会者会收到：[notifyCreateBoard](#notifyCreateBoard)事件；同时后台会记录下白板数据，新入会者会收到：[notifyInitBoards](#notifyInitBoards)事件<font color="red">注意：创建完白板后，一定要及尽快调用[initBoardPageDat](#initBoardPageDat)初始化各页数据</font>

<!-- 67 -->
### <font color="#0099cc">初始化白板指定页数据</font> {#initBoardPageDat}

<p style="background:#f7f7f7;color:#718c00">方法 initBoardPageDat ()</p>

>void initBoardPageDat(string boardID, int boardPageNo, string imgID, string elemets)

- **功能**:初始化白板指定页数据 
 
- **返回值**:  无

- **参数**:
 + boardID ------ 白板标识
 + boardPageNo ------ 白板第几页（0:代表第一页）
 + imgID ------ 白板的背景图片标识(空代表无背影图)
 + elemets ------ 白板的初始图元（空代表无图元，一般在导入历史文件才用到）

>1. 关于imgID:imgID非空时, 代表背景的图片ID(建议为uuid)。（对应的文件应通uploadNetDiskFile(imgID, 本地文件名)上传到服务器；）2.其他参会者将收到[notifyInitBoardPageDat](#notifyInitBoardPageDat)事件；3.后台会记录下白板的页数据，在新用户入会时，也会收到[notifyInitBoardPageDat](#notifyInitBoardPageDat)事件

<!-- 68 -->
### <font color="#0099cc">关闭白板</font> {#closeBoard}

<p style="background:#f7f7f7;color:#718c00">方法 closeBoard ()</p>

>void closeBoard(string boardID)

- **功能**:关闭白板 
 
- **返回值**:  无

- **参数**:
 + boardID ------ 白板标识

>其他参会者将收到[notifyCloseBoard](#notifyCloseBoard)事件

<!-- 69 -->
### <font color="#0099cc">创建一个符合云层要求的图元id</font> {#createElementID}

<p style="background:#f7f7f7;color:#718c00">方法 createElementID ()</p>

>string createElementID()

- **功能**:创建一个符合云层要求的图元id 
 
- **返回值**:  图元id

- **参数**:无

>本地操作；所有白板图元id，必须由此接口创建；（历史文件存储的图元id，在会议内不能再使用，应重新创建）

<!-- 70 -->
### <font color="#0099cc">添加图元信息</font> {#addBoardElement}

<p style="background:#f7f7f7;color:#718c00">方法 addBoardElement ()</p>

>string addBoardElement(string boardID, int boardPageNo, string element)

- **功能**:添加图元信息 
 
- **返回值**:  elementID图元标识

- **参数**:
 + boardID ------ 白板标识
 + boardPageNo ------ 白板的页序号(0为第一页)
 + element ------ element 图元信息，参见json格式之[BoardElementObj](ObjectstructureDing.md#BoardElementObj)

>其他参会者将收到[notifyAddBoardElement](#notifyAddBoardElement)事件同时后台会保存图元，新入会者会在[notifyInitBoardPageDat](#notifyInitBoardPageDat)中得到这些图元

<!-- 71 -->
### <font color="#0099cc">修改图元信息</font> {#modifyBoardElement}

<p style="background:#f7f7f7;color:#718c00">方法 modifyBoardElement ()</p>

>string modifyBoardElement(string boardID, int boardPageNo, string element)	 

- **功能**:修改图元信息 
 
- **返回值**:  elementID图元标识

- **参数**:
 + boardID ------ 白板标识
 + boardPageNo ------ 白板的页序号(0为第一页)
 + element ------ element 图元信息，参见json格式之[BoardElementObj](ObjectstructureDing.md#BoardElementObj)

>其他参会者将收到[notifyAddBoardElement](#notifyAddBoardElement)事件同时后台会保存图元，新入会者会在[notifyInitBoardPageDat](#notifyInitBoardPageDat)中得到这些图元

<!-- 72 -->
### <font color="#0099cc">删除图元</font> {#delBoardElement}

<p style="background:#f7f7f7;color:#718c00">方法 delBoardElement ()</p>

>void delBoardElement(string boardID, int boardPageNo, string elementIDs) 

- **功能**:删除图元 
 
- **返回值**:  无

- **参数**:
 + boardID ------ 白板标识
 + boardPageNo ------ 白板的页序号(0为第一页)
 + elementIDs ------ 图元id列表，多值时，以“;”分隔，如：“id1;id2”

>其他参会者将收到[notifyDelBoardElement](#notifyDelBoardElement)事件同时后台会保存图元，新入会者会在[notifyInitBoardPageDat](#notifyInitBoardPageDat)中得到这些图元

<!-- 73 -->
### <font color="#0099cc">设置鼠标热点消息</font> {#setMouseHotSpot}

<p style="background:#f7f7f7;color:#718c00">方法 setMouseHotSpot ()</p>

>void setMouseHotSpot(string boardID, int boardPageNo, int x, int y)	 

- **功能**:设置鼠标热点消息 
 
- **返回值**:  无

- **参数**:
 + boardID ------ 白板标识
 + boardPageNo ------ 白板的页序号(0为第一页)
 + x ------ 屏幕横坐标
 + y ------ 屏幕纵坐标

<!-- 74 -->
### <font color="#0099cc">获取会议网盘的容量信息</font> {#getNetDiskSummary}

<p style="background:#f7f7f7;color:#718c00">方法 getNetDiskSummary ()</p>

>void getNetDiskSummary() 

- **功能**:获取会议网盘的容量信息 
 
- **返回值**:  无

- **参数**:无

>调用结果请见事件[getNetDiskSummaryRslt](#getNetDiskSummaryRslt)

<!-- 75 -->
### <font color="#0099cc">获取网盘用户共享文件列表</font> {#getNetDiskFileList}

<p style="background:#f7f7f7;color:#718c00">方法 getNetDiskFileList ()</p>

>void getNetDiskFileList()

- **功能**:获取网盘用户共享文件列表，即使用makeNetDiskFileID中参数fileType为0的生成的fileID上传的文件
 
- **返回值**:  无

- **参数**:无

>调用结果请见事件[getNetDiskFileListRslt](#getNetDiskFileListRslt)

<!-- 76 -->
### <font color="#0099cc">生成网盘文件全局唯一ID</font> {#makeNetDiskFileID}

<p style="background:#f7f7f7;color:#718c00">方法 makeNetDiskFileID ()</p>

>string makeNetDiskFileID(int fileType, string newFileName);

- **功能**:生成网盘文件全局唯一ID
 
- **返回值**:  网盘文件ID，带相对路径前缀的字符串

- **参数**:
 + fileType ------ 文件类型，0:用户共享文件，1:程序使用文件
 + newFileName ------ 传入的全局唯一文件名，建议带文件后缀

>fileType等于0时，为会议网盘共享文件，上传的文件可通过[getNetDiskFileList](#getNetDiskFileList)获取到文件列表详情fileType等于1时，用户程序内资源文件，如白板的背景图片，无法获取文件详情两种文件类型都要调用[uploadNetDiskFile](#uploadNetDiskFile)和[downloadNetDiskFile](#downloadNetDiskFile)进行上传和下载

<!-- 77 -->
### <font color="#0099cc">上传文件到网盘</font> {#uploadNetDiskFile}

<p style="background:#f7f7f7;color:#718c00">方法 uploadNetDiskFile ()</p>

>void uploadNetDiskFile(string fileID, string localFilePath)

- **功能**:上传文件到网盘
 
- **返回值**:  无

- **参数**:
 + fileID ------ 网盘文件ID
 + localFilePath ------ 本地文件路径,含文件名

<!-- 78 -->
### <font color="#0099cc">从网盘中下载文件</font> {#downloadNetDiskFile}

<p style="background:#f7f7f7;color:#718c00">方法 downloadNetDiskFile ()</p>

>void downloadNetDiskFile(string fileID, string localFilePath)

- **功能**:从网盘中下载文件
 
- **返回值**:  无

- **参数**:
 + fileID ------ 网盘文件ID
 + localFilePath ------ 本地文件路径,含文件名

<!-- 79 -->
### <font color="#0099cc">设置网盘文件传输暂停或继续</font> {#setNetDiskTransportPause}

<p style="background:#f7f7f7;color:#718c00">方法 setNetDiskTransportPause ()</p>

>void setNetDiskTransportPause(string fileID, bool bTranPause)

- **功能**:设置网盘文件传输暂停或继续
 
- **返回值**:  无

- **参数**:
 + fileID ------ 网盘文件ID
 + bTranPause ------ 是否暂停

<!-- 80 -->
### <font color="#0099cc">取消网盘文件操作（上传/下载）</font> {#cancleNetDiskFile}

<p style="background:#f7f7f7;color:#718c00">方法 cancleNetDiskFile ()</p>

>void cancleNetDiskFile(string fileID)

- **功能**:取消网盘文件操作（上传/下载）
 
- **返回值**:  无

- **参数**:
 + fileID ------ 网盘文件ID

<!-- 81 -->
### <font color="#0099cc">删除网盘文件</font> {#deleteNetDiskFile}

<p style="background:#f7f7f7;color:#718c00">方法 deleteNetDiskFile ()</p>

>void deleteNetDiskFile(string fileID)

- **功能**:删除网盘文件
 
- **返回值**:  无

- **参数**:
 + fileID ------ 网盘文件ID

<!-- 82 -->
### <font color="#0099cc">配置远程影音共享时，图像质量参数</font> {#setMediaCfg}

<p style="background:#f7f7f7;color:#718c00">方法 setMediaCfg ()</p>

>void setMediaCfg (string jsonCfg)

- **功能**:配置远程影音共享时，图像质量参数
 
- **返回值**:  无

- **参数**:
 + jsonCfg ------ json格式的字符串，详见[VideoCfgObj](ObjectstructureDing.md#VideoCfgObj)说明

<!-- 83 -->
### <font color="#0099cc">播放影音文件</font> {#startPlayMedia}

<p style="background:#f7f7f7;color:#718c00">方法 startPlayMedia ()</p>

>void startPlayMedia(string filename, int bLocPlay, int bPauseWhenFinished)

- **功能**:播放影音文件
 
- **返回值**:  无

- **参数**:
 + filename ------ 文件名，全路径
 + bLocPlay ------ 是否仅仅本地播放（1:本地播放，0：会议内播放）
 + bPauseWhenFinished ------ 是否播放完毕自动暂停在最后一帧

>如果播放成功，请关注通知事件[notifyMediaOpened](#notifyMediaOpened)如果播放失败，请关注通知事件[notifyMediaStop](#notifyMediaStop)

<!-- 84 -->
### <font color="#0099cc">停止影音播放</font> {#stopPlayMedia}

<p style="background:#f7f7f7;color:#718c00">方法 stopPlayMedia ()</p>

>void stopPlayMedia()

- **功能**:停止影音播放
 
- **返回值**:  无

- **参数**:无

>请关注通知事件[notifyMediaStop](#notifyMediaStop)

<!-- 85 -->
### <font color="#0099cc">暂停播放影音</font> {#pausePlayMedia}

<p style="background:#f7f7f7;color:#718c00">方法 pausePlayMedia ()</p>

>void pausePlayMedia(int bPause)

- **功能**:暂停播放影音
 
- **返回值**:  无

- **参数**:
 + bPause ------ 0:播放，1:暂停

<!-- 86 -->
### <font color="#0099cc">设置播放进度</font> {#setMediaPlayPos}

<p style="background:#f7f7f7;color:#718c00">方法 setMediaPlayPos ()</p>

>void setMediaPlayPos(int pos)

- **功能**:设置播放进度
 
- **返回值**:  无

- **参数**:
 + pos ------ 设置播放位置，单位：毫秒

<!-- 86 -->
### <font color="#0099cc">取得影音文件夹下的所有可播放文件</font> {#getAllFilesInMediaPath}

<p style="background:#f7f7f7;color:#718c00">方法 getAllFilesInMediaPath ()</p>

>string getAllFilesInMediaPath()

- **功能**:取得影音文件夹下的所有可播放文件
 
- **返回值**:  文件名列表，以’\n’分割；

- **参数**:无

>影音文件夹位于方法init的第二个参数sdkFilePath，sdk会在此文件中建立media的子文件夹，即为影音文件夹

<!-- 87 -->
### <font color="#0099cc">取得影音文件信息</font> {#getMediaInfo}

<p style="background:#f7f7f7;color:#718c00">方法 getMediaInfo ()</p>

>string getMediaInfo()	 

- **功能**:取得影音文件信息
 
- **返回值**:  json格式的字符串,详见[MediaInfoObj](ObjectstructureDing.md#MediaInfoObj)说明

- **参数**:无

<!-- 88 -->
### <font color="#0099cc">取得影音帧信息</font> {#getMediaImg}

<p style="background:#f7f7f7;color:#718c00">方法 getMediaImg ()</p>

>string getMediaImg(string userID) 

- **功能**:取得影音帧信息
 
- **返回值**:  json格式的字符串,详见[VideoImgObj](ObjectstructureDing.md#VideoImgObj)说明

- **参数**:
 + userID ----- 用户id

<!-- 89 -->
### <font color="#0099cc">2方通话时呼叫第3方</font> {#clientInvite}

<p style="background:#f7f7f7;color:#718c00">方法 clientInvite ()</p>

>string clientInvite(string called, string meetObj, string cookie)

- **功能**:2方通话时呼叫第3方
 
- **返回值**: 本次邀请标识码（邀请ID）

- **参数**:
 + called ----- 被叫用户的账户ID
 + meetObj ----- 当前会议信息json格式的字符串,详见[MeetInfoObj](ObjectstructureDing.md#MeetInfoObj)说明
 + cookie ----- 自定义数据(在回调时，回传给调用者)

>结果事件[clientInviteRslt](#clientInviteRslt)，根据sdkErr判断是否成功

<!-- 90 -->
### <font color="#0099cc">取消第3方呼叫</font> {#clientCancelInvite}

<p style="background:#f7f7f7;color:#718c00">方法 clientCancelInvite ()</p>

>void  clientCancelInvite(string inviteID, string cookie)

- **功能**:取消第3方呼叫
 
- **返回值**: 无

- **参数**:邀请标识码（邀请ID）

>结果事件[clientCancelInviteRslt](#clientCancelInviteRslt)，根据sdkErr判断是否成功

<!-- 91 -->
### <font color="#0099cc">开始获取语音pcm数据</font> {#startGetAudioPCM}

<p style="background:#f7f7f7;color:#718c00">方法 startGetAudioPCM ()</p>

> int startGetAudioPCM (int aSide,int getType, string jsonParam)	 

- **功能**:开始获取语音pcm数据
 
- **返回值**: 整形数值，1：正常，0：失败

- **参数**:
 + aSide ----- 声道类型，0:麦克风，1:扬声器
 + getType ------ 获取方式，<p>0:回调方式, jsonParam可配置回调的数据大小(320-32000)，如: {"EachSize":320}</p><p>1:保存为文件， jsonParam可配置文件名,如: { "FileName" : "e:\\test.pcm" }</p>


>可同时启动"麦克风"、"扬声器"；一种声道，只能选一种获取方式，以最后的配置为准;采用回调方式后，将定期收到[notifyAudioPCMDat](#notifyAudioPCMDat)事件；

<!-- 92 -->
### <font color="#0099cc">停止获取语音pcm数据</font> {#stopGetAudioPCM}

<p style="background:#f7f7f7;color:#718c00">方法 stopGetAudioPCM ()</p>

>void stopGetAudioPCM (int aSide);	 	 

- **功能**:停止获取语音pcm数据
 
- **返回值**: 无

- **参数**:
 + aSide ----- 声道类型，0:麦克风，1:扬声器

<!-- 93 -->
### <font color="#0099cc">某用户进入了会议</font> {#enterMeetingRslt}

<p style="background:#f7f7f7;color:#718c00">事件 enterMeetingRslt</p>

>void enterMeetingRslt(int sdkErr)	 	 

- **功能**:某用户进入了会议

- **参数**:
 + sdkErr ----- 操作结果码, 0代表入会成功, 非0代表入会失败，取值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

<!-- 94 -->
### <font color="#0099cc">某用户离开了会议</font> {#userEnterMeeting}

<p style="background:#f7f7f7;color:#718c00">事件 userEnterMeeting</p>

>void userEnterMeeting(string userID)	 	 

- **功能**:某用户离开了会议

- **参数**:
 + 离开会议的用户id

<!-- 95 -->
### <font color="#0099cc">通知结束视频会议结果</font> {#stopMeetingRslt}

<p style="background:#f7f7f7;color:#718c00">事件 stopMeetingRslt</p>

>void stopMeetingRslt(int code)	 	 

- **功能**:通知结束视频会议结果

- **参数**:
 + code ----- 数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)，值为CRVIDEOSDK_NOERR时结束成功，否则为不成功代码。

<!-- 96 -->
### <font color="#0099cc">SDK通知从会议里掉线了</font> {#meetingDropped}

<p style="background:#f7f7f7;color:#718c00">事件 meetingDropped</p>

>void meetingDropped()	 	 

- **功能**:SDK通知从会议里掉线了，sdk外部收到该通知后可以调用enterMeeting尝试重新入会
（如果用到了呼叫队列，必须调用hungupCall释放本次呼叫）

- **参数**:无

<!-- 97 -->
### <font color="#0099cc">会议已被结束</font> {#meetingStopped}

<p style="background:#f7f7f7;color:#718c00">事件 meetingStopped</p>

>void meetingStopped()	 	 

- **功能**:会议已被结束

- **参数**:无

<!-- 98 -->
### <font color="#0099cc">SDK通知我的网络变化</font> {#netStateChanged}

<p style="background:#f7f7f7;color:#718c00">事件 netStateChanged</p>

>void netStateChanged(long level)	 	 

- **功能**:SDK通知我的网络变化

- **参数**:
 + level ------ 网络状况等级(0~10，10分为最佳网络)

<!-- 99 -->
### <font color="#0099cc">SDK通知用户的说话声音强度更新</font> {#micEnergyUpdate}

<p style="background:#f7f7f7;color:#718c00">事件 micEnergyUpdate</p>

>void micEnergyUpdate( string userID, long oldLevel, long newLevel)	 

- **功能**:SDK通知用户的说话声音强度更新

- **参数**:
 + userID ------ 用户标识ID
 + oldLevel ------ 原来的说话声音强度(0~10)
 + newLevel ------ 现在的说话声音强度(0~10)

<!-- 100 -->
### <font color="#0099cc">SDK通知本地音频设备有变化</font> {#audioDevChanged}

<p style="background:#f7f7f7;color:#718c00">事件 audioDevChanged</p>

>void audioDevChanged() 

- **功能**:SDK通知本地音频设备有变化

- **参数**:无

<!-- 101 -->
### <font color="#0099cc">SDK通知打开本地音频状态变化</font> {#audioStatusChanged}

<p style="background:#f7f7f7;color:#718c00">事件 audioStatusChanged</p>

>void audioStatusChanged(string userID, int oldStatus, int newStatus) 

- **功能**:SDK通知打开本地音频状态变化

- **参数**:
 + userID ------ 会议中设备的所有者
 + oldLevel ------ 旧状态，数值参考麦克风状态定义[ASTATUS](Constant.md#ASTATUS)
 + newLevel ------ 新状态，数值参考麦克风状态定义[ASTATUS](Constant.md#ASTATUS)

<!-- 102 -->
### <font color="#0099cc">打开摄像头设备操作结果</font> {#openVideoDevRslt}

<p style="background:#f7f7f7;color:#718c00">事件 openVideoDevRslt</p>

>void openVideoDevRslt(string devID, bool isSucceed)

- **功能**:打开摄像头设备操作结果

- **参数**:
 + devID ------ 摄像头设备ID
 + isSucceed ------ 是否成功

<!-- 103 -->
### <font color="#0099cc">SDK通知打开本地音频状态变化</font> {#videoStatusChanged}

<p style="background:#f7f7f7;color:#718c00">事件 videoStatusChanged</p>

>void videoStatusChanged(string userID, int oldStatus, int newStatus)	 

- **功能**:SDK通知打开本地音频状态变化

- **参数**:
 + userID ------ 会议中设备的所有者
 + oldLevel ------ 旧状态，数值参考麦克风状态定义[ASTATUS](Constant.md#ASTATUS)
 + newLevel ------ 新状态，数值参考麦克风状态定义[ASTATUS](Constant.md#ASTATUS)

<!-- 104 -->
### <font color="#0099cc">通知用户有新的视频数据</font> {#notifyVideoData}

<p style="background:#f7f7f7;color:#718c00">事件 notifyVideoData</p>

> void notifyVideoData(string userID, int videoID, int frameTime)	  

- **功能**:通知用户有新的视频数据

- **参数**:
 + userID ------ 用户标识ID
 + videoID ------ 用户的摄像头ID
 + frmTime ------ 图像的创建时间

>收到此通知消息后，可通过[getVideoImg](#getVideoImg)获取图像显示；(如果之前显示的帧时间和此值一致，说明此帧已显示过，直接忽略即可)

<!-- 105 -->
### <font color="#0099cc">SDK通知用户的视频设备有变化</font> {#videoDevChanged}

<p style="background:#f7f7f7;color:#718c00">事件 videoDevChanged</p>

>void videoDevChanged(string userID)  

- **功能**:SDK通知用户的视频设备有变化

- **参数**:
 + userID ------ 设备变化的用户ID

<!-- 106 -->
### <font color="#0099cc">SDK通知用户的视频默认设备有变化</font> {#defVideoChanged}

<p style="background:#f7f7f7;color:#718c00">事件 defVideoChanged</p>

>void defVideoChanged(string userID，int videoID)

- **功能**:SDK通知用户的视频默认设备有变化

- **参数**:
 + userID ------ 设备变化的用户ID
 + userID ------ 默认设备id

<!-- 107 -->
### <font color="#0099cc">上传录制文件错误通知</font> {#uploadRecordFileErr}

<p style="background:#f7f7f7;color:#718c00">事件 uploadRecordFileErr</p>

>void uploadRecordFileErr(int sdkErr)

- **功能**:上传录制文件错误通知 

- **参数**:
 + sdkErr ------ 操作失败代码,数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

<!-- 108 -->
### <font color="#0099cc">录制异常，录制将自动停止</font> {#recordErr}

<p style="background:#f7f7f7;color:#718c00">事件 recordErr</p>

>void recordErr(int sdkErr)

- **功能**:录制异常，录制将自动停止 

- **参数**:
 + sdkErr ------ 错误信息,数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

<!-- 109 -->
### <font color="#0099cc">录制状态更改通知</font> {#recordErr}

<p style="background:#f7f7f7;color:#718c00">事件 recordErr</p>

>void recordStateChanged(int state)	

- **功能**:录制状态更改通知 

- **参数**:
 + state ------ 录制状态,数值参考[RECORD_STATE](Constant.md#RECORD_STATE)

<!-- 110 -->
### <font color="#0099cc">开启屏幕共享的响应事件 </font> {#startScreenShareRslt}

<p style="background:#f7f7f7;color:#718c00">事件 startScreenShareRslt</p>

>void startScreenShareRslt(int sdkErr)

- **功能**:开启屏幕共享的响应事件  

- **参数**:
 + sdkErr ------ 操作失败代码,数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

<!-- 111 -->
### <font color="#0099cc">停止屏幕共享的响应事件 </font> {#stopScreenShareRslt}

<p style="background:#f7f7f7;color:#718c00">事件 stopScreenShareRslt</p>

>void stopScreenShareRslt (int sdkErr)

- **功能**:停止屏幕共享的响应事件  

- **参数**:
 + sdkErr ------ 操作失败代码,数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

<!-- 112 -->
### <font color="#0099cc">通知他人开启了屏幕共享 </font> {#notifyScreenShareStarted}

<p style="background:#f7f7f7;color:#718c00">事件 notifyScreenShareStarted</p>

>void notifyScreenShareStarted()

- **功能**:通知他人开启了屏幕共享  

- **参数**: 无

<!-- 113 -->
### <font color="#0099cc">通知他人停止了屏幕共享</font> {#notifyScreenShareStopped}

<p style="background:#f7f7f7;color:#718c00">事件 notifyScreenShareStopped</p>

>void notifyScreenShareStopped()

- **功能**:通知他人停止了屏幕共享  

- **参数**: 无

<!-- 114   -->
### <font color="#0099cc">通知对端屏幕图像有变化</font> {#notifyScreenShareData}

<p style="background:#f7f7f7;color:#718c00">事件 notifyScreenShareData</p>

>void notifyScreenShareData(string userID, string datInfo)

- **功能**:通知对端屏幕图像有变化  

- **参数**: 
 + userID ------ 对端用户ID
 + datInfo ------ 屏幕大小、变化区域信息，json格式；{"screenWidth":1366, "screenHeight":768, "changeLeft":50, "changeTop":50, "changeWidth":100 ,"changeHeight":100}

<!-- 115  -->
### <font color="#0099cc">自定义抓屏时，SDK通知使用者抓屏</font> {#notiyCatchScreen}

<p style="background:#f7f7f7;color:#718c00">事件 notiyCatchScreen</p>

>void notiyCatchScreen()

- **功能**:自定义抓屏时，SDK通知使用者抓屏  

- **参数**:无

>在收到通知时，一定要及时[setCustomizeScreenImg](#setCustomizeScreenImg)，如果没图像时，可以先送入空图像；

<!-- 116 -->
### <font color="#0099cc">SDK通知远程控制权限给予了某人</font> {#notifyGiveCtrlRight}

<p style="background:#f7f7f7;color:#718c00">事件 notifyGiveCtrlRight</p>

>void notifyGiveCtrlRight(string operId, string targetId)

- **功能**:SDK通知远程控制权限给予了某人  

- **参数**:
 + operId ------ 操作的用户id
 + targetId ------ 控制权限给予了谁

<!-- 117 -->
### <font color="#0099cc">SDK通知收回远程控制</font> {#notifyReleaseCtrlRight}

<p style="background:#f7f7f7;color:#718c00">事件 notifyReleaseCtrlRight</p>

>void notifyReleaseCtrlRight(string operId, string targetId)

- **功能**:SDK通知收回远程控制  

- **参数**:
 + operId ------ 操作的用户id
 + targetId ------ 收回了谁的控制权限

<!-- 118 -->
### <font color="#0099cc">SDK通知屏幕共享区域变化</font> {#notifyShareRectChanged}

<p style="background:#f7f7f7;color:#718c00">事件 notifyShareRectChanged</p>

>void notifyShareRectChanged(int x，int y, int w, int h)

- **功能**:SDK通知屏幕共享区域变化  

- **参数**:
 + x，y ------ 位置
 + w ------ 宽度
 + h ------ 高度

<!-- 119 -->
### <font color="#0099cc">发送IM消息时，SDK通知使用者发送结果</font> {#sendIMmsgRlst}

<p style="background:#f7f7f7;color:#718c00">事件 sendIMmsgRlst</p>

>void sendIMmsgRlst(string taskID, int sdkErr, string cookie)

- **功能**:发送IM消息时，SDK通知使用者发送结果  

- **参数**:
 + taskID ------ 发送任务id
 + sdkErr ------ 数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 用户自定义数据

<!-- 120 -->
### <font color="#0099cc">SDK通知收到IM消息</font> {#notifyIMmsg}

<p style="background:#f7f7f7;color:#718c00">事件 notifyIMmsg</p>

>void notifyIMmsg(string fromUserID, string text, int sendTime)

- **功能**:SDK通知收到IM消息  

- **参数**:
 + fromUserID ------ 消息来源
 + text ------ 消息内容
 + sendTime ------ 消息发送时间戳，从1970开始算起

<!-- 121 -->
### <font color="#0099cc">SDK通知功能切换</font> {#notifySwitchToPage}

<p style="background:#f7f7f7;color:#718c00">事件 notifySwitchToPage</p>

>void notifySwitchToPage(int mainPage，string pageID)

- **功能**:SDK通知功能切换  

- **参数**:
 + mainPage ------ 功能类型
 + pageID ------ 子页面标识

>mainPage 数值参见[MAIN_PAGE_TYPE](Constant.md#MAIN_PAGE_TYPE)

<!-- 122 -->
### <font color="#0099cc">SDK通知视频分屏模式切换</font> {#notifyVideoWallMode}

<p style="background:#f7f7f7;color:#718c00">事件 notifyVideoWallMode</p>

>void notifyVideoWallMode(int model)

- **功能**:SDK通知视频分屏模式切换  

- **参数**:
 + model ------ 分屏模式

>model 数值参见[VIDEOLAYOUTMODE](Constant.md#VIDEOLAYOUTMODE)

<!-- 123 -->
### <font color="#0099cc">SDK通知主视频更改</font> {#notifyMainVideoChanged}

<p style="background:#f7f7f7;color:#718c00">事件 notifyMainVideoChanged</p>

>void notifyMainVideoChanged()

- **功能**:SDK通知主视频更改  

- **参数**:无

<!-- 124 -->
### <font color="#0099cc">SDK入会后通知会议中已经存在的白板列表</font> {#notifyInitBoards}

<p style="background:#f7f7f7;color:#718c00">事件 notifyInitBoards</p>

>void notifyInitBoards(string BoardObjs)

- **功能**:SDK入会后通知会议中已经存在的白板列表  

- **参数**:
 + BoardObjs ------ 已经创建好的白板列表, json结构体请参见[BoardObjs](ObjectstructureDing.md#BoardObjs)说明

<!-- 125 -->
### <font color="#0099cc">初始化白板页数据</font> {#notifyInitBoardPageDat}

<p style="background:#f7f7f7;color:#718c00">事件 notifyInitBoardPageDat</p>

>void notifyInitBoardPageDat(string boardID, int boardPageNo, string imgID, string elementDatas, string operatorID)

- **功能**:初始化白板页数据  

- **参数**:
 + boardID ------ 白板标识
 + boardPageNo ------ 白板页序号
 + imgID ------ 页背景文件ID（空代表无背景）
 + elementDatas ------ 此页的所有图元, 详见json结构之[BoardElementObjs](ObjectstructureDing.md#BoardElementObjs)
 + operatorID ------ 初始化用户（为空时，代表入会时后台事件）

<!-- 126 -->
### <font color="#0099cc">初始化白板页数据</font> {#notifyCreateBoard}

<p style="background:#f7f7f7;color:#718c00">事件 notifyCreateBoard</p>

>void notifyCreateBoard(string jsonBoard，string operatorID)

- **功能**:SDK通知创建白板  

- **参数**:
 + jsonBoard ------ 白板信息，详见json格式之[BoardObj](ObjectstructureDing.md#BoardObj)
 + operatorID ------ 创建白板的用户ID

<!-- 127 -->
### <font color="#0099cc">SDK通知添加图元信息</font> {#notifyAddBoardElement}

<p style="background:#f7f7f7;color:#718c00">事件 notifyAddBoardElement</p>

>void notifyAddBoardElement(string boardID, int boardPageNo, string element，string operatorID)

- **功能**:SDK通知添加图元信息  

- **参数**:
 + boardID ------ 白板标识
 + boardPageNo ------ 白板页序号
 + element ------ 此页的所有图元, 详见json结构之[BoardElementObj](ObjectstructureDing.md#BoardElementObj)
 + operatorID ------ 添加图元的用户ID

<!-- 128 -->
### <font color="#0099cc">SDK通知图元信息被修改</font> {#notifyModifyBoardElement}

<p style="background:#f7f7f7;color:#718c00">事件 notifyModifyBoardElement</p>

>void notifyModifyBoardElement(string boardID, int boardPageNo, string element，string operatorID)

- **功能**:SDK通知图元信息被修改  

- **参数**:
 + boardID ------ 白板标识
 + boardPageNo ------ 白板页序号
 + element ------ 此页的所有图元, 详见json结构之[BoardElementObj](ObjectstructureDing.md#BoardElementObj)
 + operatorID ------ 添加图元的用户ID

>应从页内找到旧的图元并替换

<!-- 129 -->
### <font color="#0099cc">SDK通知图元被删除</font> {#notifyDelBoardElement}

<p style="background:#f7f7f7;color:#718c00">事件 notifyDelBoardElement</p>

>void notifyDelBoardElement(string boardID, int boardPageNo, string elementIDs，string operatorID)

- **功能**:SDK通知图元被删除  

- **参数**:
 + boardID ------ 白板标识
 + elementIDs ------ 图元id列表，以 “;”分隔
 + operatorID ------ 删除图元的用户ID

<!-- 130 -->
### <font color="#0099cc">SDK通知鼠标热点消息</font> {#notifyMouseHotSpot}

<p style="background:#f7f7f7;color:#718c00">事件 notifyMouseHotSpot</p>

>void notifyMouseHotSpot(string boardID, int boardPageNo, int x, int y，string operatorID)

- **功能**:SDK通知鼠标热点消息  

- **参数**:
 + boardID ------ 白板标识
 + x ------ 屏幕横坐标
 + y ------ 屏幕纵坐标
 + operatorID ------ 操作者的用户ID

<!-- 131 -->
### <font color="#0099cc">SDK通知获取网盘容量信息结果</font> {#getNetDiskSummaryRslt}

<p style="background:#f7f7f7;color:#718c00">事件 getNetDiskSummaryRslt</p>

>void getNetDiskSummaryRslt(unsigned int diskLimit, unsigned int diskUsed)	 

- **功能**:SDK通知获取网盘容量信息结果  

- **参数**:
 + diskLimit ------ 网盘总容量
 + diskUsed ------ 网盘已用容量

<!-- 132 -->
### <font color="#0099cc">SDK通知获取网盘文件列表</font> {#getNetDiskFileListRslt}

<p style="background:#f7f7f7;color:#718c00">事件 getNetDiskFileListRslt</p>

>void getNetDiskFileListRslt(string fileList)	 

- **功能**:SDK通知获取网盘文件列表  

- **参数**:
 + fileList ------ 网盘文件列表，json格式，定义见[NetFileObj](ObjectstructureDing.md#NetFileObj)

<!-- 133 -->
### <font color="#0099cc">SDK通知删除网盘文件结果</font> {#notifyNetDiskFileDeleteRslt}

<p style="background:#f7f7f7;color:#718c00">事件 notifyNetDiskFileDeleteRslt</p>

>void notifyNetDiskFileDeleteRslt(string fileID, int isSucceed)

- **功能**:SDK通知删除网盘文件结果  

- **参数**:
 + fileID ------ 网盘文件id
 + isSucceed ------ 是否成功 1 成功 0 失败

<!-- 134 -->
### <font color="#0099cc">SDK通知网盘空间已满，容量不足</font> {#notifyNetDiskIsFull}

<p style="background:#f7f7f7;color:#718c00">事件 notifyNetDiskIsFull</p>

>void notifyNetDiskIsFull();	 

- **功能**:SDK通知网盘空间已满，容量不足  

- **参数**:无

<!-- 135 -->
### <font color="#0099cc">SDK通知网盘上传或下载进度</font> {#notifyNetDiskTransforProgress}

<p style="background:#f7f7f7;color:#718c00">事件 notifyNetDiskTransforProgress</p>

>void notifyNetDiskTransforProgress(string fileID, int percent, int isUpload)

- **功能**:SDK通知网盘上传或下载进度  

- **参数**:
 + fileID ------ 网盘文件id
 + percent ------ 进度0-100 
 + isUpload ------ 是否是上传 1 成功 0 失败

<!-- 136 -->
### <font color="#0099cc">SDK通知录制文件状态更改</font> {#notifyRecordFileStateChanged}

<p style="background:#f7f7f7;color:#718c00">事件 notifyRecordFileStateChanged</p>

>void notifyRecordFileStateChanged(string fileName, int state)	 

- **功能**:SDK通知录制文件状态更改  

- **参数**:
 + fileName ------ 本地文件路径
 + state ------ 状态 0 未上传 1 上传中 2已上传 3 上传失败

<!-- 137 -->
### <font color="#0099cc">SDK通知录制文件上传进度</font> {#notifyRecordFileUploadProgress }

<p style="background:#f7f7f7;color:#718c00">事件 notifyRecordFileUploadProgress</p>

>void notifyRecordFileUploadProgress(string fileName, int percent)	 

- **功能**:SDK通知录制文件上传进度  

- **参数**:
 + fileName ------ 本地文件路径
 + percent ------ 进度0-100 

<!-- 138 -->
### <font color="#0099cc">SDK通知影音文件打开</font> {#notifyMediaOpened }

<p style="background:#f7f7f7;color:#718c00">事件 notifyMediaOpened</p>

>void notifyMediaOpened(int totalTime, int width, int height) 

- **功能**:SDK通知影音文件打开  

- **参数**:
 + totalTime ------ 影音时长(毫秒)
 + width ------ 宽度 
 + height ------ 高度

<!-- 139 -->
### <font color="#0099cc">SDK通知影音开始播放</font> {#notifyMediaStart}

<p style="background:#f7f7f7;color:#718c00">事件 notifyMediaStart</p>

>void notifyMediaStart(string userid)

- **功能**:SDK通知影音开始播放  

- **参数**:
 + userid ------ 操作者的用户id

<!-- 140 -->
### <font color="#0099cc">SDK通知影音播放停止</font> {#notifyMediaStop}

<p style="background:#f7f7f7;color:#718c00">事件 notifyMediaStops</p>

>void notifyMediaStop(string userid, int reason)

- **功能**:SDK通知影音播放停止  

- **参数**:
 + userid ------ 操作者的用户id
 + reason ------ 播放停止原因  数值参考影音结束原因定义[STOP_REASON](ObjectstructureDing,md#STOP_REASON)

<!-- 141 -->
### <font color="#0099cc">SDK通知设置鼠标热点消息</font> {#notifyMediaPause}

<p style="background:#f7f7f7;color:#718c00">事件 notifyMediaPause</p>

>void notifyMediaPause(string userid, int bPause) 

- **功能**:SDK通知设置鼠标热点消息  

- **参数**:
 + userid ------ 操作者的用户id
 + bPause ------ 是否暂停 1暂停 0播放

<!-- 142 -->
### <font color="#0099cc">SDK通知播放进度已设置完成</font> {#notifyPlayPosSetted}

<p style="background:#f7f7f7;color:#718c00">事件 notifyPlayPosSetted</p>

>void notifyPlayPosSetted(int setPTS)

- **功能**:SDK通知播放进度已设置完成  

- **参数**:
 + setPTS ------ 播放进度

<!-- 143 -->
### <font color="#0099cc">SDK通知影音帧数据已解码完毕</font> {#notifyMemberMediaData}

<p style="background:#f7f7f7;color:#718c00">事件 notifyMemberMediaData</p>

>void notifyMemberMediaData(string userid, int curPos)

- **功能**:SDK通知影音帧数据已解码完毕  

- **参数**:
 + userid ------ 操作者的用户id
 + curPos ------ 该影音帧的时间，毫秒为单位

>收到此通知消息后，可能过getMediaImg获取图像显示；但如果之前显示的帧时戳更大，说明此通知消息已过时，直接忽略即可；

<!-- 144 -->
### <font color="#0099cc">SDK通知语音PCM数据</font> {#notifyAudioPCMDat}

<p style="background:#f7f7f7;color:#718c00">事件 notifyAudioPCMDat</p>

>void notifyAudioPCMDat(int aSide, string base64PcmDat)

- **功能**:SDK通知语音PCM数据  

- **参数**:
 + aSide ------ 声道类型
 + base64PcmDat ------ PCM数据(base64格式) 

<!-- 145 -->
### <font color="#0099cc">第3方呼叫操作结果</font> {#clientInviteRslt}

<p style="background:#f7f7f7;color:#718c00">事件 clientInviteRslt</p>

>void clientInviteRslt(string inviteID, int sdkErr, string cookie)

- **功能**:第3方呼叫操作结果  

- **参数**:
 + inviteID ------ 邀请标识码（邀请ID）
 + sdkErr ------ 操作结果代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF),CRVIDEOSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

<!-- 146 -->
### <font color="#0099cc">取消第3方呼叫操作结果</font> {#clientCancelInvite}

<p style="background:#f7f7f7;color:#718c00">事件 clientCancelInvite</p>

>void clientCancelInvite(string inviteID, int sdkErr, string cookie)

- **功能**:取消第3方呼叫操作结果  

- **参数**:
 + inviteID ------ 邀请标识码（邀请ID）
 + sdkErr ------ 操作结果代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF),CRVIDEOSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

<!-- 147 -->
### <font color="#0099cc">SDK通知第3方呼叫状态改变</font> {#notifyInviteStatus}

<p style="background:#f7f7f7;color:#718c00">事件 notifyInviteStatus </p>

>void notifyInviteStatus(string inviteID, int status)

- **功能**:SDK通知第3方呼叫状态改变  

- **参数**:
 + inviteID ------ 邀请标识码（邀请ID）
 + status ------ 0-振铃 1-接通 2-拒绝 3-未应答 4-挂断