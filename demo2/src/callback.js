if(window["000a0180686911e78dd0a45d36bb8c5c"] === undefined)
{
	/** 
	* sdk回调接口
	* @module cr/callback
	*/
	//------------------------------------------------------------------------
	//	
	//会议创建管理的回调接口
	//
	//-------------------------------------------------------------------------
	/**
	 * @typedef {object} CRVideo_MeetInfoObj - 区域
	 * @property {number} ID - 会议号，0时代表会议信息为空
	 * @property {number} pswd - 会议密码；（空代表会议无密码）
	 * @property {number} subject - 会议主题
	 * @property {number} pubMeetUrl - 会议公共链接
	 */
	 /**
	 * 登录成功响应
	 * @callback CRVideo.CbProxy~CRVideo_LoginSuccess
	 * @param {string} usrID - 用户账户
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_LoginSuccess = new CRVideo.CbProxy("CRVideo_LoginSuccess");
	 /**
	 * 登录失败响应
	 * @callback CRVideo.CbProxy~CRVideo_LoginFail
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_LoginFail = new CRVideo.CbProxy("CRVideo_LoginFail");
	 /**
	 * SDK通知自己掉线
	 * @callback CRVideo.CbProxy~CRVideo_LineOff
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 */
	var CRVideo_LineOff = new CRVideo.CbProxy("CRVideo_LineOff");
	 /**
	 * 客户端设置免打扰状态操作成功响应
	 * @callback CRVideo.CbProxy~CRVideo_SetDNDStatusSuccess
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_SetDNDStatusSuccess = new CRVideo.CbProxy("CRVideo_SetDNDStatusSuccess"); 
	 /**
	 * 客户端设置免打扰状态操作失败响应
	 * @callback CRVideo.CbProxy~CRVideo_SetDNDStatusFail
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_SetDNDStatusFail = new CRVideo.CbProxy("CRVideo_SetDNDStatusFail"); 
	 /**
	 * 客获取所有用户在线状态成功响应
	 * @callback CRVideo.CbProxy~CRVideo_GetUserStatusSuccess
	 * @param {string} usersStatus - 用户在线状态信息列表，userID:用户id,userStatus:用户的在线状态(0 离线  1在线空闲  2 在线忙碌  3在线会议中),DNDType:用户免打扰状态(0代表关闭免打扰， 其它值代表开启免打扰)
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_GetUserStatusSuccess = new CRVideo.CbProxy("CRVideo_GetUserStatusSuccess"); 
	 /**
	 * 获取所有用户在线状态失败响应
	 * @callback CRVideo.CbProxy~CRVideo_GetUserStatusFail
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_GetUserStatusFail = new CRVideo.CbProxy("CRVideo_GetUserStatusFail"); 
	/**
	 * 某个用户状态变化通知
	 * @callback CRVideo.CbProxy~CRVideo_NotifyUserStatus
	 * @param {string} userStatus - userStatus单个用户在线状态信息
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_NotifyUserStatus = new CRVideo.CbProxy("CRVideo_NotifyUserStatus"); 
	 /**
	 * 启动用户状态推送响应
	 * @callback CRVideo.CbProxy~CRVideo_StartUserStatusNotifyRslt
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_StartUserStatusNotifyRslt = new CRVideo.CbProxy("CRVideo_StartUserStatusNotifyRslt"); 
	 /**
	 * 结束用户状态推送响应
	 * @callback CRVideo.CbProxy~CRVideo_StopUserStatusNotifyRslt
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_StopUserStatusNotifyRslt = new CRVideo.CbProxy("CRVideo_StopUserStatusNotifyRslt"); 
	 /**
	 * 创建会议成功响应
	 * @callback CRVideo.CbProxy~CRVideo_CreateMeetingSuccess
	 * @param {CRVideo_MeetInfoObj} meetObj - 会议信息
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_CreateMeetingSuccess = new CRVideo.CbProxy("CRVideo_CreateMeetingSuccess"); 
	 /**
	 * 创建会议失败响应
	 * @callback CRVideo.CbProxy~CRVideo_CreateMeetingFail
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_CreateMeetingFail = new CRVideo.CbProxy("CRVideo_CreateMeetingFail");
	 /**
	 * 结束会议响应
	 * @callback CRVideo.CbProxy~CRVideo_DestroyMeetingRslt
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_DestroyMeetingRslt = new CRVideo.CbProxy("CRVideo_DestroyMeetingRslt");
	 /**
	 * 呼叫他人操作成功响应
	 * @callback CRVideo.CbProxy~CRVideo_CallSuccess
	 * @param {string} callID - 呼叫全局标识 
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_CallSuccess = new CRVideo.CbProxy("CRVideo_CallSuccess"); 
	 /**
	 * 呼叫他人操作失败响应
	 * @callback CRVideo.CbProxy~CRVideo_CallFail
	 * @param {string} callID - 呼叫全局标识 
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_CallFail = new CRVideo.CbProxy("CRVideo_CallFail"); 
	 /**
	 * 接受他人呼叫操作成功响应
	 * @callback CRVideo.CbProxy~CRVideo_AcceptCallSuccess
	 * @param {string} callID - 呼叫全局标识 
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_AcceptCallSuccess = new CRVideo.CbProxy("CRVideo_AcceptCallSuccess"); 
	 /**
	 * 接受他人呼叫操作失败响应
	 * @callback CRVideo.CbProxy~CRVideo_AcceptCallFail
	 * @param {string} callID - 呼叫全局标识 
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_AcceptCallFail = new CRVideo.CbProxy("CRVideo_AcceptCallFail"); 
	 /**
	 * 拒绝他人的呼叫成功响应
	 * @callback CRVideo.CbProxy~CRVideo_RejectCallSuccess
	 * @param {string} callID - 呼叫全局标识 
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_RejectCallSuccess = new CRVideo.CbProxy("CRVideo_RejectCallSuccess"); 
	 /**
	 * 拒绝他人的呼叫失败响应
	 * @callback CRVideo.CbProxy~CRVideo_RejectCallFail
	 * @param {string} callID - 呼叫全局标识 
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_RejectCallFail = new CRVideo.CbProxy("CRVideo_RejectCallFail"); 
	 /**
	 * 挂断呼叫操作成功响应
	 * @callback CRVideo.CbProxy~CRVideo_HangupCallSuccess
	 * @param {string} callID - 呼叫全局标识 
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_HangupCallSuccess= new CRVideo.CbProxy("CRVideo_HangupCallSuccess"); 
	 /**
	 * 挂断呼叫操作失败响应
	 * @callback CRVideo.CbProxy~CRVideo_HangupCallFail
	 * @param {string} callID - 呼叫全局标识 
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_HangupCallFail = new CRVideo.CbProxy("CRVideo_HangupCallFail"); 
	 /**
	 * SDK通知自己被呼叫
	 * @callback CRVideo.CbProxy~CRVideo_NotifyCallIn
	 * @param {string} callID - 呼叫全局标识 
	 * @param {CRVideo_MeetInfoObj} meetObj - 会议信息
	 * @param {string} callerID - 呼叫人员的标识ID
	 * @param {string} usrExtDat - 自定义扩展参数
	 */
	var CRVideo_NotifyCallIn = new CRVideo.CbProxy("CRVideo_NotifyCallIn");

	/**
	 * SDK通知自己视频呼叫被对方接受
	 * @callback CRVideo.CbProxy~CRVideo_NotifyCallAccepted
	 * @param {string} callID - 呼叫全局标识 
	 * @param {CRVideo_MeetInfoObj} meetObj - 会议信息
	 * @param {string} usrExtDat - 自定义扩展参数
	 */
	var CRVideo_NotifyCallAccepted = new CRVideo.CbProxy("CRVideo_NotifyCallAccepted");
	 /**
	 * SDK通知自己呼叫被对方拒绝
	 * @callback CRVideo.CbProxy~CRVideo_NotifyCallRejected
	 * @param {string} callID - 呼叫全局标识 
	 * @param {number} sdkErr - 呼叫被对方拒绝的原因代码,定义见cr/error
	 * @param {string} usrExtDat - 自定义扩展参数
	 */
	var CRVideo_NotifyCallRejected = new CRVideo.CbProxy("CRVideo_NotifyCallRejected");
	 /**
	 * SDK通知自己呼叫被挂断
	 * @callback CRVideo.CbProxy~CRVideo_NotifyCallHungup
	 * @param {string} callID - 呼叫全局标识
	 * @param {string} usrExtDat - 自定义扩展参数
	 */
	var CRVideo_NotifyCallHungup = new CRVideo.CbProxy("CRVideo_NotifyCallHungup"); 
	 /**
	 * 邀请/取消邀请第三方结果
	 * @callback CRVideo.CbProxy~CRVideo_CallMorePartyRslt
	 * @param {string} callID - 呼叫全局标识
	 * @param {string} usrExtDat - 自定义扩展参数
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_CallMorePartyRslt = new CRVideo.CbProxy("CRVideo_CallMorePartyRslt");
	 /**
	 * 功能 取消第3方呼叫操作结果
	 * @callback CRVideo.CbProxy~CRVideo_CancelCallMorePartyRslt
	 * @param {string} callID - 呼叫全局标识
	 * @param {number} sdkErr - 呼叫取消第三方操作的错误码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_CancelCallMorePartyRslt = new CRVideo.CbProxy("CRVideo_CancelCallMorePartyRslt");
	/**
	 * 通知第3方呼叫状态改变
	 * @callback CRVideo.CbProxy~CRVideo_CancelCallMorePartyRslt
	 * @param {string} callID - 呼叫全局标识
	 * @param {number} status - 状态，0振铃，1接通，2拒绝，3未应答，4挂断
	 */
	var CRVideo_NotifyCallMorePartyStatus = new CRVideo.CbProxy("CRVideo_NotifyCallMorePartyStatus");

	 /**
	 * 发送数据时，SDK通知发送结果
	 * @callback CRVideo.CbProxy~CRVideo_SendCmdRlst
	 * @param {string} taskID - 发送任务id
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_SendCmdRlst = new CRVideo.CbProxy("CRVideo_SendCmdRlst");
	 /**
	 * 发送数据时，SDK通知发送结果
	 * @callback CRVideo.CbProxy~CRVideo_SendBufferRlst
	 * @param {string} taskID - 发送任务id
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_SendBufferRlst = new CRVideo.CbProxy("CRVideo_SendBufferRlst");
	 /**
	 * 发送文件时，SDK通知发送结果
	 * @callback CRVideo.CbProxy~CRVideo_SendFileRlst
	 * @param {string} taskID - 发送任务id
	 * @param {number} fileName - 文件名
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_SendFileRlst = new CRVideo.CbProxy("CRVideo_SendFileRlst");
	 /**
	 * 发送数据时，SDK通知发送进度
	 * @callback CRVideo.CbProxy~CRVideo_SendProgress
	 * @param {string} taskID - 发送任务id
	 * @param {number} sendedLen  - 已发送的数据长度
	 * @param {number} totalLen   - 需要发送的总长度
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_SendProgress = new CRVideo.CbProxy("CRVideo_SendProgress");
	 /**
	 * 取消发送响应
	 * @callback CRVideo.CbProxy~CRVideo_CancelSendRlst
	 * @param {string} taskID - 发送任务id
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_CancelSendRlst = new CRVideo.CbProxy("CRVideo_CancelSendRlst");
	 /**
	 * SDK通知收到小块数据
	 * @callback CRVideo.CbProxy~CRVideo_NotifyCmdData
	 * @param {string} sourceUserId - 数据来源
	 * @param {string} data - 数据
	 */
	var CRVideo_NotifyCmdData = new CRVideo.CbProxy("CRVideo_NotifyCmdData");
	 /**
	 * SDK通知收到大块数据
	 * @callback CRVideo.CbProxy~CRVideo_NotifyBufferData
	 * @param {string} sourceUserId - 数据来源
	 * @param {string} data - 数据
	 */
	var CRVideo_NotifyBufferData = new CRVideo.CbProxy("CRVideo_NotifyBufferData");
	 /**
	 * SDK通知收到文件数据（收到的文件生成在系统临时目录下，请尽快移走对应文件）
	 * @callback CRVideo.CbProxy~CRVideo_NotifyFileData
	 * @param {string} sourceUserId - 数据来源
	 * @param {string} tmpFile - 临时文件，不需要时，请移除或删除对应文件
	 * @param {string} orgFileName  - 源始文件名 
	 */
	var CRVideo_NotifyFileData = new CRVideo.CbProxy("CRVideo_NotifyFileData");
	 /**
	 * SDK通知取消发送文件数据
	 * @callback CRVideo.CbProxy~CRVideo_NotifyCancelSend
	 * @param {number} taskID - 取消的任务id
	 */
	var CRVideo_NotifyCancelSend = new CRVideo.CbProxy("CRVideo_NotifyCancelSend");
    /**
	 * 获取会议列表成功响应
	 * @callback CRVideo.CbProxy~CRVideo_GetMeetingsSuccess
	 * @param {CRVideo_MeetInfoObj} jsonMeetings - 会议列表信息
     * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_GetMeetingsSuccess = new CRVideo.CbProxy("CRVideo_GetMeetingsSuccess");
    /**
	 * 获取会议列表成功响应
	 * @callback CRVideo.CbProxy~CRVideo_GetMeetingsFail
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
     * @param {string} cookie - 自定义用户数据
	 */
	var  CRVideo_GetMeetingsFail = new CRVideo.CbProxy("CRVideo_GetMeetingsFail");






	//------------------------------------------------------------------------
	//	
	//会议管理类的回调接口
	//
	//-------------------------------------------------------------------------
	 /**
	 * 进入会议完成响应
	 * @callback CRVideo.CbProxy~CRVideo_EnterMeetingRslt
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 */
	var CRVideo_EnterMeetingRslt = new CRVideo.CbProxy("CRVideo_EnterMeetingRslt"); 
	 /**
	 * 某用户进入了会议
	 * @callback CRVideo.CbProxy~CRVideo_UserEnterMeeting
	 * @param {string} usrID - 进入会议的用户ID
	 */
	var CRVideo_UserEnterMeeting= new CRVideo.CbProxy("CRVideo_UserEnterMeeting"); 

	 /**
	 * 某用户离开了会议
	 * @callback CRVideo.CbProxy~CRVideo_UserLeftMeeting
	 * @param {number} id - 离开会议的用户ID
	 */
	var CRVideo_UserLeftMeeting = new CRVideo.CbProxy("CRVideo_UserLeftMeeting"); 

	 /**
	 * 通知结束视频会议结果
	 * @callback CRVideo.CbProxy~CRVideo_StopMeetingRslt
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 */
	var CRVideo_StopMeetingRslt = new CRVideo.CbProxy("CRVideo_StopMeetingRslt");
	 /**
	 * 会议已被结束
	 * @callback CRVideo.CbProxy~CRVideo_MeetingStopped
	 */
	var CRVideo_MeetingStopped = new CRVideo.CbProxy("CRVideo_MeetingStopped"); 
	 /**
	 * SDK通知从会议里掉线了
	 * @callback CRVideo.CbProxy~CRVideo_MeetingDropped
	 */
	var CRVideo_MeetingDropped = new CRVideo.CbProxy("CRVideo_MeetingDropped"); 

	/**
	 * SDK通知我的网络变化
	 * @callback CRVideo.CbProxy~CRVideo_NetStateChanged
	 * @param {number} level - 网络状况等级(0~10，10分为最佳网络)
	 */
	var CRVideo_NetStateChanged = new CRVideo.CbProxy("CRVideo_NetStateChanged");
	/**
	 * SDK通知本地音频设备有变化
	 * @callback CRVideo.CbProxy~CRVideo_AudioDevChanged
	 */
	var CRVideo_AudioDevChanged = new CRVideo.CbProxy("CRVideo_AudioDevChanged");
	 /**
	 * SDK通知打开本地音频状态变化
	 * @callback CRVideo.CbProxy~CRVideo_AudioStatusChanged
	 * @param {string} userID - 会话中设备的所有者ID
	 * @param {CRVideo_ASTATUS} oldStatus - oldStatus 旧状态
	 * @param {CRVideo_ASTATUS} newStatus - newStatus 新状态
	 */
	var CRVideo_AudioStatusChanged = new CRVideo.CbProxy("CRVideo_AudioStatusChanged");
	 /**
	 * SDK通知用户的说话声音强度更新
	 * @callback CRVideo.CbProxy~CRVideo_MicEnergyUpdate
	 * @param {string} userID - 用户ID
	 * @param {number} oldLevel - 原来的说话声音强度
	 * @param {number} newLevel - 现在的说话声音强度
	 */
	var CRVideo_MicEnergyUpdate = new CRVideo.CbProxy("CRVideo_MicEnergyUpdate");
	 /**
	 * SDK通知打开本地视频状态变化
	 * @callback CRVideo.CbProxy~CRVideo_VideoStatusChanged
	 * @param {string} userID - 会话中设备的所有者ID
	 * @param {CRVideo_VSTATUS} oldStatus - oldStatus 旧状态
	 * @param {CRVideo_VSTATUS} newStatus - newStatus 新状态
	 */
	var CRVideo_VideoStatusChanged = new CRVideo.CbProxy("CRVideo_VideoStatusChanged");
	 /**
	 * SDK通知用户有新的视频数据
	 * @callback CRVideo.CbProxy~CRVideo_NotifyVideoData
	 * @param {string} userID -  用户标识ID
	 * @param {string} videoId -  用户的摄像头ID
	 * @param {number} frmTime - frmTime 图像的创建时戳
	 */
	var CRVideo_NotifyVideoData = new CRVideo.CbProxy("CRVideo_NotifyVideoData");
	 /**
	 * SDK通知用户的视频设备有变化	
	 * @callback CRVideo.CbProxy~CRVideo_VideoDevChanged
	 * @param {string} userID - 设备变化的用户ID
	 */
	var CRVideo_VideoDevChanged = new CRVideo.CbProxy("CRVideo_VideoDevChanged");
	 /**
	 * SDK通知用户的视频默认设备有变化
	 * @callback CRVideo.CbProxy~CRVideo_DefVideoChanged
	 * @param {string} userID - 设备变化的用户ID
	 * @param {number} videoID - 默认设备id
	 */
	var CRVideo_DefVideoChanged  = new CRVideo.CbProxy("CRVideo_DefVideoChanged");
	 /**
	 * SDK通知语音PCM数据
	 * @callback CRVideo.CbProxy~CRVideo_NotifyAudioPCMDat
	 * @param {number} aSide - 声道类型
	 * @param {string} base64PcmDat - PCM数据(base64格式)
	 */
	var CRVideo_NotifyAudioPCMDat  = new CRVideo.CbProxy("CRVideo_NotifyAudioPCMDat");
	 /**
	 * 录制异常，录制将自动停止
	 * @callback CRVideo.CbProxy~CRVideo_RecordErr
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 */
	var CRVideo_RecordErr  = new CRVideo.CbProxy("CRVideo_RecordErr");
	 /**
	 * 录制状态更改通知
	 * @callback CRVideo.CbProxy~CRVideo_RecordStateChanged
	 * @param {CRVideo_RECORD_STATE} state - 录制状态,数值请参考定义RECORD_STATE
	 */
	var CRVideo_RecordStateChanged  = new CRVideo.CbProxy("CRVideo_RecordStateChanged");
	 /**
	 * 录制异常，录制将自动停止
	 * @callback CRVideo.CbProxy~CRVideo_RecordErr
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 */
	var CRVideo_RecordErr  = new CRVideo.CbProxy("CRVideo_RecordErr");
	 /**
	 * 上传录制文件错误通知
	 * @callback CRVideo.CbProxy~CRVideo_UploadRecordFileErr
	 * @param {string} fileName - 本地文件路径
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 */
	var CRVideo_UploadRecordFileErr  = new CRVideo.CbProxy("CRVideo_UploadRecordFileErr");

	 /**
	 * SDK通知录制文件状态更改
	 * @callback CRVideo.CbProxy~CRVideo_NotifyRecordFileStateChanged
	 * @param {string} fileName - 本地文件路径
	 * @param {number} state - 状态 0 未上传 1 上传中 2已上传
	 */
	var CRVideo_NotifyRecordFileStateChanged  = new CRVideo.CbProxy("CRVideo_NotifyRecordFileStateChanged");
	 /**
	 * SDK通知上传录制文件进度
	 * @callback CRVideo.CbProxy~CRVideo_NotifyRecordFileUploadProgress
	 * @param {string} fileName - 文件名
	 * @param {number} percent - 进度0-100
	 */
	var CRVideo_NotifyRecordFileUploadProgress  = new CRVideo.CbProxy("CRVideo_NotifyRecordFileUploadProgress");
	
//	/**
//	 * 
//	 * 
//	 * 
//	 */
//	var CRVideo_SvrRecordStateChanged  = new CRVideo.CbProxy("CRVideo_SvrRecordStateChanged");
//	
//	/**
//	 * 
//	 * 
//	 * 
//	 */
//	var CRVideo_GetSvrRecordInfo = new CRVideo.CbProxy("CRVideo_GetSvrRecordInfo");
//	
//	/**
//	 * 
//	 * 
//	 * 
//	 */
//	var CRVideo_GetSvrRecordInfoEx  = new CRVideo.CbProxy("CRVideo_GetSvrRecordInfoEx");
	
	
	 /**
	 * 开启屏幕共享的响应事件 
	 * @callback CRVideo.CbProxy~CRVideo_StartScreenShareRslt
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 */
	var CRVideo_StartScreenShareRslt  = new CRVideo.CbProxy("CRVideo_StartScreenShareRslt");
	 /**
	 * 停止屏幕共享的响应事件
	 * @callback CRVideo.CbProxy~CRVideo_StopScreenShareRslt
	 * @param {number} sdkErr - 操作失败代码,定义见cr/error
	 */
	var CRVideo_StopScreenShareRslt  = new CRVideo.CbProxy("CRVideo_StopScreenShareRslt");
	 /**
	 * 通知他人开启了屏幕共享
	 * @callback CRVideo.CbProxy~CRVideo_NotifyScreenShareStarted
	 */
	var CRVideo_NotifyScreenShareStarted = new CRVideo.CbProxy("CRVideo_NotifyScreenShareStarted");
	 /**
	 * 通知他人停止了屏幕共享
	 * @callback CRVideo.CbProxy~CRVideo_NotifyScreenShareStopped
	 */
	var CRVideo_NotifyScreenShareStopped = new CRVideo.CbProxy("CRVideo_NotifyScreenShareStopped");
	/**
	 * @typedef {object} CRVideo_Rect - 区域
	 * @property {number} left - 区域右上角x坐标
	 * @property {number} top - 区域右上角y坐标
	 * @property {number} width - 区域宽度
	 * @property {number} height - 区域高度
	 */
	 /**
	 * 通知对端屏幕图像有变化
	 * @callback CRVideo.CbProxy~CRVideo_NotifyScreenShareData
	 * @param {string} userID - 用户ID
	 * @param {CRVideo_Rect} rect - 变化的区域；（可以只重绘这块区域）
	 */
	var CRVideo_NotifyScreenShareData = new CRVideo.CbProxy("CRVideo_NotifyScreenShareData");
	 /**
	 * 自定义抓屏时，SDK通知使用者抓屏（在收到通知时， 一定要及时CRVideo_SetCustomizeScreenImg，如果没图像时，可以先送入空图像）
	 * @callback CRVideo.CbProxy~CRVideo_NotifyCatchScreen
	 */
	var CRVideo_NotifyCatchScreen = new CRVideo.CbProxy("CRVideo_NotifyCatchScreen");
	 /**
	 * SDK通知远程控制权限给予了某人
	 * @callback CRVideo.CbProxy~CRVideo_NotifyGiveCtrlRight
	 * @param {string} operId - 操作的用户ID
	 * @param {string} targetId - 控制权限给予了谁
	 */
	var CRVideo_NotifyGiveCtrlRight = new CRVideo.CbProxy("CRVideo_NotifyGiveCtrlRight");
	 /**
	 * SDK通知收回远程控制
	 * @callback CRVideo.CbProxy~CRVideo_NotifyReleaseCtrlRight
	 * @param {string} operId - 操作的用户ID
	 * @param {string} targetId - 收回了谁的控制权限
	 */
	var CRVideo_NotifyReleaseCtrlRight = new CRVideo.CbProxy("CRVideo_NotifyReleaseCtrlRight");
	 /**
	 * 发送IM消息，SDK通知使用者发送结果
	 * @callback CRVideo.CbProxy~CRVideo_SendIMmsgRlst
	 * @param {string} taskID - 发送任务id
	 * @param {number} sdkErr - 操作结果代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_SendIMmsgRlst = new CRVideo.CbProxy("CRVideo_SendIMmsgRlst");
	 /**
	 * SDK通知收到IM消息
	 * @callback CRVideo.CbProxy~CRVideo_NotifyIMmsg
	 * @param {string} fromUserID - 消息来源
	 * @param {string} text - 消息内容
	 * @param {number} sendTime - 消息发送时间戳，从1970开始算起
	 */
	var CRVideo_NotifyIMmsg = new CRVideo.CbProxy("CRVideo_NotifyIMmsg");
	/**
	 * @typedef {object} CRVideo_SubPage - 队列状态信息
	 * @property {number} userID - 用户ID
	 * @property {number} boardID - 白板id
	 */
	 /**
	 * SDK通知功能切换
	 * @callback CRVideo.CbProxy~CRVideo_NotifySwitchToPage
	 * @param {CRVideo_MAIN_PAGE_TYPE} mainPage  - 功能类型
	 * @param {string} pageID - 子页面标识
	 */
	var CRVideo_NotifySwitchToPage = new CRVideo.CbProxy("CRVideo_NotifySwitchToPage");
	 /**
	 * SDK通知视频分屏模式切换
	 * @callback CRVideo.CbProxy~CRVideo_NotifyVideoWallMode
	 * @param {CRVideo_VIDEOLAYOUTMODE} model  - 分屏模式
	 */
	var CRVideo_NotifyVideoWallMode = new CRVideo.CbProxy("CRVideo_NotifyVideoWallMode");
	 /**
	 * SDK通知主视频更改
	 * @callback CRVideo.CbProxy~CRVideo_NotifyMainVideoChanged
	 */
	var CRVideo_NotifyMainVideoChanged = new CRVideo.CbProxy("CRVideo_NotifyMainVideoChanged");
	/**
	 * @typedef {object} CRVideo_Board - 白板信息
	 * @property {string} userID - 用户ID
	 * @property {number} boardID - 白板id
	 * @property {string} title - 白板名称
	 * @property {number} width - 白板宽度
	 * @property {number} height - 白板高度
	 */
	 /**
	 * SDK入会后通知会议中已经存在的白板列表
	 * @callback CRVideo.CbProxy~CRVideo_NotifyInitBoards
	 * @param {CRVideo_Board[]} BoardObjs - 已经创建好的白板列表, json结构体请参见BoardObjs说明
	 */
	var CRVideo_NotifyInitBoards = new CRVideo.CbProxy("CRVideo_NotifyInitBoards");
	 /**
	 * 初始化白板页数据
	 * @callback CRVideo.CbProxy~CRVideo_NotifyInitBoardPageDat
	 * @param {string} boardID - 白板标识
	 * @param {number} subPage - boardPageNo - 白板页序号
	 * @param {string} imgID - 页背景文件ID（空代表无背景）
	 * @param {string[]} elementDatas - 此页的所有图元, 详见json结构之BoardElementObjs
	 * @param {string} operatorID - 初始化用户（为空时，代表入会时后台事件）
	 */
	var CRVideo_NotifyInitBoardPageDat = new CRVideo.CbProxy("CRVideo_NotifyInitBoardPageDat");
	 /**
	 * SDK通知创建白板
	 * @callback CRVideo.CbProxy~CRVideo_NotifyCreateBoard
	 * @param {CRVideo_SubPage} jsonBoard - 白板信息，详见json格式之BoardObj
	 * @param {string} operatorID - 创建白板的用户ID
	 */
	var CRVideo_NotifyCreateBoard = new CRVideo.CbProxy("CRVideo_NotifyCreateBoard");
	 /**
	 * SDK通知关闭白板
	 * @callback CRVideo.CbProxy~CRVideo_NotifyCloseBoard
	 * @param {string} boardID - 白板标识
	 * @param {string} operatorID - 关闭白板的用户ID
	 */
	var CRVideo_NotifyCloseBoard = new CRVideo.CbProxy("CRVideo_NotifyCloseBoard");
	 /**
	 * SDK通知白板背景
	 * @callback CRVideo.CbProxy~CRVideo_NotifyBoardBkImage
	 * @param {CRVideo_SubPage} subPage - 白板信息
	 * @param {string} imgFileID  - 背景图片文件，通过downloadNetDiskFile可下载到本地显示。
	 * @param {string} operatorID  - 操作用户ID
	 */
	var CRVideo_NotifyBoardBkImage = new CRVideo.CbProxy("CRVideo_NotifyBoardBkImage");
	 /**
	 * SDK通知添加图元信息
	 * @callback CRVideo.CbProxy~CRVideo_NotifyAddBoardElement
	 * @param {string} boardID - 白板标识
	 * @param {number} subPage - boardPageNo - 白板页序号
	 * @param {string[]} element - 图元信息, 详见json结构之BoardElementObj
	 * @param {string} operatorID  - 添加图元的用户ID
	 */
	var CRVideo_NotifyAddBoardElement = new CRVideo.CbProxy("CRVideo_NotifyAddBoardElement");
	 /**
	 * SDK通知图元信息被修改
	 * @callback CRVideo.CbProxy~CRVideo_NotifyModifyBoardElement
	 * @param {string} boardID - 白板标识
	 * @param {number} subPage - boardPageNo - 白板页序号
	 * @param {string[]} element - 图元信息, 详见json结构之BoardElementObj
	 * @param {string} operatorID  - 添加图元的用户ID
	 */
	var CRVideo_NotifyModifyBoardElement = new CRVideo.CbProxy("CRVideo_NotifyModifyBoardElement");
	 /**
	 * SDK通知删除图元
	 * @callback CRVideo.CbProxy~CRVideo_NotifyDelBoardElement
	 * @param {string} boardID - 白板标识
	 * @param {number} subPage - boardPageNo - 白板页序号
	 * @param {string[]} elementIDs - 图元id列表，以 “;”分隔
	 * @param {string} operatorID  - 删除图元的用户ID
	 */
	var CRVideo_NotifyDelBoardElement = new CRVideo.CbProxy("CRVideo_NotifyDelBoardElement");
	 /**
	 * SDK通知设置鼠标热点消息
	 * @callback CRVideo.CbProxy~CRVideo_NotifyMouseHotSpot
	 * @param {string} boardID - 白板标识
	 * @param {number} x - 屏幕横坐标
	 * @param {number} y - 屏幕纵坐标
	 * @param {string} operatorID  - 操作者的用户ID
	 */
	var CRVideo_NotifyMouseHotSpot = new CRVideo.CbProxy("CRVideo_NotifyMouseHotSpot");
	 /**
	 * SDK通知获取网盘容量信息结果
	 * @callback CRVideo.CbProxy~CRVideo_GetNetDiskSummaryRslt
	 * @param {number} diskLimit - 网盘总容量
	 * @param {number} diskUsed - 网盘已用容量
	 */
	var CRVideo_GetNetDiskSummaryRslt = new CRVideo.CbProxy("CRVideo_GetNetDiskSummaryRslt");
	 /**
	 * SDK通知获取网盘文件列表
	 * @callback CRVideo.CbProxy~CRVideo_GetNetDiskFileListRslt
	 * @param {string[]} fileList - 网盘文件列表，json格式，定义见NetDiskObjs
	 */
	var CRVideo_GetNetDiskFileListRslt = new CRVideo.CbProxy("CRVideo_GetNetDiskFileListRslt");
	 /**
	 * SDK通知删除网盘文件结果
	 * @callback CRVideo.CbProxy~CRVideo_NotifyNetDiskFileDeleteRslt
	 * @param {string} fileID - 网盘文件id
	 * @param {number} isSucceed - 是否成功 1 成功 0 失败
	 */
	var CRVideo_NotifyNetDiskFileDeleteRslt = new CRVideo.CbProxy("CRVideo_NotifyNetDiskFileDeleteRslt");
	 /**
	 * SDK通知网盘上传或下载进度
	 * @callback CRVideo.CbProxy~CRVideo_NotifyNetDiskTransforProgress
	 * @param {string} fileID - 网盘文件id
	 * @param {number} percent - 进度0-100
	 * @param {number} isUpload -  是否是上传 1 上传 0 下载
	 */
	var CRVideo_NotifyNetDiskTransforProgress = new CRVideo.CbProxy("CRVideo_NotifyNetDiskTransforProgress");
	 /**
	 * SDK通知影音文件打开
	 * @callback CRVideo.CbProxy~CRVideo_NotifyMediaOpened
	 * @param {number} totalTime - 影音时长(秒) 
	 * @param {number} w - 宽度
	 * @param {number} h - 高度
	 */
	var CRVideo_NotifyMediaOpened = new CRVideo.CbProxy("CRVideo_NotifyMediaOpened");
	 /**
	 * SDK通知影音开始播放
	 * @callback CRVideo.CbProxy~CRVideo_NotifyMediaStart
	 * @param {string} userid - 操作者的用户id
	 */
	var CRVideo_NotifyMediaStart = new CRVideo.CbProxy("CRVideo_NotifyMediaStart");
	 /**
	 * SDK通知影音播放停止
	 * @callback CRVideo.CbProxy~CRVideo_NotifyMediaStop
	 * @param {string} userid - 操作者的用户id
	 * @param {CRVideo_STOP_REASON} reason - 播放停止原因 
	 */
	var CRVideo_NotifyMediaStop = new CRVideo.CbProxy("CRVideo_NotifyMediaStop");
	 /**
	 * SDK通知设置鼠标热点消息
	 * @callback CRVideo.CbProxy~CRVideo_NotifyMediaPause
	 * @param {string} userid - 操作者的用户id
	 * @param {number} pause - 是否暂停 1暂停 0播放
	 */
	var CRVideo_NotifyMediaPause = new CRVideo.CbProxy("CRVideo_NotifyMediaPause");
	 /**
	 * SDK通知播放进度已设置完成
	 * @callback CRVideo.CbProxy~CRVideo_NotifyPlayPosSetted
	 * @param {number} setPTS - 播放进度
	 */
	var CRVideo_NotifyPlayPosSetted = new CRVideo.CbProxy("CRVideo_NotifyPlayPosSetted");
	/**
	 * SDK通知影音帧数据已解码完毕
	 * @callback CRVideo.CbProxy~CRVideo_NotifyMemberMediaData
	 * @param {string} userid  - 操作者的用户id
	 * @param {number} curPos  - 当前播放进度
	 */
	var CRVideo_NotifyMemberMediaData = new CRVideo.CbProxy("CRVideo_NotifyMemberMediaData");
   /**
	* 第3方呼叫操作结果
	* @callback CRVideo.CbProxy~CRVideo_ClientInviteRslt
	* @param {string} inviteID   - 操作者的用户id
	* @param {number} sdkErr - 操作结果代码,定义见cr/error
 	* @param {string} cookie   - 自定义用户数据
 	*/
	// var CRVideo_ClientInviteRslt = new CRVideo.CbProxy("CRVideo_ClientInviteRslt");
	 /**
	 * 取消第3方呼叫操作结果
	 * @callback CRVideo.CbProxy~CRVideo_ClientCancelInviteRslt
	 * @param {string} inviteID  - 邀请标识码（邀请ID
	 * @param {number} sdkErr - 操作结果代码,定义见cr/errorsdkErr，CRVIDEOSDK_NOERR为成功操作
	 * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
	 */	
	// var CRVideo_ClientCancelInviteRslt = new CRVideo.CbProxy("CRVideo_ClientCancelInviteRslt");
	 /**
	 * SDK通知第3方呼叫状态改变
	 * @callback CRVideo.CbProxy~CRVideo_NotifyInviteStatus
	 * @param {string} inviteID  - 邀请标识码（邀请ID
	 * @param {number} status - 第3方呼叫状态码,0-振铃 1-接通 2-拒绝 3-未应答 4-挂断
	 */	
	// var CRVideo_NotifyInviteStatus = new CRVideo.CbProxy("CRVideo_NotifyInviteStatus");
	
	//------------------------------------------------------------------------
	//	
	//队列类的回调接口
	//
	//-------------------------------------------------------------------------
	/**
	 * 队列初始化操作结果
	 * @callback CRVideo.CbProxy~CRVideo_InitQueueDatRslt
	 * @param {number} sdkErr - 操作结果代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_InitQueueDatRslt = new CRVideo.CbProxy("CRVideo_InitQueueDatRslt");
	/**
	 * @typedef {object} CRVideo_QueStatus - 队列状态
	 * @property {number} queID - 队列id
	 * @property {number} agent_num - 坐席数量
	 * @property {number} wait_num - 排队客户数量
	 * @property {number} srv_num - 正在服务的客户数量
	 */
	/**
	 * 队列状态变化通知
	 * @callback CRVideo.CbProxy~CRVideo_QueueStatusChanged
	 * @param {CRVideo_QueStatus} queStatus  -队列状态
	 */
	var CRVideo_QueueStatusChanged = new CRVideo.CbProxy("CRVideo_QueueStatusChanged");
	/**
	 * @typedef {object} CRVideo_QueInfo - 队列信息
	 * @property {number} queID - 队列id
	 * @property {number} name - 队列名称
	 * @property {string} desc - 队列描述
	 * @property {number} prio - 优先级，值越小优先级越高
	 */
	/**
	 * 排队信息变化通知
	 * @callback CRVideo.CbProxy~CRVideo_QueuingInfoChanged
	 * @param {CRVideo_QueInfo} queuingInfo - 队列信息
	 */
	var CRVideo_QueuingInfoChanged = new CRVideo.CbProxy("CRVideo_QueuingInfoChanged");
	/**
	 * 开始排队操作结果
	 * @callback CRVideo.CbProxy~CRVideo_StartQueuingRslt
	 * @param {number} sdkErr - 操作结果代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数据
	 */
	var CRVideo_StartQueuingRslt = new CRVideo.CbProxy("CRVideo_StartQueuingRslt");
	/**
	 * 停止排队操作结果
	 * @callback CRVideo.CbProxy~CRVideo_StopQueuingRslt
	 * @param {number} sdkErr - 操作结果代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数
	 */
	var CRVideo_StopQueuingRslt = new CRVideo.CbProxy("CRVideo_StopQueuingRslt");/**
	 * 开始服务队列操作结果
	 * @callback CRVideo.CbProxy~CRVideo_StartServiceRslt
	 * @param {number} queID  - 服务的队列ID
	 * @param {number} sdkErr - 操作结果代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数
	 */
	var CRVideo_StartServiceRslt = new CRVideo.CbProxy("CRVideo_StartServiceRslt");
	/**
	 * 停止服务队列操作结果
	 * @callback CRVideo.CbProxy~CRVideo_StopServiceRslt
	 * @param {number} queID  - 服务的队列ID
	 * @param {number} sdkErr - 操作结果代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数
	 */
	var CRVideo_StopServiceRslt = new CRVideo.CbProxy("CRVideo_StopServiceRslt");
	/**
	 * 响应分配客户操作结果
	 * @callback CRVideo.CbProxy~CRVideo_ResponseAssignUserRslt
	 * @param {number} sdkErr - 操作结果代码,定义见cr/error
	 * @param {string} cookie - 自定义用户数
	 */
	var CRVideo_ResponseAssignUserRslt = new CRVideo.CbProxy("CRVideo_ResponseAssignUserRslt");
	/**
	 * @typedef {object} CRVideo_QueUser - 队列用户信息
	 * @property {number} queID - 队列ID
	 * @property {string} usrID - 用户ID
	 * @property {string} name - 用户昵称
	 * @property {string} queuingTime - 已排队时长(秒)
	 * @property {string} param - 用户呼叫时的私有数据
	 */
	/**
	 * 系统自动安排客户
	 * @callback CRVideo.CbProxy~CRVideo_AutoAssignUser
	 * @param {CRVideo_QueUser} user - 队列用户信息
	 * 如果想停止系统的自动分配，请通setDNDStatus设置免打扰功能
	 */
	var CRVideo_AutoAssignUser = new CRVideo.CbProxy("CRVideo_AutoAssignUser");
	/**
	 * 请求分配客户操作结果
	 * @callback CRVideo.CbProxy~CRVideo_ReqAssignUserRslt
	 * @param {number} sdkErr - 操作结果代码,定义见cr/error
	 * @param {CRVideo_QueUser} user  - 队列用户信息
	 * @param {string} cookie - 自定义用户数
	 */
	var CRVideo_ReqAssignUserRslt = new CRVideo.CbProxy("CRVideo_ReqAssignUserRslt");
	/**
	 * 系统取消已经安排的客户
	 * @callback CRVideo.CbProxy~CRVideo_CancelAssignUser
	 * @param {string} queID - 服务的队列
	 * @param {string} userid - 用户id
	 */
	var CRVideo_CancelAssignUser = new CRVideo.CbProxy("CRVideo_CancelAssignUser");

	/**
	 * 通知用户文件状态更改
	 * @callback CRVideo.CbProxy~CRVideo_FileStateChanged
	 * @param {string} fileName	 - 文件名
	 * @param {CRVideo_HTTP_TRANSFER_STAT} state - 状态
	 */
	var CRVideo_FileStateChanged = new CRVideo.CbProxy("CRVideo_FileStateChanged");
	/**
	 * 通知用户文件http响应头
	 * @callback CRVideo.CbProxy~CRVideo_FileHttpRspHeader
	 * @param {string} fileName	 - 文件名
	 * @param {string} rspHeader - http响应头
	 */
	var CRVideo_FileHttpRspHeader = new CRVideo.CbProxy("CRVideo_FileHttpRspHeader");
	/**
	 * 通知用户文件http响应结果
	 * @callback CRVideo.CbProxy~CRVideo_FileHttpRspContent
	 * @param {string} fileName	 - 文件名
	 * @param {string} rspHeader - http响应结果
	 */
	var CRVideo_FileHttpRspContent = new CRVideo.CbProxy("CRVideo_FileHttpRspContent");
	/**
	 * 系统取消已经安排的客户
	 * @callback CRVideo.CbProxy~CRVideo_FileProgress
	 * @param {string} fileName	 - 文件名
	 * @param {number} finisedSize - 已传输大小
	 * @param {number} totalSize - 文件大小
	 */
	var CRVideo_FileProgress = new CRVideo.CbProxy("CRVideo_FileProgress");
	/**
	 * 通知用户文件传输结束
	 * @callback CRVideo.CbProxy~CRVideo_FileFinished
	 * @param {string} fileName -文件名
	 * @param {CRVideo_HTTP_TRANSFER_RESULT} rslt - 传输结果
	 */
	var CRVideo_FileFinished = new CRVideo.CbProxy("CRVideo_FileFinished");
    /**
	 * 通知屏幕共享大小改变
	 * @callback CRVideo.CbProxy~CRVideo_NotifyShareRectChanged
	 * @param {string} w -宽度
     * @param {number} h - 高度
	 */
	var CRVideo_NotifyShareRectChanged = new CRVideo.CbProxy("CRVideo_NotifyShareRectChanged");
}




































