# 视频会议组件 {#vodeoMrg}

>CloudroomVideoMeeting 是会议核心控件，实现通话建立、音频采集播入、视频采集编解码、屏幕共享、录制、影音播放等。 单例组件，整个程序的生命过程中只能有有一个实例。

----

###视频管理函数 {#videoMrgFunction}

####呼叫成功 {#CRVideo_EnterMeeting}

>CRVideo_EnterMeeting(meetID, pswd, userID, nickName, cookie)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|meetID|	number|	视频会话ID|
|pswd|	string	|本次会议中的密码（系统自动生成，在呼叫回调中取得）|
|userID	|string|	用户id|
|nickName	|string	|昵称|
|cookie	|string	|自定义数据 (在回调时，回传给调用者)|

>双方开始进入本次视频会话 操作完成则回调[CRVideo_EnterMeetingRslt](#CRVideo_EnterMeetingRslt)

####离开会话 {#CRVideo_ExitMeeting}

>CRVideo_ExitMeeting()

- **返回值**:无 

>他人离开会话的回调事件[CRVideo_UserLeftMeeting](#CRVideo_UserLeftMeeting)

####获取所有用户的信息 {#CRVideo_GetAllMembers}

>CRVideo_GetAllMembers()

- **返回值**:返回含多个成员信息(Array-[CRVideo_MemberInfo](TypeDefinitions.md#CRVideo_MemberInfo))

####获取指定用户的信息 {#CRVideo_GetMemberInfo}

>CRVideo_GetMemberInfo(userID)

- **返回值**:info - 返回用户userID的成员信息([CRVideo_MemberInfo](TypeDefinitions.md#CRVideo_MemberInfo))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户ID|

####获取某个用户的昵称 {#CRVideo_GetMemberNickName}

>CRVideo_GetMemberNickName(userID) 

- **返回值**:返回用户userID的昵称(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户ID|

 ####判断某个用户是否在会话中 {#CRVideo_IsUserInMeeting}

>CRVideo_IsUserInMeeting(userID)

- **返回值**:如果用户存在则返回true,否则返回false(bool)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户的id|

####获取系统上的麦克风设备列表 {#CRVideo_GetAudioMicNames}

>CRVideo_GetAudioMicNames() 

- **返回值**:返回麦克风设备字符串列表(Array.<string>)

####获取系统上的扬声器设备列表 {#CRVideo_GetAudioSpkNames}

>CRVideo_GetAudioSpkNames()

- **返回值**:返回扬声器设备列表(Array.<string>)

####系统音频参数设置 {#CRVideo_SetAudioCfg}

>CRVideo_SetAudioCfg(cfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cfg | 	[CRVideo_AudioCfg](TypeDefinitions.md#CRVideo_AudioCfg)|	设置参数|

####获取音频参数 {#CRVideo_GetAudioCfg}

>CRVideo_GetAudioCfg()

- **返回值**:返回cfg对象([CRVideo_AudioCfg](TypeDefinitions.md#CRVideo_AudioCfg))

####获取用户说话声音大小 {#CRVideo_GetMicEnergy}

>CRVideo_GetMicEnergy(userID)

- **返回值**:返回音量（0~10）(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|登录成功后分配的userID|

####打开自己的麦克风 {#CRVideo_OpenMic}

>CRVideo_OpenMic(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string	|用户的ID|

>打开自已的麦克风时，先会进入到AOPENING状态，等服务器处理后才会进入AOPEN状态，此时说话才能被采集到

####关闭自己的麦克风 {#CRVideo_CloseMic}

>CRVideo_CloseMic(userID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID |	string	|登录成功后分配的userID|

>关麦操作是立即生效的，本地会立即停止采集

####获取用户的麦状态 麦克风设备状态 {#CRVideo_GetAudioStatus}

>CRVideo_GetAudioStatus(userID)

- **返回值**:返回麦克风状态([CRVideo_ASTATUS](Constant.md#ASTATUS))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|登录成功后分配的userID|

>双方开始进入本次视频会话 操作完成则回调[CRVideo_EnterMeetingRslt](#CRVideo_EnterMeetingRslt)

####获取麦克风音量 {#CRVideo_GetMicVolume}

>CRVideo_GetMicVolume()

- **返回值**:返回麦克风音量（0~255）(number)

####获取本地扬声器音量 {#CRVideo_GetSpeakerVolume}

>CRVideo_GetSpeakerVolume() 

- **返回值**:返回扬声器音量（0~255）(number)

####关闭所有用户的麦克风 {#CRVideo_SetAllAudioClose}

>CRVideo_SetAllAudioClose()

- **返回值**:无

####获取用户所有的摄像头信息 {#CRVideo_GetAllVideoInfo}

>CRVideo_GetAllVideoInfo() 

- **返回值**:返回设备列表(Array.[CRVideo_VideoDeviceInfo](TypeDefinitions.md#CRVideo_VideoDeviceInfo))

####系统视频参数设置 {#CRVideo_SetVideoCfg}

>CRVideo_SetVideoCfg(cfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cfg|	[CRVideo_VideoCfg](TypeDefinitions.md#CRVideo_VideoCfg)|	设置参数| 

####获取会议内所有可观看的摄像头 {#CRVideo_GetWatchableVideos}

>CRVideo_GetWatchableVideos()

- **返回值**:对象VideoIDArray( Array-[CRVideo_VideoIDsObj](TypeDefinitions.md#CRVideo_VideoIDsObj))

>只有摄像头打开才能被获取到,能获取到自已的和会议里其他人的

####打开用户的摄像头 {#CRVideo_OpenVideo}

>CRVideo_OpenVideo(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string	|用户的ID|

>打开用户的摄像头，以便本地、远端显示视频图像

####关闭用户的摄像头 {#CRVideo_CloseVideo}

>CRVideo_CloseVideo(userID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID |	string	|用户ID|

####获取用户的摄像头状态 {#CRVideo_GetVideoStatus}

>CRVideo_GetVideoStatus(userID)

- **返回值**:麦克风摄像头状态([CRVideo_VSTATUS](Constang.md#VSTATUS))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户ID|

####获取指定用户的默认摄像头 {#CRVideo_GetDefaultVideo}

>CRVideo_GetDefaultVideo(userID)

- **返回值**:返回摄像头ID(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户ID|

####设置默认的摄像头 {#CRVideo_SetDefaultVideo}

>CRVideo_SetDefaultVideo(userID, videoID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	| string| 	用户ID| 
| videoID	| number| 	摄像头ID|

####查询用户是否启用多摄像头 {#CRVideo_GetEnableMutiVideo}

>CRVideo_GetEnableMutiVideo(userID)

- **返回值**:返回用户是否多摄像头(bool)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户ID|

####获取指定用户的最新图像 {#CRVideo_GetVideoImg}

>CRVideo_GetVideoImg() 

- **返回值**:返回frame视频数据([CRVideo_VideoImgObj](TypeDefinitions.md#CRVideo_VideoImgObj))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户ID|
|videoID|	number	|设备id|

####获取当前屏幕共享配置 {#CRVideo_GetScreenShareCfg}

>CRVideo_GetScreenShareCfg() 

- **返回值**:屏幕共享配置([CRVideo_ScreenShareCfgObj](TypeDefinitions.md#CRVideo_ScreenShareCfgObj))

####设置屏幕共享配置 {#CRVideo_SetScreenShareCfg}

>CRVideo_SetScreenShareCfg(jsonCfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|jsonCfg	|[CRVideo_ScreenShareCfgObj](TypeDefinitions.md#CRVideo_ScreenShareCfgObj) |	屏幕共享配置| 

####开启屏幕共享 {#CRVideo_StartScreenShare}

>CRVideo_StartScreenShare()

- **返回值**:无

####停止屏幕共享 {#CRVideo_StopScreenShare}

>CRVideo_StopScreenShare()

- **返回值**:无

####获取屏幕共享解码图像 {#CRVideo_GetShareScreenDecodeImg}

>CRVideo_GetShareScreenDecodeImg()

- **返回值**:([CRVideo_VideoImgObj](TypeDefinitions.md#CRVideo_VideoImgObj))

####设置自定义的抓屏图像数据 {#CRVideo_SetCustomizeScreenImg}

>CRVideo_SetCustomizeScreenImg(format, width, heigh, dat)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|format	|[CRVideo_VIDEO_FORMAT](Constant.md#VIDEO_FORMAT)	|视频格式|
|width	|number|	图像的宽度|
|heigh|	number	|图像的高度|
|dat	|string	|承载argb数据,base64编码|

####赋予控制权限 {#CRVideo_GiveCtrlRight}

>CRVideo_GiveCtrlRight(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户ID|

####收回控制权限 {#CRVideo_ReleaseCtrlRight}

>CRVideo_ReleaseCtrlRight(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string	|用户ID|

####发送鼠标控制消息 {#CRVideo_SendMouseCtrlMsg}

>CRVideo_SendMouseCtrlMsg(msgType, mouseMsgType, x, y)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|msgType| [CRVideo_MOUSE_MSG_TYPE](Constant.md#MOUSE_MSG_TYPE)	| 鼠标事件类型| 
| mouseMsgType| 	[CRVideo_MOUSE_KEY_TYPE](Constant.md#MOUSE_KEY_TYPE)| 	鼠标键类型| 
| x| 	number| 	鼠标在屏幕中的横坐标| 
| y	| number| 	鼠标在屏幕中的纵坐标|

####发送键盘控制消息 {#CRVideo_SendKeyCtrlMsg}

>CRVideo_SendKeyCtrlMsg(keyMsgType, vk, bExtendedKey)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|keyMsgType	|[CRVideo_KEY_MSG_TYPE](Constant.md#KEY_MSG_TYPE)|	键盘事件类型|
|vk|	number|	键盘虚拟键值|
|bExtendedKey|	number	|-|

####设置录制视频 (录制过程中可随时设置，改变录制内容) {#CRVideo_SetRecordVideos}

>CRVideo_SetRecordVideos(value)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|value |Array-[CRVideo_RecordVideoInfo](TypeDefinitions.md#CRVideo_RecordVideoInfo) |需要录制的视频数组| 

####开始录制 {#CRVideo_StartRecordIng}

>CRVideo_StartRecordIng(recordPath, audioType, frameRate, recordWidth, recordHeight, bitRate, defaultQP, recDataType, recDataType, isUploadOnRecording)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|recordPath	| string	| 录像存储的路径| 
| audioType| 	[CRVideo_RECORD_AUDIO_TYPE](Constant.md#RECORD_AUDIO_TYPE)| 	音频类型| 
| frameRate	| number| 	帧率，建议不要太高；(取值1~24)| 
| recordWidth	| number| 	视频宽度| 
| recordHeight| 	number	| 视频高度| 
| bitRate	| number| 	录制的最高码率，当图像变化小时，实际码率会低于此值。建议：640*360: 500000; (500kbps)，1280*720：1000000; (1mbps)，1920*1080: 2000000; (2mbps)| 
| defaultQP	| number	| 目标质量(推荐:36, 中:28, 高:22)| 
| recDataType	| [CRVideo_REC_DATATYPE](Constant.md#CRVideo_REC_DATATYPE)| 	录制内容类型（视频+音频）| 
| recDataType| 	number| 	录制内容类型（视频+音频）| 
| isUploadOnRecording	| number| 	是否录制的同时上传 1为是，0为否| 

####停止录制 {#CRVideo_StopRecord}

>CRVideo_StopRecord()

####获取录制的文件时长（以秒为单位） {#CRVideo_GetRecDuration}

>CRVideo_GetRecDuration()

- **返回值**:返回录制的文件时长（以秒为单位）(number)

####获取当前录制的文件大小（以字节为单位） {#CRVideo_GetRecFileSize}

>CRVideo_GetRecFileSize()

- **返回值**:返回录制文件大小（以字节为单位）(number)

####设置本地生成的录制文件是否加密 {#CRVideo_SetRecordFileEncrypt}

>CRVideo_SetRecordFileEncrypt(encrypt)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|encrypt |	number |	1表示加密 0表示不加密| 

####取得所有录制文件信息 {#CRVideo_GetAllRecordFiles}

>CRVideo_GetAllRecordFiles()

- **返回值**:返回含多个录制文件信息(Array-[CRVideo_RecordFileInfo](TypeDefinitions.md#CRVideo_RecordFileInfo))

####取消传输 {#CRVideo_CancelFileTransfer}

>CRVideo_CancelFileTransfer()

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileName	|string	|本地路径文件名|
 
>取消时，只是停止了传输任务，不清理记录及断点文件

####取消上传录像文件 {#CRVideo_CancelUploadRecordFile}

>CRVideo_CancelUploadRecordFile(filename)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	|string	|文件名，全路径|

####上传录像文件 {#CRVideo_UploadRecordFile}

>CRVideo_UploadRecordFile(filename)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	|string	|文件名，全路径| 

####回放录制文件 {#CRVideo_PlaybackRecordFile}

>CRVideo_PlaybackRecordFile(filename)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	|number	|文件名，全路径|

####功能切换 {#CRVideo_Switchtopage}

>CRVideo_Switchtopage(mainPage, pageID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|mainPage |	number |	功能类型 |
|pageID |	string |	子页面标识（如创建白板时返回的boardID）| 

####获取当前主功能区 {#CRVideo_Getcurrentmainpage}

>CRVideo_Getcurrentmainpage()

- **返回值**:功能区([CRVideo_MAIN_PAGE_TYPE](Constant.md#MAIN_PAGE_TYPE))

####获取当前子功能区 {#CRVideo_Getcurrentsubpage}

>CRVideo_Getcurrentsubpage()

- **返回值**:jsonSubPage - 子功能区信息([CRVideo_SubPage](TypeDefinitions.md#CRVideo_SubPage))

####获取视频墙当前分屏模式 {#CRVideo_GetVideoWallMode}

>CRVideo_GetVideoWallMode()

- **返回值**:videoWallMode - 分屏模式([CRVideo_VIDEOLAYOUTMODE](Constant.md#CRVideo_VIDEOLAYOUTMODE))

####设置视频墙分屏模式 {#CRVideo_Setvideowallmode}

>CRVideo_Setvideowallmode(videoWallMode)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|videoWallMode|	[CRVideo_VIDEOLAYOUTMODE](Constant.md#VIDEOLAYOUTMODE)	|分屏模式| 

####获取当前哪个用户为主视频 {#CRVideo_GetMainVideo}

>CRVideo_GetMainVideo()

- **返回值**:无

####创建白板 {#CRVideo_Createboard}

>CRVideo_Createboard(title, width, height, pageCount)

- **返回值**:白板信息

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|title|	string|	白板名称|
|width	|number|	白板宽度|
|height|	number|	白板高度|
|pageCount	|number|	白板内有多个页（一般空白板1页，文档白板为实际页数|

>其他参会者会收到：[CRVideo_NotifyCreateBoard](#CRVideo_NotifyCreateBoard)事件;同时后台会记录下白板数据，新入会者会收到：[CRVideo_NotifyInitBoards](#CRVideo_NotifyInitBoards)事件.注意：创建完白板后，一定要及尽快调用[CRVideo_InitBoardPageDat](#CRVideo_InitBoardPageDat)初始化各页数据

####关闭白板 {#CRVideo_Closeboard}

>CRVideo_Closeboard(boardID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID	|string	|白板标识|

>其他参会者将收到[CRVideo_NotifyCloseBoard](#CRVideo_NotifyCloseBoard)事件；同时后台会移除对应白板的所有信息

####初始化白板指定页数据 {#CRVideo_InitBoardPageDat}

>CRVideo_InitBoardPageDat(boardID, boardPageNo, imgID, elemets)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID | 	string	 | 白板标识 | 
| boardPageNo | 	number | 	白板第几页（0:代表第一页） | 
| imgID	 | string | 	白板的背景图片标识(空代表无背影图) | 
| elemets | 	string	 | 白板的初始图元（空代表无图元，一般在导入历史文件才用到）|

 ####创建一个符合云层要求的图元id {#CRVideo_CreateElementID}

>CRVideo_CreateElementID()

- **返回值**:图元id

>本地操作;所有白板图元id，必须由此接口创建；（历史文件存储的图元id，在会议内不能再使用，应重新创建）

####添加图元信息 {#CRVideo_Addboardelement}

>CRVideo_Addboardelement(boardID, boardPageNo, element)

- **返回值**:elementID ----- 图元标识 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID	|string|	白板标识|
|boardPageNo	|number|	白板的页序号(0为第一页)|
|element|	string	|图元信息，参见json格式之[BoardElementObj](json.md#BoardElementObj)|
   
>其他参会者会收到：[CRVideo_NotifyAddBoardElement](#CRVideo_NotifyAddBoardElement)事件;同时后台会保存图元，新入会者会在[CRVideo_NotifyInitBoardPageDat](#CRVideo_NotifyInitBoardPageDat)中得到这些图元

####修改图元信息 {#CRVideo_ModifyBoardElement}

>CRVideo_ModifyBoardElement(boardID, boardPageNo, element)

- **返回值**:elementID图元标识(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID| 	string	| 白板标识| 
| boardPageNo	| number| 	白板的页序号(0为第一页)| 
| element	 |string| 	图元信息，参见json格式之BoardElementObj|

>说明：其他参会者会收到：[CRVideo_notifyModifyBoardElement](#CRVideo_notifyModifyBoardElement)事件;同时后台会覆盖对应图元的数据，新入会者会在[CRVideo_notifyInitBoardPageDat](#CRVideo_notifyInitBoardPageDat)中得到这些图元

####删除图元 {#CRVideo_Delboardelement}

>CRVideo_Delboardelement(boardID, boardPageNo, elementIDs)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID	|string|	白板标识|
|boardPageNo	|number|	白板的页序号(0为第一页)|
|elementIDs|	string|	图元id列表，多值时，以“;”分隔，如：“id1;id2”|

>说明：其他参会者会收到：[CRVideo_NotifyDelBoardElement](#CRVideo_NotifyDelBoardElement)事件;同时后台会移除这些图元，新入会者会在[CRVideo_NotifyInitBoardPageDat](#CRVideo_NotifyInitBoardPageDat)中将不包含这些图元

####设置鼠标热点消息 {#CRVideo_Setmousehotspot}

>CRVideo_Setmousehotspot(boardID, boardPageNo, x, y)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID | 	string | 	白板标识 | 
| boardPageNo | 	number | 	白板的页序号(0为第一页)
| x	 | number | 	屏幕横坐标 | 
| y | 	number | 	屏幕纵坐标| 

####获取会议网盘的容量信息 {#CRVideo_GetNetDiskSummary}

>CRVideo_GetNetDiskSummary()

- **返回值**:无

>调用结果请见事件[CRVideo_GetNetDiskSummaryRslt](#CRVideo_GetNetDiskSummaryRslt)

####获取网盘用户共享文件列表 {#CRVideo_GetNetDiskFileList}

>CRVideo_GetNetDiskFileList()

- **返回值**:无

>即使用[CRVideo_MakeNetDiskFileID](#CRVideo_MakeNetDiskFileID)中参数fileType为0的生成的fileID上传的文件

####生成网盘文件全局唯一ID {#CRVideo_MakeNetDiskFileID}

>CRVideo_MakeNetDiskFileID(fileType, newFileName)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileType	 |number |	文件类型，0:用户共享文件，1:程序使用文件 |
|newFileName	 |string |	传入的全局唯一文件名，建议带文件后缀 说明：1.fileType等于0时，为会议网盘共享文件，上传的文件可通过; 2.getNetDiskFileList获取到文件列表详情 3.fileType等于1时，用户程序内资源文件，如白板的背景图片，无法获取文件详情 4.两种文件类型都要调用uploadNetDiskFile和downloadNetDiskFile进行上传和下载|

####上传文件到网盘 {#CRVideo_Uploadnetdiskfile}

>CRVideo_Uploadnetdiskfile(fileID, localFilePath)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID| 	string	| 网盘文件ID| 
| localFilePath	| string| 	本地文件路径,含文件名|

####删除网盘文件 {#CRVideo_Deletenetdiskfile}

>CRVideo_Deletenetdiskfile(fileID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID	 |string |	网盘文件ID|

####从网盘中下载文件 {#CRVideo_Downloadnetdiskfile}

>CRVideo_Downloadnetdiskfile(fileID, localFilePath)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID	|string|	网盘文件ID|
|localFilePath	|string|	本地文件路径，全路径|

####取消网盘文件操作（上传/下载 {#CRVideo_Canclenetdiskfile}

>CRVideo_Canclenetdiskfile(fileID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID	|string	|网盘文件ID|

####设置网盘文件传输暂停或继续 {#CRVideo_SetNetDiskTransportPause}

>CRVideo_SetNetDiskTransportPause(fileID, bTranPause)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID	|string	|网盘文件ID|
|bTranPause|	bool|	是否暂停| 

####开始播放影音 {#CRVideo_StartPlayMedia}

>CRVideo_StartPlayMedia(filename, locPlay, bPauseWhenFinished)

- **返回值**:返回值 整形数值，1：正常，0：失败(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	| string| 	文件名，全路径| 
| locPlay	| number| 	是否仅仅本地播放（1:本地播放，0：会议内播放）| 
| bPauseWhenFinished| 	number	| 是否播放完毕自动暂停在最后一帧| 

####配置远程影音共享时，图像质量参数 {#CRVideo_SetMediacfg}

>CRVideo_SetMediacfg(jsonCfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|jsonCfg	|string|	json格式的字符串，详见[VideoCfgOjb](json.md#VideoCfgOjb)说明|

####获取音频参数 {#CRVideo_GetMediacfg}

>CRVideo_GetMediacfg() 

- **返回值**:cfg (string)

####暂停或恢复播放影音 {#CRVideo_PausePlayMedia}

>CRVideo_PausePlayMedia(bPause)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|bPause	|bool	|ture为暂停，false为恢复|

####停止播放影音 {#CRVideo_StopPlayMedia}

>CRVideo_StopPlayMedia()

- **返回值**:无

####设置播放进度 {#CRVideo_SetMediaplaypos}

>CRVideo_SetMediaplaypos(pos)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|pos	|number	|设置播放位置，单位：秒| 

####取得播放路径下的所有可播放文件 {#CRVideo_GetAllFilesInMediaPath}

>CRVideo_GetAllFilesInMediaPath()

- **返回值**:文件名列表(Array.<string>)

####取得影音文件信息 {#CRVideo_Getmediainfo}

>CRVideo_Getmediainfo(userID)

- **返回值**:影音文件信息([CRVideo_MediaInfoObj](TypeDefinitions.md#CRVideo_MediaInfoObj))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户id|

####取得影音帧信息 {#CRVideo_Getmediaimg}

>CRVideo_Getmediaimg(userID)

- **返回值**:帧信息([CRVideo_VideoImgObj](TypeDefinitions.md#CRVideo_VideoImgObj))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户id|

####开始获取语音pcm数据 {#CRVideo_StartGetAudioPCM}

>CRVideo_StartGetAudioPCM(aSide, getType, jsonParam)

- **返回值**:返回值 整形数值，1：正常，0：失败(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|aSide|	number|	声道类型 0:麦克风，1:扬声器|
|getType	|number|	获取方式 0:回调方式，1:保存为文件|
|jsonParam	|string	|当getType=0 表示回调方式, jsonParam可配置回调的数据大小(320-32000)，如: {"EachSize":320};当getType=1 表示保存为文件，jsonParam可配置文件名,如: { "FileName" : "e:\\test.pcm" }| 

####停止获取语音pcm数据 {#CRVideo_StopGetAudioPCM}

>CRVideo_StopGetAudioPCM(aSide, 无返回值)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|aSide	| number| 	声道类型 0:麦克风，1:扬声器| 
| 无返回值| 		|      | 

####发送IM消息 {#CRVideo_SendIMmsg}

>CRVideo_SendIMmsg(text, UserID, cookie) 

- **返回值**:任务id(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|text	|string	|发送的文本消息|
|UserID|	string|	目标用户，如果用户ID为空，消息发送给会议内所有用户|
|cookie	|string	|自定义用户数据|

>响应事件[CRVideo_SendIMmsgRlst](callback.md#CRVideo_SendIMmsgRlst)

####暂未定义 {#CRVideo_SetPicResource}

>CRVideo_SetPicResource(picID, jsonval)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|picID	| string| 	-| 
| jsonval	| object| 	-| 

####创建screenShare对象 {#CRVideo_CreatScreenShareObj}

>CRVideo_CreatScreenShareObj()

- **返回值**:无 

####创建video对象 {#CRVideo_CreatVideoObj}

>CRVideo_CreatVideoObj()

- **返回值**:无 

####获取视频参数 {#CRVideo_GetVideoCfg}

>CRVideo_GetVideoCfg() 

- **返回值**:获取视频参数([CRVideo_VideoCfg](TypeDefinitions.md#CRVideo_VideoCfg))

####设置当前哪个用户为主视频 {#CRVideo_SetMainVideo}

>CRVideo_SetMainVideo(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户ID| 

####设置麦克风音量大小 {#CRVideo_SetMicVolume}

>CRVideo_SetMicVolume(level) 

- **返回值**:设置成功则返回true,否则返回false(bool)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|level	|number	|音量等级（ 取值范围：0~255）| 

####设置本地扬声器音量 {#CRVideo_SetSpeakerVolume}

>CRVideo_SetSpeakerVolume(level)

- **返回值**:设置成功则返回true,否则返回false(bool)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|level	|number|音量等级（ 取值范围：0~255）| 

####创建media对象 {#CRVideo_CreatMediaObj}

>CRVideo_CreatMediaObj()

- **返回值**:无 

----

###会议管理函数 {#videoMrgCallback}

#### 进入会议完成响应 {#CRVideo_EnterMeetingRslt}

>CRVideo_EnterMeetingRslt.callback = function(sdkErr){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### 通知结束视频会议结果 {#CRVideo_StopMeetingRslt}

>CRVideo_StopMeetingRslt.callback = function(sdkErr){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### 某用户进入了会议 {#CRVideo_UserEnterMeeting}

>CRVideo_UserEnterMeeting.callback = function(usrID){}

- usrID ----- 进入会议的用户ID

#### 某用户离开了会议 {#CRVideo_UserLeftMeeting}

>CRVideo_UserLeftMeeting.callback = function(id){}

- id ----- 离开会议的用户ID

#### SDK通知从会议里掉线了 {#CRVideo_MeetingDropped}

>CRVideo_MeetingDropped.callback = function(){}

#### 会议已被结束 {#CRVideo_MeetingStopped}

>CRVideo_MeetingStopped.callback = function(){}

#### SDK通知本地音频设备有变化 {#CRVideo_AudioDevChanged}

>CRVideo_AudioDevChanged.callback = function(){}

#### SDK通知打开本地音频状态变化 {#CRVideo_AudioStatusChanged}

>CRVideo_AudioStatusChanged.callback = function(userID,oldStatus,newStatus){}

- userID ----- 会话中设备的所有者ID
- oldStatus ----- 旧状态
- newStatus ----- 新状态

#### SDK通知用户的说话声音强度更新 {#CRVideo_MicEnergyUpdate}

>CRVideo_MicEnergyUpdate.callback = function(userID,oldLevel,newLevel){}

- userID ----- 用户ID
- oldLevel ----- 原来的说话声音强度
- newLevel ----- 现在的说话声音强度

#### SDK通知打开本地视频状态变化 {#CRVideo_VideoStatusChanged}

>CRVideo_VideoStatusChanged.callback = function(userID,oldStatus,newStatus){}

- userID ----- 会话中设备的所有者ID
- oldStatus ----- 旧状态
- newStatus ----- 新状态

#### SDK通知用户的视频设备有变化 {#CRVideo_VideoDevChanged}

>CRVideo_VideoDevChanged.callback = function(userID){}

- userID ----- 设备变化的用户ID

#### SDK通知用户有新的视频数据 {#CRVideo_NotifyVideoData}

>CRVideo_NotifyVideoData.callback = function(userID,videoId,frmTime){}

- userID ----- 用户标识ID
- videoId ----- 用户的摄像头ID
- frmTime ----- frmTime 图像的创建时戳

#### 上传录制文件错误通知 {#CRVideo_UploadRecordFileErr}

>CRVideo_UploadRecordFileErr.callback = function(fileName,sdkErr){}

- fileName ----- 本地文件路径
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### 录制异常，录制将自动停止 {#CRVideo_RecordErr}

>CRVideo_RecordErr.callback = function(sdkErr){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### 录制状态更改通知 {#CRVideo_RecordStateChanged}

>CRVideo_RecordStateChanged.callback = function(state){}

- state ----- 录制状态,数值请参考定义[RECORD_STATE](Constant.md#RECORD_STATE)

#### 开启屏幕共享的响应事件 {#CRVideo_StartScreenShareRslt}

>CRVideo_StartScreenShareRslt.callback = function(sdkErr){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### 停止屏幕共享的响应事件 {#CRVideo_StopScreenShareRslt}

>CRVideo_StopScreenShareRslt.callback = function(sdkErr){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### 通知他人开启了屏幕共享 {#CRVideo_NotifyScreenShareStarted}

>CRVideo_NotifyScreenShareStarted.callback = function(){}

#### 通知他人停止了屏幕共享 {#CRVideo_NotifyScreenShareStopped}

>CRVideo_NotifyScreenShareStopped.callback = function(){}

#### 通知对端屏幕图像有变化 {#CRVideo_NotifyScreenShareData}

>CRVideo_NotifyScreenShareData.callback = function(userID,rect){}

- userID ----- 用户ID
- rect ----- 变化的区域；（可以只重绘这块区域）

#### 自定义抓屏时，SDK通知使用者抓屏（在收到通知时， 一定要及时CRVideo_SetCustomizeScreenImg，如果没图像时，可以先送入空图像） {#CRVideo_NotifyCatchScreen}

>CRVideo_NotifyCatchScreen.callback = function(){}

#### SDK通知远程控制权限给予了某人 {#CRVideo_NotifyGiveCtrlRight}

>CRVideo_NotifyGiveCtrlRight.callback = function(operId,targetId){}

- operId ----- 操作的用户ID
- targetId ----- 控制权限给予了谁

#### SDK通知收回远程控制 {#CRVideo_NotifyReleaseCtrlRight}

>CRVideo_NotifyReleaseCtrlRight.callback = function(operId,targetId){}

- operId ----- 操作的用户ID
- targetId ----- 收回了谁的控制权限

#### 通知屏幕共享大小改变 {#CRVideo_NotifyShareRectChanged}

>CRVideo_NotifyShareRectChanged.callback = function(w,h){}

- w ----- 宽度
- h ----- 高度

#### 发送IM消息，SDK通知使用者发送结果 {#CRVideo_SendIMmsgRlst}

>CRVideo_SendIMmsgRlst.callback = function(taskID,sdkErr,cookie){}

- taskID ----- 发送任务id
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

#### SDK通知收到IM消息 {#CRVideo_NotifyIMmsg}

>CRVideo_NotifyIMmsg.callback = function(fromUserID,text,sendTime){}

- fromUserID ----- 消息来源
- text ----- 消息内容
- sendTime ----- 消息发送时间戳，从1970开始算起

#### SDK通知功能切换 {#CRVideo_NotifySwitchToPage}

>CRVideo_NotifySwitchToPage.callback = function(mainPage,pageID){}

- mainPage ----- 功能类型
- pageID ----- 子页面标识

#### SDK通知视频分屏模式切换 {#CRVideo_NotifyVideoWallMode}

>CRVideo_NotifyVideoWallMode.callback = function(model){}

- model ----- 分屏模式

#### SDK通知主视频更改 {#CRVideo_NotifyMainVideoChanged}

>CRVideo_NotifyMainVideoChanged.callback = function(operId,targetId){}

#### SDK入会后通知会议中已经存在的白板列表 {#CRVideo_NotifyInitBoards}

>CRVideo_NotifyInitBoards.callback = function(BoardObjs){}

- BoardObjs ----- 已经创建好的白板列表, json结构体请参见BoardObjs说明

#### 初始化白板页数据 {#CRVideo_NotifyInitBoardPageDat}

>CRVideo_NotifyInitBoardPageDat.callback = function(boardID,boardPageNo,imgID,elementDatas,operatorID){}

- boardID ----- 白板标识
- boardPageNo ----- 白板页序号
- imgID ----- 页背景文件ID（空代表无背景）
- elementDatas ----- 此页的所有图元, 详见json结构之BoardElementObjs
- operatorID ----- 初始化用户（为空时，代表入会时后台事件）

#### SDK通知创建白板 {#CRVideo_NotifyCreateBoard}

>CRVideo_NotifyCreateBoard.callback = function(jsonBoard,operatorID){}

- jsonBoard ----- 白板信息，详见json格式之BoardObj
- operatorID ----- 创建白板的用户ID

#### SDK通知关闭白板 {#CRVideo_NotifyCloseBoard}

>CRVideo_NotifyCreateBoard.callback = function(boardID,operatorID){}

- boardID ----- 白板标识
- operatorID ----- 关闭白板的用户ID

#### SDK通知白板背景 {#CRVideo_NotifyBoardBkImage}

>CRVideo_NotifyBoardBkImage.callback = function(subPage,imgFileID,operatorID){}

- subPage ----- 白板信息
- imgFileID ----- 背景图片文件，通过downloadNetDiskFile可下载到本地显示
- operatorID ----- 操作用户ID

#### SDK通知添加图元信息 {#CRVideo_NotifyAddBoardElement}

>CRVideo_NotifyAddBoardElement.callback = function(boardID,boardPageNo,element,operatorID){}

- boardID ----- 白板标识
- boardPageNo ----- 白板页序号
- element ----- 此页的所有图元, 详见json结构之BoardElementObj
- operatorID ----- 添加图元的用户ID

#### SDK通知图元信息被修改 {#CRVideo_NotifyModifyBoardElement}

>CRVideo_NotifyModifyBoardElement.callback = function(boardID,boardPageNo,element,operatorID){}

- boardID ----- 白板标识
- boardPageNo ----- 白板页序号
- element ----- 此页的所有图元, 详见json结构之BoardElementObj
- operatorID ----- 添加图元的用户ID

#### SDK通知删除图元 {#CRVideo_NotifyDelBoardElement}

>CRVideo_NotifyDelBoardElement.callback = function(boardID,boardPageNo,elementIDs,operatorID){}

- boardID ----- 白板标识
- boardPageNo ----- 白板页序号
- elementIDs -----  图元id列表，以 “;”分隔
- operatorID ----- 删除图元的用户ID

#### SDK通知设置鼠标热点消息 {#CRVideo_NotifyMouseHotSpot}

>CRVideo_NotifyMouseHotSpot.callback = function(boardID,x,y,operatorID){}

- boardID ----- 白板标识
- x ----- 屏幕横坐标
- y -----  屏幕纵坐标
- operatorID ----- 操作者的用户ID

#### SDK通知获取网盘容量信息结果 {#CRVideo_GetNetDiskSummaryRslt}

>CRVideo_GetNetDiskSummaryRslt.callback = function(diskLimit,diskUsed){}

- diskLimit ----- 网盘总容量
- diskUsed ----- 网盘已用容量

#### SDK通知获取网盘文件列表 {#CRVideo_GetNetDiskFileListRslt}

>CRVideo_GetNetDiskFileListRslt.callback = function(fileList){}

- fileList ----- 网盘文件列表，json格式，定义见NetDiskObjs

#### SDK通知删除网盘文件结果 {#CRVideo_NotifyNetDiskFileDeleteRslt}

>CRVideo_NotifyNetDiskFileDeleteRslt.callback = function(fileID,isSucceed){}

- fileID ----- 网盘文件id
- isSucceed ----- 是否成功 1 成功 0 失败

#### SDK通知网盘上传或下载进度 {#CRVideo_NotifyNetDiskTransforProgress}

>CRVideo_NotifyNetDiskTransforProgress.callback = function(fileID,percent,isSucceed){}

- fileID ----- 网盘文件id
- percent ----- 进度0-100
- isSucceed ----- 是否成功 1 成功 0 失败

#### SDK通知网盘空间已满，容量不足 {#CRVideo_NotifyNetDiskIsFull}

>CRVideo_NotifyNetDiskIsFull.callback = function(fileList){}

#### SDK通知录制文件状态更改 {#CRVideo_NotifyRecordFileStateChanged}

>CRVideo_NotifyRecordFileStateChanged.callback = function(fileName,state){}

- fileName ----- 本地文件路径
- state ----- 状态 0 未上传 1 上传中 2已上传

#### SDK通知上传录制文件进度 {#CRVideo_NotifyRecordFileUploadProgress}

>CRVideo_NotifyRecordFileUploadProgress.callback = function(fileName,percent){}

- fileName ----- 文件名
- percent ----- 进度0-100

#### SDK通知影音文件打开 {#CRVideo_NotifyMediaOpened}

>CRVideo_NotifyMediaOpened.callback = function(totalTime,w,h){}

- totalTime ----- 影音时长(秒) 
- w ----- 宽度
- h ----- 高度

#### SDK通知影音开始播放 {#CRVideo_NotifyMediaStart}

>CRVideo_NotifyMediaStart.callback = function(userid){}

- userid ----- 操作者的用户id

#### SDK通知影音播放停止 {#CRVideo_NotifyMediaStop}

>CRVideo_NotifyMediaStop.callback = function(userid,reason){}

- userid ----- 操作者的用户id
- reason ----- 播放停止原因 

#### SDK通知设置鼠标热点消息 {#CRVideo_NotifyMediaPause}

>CRVideo_NotifyMediaPause.callback = function(userid,pause){}

- userid ----- 操作者的用户id
- pause ----- 是否暂停 1暂停 0播放 

#### SDK通知播放进度已设置完成 {#CRVideo_NotifyPlayPosSetted}

>CRVideo_NotifyPlayPosSetted.callback = function(setPTS){}

- setPTS ----- 播放进度

#### SDK通知影音帧数据已解码完毕 {#CRVideo_NotifyMemberMediaData}

>CRVideo_NotifyMemberMediaData.callback = function(userid,curPos){}

- userid ----- 操作者的用户id
- curPos ----- 当前播放进度

#### SDK通知用户的视频默认设备有变化 {#CRVideo_DefVideoChanged}

>CRVideo_DefVideoChanged.callback = function(userID,videoID){}

- userID ----- 设备变化的用户ID
- videoID ----- 默认设备id

#### SDK通知我的网络变化 {#CRVideo_NetStateChanged}

>CRVideo_NetStateChanged.callback = function(level){}

- level ----- 网络状况等级(0~10，10分为最佳网络)

#### SDK通知语音PCM数据 {#CRVideo_NotifyAudioPCMDat}

>CRVideo_NotifyAudioPCMDat.callback = function(aSide,base64PcmDat){}

- aSide ----- 声道类型
- base64PcmDat ----- PCM数据(base64格式)