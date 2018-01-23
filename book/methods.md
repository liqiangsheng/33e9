# 方法 {#methods}

>方法的定义

####接受系统安排的客户 {#CRVideo_AcceptAssignUser}

>CRVideo_AcceptAssignUser(queID, userID, cookie)

| 参数     | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID|	string	|队列ID|
|userID|	string	|队列中的用户ID|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

####接受对方发起的视频请求 {#CRVideo_AcceptCall}

>CRVideo_AcceptCall(callID, meetObj, usrExtDat, cookie)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|callID	|string	|呼叫ID|
|meetObj|	[CRVideo_MeetInfoObj](TypeDefinitions.md#CRVideo_MeetInfoObj)	|会议信息|
|usrExtDat|	string|	自定义扩展参数|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

>开始进入视频会话 操作成功则回调[CRVideo_AcceptCallSuccess](callback.md#CRVideo_AcceptCallSuccess),失败则回调[CRVideo_AcceptCallFail](callback.md#CRVideo_AcceptCallFail)。

####添加图元信息 {#CRVideo_Addboardelement}

>CRVideo_Addboardelement(boardID, boardPageNo, element)

- **返回值**:elementID ----- 图元标识 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID	|string|	白板标识|
|boardPageNo	|number|	白板的页序号(0为第一页)|
|element|	string	|图元信息，参见json格式之[BoardElementObj](json.md#BoardElementObj)|
   
>其他参会者会收到：[notifyAddBoardElement](callback.md#CRVideo_NotifyAddBoardElement)事件;同时后台会保存图元，新入会者会在[notifyInitBoardPageDat](callback.md#notifyInitBoardPageDat)中得到这些图元

####第三方录制文件调用此接口后可进行本地回放和上传到服务器record下 {#CRVideo_AddFileToRecordMgr}

>CRVideo_AddFileToRecordMgr()

- **返回值**:1：本地文件不存在，0：成功，1：文件已经被添加过
   
####发起呼叫，邀请用户参加视频会话 {#CRVideo_Call}

>CRVideo_Call(calledUserID, meetObj, usrExtDat, cookie) 

- **返回值**:返回本次呼叫标识码（呼叫ID） 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|calledUserID	|string	|被叫用户的账户ID|
|meetObj	|[CRVideo_MeetInfoObj](TypeDefinitions.md#CRVideo_MeetInfoObj)	|会议信息|
|usrExtDat	|string	|自定义扩展参数|
|cookie	|string	|自定义数据(在回调时，回传给调用者)|
 
>操作成功则回调[CRVideo_CallSuccess](callback.md#CRVideo_CallSuccess),失败则回调[CRVideo_CallFail](callback.md#CRVideo_CallSuccess)。 呼叫时，对方迟迟不响应，30秒后系统自动结束呼叫
    
####取消传输 {#CRVideo_CancelFileTransfer}

>CRVideo_CancelFileTransfer()

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileName	|string	|本地路径文件名|
 
>取消时，只是停止了传输任务，不清理记录及断点文件

####取消数据发送 {#CRVideo_CancelSend}

>CRVideo_CancelSend(taskID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|taskID	|string	|任务ID|
 
>取消数据发送 操作完成则回调[CRVideo_CancelSendRlst](callback.md#CRVideo_CancelSendRlst)

####取消上传录像文件 {#CRVideo_CancelUploadRecordFile}

>CRVideo_CancelUploadRecordFile(filename)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	|string	|文件名，全路径|
 
####取消网盘文件操作（上传/下载 {#CRVideo_Canclenetdiskfile}

>CRVideo_Canclenetdiskfile(fileID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID	|string	|网盘文件ID|

####取消第3方呼叫 {#CRVideo_ClientCancelInvite}

>CRVideo_ClientCancelInvite(inviteID, cookie)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|inviteID	|string|	邀请标识码（邀请ID|
|cookie|	string|	自定义数据 (在回调时，回传给调用者)|

>结果事件[clientCancelInviteRslt](callback.md#CRVideo_ClientCancelInviteRslt)，根据sdkErr判断是否成功

####2方通话时呼叫第3方 {#CRVideo_ClientInvite}

>CRVideo_ClientInvite(called, meetObj, cookie)

- **返回值**:本次邀请标识码（邀请ID

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|called|	string	|被叫用户的账户ID|
|meetObj	|CRVideo_MeetInfoObj|	当前会议信息(json结构体请参见MeetInfoObj)|
|cookie|	string|	自定义数据 (在回调时，回传给调用者)|

>结果事件[CRVideo_ClientInviteRslt](callback.md#CRVideo_ClientInviteRslt)，根据sdkErr判断是否成功

####关闭白板 {#CRVideo_Closeboard}

>CRVideo_Closeboard(boardID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID	|string	|白板标识|

>其他参会者将收到[notifyCloseBoard](callback.md#CRVideo_NotifyCreateBoard)事件；同时后台会移除对应白板的所有信息

####关闭自己的麦克风 {#CRVideo_CloseMic}

>CRVideo_CloseMic(userID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID |	string	|登录成功后分配的userID|

>关麦操作是立即生效的，本地会立即停止采集

####关闭用户的摄像头 {#CRVideo_CloseVideo}

>CRVideo_CloseVideo(userID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID |	string	|用户ID|

####创建白板 {#CRVideo_Createboard}

>CRVideo_Createboard(title, width, height, pageCount)

- **返回值**:白板信息

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|title|	string|	白板名称|
|width	|number|	白板宽度|
|height|	number|	白板高度|
|pageCount	|number|	白板内有多个页（一般空白板1页，文档白板为实际页数|

>其他参会者会收到：[notifyCreateBoard事件](callback.md#CRVideo_NotifyCreateBoard);同时后台会记录下白板数据，新入会者会收到：[notifyInitBoards](callback.md#CRVideo_NotifyInitBoards)事件.注意：创建完白板后，一定要及尽快调用[CRVideo_InitBoardPageDat](#CRVideo_InitBoardPageDat)初始化各页数据

####创建一个符合云层要求的图元id {#CRVideo_CreateElementID}

>CRVideo_CreateElementID()

- **返回值**:图元id

>本地操作;所有白板图元id，必须由此接口创建；（历史文件存储的图元id，在会议内不能再使用，应重新创建）

####创建会议 {#CRVideo_CreateMeeting}

>CRVideo_CreateMeeting(meetSubject, createPswd, cookie)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|meetSubject|	string	|会议主题（字符长度最大值50）|
|createPswd|	number	|是否创建会议密码（=0时：会议无密码，>0时：密码由系统自动生成）|
|cookie	|string	|自定义数据 (在回调时，回传给调用者)|

>操作成功则回调[CRVideo_CreateMeetingSuccess](callback.md#CRVideo_CreateMeetingSuccess),失败则回调[CRVideo_CreateMeetingFail](callback.md#CRVideo_CreateMeetingFail)

####创建screenShare对象 {#CRVideo_CreatScreenShareObj}

>CRVideo_CreatScreenShareObj()

- **返回值**:无 

####创建media对象 {#CRVideo_CreatMediaObj}

>CRVideo_CreatMediaObj()

- **返回值**:无 

####创建video对象 {#CRVideo_CreatVideoObj}

>CRVideo_CreatVideoObj()

- **返回值**:无 

####删除图元 {#CRVideo_Delboardelement}

>CRVideo_Delboardelement(boardID, boardPageNo, elementIDs)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID	|string|	白板标识|
|boardPageNo	|number|	白板的页序号(0为第一页)|
|elementIDs|	string|	图元id列表，多值时，以“;”分隔，如：“id1;id2”|

>说明：其他参会者会收到：[notifyDelBoardElement](callback.md#CRVideo_NotifyDelBoardElement)事件;同时后台会移除这些图元，新入会者会在[notifyInitBoardPageDat](callback.md#CRVideo_NotifyInitBoardPageDat)中将不包含这些图元

####删除网盘文件 {#CRVideo_Deletenetdiskfile}

>CRVideo_Deletenetdiskfile(fileID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID	 |string |	网盘文件ID|

####结束会话 {#CRVideo_DestroyMeeting}

>CRVideo_DestroyMeeting(meetID, cookie)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|meetID	|number	|会议id|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

>[CRVideo_StopMeetingRslt](callback.md#CRVideo_StopMeetingRslt)，会话被他人结束回调事件[CRVideo_MeetingStopped](callback.md#CRVideo_MeetingStopped)

####从网盘中下载文件 {#CRVideo_Downloadnetdiskfile}

>CRVideo_Downloadnetdiskfile(fileID, localFilePath)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID	|string|	网盘文件ID|
|localFilePath	|string|	本地文件路径，全路径|

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

>双方开始进入本次视频会话 操作完成则回调[CRVideo_EnterMeetingRslt](callback.md#CRVideo_EnterMeetingRslt)

####离开会话 {#CRVideo_ExitMeeting}

>CRVideo_ExitMeeting()

- **返回值**:无 

>他人离开会话的回调事件[CRVideo_UserLeftMeeting](callback.md#CRVideo_UserLeftMeeting)

####取得播放路径下的所有可播放文件 {#CRVideo_GetAllFilesInMediaPath}

>CRVideo_GetAllFilesInMediaPath()

- **返回值**:文件名列表(Array.<string>)

####获取所有用户的信息 {#CRVideo_GetAllMembers}

>CRVideo_GetAllMembers()

- **返回值**:返回含多个成员信息(Array-[CRVideo_MemberInfo](TypeDefinitions.md#CRVideo_MemberInfo))

####获取所有队列信息 {#CRVideo_GetAllQueueInfo}

>CRVideo_GetAllQueueInfo() 

- **返回值**:返回所有队列信息(Array-[CRVideo_QueueInfo](TypeDefinitions.md#CRVideo_QueueInfo))

####取得所有录制文件信息 {#CRVideo_GetAllRecordFiles}

>CRVideo_GetAllRecordFiles()

- **返回值**:返回含多个录制文件信息(Array-[CRVideo_RecordFileInfo](TypeDefinitions.md#CRVideo_RecordFileInfo))

####获取本地所有上传、下载文件信息 {#CRVideo_GetAllTransferInfos}

>CRVideo_GetAllTransferInfos() 

- **返回值**:filelist - 返回文件信息列表 (Array.[CRVideo_FileInfo](TypeDefinitions.md#CRVideo_FileInfo))

####获取用户所有的摄像头信息 {#CRVideo_GetAllVideoInfo}

>CRVideo_GetAllVideoInfo() 

- **返回值**:返回设备列表(Array.[CRVideo_VideoDeviceInfo](TypeDefinitions.md#CRVideo_VideoDeviceInfo))

####获取音频参数 {#CRVideo_GetAudioCfg}

>CRVideo_GetAudioCfg()

- **返回值**:返回cfg对象([CRVideo_AudioCfg](TypeDefinitions.md#CRVideo_AudioCfg))

####获取系统上的麦克风设备列表 {#CRVideo_GetAudioMicNames}

>CRVideo_GetAudioMicNames() 

- **返回值**:返回麦克风设备字符串列表(Array.<string>)

####获取系统上的扬声器设备列表 {#CRVideo_GetAudioSpkNames}

>CRVideo_GetAudioSpkNames()

- **返回值**:返回扬声器设备列表(Array.<string>)

####获取用户的麦状态 麦克风设备状态 {#CRVideo_GetAudioStatus}

>CRVideo_GetAudioStatus(userID)

- **返回值**:返回麦克风状态([CRVideo_ASTATUS](Constant.md#ASTATUS))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|登录成功后分配的userID|

>双方开始进入本次视频会话 操作完成则回调[CRVideo_EnterMeetingRslt](callback.md#CRVideo_EnterMeetingRslt)

####获取当前主功能区 {#CRVideo_Getcurrentmainpage}

>CRVideo_Getcurrentmainpage()

- **返回值**:功能区([CRVideo_MAIN_PAGE_TYPE](Constant.md#MAIN_PAGE_TYPE))

####获取当前子功能区 {#CRVideo_Getcurrentsubpage}

>CRVideo_Getcurrentsubpage()

- **返回值**:jsonSubPage - 子功能区信息([CRVideo_SubPage](TypeDefinitions.md#CRVideo_SubPage))

####获取指定用户的默认摄像头 {#CRVideo_GetDefaultVideo}

>CRVideo_GetDefaultVideo(userID)

- **返回值**:返回摄像头ID(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户ID|

####查询用户是否启用多摄像头 {#CRVideo_GetEnableMutiVideo}

>CRVideo_GetEnableMutiVideo(userID)

- **返回值**:返回用户是否多摄像头(bool)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户ID|

####获取当前哪个用户为主视频 {#CRVideo_GetMainVideo}

>CRVideo_GetMainVideo()

- **返回值**:无

####获取音频参数 {#CRVideo_GetMediacfg}

>CRVideo_GetMediacfg() 

- **返回值**:cfg (string)

####取得影音帧信息 {#CRVideo_Getmediaimg}

>CRVideo_Getmediaimg(userID)

- **返回值**:帧信息([CRVideo_VideoImgObj](TypeDefinitions.md#CRVideo_VideoImgObj))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户id|

####取得影音文件信息 {#CRVideo_Getmediainfo}

>CRVideo_Getmediainfo(userID)

- **返回值**:影音文件信息([CRVideo_MediaInfoObj](TypeDefinitions.md#CRVideo_MediaInfoObj))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|用户id|

####获取会议列表 {#CRVideo_GetMeetings}

>CRVideo_GetMeetings(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	 |string	|自定义数据 (在回调时，回传给调用者)|

>响应事件[CRVideo_GetMeetingsSuccess](callback.md#CRVideo_GetMeetingsSuccess)，会话被他人结束回调事件[CRVideo_GetMeetingsFail](callback.md#CRVideo_GetMeetingsFail)

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

####获取用户说话声音大小 {#CRVideo_GetMicEnergy}

>CRVideo_GetMicEnergy(userID)

- **返回值**:返回音量（0~10）(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	 |string	|登录成功后分配的userID|

####获取麦克风音量 {#CRVideo_GetMicVolume}

>CRVideo_GetMicVolume()

- **返回值**:返回麦克风音量（0~255）(number)

####获取网盘用户共享文件列表 {#CRVideo_GetNetDiskFileList}

>CRVideo_GetNetDiskFileList()

- **返回值**:无

>即使用[makeNetDiskFileID](#CRVideo_MakeNetDiskFileID)中参数fileType为0的生成的fileID上传的文件

####获取会议网盘的容量信息 {#CRVideo_GetNetDiskSummary}

>CRVideo_GetNetDiskSummary()

- **返回值**:无

>调用结果请见事件[getNetDiskSummaryRslt](callback.md#CRVideo_GetNetDiskSummaryRslt)

####获取队列状态 {#CRVideo_GetQueueStatus}

>CRVideo_GetQueueStatus(queID)

- **返回值**:返回队列信息([CRVideo_QueueInfo](TypeDefinitions.md#CRVideo_QueueInfo))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	 |string	|队列ID|

####获取我的排队信息 {#CRVideo_GetQueuingInfo}

>CRVideo_GetQueuingInfo()

- **返回值**:返回排队信息([CRVideo_QueueInfo](TypeDefinitions.md#CRVideo_QueueInfo))

####获取录制的文件时长（以秒为单位） {#CRVideo_GetRecDuration}

>CRVideo_GetRecDuration()

- **返回值**:返回录制的文件时长（以秒为单位）(number)

####获取当前录制的文件大小（以字节为单位） {#CRVideo_GetRecFileSize}

>CRVideo_GetRecFileSize()

- **返回值**:返回录制文件大小（以字节为单位）(number)

####获取当前屏幕共享配置 {#CRVideo_GetScreenShareCfg}

>CRVideo_GetScreenShareCfg() 

- **返回值**:屏幕共享配置([CRVideo_ScreenShareCfgObj](TypeDefinitions.md#CRVideo_ScreenShareCfgObj))

####获取服务器地址 {#CRVideo_GetServerAddr}

>CRVideo_GetServerAddr()

- **返回值**:返回服务器地址(string)

####获取我服务的所有队列 {#CRVideo_GetServingQueues}

>CRVideo_GetServingQueues() 

- **返回值**:返回我服务的队列列表(Array.<string>

####获取我的会话信息 {#CRVideo_GetSessionInfo}

>CRVideo_GetSessionInfo()

- **返回值**:info - 返回会话信息([CRVideo_SessionInfo](TypeDefinitions.md#CRVideo_SessionInfo))

####获取屏幕共享解码图像 {#CRVideo_GetShareScreenDecodeImg}

>CRVideo_GetShareScreenDecodeImg()

- **返回值**:([CRVideo_VideoImgObj](TypeDefinitions.md#CRVideo_VideoImgObj))

####获取本地扬声器音量 {#CRVideo_GetSpeakerVolume}

>CRVideo_GetSpeakerVolume() 

- **返回值**:返回扬声器音量（0~255）(number)

####获取本地上传、下载文件信息 {#CRVideo_GetTransferInfo}

>CRVideo_GetTransferInfo()

- **返回值**:fileinfo - 返回文件信息([CRVideo_FileInfo](TypeDefinitions.md#CRVideo_FileInfo))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filePathName	 |string	|本地完整路径文件名(路径中要求有“CloudroomVideoSDK”)|

####获取用户在线状态 {#CRVideo_GetUserStatus}

>CRVideo_GetUserStatus(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	 |number	|自定义数据(在回调时，回传给调用者)，不需要时传空字符串|

####获取视频参数 {#CRVideo_GetVideoCfg}

>CRVideo_GetVideoCfg() 

- **返回值**:获取视频参数([CRVideo_VideoCfg](TypeDefinitions.md#CRVideo_VideoCfg))

####获取指定用户的最新图像 {#CRVideo_GetVideoImg}

>CRVideo_GetVideoImg() 

- **返回值**:返回frame视频数据([CRVideo_VideoImgObj](TypeDefinitions.md#CRVideo_VideoImgObj))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户ID|
|videoID|	number	|设备id|

####获取用户的摄像头状态 {#CRVideo_GetVideoStatus}

>CRVideo_GetVideoStatus(userID)

- **返回值**:麦克风摄像头状态([CRVideo_VSTATUS](Constang.md#VSTATUS))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户ID|

####获取视频墙当前分屏模式 {#CRVideo_GetVideoWallMode}

>CRVideo_GetVideoWallMode()

- **返回值**:videoWallMode - 分屏模式([CRVideo_VIDEOLAYOUTMODE](Constant.md#CRVideo_VIDEOLAYOUTMODE))

####获取会议内所有可观看的摄像头 {#CRVideo_GetWatchableVideos}

>CRVideo_GetWatchableVideos()

- **返回值**:对象VideoIDArray( Array-[CRVideo_VideoIDsObj](TypeDefinitions.md#CRVideo_VideoIDsObj))

>只有摄像头打开才能被获取到,能获取到自已的和会议里其他人的

####赋予控制权限 {#CRVideo_GiveCtrlRight}

>CRVideo_GiveCtrlRight(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户ID|

####挂断正在进行的视频呼叫或视频通话 {#CRVideo_HungupCall}

>CRVideo_HungupCall(callID, usrExtDat, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|callID	 | string | 	呼叫ID | 
 | usrExtDat	 | string	 | 自定义扩展参数 | 
 | cookie | 	string | 	自定义数据 (在回调时，回传给调用者)|

>操作成功则回调[CRVideo_HangupCallSuccess](callback.md#CRVideo_HangupCallSuccess),失败则回调[CRVideo_HangupCallFail](callback.md#CRVideo_HangupCallFail)

####SDK初始化 {#CRVideo_Init}

>CRVideo_Init(oemID, sdkUsePath, statCallSer, statMediaSer, statHttp)

- **返回值**:返回错误码（错误码为CRVideo_NOERR表示没有错误）(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|oemID	| string	| 开发商ID,没有特别要求可填"CLOUDROOM"| 
| sdkUsePath| 	string	| sdk配置、临时文件存放位置，可为空| 
| statCallSer| 	number	| 是否启用callSer模块 0为不启用，1为启用,默认为1| 
| statMediaSer| 	number| 	是否启用mediaSer模块 0为不启用，1为启用,默认为1| 
| statHttp	| number	| 是否启用http模块 0为不启用，1为启用,默认为0|

####初始化白板指定页数据 {#CRVideo_InitBoardPageDat}

>CRVideo_InitBoardPageDat(boardID, boardPageNo, imgID, elemets)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID | 	string	 | 白板标识 | 
 | boardPageNo | 	number | 	白板第几页（0:代表第一页） | 
 | imgID	 | string | 	白板的背景图片标识(空代表无背影图) | 
 | elemets | 	string	 | 白板的初始图元（空代表无图元，一般在导入历史文件才用到）|

 ####初始化用户队列功能数据 {#CRVideo_InitQueueDat}

>CRVideo_InitQueueDat(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

>操作完成回调[CRVideo_InitQueueDatRslt](callback.md#CRVideo_InitQueueDatRslt)，初始化成功后才可获取队列队列相关信息

 ####判断某个用户是否在会话中 {#CRVideo_IsUserInMeeting}

>CRVideo_IsUserInMeeting(userID)

- **返回值**:如果用户存在则返回true,否则返回false(bool)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户的id|

####登录 {#CRVideo_Login}

>CRVideo_Login(authAcnt, authPswd, nickName, privAcnt, privAuthCode, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|authAcnt	|string	|云屋鉴权帐号|
|authPswd	|string|	云屋鉴权密码|
|nickName	|string|	昵称|
|privAcnt	|string|	自定义帐号，不需要时传空字符串|
|privAuthCode|	string|	自定义验证码(有复杂要求的，可以使用json格式)，不需要时传空字符串|
|cookie	|string	|自定义数据 (在回调时，回传给调用者)|

>操作成功则回调[CRVideo_LoginSuccess](callback.md#CRVideo_LoginSuccess),失败则回调[CRVideo_LoginFail](callback.md#CRVideo_LoginFail)

####注销本次登陆 {#CRVideo_Logout}

>CRVideo_Logout()

- **返回值**:无

####生成网盘文件全局唯一ID {#CRVideo_MakeNetDiskFileID}

>CRVideo_MakeNetDiskFileID(fileType, newFileName)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileType	 |number |	文件类型，0:用户共享文件，1:程序使用文件 |
|newFileName	 |string |	传入的全局唯一文件名，建议带文件后缀 说明：1.fileType等于0时，为会议网盘共享文件，上传的文件可通过; 2.getNetDiskFileList获取到文件列表详情 3.fileType等于1时，用户程序内资源文件，如白板的背景图片，无法获取文件详情 4.两种文件类型都要调用uploadNetDiskFile和downloadNetDiskFile进行上传和下载|

####修改图元信息 {#CRVideo_ModifyBoardElement}

>CRVideo_ModifyBoardElement(boardID, boardPageNo, element)

- **返回值**:elementID图元标识(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID| 	string	| 白板标识| 
| boardPageNo	| number| 	白板的页序号(0为第一页)| 
| element	 |string| 	图元信息，参见json格式之BoardElementObj|

>说明：其他参会者会收到：[notifyModifyBoardElement](callback.md#CRVideo_notifyModifyBoardElement)事件;同时后台会覆盖对应图元的数据，新入会者会在[notifyInitBoardPageDat](callback.md#CRVideo_notifyInitBoardPageDat)中得到这些图元

####打开自己的麦克风 {#CRVideo_OpenMic}

>CRVideo_OpenMic(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string	|用户的ID|

>打开自已的麦克风时，先会进入到AOPENING状态，等服务器处理后才会进入AOPEN状态，此时说话才能被采集到

####打开用户的摄像头 {#CRVideo_OpenVideo}

>CRVideo_OpenVideo(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string	|用户的ID|

>打开用户的摄像头，以便本地、远端显示视频图像

####暂停或恢复播放影音 {#CRVideo_PausePlayMedia}

>CRVideo_PausePlayMedia(bPause)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|bPause	|bool	|ture为暂停，false为恢复|

####回放录制文件 {#CRVideo_PlaybackRecordFile}

>CRVideo_PlaybackRecordFile(filename)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	|number	|文件名，全路径|

####获取Plugin版本号 {#CRVideo_PluginVersion}

>CRVideo_PluginVersion()

- **返回值**:返回Plugin版本号(string)

####刷新所有队列状态信息 {#CRVideo_RefreshAllQueueStatus}

>CRVideo_RefreshAllQueueStatus()

- **返回值**:无

>操作完成则触发[CRVideo_QueueStatusChanged](callback.md#CRVideo_QueueStatusChanged)（当前排队的队列，或服务的队列，sdk自动有状态变化回调； 其它队列则需要此函数来查

####拒绝系统安排的客户 {#CRVideo_RejectAssignUser}

>CRVideo_RejectAssignUser(queID, userID, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	 | string | 	队列ID | 
|userID | 	string | 	队列中的用户ID | 
|cookie	 | string | 	自定义数据 (在回调时，回传给调用者)|

####拒绝对方的视频请求 {#CRVideo_RejectCall}

>CRVideo_RejectCall(callID, usrExtDat, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|callID	|string	|呼叫ID|
|usrExtDat|	string	|自定义扩展参数|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

>操作成功则回调[CRVideo_RejectCallSuccess](callback.md#CRVideo_RejectCallSuccess),失败则回调[CRVideo_RejectCallFail](callback.md#CRVideo_RejectCallFail)

####收回控制权限 {#CRVideo_ReleaseCtrlRight}

>CRVideo_ReleaseCtrlRight(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string	|用户ID|

####删除本地的录制文件 {#CRVideo_RemoveFromFileMgr}

>CRVideo_RemoveFromFileMgr(filename)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	|string	|文件名，全路径|

>上传中的文件会被取消上传

####请求分配一个客户 {#CRVideo_ReqAssignUser}

>CRVideo_ReqAssignUser(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	|string	|自定义数据 (在回调时，回传给调用者)|

>当关闭免打扰时，系统将自动分配客户，无需调用此函数； 当开启免打扰时，系统不再自动分配客户，座席如需服务客户可使用此函数分配

####删除传输记录及相关文件 {#CRVideo_RmTransferInfo}

>CRVideo_RmTransferInfo()

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileName|	string	|本地路径文件名|
|bRemoveLocFile|	number|	是否移除本地文件,为1时， 那么上传的源始文件、下载的临时文件或结果文件都将被移除。|

####获取sdk所在的目录 {#CRVideo_SdkPath}

>CRVideo_SdkPath()

- **返回值**:返回sdk所在的目录(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileName|	string	|本地路径文件名|
|bRemoveLocFile|	number|	是否移除本地文件,为1时， 那么上传的源始文件、下载的临时文件或结果文件都将被移除。|

####发送大块数据(分块发送 {#CRVideo_SendBuffer}

>CRVideo_SendBuffer(targetUserId, data)

- **返回值**:分配的任务ID(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|targetUserId	|string	|目标用户ID|
|data|	string|	发送的数据|

>进度通知事件[CRVideo_SendProgress](callback.md#CRVideo_SendProgress),发送结果事件[CRVideo_SendBufferRlst](callback.md#CRVideo_SendBufferRlst),取消发送[CRVideo_CancelSend](#CRVideo_CancelSend))

####发送小块数 {#CRVideo_SendCmd}

>CRVideo_SendCmd(targetUserId, data) 

- **返回值**:分配的任务ID(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|targetUserId	|string	|目标用户ID|
|data|	string|	发送的数据|

>一次性发送不会有进度通知,发送结果事件[CRVideo_SendCmdRlst](callback.md#CRVideo_SendCmdRlst),CRVideo_SendCmd不能被[CRVideo_CancelSend](#CRVideo_CancelSend))

####发送文件(分块发送 {#CRVideo_SendFile}

>CRVideo_SendFile(targetUserId, fileName)

- **返回值**:分配的任务ID(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|targetUserId	|string	|目标用户ID|
|data|	string|	发送的数据|

>进度通知事件[CRVideo_SendProgress](callback.md#CRVideo_SendProgress),发送结果事件[CRVideo_SendFileRlst](callback.md#CRVideo_SendFileRlst),取消发送[CRVideo_CancelSend](#CRVideo_CancelSend))

####发送IM消息 {#CRVideo_SendIMmsg}

>CRVideo_SendIMmsg(text, UserID, cookie) 

- **返回值**:任务id(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|text	|string	|发送的文本消息|
|UserID|	string|	目标用户，如果用户ID为空，消息发送给会议内所有用户|
|cookie	|string	|自定义用户数据|

>响应事件[CRVideo_SendIMmsgRlst](callback.md#CRVideo_SendIMmsgRlst)

####发送键盘控制消息 {#CRVideo_SendKeyCtrlMsg}

>CRVideo_SendKeyCtrlMsg(keyMsgType, vk, bExtendedKey)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|keyMsgType	|[CRVideo_KEY_MSG_TYPE](Constant.md#KEY_MSG_TYPE)|	键盘事件类型|
|vk|	number|	键盘虚拟键值|
|bExtendedKey|	number	|-|

####发送鼠标控制消息 {#CRVideo_SendMouseCtrlMsg}

>CRVideo_SendMouseCtrlMsg(msgType, mouseMsgType, x, y)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|msgType| [CRVideo_MOUSE_MSG_TYPE](Constant.md#MOUSE_MSG_TYPE)	| 鼠标事件类型| 
| mouseMsgType| 	[CRVideo_MOUSE_KEY_TYPE](Constant.md#MOUSE_KEY_TYPE)| 	鼠标键类型| 
| x| 	number| 	鼠标在屏幕中的横坐标| 
| y	| number| 	鼠标在屏幕中的纵坐标|

####关闭所有用户的麦克风 {#CRVideo_SetAllAudioClose}

>CRVideo_SetAllAudioClose()

- **返回值**:无

####系统音频参数设置 {#CRVideo_SetAudioCfg}

>CRVideo_SetAudioCfg(cfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cfg | 	[CRVideo_AudioCfg](TypeDefinitions.md#CRVideo_AudioCfg)|	设置参数|

####设置自定义的抓屏图像数据 {#CRVideo_SetCustomizeScreenImg}

>CRVideo_SetCustomizeScreenImg(format, width, heigh, dat)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|format	|[CRVideo_VIDEO_FORMAT](Constant.md#VIDEO_FORMAT)	|视频格式|
|width	|number|	图像的宽度|
|heigh|	number	|图像的高度|
|dat	|string	|承载argb数据,base64编码|

####设置默认的摄像头 {#CRVideo_SetDefaultVideo}

>CRVideo_SetDefaultVideo(userID, videoID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	| string| 	用户ID| 
| videoID	| number| 	摄像头ID|

####设置免打扰状态 {#CRVideo_SetDNDStatus}

>CRVideo_SetDNDStatus(DNDStatus, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|DNDStatus	 |number |	0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义 |
|cookie |	string |	自定义数据 (在回调时，回传给调用者)| 

>操作成功则回调[CRVideo_SetDNDStatusSuccess](callback.md#CRVideo_SetDNDStatusSuccess),失败则回调[CRVideo_SetDNDStatusFail](callback.md#CRVideo_SetDNDStatusFail)。

####文件上传的流量控制 {#CRVideo_SetFileUploadRate}

>CRVideo_SetFileUploadRate(maxbps)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|maxbps	|number	|每秒上传的最大字节数，小于等于0表示不开启流控 |

>SDK默认不开启流控,目前对文件上传控制的功能有：录制文件上传、网盘文件上传。

####设置当前哪个用户为主视频 {#CRVideo_SetMainVideo}

>CRVideo_SetMainVideo(userID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|userID	|string|	用户ID| 

####配置远程影音共享时，图像质量参数 {#CRVideo_SetMediacfg}

>CRVideo_SetMediacfg(jsonCfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|jsonCfg	|string|	json格式的字符串，详见[VideoCfgOjb](json.md#VideoCfgOjb)说明| 

####设置播放进度 {#CRVideo_SetMediaplaypos}

>CRVideo_SetMediaplaypos(pos)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|pos	|number	|设置播放位置，单位：秒| 

####设置麦克风音量大小 {#CRVideo_SetMicVolume}

>CRVideo_SetMicVolume(level) 

- **返回值**:设置成功则返回true,否则返回false(bool)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|level	|number	|音量等级（ 取值范围：0~255）| 

####设置鼠标热点消息 {#CRVideo_Setmousehotspot}

>CRVideo_Setmousehotspot(boardID, boardPageNo, x, y)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|boardID | 	string | 	白板标识 | 
| boardPageNo | 	number | 	白板的页序号(0为第一页)
| x	 | number | 	屏幕横坐标 | 
| y | 	number | 	屏幕纵坐标| 

####设置网盘文件传输暂停或继续 {#CRVideo_SetNetDiskTransportPause}

>CRVideo_SetNetDiskTransportPause(fileID, bTranPause)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID	|string	|网盘文件ID|
|bTranPause|	bool|	是否暂停| 

####暂未定义 {#CRVideo_SetPicResource}

>CRVideo_SetPicResource(picID, jsonval)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|picID	| string| 	-| 
| jsonval	| object| 	-| 

####设置本地生成的录制文件是否加密 {#CRVideo_SetRecordFileEncrypt}

>CRVideo_SetRecordFileEncrypt(encrypt)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|encrypt |	number |	1表示加密 0表示不加密| 

####上传录像文件 {#CRVideo_SetRecordUploadCfg}

>CRVideo_SetRecordUploadCfg(jsonCfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|jsonCfg	|[CRVideo_RecordUploadCfg](TypeDefinitions.md#CRVideo_RecordUploadCfg)	|上传配置参数| 

####设置录制视频 (录制过程中可随时设置，改变录制内容) {#CRVideo_SetRecordVideos}

>CRVideo_SetRecordVideos(value)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|value |Array-[CRVideo_RecordVideoInfo](TypeDefinitions.md#CRVideo_RecordVideoInfo) |需要录制的视频数组| 

####设置屏幕共享配置 {#CRVideo_SetScreenShareCfg}

>CRVideo_SetScreenShareCfg(jsonCfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|jsonCfg	|[CRVideo_ScreenShareCfgObj](TypeDefinitions.md#CRVideo_ScreenShareCfgObj) |	屏幕共享配置| 

####设置服务器地址 {#CRVideo_SetServerAddr}

>CRVideo_SetServerAddr(serverList)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|serverList|	string|	服务器地址,多个服务器地址使用冒号隔开（如：www.cloudroom.com:8080;183.60.47.52:8080;）| 

####设置本地扬声器音量 {#CRVideo_SetSpeakerVolume}

>CRVideo_SetSpeakerVolume(level)

- **返回值**:设置成功则返回true,否则返回false(bool)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|level	|number|音量等级（ 取值范围：0~255）| 

####系统视频参数设置 {#CRVideo_SetVideoCfg}

>CRVideo_SetVideoCfg(cfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cfg|	[CRVideo_VideoCfg](TypeDefinitions.md#CRVideo_VideoCfg)|	设置参数| 

####设置视频墙分屏模式 {#CRVideo_Setvideowallmode}

>CRVideo_Setvideowallmode(videoWallMode)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|videoWallMode|	[CRVideo_VIDEOLAYOUTMODE](Constant.md#VIDEOLAYOUTMODE)	|分屏模式| 

####开始获取语音pcm数据 {#CRVideo_StartGetAudioPCM}

>CRVideo_StartGetAudioPCM(aSide, getType, jsonParam)

- **返回值**:返回值 整形数值，1：正常，0：失败(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|aSide|	number|	声道类型 0:麦克风，1:扬声器|
|getType	|number|	获取方式 0:回调方式，1:保存为文件|
|jsonParam	|string	|当getType=0 表示回调方式, jsonParam可配置回调的数据大小(320-32000)，如: {"EachSize":320};当getType=1 表示保存为文件，jsonParam可配置文件名,如: { "FileName" : "e:\\test.pcm" }| 

####开始播放影音 {#CRVideo_StartPlayMedia}

>CRVideo_StartPlayMedia(filename, locPlay, bPauseWhenFinished)

- **返回值**:返回值 整形数值，1：正常，0：失败(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	| string| 	文件名，全路径| 
| locPlay	| number| 	是否仅仅本地播放（1:本地播放，0：会议内播放）| 
| bPauseWhenFinished| 	number	| 是否播放完毕自动暂停在最后一帧| 

####客户开始排队 {#CRVideo_StartQueuing}

>CRVideo_StartQueuing(queID, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	 |string |	queID 队列ID |
|cookie	 |string |	cookie自定义数据 (在回调时，回传给调用者)| 

>操作完成回调[CRVideo_StartQueuingRslt](callback.md#CRVideo_StartQueuingRslt)

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

####开始服务某个队列 {#CRVideo_StartService}

>CRVideo_StartService(queID, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	 |string |	队列ID |
|cookie |	string |	自定义数据 (在回调时，回传给调用者| 

>可以多次调用，开启对多个队列的服务) 操作回调[CRVideo_StartServiceRslt](callback.md#CRVideo_StartServiceRslt) 开启成功后： a. 如果没有开启免打挽，那么系统会自动分配客户：VideoCall_Queue_CallBack::autoAssignUser； b. 如果开启免打挽，系统就不会分配客户，如需服务客户可调用：reqAssignUser

####开始下载/上传文件 {#CRVideo_StartTransferFile}

>CRVideo_StartTransferFile()

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileinfo	|[CRVideo_FileInfo](TypeDefinitions.md#CRVideo_FileInfo)|	格式的文件信息| 

####开启用户的状态推送 {#CRVideo_StartUserStatusNotify}

>CRVideo_StartUserStatusNotify(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie |	number |自定义数据(在回调时，回传给调用者)，不需要时传空字符串| 

>企业下所有用户状态有变化时(包括呼叫会议状态、免打扰状态)，都会收到通知 开启后，用户量越大消息量越大，所以请按需开启 在[startUserStatusNotify](#CRVideo_StartUserStatusNotify)前，应该先通过[getUserStatus](#CRVideo_GetUserStatus)获取所有用户状态

####停止获取语音pcm数据 {#CRVideo_StopGetAudioPCM}

>CRVideo_StopGetAudioPCM(aSide, 无返回值)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|aSide	| number| 	声道类型 0:麦克风，1:扬声器| 
| 无返回值| 		|      | 

####停止播放影音 {#CRVideo_StopPlayMedia}

>CRVideo_StopPlayMedia()

- **返回值**:无

####客户停止排队 {#CRVideo_StopQueuing}

>CRVideo_StopQueuing(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	|string|	cookie自定义数据 (在回调时，回传给调用者)|

>操作完成回调[CRVideo_StopQueuingRslt](callback.md#CRVideo_StopQueuingRslt)

####停止录制 {#CRVideo_StopRecord}

>CRVideo_StopRecord()

- **返回值**:无

####开启屏幕共享 {#CRVideo_StartScreenShare}

>CRVideo_StartScreenShare()

- **返回值**:无

####停止屏幕共享 {#CRVideo_StopScreenShare}

>CRVideo_StopScreenShare()

- **返回值**:无

####停止服务某个队列 {#CRVideo_StopService}

>CRVideo_StopService(queID, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	|string|	queID 队列ID|
|cookie	|string|	cookie自定义数据 (在回调时，回传给调用者) | 

>操作完成回调CRVideo_StopServiceRslt

####关闭用户的状态推送 {#CRVideo_StopUserStatusNotify}

>CRVideo_StopUserStatusNotify(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	|string|	自定义数据(在回调时，回传给调用者)，不需要时传空字符串 | 

####功能切换 {#CRVideo_Switchtopage}

>CRVideo_Switchtopage(mainPage, pageID)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|mainPage |	number |	功能类型 |
|pageID |	string |	子页面标识（如创建白板时返回的boardID）| 

####SDK反初始化 {#CRVideo_Uninit}

>CRVideo_Uninit()

- **返回值**:无

####上传文件到网盘 {#CRVideo_Uploadnetdiskfile}

>CRVideo_Uploadnetdiskfile(fileID, localFilePath)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileID| 	string	| 网盘文件ID| 
| localFilePath	| string| 	本地文件路径,含文件名| 

####上传录像文件 {#CRVideo_UploadRecordFile}

>CRVideo_UploadRecordFile(filename)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	|string	|文件名，全路径| 