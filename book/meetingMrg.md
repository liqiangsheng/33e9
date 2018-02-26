# 会议管理组件 {#meetingMrg}

>CloudroomVideoMgr 提供登录、呼叫、会议创建销毁、透明传输等功能。 单例组件，整个程序的生命过程中只能有一个实例。

###会议管理函数 {#meetingFunction}

####登录 {#CRVideo_Login}

>CRVideo_Login(authAcnt, authPswd, nickName, privAcnt, privAuthCode, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|authAcnt	|string	|云屋鉴权帐号|
|authPswd	|string|	云屋鉴权密码|
|nickName	|string|	昵称|
|privAcnt	|string|	自定义帐号，不需要时传空字符串|
|privAuthCode|	string|	自定义验证码（有复杂要求的，可以使用json格式，不需要时传空字符串）|
|cookie	|string	|自定义数据 （在回调时，回传给调用者）|

>登陆成功则回调[CRVideo_LoginSuccess](#CRVideo_LoginSuccess),登陆失败则回调[CRVideo_LoginFail](#CRVideo_LoginFail)

####注销 {#CRVideo_Logout}

>CRVideo_Logout()

- **返回值**:无

####设置免打扰状态 {#CRVideo_SetDNDStatus}

>CRVideo_SetDNDStatus(DNDStatus, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|DNDStatus	 |number |	0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义 |
|cookie |	string |	自定义数据 （在回调时，回传给调用者）| 

>操作成功则回调[CRVideo_SetDNDStatusSuccess](#CRVideo_SetDNDStatusSuccess)，失败则回调[CRVideo_SetDNDStatusFail](#CRVideo_SetDNDStatusFail)

####获取用户状态信息列表 {#CRVideo_GetUserStatus}

>CRVideo_GetUserStatus(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	 |number	|自定义数据（在回调时，回传给调用者，不需要时传空字符串）|

####开启用户的状态推送 {#CRVideo_StartUserStatusNotify}

>CRVideo_StartUserStatusNotify(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie |	number |自定义数据（在回调时，回传给调用者，不需要时传空字符串）| 

>企业下所有用户状态有变化时包括呼叫会议状态、免打扰状态），都会收到通知开启后，用户量越大消息量越大，所以请按需开启在[CRVideo_StartUserStatusNotify](#CRVideo_StartUserStatusNotify)前，应该先通过[CRVideo_GetUserStatus](#CRVideo_GetUserStatus)获取所有用户状态

####关闭用户的状态推送 {#CRVideo_StopUserStatusNotify}

>CRVideo_StopUserStatusNotify(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	|string|	自定义数据（在回调时，回传给调用者，不需要时传空字符串） | 

####创建会议 {#CRVideo_CreateMeeting}

>CRVideo_CreateMeeting(meetSubject, createPswd, cookie)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|meetSubject|	string	|会议主题（字符长度最大值50）|
|createPswd|	number	|是否创建会议密码（=0时：会议无密码，>0时：密码由系统自动生成）|
|cookie	|string	|自定义数据 （在回调时，回传给调用者）|

>操作成功则回调[CRVideo_CreateMeetingSuccess](#CRVideo_CreateMeetingSuccess)，失败则回调[CRVideo_CreateMeetingFail](#CRVideo_CreateMeetingFail)

####销毁会话 {#CRVideo_DestroyMeeting}

>CRVideo_DestroyMeeting(meetID, cookie)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|meetID	|number	|会议id|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

>响应事件[CRVideo_StopMeetingRslt](videoMrg.md#CRVideo_StopMeetingRslt)，会话被他人结束的回调事件[CRVideo_MeetingStopped](videoMrg.md#CRVideo_MeetingStopped)

####获取会议列表 {#CRVideo_GetMeetings}

>CRVideo_GetMeetings(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	 |string	|自定义数据 (在回调时，回传给调用者)|

>响应事件[CRVideo_GetMeetingsSuccess](#CRVideo_GetMeetingsSuccess)，会话被他人结束的回调事件[CRVideo_GetMeetingsFail](#CRVideo_GetMeetingsFail)

####发起呼叫 {#CRVideo_Call}

>CRVideo_Call(calledUserID, meetObj, usrExtDat, cookie) 

- **返回值**:返回本次呼叫标识码（呼叫ID） 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|calledUserID	|string	|被叫用户的账户ID|
|meetObj	|[CRVideo_MeetInfoObj](TypeDefinitions.md#CRVideo_MeetInfoObj)	|会议信息|
|usrExtDat	|string	|自定义扩展参数|
|cookie	|string	|自定义数据(在回调时，回传给调用者)|
 
>操作成功则回调[CRVideo_CallSuccess](#CRVideo_CallSuccess),失败则回调[CRVideo_CallFail](#CRVideo_CallSuccess)。 呼叫时，对方迟迟不响应，30秒后系统自动结束呼叫

####接受对方发起的呼叫 {#CRVideo_AcceptCall}

>CRVideo_AcceptCall(callID, meetObj, usrExtDat, cookie)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|callID	|string	|呼叫ID|
|meetObj|	[CRVideo_MeetInfoObj](TypeDefinitions.md#CRVideo_MeetInfoObj)	|会议信息|
|usrExtDat|	string|	自定义扩展参数|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

>开始进入视频会话。操作成功则回调[CRVideo_AcceptCallSuccess](#CRVideo_AcceptCallSuccess)，失败则回调[CRVideo_AcceptCallFail](#CRVideo_AcceptCallFail)

####拒绝对方发起的呼叫 {#CRVideo_RejectCall}

>CRVideo_RejectCall(callID, usrExtDat, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|callID	|string	|呼叫ID|
|usrExtDat|	string	|自定义扩展参数|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

>操作成功则回调[CRVideo_RejectCallSuccess](#CRVideo_RejectCallSuccess)，失败则回调[CRVideo_RejectCallFail](#CRVideo_RejectCallFail)

####挂断呼叫 {#CRVideo_HungupCall}

>CRVideo_HungupCall(callID, usrExtDat, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|callID	 | string | 	呼叫ID | 
 | usrExtDat	 | string	 | 自定义扩展参数 | 
 | cookie | 	string | 	自定义数据 (在回调时，回传给调用者)|

>操作成功则回调[CRVideo_HangupCallSuccess](#CRVideo_HangupCallSuccess)，失败则回调[CRVideo_HangupCallFail](#CRVideo_HangupCallFail)

####邀请第三方入会 {#CRVideo_ClientInvite}

>CRVideo_ClientInvite(called, meetObj, cookie)

- **返回值**:本次邀请标识码（邀请ID）

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|called|	string	|被叫用户的账户ID|
|meetObj	|[CRVideo_MeetInfoObj](TypeDefinitions.md#CRVideo_MeetInfoObj)|	当前会议信息(json结构体请参见[CRVideo_MeetInfoObj](TypeDefinitions.md#CRVideo_MeetInfoObj))|
|cookie|	string|	自定义数据 (在回调时，回传给调用者)|

>结果事件[CRVideo_ClientInviteRslt](#CRVideo_ClientInviteRslt)，根据sdkErr判断是否成功

####取消第三方入会 {#CRVideo_ClientCancelInvite}

>CRVideo_ClientCancelInvite(inviteID, cookie)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|inviteID	|string|	邀请标识码（邀请ID|
|cookie|	string|	自定义数据 (在回调时，回传给调用者)|

>结果事件[CRVideo_ClientCancelInviteRslt](#CRVideo_ClientCancelInviteRslt)，根据[CRVideo_ClientCancelInviteRslt](#CRVideo_ClientCancelInviteRslt)里面的sdkEr判断是否成功

####发送小块数据{#CRVideo_SendCmd}

>CRVideo_SendCmd(targetUserId, data) 

- **返回值**:分配的任务ID(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|targetUserId	|string	|目标用户ID|
|data|	string|	发送的数据|

>一次性发送不会有进度通知，发送结果事件[CRVideo_SendCmdRlst](#CRVideo_SendCmdRlst)，CRVideo_SendCmd不能被[CRVideo_CancelSend](#CRVideo_CancelSend)

####发送大块数据（分块发送） {#CRVideo_SendBuffer}

>CRVideo_SendBuffer(targetUserId, data)

- **返回值**:分配的任务ID(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|targetUserId	|string	|目标用户ID|
|data|	string|	发送的数据|

>进度通知事件[CRVideo_SendProgress](#CRVideo_SendProgress)，发送结果事件[CRVideo_SendBufferRlst](#CRVideo_SendBufferRlst)，取消发送[CRVideo_CancelSend](#CRVideo_CancelSend)

####发送文件（分块发送 ）{#CRVideo_SendFile}

>CRVideo_SendFile(targetUserId, fileName)

- **返回值**:分配的任务ID(string)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|targetUserId	|string	|目标用户ID|
|data|	string|	发送的数据|

>进度通知事件[CRVideo_SendProgress](#CRVideo_SendProgress)，发送结果事件[CRVideo_SendFileRlst](#CRVideo_SendFileRlst)，取消发送[CRVideo_CancelSend](#CRVideo_CancelSend))

####取消数据发送 {#CRVideo_CancelSend}

>CRVideo_CancelSend(taskID)

- **返回值**:无 

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|taskID	|string	|任务ID|
 
>取消数据发送 操作完成则回调[CRVideo_CancelSendRlst](#CRVideo_CancelSendRlst)

----

###会议管理回调 {#meetingCallback}

####登陆成功 {#CRVideo_LoginSuccess}

>CRVideo_LoginSuccess.callback = function(usrID,cookie){}

- **功能**：登录成功响应

+ **参数**：
    - usrID ----- 用户账户
    - usrID ----- 自定义用户数据 

####登录失败 {#CRVideo_LoginFail}

>CRVideo_LoginFail.callback = function(sdkEr,cookie){}

- **功能**：登录失败响应

+ **参数**：
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据 

####设置免打扰状态操作成功 {#CRVideo_SetDNDStatusSuccess}

>CRVideo_SetDNDStatusSuccess.callback = function(cookie){}

- **功能**：客户端设置免打扰状态操作成功响应

+ **参数**：
    - cookie ----- 自定义用户数据

####设置免打扰状态操作失败 {#CRVideo_SetDNDStatusFail}

>CRVideo_SetDNDStatusFail.callback = function(sdkEr,cookie){}

- **功能**：客户端设置免打扰状态操作失败响应

+ **参数**：
    - sdkEr ----- 操作失败代码,定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####获取所有用户在线状态成功 {#CRVideo_GetUserStatusSuccess}

>CRVideo_GetUserStatusSuccess.callback = function(userStatus,cookie){}

- **功能**：客获取所有用户在线状态成功响应

+ **参数**：
    - userStatus ----- 用户在线状态信息列表，userID:用户id，userStatus:用户的在线状态(0离线 ；1在线空闲 ；2在线忙碌；3在线会议中)，DNDType：用户免打扰状态（0代表关闭免打扰，其它值代表开启免打扰）
    - cookie ----- 自定义用户数据

####获取所有用户在线状态失败 {#CRVideo_GetUserStatusFail}

>CRVideo_GetUserStatusFail.callback = function(sdkEr ,cookie){}

- **功能**：获取所有用户在线状态失败响应

+ **参数**：
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####开启用户状态推送 {#CRVideo_StartUserStatusNotifyRslt}

>CRVideo_StartUserStatusNotifyRslt.callback = function(sdkEr ,cookie){}

- **功能**：启动用户状态推送响应

+ **参数**：
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####关闭用户状态推送 {#CRVideo_StopUserStatusNotifyRslt}

>CRVideo_StopUserStatusNotifyRslt.callback = function(sdkEr ,cookie){}

- **功能**：结束用户状态推送响应

+ **参数**：
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####用户状态变化通知 {#CRVideo_NotifyUserStatus}

>CRVideo_NotifyUserStatus.callback = function(userStatus ,cookie){}

- **功能**：某个用户状态变化通知

+ **参数**：
    - userStatus ----- [userStatus](#userStatus)单个用户在线状态信息
    - cookie ----- 自定义用户数据

####通知自己掉线 {#CRVideo_LineOff}

>CRVideo_LineOff.callback = function(sdkEr){}

- **功能**：SDK通知自己掉线

+ **参数**：
    - sdkEr ----- 掉线原因，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

####创建会议成功 {#CRVideo_CreateMeetingSuccess}

>CRVideo_CreateMeetingSuccess.callback = function(meetObj,cookie){}

- **功能**：创建会议成功响应

+ **参数**：
    - meetObj ----- [会议信息](json.md#MeetInfoObj)
    - cookie ----- 自定义用户数据

####创建会议失败 {#CRVideo_CreateMeetingFail}

>CRVideo_CreateMeetingFail.callback = function(sdkEr ,cookie){}

- **功能**：创建会议失败响应

+ **参数**：
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####销毁会议 {#CRVideo_DestroyMeetingRslt}

>CRVideo_DestroyMeetingRslt.callback = function(sdkEr ,cookie){}

- **功能**：结束会议响应

+ **参数**：
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####获取会议列表成功 {#CRVideo_GetMeetingsSuccess}

>CRVideo_GetMeetingsSuccess.callback = function(jsonMeetings,cookie){}

- **功能**：获取会议列表成功响应

+ **参数**：
    - jsonMeetings ------ [会议列表信息](json.md#MeetInfoObjs)
    - cookie ----- 自定义用户数据

####获取会议列表失败 {#CRVideo_GetMeetingsFail}

>CRVideo_GetMeetingsFail.callback = function(sdkEr,cookie){}

- **功能**：获取会议列表失败响应

+ **参数**：
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####发起呼叫操作成功 {#CRVideo_CallSuccess}

>CRVideo_CallSuccess.callback = function(callID ,cookie){}

- **功能**：呼叫他人操作成功响应

+ **参数**：
    - callID ----- 呼叫全局标识
    - cookie ----- 自定义用户数据

####发起呼叫操作失败 {#CRVideo_CallFail}

>CRVideo_CallFail.callback = function(callID,sdkEr,cookie){}

- **功能**：呼叫他人操作失败响应

+ **参数**：
    - callID ----- 呼叫全局标识
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####接受他人呼叫操作成功 {#CRVideo_AcceptCallSuccess}

>CRVideo_AcceptCallSuccess.callback = function(callID,cookie){}

- **功能**：接受他人呼叫操作成功响应

+ **参数**：
    - callID ----- 呼叫全局标识
    - cookie ----- 自定义用户数据

####接受他人呼叫操作失败 {#CRVideo_AcceptCallFail}

>CRVideo_AcceptCallFail.callback = function(callID,sdkEr,cookie){}

- **功能**：接受他人呼叫操作失败响应

+ **参数**：
    - callID ----- 呼叫全局标识
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####拒绝他人的呼叫成功 {#CRVideo_RejectCallSuccess}

>CRVideo_RejectCallSuccess.callback = function(callID,cookie){}

- **功能**：拒绝他人的呼叫成功响应

+ **参数**：
    - callID ----- 呼叫全局标识
    - cookie ----- 自定义用户数据

####拒绝他人的呼叫失败 {#CRVideo_RejectCallFail}

>CRVideo_RejectCallFail.callback = function(callID,sdkEr,cookie){}

- **功能**：拒绝他人的呼叫失败响应

+ **参数**：
    - callID ----- 呼叫全局标识
    - sdkEr ----- 操作失败代码,定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

####挂断他人的呼叫成功 {#CRVideo_HangupCallSuccess}

>CRVideo_HangupCallSuccess.callback = function(callID,cookie){}

- **功能**：挂断他人的呼叫成功响应

+ **参数**：
    - callID ----- 呼叫全局标识
    - cookie ----- 自定义用户数据

####挂断他人的呼叫失败 {#CRVideo_HangupCallFail}

>CRVideo_HangupCallFail.callback = function(callID,sdkEr,cookie){}

- **功能**：挂断呼叫操作失败响应

+ **参数**：
    - callID ----- 呼叫全局标识
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义用户数据

#### 通知有人呼入 {#CRVideo_NotifyCallIn}

>CRVideo_NotifyCallIn.callback = function(callID,meetObj,callerID,usrExtDat){}

- **功能**：SDK通知自己被呼叫

+ **参数**：
    - callID ----- 呼叫全局标识
    - meetObj ----- [会议信息](json.md#MeetInfoObj)
    - callerID ----- 呼叫人员的标识ID
    - usrExtDat ----- 自定义扩展参数

####通知呼叫被对方接受 {#CRVideo_NotifyCallAccepted}

>CRVideo_NotifyCallAccepted.callback = function(callID,meetObj,usrExtDat){}

- **功能**：SDK通知自己视频呼叫被对方接受

+ **参数**：
    - callID ----- 呼叫全局标识
    - meetObj ----- 会议信息
    - usrExtDat ----- 自定义扩展参数

####通知呼叫被对方拒绝 {#CRVideo_NotifyCallRejected}

>CRVideo_NotifyCallRejected.callback = function(callID,sdkErr,usrExtDat){}

- **功能**：SDK通知自己呼叫被对方拒绝

+ **参数**：
    - callID ----- 呼叫全局标识
    - sdkErr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - usrExtDat ----- 自定义扩展参数

####通知呼叫被对方挂断 {#CRVideo_NotifyCallHungup}

>CRVideo_NotifyCallHungup.callback = function(callID,usrExtDat){}

- **功能**：SDK通知自己呼叫被挂断

+ **参数**：
    - callID ----- 呼叫全局标识
    - usrExtDat ----- 自定义扩展参数

####邀请第三方呼叫 {#CRVideo_ClientInviteRslt}

>CRVideo_ClientInviteRslt.callback = function(inviteID,sdkEr,cookie){}

- **功能**：第3方呼叫操作结果

+ **参数**：
    - inviteID ----- 邀请标识码（邀请ID
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义数据 （在回调时，回传给调用者）

####取消第三方呼叫 {#CRVideo_ClientCancelInviteRslt}

>CRVideo_ClientCancelInviteRslt.callback = function(inviteID,sdkEr,cookie){}

- **功能**：取消第3方呼叫操作结果

+ **参数**：
    - inviteID ----- 邀请标识码（邀请ID）
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie ----- 自定义数据（在回调时，回传给调用者）

####通知第三方呼叫状态改变 {#CRVideo_NotifyInviteStatus}

>CRVideo_NotifyInviteStatus.callback = function(inviteID,status){}

- **功能**：SDK通知第3方呼叫状态改变

+ **参数**：
    - inviteID ----- 邀请标识码（邀请ID）
    - status ----- 第3方呼叫状态码：0-振铃； 1-接通 ；2-拒绝； 3-未应答 ；4-挂断

####发送小块数据 {#CRVideo_SendCmdRlst}

>CRVideo_SendCmdRlst.callback = function(taskID,sdkEr,cookie){}

- **功能**：发送小块数据时，SDK通知发送结果

+ **参数**：
    - taskID ----- 发送任务id
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie  ----- 自定义用户数据 

####发送大块数据{#CRVideo_SendBufferRlst}

>CRVideo_SendBufferRlst.callback = function(taskID,sdkEr,cookie){}

- **功能**：发送大块数据时，SDK通知发送结果

+ **参数**：
    - taskID ----- 发送任务id
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie  ----- 自定义用户数据 

####发送文件{#CRVideo_SendFileRlst}

>CRVideo_SendFileRlst.callback = function(taskID,fileName,sdkEr,cookie){}

- **功能**：发送文件时，SDK通知发送结果

+ **参数**：
    - taskID ----- 发送任务id
    - fileName ----- 文件名
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie  ----- 自定义用户数据 

####发送数据时，通知发送进度 {#CRVideo_SendProgress}

>CRVideo_SendProgress.callback = function(taskID,sendedLen,totalLen,cookie){}

- **功能**：发送数据时，SDK通知发送进度

+ **参数**：
    - taskID ----- 发送任务id
    - sendedLen ----- 已发送的数据长度
    - totalLen ----- 需要发送的总长度
    - cookie  ----- 自定义用户数据 

####取消发送响应 {#CRVideo_CancelSendRlst}

>CRVideo_CancelSendRlst.callback = function(taskID,sdkEr,cookie){}

- **功能**：取消发送响应

+ **参数**：
    - taskID ----- 发送任务id
    - sdkEr ----- 操作失败代码，定义见[CRVideo_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
    - cookie  ----- 自定义用户数据 

####通知收到小块数据 {#CRVideo_NotifyCmdData}

>CRVideo_NotifyCmdData.callback = function(sourceUserId,data){}

- **功能**：SDK通知收到小块数据

+ **参数**：
    - sourceUserId ----- 数据来源的用户
    - data ----- 数据类型

####通知收到大块数据 {#CRVideo_NotifyBufferData}

>CRVideo_NotifyBufferData.callback = function(sourceUserId,data){}

- **功能**：SDK通知收到大块数据

+ **参数**：
    - sourceUserId ----- 数据来源的用户
    - data ----- 数据类型

####通知收到文件数据 {#CRVideo_NotifyFileData}

>CRVideo_NotifyFileData.callback = function(sourceUserId,tmpFile,orgFileName){}

- **功能**：SDK通知收到文件数据（收到的文件生成在系统临时目录下，请尽快移走对应文件）

+ **参数**：
    - sourceUserId ----- 数据来源的用户
    - tmpFile ----- 临时文件，不需要时，请移除或删除对应文件
    - orgFileName ----- 源始文件名

####通知取消发送文件数据 {#CRVideo_NotifyCancelSend}

>CRVideo_NotifyCancelSend.callback = function(taskID){}

- **功能**：SDK通知取消发送文件数据

+ **参数**：
    - taskID ----- 取消的任务id