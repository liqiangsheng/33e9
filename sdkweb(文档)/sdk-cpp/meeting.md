# 视频会议组件 {#meeting}

> CloudroomVideoMeeting 是会议核心控件，实现通话建立、音频采集播入、视频采集编解码、屏幕共享、录制、影音播放等。
> 单例组件，整个程序的生命过程中只能有有一个实例。

------

## 接口函数 {#api}

### 进入/退出/结束会议 {#enterMeeting}

```cpp
void enterMeeting(int meetID, string pswd , string userID, string nickName, string cookie)
```

* **功能** 使用会议ID和密码（可为空）进入指定的视频会议
* **返回值** 无
* **参数**
  * meetID 视频会议ID
  * pswd 本次会议中的密码（在创建会议时指定参数）
  * userID 用户账号
  * nickName 用户昵称
  * cookie 自定义数据(在响应消息中回传给调用者)
* **回调函数** [enterMeetingRslt](#enterMeetingRslt)

```cpp
void exitMeeting()
```

* **功能** 离开会议
* **返回值** 无
* **参数** 无

> 调用此接口离开会话时，其他会话用户会收到[userLeftMeeting](#userEnterMeeting)的消息通知

```cpp
void stopMeeting(int meetID, string cookie)
```

* **功能** 结束会议
* **返回值** 无
* **参数**
  * meetID 会议id
  * cookie 自定义数据(在响应消息中回传给调用者)
* **回调函数** [stopMeetingRslt](#enterMeetingRslt)

> 调用此接口结束会议时，其他会话用户会收到 [meetingStopped](#meetingStopped)

### 会议成员列表 {#getAllMembers}

```cpp
string getAllMembers()
```

* **功能** 获取所有用户的信息
* **返回值** json格式的字符串,详见[MemberObjs](json.md#MemberObjs)说明
* **参数** 无

### 会议成员信息 {#getMemberInfo}

```cpp
string getMemberInfo(string userID)
```

* **功能** 获取某个用户的信息
* **返回值** json格式的字符串,详见[MemberObj](json.md#MemberObj)说明
* **参数**
  * userID 用户ID

### 会议成员昵称 {#getMemberNickName}

```cpp
string getMemberNickName(string userID)
```

* **功能** 获取某个用户的昵称
* **返回值** 用户的昵称
* **参数**
  * userID 用户ID

### 用户是否在会议中 {#isUserInMeeting}

```cpp
int isUserInMeeting(string userID)
```

* **功能** 判断某个用户是否在会议中
* **返回值** 1：在，0：不在
* **参数**
  * userID 用户的id

### 麦克风/扬声器列表 {#getAudioMicNames}

```cpp
string getAudioMicNames()
```

* **功能** 获取系统上的麦克风列表
* **返回值** 麦克风设备列表，以’\n’分割；
* **参数** 无

```cpp
string getAudioSpkNames ()
```

* **功能** 获取系统上的扬声器列表
* **返回值** 扬声器列表，以’\n’分割；
* **参数** 无

### 麦克风设置 {#setAudioCfg}

```cpp
void setAudioCfg(string jsonCfg);
```

* **功能** 设置麦克风音频参数
* **返回值** 无
* **参数** 
  * jsonCfg 音频参数json字符串，详见[AudioCfgObj](json.md#AudioCfgObj)说明

### 获取麦克风设置 {#getAudioCfg}

```cpp
string getAudioCfg()
```

* **功能** 获取音频参数
* **返回值** json格式的字符串，详见[AudioCfgObj](json.md#AudioCfgObj)说明
* **参数** 无

### 麦克风声音大小 {#getMicEnergy}

```cpp
int getMicEnergy(string userID)
```

* **功能** 获取用户说话声音大小
* **返回值** 音量大小（0~10）
* **参数**
  * userID 用户的ID

### 开/关麦克风 {#openMic}

```cpp
void openMic(string userID)
```

* **功能** 打开用户的麦克风
* **返回值** 无
* **参数**
  * userID 用户的ID

> 打开麦克风会触发音频状态变化的回调函数[audioStatusChanged](#audioStatusChanged)
> 新状态参数先会进入到[AOPENING](constant.md#ASTATUS)状态，等服务器处理后才会进入[AOPEN](constant.md#ASTATUS)状态，此时说话才能被采集到；

```cpp
void closeMic(string userID)
```

* **功能** 关闭用户的麦克风
* **返回值** 无
* **参数**
  * userID 用户的ID

> 关麦克风会触发音频状态变化的回调函数[audioStatusChanged](#audioStatusChanged)
> 新状态参数会变为[ACLOSE](constant.md#ASTATUS)
> 关麦操作是立即生效的，会立即停止采集；

### 麦克风状态 {#getAudioStatus}

```cpp
int getAudioStatus(string userID)
```

* **功能** 获取用户的麦状态
* **返回值** 麦克风设备状态，请参见[ASTATUS](contant.md#ASTATUS)定义
* **参数**
  * userID 登录成功后分配的ID

### 麦克风音量 {#micVolume}

```cpp
int micVolume
```

* **功能** 设置、获取麦克风音量大小

> 读写属性，音量范围取值 0-255

### 扬声器音量 {#speakerVolume}

```cpp
int speakerVolume
```

* **功能** 设置、获取本地扬声器音量

> 读写属性，音量等级取值 0-255

### 扬声器静音 {#speakerMute}

```cpp
int speakerMute
```

* **功能**  设置、获取播放是否静音
* **说明** 对会议内所有声音生效

> 读写属性，取值 0:不静音, 1:静音

### 关闭所有人麦克风 {#setAllAudioClose}

```cpp
void setAllAudioClose()
```

* **功能** 关闭所有用户的麦克风
* **返回值** 无
* **参数** 无

> 调用此接口后会话内其他人的麦克风会关闭，同时收到消息[audioStatusChanged](#audioStatusChanged)

### 摄像头设备列表 {#getAllVideoInfo}

```cpp
string getAllVideoInfo(string userID)
```

* **功能** 获取用户所有的摄像头信息
* **返回值** json格式的字符串,详见[VideoInfoObjs](json.md#VideoInfoObjs)说明
* **参数**
  * userID 用户ID

### 视频设置 {#setVideoCfg}

```cpp
void setVideoCfg(string jsonCfg)
```

* **功能** 设置摄像头参数
* **返回值** 无
* **参数**
  * jsonCfg json格式的字符串，详见[VideoCfgOjb](json.md#VideoCfgOjb)说明

### 会议内可观看摄像头列表 {#getWatchableVideos}

```cpp
string getWatchableVideos()
```

* **功能** 获取会议内所有可观看的摄像头
* **返回值** json格式的字符串,详见[VideoIDObjs](json.md#VideoIDObjs)说明
* **参数** 无

### 开/关摄像头 {#openVideo}

```cpp
void openVideo(string userID)
```

* **功能** 打开用户的摄像头，以便本地、远端显示视频图像
* **返回值** 无
* **参数**
  * userID 用户的ID
* **回调函数** [openVideoDevRslt](#openVideoDevRslt)

```cpp
void closeVideo(string userID)
```

* **功能** 关闭用户的摄像头
* **返回值** 无
* **参数**
  * userID 用户的ID

> 调用打开和关闭麦克风接口都会触发对应用户的[videoStatusChanged](#videoStatusChanged)

### 视频状态 {#getVideoStatus}

```cpp
VSTATUS getVideoStatus(string userID)
```

* **功能** 获取用户的摄像头状态
* **返回值** 麦克风摄像头状态，请参见[VSTATUS](constant.md#VSTATUS)定义
* **参数**
  * userID 用户的ID

### 获取/设置默认视频 {#setDefaultVideo}

```cpp
int getDefaultVideo(string userID)
```

* **功能** 获取指定用户的默认摄像头
* **返回值** 摄像头ID
* **参数**
  * userID 用户ID

> 如果用户没有摄像头，返回0；

```cpp
void setDefaultVideo(string userID, long videoID)
```

* **功能** 设置默认的摄像头
* **返回值** 无
* **参数**
  * userID 用户ID
  * videoID 摄像头ID

> videoID 应该从[getAllVideoInfo](#getAllVideoInfo)返回值中获取。

### 获取/开关本地多摄像头 {#getEnableMutiVideo}

```cpp
int getEnableMutiVideo(string userID)
```

* **功能** 查询用户是否启用多摄像头
* **返回值** 1 表示开启了，0 表示未开启
* **参数**
  * userID 用户ID

```cpp
void setEnableMutiVideo(string userID, int bEnable)
```

* **功能** 设置用户是否启用多摄像头
* **返回值** 无
* **参数**
  * userID 用户ID
  * bEnable 1表示开启，0表示关闭

> 用于实现一个用户同时打开多个视频设备

### 摄像头图像数据 {#getVideoImg}

```cpp
string getVideoImg(string userID, int videoID)
```

* **功能** 获取指定用户的最新图像
* **返回值** json格式的字符串,详见[VideoImgObj](json.md#VideoImgObj)说明
* **参数**
  * userID 用户ID
  * videoID 摄像头ID

### 屏幕共享配置 {#getScreenShareCfg}

```cpp
string getScreenShareCfg()
```

* **功能** 获取当前屏幕共享配置
* **返回值** json格式的字符串,详见[ScreenShareCfgObj](json.md#ScreenShareCfgObj)说明
* **参数** 无

```cpp
void setScreenShareCfg(string jsonCfg)
```

* **功能** 设置当前屏幕共享配置
* **返回值** 无
* **参数**
  * jsonCfg json格式的字符串,详见[ScreenShareCfgObj](json.md#ScreenShareCfgObj)说明

### 开始/停止屏幕共享 {#startScreenShare}

```cpp
void startScreenShare()
```

* **功能** 开启屏幕共享
* **返回值** 无
* **参数** 无
* **回调函数** [startScreenShareRslt](#startScreenShareRslt)

```cpp
void stopScreenShare ()
```

* **功能** 停止屏幕共享
* **返回值** 无
* **参数** 无
* **回调函数** [stopScreenShareRslt](#stopScreenShareRslt)

### 屏幕共享图像数据 {#getShareScreenDecodeImg}

```cpp
string getShareScreenDecodeImg()
```

* **功能** 获取屏幕共享解码图像
* **返回值** json格式的字符串,详见[VideoImgObj](json.md#VideoImgObj)说明
* **参数** 无

### 自定义的抓屏图像数据 {#setCustomizeScreenImg}

```cpp
void setCustomizeScreenImg(int format, int width, int height, string dat)
```

* **功能** 设置自定义的抓屏图像数据
* **返回值** 无
* **参数**
  * format 参见[VIDEO_FORMAT](constant.md#VIDEO_FORMAT)；
  * width 图像的宽度；
  * height 图像的高度；
  * dat 承载argb数据, base64编码；

> 说明：当前只支持VFMT_ARGB32格式；如果在收到notiyCatchScreen事件时，如当前无图像可送，可送空数据进去(width=0, height=0, dat为空)

### 屏幕共享状态 {#isScreenShareStarted}

```cpp
int isScreenShareStarted
```

* **功能** 检查屏幕共享是否已开启
> 只读属性，只读，0：没有开启，1：已经开启

### 屏幕可共享尺寸 {#supportMaxScreenWidth}

```cpp
int supportMaxScreenWidth
```

* **功能** 支持的最大屏幕宽度

> 只读属性

```cpp
int supportMaxScreenHeight
```

* **功能** 支持的最大屏幕高度

> 只读属性

### 自定义屏幕共享抓取 {#customizeCatchScreen}

```cpp
int customizeCatchScreen
```

* **功能** 设置、获取自定义抓屏功能

> 读写属性, 0：默认抓屏处理；1：自定议抓屏；设置自定义抓屏后，sdk需要图像时将产生notiyCatchScreen事件，使用者再通过setCustomizeScreenImg接口送入图像

### 赋予/收回远程屏幕控制权限 {#giveCtrlRight}

```cpp
void giveCtrlRight(string userID)
```

* **功能** 赋予控制权限
* **返回值** 无
* **参数**
  * userID 目标用户

> 调用此接口后，对方收到[notifyGiveCtrlRight](#notifyGiveCtrlRight)

```cpp
void releaseCtrlRight(string userID)
```

* **功能** 收回控制权限
* **返回值** 无
* **参数**
  * userID 目标用户

> 调用此接口后，对方收到[notifyReleaseCtrlRight](#notifyReleaseCtrlRight)

### 发送鼠标/键盘控制消息 {#sendMouseCtrlMsg}

```cpp
void sendMouseCtrlMsg(int msgType, int key, int ptX, int ptY)
```

* **功能** 发送鼠标控制消息
* **返回值** 无
* **参数**
  * msgType 鼠标事件类型
  * key 鼠标键类型
  * ptX 鼠标在屏幕中的横坐标
  * ptY 鼠标在屏幕中的纵坐标

> msgType 数值详见[MOUSE_MSG_TYPE](constant.md#MOUSE_MSG_TYPE)类型, key 数值详见[MOUSE_KEY_TYPE](#constant.md#MOUSE_KEY_TYPE)类型

```cpp
void sendKeyCtrlMsg(int keyMsgType, int vk, int bExtendedKey)
```

* **功能** 发送键盘控制消息
* **返回值** 无
* **参数**
  * keyMsgType 键盘事件类型
  * vk 键盘虚拟键值
  * bExtendedKey 是否是扩展键值

> keyMsgType数值详见KEY_MSG_TYPE类型

### 录制内容配置 {#setRecordVideos}

```cpp
void setRecordVideos(string json)
```

* **功能** 设置要录制的视频
* **返回值** 无
* **参数**
  * json格式的字符串,详见[RecordContentObj](json.md#RecordContentObj)说明

> 调用startRecording后，录制过程中配置有效

### 开始/停止录制 {#startRecording}

```cpp
int startRecording(string json)
```

* **功能** 开启录制
* **返回值** 0 开启失败，1 开启成功
* **参数**
  * json 录制参数, json格式的字符串,详见[RecordCfgObj](json.md#RecordCfgObj)说明

```cpp
void stopRecording()
```

* **功能** 停止录制
* **返回值** 无
* **参数** 无

### 录制文件大小 {#getRecFileSize}

```cpp
int getRecFileSize()
```

* **功能** 得到录制结果文件大小
* **返回值** 文件大小
* **参数** 无

### 录制时长 {#getRecDuration}

```cpp
int getRecDuration()
```

* **功能** 得到录制的时长
* **返回值** 无
* **参数** 无

### 是否加密录制文件 {#setRecordFileEncrypt}

```cpp
void setRecordFileEncrypt(int encrypt)
```

* **功能** 设置本地生成的录制文件是否加密
* **返回值** 无
* **参数**
  * encrypt 1表示加密，0表示不加密

> 未加密的录制文件用其他播放器也可播放，加密后只能利用SDK回放功能才可播放。回放接口为[playbackRecordFile](#playbackRecordFile)

### 录制文件列表 {#getAllRecordFiles}

```cpp
string getAllRecordFiles()
```

* **功能** 取得所有录制文件信息
* **返回值** json格式的字符串,详见[RecordFileObjs](json.md#RecordFileObjs)
* **参数** 无

### 录制列表添加/删除文件 {#addFileToRecordMgr}

```cpp
int addFileToRecordMgr (string fileName, string filePath)
```

* **功能** 添加本地文件到录制文件管理中
* **返回值** -1：本地文件不存在，0：成功，1：文件已经被添加过
* **参数**
  * filename 文件名，不含路径
  * filePath 文件路径，不含文件名

> 第三方录制文件调用此接口后可进行本地回放和上传到视频服务器上，和自己录制的文件一样可以正常在线播放和下载

```cpp
void removeFromFileMgr(string fileName)
```

* **功能**　删除本地的录制文件，上传中的文件会被取消上传
* **返回值**　无
* **参数**
  * filename 文件名

> 已上传完成的服务器文件不受影响

### 上传/取消上传录制文件 {#uploadRecordFile}

```cpp
void uploadRecordFile(string filename)
```

* **功能** 上传文件在默认位置
* **返回值** 无
* **参数**
  * filename 文件名

```cpp
void uploadRecordFile2(string filename, string svrPathFileName)
```

* **功能** 上传文件到服务器指定位置
* **返回值** 无
* **参数**
  * filename 文件名
  * svrPathFileName 文件存放在服务器上的相对路径文件名（如/AA/BB/CC/test.mp4）

```cpp
void cancelUploadRecordFile(string filename)
```

* **功能** 取消上传中的录制文件
* **返回值** 无
* **参数**
  * filename 文件名

### 回放录制文件 {#playbackRecordFile}

```cpp
void playbackRecordFile(string filename)
```

* **功能** 回放录制文件
* **返回值** 无
* **参数**
  * filename 文件名

> 可创建影音控件显示录制内容，功能同接口[startPlayMedia](#startPlayMedia)，如果录制文件被加密，则只能使用playbackRecordFile来回放。

### 设置/获取会话内主功能页 {#switchToPage}

```cpp
void switchToPage(int mainPage, string pageID)
```

* **功能** 功能切换
* **返回值** 无
* **参数**
  * mainPage 功能类型，数值参见[MAIN_PAGE_TYPE](constant.md#MAIN_PAGE_TYPE)
  * pageID 子页面标识（如创建白板时返回的boardID）

```cpp
int getCurrentMainPage()
```

* **功能** 获取当前主功能区
* **返回值**
  * mainPage 数值参见[MAIN_PAGE_TYPE](constant.md#MAIN_PAGE_TYPE)定义
* **参数** 无

```cpp
string getCurrentSubPage()
```

* **功能** 获取当前子页面
* **返回值** 返回pageID
* **参数** 无

### 获取/设置会议内视频分屏模式 {#setVideoWallMode}

```cpp
int getVideoWallMode()
```

* **功能** 获取视频墙当前分屏模式
* **返回值** 分屏模式，类型见[VIDEO_LAYOUT_MODE](constant.md#VIDEO_LAYOUT_MODE)定义
* **参数** 无

```cpp
void setVideoWallMode(int videoWallMode)
```

* **功能** 设置视频墙分屏模式
* **返回值** 无
* **参数**
  * videoWallMode 分屏模式

> videoWallMode数值参见[VIDEO_LAYOUT_MODE](contant.md#VIDEO_LAYOUT_MODE)定义

### 主视频 {#mainVideo}

```cpp
string mainVideo
```

* **功能** 获取、设置当前哪个用户为主视频

> 读写属性

### 创建/关闭电子白板 {#createBoard}

```cpp
string createBoard(string title, int width, int height, int pageCount)
```

* **功能** 创建电子白板
* **返回值** 返回boardID
* **参数**
  * title 白板名称
  * width 白板宽度
  * height 白板高度
  * pageCount 白板内有多个页（一般空白板1页，文档白板为实际页数）

> 其他参会者会收到[notifyCreateBoard](#notifyCreateBoard)事件；同时后台会记录下白板数据，新入会者会收到[notifyInitBoards](#notifyInitBoards)事件
> 注意：创建完白板后，一定要及尽快调用initBoardPageDat初始化各页数据；如果需要所有参会者同步切到此白板，请调用[switchToPage](#switchToPage)

```cpp
void closeBoard(string boardID)
```

* **功能** 关闭电子白板
* **返回值** 无
* **参数**
  * boardID 白板标识

> 其他参会者将收到notifyCloseBoard事件；同时后台会移除对应白板的所有信息；

### 初始化白板图元数据 {#initBoardPageDat}

```cpp
void initBoardPageDat(string boardID, int boardPageNo, string imgID, string elemets)
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

### 生成白板图元ID {#createElementID}

```cpp
string createElementID()
```

* **功能** 创建一个符合SDK要求的图元id
* **返回值** 图元id
* **参数** 无

> 所有白板图元id，必须由此接口创建；（历史文件存储的图元id，在会议内不能再使用，应重新创建）

### 添加/修改/删除白板图元 {#addBoardElement}

```cpp
string addBoardElement(string boardID, int boardPageNo, string element)
```

* **功能** 添加图元信息
* **返回值** elementID图元标识
* **参数**
  * boardID 白板标识
  * boardPageNo 白板的页序号(0为第一页)
  * element 图元信息，参见json格式之BoardElementObj

> 其他参会者会收到：notifyAddBoardElement事件同时后台会保存图元，新入会者会在[notifyInitBoardPageDat](#notifyInitBoardPageDat)中得到这些图元

string modifyBoardElement(string boardID, int boardPageNo, string element)

* **功能** 修改图元信息
* **返回值** elementID图元标识
* **参数**
  * boardID 白板标识
  * boardPageNo 白板的页序号(0为第一页)
  * element 图元信息，参见json格式之[BoardElementObj](json.md#BoardElementObj)

> 其他参会者会收到：[notifyModifyBoardElement](#notifyAddBoardElement)事件，同时后台会覆盖对应图元的数据，新入会者会在[notifyInitBoardPageDat](#notifyInitBoardPageDat)中得到这些图元

void delBoardElement(string boardID, int boardPageNo, string elementIDs)

* **功能** 删除图元
* **返回值** 无
* **参数**
  * boardID 白板标识
  * boardPageNo 白板的页序号(0为第一页)
  * elementIDs 图元id列表，多值时，以“;”分隔，如：“id1;id2”

> 其他参会者会收到[notifyDelBoardElement](#notifyDelBoardElement)事件，同时后台会移除这些图元，新入会者会在[notifyInitBoardPageDat](#notifyInitBoardPageDat)中将不包含这些图元

### 设置白板鼠标热点 {#setMouseHotSpot}

```cpp
void setMouseHotSpot(string boardID, int boardPageNo, int x, int y)
```

* **功能** 设置鼠标热点信息
* **返回值** 无
* **参数**
  * boardID 白板标识
  * boardPageNo 白板的页序号(0为第一页)
  * x 屏幕横坐标
  * y 屏幕纵坐标

### 会议网盘容量 {#getNetDiskSummary}

```cpp
void getNetDiskSummary();
```

* **功能** 获取会议网盘的容量信息
* **返回值** 无
* **参数** 无
* **回调函数** [getNetDiskSummaryRslt](#getNetDiskSummaryRslt)

###　获取网盘文件列表 {#getNetDiskFileList}

```cpp
void getNetDiskFileList();
```

* **功能** 获取网盘用户共享文件列表，即：使用makeNetDiskFileID中参数fileType为0的生成的fileID上传的文件
* **返回值** 无
* **参数** 无
* **回调函数** [getNetDiskFileListRslt](#getNetDiskFileListRslt)

### 生成网盘文件ID {#makeNetDiskFileID}

```cpp
string makeNetDiskFileID(int fileType, string newFileName);
```

* **功能** 生成网盘文件全局唯一ID
* **返回值** 网盘文件ID，带相对路径前缀的字符串
* **参数**
  * fileType 文件类型，0用户共享文件，1程序使用文件
  * newFileName 传入的全局唯一文件名，建议带文件后缀

> fileType等于0时，为会议网盘共享文件，上传的文件可通过getNetDiskFileList获取到文件列表详情；fileType等于1时，用户程序内资源文件，如白板的背景图片，无法获取文件详情；两种文件类型都要调用uploadNetDiskFile和downloadNetDiskFile进行上传和下载

### 上传/下载/删除网盘文件 {#uploadNetDiskFile}

```cpp
void uploadNetDiskFile(string fileID, string localFilePath)
```

* **功能** 上传文件到网盘
* **返回值** 无
* **参数**
  * fileID 网盘文件ID
  * localFilePath 本地文件路径，含文件名

```cpp
void downloadNetDiskFile(string fileID, string localFilePath)
```

* **功能** 从网盘中下载文件
* **返回值** 无
* **参数**
  * fileID 网盘文件ID
  * localFilePath 本地文件路径，全路径

```cpp
void deleteNetDiskFile(string fileID)
```

* **功能** 删除网盘文件
* **返回值** 无
* **参数**
  * fileID 网盘文件ID

### 取消网盘文件操作 {#cancleNetDiskFile}

```cpp
void cancleNetDiskFile(string fileID)
```

* **功能** 取消网盘文件操作（上传/下载）
* **返回值** 无
* **参数**
  * fileID 网盘文件ID

### 暂停/继续网盘文件传输 {#setNetDiskTransportPause}

```cpp
void setNetDiskTransportPause(string fileID, bool bTranPause)
```

* **功能** 设置网盘文件传输暂停或继续
* **返回值** 无
* **参数**
  * fileID 网盘文件ID
  * bTranPause 是否暂停

### 影音播放配置 {#setMediaCfg}

```cpp
void setMediaCfg (string jsonCfg)
```

* **功能** 配置远程影音共享时，图像质量参数
* **返回值** 无
* **参数**
  * jsonCfg json格式的字符串，详见[VideoCfgOjb](json.md#VideoCfgObj)说明

### 开始/暂停/停止影音播放 {#startPlayMedia}

```cpp
void startPlayMedia(string filename, int bLocPlay, int bPauseWhenFinished)
```

* **功能** 播放影音文件
* **返回值** 无
* **参数**
  * filename 文件名，全路径
  * bLocPlay 是否仅仅本地播放（1:本地播放，0：会议内播放）
  * bPauseWhenFinished 是否播放完毕自动暂停在最后一帧

> 如果播放成功，其他人收到[notifyMediaOpened](#notifyMediaOpened)，如果播放失败，请关注通知事件[notifyMediaStop](#notifyMediaOpened)

```cpp
void pausePlayMedia(int bPause)
```

* **功能** 暂停播放影音
* **返回值** 无
* **参数**
  * bPause 0播放，1暂停

```cpp
void stopPlayMedia()
```

* **功能** 停止影音播放
* **返回值** 无
* **参数** 无

> 其他人收到[notifyMediaStop](#notifyMediaOpened)

### 设置播放进度 {#setMediaPlayPos}

```cpp
void setMediaPlayPos(int pos)
```

* **功能** 设置播放进度
* **返回值** 无
* **参数**
  * pos 设置播放位置，单位：毫秒

### 影音文件列表 {#getAllFilesInMediaPath}

```cpp
string getAllFilesInMediaPath()
```

* **功能** 取得影音文件夹下的所有可播放文件
* **返回值** 文件名列表，以’\n’分割；
* **参数** 无

> 影音文件夹位于方法init的第二个参数sdkFilePath，sdk会在此文件中建立media的子文件夹，即为影音文件夹

### 影音播放信息 {#getMediaInfo}

```cpp
string getMediaInfo()
```

* **功能** 取得影音文件信息
* **返回值**
  * json格式的字符串,详见[MediaInfoObj](json.md#MediaInfoObj)说明
* **参数**无

### 影音播放音量 {#mediaVolume}

```cpp
int mediaVolume
```

* **功能**  读取、设置影音播放的音量

> 读写属性，取值范围，音量等级（0-255）

### 获取影音图像数据 {#getMediaImg}

```cpp
string getMediaImg(string userID)
```

* **功能** 取得影音帧信息
* **返回值** json格式的字符串,详见[VideoImgObj](json.md#VideoImgObj)说明
* **参数**
  * userID 用户id

### 开始/停止获取PCM音频数据 {#startGetAudioPCM}

```cpp
int startGetAudioPCM (int aSide,int getType, string jsonParam)
```

* **功能** 开始获取语音pcm数据
* **返回值** 整形数值，1：正常，0：失败
* **参数**
  * aSide 声道类型，0:麦克风，1:扬声器
  * getType 获取方式，传0,1
    * 0 为回调方式， jsonParam可配置回调的数据大小(320-32000)，如: {"EachSize":320}；
    * 1 为文件保存， jsonParam可配置文件名,如: { "FileName" : "e:\\test.pcm" }
  * jsonParam 参数字符串

>     1. 可同时启动获取"麦克风"、"扬声器"；
>     2. 一种声道，只能选一种获取方式，以最后的配置为准；
>     3. 采用回调方式后，将定期收到notifyAudioPCMDat事件；

```cpp
void stopGetAudioPCM (int aSide);
```

* **功能** 停止获取语音pcm数据
* **返回值** 无
* **参数**
  * aSide 声道类型，0麦克风，1扬声器

### 发送IM文本消息 {#sendIMmsg}

```cpp
string sendIMmsg(string text, string toUsrID, string cookie)
```

* **功能** 发送IM消息
* **返回值** taskID 发送任务id
* **参数**
  * text 发送的文本消息
  * toUsrID 目标用户，如果用户ID为空，消息发送给会议内所有用户
  * cookie 自定义用户数据
* **回调函数** [sendIMmsgRlst](#sendIMmsgRlst)

### 添加图片资源 {#setPicResource}

```cpp
void setPicResource(string picID, string jsonVal)
```

* **功能** 将图片资源设置给sdk
* **返回值** 无
* **参数**
  * picID 资源唯一标识；（可以是guid，也可以序号方式）
  * jsonVal 资源内容，json格式，详见[PicResourceObj](json.md#PicResourceObj)说明。

> 注：如果jsonVal为空串，代表移除资源。

## 通知回调函数 {#callback}

### 进入/结束会议结果 {#enterMeetingRslt}

```cpp
void enterMeetingRslt(int sdkErr)
```

* **功能** 自己进入会议的结果
* **参数**
  * sdkErr 操作结果码, 0代表入会成功, 非0代表入会失败，取值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

```cpp
void stopMeetingRslt(int sdkErr)
```

* **功能** 通知结束视频会议结果
* **参数**
  * sdkErr 数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 有人进入/离开会议通知 {#userEnterMeeting}

```cpp
void userEnterMeeting(string userID)
```

* **功能** 某用户进入了会议
* **参数**
  * userID 进入会议的用户id

```cpp
void userLeftMeeting(string userID)
```

* **功能** 某用户离开了会议
* **参数**
  * userID 离开会议的用户id

### 会议掉线通知 {#meetingDropped}

```cpp
void meetingDropped()
```

* **功能** 通知从会议里掉线了，收到该通知后可以调用[enterMeeting](#enterMeeting)尝试重新入会
* **参数** 无

> 如果用到了呼叫队列，掉线后不重新入会就必须调用hungupCall释放本次呼叫

### 会议被结束通知 {#meetingStopped}

```cpp
void meetingStoped()
```

* **功能** 会议已被结束
* **参数** 无

### 网络状态变化通知 {#netStateChanged}

```cpp
void netStateChanged(long level)
```

* **功能** 网络变化通知
* **参数**
  * level 网络状况等级(0~10，10分为最佳网络)

### 麦克风设备变化 {#audioDevChanged}

```cpp
void audioDevChanged()
```

* **功能** 通知本地音频设备有变化
* **参数** 无

### 麦克风状态变化 {#audioStatusChanged}

```cpp
void audioStatusChanged(string userID, int oldStatus, int newStatus)
```

* **功能** 用户的音频状态变化通知
* **参数**
  * userID 会议中设备的所有者
  * oldStatus 旧状态，数值参考麦克风状态定义[ASTATUS](constant.md#ASTATUS)
  * newStatus 新状态，数值参考麦克风状态定义[ASTATUS](constant.md#ASTATUS)

### 麦克风声音变化 {#micEnergyUpdate}

```cpp
void micEnergyUpdate( string userID, int oldLevel, int newLevel)
```

* **功能** 通知用户的说话声音强度更新
* **参数**
  * userID 用户标识ID
  * oldLevel 原来的说话声音强度(0~10)
  * newLevel 现在的说话声音强度(0~10)

### 打开摄像头结果 {#openVideoDevRslt}

```cpp
void openVideoDevRslt(string devID, bool isSucceed)
```

* **功能** 打开摄像头设备操作结果
* **参数**
  * devID 摄像头设备ID
  * isSucceed 是否成功

### 视频状态变化 {#videoStatusChanged}

```cpp
void videoStatusChanged(string userID, int oldStatus, int newStatus)
```

* **功能** 用户的视频状态变化通知
* **参数**
  * userID 会议中设备的所有者
  * oldStatus 旧状态，数值参考[摄像头状态定义](constant.md#VSTATUS)
  * newStatus 新状态，数值参考[摄像头状态定义](constant.md#VSTATUS)

### 摄像头设备变化 {#videoDevChanged}

```cpp
void videoDevChanged(string userID)
```

* **功能** 通知用户的视频设备有变化
* **参数**
  * userID 设备变化的用户ID

### 通知视频图像数据 {#notifyVideoData}

```cpp
void notifyVideoData(string userID, int videoID, int frameTime)
```

* **功能** 通知用户有新的视频数据
* **参数**
  * userID 用户标识ID
  * videoID 用户的摄像头ID
  * frmTime 图像的创建时间，可用作时间戳

> 收到此通知消息后，可通过getVideoImg获取图像显示；如果之前显示的帧时间和此值一致，说明此帧已显示过，直接忽略即可；
> 如果使用了[成员视频UI显示组件](meetingUI.md#videoui)，不再需要自已关注此事件并进行显示处理。

### 默认视频设备变化 {#defVideoChanged}

```cpp
void videoDevChanged(string userID，int videoID)
```

* **功能** 通知用户的视频默认设备有变化
* **参数**
  * userID 设备变化的用户ID
  * videoID 默认设备id

### 录制文件上传/取消上传错误 {#uploadRecordFileErr}

```cpp
void uploadRecordFileErr(int sdkErr)
```

* **功能** 上传录制文件错误通知
* **参数**
  * sdkErr 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 录制错误通知 {#recordErr}

```cpp
void recordErr(int sdkErr)
```

* **功能** 录制异常，录制将自动停止
* **参数**
  * sdkErr 错误信息，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 录制状态变化通知 {#recordStateChanged}

```cpp
void recordStateChanged(int state)
```

* **功能** 录制状态更改通知
* **参数**
  * state 录制状态，数值请参考定义[RECORD_STATE](constant.md#RECORD_STATE)

### 开始/停止屏幕共享操作结果 {#startScreenShareRslt}

```cpp
void startScreenShareRslt(int sdkErr)
```

* **功能** 开启屏幕共享的响应事件
* **参数**
  * sdkErr 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

```cpp
void stopScreenShareRslt (int sdkErr)
```

* **功能** 停止屏幕共享的响应事件
* **参数**
  * sdkErr 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 开始/停止屏幕共享通知 {#notifyScreenShareStarted}

```cpp
void notifyScreenShareStarted()
```

* **功能** 通知他人开启了屏幕共享
* **参数** 无

```cpp
void notifyScreenShareStopped()
```

* **功能** 通知他人停止了屏幕共享
* **参数** 无

### 通知屏幕共享图像数据 {#notifyScreenShareData}

```cpp
void notifyScreenShareData(string userID, string datInfo)
```

* **功能** 通知对端屏幕图像有变化
* **参数**
  * userID 对端用户ID
  * datInfo 屏幕大小、变化区域信息

> datInfo，json格式，结构如下示例：

```json
{"screenWidth":1366, "screenHeight":768, "changeLeft":50, "changeTop":50, "changeWidth":100 ,"changeHeight":100}
```

> 如果使用了[屏幕共享UI显示组件](shareui.md)，不再需要自已关注此事件并进行显示处理。

### 自定义抓屏通知 {#notiyCatchScreen}

```cpp
void notiyCatchScreen()
```

* **功能** 自定义抓屏时，通知使用者抓屏
* **参数** 无

> 在收到通知时， 一定要及时[setCustomizeScreenImg](#setCustomizeScreenImg)，如果没图像时，可以先送入空图像；

### 通知赋予/收回屏幕共享操作权限 {#notifyGiveCtrlRight}

```cpp
void notifyGiveCtrlRight(string operId, string targetId)
```

* **功能** 通知被赋予了远程控制权限
* **参数**
  * operId 操作的用户id
  * targetId 控制权限给予了谁

```cpp
void notifyReleaseCtrlRight(string operId, string targetId)
```

* **功能** 通知被收回了远程控制权限
* **参数**
  * operId 操作的用户id
  * targetId 收回了谁的控制权限

### 通知屏幕共享区域变化 {#notifyShareRectChanged}

```cpp
void notifyShareRectChanged(int x，int y, int w, int h)
```

* **功能** 通知屏幕共享区域变化
* **参数**
  * x，y 位置
  * w 宽度
  * h 高度

### 发送IM消息结果 {#sendIMmsgRlst}

```cpp
void sendIMmsgRlst(string taskID, int sdkErr, string cookie)
```

* **功能** 发送IM消息时，通知使用者发送结果
* **参数**
  * taskID 发送任务id
  * sdkErr 数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

### 通知收到IM消息 {#notifyIMmsg}

```cpp
void notifyIMmsg(string fromUserID, string text, int sendTime)
```

* **功能** 通知收到IM消息
* **参数**
  * fromUserID 消息来源
  * text 消息内容
  * sendTime 消息发送时间戳，从1970开始算起

### 会话内主功能页切换通知 {#notifySwitchToPage}

```cpp
void notifySwitchToPage(int mainPage, string pageID)
```

* **功能** 通知功能切换
* **参数**
  * mainPage 功能类型，参见[MAIN_PAGE_TYPE](constant.md#MAIN_PAGE_TYPE)定义
  * pageID 子页面标识

### 会话内视频分屏模式通知 {#notifyVideoWallMode}

```cpp
void notifyVideoWallMode(int model)
```

* **功能** 通知视频分屏模式切换
* **参数**
  * model 分屏模式，参见[VIDEO_LAYOUT_MODE](constant.md#VIDEO_LAYOUT_MODE)定义

### 会话内主视频变化通知 {#notifyMainVideoChanged}

```cpp
void notifyMainVideoChanged()
```

* **功能** 通知主视频更改
* **参数** 无

### 通知初始化电子白板列表 {#notifyInitBoards}

```cpp
void notifyInitBoards(string BoardObjs)
```

* **功能** SDK入会后通知会议中已经存在的白板列表
* **参数**
  * BoardObjs 已经创建好的白板列表, json结构请参见[BoardObjs](json.md#BoardObjs)说明

### 通知初始化白板内图元数据 {#notifyInitBoardPageDat}

```cpp
void notifyInitBoardPageDat(string boardID, int boardPageNo, string imgID, string elementDatas,string operatorID)
```

* **功能** 初始化白板页数据
* **参数**
  * boardID 白板标识
  * boardPageNo 白板页序号
  * imgID 页背景文件ID（空代表无背景）
  * elementDatas 此页的所有图元, 详见json结构之[BoardElementObjs](json.md#BoardElementObjs)
  * operatorID 初始化用户（为空时，代表入会时后台事件）

### 通知创建/关闭白板 {#notifyCreateBoard}

```cpp
void notifyCreateBoard(string jsonBoard, string operatorID)
```

* **功能** 通知创建白板
* **参数**
  * jsonBoard 白板信息，详见json格式之[BoardObj](json.md#BoardObj)
  * operatorID 创建白板的用户ID

```cpp
void notifyCloseBoard(string boardID, string operatorID)
```

* **功能** 通知关闭白板
* **参数**
  * boardID 白板标识
  * operatorID 关闭白板的用户ID

### 通知添加/修改/删除白板图元 {#notifyAddBoardElement}

```cpp
void notifyAddBoardElement(string boardID, int boardPageNo, string element, string operatorID)
```

* **功能** 通知添加图元信息
* **参数**
  * boardID 白板标识
  * boardPageNo 白板页序号
  * element 图元信息, 详见json结构之[BoardElementObj](json.md#BoardElementObj)
  * operatorID 添加图元的用户ID

```cpp
void notifyModifyBoardElement(string boardID, int boardPageNo, string element, string operatorID)
```

* **功能** 通知图元信息被修改
* **参数**
  * boardID 白板标识
  * boardPageNo 白板页序号
  * element 图元信息, 详见json结构之[BoardElementObj](json.md#BoardElementObj)
  * operatorID 添加图元的用户ID

> 应从页内找到旧的图元并替换；

```cpp
void notifyDelBoardElement(string boardID, int boardPageNo, string elementIDs, string operatorID)
```

* **功能** 通知图元被删除
* **参数**
  * boardID 白板标识
  * elementIDs 图元id列表，以 “;”分隔
  * operatorID 删除图元的用户ID

### 通知白板鼠标热点 {#notifyMouseHotSpot}

```cpp
void notifyMouseHotSpot(string boardID, int boardPageNo, int x, int y, string operatorID)
```

* **功能** 通知鼠标热点消息
* **参数**
  * boardID 白板标识
  * x 屏幕横坐标
  * y 屏幕纵坐标
  * operatorID 操作者的用户ID

### 获取网盘容量信息结果 {#getNetDiskSummaryRslt}

```cpp
void getNetDiskSummaryRslt(unsigned int diskLimit, unsigned int diskUsed)
```

* **功能** 通知获取网盘容量信息结果
* **参数**
  * diskLimit 网盘总容量
  * diskUsed 网盘已用容量

### 获取网盘文件列表结果 {#getNetDiskFileListRslt}

```cpp
void getNetDiskFileListRslt(string fileList);
```

* **功能** 通知获取网盘文件列表
* **参数**
  * fileList 网盘文件列表，json格式，定义见[NetFileObjs](json.md#NetFileObjs)

### 删除网盘文件结果 {#notifyNetDiskFileDeleteRslt}

```cpp
void notifyNetDiskFileDeleteRslt(string fileID, int isSucceed)
```

* **功能** 通知删除网盘文件结果
* **参数**
  * fileID 网盘文件id
  * isSucceed 是否成功，1成功，0失败

### 通知网盘文件传输进度 {#notifyNetDiskTransforProgress}

```cpp
void notifyNetDiskTransforProgress(string fileID, int percent, int isUpload)
```

* **功能** 通知网盘上传或下载进度
* **参数**
  * fileID 网盘文件id
  * percent 进度0-100
  * isUpload 是否是上传，1上传，0下载

### 通知录制文件状态变化 {#notifyRecordFileStateChanged}

```cpp
void notifyRecordFileStateChanged(string fileName, int state)
```

* **功能** 通知录制文件状态更改
* **参数**
  * fileName 本地文件路径
  * state 状态，0未上传，1上传中，2已上传，3上传失败

### 通知录制文件上传进度 {#notifyRecordFileUploadProgress}

```cpp
void notifyRecordFileUploadProgress(string fileName, int percent)
```

* **功能** 通知录制文件上传进度
* **参数**
  * fileName 本地文件路径
  * percent 进度0-100

### 通知影音打开/播放/暂停/停止 {#notifyMediaOpened}

```cpp
void notifyMediaOpened(int totalTime, int width, int height);
```

* **功能** 通知影音文件打开
* **参数**
  * totalTime 影音时长(毫秒)
  * width 宽度
  * height 高度

```cpp
void notifyMediaStart(string userid)
```

* **功能** 通知影音开始播放
* **参数**
  * userid 操作者的用户id

```cpp
void notifyMediaPause(string userid, int bPause)
```

* **功能** 通知设置鼠标热点消息
* **参数**
  * userid 操作者的用户id
  * bPause 是否暂停，1暂停，0播放

```cpp
void notifyMediaStop(string userid, int reason)
```

* **功能** 通知影音播放停止
* **参数**
  * userid 操作者的用户id
  * reason 播放停止原因，数值参考[MEDIA_STOP_REASON](constant.md#MEDIA_STOP_REASON)

### 通知更新影音播放进度 {#notifyPlayPosSetted}

```cpp
void notifyPlayPosSetted(int setPTS)
```

* **功能** 通知播放进度已设置完成
* **参数**
  * setPTS 播放进度

### 通知影音播放图像数据 {#notifyMemberMediaData}

```cpp
void notifyMemberMediaData(string userid, int curPos)
```

* **功能** 通知影音帧数据已解码完毕
* **参数**
  * userid 操作者的用户id
  * curPos 该影音帧的时间，毫秒为单位

> 收到此通知消息后，可通过[getMediaImg](#getMediaImg)获取图像显示；但如果之前显示的帧时戳更大，说明此通知消息已过时，直接忽略即可；
> 如果使用了[影音共享UI显示组件](meetingUI.md#mediaui)，不再需要自已关注此事件和进行显示处理。

### 通知语音PCM数据 {#notifyAudioPCMDat}

```cpp
void notifyAudioPCMDat(int aSide, string base64PcmDat)
```

* **功能** 通知语音PCM数据
* **参数**
  * aSide 声道类型
  * base64PcmDat PCM数据(base64格式)
