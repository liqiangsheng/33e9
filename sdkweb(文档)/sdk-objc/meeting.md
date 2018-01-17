# 视频会议组件 {#meeting}

> CloudroomVideoMeeting 是会议核心控件，实现通话建立、音频采集播入、视频采集编解码、屏幕共享、录制、影音播放等。
> 单例组件，整个程序的生命过程中只能有有一个实例。

------

## 接口函数 {#api}

### 进入/退出/结束会议 {#enterMeeting}

```objc
- (void)enterMeeting:(int)meetID
                pswd:(NSString *)pswd
              userID:(NSString *)userID
            nikeName:(NSString *)nikeName;
```

* **功能** 使用会议 ID 和密码(可为空)进入指定的视频会议
* **返回值** 无
* **参数**
  * meetID 视频会议 ID
  * pswd 本次会议中的密码（在创建会议时指定参数）
  * userID 用户账号
  * nikeName 用户昵称
* **回调函数** [enterMeetingRslt](#enterMeetingRslt)

```objc
- (void)exitMeeting;
```

* **功能** 离开会议
* **返回值** 无
* **参数** 无

> 调用此接口离开会话时，其他会话用户会收到 [userLeftMeeting](#userEnterMeeting)的消息通知

```objc
- (void)stopMeeting:(int)meetID cookie:(NSString *) cookie;
```

* **功能** 结束会议
* **返回值** 无
* **参数**
  * meetID 会议 ID
  * cookie 自定义数据（在回调时，回传给调用者）
* **回调函数** [stopMeetingRslt](#stopMeetingRslt)

> 调用此接口结束会议时，其他会话用户会收到 [meetingStopped](#meetingStopped)

### 会议成员列表 {#getAllMembers}

```objc
- (NSMutableArray <MemberInfo *> *)getAllMembers;
```

* **功能** 获取所有用户的信息
* **返回值** MemberInfo 对象数组，详见 [MemberInfo](objc.md#MemberInfo)
* **参数** 无

### 会议成员信息 {#getMemberInfo}

```objc
- (MemberInfo *)getMemberInfo:(NSString *)userId;
```

* **功能** 获取某个用户的信息
* **返回值** MemberInfo 对象，详见 [MemberInfo](objc.md#MemberInfo)
* **参数**
  * userId 用户 ID

### 会议成员昵称 {#getNickName}

```objc
- (NSString *)getNickName:(NSString *)userID;
```

* **功能** 获取某个用户的昵称
* **返回值** 用户的昵称
* **参数**
  * userID 用户 ID

### 用户是否在会议中 {#isUserInMeeting}

```objc
- (BOOL)isUserInMeeting:(NSString *)userID;
```

* **功能** 判断某个用户是否在会议中
* **返回值** YES：在，NO：不在
* **参数**
  * userID 用户 ID

### 麦克风声音大小 {#getMicEnergy}

```objc
- (int)getMicEnergy:(NSString *)userID;
```

* **功能** 获取用户说话声音大小
* **返回值** 音量大小（0~10）
* **参数**
  * userID 用户 ID

### 开/关麦克风 {#openMic}

```objc
- (void)openMic:(NSString *)userId;
```

* **功能** 打开用户的麦克风
* **返回值** 无
* **参数**
  * userId 用户 ID

> 打开麦克风会触发音频状态变化的回调函数 [audioStatusChanged](#audioStatusChanged)
> 新状态参数先会进入到 [AOPENING](constant.md#AUDIO_STATUS) 状态，等服务器处理后才会进入 [AOPEN](constant.md#AUDIO_STATUS) 状态，此时说话才能被采集到；

```objc
- (void)closeMic:(NSString *)userId;
```

* **功能** 关闭用户的麦克风
* **返回值** 无
* **参数**
  * userId 用户 ID

> 关麦克风会触发音频状态变化的回调函数 [audioStatusChanged](#audioStatusChanged)
> 新状态参数会变为 [ACLOSE](constant.md#AUDIO_STATUS) 
> 关麦操作是立即生效的，会立即停止采集；

### 麦克风状态 {#getAudioStatus}

```objc
- (AUDIO_STATUS)getAudioStatus:(NSString *)userID;
```

* **功能** 获取用户的麦状态
* **返回值** 麦克风设备状态，请参见 [AUDIO_STATUS](constant.md#AUDIO_STATUS)
* **参数**
  * userID 登录成功后分配的ID

### 麦克风音量 {#micVolume}

```objc
- (int)getMicVolume;
```

* **功能** 获取麦克风音量大小

> 读写属性，音量范围取值 0-255

```objc
- (bool)setMicVolume:(int)level;
```

* **功能** 设置麦克风音量大小

> 设置属性，音量范围取值 0-255

### 扬声器音量 {#speakerVolume}

```objc
- (int)getSpeakerVolume;
```

* **功能** 获取本地扬声器音量

> 读写属性，音量等级取值 0-255

```objc
- (bool)setSpeakerVolume:(int)level;
```

* **功能** 设置本地扬声器音量

> 设置属性，音量等级取值 0-255

### 扬声器静音 {#speakerMute}

```objc
- (BOOL)getSpeakerMute;
```

* **功能**  获取播放是否静音
* **说明** 对会议内所有声音生效

> 读写属性，取值 NO：不静音，YES：静音

```objc
- (void)setSpeakerMute:(BOOL)bMute;
```

* **功能**  设置播放是否静音
* **说明** 对会议内所有声音生效

> 设置属性，取值 NO：不静音，YES：静音

### 摄像头设备列表 {#getAllVideoInfo}

```objc
- (NSMutableArray <UsrVideoInfo *> *)getAllVideoInfo:(NSString *)userId;
```

* **功能** 获取用户所有的摄像头信息
* **返回值** UsrVideoInfo 对象数组，详见 [UsrVideoInfo](objc.md#UsrVideoInfo)
* **参数**
  * userId 用户 ID

### 视频设置 {#videoCfg}

```objc
- (BOOL)setVideoCfg:(VideoCfg *)cfg;
```

* **功能** 设置 获取 摄像头参数
* **返回值** YES：设置成功，NO：设置失败
* **参数**
  * cfg VideoCfg 对象，详见 [VideoCfg](objc.md#VideoCfg)

```objc
- (VideoCfg *)getVideoCfg;
```

* **功能** 设置 获取 摄像头参数
* **返回值** 摄像头参数， VideoCfg 对象， 详见 [VideoCfg](objc.md#VideoCfg)
* **参数** 无

### 会议内可观看摄像头列表 {#getWatchableVideos}

```objc
- (NSMutableArray <UsrVideoId *> *)getWatchableVideos;
```

* **功能** 获取会议内所有可观看的摄像头
* **返回值** UsrVideoId 对象数组，详见 [UsrVideoId](objc.md#UsrVideoId)
* **参数** 无

### 开/关摄像头 {#openVideo}

```objc
- (void)openVideo:(NSString *)userID;
```

* **功能** 打开用户的摄像头，以便本地、远端显示视频图像
* **返回值** 无
* **参数**
  * userID 用户 ID
* **回调函数** [openVideoRslt](#openVideoRslt)

```objc
- (void)closeVideo:(NSString *)userID;
```

* **功能** 关闭用户的摄像头
* **返回值** 无
* **参数**
  * userID 用户 ID

> 调用打开和关闭麦克风接口都会触发对应用户的 [videoStatusChanged](#videoStatusChanged)

### 视频状态 {#getVideoStatus}

```objc
- (VIDEO_STATUS)getVideoStatus:(NSString *)userID;
```

* **功能** 获取用户的摄像头状态
* **返回值** 麦克风摄像头状态， 详见 [VIDEO_STATUS](constant.md#VIDEO_STATUS)
* **参数**
  * userID 用户 ID

### 获取/设置默认视频 {#defaultVideo}

```objc
- (short)getDefaultVideo:(NSString *)userId;
```

* **功能** 获取指定用户的默认摄像头
* **返回值** 摄像头 ID
* **参数**
  * userId 用户 ID

> 如果用户没有摄像头，返回0

```objc
- (void)setDefaultVideo:(NSString *)userId videoID:(short)videoID;
```

* **功能** 设置默认的摄像头
* **返回值** 无
* **参数**
  * userId 用户 ID
  * videoID 摄像头 ID

> videoID 应该从 [getAllVideoInfo](#getAllVideoInfo) 返回值中获取。

### 摄像头图像数据 {#getVideoImg}

```objc
- (VideoFrame *)getVideoImg:(UsrVideoId *)userID;
```

* **功能** 获取指定用户的最新图像
* **返回值** VideoFrame 对象，详见[VideoFrame](objc.md#VideoFrame)
* **参数**
  * userID UsrVideoId 对象， 详见 [UsrVideoId](objc.md#UsrVideoId)

### 屏幕共享图像数据 {#getShareScreenDecodeImg}

```objc
- (ScreenShareImg *)getShareScreenDecodeImg;
```

* **功能** 获取屏幕共享解码图像
* **返回值** ScreenShareImg 对象，详见[ScreenShareImg](objc.md#ScreenShareImg)
* **参数** 无

### 屏幕共享状态 {#isScreenShareStarted}

```objc
- (BOOL)isScreenShareStarted;
```

* **功能** 检查屏幕共享是否已开启

> 只读属性，只读，NO：没有开启，YES：已经开启

### 屏幕共享者 {#getScreenSharer}

```objc
- (NSString *)getScreenSharer;
```

* **功能** 获取屏幕共享解码图像
* **返回值** 屏幕共享者
* **参数** 无

### 是否允许其他人标注 {#isEnableOtherMark}

```objc
- (BOOL)isEnableOtherMark;
```

* **功能** 是否允许其他人标注
* **返回值** YES：允许，NO：不允许
* **参数** 无

### 是否开启标注 {#isMarkedState}

```objc
- (BOOL)isMarkedState;
```

* **功能** 是否开启标注
* **返回值** YES：已开启，NO：未开启
* **参数** 无

### 获取标注信息 {#getAllMarkData}

```objc
- (void)getAllMarkData;
```

* **功能** 获取标注信息
* **返回值** 无
* **参数** 无

> 调用此接口会收到 [sendAllMarkData](#sendAllMarkData)

### 发送标注信息 {#sendMarkData}

```objc
- (void)sendMarkData:(MarkData *)markData;
```

* **功能** 获取标注信息
* **返回值** 无
* **参数** 
  * markData 标注信息，详见 [MarkData](objc.md#MarkData)

### 清除所有标注信息 {#clearAllMarks}

```objc
- (void)clearAllMarks;
```

* **功能** 删除所有标注信息
* **返回值** 无
* **参数** 无

### 录制内容配置 {#setRecordVideos}

```objc
- (void)setRecordVideos:(NSArray <RecContentItem *> *)videoIDs;
```

* **功能** 设置要录制的视频
* **返回值** 无
* **参数**
  * videoIDs RecContentItem 对象数组，详见 [RecContentItem](objc.md#RecContentItem)

> 调用 startRecording 后，录制过程中配置有效

### 开始/停止录制 {#startRecording}

```objc
- (BOOL)startRecording:(RecCfg *)cfg;
```

* **功能** 开启录制
* **返回值** NO：开启失败，YES：开启成功
* **参数**
  * cfg 录制参数， RecCfg 对象，详见 [RecCfg](objc.md#RecCfg)

```objc
- (void)stopRecording;
```

* **功能** 停止录制
* **返回值** 无
* **参数** 无

### 录制文件大小 {#recordFileSize}

```objc
- (int)recordFileSize;
```

* **功能** 得到录制结果文件大小
* **返回值** 文件大小
* **参数** 无

### 录制时长 {#recordDuration}

```objc
- (int)recordDuration;
```

* **功能** 得到录制的时长
* **返回值** 录制时长
* **参数** 无

### 是否加密录制文件 {#setRecordFileEncrypt}

```objc
- (void)setRecordFileEncrypt:(BOOL)encrypt;
```

* **功能** 设置本地生成的录制文件是否加密
* **返回值** 无
* **参数**
  * encrypt YES：加密，NO：不加密

> 未加密的录制文件用其他播放器也可播放，加密后只能利用 SDK 回放功能才可播放。回放接口为 [playbackRecordFile](#playbackRecordFile)

### 录制文件列表 {#getAllRecordFiles}

```objc
- (NSArray <RecFileShow *> *)getAllRecordFiles;
```

* **功能** 取得所有录制文件信息
* **返回值** RecFileShow 对象，详见 [RecFileShow](objc.md#RecFileShow)
* **参数** 无

### 录制列表添加/删除文件 {#addFileToRecordMgr}

```objc
- (int)addFileToRecordMgr:(NSString *)fileName filePath:(NSString *)filePath;
```

* **功能**　添加本地的录制文件，上传中的文件会被取消上传
* **返回值**　-1：本地文件不存在，0：成功，1：文件已经被添加过
* **参数**
  * fileName 录制文件名称，不含路径
  * filePath 录制文件路径，不含文件名称

> 第三方录制文件调用此接口后可进行本地回放和上传到视频服务器上，和自己录制的文件一样可以正常在线播放和下载

```objc
- (int)removeFromFileMgr:(NSString *)fileName;
```

* **功能**　删除本地的录制文件，上传中的文件会被取消上传
* **返回值**　0：成功，1：失败
* **参数**
  * fileName 文件名称，包含路径

> 已上传完成的服务器文件不受影响

### 上传/取消上传录制文件 {#uploadRecordFile}

```objc
- (void)uploadRecordFile:(NSString *)fileName;
```

* **功能** 上传文件
* **返回值** 无
* **参数**
  * fileName 文件名称，包含路径

```objc
- (void)cancelUploadRecordFile:(NSString *)fileName;
```

* **功能** 取消上传中的录制文件
* **返回值** 无
* **参数**
  * fileName 文件名称，包含路径

### 回放录制文件 {#playbackRecordFile}

```objc
- (void)playbackRecordFile:(NSString *)fileName;
```

* **功能** 回放录制文件
* **返回值** 无
* **参数**
  * fileName 文件名称，包含路径

> 可创建影音控件显示录制内容，功能同接口 [startPlayMedia](#startPlayMedia)，如果录制文件被加密，则只能使用 playbackRecordFile 来回放。

### 获取/设置会议内视频分屏模式 {#setVideoWallMode}

```objc
- (int)getVideoWallMode;
```

* **功能** 获取视频墙当前分屏模式
* **返回值** 分屏模式，详见 [VIDEO_LAYOUT_MODE](constant.md#VIDEO_LAYOUT_MODE)
* **参数** 无

```objc
- (void)setVideoWallMode:(int)videoWallMode;
```

* **功能** 设置视频墙分屏模式
* **返回值** 无
* **参数**
  * videoWallMode 分屏模式

> videoWallMode 数值详见 [VIDEO_LAYOUT_MODE](contant.md#VIDEO_LAYOUT_MODE)

### 主视频 {#mainVideo}

```objc
- (NSString *)getMainVideo;
```

* **功能** 获取当前哪个用户为主视频
* **返回值** 用户 ID

> 读取属性

```objc
- (void)setMainVideo:(NSString *)userID;
```

* **功能** 设置当前哪个用户为主视频
* **参数**
* userID 用户 ID

> 设置属性

### 影音播放配置 {#mediaCfg}

```objc
- (VideoCfg *)getMediaCfg;
```

* **功能** 获取远程影音共享时，图像质量参数
* **返回值** VideoCfg 对象，详见 [VideoCfg](objc.md#VideoCfg)
* **参数** 无

```objc
- (BOOL)setMediaCfg:(VideoCfg *)cfg;
```

* **功能** 设置远程影音共享时，图像质量参数
* **返回值** YES：设置成功，NO：设置失败
* **参数**
  * cfg VideoCfg 对象，详见 [VideoCfg](objc.md#VideoCfg)

### 开始/暂停/停止影音播放 {#startPlayMedia}

```objc
- (void)startPlayMedia:(NSString *)filename bLocPlay:(int)bLocPlay bPauseWhenFinished:(int)bPauseWhenFinished;
```

* **功能** 播放影音文件
* **返回值** 无
* **参数**
  * filename 文件名，全路径
  * bLocPlay 是否仅仅本地播放（1:本地播放，0:会议内播放）
  * bPauseWhenFinished 是否播放完毕自动暂停在最后一帧

> 如果播放成功，其他人收到 [notifyMediaOpened](#notifyMediaOpened)，如果播放失败，请关注通知事件 [notifyMediaStop](#notifyMediaOpened)

```objc
- (void)pausePlayMedia:(BOOL)bPause;
```

* **功能** 暂停播放影音
* **返回值** 无
* **参数**
  * bPause NO：播放，YES：暂停

```objc
- (void)stopPlayMedia;
```

* **功能** 停止影音播放
* **返回值** 无
* **参数** 无

> 其他人收到 [notifyMediaStop](#notifyMediaOpened)

### 设置播放进度 {#setPlayPos}

```objc
- (void)setPlayPos:(int)pts;
```

* **功能** 设置播放进度
* **返回值** 无
* **参数**
  * pts 设置播放位置，单位：毫秒

### 影音文件列表 {#getAllFilesInMediaPath}

```objc
- (NSArray <NSString *> *)getAllFilesInMediaPath;
```

* **功能** 取得影音文件夹下的所有可播放文件
* **返回值** 文件名列表
* **参数** 无

### 影音播放信息 {#getMediaInfo}

```objc
- (MediaInfo *)getMediaInfo;
```

* **功能** 取得影音文件信息
* **返回值**
  * MediaInfo 对象，详见 [MediaInfo](objc.md#MediaInfo)说明
* **参数**无

### 影音播放音量 {#mediaVolume}

```objc
- (int)getMediaVolume;
```

* **功能**  读取影音播放的音量

> 读写属性，取值范围，音量等级（0-255）

```objc
- (void)setMediaVolume:(int)level;
```

* **功能**  设置影音播放的音量

> 设置属性，取值范围，音量等级（0-255）

### 获取影音图像数据 {#getMediaImg}

```objc
- (MediaDataFrame *)getMediaImg:(NSString *)userId;
```

* **功能** 取得影音帧信息
* **返回值** MediaDataFrame 对象，详见 [MediaDataFrame](objc.md#MediaDataFrame)
* **参数**
  * userId 用户 ID

### 发送IM文本消息 {#sendIMmsg}

```objc
- (NSString *)sendIMmsg:(NSString *)text toUserID:(NSString *)toUserID cookie:(NSString *)cookie;
```

* **功能** 发送IM消息
* **返回值** taskID 发送任务 ID
* **参数**
  * text 发送的文本消息
  * toUserID 目标用户，如果用户ID为空，消息发送给会议内所有用户
  * cookie 自定义用户数据
* **回调函数** [sendIMmsgRlst](#sendIMmsgRlst)

### 添加图片资源 {#setPicResource}

```objc
- (void)setPicResource:(NSString *)resID mediaDataFrame:(MediaDataFrame *)frame;
```

* **功能** 将图片资源设置给sdk
* **返回值** 无
* **参数**
  * resID 资源唯一标识
  * frame 资源内容，MediaDataFrame 对象，详见 [MediaDataFrame](objc.md#MediaDataFrame)

## 通知回调函数 {#callback}

### 进入/结束会议结果 {#enterMeetingRslt}

```objc
- (void)enterMeetingRslt:(CRVIDEOSDK_ERR_DEF)code;
```

* **功能** 自己进入会议的结果
* **参数**
  * code 操作结果码，0代表入会成功，非0代表入会失败，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

```objc
- (void)stopMeetingRslt:(CRVIDEOSDK_ERR_DEF)code;
```

* **功能** 通知结束视频会议结果
* **参数**
  * code 数值参考 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 有人进入/离开会议通知 {#userEnterMeeting}

```objc
- (void)userEnterMeeting:(NSString *)userID;
```

* **功能** 某用户进入了会议
* **参数**
  * userID 进入会议的用户 ID

```objc
- (void)userLeftMeeting:(NSString *)userID;
```

* **功能** 某用户离开了会议
* **参数**
  * userID 离开会议的用户 ID

### 会议掉线通知 {#meetingDropped}

```objc
- (void)meetingDropped;
```

* **功能** 通知从会议里掉线了，收到该通知后可以调用 [enterMeeting](#enterMeeting) 尝试重新入会
* **参数** 无

> 如果用到了呼叫队列，掉线后不重新入会就必须调用 hungupCall 释放本次呼叫

### 会议被结束通知 {#meetingStopped}

```objc
- (void)meetingStopped;
```

* **功能** 会议已被结束
* **参数** 无

### 网络状态变化通知 {#netStateChanged}

```objc
- (void)netStateChanged:(int)level;
```

* **功能** 网络变化通知
* **参数**
  * level 网络状况等级(0~10，10分为最佳网络)

### 麦克风设备变化 {#audioDevChanged}

```objc
- (void)audioDevChanged;
```

* **功能** 通知本地音频设备有变化
* **参数** 无

### 麦克风状态变化 {#audioStatusChanged}

```objc
- (void)audioStatusChanged:(NSString *)userID oldStatus:(AUDIO_STATUS)oldStatus newStatus:(AUDIO_STATUS)newStatus;
```

* **功能** 用户的音频状态变化通知
* **参数**
  * userID 会议中设备的所有者
  * oldStatus 旧状态，详见 [AUDIO_STATUS](constant.md#AUDIO_STATUS)
  * newStatus 新状态，详见 [AUDIO_STATUS](constant.md#AUDIO_STATUS)

### 麦克风声音变化 {#micEnergyUpdate}

```objc
- (void)micEnergyUpdate:(NSString *)userID oldLevel:(int)oldLevel newLevel:(int)newLevel;
```

* **功能** 通知用户的说话声音强度更新
* **参数**
  * userID 用户标识 ID
  * oldLevel 原来的说话声音强度（0~10）
  * newLevel 现在的说话声音强度（0~10）

### 打开摄像头结果 {#openVideoRslt}

```objc
- (void)openVideoRslt:(NSString *)devID success:(BOOL)bSuccess;
```

* **功能** 打开摄像头设备操作结果
* **参数**
  * devID 摄像头设备 ID
  * bSuccess 是否成功

### 视频状态变化 {#videoStatusChanged}

```objc
- (void)videoStatusChanged:(NSString *)userID oldStatus:(VIDEO_STATUS)oldStatus newStatus:(VIDEO_STATUS)newStatus;
```

* **功能** 用户的视频状态变化通知
* **参数**
  * userID 会议中设备的所有者
  * oldStatus 旧状态，数值参考 [VIDEO_STATUS](constant.md#VIDEO_STATUS)
  * newStatus 新状态，数值参考 [VIDEO_STATUS](constant.md#VIDEO_STATUS)

### 摄像头设备变化 {#videoDevChanged}

```objc
- (void)videoDevChanged:(NSString *)userID;
```

* **功能** 通知用户的视频设备有变化
* **参数**
  * userID 设备变化的用户 ID

### 通知视频图像数据 {#notifyVideoData}

```objc
- (void)notifyVideoData:(UsrVideoId *)userID frameTime:(long)frameTime;
```

* **功能** 通知用户有新的视频数据
* **参数**
  * userID 用户标识 ID
  * frameTime 图像的创建时间，可用作时间戳

> 收到此通知消息后，可通过 getVideoImg 获取图像显示；如果之前显示的帧时间和此值一致，说明此帧已显示过，直接忽略即可

### 默认视频设备变化 {#defVideoChanged}

```objc
- (void)defVideoChanged:(NSString *)userID videoID:(short)videoID;
```

* **功能** 通知用户的视频默认设备有变化
* **参数**
  * userID 设备变化的用户 ID
  * videoID 默认设备 ID

### 录制文件上传/取消上传错误 {#uploadRecordFileErr}

```objc
- (void)uploadRecordFile:(NSString *)fileName err:(CRVIDEOSDK_ERR_DEF)sdkErr;
```

* **功能** 上传录制文件错误通知
* **参数**
  * fileName 本地文件路径
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 录制文件上传成功通知 {#uploadRecordFileSuccess}

```objc
- (void)uploadRecordFileSuccess:(NSString *)fileName fileUrl:(NSString *)fileUrl;
```

* **功能** 录制文件上传成功回调
* **参数**
  * fileName 录制文件名称
  * fileUrl 录制文件下载地址

### 通知录制文件上传进度 {#notifyRecordFileUploadProgress}

```objc
- (void)notifyRecordFileUploadProgress:(NSString *)fileName percent:(int)percent;
```

* **功能** 通知录制文件上传进度
* **参数**
  * fileName 本地文件路径
  * percent 进度0-100

### 录制错误通知 {#recordErr}

```objc
- (void)recordErr:(REC_ERR_TYPE)sdkErr;
```

* **功能** 录制异常，录制将自动停止
* **参数**
  * sdkErr 错误信息，数值参考 [REC_ERR_TYPE](constant.md#REC_ERR_TYPE)

### 录制状态变化通知 {#recordStateChanged}

```objc
- (void)recordStateChanged:(REC_STATE)state;
```

* **功能** 录制状态更改通知
* **参数**
  * state 录制状态，数值请参考定义 [REC_STATE](constant.md#REC_STATE)

### 开始/停止屏幕共享通知 {#notifyScreenShareStarted}

```objc
- (void)notifyScreenShareStarted;
```

* **功能** 通知他人开启了屏幕共享
* **参数** 无

```objc
- (void)notifyScreenShareStopped;
```

* **功能** 通知他人停止了屏幕共享
* **参数** 无

### 通知屏幕共享图像数据 {#notifyScreenShareData}

```objc
- (void)notifyScreenShareData:(NSString *)userID changedRect:(CGRect)changedRect frameSize:(CGSize)size;
```

* **功能** 通知对端屏幕图像有变化
* **参数**
  * userID 对端用户 ID
  * changedRect 变化区域信息
  * size 屏幕大小

### 开始/停止标注通知 {#notifyScreenMarkStarted}

```objc
- (void)notifyScreenMarkStarted;
```

* **功能** 开始标注通知
* **返回值** 无
* **参数** 无

```objc
- (void)notifyScreenMarkStopped;
```

* **功能** 停止标注通知
* **返回值** 无
* **参数** 无

### 是否允许他人标注 {#enableOtherMark}

```objc
- (void)enableOtherMark:(BOOL)enable;
```

* **功能** 通知对端屏幕图像有变化
* **参数**
  * enable YES：允许，NO：不允许

### 发送标注信息 {#sendMarkDataCallBack}

```objc
- (void)sendMarkData:(MarkData *)markData;
```

* **功能** 通知对端屏幕图像有变化
* **参数**
  * markData 标注信息，详见 [MarkData](objc.md#MarkData)

### 发送所有标注信息 {#sendAllMarkData}

```objc
- (void)sendAllMarkData:(NSArray<MarkData *> *)markDatas;
```

* **功能** 发送所有标注信息
* **参数**
  * markDatas 标注信息列表，详见 [MarkData](objc.md#MarkData)

### 清除标注信息 {#clearAllMarksCallBack}

```objc
- (void)clearAllMarks;
```

* **功能** 清除标注信息
* **参数** 无

### 发送IM消息结果 {#sendIMmsgRlst}

```objc
- (void)sendIMmsgRlst:(NSString *)taskID sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 发送IM消息时，通知使用者发送结果
* **参数**
  * taskID 发送任务 ID
  * sdkErr 数值参考 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

### 通知收到IM消息 {#notifyIMmsg}

```objc
- (void)notifyIMmsg:(NSString *)romUserID text:(NSString *)text sendTime:(int)sendTime;
```

* **功能** 通知收到IM消息
* **参数**
  * romUserID 消息来源
  * text 消息内容
  * sendTime 消息发送时间戳，从1970开始算起

### 会话内视频分屏模式通知 {#notifyVideoWallMode}

```objc
- (void)notifyVideoWallMode:(int)wallMode;
```

* **功能** 通知视频分屏模式切换
* **参数**
  * wallMode 分屏模式，详见 [VIDEO_LAYOUT_MODE](constant.md#VIDEO_LAYOUT_MODE)

### 会话内主视频变化通知 {#notifyMainVideo}

```objc
- (void)notifyMainVideo:(NSString *)userID;
```

* **功能** 通知主视频更改
* **参数** 
  * userID 主视频用户 ID

### 通知影音打开/播放/暂停/停止 {#notifyMediaOpened}

```objc
- (void)notifyMediaOpened:(long)totalTime size:(CGSize)picSZ;
```

* **功能** 通知影音文件打开
* **参数**
  * totalTime 影音时长（毫秒）
  * picSZ 宽度，高度

```objc
- (void)notifyMediaStart:(NSString *)userid;
```

* **功能** 通知影音开始播放
* **参数**
  * userid 操作者的用户 ID

```objc
- (void)notifyMediaPause:(NSString *)userid bPause:(BOOL)bPause;
```

* **功能** 通知设置鼠标热点消息
* **参数**
  * userid 操作者的用户 ID
  * bPause 是否暂停，YES：暂停，NO：播放

```objc
- (void)notifyMediaStop:(NSString *)userid reason:(MEDIA_STOP_REASON)reason;
```

* **功能** 通知影音播放停止
* **参数**
  * userid 操作者的用户 ID
  * reason 播放停止原因，数值参考 [MEDIA_STOP_REASON](constant.md#MEDIA_STOP_REASON)

### 通知更新影音播放进度 {#notifyPlayPosSetted}

```objc
- (void)notifyPlayPosSetted:(int)setPTS;
```

* **功能** 通知播放进度已设置完成
* **参数**
  * setPTS 播放进度

### 通知影音播放图像数据 {#notifyMemberMediaData}

```objc
- (void)notifyMemberMediaData:(NSString *)userid curPos:(int)curPos;
```

* **功能** 通知影音帧数据已解码完毕
* **参数**
  * userid 操作者的用户 ID
  * curPos 该影音帧的时间，毫秒为单位

> 收到此通知消息后，可通过[getMediaImg](#getMediaImg)获取图像显示；但如果之前显示的帧时戳更大，说明此通知消息已过时，直接忽略即可