<!-- 会议管理 -->
# <font color="#2674ba">CloudroomVideoMgr对象</font>

>登录、呼叫、会议创建管理类，还负责实现呼叫功能

<!-- 1 -->
### <font color="#0099cc">登陆服务器</font> {#login}

<p style="background:#f7f7f7;color:#718c00">方法 login （）</p>

>void login( string authAcnt, string authPswd, string nickName, string privAcnt, string privAuthCode, string cookie)

- **功能**:登陆服务器

- **返回值**:无

- **参数**:
    + authAcnt ----- 云屋鉴权帐号
    + authPswd ----- 云屋鉴权密码
    + nickName ----- 昵称
    + privAcnt ----- 自定义帐号，不需要时传空字符串
    + privAuthCode ----- 自定义验证码(有复杂要求的，可以使用json格式)，不需要时传空字符串
    + cookie  ----- 自定义数据 (在回调时，回传给调用者)，不需要时传空字符串

>成功事件[loginSuccess](#loginSuccess).失败事件[loginFail](#loginFail)

<!-- 2 -->
### <font color="#0099cc">注销本次登陆</font> {#logout}

<p style="background:#f7f7f7;color:#718c00">方法 logout ()</p>

>void logout()

- **功能**:注销本次登陆

- **返回值**:无

- **参数**:无

>无事件

<!-- 3 -->
### <font color="#0099cc">设置免打扰状态</font> {#setDNDStatus}

<p style="background:#f7f7f7;color:#718c00">方法 setDNDStatus ()</p>

>void setDNDStatus(int DNDStatus, string cookie)

- **功能**:设置免打扰状态

- **返回值**:无

- **参数**:
 + DNDStatus ----- 0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义
 + cookie ----- 自定义数据 (在回调时，回传给调用者)，不需要时传空字符串

>成功事件[setDNDStatusSuccess](#setDNDStatusSuccess).失败事件[setDNDStatusFail](#setDNDStatusFail)

<!-- 4 -->
### <font color="#0099cc">获取用户在线状态</font> {#getUserStatus}

<p style="background:#f7f7f7;color:#718c00">方法 getUserStatus ()</p>

>void getUserStatus(string cookie)

- **功能**:获取用户在线状态

- **返回值**:无

- **参数**:
 + cookie ----- 自定义数据 (在回调时，回传给调用者)，不需要时传空字符串

>将获取企业下所有用户在线状态（包括呼叫会议状态、免打扰状态）.成功事件[getUserStatusSuccess](#getUserStatusSuccess).失败事件[getUserStatusFail](#getUserStatusFail)

<!-- 5 -->
### <font color="#0099cc">开启用户的状态推送</font> {#startUserStatusNotify}

<p style="background:#f7f7f7;color:#718c00">方法 startUserStatusNotify ()</p>

>void startUserStatusNotify(string cookie)

- **功能**:开启用户的状态推送

- **返回值**:无

- **参数**:
 + cookie ----- 自定义数据 (在回调时，回传给调用者)，不需要时传空字符串

>开启后，企业下所有用户状态有变化时(包括呼叫会议状态、免打扰状态)，都会收到通知。开启后，用户量越大消息量越大，所以请按需开启；在[startUserStatusNotify](#startUserStatusNotify)前，应该先通过[getUserStatus](#getUserStatus)获取所有用户状态

<!-- 6 -->
### <font color="#0099cc">关闭用户的状态推送</font> {#stopUserStatusNotify}

<p style="background:#f7f7f7;color:#718c00">方法 stopUserStatusNotify ()</p>

>void stopUserStatusNotify (string cookie)

- **功能**:关闭用户的状态推送

- **返回值**:无

- **参数**:
 + cookie ------ 自定义数据(在回调时，回传给调用者)，不需要时传空字符串

<!-- 7 -->
### <font color="#0099cc">创建会议</font> {#createMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 createMeeting ()</p>

>void createMeeting(string meetSubject, int createPswd, string cookie)

- **功能**:创建会议

- **返回值**:无

- **参数**:
  + meetSubject ------ 会议主题（字符长度最大值50）
  + createPswd ------ 是否创建会议密码（=0时：会议无密码，>0时：密码由系统自动生
  + cookie ------ 自定义数据(在回调时，回传给调用者)，不需要时传空字符串

>成功事件[createMeetingSuccess](#createMeetingSuccess).失败事件[createMeetingFail](#createMeetingFail)

<!-- 8 -->
### <font color="#0099cc">消毁会议</font> {#destroyMeeting}

<p style="background:#f7f7f7;color:#718c00">方法 destroyMeeting ()</p>

>void destroyMeeting(int meetID, string cookie)

- **功能**:消毁会议

- **返回值**:无

- **参数**:
  + meetID ------ 会议号
  + cookie ------ 自定义数据(在回调时，回传给调用者)，不需要时传空字符串

>结果请见[destroyMeetingRslt](#destroyMeetingRslt)

<!-- 9 -->
### <font color="#0099cc">获取会议列表</font> {#getMeetings}

<p style="background:#f7f7f7;color:#718c00">方法 getMeetings  ()</p>

>void getMeetings(string cookie)

- **功能**:获取会议列表

- **返回值**:无

- **参数**:
  + cookie  ------ 自定义数据(在回调时，回传给调用者)，不需要时传空字符串

>结果请见[getMeetingsSuccess](#getMeetingsSuccess)

<!-- 10 -->
### <font color="#0099cc">发起呼叫，邀请用户参加视频会话</font> {#call}

<p style="background:#f7f7f7;color:#718c00">方法 call ()</p>

>string call(string calledUserID, string meetObj, string usrExtDat, string cookie)

- **功能**:发起呼叫，邀请用户参加视频会话

- **返回值**:本次呼叫标识码（呼叫ID）

- **参数**:
  + calledUserID ------ 被叫用户的账户ID
  + meetObj ------ 会议信息(json结构体请参见[MeetInfoObj](ObjectstructureDing.md#MeetInfoObj)，空时代表无会议信息，应由被叫创建或提供会议信息)
  + usrExtDat ------ 自定义扩展参数
  + cookie ------ 自定义扩展参数

>成功事件[callSuccess](#callSuccess)，失败事件[callFail](#callFail),呼叫时，对方迟迟不响应，30秒后系统自动结束呼叫

<!-- 11 -->
### <font color="#0099cc">接受对方发起的视频请求，开始进入视频会话</font> {#acceptCall}

<p style="background:#f7f7f7;color:#718c00">方法 acceptCall ()</p>

>void acceptCall(string callID, string meetObj, string usrExtDat, string cookie)

- **功能**:接受对方发起的视频请求，开始进入视频会话

- **返回值**:无

- **参数**:
  + callID ------ 呼叫标识码
  + meetObj ------ 会议信息(json结构体请参见[MeetInfoObj](ObjectstructureDing.md#MeetInfoObj)，如果主叫未提供会议信息时，被叫应创建会议并在此提供给对方。如果主叫已提供，在此可原封不动回传对方，也可传空给对方)
  + usrExtDat ------ 自定义扩展参数
  + cookie ------ 自定义数据(在回调时，回传给调用者)


>成功事件[acceptCallSuccess](#acceptCallSuccess).失败事件[acceptCallFail](#acceptCallFail)

<!-- 12 -->
### <font color="#0099cc">拒绝对方的视频请求</font> {#rejectCall}

<p style="background:#f7f7f7;color:#718c00">方法 rejectCall ()</p>

>void rejectCall(string callID, string usrExtDat, string cookie)

- **功能**:拒绝对方的视频请求

- **返回值**:无

- **参数**:
  + callID ------ 呼叫标识码
  + usrExtDat ------ 自定义扩展参数
  + cookie ------ 自定义数据(在回调时，回传给调用者)

>成功事件[rejectCallSuccess](#rejectCallSuccess).失败事件[rejectCallFail](#rejectCallFail)

<!-- 13 -->
### <font color="#0099cc">挂断正在进行的视频呼叫或视频通话</font> {#hungupCall}

<p style="background:#f7f7f7;color:#718c00">方法 hungupCall ()</p>

>void hungupCall(string callID, string usrExtDat, string cookie)

- **功能**:挂断正在进行的视频呼叫或视频通话

- **返回值**:无

- **参数**:
  + callID ------ 呼叫标识码
  + usrExtDat ------ 自定义扩展参数
  + cookie ------ 自定义数据(在回调时，回传给调用者)

>成功事件[hungupCallSuccess](#hungupCallSuccess).失败事件[hungupCallFail](#hungupCallFail)

<!-- 14 -->
### <font color="#0099cc">发送小块数据（50K以内）</font> {#sendCmd}

<p style="background:#f7f7f7;color:#718c00">方法 sendCmd ()</p>

>string sendCmd(string targetUserId, string data)

- **功能**:发送小块数据（50K以内）

- **返回值**:分配的任务ID

- **参数**:
 + targetUserId ------ 目标用户ID
 + data ------ 发送的数据,base64编码

>一次性发送，不会有进度通知.发送结果事件[sendCmdRlst](#sendCmdRlst).sendCmd不能被[cancelSend](#cancelSend)

<!-- 15 -->
### <font color="#0099cc">发送大块数据</font> {#sendBuffer}

<p style="background:#f7f7f7;color:#718c00">方法 sendBuffer ()</p>

>string sendBuffer(string targetUserId, string data)

- **功能**:发送大块数据

- **返回值**:分配的任务ID

- **参数**:
 + targetUserId ------ 目标用户ID 
 + data ------ 发送的数据,base64编码 

>分块发送，进度通知事件[sendProgress](#sendProgress).发送结果事件 [sendBufferRlst](#sendBufferRlst).取消发送 [cancelSend](#cancelSend)

<!-- 16 -->
### <font color="#0099cc">发送文件</font> {#sendFile}

<p style="background:#f7f7f7;color:#718c00">方法 sendFile ()</p>

>string sendFile(string targetUserId, string fileName)

- **功能**:发送文件

- **返回值**:分配的任务ID

- **参数**:
 + targetUserId ------ 目标用户ID
 + fileName ------ 需要发送的文件名  

>分块发送，进度通知事件[sendProgress](#sendProgress).发送结果事件[sendBufferRlst](#sendBufferRlst).取消发送 [cancelSend](#cancelSend)

<!-- 17 -->
### <font color="#0099cc">取消数据发送</font> {#cancelSend}

<p style="background:#f7f7f7;color:#718c00">方法 cancelSend ()</p>

>void cancelSend(string taskID)

- **功能**:取消数据发送

- **返回值**:无

- **参数**:
 + taskID ------ 任务ID

>取消结果通知: 事件 [cancelSendRlst](#cancelSendRlst)

<!-- 18 -->
### <font color="#0099cc">登录成功响应</font> {#loginSuccess}

<p style="background:#f7f7f7;color:#718c00">事件loginSuccess</p>

>void loginSuccess(string usrID,  string cookie)

- **功能**:登录成功响应

- **参数**: 
 + usrID ------ 用户账户
 + cookie ------ 自定义用户数据

<!-- 19 -->
### <font color="#0099cc">登录失败响应</font> {#loginFail}

<p style="background:#f7f7f7;color:#718c00">事件loginFail</p>

>void loginFail(int sdkErr,  string cookie)

- **功能**:登录失败响应

- **参数**:
  + sdkErr ------ 操作失败代码，定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
  + cookie ------ 自定义用户数据

<!-- 20 -->
### <font color="#0099cc">SDK通知自己掉线</font> {#lineOff}

<p style="background:#f7f7f7;color:#718c00">事件lineOff</p>

>void lineOff(int sdkErr)

- **功能**:SDK通知自己掉线

- **参数**:
  + sdkErr ------ 操作失败代码，定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)

<!-- 21 -->
### <font color="#0099cc">客户端设置免打扰状态操作成功响应</font> {#setDNDStatusSuccess}

<p style="background:#f7f7f7;color:#718c00">事件setDNDStatusSuccess</p>

>void setDNDStatusSuccess(string cookie)

- **功能**:客户端设置免打扰状态操作成功响应

- **参数**:
  + cookie ------ 自定义用户数据

<!-- 22 -->
### <font color="#0099cc">客户端设置免打扰状态操作失败响应</font> {#setDNDStatusFail}

<p style="background:#f7f7f7;color:#718c00">事件setDNDStatusFail</p>

>void setDNDStatusFail(int sdkErr, string cookie)

- **功能**:客户端设置免打扰状态操作失败响应

- **参数**:
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 23 -->
### <font color="#0099cc">获取所有用户在线状态成功响应</font> {#getUserStatusSuccess}

<p style="background:#f7f7f7;color:#718c00">事件getUserStatusSuccess</p>

>void getUserStatusSuccess (string usersStatus, string cookie)

- **功能**:获取所有用户在线状态成功响应

- **参数**:
 + usersStatus ------ 用户在线状态信息列表， 详见json结构之[UserStatusObjs](ObjectstructureDing.md#UserStatusObjs)
 + cookie ------ 自定义用户数据

>不在列表中的用户，代表离线状态

<!-- 24 -->
### <font color="#0099cc">获取所有用户在线状态失败响应</font> {#getUserStatusFail}

<p style="background:#f7f7f7;color:#718c00">事件getUserStatusFail</p>

>void getUserStatusFail(int sdkErr, string cookie)

- **功能**:获取所有用户在线状态失败响应

- **参数**:
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 25 -->
### <font color="#0099cc">某个用户状态变化通知</font> {#notifyUserStatus}

<p style="background:#f7f7f7;color:#718c00">事件notifyUserStatus</p>

>void notifyUserStatus(string userStatus, string cookie)

- **功能**:某个用户状态变化通知

- **参数**:
 + userStatus ------ 单个用户在线状态信息， 详见json结构之[UserStatusObj](ObjectstructureDing.md#UserStatusObj)
 + cookie ------ 自定义用户数据

<!-- 26 -->
### <font color="#0099cc">启动用户状态推送响应</font> {#startUserStatusNotifyRslt}
 
<p style="background:#f7f7f7;color:#718c00">事件startUserStatusNotifyRslt</p>

>void startUserStatusNotifyRslt(int sdkErr, string cookie)

- **功能**:启动用户状态推送响应

- **参数**:
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 27 -->
### <font color="#0099cc">结束用户状态推送响应</font> {#stopUserStatusNotifyRslt}

<p style="background:#f7f7f7;color:#718c00">事件stopUserStatusNotifyRslt</p>

>void stopUserStatusNotifyRslt(int sdkErr, string cookie)

- **功能**:结束用户状态推送响应

- **参数**:
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 28 -->
### <font color="#0099cc">创建会议成功响应</font> {#createMeetingSuccess}

<p style="background:#f7f7f7;color:#718c00">事件createMeetingSuccess</p>

>void createMeetingSuccess(string meetObj, string cookie)

- **功能**创建会议成功响应

- **参数**:
 + meetObj ----- 会议信息(json结构体，请参见[MeetInfoObj](ObjectstructureDing.md#MeetInfoObj))
 + cookie ------ 自定义用户数据

<!-- 29 -->
### <font color="#0099cc">创建会议失败响应</font> {#createMeetingFail}

<p style="background:#f7f7f7;color:#718c00">事件createMeetingFail </p>

>void createMeetingFail(int sdkErr, string cookie)

- **功能**:创建会议失败响应

- **参数**:
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 30 -->
### <font color="#0099cc">结束会议响应</font> {#destroyMeetingRslt}

<p style="background:#f7f7f7;color:#718c00">事件destroyMeetingRslt</p>

>void destroyMeetingRslt(int sdkErr, string cookie)

- **功能**:结束会议响应

- **参数**:
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 31 -->
### <font color="#0099cc">获取当前会议列表响应</font> {#getMeetingsSuccess}

<p style="background:#f7f7f7;color:#718c00">事件getMeetingsSuccess</p>

>void getMeetingsSuccess(string jsonMeetings, string cookie)

- **功能**:获取当前会议列表响应

- **参数**:
 + jsonMeetings ------ 会议列表json字符串，结构参考[MeetInfoObjs](ObjectstructureDing.md#MeetInfoObjs)
 + cookie ------ 自定义用户数

<!-- 32 -->
### <font color="#0099cc">获取当前会议列表失败</font> {#getMeetingsFail}

<p style="background:#f7f7f7;color:#718c00">事件getMeetingsFail</p>

>void getMeetingsFail(int sdkErr, string cookie)

- **功能**:获取当前会议列表失败

- **参数**:
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 33 -->
### <font color="#0099cc">呼叫他人操作成功响应</font> {#callSuccess}

<p style="background:#f7f7f7;color:#718c00">事件callSuccess</p>

>void callSuccess(string callID, string cookie) 

- **功能**:呼叫他人操作成功响应

- **参数**:
 + callID ------ 呼叫全局标识
 + cookie ------ 自定义用户数据

<!-- 34 -->
### <font color="#0099cc">呼叫他人操作失败响应</font> {#callFail}

<p style="background:#f7f7f7;color:#718c00">事件callFail</p>

>void callFail( string callID, int sdkErr, string cookie)

- **功能**:呼叫他人操作失败响应

- **参数**:
 + callID ------ 呼叫全局标识 
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 35 -->
### <font color="#0099cc">接受他人呼叫操作成功响应</font> {#acceptCallSuccess}

<p style="background:#f7f7f7;color:#718c00">事件acceptCallSuccess</p>

>void acceptCallSuccess(string callID, string cookie)

- **功能**:接受他人呼叫操作成功响应

- **参数**:
 + callID ------ 呼叫全局标识 
 + cookie ------ 自定义用户数据

<!-- 36 -->
### <font color="#0099cc">接受他人呼叫操作失败响应</font> {#acceptCallFail}

<p style="background:#f7f7f7;color:#718c00">事件acceptCallFail</p>

>void acceptCallFail( string callID, int sdkErr, string cookie)

- **功能**:接受他人呼叫操作失败响应

- **参数**:
 + callID ------ 呼叫全局标识 
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 37 -->
### <font color="#0099cc">拒绝他人的呼叫成功响应</font> {#rejectCallSuccess}

<p style="background:#f7f7f7;color:#718c00">事件rejectCallSuccess</p>

>void rejectCallSuccess(string callID, string cookie)

- **功能**:拒绝他人的呼叫成功响应

- **参数**:
 + callID ------ 呼叫全局标识 
 + cookie ------ 自定义用户数据

<!-- 38 -->
### <font color="#0099cc">拒绝他人的呼叫失败响应</font> {#rejectCallFail}
 
<p style="background:#f7f7f7;color:#718c00">事件rejectCallFail</p>

>void rejectCallFail(string callID, int sdkErr, string cookie)

- **功能**:拒绝他人的呼叫失败响应

- **参数**:
 + callID ------ 呼叫全局标识 
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 39 -->
### <font color="#0099cc">设置用户是否启用多摄像头</font> {#hungupCallSuccess}

<p style="background:#f7f7f7;color:#718c00">事件hungupCallSuccess</p>

>void hungupCallSuccess(string callID, string cookie)

- **功能**:设置用户是否启用多摄像头

- **参数**:
 + callID ------ 呼叫全局标识 
 + cookie ------ 自定义用户数据

<!-- 40 -->
### <font color="#0099cc">拒绝他人呼叫操作失败响应</font> {#hungupCallFail}

<p style="background:#f7f7f7;color:#718c00">事件hungupCallFail</p>

>void hungupCallFail(string callID, int sdkErr, string cookie)

- **功能**:拒绝他人呼叫操作失败响应

- **参数**:
 + callID ------ 呼叫全局标识 
 + sdkErr ------ 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 自定义用户数据

<!-- 41 -->
### <font color="#0099cc">SDK通知自己被呼叫</font> {#notifyCallIn}

<p style="background:#f7f7f7;color:#718c00">事件notifyCallIn</p>

>void notifyCallIn(string callID, string meetObj, string callerID, string usrExtDat)

- **功能**:SDK通知自己被呼叫

- **参数**:
 + callID ------ 呼叫全局标识 
 + meetObj ------ 会议信息(json结构体请参见[MeetInfoObj](ObjectstructureDing.md#MeetInfoObj)，空时代表无会议信息，应由被叫创建或提供会议信息)
 + callerID ------ 呼叫人员的标识ID
 + usrExtDat ------ 自定义扩展参数


<!-- 42 -->
### <font color="#0099cc">SDK通知自己视频呼叫被对方接受</font> {#notifyCallAccepted}

<p style="background:#f7f7f7;color:#718c00">事件notifyCallAccepted</p>

>void notifyCallAccepted(string callID, string usrExtDat, string meetObj)

- **功能**:SDK通知自己视频呼叫被对方接受

- **参数**:
 + callID ------ 呼叫全局标识 
 + meetObj ------ 会议信息(json结构体请参见[MeetInfoObj](ObjectstructureDing.md#MeetInfoObj)，空时代表无会议信息)
 + usrExtDat ------ 自定义扩展参数

<!-- 43 -->
### <font color="#0099cc">SDK通知自己呼叫被对方拒绝</font> {#notifyCallRejected}

<p style="background:#f7f7f7;color:#718c00">事件notifyCallRejected</p>

>void notifyCallRejected( string callID, int reason, string usrExtDat)

- **功能**:SDK通知自己呼叫被对方拒绝

- **参数**:
 + callID ------ 呼叫全局标识 
 + sdkErr ------ 呼叫被对方拒绝的原因代码，数值参考定义[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + usrExtDat ------ 自定义扩展参数

<!-- 44 -->
### <font color="#0099cc">SDK通知呼叫被挂断</font> {#notifyCallHungup}

<p style="background:#f7f7f7;color:#718c00">事件notifyCallHungup</p>

>void notifyCallHungup(string callID, string usrExtDat)

- **功能**:SDK通知呼叫被挂断

- **参数**:
 + callID ------ 呼叫全局标识 
 + usrExtDat ------ 自定义扩展参数

<!-- 45 -->
### <font color="#0099cc">发送数据时，SDK通知发送结果</font> {#sendCmdRlst}

<p style="background:#f7f7f7;color:#718c00">事件sendCmdRlst</p>

>void sendCmdRlst(string taskID, int sdkErr, string cookie)

- **功能**:发送数据时，SDK通知发送结果

- **参数**:
 + taskID ------ 发送任务id
 + sdkErr ------ 数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 用户自定义数据
 
<!-- 46 -->
### <font color="#0099cc">发送数据时，SDK通知发送结果</font> {#sendBufferRlst}

<p style="background:#f7f7f7;color:#718c00">事件sendBufferRlst</p>

>void sendBufferRlst(string taskID, int sdkErr, string cookie)

- **功能**:发送数据时，SDK通知发送结果

- **参数**:
 + taskID ------ 发送任务id
 + sdkErr ------ 数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 用户自定义数据

<!-- 47 -->
### <font color="#0099cc">发送文件时，SDK通知发送结果</font> {#sendFileRlst}

<p style="background:#f7f7f7;color:#718c00">5事件sendFileRlst</p>

>void sendFileRlst(string taskID, string fileName, int sdkErr, string cookie)

- **功能**:发送文件时，SDK通知发送结果

- **参数**:
 + taskID ------ 发送任务id
 + fileName ------ 文件名
 + sdkErr ------ 数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 用户自定义数据

<!-- 48 -->
### <font color="#0099cc">发送数据时，SDK通知发送进度</font> {#sendProgress}

<p style="background:#f7f7f7;color:#718c00">事件sendProgress</p>

>void sendProgress(string taskID, int sendedLen, int totalLen, string cookie)

- **功能**:发送数据时，SDK通知发送进度

- **参数**:
 + taskID ------ 发送任务id
 + sendedLen ------ 已发送的数据长度
 + totalLen ------ 需要发送的总长度
 + cookie ------ 用户自定义数据

<!-- 49 -->
### <font color="#0099cc">取消发送</font> {#cancelSendRlst}

<p style="background:#f7f7f7;color:#718c00">事件cancelSendRlst</p>

>void cancelSendRlst(string taskID, int sdkErr, string cookie)

- **功能**:取消发送

- **参数**:
 + taskID ------ 发送任务id
 + sdkErr ------ 数值参考[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
 + cookie ------ 用户自定义数据

<!-- 50 -->
### <font color="#0099cc">SDK通知收到小块数据</font> {#notifyCmdData}

<p style="background:#f7f7f7;color:#718c00">事件notifyCmdData</p>

>void notifyCmdData(string sourceUserId, string data)

- **功能**:SDK通知收到小块数据

- **参数**:
 + sourceUserId ------ 数据来源
 + data ------ 数组数据,base64编码

<!-- 51 -->
### <font color="#0099cc">SDK通知收到大块数据</font> {#notifyBufferData}

<p style="background:#f7f7f7;color:#718c00">事件notifyBufferData</p>

>void notifyBufferData(string sourceUserId, string data)

- **功能**:SDK通知收到大块数据

- **参数**:
 + sourceUserId ------ 数据来源
 + data ------ 数组数据,base64编码

<!-- 52 -->
### <font color="#0099cc">SDK通知收到文件数据</font> {#notifyFileData}

<p style="background:#f7f7f7;color:#718c00">事件notifyFileData</p>

>void notifyFileData(string sourceUserId, string tmpFile, string orgFileName)

- **功能**:SDK通知收到文件数据

- **参数**:
 + sourceUserId ------ 数据来源
 + tmpFile ------ 临时文件，不需要时，请移除或删除对应文件
 + orgFileName ------ 源始文件名

<!-- 53 -->
### <font color="#0099cc">SDK通知取消发送文件数据</font> {#notifyCancelSend}

<p style="background:#f7f7f7;color:#718c00">事件notifyCancelSend</p>

>void notifyCancelSend(string sendId)

- **功能**:SDK通知取消发送文件数据
