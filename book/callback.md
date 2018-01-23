
# 回调函数 {#callback}

 - ##### [会议创建管理的回调接口](#create)
 - ##### [会议管理类的回调接口](#meetingMrg)
 - ##### [队列类的回调接口](#queue)

>sdk回调接口

### 会议创建管理的回调接口{#create}

####登录成功响应 {#CRVideo_LoginSuccess}

>CRVideo_LoginSuccess.callback = function(usrID,cookie){}

- usrID ----- 用户账户
- usrID ----- 自定义用户数据 

####登录失败响应 {#CRVideo_LoginFail}

>CRVideo_LoginFail .callback = function(sdkErr,cookie){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据 

####SDK通知自己掉线 {#CRVideo_LineOff}

>CRVideo_LineOff.callback = function(sdkErr){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

####客户端设置免打扰状态操作成功响应 {#CRVideo_SetDNDStatusSuccess}

>CRVideo_SetDNDStatusSuccess.callback = function(cookie){}

- cookie ----- 自定义用户数据

####客户端设置免打扰状态操作失败响应 {#CRVideo_SetDNDStatusFail}

>CRVideo_SetDNDStatusFail.callback = function(sdkErr,cookie){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

####客获取所有用户在线状态成功响应 {#CRVideo_GetUserStatusSuccess}

>CRVideo_GetUserStatusSuccess.callback = function(usersStatus,cookie){}

- sdkErr ----- 用户在线状态信息列表，userID:用户id,userStatus:用户的在线状态(0 离线  1在线空闲  2 在线忙碌  3在线会议中),DNDType:用户免打扰状态(0代表关闭免打扰， 其它值代表开启免打扰)
- cookie ----- 自定义用户数据

####获取所有用户在线状态失败响应 {#CRVideo_GetUserStatusFail}

>CRVideo_GetUserStatusFail.callback = function(sdkErr ,cookie){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

####某个用户状态变化通知 {#CRVideo_NotifyUserStatus}

>CRVideo_NotifyUserStatus.callback = function(userStatus ,cookie){}

- userStatus ----- userStatus单个用户在线状态信息
- cookie ----- 自定义用户数据

####启动用户状态推送响应 {#CRVideo_StartUserStatusNotifyRslt}

>CRVideo_StartUserStatusNotifyRslt.callback = function(sdkErr ,cookie){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

#### 结束用户状态推送响应 {#CRVideo_StopUserStatusNotifyRslt}

>CRVideo_StopUserStatusNotifyRslt.callback = function(sdkErr ,cookie){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

#### 创建会议成功响应 {#CRVideo_CreateMeetingSuccess}

>CRVideo_CreateMeetingSuccess.callback = function(meetObj,cookie){}

- meetObj ----- 会议信息
- cookie ----- 自定义用户数据

#### 创建会议失败响应 {#CRVideo_CreateMeetingFail}

>CRVideo_CreateMeetingFail.callback = function(sdkErr ,cookie){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

#### 结束会议响应 {#CRVideo_DestroyMeetingRslt}

>CRVideo_DestroyMeetingRslt.callback = function(sdkErr ,cookie){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

#### 呼叫他人操作成功响应 {#CRVideo_CallSuccess}

>CRVideo_CallSuccess.callback = function(callID ,cookie){}

- callID ----- 呼叫全局标识
- cookie ----- 自定义用户数据

#### 呼叫他人操作失败响应 {#CRVideo_CallFail}

>CRVideo_CallFail.callback = function(callID,sdkErr,cookie){}

- callID ----- 呼叫全局标识
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

#### 接受他人呼叫操作成功响应 {#CRVideo_AcceptCallSuccess}

>CRVideo_AcceptCallSuccess.callback = function(callID,cookie){}

- callID ----- 呼叫全局标识
- cookie ----- 自定义用户数据

#### 接受他人呼叫操作失败响应 {#CRVideo_AcceptCallFail}

>CRVideo_AcceptCallFail.callback = function(callID,sdkErr,cookie){}

- callID ----- 呼叫全局标识
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

#### 拒绝他人的呼叫成功响应 {#CRVideo_RejectCallSuccess}

>CRVideo_RejectCallSuccess.callback = function(callID,cookie){}

- callID ----- 呼叫全局标识
- cookie ----- 自定义用户数据

#### 拒绝他人的呼叫失败响应 {#CRVideo_RejectCallFail}

>CRVideo_RejectCallFail.callback = function(callID,sdkErr,cookie){}

- callID ----- 呼叫全局标识
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

#### 拒绝他人的呼叫成功响应 {#CRVideo_HangupCallSuccess}

>CRVideo_HangupCallSuccess.callback = function(callID,cookie){}

- callID ----- 呼叫全局标识
- cookie ----- 自定义用户数据

#### 挂断呼叫操作失败响应 {#CRVideo_HangupCallFail}

>CRVideo_HangupCallFail.callback = function(callID,sdkErr,cookie){}

- callID ----- 呼叫全局标识
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

#### SDK通知自己被呼叫 {#CRVideo_NotifyCallIn}

>CRVideo_NotifyCallIn.callback = function(callID,meetObj,callerID,usrExtDat){}

- callID ----- 呼叫全局标识
- meetObj ----- 会议信息
- callerID ----- 呼叫人员的标识ID
- usrExtDat ----- 自定义扩展参数

#### SDK通知自己视频呼叫被对方接受 {#CRVideo_NotifyCallAccepted}

>CRVideo_NotifyCallAccepted.callback = function(callID,meetObj,callerID,usrExtDat){}

- callID ----- 呼叫全局标识
- meetObj ----- 会议信息
- usrExtDat ----- 自定义扩展参数

#### SDK通知自己呼叫被对方拒绝 {#CRVideo_NotifyCallRejected}

>CRVideo_NotifyCallRejected.callback = function(callID,sdkErr,usrExtDat){}

- callID ----- 呼叫全局标识
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- usrExtDat ----- 自定义扩展参数

#### SDK通知自己呼叫被挂断 {#CRVideo_NotifyCallHungup}

>CRVideo_NotifyCallHungup.callback = function(callID,usrExtDat){}

- callID ----- 呼叫全局标识
- usrExtDat ----- 自定义扩展参数

#### 发送数据时，SDK通知发送结果 {#CRVideo_SendCmdRlst}

>CRVideo_SendCmdRlst.callback = function(taskID,sdkErr,cookie){}

- taskID ----- 发送任务id
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie  ----- 自定义用户数据 

#### 发送数据时，SDK通知发送结果 {#CRVideo_SendBufferRlst}

>CRVideo_SendBufferRlst.callback = function(taskID,sdkErr,cookie){}

- taskID ----- 发送任务id
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie  ----- 自定义用户数据 

#### 发送文件时，SDK通知发送结果 {#CRVideo_SendFileRlst}

>CRVideo_SendFileRlst.callback = function(taskID,fileName,sdkErr,cookie){}

- taskID ----- 发送任务id
- fileName ----- 文件名
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie  ----- 自定义用户数据 

#### 发送数据时，SDK通知发送进度 {#CRVideo_SendProgress}

>CRVideo_SendProgress.callback = function(taskID,sendedLen,totalLen,cookie){}

- taskID ----- 发送任务id
- sendedLen ----- 已发送的数据长度
- totalLen ----- 需要发送的总长度
- cookie  ----- 自定义用户数据 

#### 取消发送响应 {#CRVideo_CancelSendRlst}

>CRVideo_CancelSendRlst.callback = function(taskID,sdkErr,cookie){}

- taskID ----- 发送任务id
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie  ----- 自定义用户数据 

#### SDK通知收到小块数据 {#CRVideo_NotifyCmdData}

>CRVideo_NotifyCmdData.callback = function(sourceUserId,data){}

- sourceUserId ----- 数据来源
- data ----- 数据

#### SDK通知收到大块数据 {#CRVideo_NotifyBufferData}

>CRVideo_NotifyBufferData.callback = function(sourceUserId,data){}

- sourceUserId ----- 数据来源
- data ----- 数据

#### SDK通知收到文件数据（收到的文件生成在系统临时目录下，请尽快移走对应文件） {#CRVideo_NotifyFileData}

>CRVideo_NotifyFileData.callback = function(sourceUserId,tmpFile,orgFileName){}

- sourceUserId ----- 数据来源
- tmpFile ----- 临时文件，不需要时，请移除或删除对应文件
- orgFileName ----- 源始文件名

#### SDK通知取消发送文件数据 {#CRVideo_NotifyCancelSend}

>CRVideo_NotifyCancelSend.callback = function(taskID){}

- taskID ----- 取消的任务id

#### 获取会议列表成功响应 {#CRVideo_GetMeetingsSuccess}

>CRVideo_GetMeetingsSuccess.callback = function(cookie){}

- cookie ----- 自定义用户数据

#### 获取会议列表成功响应 {#CRVideo_GetMeetingsFail}

>CRVideo_GetMeetingsFail.callback = function(sdkErr,cookie){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数据

### 会议管理类的回调接口{#meetingMrg}

#### 进入会议完成响应 {#CRVideo_EnterMeetingRslt}

>CRVideo_EnterMeetingRslt.callback = function(sdkErr){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### 某用户进入了会议 {#CRVideo_UserEnterMeeting}

>CRVideo_UserEnterMeeting.callback = function(usrID){}

- usrID ----- 进入会议的用户ID

#### 某用户离开了会议 {#CRVideo_UserLeftMeeting}

>CRVideo_UserLeftMeeting.callback = function(id){}

- id ----- 离开会议的用户ID

#### 通知结束视频会议结果 {#CRVideo_StopMeetingRslt}

>CRVideo_StopMeetingRslt.callback = function(sdkErr){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### 会议已被结束 {#CRVideo_MeetingStopped}

>CRVideo_MeetingStopped.callback = function(){}

#### SDK通知从会议里掉线了 {#CRVideo_MeetingDropped}

>CRVideo_MeetingDropped.callback = function(){}

#### SDK通知我的网络变化 {#CRVideo_NetStateChanged}

>CRVideo_NetStateChanged.callback = function(level){}

- level ----- 网络状况等级(0~10，10分为最佳网络)

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

#### SDK通知用户有新的视频数据 {#CRVideo_NotifyVideoData}

>CRVideo_NotifyVideoData.callback = function(userID,videoId,frmTime){}

- userID ----- 用户标识ID
- videoId ----- 用户的摄像头ID
- frmTime ----- frmTime 图像的创建时戳

#### SDK通知用户的视频设备有变化 {#CRVideo_VideoDevChanged}

>CRVideo_VideoDevChanged.callback = function(userID){}

- userID ----- 设备变化的用户ID

#### SDK通知用户的视频默认设备有变化 {#CRVideo_DefVideoChanged}

>CRVideo_DefVideoChanged.callback = function(userID,videoID){}

- userID ----- 设备变化的用户ID
- videoID ----- 默认设备id

#### SDK通知语音PCM数据 {#CRVideo_NotifyAudioPCMDat}

>CRVideo_NotifyAudioPCMDat.callback = function(aSide,base64PcmDat){}

- aSide ----- 声道类型
- base64PcmDat ----- PCM数据(base64格式)

#### 录制异常，录制将自动停止 {#CRVideo_RecordErr}

>CRVideo_RecordErr.callback = function(sdkErr){}

- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### 录制状态更改通知 {#CRVideo_RecordStateChanged}

>CRVideo_RecordStateChanged.callback = function(state){}

- state ----- 录制状态,数值请参考定义[RECORD_STATE](Constant.md#RECORD_STATE)

#### 上传录制文件错误通知 {#CRVideo_UploadRecordFileErr}

>CRVideo_UploadRecordFileErr.callback = function(fileName,sdkErr){}

- fileName ----- 本地文件路径
- sdkErr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

#### SDK通知录制文件状态更改 {#CRVideo_NotifyRecordFileStateChanged}

>CRVideo_NotifyRecordFileStateChanged.callback = function(fileName,state){}

- fileName ----- 本地文件路径
- state ----- 状态 0 未上传 1 上传中 2已上传

#### SDK通知上传录制文件进度 {#CRVideo_NotifyRecordFileUploadProgress}

>CRVideo_NotifyRecordFileUploadProgress.callback = function(fileName,percent){}

- fileName ----- 文件名
- percent ----- 进度0-100

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

#### SDK通知网盘空间已满，容量不足 {#CRVideo_NotifyNetDiskIsFull}

>CRVideo_NotifyNetDiskIsFull.callback = function(fileList){}

#### SDK通知删除网盘文件结果 {#CRVideo_NotifyNetDiskFileDeleteRslt}

>CRVideo_NotifyNetDiskFileDeleteRslt.callback = function(fileID,isSucceed){}

- fileID ----- 网盘文件id
- isSucceed ----- 是否成功 1 成功 0 失败

#### SDK通知网盘上传或下载进度 {#CRVideo_NotifyNetDiskTransforProgress}

>CRVideo_NotifyNetDiskTransforProgress.callback = function(fileID,percent,isSucceed){}

- fileID ----- 网盘文件id
- percent ----- 进度0-100
- isSucceed ----- 是否成功 1 成功 0 失败

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

#### 第3方呼叫操作结果 {#CRVideo_ClientInviteRslt}

>CRVideo_ClientInviteRslt.callback = function(inviteID,sdkEr,cookie){}

- inviteID ----- 邀请标识码（邀请ID
- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 取消第3方呼叫操作结果 {#CRVideo_ClientCancelInviteRslt}

>CRVideo_ClientCancelInviteRslt.callback = function(inviteID,sdkEr,cookie){}

- inviteID ----- 邀请标识码(邀请ID)
- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)，CRVIDEOSDK_NOERR为成功操作
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### SDK通知第3方呼叫状态改变 {#CRVideo_NotifyInviteStatus}

>CRVideo_NotifyInviteStatus.callback = function(inviteID,status){}

- inviteID ----- 邀请标识码（邀请ID
- status ----- 第3方呼叫状态码,0-振铃 1-接通 2-拒绝 3-未应答 4-挂断

### 队列类的回调接口{#queue}

#### 队列初始化操作结果 {#CRVideo_InitQueueDatRslt}

>CRVideo_InitQueueDatRslt.callback = function(sdkErr,cookie){}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 队列初始化操作结果 {#CRVideo_InitQueueDatRslt}

>CRVideo_InitQueueDatRslt.callback = function(sdkErr,cookie){
    /**
	 * @typedef {object} CRVideo_QueStatus - 队列状态
	 * @property {number} queID - 队列id
	 * @property {number} agent_num - 坐席数量
	 * @property {number} wait_num - 排队客户数量
	 * @property {number} srv_num - 正在服务的客户数量
	 */
}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 队列状态变化通知 {#CRVideo_QueueStatusChanged}

>CRVideo_QueueStatusChanged.callback = function(queStatus){
    /**
	 * @typedef {object} CRVideo_QueInfo - 队列信息
	 * @property {number} queID - 队列id
	 * @property {number} name - 队列名称
	 * @property {string} desc - 队列描述
	 * @property {number} prio - 优先级，值越小优先级越高
	 */
}

- queStatus ----- 队列状态

#### 排队信息变化通知 {#CRVideo_QueuingInfoChanged}

>CRVideo_QueuingInfoChanged.callback = function(queuingInfo){}

- queuingInfo ----- 队列信息

#### 开始排队操作结果 {#CRVideo_StartQueuingRslt}

>CRVideo_StartQueuingRslt.callback = function(sdkErr,cookie){}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数

#### 停止排队操作结果 {#CRVideo_StopQueuingRslt}

>CRVideo_StopQueuingRslt.callback = function(sdkErr,cookie){}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数

#### 开始服务队列操作结果 {#CRVideo_StartServiceRslt}

>CRVideo_StartServiceRslt.callback = function(queID,sdkErr,cookie){}

- queID ----- 服务的队列ID
- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数

#### 停止服务队列操作结果 {#CRVideo_StopServiceRslt}

>CRVideo_StopServiceRslt.callback = function(queID,sdkErr,cookie){}

- queID ----- 服务的队列ID
- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数

#### 响应分配客户操作结果 {#CRVideo_ResponseAssignUserRslt}

>CRVideo_ResponseAssignUserRslt.callback = function(sdkErr,cookie){
    /**
	 * @typedef {object} CRVideo_QueUser - 队列用户信息
	 * @property {number} queID - 队列ID
	 * @property {string} usrID - 用户ID
	 * @property {string} name - 用户昵称
	 * @property {string} queuingTime - 已排队时长(秒)
	 * @property {string} param - 用户呼叫时的私有数据
	 */
}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义用户数

#### 系统自动安排客户 {#CRVideo_AutoAssignUser}

>CRVideo_AutoAssignUser.callback = function(user){}

- user ----- 队列用户信息 如果想停止系统的自动分配，请通setDNDStatus设置免打扰功能

#### 请求分配客户操作结果 {#CRVideo_ReqAssignUserRslt}

>CRVideo_ReqAssignUserRslt.callback = function(sdkErr,user,cookie){}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- user ----- 队列用户信息
- cookie ----- 自定义用户数

#### 系统取消已经安排的客户 {#CRVideo_CancelAssignUser}

>CRVideo_CancelAssignUser.callback = function(queID,userid){}

- queID ----- 服务的队列
- userid ----- 用户id   

#### 通知用户文件状态更改 {#CRVideo_FileStateChanged}

>CRVideo_FileStateChanged.callback = function(fileName,state){}

- fileName ----- 文件名
- state ----- 状态

#### 通知用户文件http响应头 {#CRVideo_FileHttpRspHeader}

>CRVideo_FileHttpRspHeader.callback = function(fileName,rspHeader){}

- fileName ----- 文件名
- rspHeader ----- http响应头

#### 通知用户文件http响应结果 {#CRVideo_FileHttpRspContent}

>CRVideo_FileHttpRspContent.callback = function(fileName,rspHeader){}

- fileName ----- 文件名
- rspHeader ----- http响应结果

#### 系统取消已经安排的客户 {#CRVideo_FileProgress}

>CRVideo_FileProgress.callback = function(fileName,finisedSize,totalSize){}

- fileName ----- 文件名
- finisedSize ----- 已传输大小
- finisedSize ----- 文件大小

#### 通知用户文件传输结束 {#CRVideo_FileFinished}

>CRVideo_FileFinished.callback = function(fileName,rslt){}

- fileName ----- 文件名
- rslt ----- 传输结果

#### 通知屏幕共享大小改变 {#CRVideo_NotifyShareRectChanged}

>CRVideo_NotifyShareRectChanged.callback = function(w,h){}

- w ----- 宽度
- h ----- 高度