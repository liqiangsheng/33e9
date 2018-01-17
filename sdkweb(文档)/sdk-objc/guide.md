# SDK 集成指南 {#guide}

> 为开发者集成音视频会话及相关高级功能提供相关指导，以下均为 OC 代码，详细代码请参考 Examples 目录下 Demo 源代码。

    文档中“会议”和“会话”含义等同。

---------------------

## 开始音视频会话 {#startMeeting}

> 快速创建并进入一个简单的音视频会话；
>
> 请先准备[说明]中的相关内容:1.[运行环境要求](README.md#runEnv)， 2.[开发环境配置](README.md#developEnv)以及连接相关的麦克风摄像头并确认设备工作正常。

基本步骤如下:

1. [初始化 SDK](#init)
2. [登录连接视频服务器](#login)
3. [创建视频会话](#create)
4. [进入会话](#enter)
5. [打开麦克风/摄像头](#audio)
6. [有其他人进入会话](#userEnter)
7. [退出会话](#exit)
8. [注销登陆](#logout)

### 1.初始化 SDK {#init}

> 初始化是整个 SDK 的使用基础，通常在程序启动的时候进行初始化（[init](cloudroomsdk.md#init)），退出的时候进行反初始化（[uninit](cloudroomsdk.md#init)），整个程序的生命周期中只进行一次初始化和反初始化。
>
> 相关API参考请见 [初始化/反初始化](cloudroomsdk.md#init)

    SDK 内部的组件多为单例组件，整个程序中只能有一个实例，比如“基础组件”，“会议管理组件”，“视频会议组件”，具体请参见各个组件说明。

```objc
- (void)_setupForVideoCallSDK
{
    SdkInitDat *sdkInitData = [[SdkInitDat alloc] init];
    CloudroomVideoSDK *cloudroomVideoSDK = [CloudroomVideoSDK shareInstance];
    // 设置向云屋申请的开发商 ID
    [sdkInitData setOemID:@"CLOUDROOM"];
    // 设置 SDK 内部使用的文件位置
    [sdkInitData setSdkDatSavePath:[self _searchDiskCachePath:@"CloudroomVideoSDK"]];
    // 是否在控制台显示 SDK 日志
    [sdkInitData setShowSDKLogConsole:NO];
    CRVIDEOSDK_ERR_DEF error = [cloudroomVideoSDK initSDK:sdkInitData];
    
    if (error != CRVIDEOSDK_NOERR) {
        NSLog(@"VideoCallSDK init error!");
        [[CloudroomVideoSDK shareInstance] uninit];
    }
    
    // 获取 SDK 版本号
    NSLog(@"GetVideoCallSDKVer:%@", [CloudroomVideoSDK getCloudroomVideoSDKVer]);
}
```

### 2.登录连接视频服务器 {#login}

> 设置视频服务器地址，使用云屋授权账号和自定义用户编号登录
>
> 相关API请参考 [服务器地址](cloudroomsdk.md#serverAddr)，[登录/注销](meetingMgr.md#login)

```objc
- (void)_handleLogin
{
    NSString *nickname = _nicknameTextField.text;
    if ([NSString stringCheckEmptyOrNil:nickname]) {
        [HUDUtil hudShow:@"昵称不能为空" delay:3 animated:YES];
        return;
    }
    
    // 云屋 SDK 登陆账号，实际开发中，请联系云屋工作人员获取
    NSString *account = @"demo@cloudroom.com";
    // 密码通过 MD5 以后
    NSString *password = @"e10adc3949ba59abbe56e057f20f883e";
    if ([NSString stringCheckEmptyOrNil:account] ||
        [NSString stringCheckEmptyOrNil:password]) {
        [HUDUtil hudShow:@"登录账号或密码不能为空" delay:3 animated:YES];
        return;
    }
    
    NSString *serverIP = [_serverTextField text];
    
    if ([NSString stringCheckEmptyOrNil:serverIP]) {
        [HUDUtil hudShow:@"服务器地址不能为空" delay:3 animated:YES];
        return;
    }
    
    CloudroomVideoMgr *videoMgr = [CloudroomVideoMgr shareInstance];
    LoginDat *loginData = [[LoginDat alloc] init];
    [loginData setNickName:nickname];
    [loginData setAuthAcnt:account];
    [loginData setAuthPswd:password];
    [loginData setPrivAcnt:nickname];
    
    RecordHelper *recordHelper = [RecordHelper shareInstance];
    [recordHelper writeNickname:nickname server:serverIP];
    
    NSString *cookie = [NSString stringWithFormat:@"%f",CFAbsoluteTimeGetCurrent()];
    
    // 设置服务器地址
    [[CloudroomVideoSDK shareInstance] setServerAddr:serverIP];
    [HUDUtil hudShowProgress:@"正在登录..." animated:YES];
    
    // 开始上传日志
    [[CloudroomVideoSDK shareInstance] startLogReport:recordHelper.nickname server:@"logserver.cloudroom.com:12005"];
    
    [self _updateDelegate];
    
    [[CloudroomVideoSDK shareInstance] writeLog:1 message:@"登录操作"];
    
    // 发送"登录"命令
    [videoMgr login:loginData cookie:cookie];
}

/**
 登录成功回调
 @param usrID 用户ID
 @param cookie 用户自定义数据
 */
- (void)loginSuccess:(NSString *)usrID cookie:(NSString *)cookie
{
    // ...
}


/**
 登录失败回调
 @param sdkErr 错误码
 @param cookie 用户自定义数据
 */
- (void)loginFail:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie
{
    // ...
}
```

### 3.创建视频会话 {#create}

> 输入会议标题，创建一个没有密码的视频会话
>
> 相关API请参考 [创建/销毁视频会议](meetingMgr.md#createMeeting)

```objc
- (void)_createMeeting
{
    // 此单例记录登录时的昵称(nickname)
    RecordHelper *recordHelper = [RecordHelper shareInstance];
    NSString *subject = [NSString stringWithFormat:@"%@的会议", [recordHelper nickname]];
    NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
    [[CloudroomVideoMgr shareInstance] createMeeting:subject createPswd:NO cookie:cookie];
}

/**
 创建会议成功回调
 @param meetInfo 会议信息
 @param cookie 用户自定义数据
 */
- (void)createMeetingSuccess:(MeetInfo *)meetInfo cookie:(NSString *)cookie
{
    // ... 此 meetInfo，后面 enterMeeting 会使用到!!!
}


/**
 创建会议失败回调
 @param sdkErr 错误码
 @param cookie 用户自定义数据
 */
- (void)createMeetingFail:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie
{
    // ...
}
```

### 4.进入会话 {#enter}

> 用创建成功的会话信息（会议ID和密码）进入会话，其他用户也是利用此会话信息进入该会话。
>
> 相关API请参考 [进入/退出/结束会议](meeting.md#enterMeeting)

```objc
/* 入会 */
- (void)_enterMeeting
{
    [HUDUtil hudShowProgress:@"正在进入会话..." animated:YES];
    // 发送"入会"命令
    // 登录时的昵称
    NSString *nickname = [[RecordHelper shareInstance] nickname];
    // 传入 createMeetingSuccess 回调返回的 meetInfo 信息
    [[CloudroomVideoMeeting shareInstance] enterMeeting:_meetInfo.ID pswd:_meetInfo.pswd userID:nickname nikeName:nickname];
}

/**
 进入会议回调
 (入会失败，将自动发起releaseCall）
 @param code 结果码
 */
- (void)enterMeetingRslt:(CRVIDEOSDK_ERR_DEF)code
{
    // ... 
}
```

### 5.打开麦克/摄像头 {#audio}

> 进入会话成功后，配置并打开自己的麦克风和摄像头
>
> 相关API请参考 [麦克风/扬声器列表](meeting.md#getAudioMicNames)，[麦克风设置](meeting.md#getAudioCfg)，[摄像头设备列表](meeting.md#getAllVideoInfo)，[视频设置](meeting.md#setVideoCfg)，[会议内可观看摄像头列表](meeting.md#getWatchableVideos)，[开/关摄像头](meeting.md#openVideo)，[视频状态](meeting.md#getVideoStatus)，[获取/设置默认视频](meeting.md#setDefaultVideo)，[成员视频UI显示组件](videoui.md)  
> 相关结构定义请参考 [用户视频信息](json.md#VideoInfoObj)，[用户视频信息列表](json.md#VideoInfoObjs)

```objc
/* 入会成功 */
- (void)_enterMeetingSuccess
{
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    NSString *myUserID = [cloudroomVideoMeeting getMyUserID];
    // 自己的麦克风/扬声器
    [cloudroomVideoMeeting openMic:myUserID];
    [cloudroomVideoMeeting setMicVolume:100];
    [cloudroomVideoMeeting setSpeakerVolume:100];
    
    // 自己的摄像头
    [cloudroomVideoMeeting openVideo:myUserID];
    [self _setDefaultCamera];
    [self _subscribleCamera];
    
    // 设置默认分辨率
    [self _setDefaultRatio];
    
    // 设置默认优先级
    [self _setDefaultPriority];
    
    // 设置默认宽高比
    [self _setDefaultWHRate];
}

/* 初始化摄像头 */
- (void)_setDefaultCamera
{
    CloudroomVideoMeeting *videoMeeting = [CloudroomVideoMeeting shareInstance];
    NSString *myUserID = [cloudroomVideoMeeting getMyUserID];
    NSMutableArray <UsrVideoInfo *> *videoes = [videoMeeting getAllVideoInfo:myUserID];
    NSArray<UsrVideoInfo *> *cameraArray = [videoes copy];
    
    for (UsrVideoInfo *video in videoes) {
        // 默认前置摄像头
        if (video.videoID == 2) {
            [videoMeeting setDefaultVideo:myUserID videoID:video.videoID];
        }
    }
    
    if ([cameraArray count] <= 0) {
        NSLog(@"获取摄像头设备为空!");
    }
}

/* 订阅摄像头 */
- (void)_subscribleCamera
{
    CloudroomVideoMeeting *videoMeeting = [CloudroomVideoMeeting shareInstance];
    NSMutableArray <UsrVideoId *> *videos = [videoMeeting getWatchableVideos];
    [videoMeeting watchVideos:videos];
}

/* 设置默认分辨率(848*480) */
- (void)_setDefaultRatio
{
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    VideoCfg *vCfg = [cloudroomVideoMeeting getVideoCfg];
    // 设置分辨率
    [vCfg setSizeType:VSIZE_SZ_480];
    // 设置码率(使用默认码率)
    [vCfg setMaxbps:-1];
    [cloudroomVideoMeeting setVideoCfg:vCfg];
}

/* 设置默认优先级(画质优先) */
- (void)_setDefaultPriority
{
    /* 画质优先 */
    CloudroomVideoMeeting *videoMeeting = [CloudroomVideoMeeting shareInstance];
    VideoCfg *vCfg = [videoMeeting getVideoCfg];
    [vCfg setMinQuality:22];
    [vCfg setMaxQuality:25];
    [videoMeeting setVideoCfg:vCfg];
}

/* 设置默认宽高比(16:9) */
- (void)_setDefaultWHRate
{
    CloudroomVideoMeeting *videoMeeting = [CloudroomVideoMeeting shareInstance];
    VideoCfg *vCfg = [videoMeeting getVideoCfg];
    vCfg.whRate = WHRATE_16_9;
    [videoMeeting setVideoCfg:vCfg];
}
```

### 6.有其他人进入会话 {#userEnter}

> 其他人入会的步骤也是上述的[4、5]步，拿到会议信息后进入到他人创建的会议，此步骤的目的是为了实时关注比自己晚进来的人并刷新摄像头画面显示;如果想要获取之前进来的人，可以调用 [getAllMembers](meeting.md#getAllMembers) 获取会议成员列表，也可以调用 [getWatchableVideos](meeting.md#getWatchableVideos) 获取所有可以观看的摄像头列表进行加载。
> 相关API请参考 [有人进入/离开会议通知](meeting.md#userEnterMeeting)，[会议内可观看摄像头列表](meeting.md#getWatchableVideos)  
> 相关结构定义请参考 [用户视频信息列表](json.md#VideoInfoObjs)

```objc
/**
 成员进入会议
 @param userID 用户ID
 */
- (void)userEnterMeeting:(NSString *)userID
{
    NSString *text = [NSString stringWithFormat:@"%@进入会议!", userID];
    [HUDUtil hudShow:text delay:3 animated:YES];
    
    [self _subscribeCamera];
    [self _updateVideoInfo];
}


/**
 成员离开会议
 @param userID 用户ID
 */
- (void)userLeftMeeting:(NSString *)userID
{
    NSString *text = [NSString stringWithFormat:@"%@离开会议!", userID];
    [HUDUtil hudShow:text delay:3 animated:YES];
    
    [self _subscribeCamera];
    [self _updateVideoInfo];
}

/**
 订阅摄像头
 */
- (void)_subscribeCamera
{
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    NSMutableArray <UsrVideoId *> *watchableVideos = [cloudroomVideoMeeting getWatchableVideos];
    
    if ([watchableVideos count] > 0) {
        [cloudroomVideoMeeting watchVideos:watchableVideos];
    }
}

- (void)_updateVideoInfo
{
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    NSMutableArray <UsrVideoId *> *watchableVideos = [cloudroomVideoMeeting getWatchableVideos];
    NSMutableArray <UsrVideoId *> *diff = [NSMutableArray array];
    NSMutableArray <UsrVideoId *> *remove = [NSMutableArray array];
    
    // 找到不同元素
    if ([_members count] <= 0) {
        [diff addObjectsFromArray:watchableVideos];
    }
    else {
        for (UsrVideoId *obj1 in watchableVideos) {
            BOOL find = NO;
            for (UsrVideoId *obj2 in _members) {
                if ([obj1.userId isEqualToString:obj2.userId] && obj1.videoID == obj2.videoID) {
                    find = YES;
                    break;
                }
            }
            
            if (find == NO) {
                [diff addObject:obj1];
            }
        }
        
        // 找到删除元素
        for (UsrVideoId *obj1 in _members) {
            BOOL find = NO;
            for (UsrVideoId *obj2 in watchableVideos) {
                if ([obj1.userId isEqualToString:obj2.userId] && obj1.videoID == obj2.videoID) {
                    find = YES;
                    break;
                }
            }
            
            if (find == NO) {
                [remove addObject:obj1];
            }
        }
        
        for (UsrVideoId *usrVideoId in remove) {
            [_members removeObject:usrVideoId];
        }
    }
    
    [_members addObjectsFromArray:diff];
    
    // 更新 UI元素
    [self _updateVideoViews];
}
```

> **至此，一个简单的音视频会话就建立起来了。**

### 7.退出会话 {#exit}

> 在未注销的情况下可反复的进入退出同一个会议。
>
> 相关API请参考 [进入/退出/结束会议](meeting.md#enterMeeting)

```objc
// 离开会议
[[CloudroomVideoMeeting shareInstance] exitMeeting];
```

### 8.注销登陆 {#logout}

> 可重复的登录和注销。
>
> 相关API请参考 [进入/退出/结束会议](meeting.md#enterMeeting)，[登录/注销](meetingMgr.md#login)，[初始化/反初始化](cloudroomsdk.md#init)

```objc
[[CloudroomVideoMgr shareInstance] logout];
```

### 9.反初始化，退出SDK {#uninit}

> 执行反初始化后SDK功能不再可用。
>
> 相关API请参考 [初始化/反初始化](cloudroomsdk.md#init)

```objc
[[CloudroomVideoSDK shareInstance] uninit];
```

## 添加音视频会话功能 {#add}

> 添加会议内的高级功能

### 音视频控制 {#AVSet}

> 进入会话后实现设备的加载、选择、设置
>
> 1. [开关麦克风](#openMic)
> 2. [监控麦克风状态变化](#audioStatusChanged)
> 3. [设置麦克风和扬声器音量](#Volume)
> 4. [监控麦克风声音大小变化](#micEnergyUpdate)

#### 1.开关麦克风 {#openMic}

    通过传入参数来控制开关的对象，如果是本地机器上的麦克风，需要传入自己的ID，如果要远程开关他人麦克风，则传入对方的ID

* 相关API请参考 [麦克风、扬声器设备的获取](#audio)，[开/关麦克风](meeting.md#openMic)

```objc
NSString *myUserID = [cloudroomVideoMeeting getMyUserID];
loudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 打开自己的麦克风
[cloudroomVideoMeeting openMic:myUserID];
// 关闭自己的麦克风
[cloudroomVideoMeeting closeMic:myUserID];
```

#### 2.监控麦克风状态变化 {#audioStatusChanged}

    1. 开关自己或他人的的麦克风都会收到该回调函数
    2. 自己的麦克风被他人开关也会收到该回调函数
    3. 也可主动获取麦克风状态，一般用于各种判断

* 相关API请参考 [麦克风状态变化](meeting.md#audioStatusChanged)  
* 相关结构定义请参考 [麦克风状态](constant.md#ASTATUS)

```objc
/**
 音频设备状态变化
 @param userID 用户ID
 @param oldStatus 旧状态
 @param newStatus 新状态
 */
- (void)audioStatusChanged:(NSString *)userID oldStatus:(AUDIO_STATUS)oldStatus newStatus:(AUDIO_STATUS)newStatus
{
    // ... 
}
```

#### 3.设置麦克风和扬声器音量 {#Volume}

* 相关API请参考 [麦克风音量](meeting.md#micVolume)，扬声器音量](meeting.md#speakerVolume)

````objc
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 设置麦克风/扬声器音量
[cloudroomVideoMeeting setMicVolume:100];
[cloudroomVideoMeeting setSpeakerVolume:100];
````

#### 4.监控麦克风声音变化 {#micEnergyUpdate}

    可用来实时展示当前麦克风采集到声音的大小

* 相关API请参考 [麦克风声音变化](meeting.md#micEnergyUpdate)

```cs
/**
 麦声音强度更新回调
 (level取值0~10)
 @param userID 用户ID
 @param oldLevel 旧等级
 @param newLevel 新等级
 */
- (void)micEnergyUpdate:(NSString *)userID oldLevel:(int)oldLevel newLevel:(int)newLevel
{
    // ...
}
```

### 录制 {#record}

> 实现摄像头和屏幕录制，并可上传到服务器
>
> 1. [录制内容配置](#setRecordVideos)
> 2. [开始/停止录制](#startRecording)
> 3. [录制文件的大小/时长/状态](#getRecFileSize)
> 4. [设置录制文件是否加密](#setRecordFileEncrypt)
> 5. [录制文件列表](#getAllRecordFiles)
> 6. [录制文件列表添加/删除文件](#addFileToRecordMgr)
> 7. [上传/取消上传录制文件](#uploadRecordFile)
> 8. [回放录制文件](#playbackRecordFile)

#### 1.录制内容配置 {#setRecordVideos}

* 相关API请参考 [录制内容配置](meeting.md#setRecordVideos)  
* 相关结构定义请参考 [录制内容配置](json.md#RecContentItem)

```objc
/* 录制内容布局 */
- (void)_updateRecLayout
{
    CloudroomVideoMeeting *videoMeeting = [CloudroomVideoMeeting shareInstance];
    NSString *myUserID = [cloudroomVideoMeeting getMyUserID];
    NSMutableArray<RecContentItem *> *recordVideos = [NSMutableArray array];
    CGFloat contentW = [videoMeeting getRecCfg].dstResolution.width;
    CGFloat contentH = [videoMeeting getRecCfg].dstResolution.height;
    
    if (_isRead) { // 图片
        CGRect imgRect = (CGRect){0, 0, contentW, contentH};
        RecPictureContentItem *picture = [[RecPictureContentItem alloc] initWithRect:imgRect resID:@"statement"];
        [recordVideos addObject:picture];
    }
    else { // 影音
        CGRect mediaRect = (CGRect){0, 0, contentW, contentH};
        RecMediaContentItem *media = [[RecMediaContentItem alloc] initWithRect:mediaRect];
        [recordVideos addObject:media];
    }
    
    // 摄像头
    short camID = [videoMeeting getDefaultVideo:myUserID];
    CGFloat cameraH = 0;
    CGFloat cameraW = 0;
    UIInterfaceOrientation orientation = [[UIApplication sharedApplication] statusBarOrientation];
    switch (orientation) {
        case UIInterfaceOrientationPortrait:
        case UIInterfaceOrientationPortraitUpsideDown: { // 竖屏
            cameraW = 90;
            cameraH = 160;
            break;
        }
        case UIInterfaceOrientationLandscapeLeft:
        case UIInterfaceOrientationLandscapeRight: { // 横屏
            cameraW = 160;
            cameraH = 90;
            break;
        }
        default: break;
    }
    CGRect cameraRect = (CGRect){contentW - cameraW, contentH - cameraH, cameraW, cameraH};
    RecVideoContentItem *video = [[RecVideoContentItem alloc] initWithRect:cameraRect userID:myUserID camID:camID];
    [recordVideos addObject:video];
    
    // 签名
    if (_isSign) {
        int signW = 100;
        int signH = 60;
        CGRect signRect = (CGRect){contentW - cameraW - signW, contentH - signH, signW, signH};
        RecPictureContentItem *sign = [[RecPictureContentItem alloc] initWithRect:signRect resID:@"signature"];
        [recordVideos addObject:sign];
    }
    
    [videoMeeting setRecordVideos:[recordVideos copy]];
}
```

#### 2.开始/停止录制 {#startRecording}

    1. 先开始录制，配置好录制文件信息
    2. 然后更新录制内容配置
    3. 在录制过程中可以多次更新录制配置，从而变更录制内容

* 相关API请参考 [开始/停止录制](meeting.md#startRecording)  
* 相关结构定义请参考 [录制内容类型](constant.md#REC_CONTENT_TYPE)，[录制文件配置](json.md#RecCfg)

```objc
/* 录制操作 */
- (void)_startToRecord
{
    if ([self _startRecording]) { // 录制成功
        // 更新录制布局操作
        [self _updateRecLayout];
    }
    else { // 录制失败
        [HUDUtil hudShow:@"录制失败" delay:3 animated:YES];
        
        // ...
    }
}

/* 开始录制 */
- (BOOL)_startRecording
{
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    RecCfg *cfg = [[RecCfg alloc] init];
    // TODO:设置录制文件全路径
    [cfg setFilePathName:[self _searchDiskCachePath:[NSString stringWithFormat:@"CloudroomVideoSDK/record_%.0f.mp4", [[NSDate date] timeIntervalSince1970]]]];
    [cfg setFps:20];
    [cfg setDstResolution:(CGSize){640, 360}];
    [cfg setMaxBPS:350000];
    [cfg setDefaultQP:28];
    // TODO:不要使用REC_AV_DEFAULT!!!
    [cfg setRecDataType:REC_AUDIO_LOC | REC_AUDIO_OTHER | REC_VIDEO];
    [cfg setIsUploadOnRecording:NO];
    
    return [cloudroomVideoMeeting startRecording:cfg];
}
```

```objc
/* 停止录制 */
- (void)_stopRecording
{
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    [cloudroomVideoMeeting stopRecording];
}
```

#### 3.录制文件的大小/时长/状态 {#recordFileSize}

* 相关API请参考 [录制文件大小](meeting.md#recordFileSize)，[时长](meeting.md#recordDuration)，[录制状态变化通知](meeting.md#recordStateChanged)  
* 相关结构定义请参考 [错误码定义](constant.md#CRVIDEOSDK_ERR_DEF)， [录制状态](constant.md#REC_STATE)，[通知录制文件状态变化](meeting.md#notifyRecordFileStateChanged)

```objc
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 录制时长
int recordLen = [cloudroomVideoMeeting recordFileSize];
// 录制大小(MB)
int fileSize = [cloudroomVideoMeeting recordDuration] / (1024 * 1024);
```

```objc
// 录制过程出错(导致录制停止)回调
- (void)recordErr:(REC_ERR_TYPE)sdkErr
{
    // ...
}
```

```objc
// 录制文件状态改变回调
- (void)notifyRecordFileStateChanged:(NSString *)fileName state:(REC_FILE_STATE)state
{
    // ...
}
```

#### 4.设置录制文件是否加密 {#setRecordFileEncrypt}

    启动录制时调用，则本次录制是否加密本地录制文件，也可全局配置，这样每一次录制都是加密的。

* 相关API请参考 [设置录制文件是否加密](meeting.md#setRecordFileEncrypt)

```objc
[[CloudroomVideoMeeting shareInstance] setRecordFileEncrypt:1];
```

#### 5.录制文件列表 {#getAllRecordFiles}

* 相关API请参考 [录制文件列表](meeting.md#getAllRecordFiles)  
* 相关结构定义请参考 [录制文件信息](objc.md#RecFileShow)

```objc
NSArray <RecFileShow *> *recFiles = [[CloudroomVideoMeeting shareInstance] getAllRecordFiles];
```

#### 6.录制文件列表添加/删除文件 {#addFileToRecordMgr}

    1. 添加录制文件到录制文件列表，这样此文件便可上传和回放
    2. 移除文件时本地文件会被删掉，正在上传的文件会被取消上传，已经上传的文件不受影响

* 相关API请参考 [录制列表添加/删除文件](meeting.md#addFileToRecordMgr)

```objc
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 添加文件到录制文件列表
[cloudroomVideoMeeting addFileToRecordMgr:@"test.mp4" filePath:@"路径/"];
// 从录制文件列表中移除文件，并删除本地文件
[cloudroomVideoMeeting removeFromFileMgr:@"路径/test.mp4"];
```

#### 7.上传/取消上传录制文件 {#uploadRecordFile}

    参数是文件名(不包含绝对路径)

* 相关API请参考 [上传/取消上传录制文件](meeting.md#uploadRecordFile)，[通知录制文件上传进度](meeting.md#notifyRecordFileUploadProgress)，[通知录制文件状态变化](meeting.md#notifyRecordFileStateChanged)  
* 相关结构定义请参考 [录制文件信息](objc.md#RecFileShow)，[录制文件上传状态](constant.md#REC_FILE_STATE)

```objc
/* 上传操作 */
- (void)_startToUpload
{
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    RecCfg *recCfg = [cloudroomVideoMeeting getRecCfg];
    NSString *videoPath = [recCfg.filePathName lastPathComponent];
    NSString *fileName = nil;
    
    if (!videoPath || videoPath.length <= 0) {
        NSLog(@"videoPath is nil or empty");
        return;
    }
    
    for (RecFileShow *file in [cloudroomVideoMeeting getAllRecordFiles]) {
        if ([file.fileName isEqualToString:videoPath]) {
            fileName = file.fileName;
            break;
        }
    }
    
    if (!fileName || fileName.length <= 0) {
        NSLog(@"fileName is nil or empty");
        return;
    }
    
    [cloudroomVideoMeeting uploadRecordFile:fileName];
}
```

```objc
/**
 录制文件上传进度回调
 @param fileName 录制文件路径
 @param percent 上传进度
 */
- (void)notifyRecordFileUploadProgress:(NSString *)fileName percent:(int)percent
{
    // ...
}
```

```objc
/**
 录制文件上传状态通知
 @param fileName 录制文件路径
 @param state 录制文件状态
 */
- (void)notifyRecordFileStateChanged:(NSString *)fileName state:(REC_FILE_STATE)state
{
    // ...
}
```

```objc
/* 取消上传操作 */
- (void)_cancelToUpload
{
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    RecCfg *recCfg = [cloudroomVideoMeeting getRecCfg];
    NSString *videoPath = [recCfg.filePathName lastPathComponent];
    NSString *fileName = nil;
    
    if (!videoPath || videoPath.length <= 0) {
        NSLog(@"videoPath is nil or empty");
        return;
    }
    
    for (RecFileShow *file in [cloudroomVideoMeeting getAllRecordFiles]) {
        if ([file.fileName isEqualToString:videoPath]) {
            fileName = file.fileName;
            break;
        }
    }
    
    if (!fileName || fileName.length <= 0) {
        NSLog(@"fileName is nil or empty");
        return;
    }
    
    [cloudroomVideoMeeting cancelUploadRecordFile:fileName];
}
```

#### 8.回放录制文件 {#playbackRecordFile}

    此接口需要配合影音共享UI显示组件或者影音播放相关的接口进行画面和声音展示

> 相关API请参考 [回放录制文件](meeting.md#playbackRecordFile)

```objc
/* 开始回放 */
- (void)_startToPlayback
{
    NSLog(@"");
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    RecCfg *recCfg = [cloudroomVideoMeeting getRecCfg];
    NSString *videoPath = [recCfg.filePathName lastPathComponent];
    NSParameterAssert(videoPath && videoPath.length > 0);
    // TODO:回放只需要文件名+后缀
    [cloudroomVideoMeeting playbackRecordFile:videoPath];
}
```

### 影音播放共享 {#media}

> 1. [播放配置](#cfg)
> 2. [播放、暂停、停止](#play)
> 3. [设置播放进度](#pos)
> 4. [文件列表、播放信息、播放音量](#list)

#### 1.播放配置 {#cfg}

    此配置主要是为了定义共享播放时会议内其他人看到的效果

* 相关API请参考 [影音播放配置](meeting.md#setMediaCfg )  
* 相关结构定义请参考 [视频尺寸定义](constant.md#VIDEO_SIZE_TYPE)

```objc
/* 播放影音视频 */
- (void)_playLocalMedia
{
    CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
    // TODO:获取播放文件全路径
    NSString *videoPath = [self _searchDiskCachePath:@"CloudroomVideoSDK/video.mp4"];
    NSParameterAssert(videoPath && videoPath.length > 0);
    VideoCfg *cfg = [cloudroomVideoMeeting getMediaCfg];
    [cfg setSizeType:VSIZE_SZ_360];
    [cloudroomVideoMeeting setMediaCfg:cfg];
    [cloudroomVideoMeeting startPlayMedia:videoPath bLocPlay:YES bPauseWhenFinished:NO];
}
```

#### 2.播放、暂停、停止 {#paly}

    每次只能播放一个视频，当前播放需要先停止然后才能进行下一个视频播放;
    开始播放参数可控制此播放是只有自己可见还是会议内所有人可见。

* 相关API请参考 [开始/暂停/停止影音播放](meeting.md#startPlayMedia)，[通知影音打开/播放/暂停/停止](meeting.md#notifyMediaOpened)，[通知更新影音播放进度](meeting.md#notifyPlayPosSetted)

```objc
// 开始播放
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
NSString *videoPath = [self _searchDiskCachePath:@"CloudroomVideoSDK/video.mp4"];
[cloudroomVideoMeeting startPlayMedia:videoPath bLocPlay:YES bPauseWhenFinished:NO];
```

```objc
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 暂停播放
[cloudroomVideoMeeting pausePlayMedia:YES];
// 继续播放
[cloudroomVideoMeeting pausePlayMedia:NO];
```

```cs
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 停止当前播放
[cloudroomVideoMeeting stopPlayMedia];
```

#### 3.设置播放进度 {#pos}

    可以通过播放组件上的工具条拖动来调整播放进度，也可以用代码来设置播放的进度

* 相关API请参考 [设置播放进度](meeting.md#setPlayPos)

```objc
int pos = 123456;
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
[cloudroomVideoMeeting setPlayPos:pos];
```

#### 4.文件列表、播放信息、播放音量 {#list}

* 相关API请参考 [影音文件列表](meeting.md#getAllFilesInMediaPath)，[影音播放信息](meeting.md#getMediaInfo)，[影音播放音量](meeting.md#mediaVolume)  
* 相关结构定义请参考 [影音文件](json.md#MediaInfoObj)

```objc
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 获取应用媒体目录下的所有影音文件
NSArray <NSString *> *files = [cloudroomVideoMeeting getAllFilesInMediaPath];
```

```objc
@interface MediaInfo : NSObject

@property (nonatomic, copy) NSString *userID;
@property (nonatomic, assign) MEDIA_STATE state;
@property (nonatomic, copy) NSString *mediaName;

@end

CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 获取当前播放的影音文件信息
MediaInfo *mediaInfo = [cloudroomVideoMeeting getMediaInfo];
```

```objc
int vol = 24;
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 设置当前播放的影音声音
[cloudroomVideoMeeting setMediaVolume:vol];
```

### 屏幕共享 {#screenShare}

> 1. [开始、停止共享](#starshare)

#### 1.开始、停止屏幕共享通知 {#screenShareNotify}

* 相关API请参考 [屏幕共享状态](meeting.md#isScreenShareStarted)，[开始/停止屏幕共享通知](meeting.md#notifyScreenShareStarted)  

```objc
// 对方启动屏幕共享
- (void)notifyScreenShareStarted
{
    // ...
}
```

```objc
// 对方关闭屏幕共享
- (void)notifyScreenShareStopped
{
    // ...
}
```

```objc
@interface ScreenShareImg : NSObject
{
    @public void *rgbDat;
}

@property (nonatomic, assign) int datLength;
@property (nonatomic, assign) int rgbWidth;
@property (nonatomic, assign) int rgbHeight;

@end

// 屏幕共享数据更新回调
- (void)notifyScreenShareData:(NSString *)userID changedRect:(CGRect)changedRect frameSize:(CGSize)size
{
    // 获取屏幕共享图像
    ScreenShareImg *shareData = [[CloudroomVideoMeeting shareInstance] getShareScreenDecodeImg];
    // 处理RGBA图像数据， 详见 demo:Record(远程双录)
}
```

### 聊天 {#IM}

> 实现会话内文本聊天，如果需要更加丰富的聊天内容，可自己传输文本格式，并进行相关解析

* 相关API请参考 [发送IM文本消息](meeting.md#sendIMmsg)，[通知收到IM消息](meeting.md#notifyIMmsg)

```objc
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
// 发送 IM 信息
[cloudroomVideoMeeting sendIMmsg:@"你好!" toUserID:@"user_00005" cookie:cookie];
```

```objc
// 发送结果
- (void)sendIMmsgRlst:(NSString *)taskID sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie
{
    if (sdkErr != CRVIDEOSDK_NOERR) {
        // 消息发送失败， 错误码:sdkErr 
    }
}
```

```objc
// 收到 IM 消息
- (void)notifyIMmsg:(NSString *)romUserID text:(NSString *)text sendTime:(int)sendTime
{
    if (romUserID != @"我的登录昵称") { // 收到别人的信息
        // ...
    }
    else { // 自己的信息
        // ...
    }
}
```

### 参会成员管理 {#members}

> 获取会话内人员及相关信息，得到成员的userID后可以对其进行相关的远程音视频操作

* 相关API请参考 [会议成员列表](meeting.md#getAllMembers)，[会议成员信息](meeting.md#getMemberInfo)  
* 相关结构定义请参考 [会议成员](objc.md#MemberInfo)

```objc
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 获取所有参会人
NSMutableArray <MemberInfo *> *members = [cloudroomVideoMeeting getAllMembers];
```

```objc
CloudroomVideoMeeting *cloudroomVideoMeeting = [CloudroomVideoMeeting shareInstance];
// 获取某个参会人的信息
MemberInfo *memberInfo = [cloudroomVideoMeeting getMemberInfo:@"user_00005"];
```

### 队列管理 {#queue}

> 利用队列功能，实现用户分配。使用队列时通常会有两种角色，坐席和客户，队列模块把排队的客户分配给某个服务队列的坐席。

> 1. [初始化队列，获取队列数据](#initQueue)
> 2. [坐席队列操作](#servicesOpr)
> 3. [坐席请求用户](#reqAssignUser)
> 4. [系统自动给坐席分配用户](#autoAssignUser)
> 5. [客户排队操作](#clientQueue)

#### 1.初始化队列，获取队列数据 {#initQueue}

    在登录成功后初始化队列数据

* 相关API请参考 [初始化队列](queue.md#initQueueDat)，[初始化队列结果](queue.md#initQueueDatRslt)，[查询队列](queue.md#getQueueInfo)  
* 相关结构定义请参考 [会话信息](objc.md#VideoSessionInfo)，[队列信息](objc.md#QueueInfo)

```objc
NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
CloudroomQueue *cloudroomQueue = [CloudroomQueue shareInstance];
// 可在登录成功后初始化队列数据
[cloudroomQueue initQueueDat:cookie];
```

```objc
//队列初始化响应
- (void)queueCallBack:(QueueCallBack *)callback initQueueDatRslt:(CRVIDEOSDK_ERR_DEF)errCode cookie:(NSString *)cookie
{
    if (errCode != CRVIDEOSDK_NOERR) {
        // "队列初始化出错，请重新登录"
        return;
    }

    CloudroomQueue *videoCallQueue = [CloudroomQueue shareInstance];
    // 队列初始化成功后获取上一次意外结束的视频会话信息，如果存在，则可以选择恢复会话
    VideoSessionInfo *sessionInfo = [videoCallQueue getSessionInfo];

    if (![NSString stringCheckEmptyOrNil:sessionInfo.callID] && sessionInfo.duration > 0) {
            UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"温馨提示:" message:@"是否恢复意外关闭的视频会话?" preferredStyle:UIAlertControllerStyleAlert];
            UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
                NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
                [[CloudroomVideoMgr shareInstance] hungupCall:sessionInfo.callID usrExtDat:nil cookie:cookie];
            }];
            UIAlertAction *doneAction = [UIAlertAction actionWithTitle:@"恢复" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
                _meetInfo = [[MeetInfo alloc] init];
                [_meetInfo setID:sessionInfo.meetingID];
                [_meetInfo setPswd:sessionInfo.meetingPswd];
                _peerID = sessionInfo.peerID;
                _callID = sessionInfo.callID;
                [self _jumpToConversation];
            }];
            [alertController addAction:cancelAction];
            [alertController addAction:doneAction];
            [self presentViewController:alertController animated:NO completion:nil];
        }

    // 取到所有的队列信息
    NSMutableArray<QueueInfo *> *queueInfoArr = [videoCallQueue getQueueInfo];
    NSMutableArray<NSNumber *> *serviceQueueArr = [videoCallQueue getServiceQueues];
        NSMutableArray<ServiceModel *> *result = [NSMutableArray array];
        
        for (QueueInfo *queueInfo in queueInfoArr) {
            ServiceModel *serviceModel = [[ServiceModel alloc] init];
            QueueStatus *queueStatus = [videoCallQueue getQueueStatus:queueInfo.queID];
            serviceModel.queueInfo = queueInfo;
            serviceModel.queueStatus = queueStatus;
            serviceModel.serviced = [serviceQueueArr containsObject:@(queueInfo.queID)];
            [result addObject:serviceModel];
        }
        
        _dataSource = [result copy];
        // 拿数据源刷新 UI 界面
}
```

#### 2.坐席队列操作 {#servicesOpr}

    坐席角色开始和停止服务队列，以及操作后队列状态的变化

* 相关API请参考 [开始/停止服务队列](queue.md#startService)，[开始/停止队列服务结果](queue.md#startServiceRslt)  
* 相关结构定义请参考 [队列状态](objc.md#QueueStatus)

```objc
// 开始服务队列
[[CloudroomQueue shareInstance] startService:serviceModel.queueInfo.queID cookie:cookie];
```

```objc
// 停止服务队列
[[CloudroomQueue shareInstance] stopService:queID cookie:cookie];
```

```objc
// 获取服务的所有队列
NSMutableArray <NSNumber *> *serviceQueues = [[CloudroomQueue shareInstance] getServiceQueues];
```

```objc
// 开始队列服务结果
- (void)startServiceRslt:(int)queID errCode:(CRVIDEOSDK_ERR_DEF)errCode cookie:(NSString *)cookie
{
    // ...
}
```

```objc
// 通知队列服务结果
- (void)stopServiceRslt:(int)queID errCode:(CRVIDEOSDK_ERR_DEF)errCode cookie:(NSString *)cookie
{
    // ...
}
```

```objc
// 队列状态变化通知
- (void)queueStatusChanged:(QueueStatus *)queStatus
{
    // ...
}
```

#### 3.坐席请求用户 {#reqAssignUser}

    在设置DND免打扰状下态，系统不再自动分配，需要手动申请用户

* 相关API请参考 [免打扰](meetingMgr.md#setDNDStatus)，[设置免打扰结果](meetingMgr.md#setDNDStatusSuccess)，[请求分配用户](queue.md#reqAssignUser)，[请求分配用户结果](queue.md#reqAssignUserRslt)

```objc
// 设置免打扰状态，关掉系统自动推送
NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
CloudroomVideoMgr *videoMgr = [CloudroomVideoMgr shareInstance];
// (0:代表关闭免打扰，其它值代表开启免打扰，含义可自由定义)
[videoMgr setDNDStatus:1 cookie:cookie];
```

```objc
//手动请求一个用户
NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
// 请求分配一个客户(在免打扰状态下，系统不会自动分配，可以主动请求分配一个任务)
[[CloudroomQueue shareInstance] reqAssignUser:cookie];
```

```objc
//请求用户的结果
- (void)reqAssignUserRslt:(CRVIDEOSDK_ERR_DEF)errCode userInfo:(UserInfo *)usr cookie:(NSString *)cookie
{
    if (errCode == CRVIDEOSDK_NOERR) {
        // 请求用户成功
    }
    else if(errCode == CRVIDEOSDK_QUE_NOUSER) {
        // 队列中没有排队人员
    }
    else {
        // 手动请求用户失败
    }
}
```

```objc
// 取消免打扰，开启系统自动推送
NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
CloudroomVideoMgr *videoMgr = [CloudroomVideoMgr shareInstance];
// (0:代表关闭免打扰，其它值代表开启免打扰，含义可自由定义)
[videoMgr setDNDStatus:0 cookie:cookie];
```

#### 4.系统自动给坐席分配用户 {#autoAssignUser}

    系统自动分配的用户在坐席还未选择接受或拒绝时，系统可以撤回分配

* 相关API请参考 [自动分配用户通知](queue.md#autoAssignUser)，[接受/拒绝分配的用户](queue.md#acceptAssignUser)，[自动分配用户被取消](queue.md#cancelAssignUser)

```objc
// 系统自动分配用户通知
- (void)autoAssignUser:(UserInfo *)usr
{
    [self _serviceUser:usr isAuto:YES];
}

- (void)_serviceUser:(UserInfo *)userInfo isAuto:(BOOL)isAuto
{
    NSString *userIDString = [NSString stringWithFormat:@"%@", userInfo.usrID];
    NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
    NSString *message;
    
    if (isAuto) {
        NSLog(@"auto assign");
        message = [NSString stringWithFormat:@"系统自动为您分配用户:%@", userIDString];
        _alertController = [UIAlertController alertControllerWithTitle:@"温馨提示:" message:message preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *rejectAction = [UIAlertAction actionWithTitle:@"拒绝" style:UIAlertActionStyleDestructive handler:^(UIAlertAction * _Nonnull action) {
            NSLog(@"reject auto assign");
            NSString *userIDString = [NSString stringWithFormat:@"%@", userInfo.usrID];
            [[CloudroomQueue shareInstance] rejectAssignUser:userInfo.queID userID:userIDString cookie:cookie];
        }];
        UIAlertAction *acceptAction = [UIAlertAction actionWithTitle:@"同意" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
            NSLog(@"accept auto assign");
            [[CloudroomQueue shareInstance] acceptAssignUser:userInfo.queID userID:userInfo.usrID cookie:cookie];
        }];
        [_alertController addAction:rejectAction];
        [_alertController addAction:acceptAction];
        [self presentViewController:_alertController animated:YES completion:^{}];
    }
    else {
        NSLog(@"manual assign");
        [[CloudroomQueue shareInstance] acceptAssignUser:userInfo.queID userID:userInfo.usrID cookie:cookie];
    }
}
```

```objc
// 接受或拒绝分配的用户操作响应
- (void)responseAssignUserRslt:(CRVIDEOSDK_ERR_DEF)errCode cookie:(NSString *)cookie
{
    // ...
}
```

```objc
// 系统撤回分配此用户通知
- (void)cancelAssignUser:(int)queID usrID:(NSString *)usrID
{
    // 取消分配用户的弹框
}
```

#### 5.客户排队操作 {#clientQueue}

    客户选择一个队列进行排队，每次只能排一个队列

* 相关API请参考 [开始/停止排队](queue.md#startQueuing)，[开始/停止排队操作结果](queue.md#startQueuingRslt)，[队列状态变化](queue.md#queueStatusChanged)，[排队信息变化](queue.md#queuingInfoChanged)  
* 相关结构定义请参考 [队列状态](objc.md#QueueStatus)，[排队信息](json.md#QueuingInfo)

```objc
// 开始排队
int queID = 1;
NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
[[CloudroomQueue shareInstance] startQueuing:queID cookie:cookie];
```

```objc
// 停止排队
NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
[[CloudroomQueue shareInstance] stopQueuing:cookie];
```

```objc
// 开始排队结果
- (void)startQueuingRslt:(CRVIDEOSDK_ERR_DEF)errCode cookie:(NSString *)cookie
{
    if (errCode != CRVIDEOSDK_NOERR) {  //开始排队失败
        // ....
    }
}
```

```objc
// 停止排队结果
- (void)stopQueuingRslt:(CRVIDEOSDK_ERR_DEF)errCode cookie:(NSString *)cookie
{
    // ...
}
```

```objc
// 队列状态变化通知
- (void)queueStatusChanged:(QueueStatus *)queStatus
{
    // ...
}
```

```objc
// 排队信息更新
- (void)queuingInfoChanged:(QueuingInfo *)queuingInfo
{
    // ...
}
```

### 呼叫他人 {#call}

> 实现用户到用户的呼叫，以此来实现会话信息的分发以及相关信息的传递
>
> 1. [主叫](#call)
> 1. [被叫](#called)

#### 1.主叫 {#call}

    呼叫发起方

* 相关API请参考 [开始呼叫](meetingMgr.md#call)，[挂断呼叫](meetingMgr.md#hungupCall)，[开始呼叫结果](meetingMgr.md#callSuccess)，[挂断呼叫结果](meetingMgr.md#hangupCallSuccess)，[通知呼叫被对方接受/拒绝](meetingMgr.md#notifyCallAccepted)

```objc
// 开始呼叫，meetInfo为之前创建的会议对象
NSString *userID = @"user_000007";
NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
[[CloudroomVideoMgr shareInstance] call:userID meetInfo:meetInfo param:nil cookie:cookie];
```

```objc
// 挂断呼叫
NSString *cookie = [NSString stringWithFormat:@"%f", CFAbsoluteTimeGetCurrent()];
[[CloudroomVideoMgr shareInstance] hungupCall:callID usrExtDat:nil cookie:cookie];
```

```objc
// 呼叫成功发出，等待对方响应
- (void)callSuccess:(NSString *)callID cookie:(NSString *)cookie
{
    // ...
}
```

```objc
// 呼叫发出失败
- (void)callFail:(NSString *)callID errCode:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie
{
    // ...
}
```

```objc
// 我的呼叫被对方接受，得到会议对象，可以进入会议
- (void)notifyCallAccepted:(NSString *)callID meetInfo:(MeetInfo *)meetInfo
{
    // ...
}
// 我的呼叫被对方拒绝
- (void)notifyCallRejected:(NSString *)callID reason:(CRVIDEOSDK_ERR_DEF)reason
{
    // ...
}
```

#### 2.被叫 {#called}

    被呼叫方

* 相关API请参考 [通知有人呼入](meetingMgr.md#notifyCallIn)，[接受/拒绝他人的呼叫](meetingMgr.md#acceptCall)，[接受/拒绝他人呼叫结果](meetingMgr.md#acceptCallSuccess)

```objc
// 有呼叫进入
- (void)notifyCallIn:(NSString *)callID meetInfo:(MeetInfo *)meetInfo callerID:(NSString *)callerID param:(NSString *)param
{
    // ...
}
```

### 透明传输 {#dataTransfer}

> 独立于会话的传输功能，对SDK透明，发送对象必须要先成功登录
>
> 1. [发送命令、文本、文件](#send)
> 2. [收到命令、数据、文件](#receive)

#### 1.发送命令、文本、文件 {#send}

    小数据走命令接口，大数据走文本接口，命令的发送不可以被取消，也没有进度通知

* 相关API请参考 [发送命令/数据/文件](meetingMgr.md#sendCmd)，[取消发送](meetingMgr.md#cancelSend)，[发送命令/数据/文件结果](meetingMgr.md#sendCmdRlst)，[发送进度](meetingMgr.md#sendProgress)，[取消发送结果](meetingMgr.md#cancelSendRlst)

```objc
// 发送命令
[[CloudroomVideoMgr shareInstance] sendCmd:@"10086" data:[@"king" dataUsingEncoding:NSUTF8StringEncoding]];
```

```objc
// 发送数据
[[CloudroomVideoMgr shareInstance] sendBuffer:@"10086" data:[@"king" dataUsingEncoding:NSUTF8StringEncoding]];
```

```objc
// 发送文件
[[CloudroomVideoMgr shareInstance] sendFile:@"10086" fileName:@"xx/xx/xx/123.txt"];
```

```objc
// 取消发送
[[CloudroomVideoMgr shareInstance] cancelSend:mFileTaskID];
```

```objc
// 发送大数据和文件的进入通知
- (void)sendProgress:(NSString *)sendId sendedLen:(int)sendedLen totalLen:(int)totalLen cookie:(NSString *)cookie
{
    // ...
}
```

```objc
// 发送命令结果
- (void)sendCmdRlst:(NSString *)sendId sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie
{
    // ...
}
```

```objc
// 发送数据结果
- (void)sendBufferRlst:(NSString *)sendId sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie
{
    // ...
}
```

```objc
// 发送文件结果
- (void)sendFileRlst:(NSString *)sendId fileName:(NSString *)fileName sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie
{
    // ...
}
```

```cs
// 取消发送的结果
- (void)cancelSendRlst:(NSString *)sendId sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie
{
    // ...
}
```

#### 2.收到命令、数据、文件 {#receive}

    收到别人发送数据的通知

* 相关API请参考 [通知有命令/数据/文件发来](meetingMgr.md#notifyCmdData)

```objc
// 收到命令
- (void)notifyCmdData:(NSString *)sourceUserId data:(NSData *)data
{
    // ...
}
```

```objc
// 收到大数据
- (void)notifyBufferData:(NSString *)sourceUserId data:(NSData *)data
{
    // ...
}
```

```objc
// 收到文件
- (void)notifyFileData:(NSString *)sourceUserId tmpFile:(NSString *)tmpFile orgFileName:(NSString *)orgFileName
{
    // ...
}
```