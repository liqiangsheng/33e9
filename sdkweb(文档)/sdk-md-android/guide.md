# SDK 集成指南 {#guide}

> 为开发者集成音视频会话及相关高级功能提供相关指导，以下均为Java代码，详细代码请参考Examples目录下Demo源代码。

    文档中“会议”和“会话”含义等同。

---------------------

## 开始音视频会话 {#startMeeting}

> 快速创建并进入一个简单的音视频会话；
>
> 请先准备[说明]中的相关内容： 1.[运行环境要求](README.md#runEvn), 2.[开发环境配置](README.md#developEvn)以及连接相关的麦克风摄像头并确认设备工作正常。

基本步骤如下：

1. [初始化SDK](#init)
1. [登录连接视频服务器](#login)
1. [创建视频会话](#create)
1. [进入会话](#enter)
1. [打开麦克风/摄像头](#audio)
1. [有其他人进入会话](#userEnter)
1. [退出会话](#exit)
1. [注销登陆](#logout)

### 1.初始化SDK {#init}

> 初始化是整个SDK的使用基础，通常在程序启动的时候进行初始化([init](cloudroomsdk.md#init))，退出的时候进行反初始化([uninit](cloudroomsdk.md#init))，整个程序的生命周期中只进行一次初始化和反初始化。
>
> 相关API参考请见 [初始化/反初始化](cloudroomsdk.md#init)

    SDK内部的组件多为单例组件，整个程序中只能有一个实例，比如“基础组件”，“会议管理组件”，“视频会议组件”，具体请参见各个组件说明。

```Java
	// 初始化SDK
	private void initCloudroomVideoSDK() {
		// SDK初始化数据对象
		SdkInitDat initDat = new SdkInitDat();
		initDat.oemID = "CLOUDROOM";
		// 配置文件目录
		initDat.sdkDatSavePath = "/sdcard/MeetingDemo";
		// 是否输出日志到控制台
		initDat.showSDKLogConsole = true;
		// 初始化SDK
		CloudroomVideoSDK.getInstance().init(getApplicationContext(), initDat);

		// 设置管理回调（账号登陆、会议管理、呼叫管理）
		CloudroomVideoMgr.getInstance().setMgrCallBack(
				MgrCallback.getInstance());
		// 设置会议回调（会议视频）
		CloudroomVideoMeeting.getInstance().setMeetingCallBack(
				VideoCallback.getInstance());

		// 输出SDK版本号
		String sdkVer = CloudroomVideoSDK.getInstance()
				.GetCloudroomVideoSDKVer();
		CRLog.debug(TAG, "CloudroomVideoSDKVer:" + sdkVer);
		// 输出SDK日志
		CloudroomVideoSDK.getInstance().setLogOpen(true);
		// 启动日志上报
		CloudroomVideoSDK.getInstance().startLogReport("android",
				"logserver.cloudroom.com:12005");
	}
```

### 2.登录连接视频服务器 {#login}

> 设置视频服务器地址，使用云屋授权账号和自定义用户编号登录
>
> 相关API请参考 [服务器地址](cloudroomsdk.md#serverAddr)，[登录/注销](meetingMgr.md#login)

```Java
	// 登陆操作
	private void doLogin(String server, String nickName, String privAcnt) {
		// 设置服务器地址
		CloudroomVideoSDK.getInstance().setServerAddr(server);

		// 登录数据对象
		LoginDat loginDat = new LoginDat();
		// 昵称
		loginDat.nickName = nickName;
		// 第三方账号
		loginDat.privAcnt = privAcnt;
		// 登录账号，使用开通SDK的账号
		loginDat.authAcnt = "demo@cloudroom.com";
		// 登录密码必须做MD5处理
		loginDat.authPswd = MD5Util.MD5("123456");
		// 执行登录操作
		CloudroomVideoMgr.getInstance().login(loginDat);
	}
```

### 3.创建视频会话 {#create}

> 输入会议标题，创建一个没有密码的视频会话
>
> 相关API请参考 [创建/销毁视频会议](meetingMgr.md#createMeeting)

```Java
	// 创建会议
	private void createMeeting(String subject) {
		if (TextUtils.isEmpty(subject)) {
			return;
		}
		// 创建会议
		CloudroomVideoMgr.getInstance().createMeeting(subject, false, TAG);

		enableOption(false);
	}

	// 创建会议成功
	private void onCreateMeetingSuccess(MeetInfo meetInfo, String cookie) {
		enterMeeting(meetInfo.ID, meetInfo.pswd);
	}
```

### 4.进入会话 {#enter}

> 用创建成功的会话信息（会议ID和密码）进入会话，其他用户也是利用此会话信息进入该会话。
>
> 相关API请参考 [进入/退出/结束会议](meeting.md#enterMeeting)

```Java
		int meetID = getIntent().getIntExtra("meetID", 0);
		String password = getIntent().getStringExtra("password");
		if (meetID > 0) {
			VideoSDKHelper.getInstance().enterMeeting(meetID, password);
			mMainHandler.post(new Runnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
					showEntering();
				}
			});
```

### 5.打开麦克/摄像头 {#audio}

> 进入会话成功后，配置并打开自己的麦克风和摄像头
>
> 相关API请参考 [麦克风/扬声器列表](meeting.md#getAudioMicNames)，[麦克风设置](meeting.md#getAudioCfg)，[摄像头设备列表](meeting.md#getAllVideoInfo)，[视频设置](meeting.md#setVideoCfg)，[会议内可观看摄像头列表](meeting.md#getWatchableVideos)，[开/关摄像头](meeting.md#openVideo)，[视频状态](meeting.md#getVideoStatus)，[获取/设置默认视频](meeting.md#setDefaultVideo)，[成员视频UI显示组件](videoui.md)  
> 相关结构定义请参考 [音频配置](class.md#AudioCfg)，[用户视频信息](class.md#VideoInfo)

```Java
	// 成功进入会议
	private void onEnterMeeting() {
		String myUserID = CloudroomVideoMeeting.getInstance().getMyUserID();
		// 默认使用前置摄像头
		ArrayList<UsrVideoInfo> myVideos = CloudroomVideoMeeting.getInstance()
				.getAllVideoInfo(myUserID);
		for (UsrVideoInfo vInfo : myVideos) {
			if (vInfo.videoName.contains("FRONT")) {
				CloudroomVideoMeeting.getInstance().setDefaultVideo(myUserID,
						vInfo.videoID);
				break;
			}
		}
		// 打开摄像头
		CloudroomVideoMeeting.getInstance().openVideo(myUserID);

		// 打开麦克风
		CloudroomVideoMeeting.getInstance().openMic(myUserID);

		// 开启外放
		CloudroomVideoMeeting.getInstance().setSpeakerOut(true);
	}
```

### 6.有其他人进入会话 {#userEnter}

> 其他人入会的步骤也是上述的[4、5]步，拿到会议信息后进入到他人创建的会议，此步骤的目的是为了实时关注比自己晚进来的人并刷新摄像头画面显示；如果想要获取之前进来的人，可以调用 [getAllMembers](meeting.md#getAllMembers) 获取会议成员列表，也可以调用 [getWatchableVideos](meeting.md#getWatchableVideos) 获取所有可以观看的摄像头列表进行加载。
>
> 用[成员视频UI显示组件](meetingUI.md#videoui)创建多个视频窗口，来显示进入会议内的成员。
>
> 相关API请参考 [有人进入/离开会议通知](meeting.md#userEnterMeeting)，[成员视频UI显示组件](meetingUI.md#videoui)，[会议内可观看摄像头列表](meeting.md#getWatchableVideos)
> 相关结构定义请参考 [用户视频信息](class.md#VideoInfo)

```Java
	//用户离开会议
	private void userEnterMeeting(String userid) {
		// 订阅视频
		watchVideos();
	}
	// 订阅视频
	private void watchVideos() {
		// 订阅可订阅的视频
		ArrayList<UsrVideoId> videos = CloudroomVideoMeeting.getInstance()
				.getWatchableVideos();

		String myUserId = CloudroomVideoMeeting.getInstance().getMyUserID();
		String peerUserId = VideoSDKHelper.getInstance().getPeerUserId();

		UsrVideoId[] wVideos = { null, null, null };
		ArrayList<UsrVideoId> watchVideos = new ArrayList<UsrVideoId>();
		for (UsrVideoId usrVideoId : videos) {
			if (usrVideoId.userId.equals(myUserId)) {
				wVideos[0] = usrVideoId;
				watchVideos.add(usrVideoId);
			} else if (usrVideoId.userId.equals(peerUserId)) {
				wVideos[1] = usrVideoId;
				watchVideos.add(usrVideoId);
			} else if (wVideos[2] == null) {
				wVideos[2] = usrVideoId;
				watchVideos.add(usrVideoId);
			}
		}
		mSelfGLSV.setUsrVideoId(wVideos[0]);
		mPeerGLSV.setUsrVideoId(wVideos[1]);
		mThirdGLSV.setUsrVideoId(wVideos[2]);

		CloudroomVideoMeeting.getInstance().watchVideos(watchVideos);
	}
```

> **至此，一个简单的音视频会话就建立起来了。**

### 7.退出会话 {#exit}

> 在未注销的情况下可反复的进入退出同一个会议。
>
> 相关API请参考 [进入/退出/结束会议](meeting.md#enterMeeting)

```Java

	// 离开会议
	CloudroomVideoMeeting.getInstance().exitMeeting();
```

### 8.注销登陆 {#logout}

> 可重复的登录和注销。
>
> 相关API请参考 [进入/退出/结束会议](meeting.md#enterMeeting)，[登录/注销](meetingMgr.md#login)，[初始化/反初始化](cloudroomsdk.md#init)

```Java

	// 登录注销
	CloudroomVideoMgr.getInstance().logout();
```

### 9.反初始化，退出SDK {#uninit}

> 执行反初始化后SDK功能不再可用。
>
> 相关API请参考 [初始化/反初始化](cloudroomsdk.md#init)

```Java

	// 反初始化SDK
	CloudroomVideoSDK.getInstance().uninit();
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

* 相关API请参考 [麦克风、扬声器设备的获取](#audio)，[开/关麦克风](meeting.md#openMic)

```Java

//打开自己的麦克风
String myUserID = CloudroomVideoMeeting.getInstance().getMyUserID();
CloudroomVideoMeeting.getInstance().openMic(myUserID);
```

```Java
//关闭自己的麦克风
String myUserID = CloudroomVideoMeeting.getInstance().getMyUserID();
CloudroomVideoMeeting.getInstance().closeMic(myUserID);
```

#### 2.监控麦克风状态变化 {#audioStatusChanged}

    1. 开关自己或他人的的麦克风都会收到该回调函数
    2. 自己的麦克风被他人开关也会收到该回调函数
    3. 也可主动获取麦克风状态，一般用于各种判断

* 相关API请参考 [麦克风状态变化](meeting.md#audioStatusChanged)  
* 相关结构定义请参考 [麦克风状态](constant.md#ASTATUS)

```Java

	// 设置会议回调（会议视频）
	CloudroomVideoMeeting.getInstance().setMeetingCallBack(VideoCallback.getInstance());

	//音频状态发生变化
	@Override
	public void audioStatusChanged(final String userID,
			final ASTATUS oldStatus, final ASTATUS newStatus) {
		// TODO Auto-generated method stub
		//...
	}
```

#### 3.设置麦克风和扬声器音量 {#Volume}

* 相关API请参考 [麦克风音量](meeting.md#micVolume)，[扬声器音量](meeting.md#speakerVolume)

````Java

	//由系统调节麦克风和扬声器的声音
	setVolumeControlStream(AudioManager.STREAM_VOICE_CALL);
````

#### 4.监控麦克风声音变化 {#micEnergyUpdate}

    可用来实时展示当前麦克风采集到声音的大小

* 相关API请参考 [麦克风声音变化](meeting.md#micEnergyUpdate)

```Java

	// 设置会议回调（会议视频）
	CloudroomVideoMeeting.getInstance().setMeetingCallBack(VideoCallback.getInstance());

	//麦克风音量波动
	@Override
	public void micEnergyUpdate(String userID, int oldLevel, int newLevel) {
		// TODO Auto-generated method stub
		String myUserID = CloudroomVideoMeeting.getInstance().getMyUserID();
	    if (userID.equals(myUserID))
	    {
	        //更新音量进度条
	    }
	    else
	    {
	        // ...
	    }
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

* 相关API请参考 [录制内容配置](meeting.md#setRecordVideos)  
* 相关结构定义请参考 [录制内容配置](class.md#RecordContent)

```Java

	void setRecordContent() {
		String myUserID = CloudroomVideoMeeting.getInstance().getMyUserID();

		int recWidth = mRecordCfg.dstResolution.width;
		int recHeight = mRecordCfg.dstResolution.height;
		int subWidth = recWidth / 4;
		int subHeight = recHeight / 4;

		// 需要录制的内容列表
		ArrayList<RecContentItem> items = new ArrayList<RecContentItem>();
		// 添加全屏录制影音
		items.add(new RecContentItem(REC_VCONTENT_TYPE.RECVTP_MEDIA,
					new Rect(0, 0, recWidth, recHeight)));

		// 添加录制摄像头图像，位置为录制区域的右下角
		short camID = CloudroomVideoMeeting.getInstance().getDefaultVideo(
				myUserID);
		RecVideoContentItem videoItem = new RecVideoContentItem(myUserID,
				camID, new Rect(recWidth - subWidth, recHeight - subHeight,
						recWidth, recHeight));

		if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
			// 竖屏情况录制图像也是竖屏
			videoItem = new RecVideoContentItem(myUserID, camID, new Rect(
					recWidth - subHeight, recHeight - subWidth, recWidth,
					recHeight));
		}
		items.add(videoItem);

		// 添加录制时间戳
		int timeHeight = recHeight / 12;
		int timeWidth = timeHeight * 8;
		items.add(new RecContentItem(REC_VCONTENT_TYPE.RECVTP_TIMESTAMP,
				new Rect(0, 0, timeWidth, timeHeight)));
		// 设置录制图像内容
		CloudroomVideoMeeting.getInstance().setRecordVideos(items);
	}
```

#### 2.开始/停止录制 {#startRecording}

    1. 先开始录制，配置好录制文件信息
    2. 然后更新录制内容配置
    3. 在录制过程中可以多次更新录制配置，从而变更录制内容

* 相关API请参考 [开始/停止录制](meeting.md#startRecording)  
* 相关结构定义请参考 [录制内容类型](constant.md#REC_VCONTENT_TYPE)，[录制文件配置](class.md#RecordCfg)

```Java
	//开始录制文件
	private void startLocalRecord() {
		// 设置录制文件是否加密
		// CloudroomVideoMeeting.getInstance().setRecordFileEncrypt(true);

		// 设置录制参数，如分辨率、帧率等
		RecordCfg recCfg = new RecordCfg();
		// 录制文件名称
		recCfg.filePathName = "/sdcard/RecordDemo/CloudroomVideoSDK/record_"
				+ System.currentTimeMillis() + ".mp4";
		cfg.recordWidth = 1280; //宽度
		cfg.recordHeight = 720; //高度
		cfg.frameRate = 15;     //帧率
		cfg.bitRate = 1000000;  //码率
		cfg.defaultQP = 24;     //清晰度
		// 设置录制语音内容
		recCfg.recDataType = RecordCfg.REC_AUDIO_LOC
				| RecordCfg.REC_AUDIO_OTHER | RecordCfg.REC_VIDEO;

		// 开始录制
		if (!CloudroomVideoMeeting.getInstance().startRecording(recCfg)) {
			return;
		}
		mRecordCfg = recCfg;

		// 设置录制的图像内容
		setRecordContent(); //上方自定义函数
	}
```

```Java
//停止录制
CloudroomVideoMeeting.getInstance().stopRecording();
```

#### 3.录制文件的大小、时长、状态 {#getRecFileSize}

* 相关API请参考[录制文件大小](meeting.md#getRecFileSize)，[时长](meeting.md#getRecDuration)，[录制状态变化通知](meeting.md#recordStateChanged)  
* 相关结构定义请参考 [错误码定义](constant.md#CRVIDEOSDK_ERR_DEF), [录制状态](constant.md#RECORD_STATE)，[通知录制文件状态变化](meeting.md#notifyRecordFileStateChanged)

```Java

//录制时长
int recordLen = CloudroomVideoMeeting.getInstance().recordDuration();
//录制大小（MB）
double fileSzie = (double)CloudroomVideoMeeting.getInstance().recordFileSize() / (1024 * 1024);
```

```Java

	// 设置会议回调（会议视频）
	CloudroomVideoMeeting.getInstance().setMeetingCallBack(VideoCallback.getInstance());

```

```Java

	//处理录制错误状态通知
	@Override
	public void recordErr(int err) {
		// TODO Auto-generated method stub
		//录制发生错误
	}

	@Override
	public void recordStateChanged(int state) {
		// TODO Auto-generated method stub
		//录制文件状态变化通知
	}
```

#### 4.设置录制文件是否加密 {#setRecordFileEncrypt}

    启动录制时调用，则本次录制是否加密本地录制文件，也可全局配置，这样每一次录制都是加密的。

* 相关API请参考 [设置录制文件是否加密](meeting.md#setRecordFileEncrypt)

```Java

// 设置录制文件是否加密
CloudroomVideoMeeting.getInstance().setRecordFileEncrypt(true);
```

#### 5.录制文件列表 {#getAllRecordFiles}

* 相关API请参考 [录制文件列表](meeting.md#getAllRecordFiles)  
* 相关结构定义请参考 [录制文件列表](class.md#RecordFileObjs)

```Java

//获取录制文件列表
ArrayList<RecordFileShow> recordFiles = CloudroomVideoMeeting.getInstance().getAllRecordFiles();
```

#### 6.录制文件列表添加、删除文件 {#addFileToRecordMgr}

    1. 添加录制文件到录制文件列表，这样此文件便可上传和回放
    2. 移除文件时本地文件会被删掉，正在上传的文件会被取消上传，已经上传的文件不受影响

* 相关API请参考 [录制列表添加/删除文件](meeting.md#addFileToRecordMgr)

```Java
//添加文件到录制文件列表中
CloudroomVideoMeeting.getInstance().addFileToRecordMgr("test.mp4", "/scard/downloads/videos/");
```

```Java
//从录制文件列表中移除文件，并删除本地文件
CloudroomVideoMeeting.getInstance().removeFromFileMgr("/scard/downloads/videos/test.mp4");
```

#### 7.上传、取消上传录制文件 {#uploadRecordFile}

    参数是绝对路径文件名

* 相关API请参考 [上传/取消上传录制文件](meeting.md#uploadRecordFile)，[通知录制文件上传进度](meeting.md#notifyRecordFileUploadProgress)，[通知录制文件状态变化](meeting.md#notifyRecordFileStateChanged)  
* 相关结构定义请参考 [录制文件列表](class.md#RecordFileObjs)，[录制文件上传状态](constant.md#RECORD_FILE_STATE)

```Java

//开始上传
CloudroomVideoMeeting.getInstance().uploadRecordFile("/scard/downloads/videos/test.mp4");
```

```Java
	// 设置会议回调（会议视频）
	CloudroomVideoMeeting.getInstance().setMeetingCallBack(VideoCallback.getInstance());
```

```Java

	//录制文件上传进度通知
	@Override
	public void notifyRecordFileUploadProgress(String fileName, int percent) {
		// TODO Auto-generated method stub
		
	}

	//录制文件上传成功通知
	@Override
	public void uploadRecordFileSuccess(String fileName, String fileUrl) {
		// TODO Auto-generated method stub
		
	}

	//录制文件上传失败通知
	@Override
	public void uploadRecordFileErr(String fileName, int err) {
		// TODO Auto-generated method stub
	}
```

```Java
//取消上传
CloudroomVideoMeeting.getInstance().cancelUploadRecordFile("/scard/downloads/videos/test.mp4");
```

#### 8.回放录制文件 {#playbackRecordFile}

    此接口需要配合影音共享UI显示组件或者影音播放相关的接口进行画面和声音展示

> 相关API请参考 [影音共享UI显示组件](meetingUI.md#mediaui)，[回放录制文件](meeting.md#playbackRecordFile)

```Java

//开始回放
CloudroomVideoMeeting.getInstance().playbackRecordFile("/scard/downloads/videos/test.mp4");
```

### 影音播放共享 {#media}

> 1. [引入影音播放UI显示组件](#mediashareui)
> 1. [播放配置](#cfg)
> 1. [播放、暂停、停止](#mediaplay)
> 1. [设置播放进度](#pos)
> 1. [文件列表、播放信息、播放音量](#list)

#### 1.引入影音播放UI显示组件 {#mediashareui}

    使用可视化UI组件进行影音播放

* 相关API请参考 [影音共享UI显示组件](meetingUI.md#mediaui)

```Java
	<com.cloudroom.cloudroomvideosdk.MediaUIView
	    android:id="@+id/yuv_media"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent"
	    android:scaleType="fitCenter" />
```

#### 2.播放配置 {#cfg}

    此配置主要是为了定义共享播放时会议内其他人看到的效果

* 相关API请参考 [影音播放配置](meeting.md#setMediaCfg )  
* 相关结构定义请参考 [视频尺寸定义](constant.md#VIDEO_SHOW_SIZE)

```Java
VideoCfg cfg = new VideoCfg();
cfg.sizeType = VIDEO_SIZE_TYPE.VSIZE_SZ_360;
cfg.fps = 20;           //帧率
cfg.qp_min = 22;        //
cfg.qp_max = 36;        //流畅优先
CloudroomVideoMeeting.getInstance().setMediaCfg(cfg);

```

#### 3.播放、暂停、停止 {#mediaplay}

    每次只能播放一个视频，当前播放需要先停止然后才能进行下一个视频播放；
    开始播放参数可控制此播放是只有自己可见还是会议内所有人可见。

* 相关API请参考 [开始/暂停/停止影音播放](meeting.md#startPlayMedia)，[通知影音打开/播放/暂停/停止](meeting.md#notifyMediaOpened)，[通知更新影音播放进度](meeting.md#notifyPlayPosSetted)

```Java
//开始播放
CloudroomVideoMeeting.getInstance().startPlayMedia("/sdcard/RecordDemo/CloudroomVideoSDK/4.mp4", true);

```

```Java
//暂停播放
CloudroomVideoMeeting.getInstance().pausePlayMedia(false);
//继续播放
CloudroomVideoMeeting.getInstance().pausePlayMedia(true);

```

```Java
//停止当前播放
CloudroomVideoMeeting.getInstance().stopPlayMedia();

```

#### 4.设置播放进度 {#pos}

    可以通过播放组件上的工具条拖动来调整播放进度，也可以用代码来设置播放的进度

* 相关API请参考 [设置播放进度](meeting.md#setMediaPlayPos)

```Java
int pos = 123456;
CloudroomVideoMeeting.getInstance().setMediaPlayPos(pos);
```

#### 5.文件列表、播放信息、播放音量 {#list}

* 相关API请参考 [影音文件列表](meeting.md#getAllFilesInMediaPath)，[影音播放信息](meeting.md#getMediaInfo)，[影音播放音量](meeting.md#mediaVolume)  
* 相关结构定义请参考 [影音文件](class.md#MediaInfoObj)

```Java
//获取media目录下的所有影音文件
ArrayList<String> mediaFiles = CloudroomVideoMeeting.getInstance().getAllFilesInMediaPath()；
```

```Java
//获取当前播放的影音文件信息
MediaInfo mediaInfo = CloudroomVideoMeeting.getInstance().getMediaInfo();
```

```Java
//设置当前播放的影音声音
int vol = 24;
CloudroomVideoMeeting.getInstance().setMediaVolume(vol)；
```

### 屏幕共享 {#screenshare}

> 1. [引入共享UI显示组件](#screenshareui)

#### 1.引入共享UI显示组件 {#screenshareui}

    使用可视化UI组件进行屏幕共享显示和操作

* 相关API请参考 [屏幕共享UI显示组件](meetingUI.md#shareui)

```Java
    <com.cloudroom.cloudroomvideosdk.ScreenShareUIView
        android:id="@+id/view_screenshare"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:clickable="true"/>
```

#### 2.开始、停止共享 {#starshare}

    使用接口启动共享，出现共享内容显示组件后，用组件上的功能开始标注和结束共享。

* 相关API请参考 [屏幕共享状态](meeting.md#isScreenShareStarted)，[开始/停止屏幕共享通知](meeting.md#notifyScreenShareStarted)  

```Java
	// 设置会议回调（会议视频）
	CloudroomVideoMeeting.getInstance().setMeetingCallBack(VideoCallback.getInstance());

```

```Java
	//对方启动屏幕共享
	@Override
	public void notifyScreenShareStarted() {
		// TODO Auto-generated method stub
		// ...
	}
```

```Java
	//对方关闭屏幕共享
	@Override
	public void notifyScreenShareStopped() {
		// TODO Auto-generated method stub
		// ...
	}
```

### 聊天 {#IM}

> 实现会话内文本聊天，如果需要更加丰富的聊天内容，可自己传输文本格式，并进行相关解析

* 相关API请参考 [发送IM文本消息](meeting.md#sendIMmsg)，[通知收到IM消息](meeting.md#notifyIMmsg)

```Java
	// 设置会议回调（会议视频）
	CloudroomVideoMeeting.getInstance().setMeetingCallBack(VideoCallback.getInstance());

```

```Java
//发送IM信息
string userID = "user_00005"; //为空时表示广播，发给所有人
CloudroomVideoMeeting.getInstance().sendIMmsg(txtMsg.Text, userID, "");
```

```Java
	//发送结果
	@Override
	public void sendIMmsgRlst(String taskID, CRVIDEOSDK_ERR_DEF sdkErr,
			String cookie) {
		// TODO Auto-generated method stub
		// ...
	}

```

```Java
	//收到IM消息
	@Override
	public void notifyIMmsg(String fromUserID, String text, int sendTime) {
		// TODO Auto-generated method stub
		// ...
	}

```

### 参会成员管理 {#members}

> 获取会话内人员及相关信息，得到成员的userID后可以对其进行相关的远程音视频操作

* 相关API请参考 [会议成员列表](meeting.md#getAllMembers)，[会议成员信息](meeting.md#getMemberInfo)  
* 相关结构定义请参考 [会议成员](class.md#MemberObj)

```Java
//获取所有参会人
ArrayList<MemberInfo> members = CloudroomVideoMeeting.getInstance().getAllMembers();
```

```Java
//获取某个参会人的信息
MemberInfo memInfo = CloudroomVideoMeeting.getInstance().getMemberInfo("user_00005");
```

### 功能页同步 {#page}

> 用户会话内同步所有人的功能，包括视频墙、影音共享、屏幕共享、电子白板

* 相关API请参考 [设置/获取会话内主功能页](meeting.md#switchToPage)，[会话内主功能页切换通知](meeting.md#notifySwitchToPage)  
* 相关结构定义请参考 [主功能类型](constant.md#MAIN_PAGE)


```Java
//切换功能页
CloudroomVideoMeeting.getInstance().switchToPage(MAIN_PAGE.MAINPAGE_VIDEOWALL, null);
```

```Java
// 设置会议回调（会议视频）
CloudroomVideoMeeting.getInstance().setMeetingCallBack(VideoCallback.getInstance());

```

```Java
	//当他人切换功能页时，收到通知消息
	@Override
	public void notifySwitchToPage(MAIN_PAGE main, SubPage sub) {
		// ...
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
* 相关结构定义请参考 [会话信息](class.md#SesssionObj)，[队列信息](class.md#QueueObj)

```Java
// 设置队列回调
CloudroomQueue.getInstance().setQueueCallback(QueueCallback.getInstance());
```

```Java
//可在登录成功后初始化队列数据
private void onLoginSuccess() {
	// 初始化专家坐席用户队列
	CloudroomQueue.getInstance().initQueue("");
}
```

```Java
	//队列初始化响应
	@Override
	public void initQueueDatRslt(CRVIDEOSDK_ERR_DEF errCode, String cookie) {
		// TODO Auto-generated method stub
		// ...
	}
```

#### 2.坐席队列操作 {#servicesOpr}

    坐席角色开始和停止服务队列，以及操作后队列状态的变化

* 相关API请参考 [开始/停止服务队列](queue.md#startService)，[开始/停止队列服务结果](queue.md#startServiceRslt)  
* 相关结构定义请参考 [队列状态](class.md#QueueStatusObj)

```Java
//开始服务队列
CloudroomQueue.getInstance().startService(queID, "");
```

```Java
//停止服务队列
CloudroomQueue.getInstance().stopService(queID, "");
```

```Java
//获取服务的所有队列
ArrayList<Integer> queIDs = CloudroomQueue.getInstance().getServingQueues();
```

```Java
// 设置队列回调
CloudroomQueue.getInstance().setQueueCallback(QueueCallback.getInstance());
```

```Java
	//开始队列服务结果
	@Override
	public void startServiceRslt(int queID, CRVIDEOSDK_ERR_DEF errCode,
			String cookie) {
		// TODO Auto-generated method stub
		// ...
	}
```

```Java
	//停止队列服务结果
	@Override
	public void stopServiceRslt(int queID, CRVIDEOSDK_ERR_DEF errCode,
			String cookie) {
		// TODO Auto-generated method stub
		// ...
	}
```

```Java
	//队列状态变化通知
	@Override
	public void queueStatusChanged(QueueStatus queStatus) {
		// TODO Auto-generated method stub
		CRLog.debug(TAG, "queueStatusChanged");
		Message msg = mMainHandler.obtainMessage(MSG_QUEUESTATUS_CHANGED);
		msg.obj = queStatus;
		msg.sendToTarget();
	}
```

#### 3.坐席请求用户 {#reqAssignUser}

    在设置DND免打扰状下态，系统不再自动分配，需要手动申请用户

* 相关API请参考 [免打扰](meetingMgr.md#setDNDStatus)，[设置免打扰结果](meetingMgr.md#setDNDStatusSuccess)，[请求分配用户](queue.md#reqAssignUser)，[请求分配用户结果](queue.md#reqAssignUserRslt)

```Java
// 设置队列回调
CloudroomQueue.getInstance().setQueueCallback(QueueCallback.getInstance());
```

```Java
//设置免打扰状态，关掉系统自动推送
CloudroomVideoMgr.getInstance().setDNDStatus(1, "");
```

```Java
//手动请求一个用户
CloudroomQueue.getInstance().reqAssignUser("");
```

```Java
	//请求用户的结果
	@Override
	public void reqAssignUserRslt(CRVIDEOSDK_ERR_DEF errCode, UserInfo usr,
			String cookie) {
		// TODO Auto-generated method stub
	    if (errCode == CRVIDEOSDK_ERR_DEF.CRVIDEOSDK_NOERR)
	    {
	        UserInfo user = JsonConvert.DeserializeObject<UserInfo>(e.p_jsonUsr);
	        // 请求用户成功
	    }
	    else if(errCode == CRVIDEOSDK_ERR_DEF.CRVIDEOSDK_QUE_NOUSER)
	    {
	        // 队列中没有排队人员
	    }
	    else
	    {
	       // 手动请求用户失败，代码：errCode
	    }
	}
```

```Java
//取消免打扰，开启系统自动推送
CloudroomVideoMgr.getInstance().setDNDStatus(0, "");
```

#### 4.系统自动给坐席分配用户 {#autoAssignUser}

    系统自动分配的用户在坐席还未选择接受或拒绝时，系统可以撤回分配

* 相关API请参考 [自动分配用户通知](queue.md#autoAssignUser)，[接受/拒绝分配的用户](queue.md#acceptAssignUser)，[自动分配用户被取消](queue.md#cancelAssignUser)

```Java
// 设置队列回调
CloudroomQueue.getInstance().setQueueCallback(QueueCallback.getInstance());
```

```Java
	//系统自动分配用户通知
	@Override
	public void autoAssignUser(UserInfo usr) {
		// TODO Auto-generated method stub
		//...
	}
```

```Java
//接受或拒绝分配的用户操作响应
@Override
	public void responseAssignUserRslt(CRVIDEOSDK_ERR_DEF errCode, String cookie) {
		// TODO Auto-generated method stub
    	//...
	}
```

```Java
	//系统撤回分配此用户通知
	@Override
	public void cancelAssignUser(int queID, String usrID) {
		// TODO Auto-generated method stub
    	//取消分配用户的弹框
	}
```

#### 5.客户排队操作 {#clientQueue}

    客户选择一个队列进行排队，每次只能排一个队列

* 相关API请参考 [开始/停止排队](queue.md#startQueuing)，[开始/停止排队操作结果](queue.md#startQueuingRslt)，[队列状态变化](queue.md#queueStatusChanged)，[排队信息变化](queue.md#queuingInfoChanged)  
* 相关结构定义请参考 [队列状态](class.md#QueueStatusObj)，[排队信息](class.md#QueuingObj)

```Java
// 设置队列回调
CloudroomQueue.getInstance().setQueueCallback(QueueCallback.getInstance());
```

```Java
//开始排队
int queID = 1;
CloudroomQueue.getInstance().startQueuing(queID, "");
```

```Java
//停止排队
CloudroomQueue.getInstance().stopQueuing("");
```

```Java
	//开始排队结果
	@Override
	public void startQueuingRslt(CRVIDEOSDK_ERR_DEF errCode, String cookie) {
		// TODO Auto-generated method stub
	    if (errCode != CRVIDEOSDK_ERR_DEF.CRVIDEOSDK_NOERR) //开始排队失败
	    {
	        // ....
	    }
	}
```

```Java
	//停止排队结果
	@Override
	public void stopQueuingRslt(CRVIDEOSDK_ERR_DEF errCode, String cookie) {
		// TODO Auto-generated method stub
    	//……
	}
```

```Java
	//队列状态变化通知
	@Override
	public void queueStatusChanged(QueueStatus queStatus) {
		// TODO Auto-generated method stub
    	//……
	}
```

```Java
	//排队信息更新
	@Override
	public void queuingInfoChanged(QueuingInfo queuingInfo) {
		// TODO Auto-generated method stub
    	//……
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

```Java
// 设置管理回调（账号登陆、会议管理、呼叫管理）
CloudroomVideoMgr.getInstance().setMgrCallBack(MgrCallback.getInstance());
```

```Java
//开始呼叫，meetObj为之前创建的会议对象字符串
string userID = "user_000007";
string callID = CloudroomVideoMgr.getInstance().call(userID, meetInfo, "", "");
```

```Java
//挂断呼叫
CloudroomVideoMgr.getInstance().hungupCall(callID, "", "");
```

```Java
	//呼叫成功发出，等待对方响应
	@Override
	public void callSuccess(String callID, int meetID, String meetPswd, String cookie) {
   		//...
	}
```

```Java
	//呼叫发出失败
	@Override
	public void callFail(String callID, final CRVIDEOSDK_ERR_DEF sdkErr,
			String cookie) {
		// TODO Auto-generated method stub
    	// 呼叫失败，代码： sdkErr
	}
```

```Java
	//我的呼叫被对方接受，得到会议对象，可以进入会议
	@Override
	public void notifyCallAccepted(String callID, MeetInfo meetInfo, String useExtDat) {
	    CloudroomVideoMeeting.getInstance().enterMeeting(meetInfo.ID, meetInfo.pswd, MyUserId, MyNickname, "");
	    //打开会话界面……
	}
	//我的呼叫被对方拒绝
	@Override
	public void notifyCallRejected(String callID, final CRVIDEOSDK_ERR_DEF reason, final String useExtDat) {
	    //被拒绝了 o.o ……
	}
```

#### 2.被叫 {#called}

    被呼叫方

* 相关API请参考 [通知有人呼入](meetingMgr.md#notifyCallIn)，[接受/拒绝他人的呼叫](meetingMgr.md#acceptCall)，[接受/拒绝他人呼叫结果](meetingMgr.md#acceptCallSuccess)

```Java
// 设置管理回调（账号登陆、会议管理、呼叫管理）
CloudroomVideoMgr.getInstance().setMgrCallBack(MgrCallback.getInstance());
```

```Java
//有呼叫进入
	@Override
	public void notifyCallIn(String callID, MeetInfo meetInfo,
			String callerID, String param) {
	    if(/*接受呼叫， 进入会议*/)
	    {
	        CloudroomVideoMgr.getInstance().acceptCall(callID, meetInfo, "", "");
	        CloudroomVideoMeeting.getInstance().enterMeeting(meetInfo.ID, meetInfo.pswd, MyUserId, MyNickname, "");
	        //打开会话界面……
	    }
	    else //拒绝对方的呼叫
	    {
	        CloudroomVideoMgr.getInstance().rejectCall(callID, "", "", "");
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

```Java
//发送命令和数据，小数据走sendcmd接口，大数据走sendbuffer接口，字符串可以直接发送，字节数组建议使用Base64编码成String发送防止有不支持的字符，注意：各个平台必须统一，使用Base64编码之后发送的收到之后也必须使用Base64解码
CloudroomVideoMgr.getInstance().sendCmd(userID, "data");
CloudroomVideoMgr.getInstance().sendBuffer(userID, Base64.encodeToString(input, Base64.DEFAULT););
```

```cs
//发送文件
String userID = "user_000022";
String fileName = "/sdcard/a.jpg";
String mFileTaskID = CloudroomVideoMgr.getInstance().sendFile(userID, mSelectedFile);
```

```Java
//取消发送
CloudroomVideoMgr.getInstance().cancelSend(mFileTaskID);
```

```Java
// 设置管理回调
CloudroomVideoMgr.getInstance().setMgrCallBack(MgrCallback.getInstance());
```

```Java
	//发送大数据和文件的进入通知
	@Override
	public void sendProgress(String sendId, int sendedLen, int totalLen,
			String cookie) {
		// TODO Auto-generated method stub
		string text = "总大小：" + totalLen + ", 已发送" + sendedLen;
		//发完了
	    if (sendedLen == totalLen)
	    {
	        //发送成功
	    }
	}
```

```Java
	//发送命令结果
	@Override
	public void sendCmdRlst(String sendId, CRVIDEOSDK_ERR_DEF sdkErr,
			String cookie) {
		// TODO Auto-generated method stub
		if (sdkErr != 0)
	    {
	        mBufferTaskID = "";
	        //发送失败: sdkErr
	    }
	}
```

```Java
	//发送数据结果
	@Override
	public void sendBufferRlst(String sendId, CRVIDEOSDK_ERR_DEF sdkErr,
			String cookie) {
		// TODO Auto-generated method stub
		if (sdkErr != 0)
	    {
	        mBufferTaskID = "";
	        //发送失败: sdkErr
	    }
	}
```

```Java
	//发送文件结果
	@Override
	public void sendFileRlst(String sendId, String fileName, CRVIDEOSDK_ERR_DEF sdkErr,
			String cookie) {
		// TODO Auto-generated method stub
		if (sdkErr != 0)
	    {
	        mBufferTaskID = "";
	        //发送失败: sdkErr
	    }
	}
```

```Java
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

```Java
// 设置管理回调
CloudroomVideoMgr.getInstance().setMgrCallBack(MgrCallback.getInstance());
```

```Java
	//收到命令
	@Override
	public void notifyCmdData(String sourceUserId, String data) {
		// TODO Auto-generated method stub
		//...
	}
```

```Java
	//收到大数据
	@Override
	public void notifyBufferData(String sourceUserId, String data) {
		// TODO Auto-generated method stub
	    //...
	}
```

```Java
	//收到文件
	@Override
	public void notifyFileData(String sourceUserId, String tmpFile,
			String orgFileName) {
		// TODO Auto-generated method stub
    	//...
	}
```