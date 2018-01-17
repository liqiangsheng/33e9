# 视频会议组件 {#meeting}

> CloudroomVideoMeeting 是会议核心控件，实现通话建立、音频采集播入、视频采集编解码、屏幕共享、录制、影音播放等。
> 单例组件，整个程序的生命过程中只能有有一个实例。

------

## 接口函数 {#api}

### 注册、反注册监听回调 {#callBack}

```Java
public void registerCallBack(CloudroomVideoCallback callBack)
```

* **功能** 注册监听回调
* **返回值** 无
* **参数**
  * callBack 监听回调对象

```Java
public void unregisterCallBack(CloudroomVideoCallback callBack)
```

* **功能** 反注册监听回调
* **返回值** 无
* **参数**
  * callBack 监听回调对象

```Java
public void setMeetingCallBack(CloudroomVideoCallback callBack)
```

* **功能** 注册监听回调，注：建议使用registerCallBack替代
* **返回值** 无
* **参数**
  * callBack 监听回调对象

### 进入/退出/结束会议 {#enterMeeting}

```Java
public void enterMeeting(int meetID, String pswd, String userID, String nikeName)
```

* **功能** 使用会议ID和密码（可为空）进入指定的视频会议
* **返回值** 无
* **参数**
  * meetID 视频会议ID
  * pswd 本次会议中的密码（在创建会议时指定参数）
  * userID 用户账号
  * nickName 用户昵称
* **回调函数** [enterMeetingRslt](#enterMeetingRslt)

```Java
public void exitMeeting()
```

* **功能** 离开会议
* **返回值** 无
* **参数** 无

> 调用此接口离开会话时，其他会话用户会收到[userLeftMeeting](#userEnterMeeting)的消息通知

### 会议成员列表 {#getAllMembers}

```Java
public ArrayList<MemberInfo> getAllMembers()
```

* **功能** 获取所有用户的信息
* **返回值** 所有用户的信息,详见定义[MemberInfo](class.md#MemberInfo)
* **参数** 无

### 会议成员信息 {#getMemberInfo}

```Java
public MemberInfo getMemberInfo(String userId)
```

* **功能** 获取某个用户的信息
* **返回值** 用户的信息,详见定义[MemberInfo](class.md#MemberInfo)说明
* **参数**
  * userID 用户ID

### 会议成员昵称 {#getMemberNickName}

```Java
public String getNickName(String userId)
```

* **功能** 获取某个用户的昵称
* **返回值** 用户的昵称
* **参数**
  * userID 用户ID

### 用户是否在会议中 {#isUserInMeeting}

```Java
public boolean isUserInMeeting(String userID)
```

* **功能** 判断某个用户是否在会议中
* **返回值** 用户是否在会议中
* **参数**
  * userID 用户的id

### 麦克风/扬声器列表 {#getAudioMicNames}

```Java
public void getAudioDeviceName(ArrayList<String> micNames,
			ArrayList<String> speakerNames)
```

* **功能** 获取系统上的麦克风扬声器
* **返回值** 无
* **参数** 
	* micNames 麦克风设备列表
	* speakerNames 扬声器列表

### 麦克风设置 {#getAudioCfg}

```Java
public AudioCfg getAudioCfg()
```

* **功能** 获取音频参数
* **返回值** 音频参数,详见定义[AudioCfg](class.md#AudioCfg)说明
* **参数** 无

### 麦克风声音大小 {#getMicEnergy}

```Java
public int getMicEnergy(String userID)
```

* **功能** 获取用户说话声音大小
* **返回值** 音量大小（0~10）
* **参数**
  * userID 用户的ID

### 开/关麦克风 {#openMic}

```Java
public void openMic(String userID)
```

* **功能** 打开用户的麦克风
* **返回值** 无
* **参数**
  * userID 用户的ID

> 打开麦克风会触发音频状态变化的回调函数[audioStatusChanged](#audioStatusChanged)
> 新状态参数先会进入到[AOPENING](constant.md#ASTATUS)状态，等服务器处理后才会进入[AOPEN](constant.md#ASTATUS)状态，此时说话才能被采集到；

```Java
public void closeMic(String userID)
```

* **功能** 关闭用户的麦克风
* **返回值** 无
* **参数**
  * userID 用户的ID

> 关麦克风会触发音频状态变化的回调函数[audioStatusChanged](#audioStatusChanged)
> 新状态参数会变为[ACLOSE](constant.md#ASTATUS)
> 关麦操作是立即生效的，会立即停止采集；

### 麦克风状态 {#getAudioStatus}

```Java
public ASTATUS getAudioStatus(String userID)
```

* **功能** 获取用户的麦状态
* **返回值** 麦克风设备状态，详见定义[ASTATUS](contant.md#ASTATUS)
* **参数**
  * userID 登录成功后分配的ID

### 麦克风音量 {#micVolume}

```Java
public boolean setMicVolume(int level)
```

* **功能** 设置麦克风音量大小
* **返回值** 是否成功
* **参数** 
	* level 麦克风音量大小

```Java
public int getMicVolume()
```

* **功能** 获取麦克风音量大小
* **返回值** 麦克风音量大小
* **参数** 无

> 读写属性，音量范围取值 0-255

### 扬声器音量 {#speakerVolume}

```Java
public boolean setSpeakerVolume(int level)
```

* **功能** 设置本地扬声器音量
* **返回值** 是否成功
* **参数** 
	* level 本地扬声器音量

```Java
public int getSpeakerVolume()
```

* **功能** 获取本地扬声器音量
* **返回值** 本地扬声器音量
* **参数** 无

> 读写属性，音量等级取值 0-255

### 扬声器静音 {#speakerMute}

```Java
public void setSpeakerMute(boolean bMute)
```

* **功能**  设置播放是否静音
* **返回值** 是否静音
* **参数** 
	* bMute 播放是否静音

```Java
public boolean getSpeakerMute()
```

* **功能**  获取播放是否静音
* **说明** 是否静音
* **参数**  无

### 声音外放 {#speakerMute}

```Java
public boolean setSpeakerOut(boolean speakerOut)
```

* **功能**  设置外放状态
* **返回值** 是否成功
* **参数** 
	* speakerOut 是否外放

```Java
public boolean getSpeakerMute()
```

* **功能**  获取外放状态
* **返回值** 是否外放
* **参数**  无

### 关闭所有人麦克风 {#setAllAudioClose}

```Java
public void setAllAudioClose()
```

* **功能** 关闭所有用户的麦克风
* **返回值** 无
* **参数** 无

> 调用此接口后会话内其他人的麦克风会关闭，同时收到消息[audioStatusChanged](#audioStatusChanged)

### 摄像头设备列表 {#getAllVideoInfo}

```Java
public ArrayList<UsrVideoInfo> getAllVideoInfo(String userId)
```

* **功能** 获取用户所有的摄像头信息
* **返回值** 用户所有的摄像头信息,详见[UsrVideoInfo](class.md#UsrVideoInfo)说明
* **参数**
  * userID 用户ID

### 视频设置 {#setVideoCfg}

```Java
public void setVideoCfg(VideoCfg cfg)
```

* **功能** 设置摄像头参数
* **返回值** 无
* **参数**
  * cfg 摄像头参数，详见定义[VideoCfg](class.md#VideoCfg)

### 会议内可观看摄像头列表 {#getWatchableVideos}

```Java
public ArrayList<UsrVideoId> getWatchableVideos()
```

* **功能** 获取会议内所有可观看的摄像头
* **返回值** 会议内所有可观看的摄像头,详见定义[UsrVideoId](class.md#UsrVideoId)
* **参数** 无

### 开/关摄像头 {#openVideo}

```Java
public void openVideo(String userID)
```

* **功能** 打开用户的摄像头，以便本地、远端显示视频图像
* **返回值** 无
* **参数**
  * userID 用户的ID
* **回调函数** [openVideoDevRslt](#openVideoDevRslt)

```Java
public void closeVideo(String userID)
```

* **功能** 关闭用户的摄像头
* **返回值** 无
* **参数**
  * userID 用户的ID

> 调用打开和关闭麦克风接口都会触发对应用户的[videoStatusChanged](#videoStatusChanged)

### 视频状态 {#getVideoStatus}

```Java
public VSTATUS getVideoStatus(String userID)
```

* **功能** 获取用户的摄像头状态
* **返回值** 麦克风摄像头状态，请参见[VSTATUS](constant.md#VSTATUS)定义
* **参数**
  * userID 用户的ID

### 获取/设置默认视频 {#setDefaultVideo}

```Java
public short getDefaultVideo(String userID)
```

* **功能** 获取指定用户的默认摄像头
* **返回值** 摄像头ID
* **参数**
  * userID 用户ID

> 如果用户没有摄像头，返回0；

```Java
public void setDefaultVideo(String userID, short videoID)
```

* **功能** 设置默认的摄像头
* **返回值** 无
* **参数**
  * userID 用户ID
  * videoID 摄像头ID

> videoID 应该从[getAllVideoInfo](#getAllVideoInfo)返回值中获取。

### 摄像头图像数据 {#getVideoImg}

```Java
public RawFrame getVideoImg(UsrVideoId usrVideoID)
```

* **功能** 获取指定用户摄像头的最新图像
* **返回值** 指定用户摄像头的最新图像,详见[RawFrame](class.md#RawFrame)
* **参数**
  * UsrVideoId 用户摄像头ID,详见定义[UsrVideoId](class.md#UsrVideoId)

### 屏幕共享状态 {#isScreenShareStarted}

```Java
public boolean isScreenShareStarted()
```

* **功能** 获取屏幕共享是否已开启
* **返回值** 屏幕共享是否已开启
* **参数** 无

### 屏幕共享图像数据 {#getShareScreenDecodeImg}

```Java
public ScreenShareImg getShareScreenDecodeImg()
```

* **功能** 获取屏幕共享解码图像
* **返回值** 屏幕共享解码图像,详见[ScreenShareImg](class.md#ScreenShareImg)说明
* **参数** 无

### 录制内容配置 {#setRecordVideos}

```Java
public void setRecordVideos(ArrayList<RecContentItem> videoIDs)
```

* **功能** 设置要录制的视频
* **返回值** 无
* **参数**
  * videoIDs 要录制的视频,详见定义[RecContentItem](class.md#RecContentItem)、[RecPicContentItem](class.md#RecPicContentItem)、[RecVideoContentItem](class.md#RecVideoContentItem)、[RecMediaContentItem](class.md#RecMediaContentItem)

> 调用startRecording后，录制过程中配置有效

### 开始/停止录制 {#startRecording}

```Java
public boolean startRecording(RecordCfg cfg)
```

* **功能** 开启录制
* **返回值** 开启是否成功
* **参数**
  * cfg 录制参数,详见定义[RecordCfg](class.md#RecordCfg)

```Java
public void stopRecording()
```

* **功能** 停止录制
* **返回值** 无
* **参数** 无

### 录制文件大小 {#getRecFileSize}

```Java
public int recordFileSize()
```

* **功能** 得到录制结果文件大小
* **返回值** 文件大小
* **参数** 无

### 录制时长 {#getRecDuration}

```Java
public int recordDuration()
```

* **功能** 得到录制的时长
* **返回值** 无
* **参数** 无

### 是否加密录制文件 {#setRecordFileEncrypt}

```Java
public void setRecordFileEncrypt(boolean encrypt)
```

* **功能** 设置本地生成的录制文件是否加密
* **返回值** 无
* **参数**
  * encrypt 是否加密

> 未加密的录制文件用其他播放器也可播放，加密后只能利用SDK回放功能才可播放。回放接口为[playbackRecordFile](#playbackRecordFile)

### 录制文件列表 {#getAllRecordFiles}

```Java
public ArrayList<RecordFileShow> getAllRecordFiles()
```

* **功能** 取得所有录制文件信息
* **返回值** 所有录制文件信息,详见定义[RecordFileShow](class.md#RecordFileShow)
* **参数** 无

### 录制列表添加/删除文件 {#addFileToRecordMgr}

```Java
public int addFileToRecordMgr(String fileName, String filePath);
```

* **功能** 添加本地文件到录制文件管理中
* **返回值** -1：本地文件不存在，0：成功，1：文件已经被添加过
* **参数**
  * filename 文件名，不含路径
  * filePath 文件路径，不含文件名

> 第三方录制文件调用此接口后可进行本地回放和上传到视频服务器上，和自己录制的文件一样可以正常在线播放和下载

```Java
public void removeFromFileMgr(String fileName)
```

* **功能**　删除本地的录制文件，上传中的文件会被取消上传
* **返回值**　无
* **参数**
  * filename 文件名

> 已上传完成的服务器文件不受影响


### 上传/取消上传录制文件 {#uploadRecordFile}

```Java
public void uploadRecordFile(String fileName)
```

* **功能** 上传文件
* **返回值** 无
* **参数**
  * filename 文件名

```Java
public void uploadRecordFile(String fileName, String svrPathFileName)
```

* **功能** 上传文件
* **返回值** 无
* **参数**
  * filename 文件名
  * svrPathFileName 服务器目录文件名


```Java
public void cancelUploadRecordFile(String filename)
```

* **功能** 取消上传中的录制文件
* **返回值** 无
* **参数**
  * filename 文件名

### 回放录制文件 {#playbackRecordFile}

```Java
public void playbackRecordFile(String filename)
```

* **功能** 回放录制文件
* **返回值** 无
* **参数**
  * filename 文件名

> 可创建影音控件显示录制内容，功能同接口[startPlayMedia](#startPlayMedia)，如果录制文件被加密，则只能使用playbackRecordFile来回放。

### 设置/获取会话内主功能页 {#switchToPage}

```Java
public void switchToPage(MAIN_PAGE main, SubPage sub)
```

* **功能** 功能切换
* **返回值** 无
* **参数**
  * main 功能类型，详见定义[MAIN_PAGE](constant.md#MAIN_PAGE)
  * sub 子页面标识（如创建白板时返回的boardID），详见定义[SubPage](constant.md#SubPage)

```Java
public MAIN_PAGE getCurrentMainPage()
```

* **功能** 获取当前主功能区
* **返回值**
  * mainPage 当前主功能区，详见定义[MAIN_PAGE](constant.md#MAIN_PAGE)
* **参数** 无

```Java
public SubPage getCurrentSubPage()
```

* **功能** 获取当前子页面
* **返回值** 当前子页面，详见定义[SubPage](constant.md#SubPage)
* **参数** 无

### 获取/设置会议内视频分屏模式 {#setVideoWallMode}

```Java
public int getVideoWallMode()
```

* **功能** 获取视频墙当前分屏模式
* **返回值** 分屏模式，类型见[VIDEO_LAYOUT_MODE](constant.md#VIDEO_LAYOUT_MODE)定义
* **参数** 无

```Java
public void setVideoWallMode(VIDEO_WALL_MODE wallMode)
```

* **功能** 设置视频墙分屏模式
* **返回值** 无
* **参数**
  * videoWallMode 分屏模式，详见定义[VIDEO_WALL_MODE](contant.md#VIDEO_WALL_MODE)

### 主视频 {#mainVideo}

```Java
public void setMainVideo(String userID)
```

* **功能** 设置当前哪个用户为主视频
* **返回值** 无
* **参数**
  * userID 用户ID

```Java
public String getMainVideo()
```

* **功能** 获取当前哪个用户为主视频
* **返回值** 用户ID
* **参数** 无

> 读写属性

### 创建/关闭电子白板 {#createBoard}

```Java
public SubPage createBoard(String title, int width, int height, int pageCount)
```

* **功能** 创建电子白板
* **返回值** 返回boardID，详见定义[SubPage](class.md#SubPage)
* **参数**
  * title 白板名称
  * width 白板宽度
  * height 白板高度
  * pageCount 白板内有多个页（一般空白板1页，文档白板为实际页数）

> 其他参会者会收到[notifyCreateBoard](#notifyCreateBoard)事件；同时后台会记录下白板数据，新入会者会收到[notifyInitBoards](#notifyInitBoards)事件
> 注意：创建完白板后，一定要及尽快调用initBoardPageDat初始化各页数据；如果需要所有参会者同步切到此白板，请调用[switchToPage](#switchToPage)

```Java
public void closeBoard(String boardID)
```

* **功能** 关闭电子白板
* **返回值** 无
* **参数**
  * boardID 白板标识

> 其他参会者将收到notifyCloseBoard事件；同时后台会移除对应白板的所有信息；

### 初始化白板图元数据 {#initBoardPageDat}

```Java
public void initBoardPageDat(SubPage boardID, int boardPageNo, String imgID, String elemets)
```

* **功能** 初始化白板指定页数据
* **返回值** 无
* **参数**
  * boardID 白板标识
  * boardPageNo 白板第几页（0:代表第一页）
  * imgID 白板的背景图片标识（空代表无背影图）
  * elemets 白板的初始图元（空代表无图元，一般在导入历史文件才用到）

> 1. imgID非空时, 代表背景的图片ID(建议为uuid)。（对应的文件应通[uploadNetDiskFile](#uploadNetDiskFile)上传到服务器；）
> 1. 其他参会者将收到[notifyInitBoardPageDat](#notifyInitBoardPageDat)事件；
> 1. 后台会记录下白板的页数据，在新用户入会时，也会收到[notifyInitBoardPageDat](#notifyInitBoardPageDat)事件

### 添加/修改/删除白板图元 {#addBoardElement}

```Java
public String addBoardElement(SubPage boardID, int boardPageNo, BoardElement element)
```

* **功能** 添加图元信息
* **返回值** elementID图元标识
* **参数**
  * boardID 白板标识
  * boardPageNo 白板的页序号(0为第一页)
  * element 图元信息，详见定义[BoardElement](class.md#BoardElement)

> 其他参会者会收到：notifyAddBoardElement事件同时后台会保存图元，新入会者会在[notifyInitBoardPageDat](#notifyInitBoardPageDat)中得到这些图元

```Java
public String modifyBoardElement(String boardID, int boardPageNo, BoardElement element)
```

* **功能** 修改图元信息
* **返回值** elementID图元标识
* **参数**
  * boardID 白板标识
  * boardPageNo 白板的页序号(0为第一页)
  * element 图元信息，参见json格式之[BoardElement](class.md#BoardElement)

> 其他参会者会收到：[notifyModifyBoardElement](#notifyAddBoardElement)事件，同时后台会覆盖对应图元的数据，新入会者会在[notifyInitBoardPageDat](#notifyInitBoardPageDat)中得到这些图元

```Java
public void delBoardElement(String boardID, int boardPageNo, String elementIDs)
```

* **功能** 删除图元
* **返回值** 无
* **参数**
  * boardID 白板标识
  * boardPageNo 白板的页序号(0为第一页)
  * elementIDs 图元id列表，多值时，以“;”分隔，如：“id1;id2”

> 其他参会者会收到[notifyDelBoardElement](#notifyDelBoardElement)事件，同时后台会移除这些图元，新入会者会在[notifyInitBoardPageDat](#notifyInitBoardPageDat)中将不包含这些图元

### 设置白板鼠标热点 {#setMouseHotSpot}

```Java
public void setMouseHotSpot(SubPage boardID, int boardPageNo, int x, int y)
```

* **功能** 设置鼠标热点信息
* **返回值** 无
* **参数**
  * boardID 白板标识，详见定义[SubPage](class.md#SubPage)
  * boardPageNo 白板的页序号(0为第一页)
  * x 屏幕横坐标
  * y 屏幕纵坐标

### 会议网盘容量 {#getNetDiskSummary}

```Java
public void getNetDiskSummary();
```

* **功能** 获取会议网盘的容量信息
* **返回值** 无
* **参数** 无
* **回调函数** [getNetDiskSummaryRslt](#getNetDiskSummaryRslt)

###　获取网盘文件列表 {#getNetDiskFileList}

```Java
public void getNetDiskFileList();
```

* **功能** 获取网盘用户共享文件列表，即：使用makeNetDiskFileID中参数fileType为0的生成的fileID上传的文件
* **返回值** 无
* **参数** 无
* **回调函数** [getNetDiskFileListRslt](#getNetDiskFileListRslt)

### 生成网盘文件ID {#makeNetDiskFileID}

```Java
public String makeNetDiskFileID(int fileType, String newFileName);
```

* **功能** 生成网盘文件全局唯一ID
* **返回值** 网盘文件ID，带相对路径前缀的字符串
* **参数**
  * fileType 文件类型，0用户共享文件，1程序使用文件
  * newFileName 传入的全局唯一文件名，建议带文件后缀

> fileType等于0时，为会议网盘共享文件，上传的文件可通过getNetDiskFileList获取到文件列表详情；fileType等于1时，用户程序内资源文件，如白板的背景图片，无法获取文件详情；两种文件类型都要调用uploadNetDiskFile和downloadNetDiskFile进行上传和下载

### 上传/下载/删除网盘文件 {#uploadNetDiskFile}

```Java
public void uploadNetDiskFile(String fileID, String localFilePath)
```

* **功能** 上传文件到网盘
* **返回值** 无
* **参数**
  * fileID 网盘文件ID
  * localFilePath 本地文件路径，含文件名

```Java
public void downloadNetDiskFile(String fileID, String localFilePath)
```

* **功能** 从网盘中下载文件
* **返回值** 无
* **参数**
  * fileID 网盘文件ID
  * localFilePath 本地文件路径，全路径

```Java
public void deleteNetDiskFile(String fileID)
```

* **功能** 删除网盘文件
* **返回值** 无
* **参数**
  * fileID 网盘文件ID

### 取消网盘文件操作 {#cancleNetDiskFile}

```Java
public void cancleNetDiskFile(String fileID)
```

* **功能** 取消网盘文件操作（上传/下载）
* **返回值** 无
* **参数**
  * fileID 网盘文件ID

### 暂停/继续网盘文件传输 {#setNetDiskTransportPause}

```Java
public void setNetDiskTransportPause(String fileID, bool bTranPause)
```

* **功能** 设置网盘文件传输暂停或继续
* **返回值** 无
* **参数**
  * fileID 网盘文件ID
  * bTranPause 是否暂停

### 影音播放配置 {#setMediaCfg}

```Java
public void setMediaCfg (VideoCfg cfg)
```

* **功能** 配置远程影音共享时，图像质量参数
* **返回值** 无
* **参数**
  * cfg 图像质量参数，详见定义[VideoCfg](class.md#VideoCfg)

```Java
public VideoCfg getMediaCfg ()
```

* **功能** 获取影音共享图像质量参数
* **返回值** 图像质量参数，详见定义[VideoCfg](class.md#VideoCfg)
* **参数** 无

### 开始/暂停/停止影音播放 {#startPlayMedia}

```Java
public void startPlayMedia(String filename, int bLocPlay)
```

* **功能** 播放影音文件
* **返回值** 无
* **参数**
  * filename 文件名，全路径
  * bLocPlay 是否仅仅本地播放（1:本地播放，0：会议内播放）

> 如果播放成功，其他人收到[notifyMediaOpened](#notifyMediaOpened)，如果播放失败，请关注通知事件[notifyMediaStop](#notifyMediaOpened)

```Java
public void pausePlayMedia(boolean bPause)
```

* **功能** 暂停播放影音
* **返回值** 无
* **参数**
  * bPause 是否暂停

```Java
public void stopPlayMedia()
```

* **功能** 停止影音播放
* **返回值** 无
* **参数** 无

> 其他人收到[notifyMediaStop](#notifyMediaOpened)

### 设置播放进度 {#setMediaPlayPos}

```Java
public void setMediaPlayPos(int pos)
```

* **功能** 设置播放进度
* **返回值** 无
* **参数**
  * pos 设置播放位置，单位：毫秒

### 影音文件列表 {#getAllFilesInMediaPath}

```Java
public ArrayList<String> getAllFilesInMediaPath()
```

* **功能** 取得影音文件夹下的所有可播放文件
* **返回值** 文件名列表
* **参数** 无

> 影音文件夹位于方法init的第二个参数sdkFilePath，sdk会在此文件中建立media的子文件夹，即为影音文件夹

### 影音播放信息 {#getMediaInfo}

```Java
public MediaInfo getMediaInfo()
```

* **功能** 取得影音文件信息
* **返回值**
  * 影音文件信息,详见定义[MediaInfo](class.md#MediaInfo)
* **参数**无

### 影音播放音量 {#mediaVolume}

```Java
public void setMediaVolume (int level)
```

* **功能** 设置影音播放的音量
* **返回值** 无
* **参数**
  * level 影音播放的音量，取值范围（0-255）

```Java
public int getMediaVolume ()
```

* **功能** 读取影音播放的音量
* **返回值** 影音播放的音量，取值范围（0-255）
* **参数** 无

### 获取影音图像数据 {#getMediaImg}

```Java
public MediaFrame getMediaImg(String userID)
```

* **功能** 取得影音帧信息
* **返回值** 影音帧信息,详见定义[MediaFrame](class.md#MediaFrame)
* **参数**
  * userID 用户id

### 发送IM文本消息 {#sendIMmsg}

```Java
public String sendIMmsg(String text, String toUsrID, String cookie)
```

* **功能** 发送IM消息
* **返回值** taskID 发送任务id
* **参数**
  * text 发送的文本消息
  * toUsrID 目标用户，如果用户ID为空，消息发送给会议内所有用户
  * cookie 自定义用户数据
* **回调函数** [sendIMmsgRlst](#sendIMmsgRlst)

### 添加图片资源 {#setPicResource}

```Java
public void setPicResource(String resID, Bitmap bitmap)
```

* **功能** 将图片资源设置给sdk
* **返回值** 无
* **参数**
  * picID 资源唯一标识；（可以是guid，也可以序号方式）
  * bitmap 图片对象，为空代表移除资源

```Java
public void setPicResource(String resID, String picFile)
```

* **功能** 将图片资源设置给sdk
* **返回值** 无
* **参数**
  * picID 资源唯一标识；（可以是guid，也可以序号方式）
  * picFile 资源文件路径，为空代表移除资源

```Java
public boolean setPicResource(String resID, View view)
```

* **功能** 将图片资源设置给sdk
* **返回值** 无
* **参数**
  * picID 资源唯一标识；（可以是guid，也可以序号方式）
  * view 控件对象，为空代表移除资源（注：不能是opengl显示控件，必须是在界面已经显示的控件）

## 通知回调函数 {#callback}

### 进入/结束会议结果 {#enterMeetingRslt}

```Java
public void enterMeetingRslt(CRVIDEOSDK_ERR_DEF sdkErr)
```

* **功能** 自己进入会议的结果
* **参数**
  * sdkErr 操作结果码, 详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

```Java
public void stopMeetingRslt(CRVIDEOSDK_ERR_DEF sdkErr)
```

* **功能** 通知结束视频会议结果
* **参数**
  * sdkErr 数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 有人进入/离开会议通知 {#userEnterMeeting}

```Java
public void userEnterMeeting(String userID)
```

* **功能** 某用户进入了会议
* **参数**
  * userID 进入会议的用户id

```Java
public void userLeftMeeting(String userID)
```

* **功能** 某用户离开了会议
* **参数**
  * userID 离开会议的用户id

### 会议掉线通知 {#meetingDropped}

```Java
public void meetingDropped()
```

* **功能** 通知从会议里掉线了，收到该通知后可以调用[enterMeeting](#enterMeeting)尝试重新入会
* **参数** 无

> 如果用到了呼叫队列，掉线后不重新入会就必须调用hungupCall释放本次呼叫

### 会议被结束通知 {#meetingStopped}

```Java
public void meetingStoped()
```

* **功能** 会议已被结束
* **参数** 无

### 网络状态变化通知 {#netStateChanged}

```Java
public void netStateChanged(int level)
```

* **功能** 网络变化通知
* **参数**
  * level 网络状况等级(0~10，10分为最佳网络)

### 麦克风设备变化 {#audioDevChanged}

```Java
public void audioDevChanged()
```

* **功能** 通知本地音频设备有变化
* **参数** 无

### 麦克风状态变化 {#audioStatusChanged}

```Java
public void audioStatusChanged(String userID, ASTATUS oldStatus, ASTATUS newStatus)
```

* **功能** 通知打开本地音频状态变化
* **参数**
  * userID 会议中设备的所有者
  * oldStatus 旧状态，详见定义[ASTATUS](constant.md#ASTATUS)
  * newStatus 新状态，详见定义[ASTATUS](constant.md#ASTATUS)

### 麦克风声音变化 {#micEnergyUpdate}

```Java
public void micEnergyUpdate( String userID, int oldLevel, int newLevel)
```

* **功能** 通知用户的说话声音强度更新
* **参数**
  * userID 用户标识ID
  * oldLevel 原来的说话声音强度(0~10)
  * newLevel 现在的说话声音强度(0~10)

### 打开摄像头结果 {#openVideoDevRslt}

```Java
public void openVideoRslt(String devID, boolean bSuccess)
```

* **功能** 打开摄像头设备操作结果
* **参数**
  * devID 摄像头设备ID
  * bSuccess 是否成功

### 视频状态变化 {#videoStatusChanged}

```Java
public void videoStatusChanged(String userID, VSTATUS oldStatus, VSTATUS newStatus)
```

* **功能** 通知打开本地音频状态变化
* **参数**
  * userID 会议中设备的所有者
  * oldStatus 旧状态，详见定义[VSTATUS](constant.md#VSTATUS)
  * newStatus 新状态，详见定义[VSTATUS](constant.md#VSTATUS)

### 摄像头设备变化 {#videoDevChanged}

```Java
public void videoDevChanged(String userID)
```

* **功能** 通知用户的视频设备有变化
* **参数**
  * userID 设备变化的用户ID

### 通知视频图像数据 {#notifyVideoData}

```Java
public void notifyVideoData(UsrVideoId usrVideoID, long frameTime)
```

* **功能** 通知用户有新的视频数据
* **参数**
  * usrVideoID 用户摄像头标识ID
  * frmTime 图像的创建时间，可用作时间戳

> 收到此通知消息后，可通过getVideoImg获取图像显示；如果之前显示的帧时间和此值一致，说明此帧已显示过，直接忽略即可
> 如果使用了[成员视频UI显示组件](meetingUI.md#videoui)，不再需要自已关注此事件并进行显示处理。

### 默认视频设备变化 {#defVideoChanged}

```Java
public void videoDevChanged(String userID，short videoID)
```

* **功能** 通知用户的视频默认设备有变化
* **参数**
  * userID 设备变化的用户ID
  * videoID 默认设备id

### 录制文件上传/取消上传错误 {#uploadRecordFileErr}

```Java
public void uploadRecordFileErr(String fileName, int err)
```

* **功能** 上传录制文件错误通知
* **参数**
  * fileName 上传文件名
  * sdkErr 操作失败代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

```Java
public void cancelUploadRecordFileErr(int sdkErr)
```

* **功能** 取消上传错误通知
* **参数**
  * sdkErr 操作失败代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 录制错误通知 {#recordErr}

```Java
public void recordErr(int sdkErr)
```

* **功能** 录制异常，录制将自动停止
* **参数**
  * sdkErr 错误信息，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 录制状态变化通知 {#recordStateChanged}

```Java
public void recordStateChanged(int state)
```

* **功能** 录制状态更改通知
* **参数**
  * state 录制状态，数值请参考定义[RECORD_STATE](constant.md#RECORD_STATE)

### 开始/停止屏幕共享通知 {#notifyScreenShareStarted}

```Java
public void notifyScreenShareStarted()
```

* **功能** 通知他人开启了屏幕共享
* **参数** 无

```Java
public void notifyScreenShareStopped()
```

* **功能** 通知他人停止了屏幕共享
* **参数** 无

### 通知屏幕共享图像数据 {#notifyScreenShareData}

```Java
public void notifyScreenShareData(String userID, Rect changedRect, Size frameSize)
```

* **功能** 通知对端屏幕图像有变化
* **参数**
  * userID 对端用户ID
  * changedRect 变化区域信息
  * frameSize 屏幕大小

> 如果使用了[屏幕共享UI显示组件](meetingUI.md#shareui)，不再需要自已关注此事件并进行显示处理。


### 发送IM消息结果 {#sendIMmsgRlst}

```Java
public void sendIMmsgRlst(String taskID, CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 发送IM消息时，通知使用者发送结果
* **参数**
  * taskID 发送任务id
  * sdkErr 操作返回码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

### 通知收到IM消息 {#notifyIMmsg}

```Java
public void notifyIMmsg(String fromUserID, String text, int sendTime)
```

* **功能** 通知收到IM消息
* **参数**
  * fromUserID 消息来源
  * text 消息内容
  * sendTime 消息发送时间戳，从1970开始算起

### 会话内主功能页切换通知 {#notifySwitchToPage}

```Java
public void notifySwitchToPage(MAIN_PAGE mainPage, SubPage pageID)
```

* **功能** 通知功能切换
* **参数**
  * mainPage 功能类型，详见定义[MAIN_PAGE](constant.md#MAIN_PAGE)
  * pageID 子页面标识，详见定义[SubPage](constant.md#SubPage)

### 会话内视频分屏模式通知 {#notifyVideoWallMode}

```Java
public void notifyVideoWallMode(VIDEO_WALL_MODE model)
```

* **功能** 通知视频分屏模式切换
* **参数**
  * model 分屏模式，详见定义[VIDEO_LAYOUT_MODE](constant.md#VIDEO_LAYOUT_MODE)

### 会话内主视频变化通知 {#notifyMainVideoChanged}

```Java
public void notifyMainVideo(String userID)
```

* **功能** 通知主视频更改
* **参数** 
  * userID 主视频用户ID

### 通知初始化电子白板列表 {#notifyInitBoards}

```Java
public void notifyInitBoards(ArrayList<SubPageInfo> boards)
```

* **功能** SDK入会后通知会议中已经存在的白板列表
* **参数**
  * boards 已经创建好的白板列表, 详见定义[SubPageInfo](class.md#SubPageInfo)

### 通知初始化白板内图元数据 {#notifyInitBoardPageDat}

```Java
public void notifyInitBoardPageDat(String boardID, int boardPageNo, String imgID, String elementDatas,String operatorID)
```

* **功能** 初始化白板页数据
* **参数**
  * boardID 白板标识
  * boardPageNo 白板页序号
  * imgID 页背景文件ID（空代表无背景）
  * elementDatas 此页的所有图元, 详见定义[BoardElement](class.md#BoardElement)
  * operatorID 初始化用户（为空时，代表入会时后台事件）

### 通知创建/关闭白板 {#notifyCreateBoard}

```Java
public void notifyCreateBoard(SubPageInfo board, String operatorID)
```

* **功能** 通知创建白板
* **参数**
  * board 白板信息，详见定义[SubPageInfo](class.md#SubPageInfo)
  * operatorID 创建白板的用户ID

```Java
public void notifyCloseBoard(SubPage boardID, String operatorID)
```

* **功能** 通知关闭白板
* **参数**
  * boardID 白板标识，详见定义[SubPage](class.md#SubPage)
  * operatorID 关闭白板的用户ID

### 通知添加/修改/删除白板图元 {#notifyAddBoardElement}

```Java
public void notifyAddBoardElement(SubPage boardID, int boardPageNo, BoardElement element, String operatorID)
```

* **功能** 通知添加图元信息
* **参数**
  * boardID 白板标识，详见定义[SubPage](class.md#SubPage)
  * boardPageNo 白板页序号
  * element 图元信息, 详见定义[BoardElement](class.md#BoardElement)
  * operatorID 添加图元的用户ID

```Java
public void notifyModifyBoardElement(SubPage boardID, int boardPageNo, BoardElement element, String operatorID)
```

* **功能** 通知图元信息被修改
* **参数**
  * boardID 白板标识，详见定义[SubPage](class.md#SubPage)
  * boardPageNo 白板页序号
  * element 图元信息, 详见定义[BoardElement](class.md#BoardElement)
  * operatorID 添加图元的用户ID

> 应从页内找到旧的图元并替换；

```Java
public void notifyDelBoardElement(SubPage boardID, int boardPageNo, ArrayList<ElementID> elementIDs, String operatorID)
```

* **功能** 通知图元被删除
* **参数**
  * boardID 白板标识，详见定义[SubPage](class.md#SubPage)
  * elementIDs 图元id列表，详见定义[ElementID](class.md#ElementID)
  * operatorID 删除图元的用户ID

### 通知白板鼠标热点 {#notifyMouseHotSpot}

```Java
public void notifyMouseHotSpot(SubPage boardID, int boardPageNo, int x, int y, String operatorID)
```

* **功能** 通知鼠标热点消息
* **参数**
  * boardID 白板标识，详见定义[SubPage](class.md#SubPage)
  * x 屏幕横坐标
  * y 屏幕纵坐标
  * operatorID 操作者的用户ID

### 获取网盘容量信息结果 {#getNetDiskSummaryRslt}

```Java
public void getNetDiskSummaryRslt(DiskSummary statRs)
```

* **功能** 通知获取网盘容量信息结果
* **参数**
  * statRs 网盘容量，详见定义[DiskSummary](class.md#DiskSummary)

### 获取网盘容量信息结果 {#getNetDiskSummaryRslt}

```Java
public void notifyNetDiskIsFull()
```

* **功能** 通知网盘空间已满，容量不足
* **参数** 无

### 获取网盘文件列表结果 {#getNetDiskFileListRslt}

```Java
public void getNetDiskFileListRslt(ArrayList<FileInfo> list)
```

* **功能** 通知获取网盘文件列表
* **参数**
  * fileList 网盘文件列表，详见定义[FileInfo](class.md#FileInfo)

### 删除网盘文件结果 {#notifyNetDiskFileDeleteRslt}

```Java
public void notifyNetDiskFileDeleteRslt(String fileID, boolean isSucceed)
```

* **功能** 通知删除网盘文件结果
* **参数**
  * fileID 网盘文件id
  * isSucceed 是否成功

### 通知网盘文件传输进度 {#notifyNetDiskTransforProgress}

```Java
public void notifyNetDiskTransforProgress(String fileID, int percent, int isUpload)
```

* **功能** 通知网盘上传或下载进度
* **参数**
  * fileID 网盘文件id
  * percent 进度0-100
  * isUpload 是否是上传，1上传，0下载

### 通知录制文件状态变化 {#notifyRecordFileStateChanged}

```Java
public void notifyRecordFileStateChanged(String fileName, int state)
```

* **功能** 通知录制文件状态更改
* **参数**
  * fileName 本地文件路径
  * state 状态，0未上传，1上传中，2已上传，3上传失败

### 通知录制文件上传进度 {#notifyRecordFileUploadProgress}

```Java
public void notifyRecordFileUploadProgress(String fileName, int percent)
```

* **功能** 通知录制文件上传进度
* **参数**
  * fileName 本地文件路径
  * percent 进度0-100

### 通知影音打开/播放/暂停/停止 {#notifyMediaOpened}

```Java
public void notifyMediaOpened(int totalTime, int width, int height);
```

* **功能** 通知影音文件打开
* **参数**
  * totalTime 影音时长(毫秒)
  * width 宽度
  * height 高度

```Java
public void notifyMediaStart(String userid)
```

* **功能** 通知影音开始播放
* **参数**
  * userid 操作者的用户id

```Java
public void notifyMediaPause(String userid, int bPause)
```

* **功能** 通知设置鼠标热点消息
* **参数**
  * userid 操作者的用户id
  * bPause 是否暂停，1暂停，0播放

```Java
public void notifyMediaStop(String userid, int reason)
```

* **功能** 通知影音播放停止
* **参数**
  * userid 操作者的用户id
  * reason 播放停止原因，数值参考[MEDIA_STOP_REASON](constant.md#MEDIA_STOP_REASON)

### 通知更新影音播放进度 {#notifyPlayPosSetted}

```Java
public void notifyPlayPosSetted(int setPTS)
```

* **功能** 通知播放进度已设置完成
* **参数**
  * setPTS 播放进度

### 通知影音播放图像数据 {#notifyMemberMediaData}

```Java
public void notifyMemberMediaData(String userid, int curPos)
```

* **功能** 通知影音帧数据已解码完毕
* **参数**
  * userid 操作者的用户id
  * curPos 该影音帧的时间，毫秒为单位

> 收到此通知消息后，可通过[getMediaImg](#getMediaImg)获取图像显示；但如果之前显示的帧时戳更大，说明此通知消息已过时，直接忽略即可；
> 如果使用了[影音共享UI显示组件](meetingUI.md#mediaui)，不再需要自已关注此事件和进行显示处理。

### 通知语音PCM数据 {#notifyAudioPCMDat}

```Java
public void notifyAudioPCMDat(int aSide, byte[] audioDat)
```

* **功能** 通知语音PCM数据
* **参数**
  * aSide 声道类型
  * audioDat PCM数据
