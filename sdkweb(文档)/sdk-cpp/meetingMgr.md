# 会议管理组件 {#mgr}

> CloudroomVideoMgr 提供登录、呼叫、会议创建销毁、透明传输等功能
> 单例组件，整个程序的生命过程中只能有有一个实例。

---------------------

## 接口函数 {#api}

### 登陆/注销 {#login}

```cpp
void login(string authAcnt, string authPswd, string nickName, string privAcnt, string privAuthCode, string cookie)
```

* **功能** 登陆服务器
* **返回值** 无
* **参数**
  * authAcnt 云屋鉴权帐号
  * authPswd 云屋鉴权MD5密码
  * nickName 昵称
  * privAcnt 自定义帐号，不需要时传空字符串
  * privAuthCode 自定义用户帐号验证信息，缺省传空字符串（不验证），如需验证则需要SDK服务端连接客户服务器进行验证。
  * cookie 自定义数据 (在响应消息中回传给调用者)，不需要时传空字符串
* **回调函数** [loginSuccess, loginFail](#loginSuccess)

```cpp
void logout()
```

* **功能** 注销本次登陆
* **返回值** 无
* **参数** 无

> 注销后如果没有执行反初始化可再次登陆

### 设置免打扰 {#setDNDStatus}

```cpp
void setDNDStatus(int DNDStatus, string cookie)
```

* **功能** 设置免打扰状态
* **返回值** 无
* **参数**
  * DNDStatus 0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义
  * cookie 自定义数据(在响应消息中回传给调用者)，不需要时传空字符串
* **回调函数** [setDNDStatusSuccess, setDNDStatusFail](#setDNDStatusSuccess)

> 如果是使用到了SDK的队列功能，则入会后需调用此接口，设置自己的为免打扰状态，防止系统再次推送自己

### 获取用户状态信息列表 {#getUserStatus}

```cpp
void getUserStatus(string cookie)
```

* **功能** 将获取企业下所有用户在线状态（包括呼叫会议状态、免打扰状态）
* **返回值** 无
* **参数**
  * cookie 自定义数据(在响应消息中回传给调用者)，不需要时传空字符串
* **回调函数** [getUserStatusSuccess, getUserStatusFail](#getUserStatusSuccess)

### 开启/关闭用户状态推送 {#startUserStatusNotify}

```cpp
void startUserStatusNotify(string cookie)
```

* **功能** 开启用户的状态推送
* **返回值** 无
* **参数**
  * cookie 自定义数据(在响应消息中回传给调用者)，不需要时传空字符串
* **回调函数** [startUserStatusNotifyRslt](#startUserStatusNotifyRslt)

> 说明：开启后，企业下所有用户状态有变化时(包括呼叫会议状态、免打扰状态)，都会收到通知。开启后，用户量越大消息量越大，所以请按需开启；
> 在startUserStatusNotify前，应该先通过getUserStatus获取所有用户状态。

```cpp
void stopUserStatusNotify (string cookie)
```

* **功能** 关闭用户的状态推送
* **返回值** 无
* **参数**
  * cookie 自定义数据(在响应消息中回传给调用者)，不需要时传空字符串
* **回调函数** [stopUserStatusNotifyRslt](#startUserStatusNotifyRslt)

### 创建/销毁视频会议 {#createMeeting}

```cpp
void createMeeting(string meetSubject, int createPswd, string cookie)
```

* **功能** 创建视频会议
* **返回值** 无
* **参数**
  * meetSubject 会议主题（字符长度最大值50）
  * createPswd 是否创建会议密码（0：会议无密码，1：密码由系统自动生成）
  * cookie 自定义数据(在响应消息中回传给调用者)，不需要时传空字符串
* **回调函数** [createMeetingSuccess, createMeetingFail](#createMeetingSuccess)

```cpp
void destroyMeeting(int meetID, string cookie)
```

* **功能** 销毁视频会议
* **返回值** 无
* **参数**
  * meetID 会议号
  * cookie 自定义数据(在响应消息中回传给调用者)，不需要时传空字符串
* **回调函数** [destroyMeetingRslt](#createMeetingSuccess)

### 获取视频会议列表 {#getMeetings}

```cpp
void getMeetings(string cookie)
```

* **功能** 获取会议列表
* **返回值** 无
* **参数**
  * cookie 自定义数据(在响应消息中回传给调用者)，不需要时传空字符串
* **回调函数** [getMeetingsSuccess, getMeetingsFail](#getMeetingsSuccess)

### 开始呼叫 {#call}

```cpp
string call(string calledUserID, string meetObj, string usrExtDat, string cookie)
```

* **功能** 发起呼叫，邀请用户参加视频会话
* **返回值** 本次呼叫标识码（呼叫ID）
* **参数**
  * calledUserID 被叫用户的账户ID
  * meetObj 会议信息，json结构体定义请参见[MeetInfoObj](json.md#MeetInfoObj)，空时代表无会议信息，应由被叫创建或提供会议信息
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据(在响应消息中回传给调用者)
* **回调函数** [callSuccess, callFail](#callSuccess)

> 呼叫时，对方迟迟不响应，30秒后系统自动结束呼叫

### 接受/拒绝他人的呼叫 {#acceptCall}

```cpp
void acceptCall(string callID, string meetObj, string usrExtDat, string cookie)
```

* **功能** 接受对方发起的视频请求，开始进入视频会话
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * meetObj 会议信息，json结构体请参见[MeetInfoObj](json.md#MeetInfoObj)
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据(在响应消息中回传给调用者)
* **回调函数** [acceptCallSuccess, acceptCallFail](#acceptCallSuccess)

```cpp
void rejectCall(string callID, string usrExtDat, string cookie)
```

* **功能** 拒绝对方的视频请求
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据(在响应消息中回传给调用者)
* **回调函数** [rejectCallSuccess, rejectCallFail](#acceptCallSuccess)

### 挂断呼叫 {#hungupCall}

```cpp
void hungupCall(string callID, string usrExtDat, string cookie)
```

* **功能** 挂断正在进行的视频呼叫或视频通话
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据(在响应消息中回传给调用者)
* **回调函数** [hungupCallSuccess, hungupCallFail](#hungupCallSuccess)

### 邀请/取消邀请第三方入会 {#callMoreParty}

```cpp
string callMoreParty(string called, string meetObj, string usrExtDat, string cookie)
```

* **功能** 2方通话中再呼叫第3方
* **返回值** 本次邀请标识码（邀请ID）
* **参数**
  * called 被叫用户的账户ID
  * meetObj 当前会议信息，json结构体请参见[MeetInfoObj](json.md#MeetInfoObj)
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据(在响应消息中回传给调用者)

* **回调函数** [callMorePartyRslt](#callMorePartyRslt)

```cpp
void  cancelCallMoreParty(string inviteID, string usrExtDat, string cookie)
```

* **功能** 取消第3方呼叫
* **返回值** 无
* **参数**
  * inviteID 邀请标识码，邀请ID
  * usrExtDat 自定义扩展参数
  * cookie 自定义用户数据
* **回调函数** [cancelCallMorePartyRslt](#cancelCallMorePartyRslt)

### 发送命令/数据/文件 {#sendCmd}

```cpp
string sendCmd(string targetUserId, string data)
```

* **功能** 发送小块数据（50K以内）
* **返回值** 分配的任务ID
* **参数**
  * targetUserId 目标用户ID
  * data 发送的数据，base64编码
* **回调函数** [sendCmdRlst](#sendCmdRlst)

> 此接口不能被cancelSend, 一次性发送，不会有进度通知

```cpp
string sendBuffer(string targetUserId, string data)
```

* **功能** 发送大块数据
* **返回值** 分配的任务ID
* **参数**
  * targetUserId 目标用户ID
  * data 发送的数据，base64编码
* **回调函数** [sendBufferRlst](#sendCmdRlst)

> 分块发送，进度通知事件[sendProgress](#sendProgress), 调用[cancelSend](#cancelSend) 取消发送

```cpp
string sendFile(string targetUserId, string fileName)
```

* **功能** 发送文件
* **返回值** 分配的任务ID
* **参数**
  * targetUserId 目标用户ID
  * fileName 需要发送的文件名
* **回调函数** [sendFileRlst](#sendCmdRlst)

> 分块发送，进度通知事件[sendProgress](#sendProgress)，调用[cancelSend](#cancelSend)取消发送

### 取消发送 {#cancelSend}

```cpp
void cancelSend(string taskID)
```

* **功能** 取消数据发送
* **返回值** 无
* **参数**
  * taskID 任务ID
* **回调函数** [cancelSendRlst](#cancelSendRlst)

## 通知回调函数 {#callback}

### 登陆结果 {#loginSuccess}

```cpp
void loginSuccess(string usrID,  string cookie)
```

* **功能** 登录成功响应
* **参数**
  * usrID 用户账户
  * cookie 自定义用户数据

```cpp
void loginFail(int sdkErr,  string cookie)
```

* **功能** 登录失败响应
* **参数**
  * sdkErr 操作失败代码，定义见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 设置免打扰结果 {#setDNDStatusSuccess}

```cpp
void setDNDStatusSuccess(string cookie)
```

* **功能** 客户端设置免打扰状态操作成功响应
* **参数**
  * cookie 自定义用户数据

```cpp
void setDNDStatusFail(int sdkErr, string cookie)
```

* **功能** 客户端设置免打扰状态操作失败响应
* **参数**
  * sdkErr 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 获取所有用户在线状态结果 {#getUserStatusSuccess}

```cpp
void getUserStatusSuccess (string usersStatus, string cookie)
```

* **功能** 获取企业内所有用户在线状态成功响应
* **参数**
  * usersStatus 用户在线状态信息列表， 详见json结构之[UserStatusObjs](json.md#UserStatusObjs)
  * cookie 自定义用户数据

> 不在列表中的用户，代表离线状态

```cpp
void getUserStatusFail(int sdkErr, string cookie)
```

* **功能** 获取所有用户在线状态失败响应
* **参数**
  * sdkErr 操作失败代码，数值参考 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 开启/关闭用户状态推送结果 {#startUserStatusNotifyRslt}

```cpp
void startUserStatusNotifyRslt(int sdkErr, string cookie)
```

* **功能** 启动用户状态推送响应
* **参数**
  * sdkErr 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```cpp
void stopUserStatusNotifyRslt(int sdkErr, string cookie)
```

* **功能** 结束用户状态推送响应
* **参数**
  * sdkErr 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 用户状态变化通知 {#notifyUserStatus}

```cpp
void ntifyUserStatus(string userStatus, string cookie)
```

* **功能** 某个用户状态变化通知
* **参数**
  * userStatus 单个用户在线状态信息， 详见json结构之[UserStatusObj](contstant.md#UserStatusObj)
  * cookie 自定义用户数据

### 通知登陆掉线 {#lineOff}

```cpp
void lineOff(int sdkErr)
```

* **功能** SDK通知自己掉线
* **参数**
  * sdkErr 掉线的错误代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 创建/销毁会议结果 {#createMeetingSuccess}

```cpp
void createMeetingSuccess(string meetObj, string cookie)
```

* **功能** 创建会议成功响应
* **参数**
  * meetObj 会议信息, json结构体，请参见[MeetInfoObj](json.md#MeetInfoObj)
  * cookie 自定义用户数据

```cpp
void createMeetingFail(int sdkErr, string cookie)
```

* **功能** 创建会议失败响应
* **参数**
  * sdkErr 操作失败代码，数值参考 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```cpp
void destroyMeetingRslt(int sdkErr, string cookie)
```

* **功能** 结束会议响应
* **参数**
  * sdkErr 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 获取会议列表结果 {#getMeetingsSuccess}

```cpp
void getMeetingsSuccess(string jsonMeetings, string cookie);
```

* **功能** 获取当前会议列表响应
* **参数**
  * jsonMeetings 会议列表json字符串，结构参考[MeetInfoObjs](json.md#MeetInfoObjs)
  * cookie 自定义用户数据

```cpp
void getMeetingsFail(int sdkErr, string cookie);
```

* **功能** 获取当前会议列表失败
* **参数**
  * sdkErr 操作失败代码，数值参考定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 开始呼叫结果 {#callSuccess}

```cpp
void callSuccess(string callID, string cookie)
```

* **功能** 呼叫他人操作成功响应
* **参数**
  * callID 呼叫全局标识
  * cookie 自定义用户数据

```cpp
void callFail( string callID, int sdkErr, string cookie)
```

* **功能** 呼叫他人操作失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，数值参考定义 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 接受/拒绝他人呼叫结果 {#acceptCallSuccess}

```cpp
void acceptCallSuccess(string callID, string cookie)
```

* **功能** 接受他人呼叫操作成功响应
* **参数**
  * callID 呼叫全局标识 
  * cookie 自定义用户数据

```cpp
void acceptCallFail( string callID, int sdkErr, string cookie)
```

* **功能** 接受他人呼叫操作失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，数值参考定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```cpp
void rejectCallSuccess(string callID, string cookie)
```

* **功能** 拒绝他人的呼叫成功响应
* **参数**
  * callID 呼叫全局标识 
  * cookie 自定义用户数据

```cpp
void rejectCallFail(string callID, int sdkErr, string cookie)
```

* **功能** 拒绝他人的呼叫失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，数值参考定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 挂断呼叫结果 {#hungupCallSuccess}

```cpp
void hungupCallSuccess(string callID, string cookie)
```

* **功能** 挂断呼叫操作成功响应
* **参数**
  * callID 呼叫全局标识
  * cookie 自定义用户数据

```cpp
void hungupCallFail(string callID, int sdkErr, string cookie)
```

* **功能** 拒绝他人呼叫操作失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，数值参考定义 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 通知有人呼入 {#notifyCallIn}

```cpp
void notifyCallIn(string callID, string meetObj, string callerID, string usrExtDat)
```

* **功能** SDK通知自己被呼叫
* **参数**
  * callID 呼叫全局标识
  * meetObj 会议信息（json结构体请参见[MeetInfoObj](json.md#MeetInfoObj)，空时代表无会议信息，应由被叫创建或提供会议信息）
  * callerID 呼叫人员的标识ID
  * usrExtDat 自定义扩展参数

### 通知呼叫被对方接受/拒绝 {#notifyCallAccepted}

```cpp
void notifyCallAccepted(string callID, string usrExtDat, string meetObj)
```

* **功能** SDK通知自己视频呼叫被对方接受
* **参数**
  * callID 呼叫全局标识
  * meetObj 会议信息(json结构体请参见[MeetInfoObj](json.md#MeetInfoObj)，空时代表无会议信息)
  * usrExtDat 自定义扩展参数

```cpp
void notifyCallRejected( string callID, int reason, string usrExtDat)
```

* **功能** SDK通知自己呼叫被对方拒绝
* **参数**
  * callID 呼叫全局标识 
  * sdkErr 呼叫被对方拒绝的原因代码，数值参考定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * usrExtDat 自定义扩展参数

### 通知呼叫被对方挂断 {#notifyCallHungup}

```cpp
void notifyCallHungup(string callID, string usrExtDat)
```

* **功能** SDK通知呼叫被挂断
* **参数**
  * callID 呼叫全局标识
  * usrExtDat 自定义扩展参数

### 邀请/取消邀请第三方结果 {#callMorePartyRslt}

```cpp
void callMorePartyRslt(string callID, int sdkErr, string cookie)
```

* **功能** 第三方呼叫操作结果
* **参数**
  * callID 邀请标识码，邀请ID
  * sdkErr 操作结果代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```cpp
void cancelCallMorePartyRslt(string callID, int sdkErr, string cookie)
```

* **功能** 取消第3方呼叫操作结果
* **参数**
  * callID 邀请标识码，邀请ID
  * sdkErr 操作结果代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 通知邀请状态 {#notifyCallMorePartyStatus}

```cpp
void notifyCallMorePartyStatus(string callID, int status)
```

* **功能** 通知第3方呼叫状态改变
* **参数**
  * callID 邀请标识码，邀请ID
  * status 状态，0振铃，1接通，2拒绝，3未应答，4挂断

### 发送命令/数据/文件结果 {#sendCmdRlst}

```cpp
void sendCmdRlst(string taskID, int sdkErr, string cookie)
```

* **功能** 发送数据时，SDK通知发送结果
* **参数**
  * taskID 发送任务id
  * sdkErr 数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

```cpp
void sendBufferRlst(string taskID, int sdkErr, string cookie)
```

* **功能** 发送数据时，SDK通知发送结果
* **参数**
  * taskID 发送任务id
  * sdkErr 数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

```cpp
void sendFileRlst(string taskID, string fileName, int sdkErr, string cookie)
```

* **功能** 发送文件时，SDK通知发送结果
* **参数**
  * taskID 发送任务id
  * fileName 文件名
  * sdkErr 数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

### 发送进度 {#sendProgress}

```cpp
void sendProgress(string taskID, int sendedLen, int totalLen, string cookie)
```

* **功能** 发送数据时，SDK通知发送进度
* **参数**
  * taskID 发送任务id
  * sendedLen 已发送的数据长度
  * totalLen 需要发送的总长度
  * cookie 用户自定义数据

### 取消发送结果 {#cancelSendRlst}

```cpp
void cancelSendRlst(string taskID, int sdkErr, string cookie)
```

* **功能** 取消发送
* **参数**
  * taskID 发送的任务ID
  * sdkErr 数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

### 通知有命令/数据/文件发来 {#notifyCmdData}

```cpp
void notifyCmdData(string sourceUserId, string data)
```

* **功能** SDK通知收到小块数据
* **参数**
  * sourceUserId 数据来源
  * data 数组数据,base64编码

```cpp
void notifyBufferData(string sourceUserId, string data)
```

* **功能** SDK通知收到大块数据
* **参数**
  * sourceUserId 数据来源
  * data 数组数据,base64编码

```cpp
void notifyFileData(string sourceUserId, string tmpFile, string orgFileName)
```

* **功能** SDK通知收到文件数据
* **参数**
  * sourceUserId 数据来源
  * tmpFile 临时文件，不需要时，请移除或删除对应文件
  * orgFileName 源始文件名

> 收到的文件生成在系统临时目录下，请尽快移走对应文件

### 通知发来的数据/文件被取消 {#notifyCancelSend}

```cpp
void notifyCancelSend(string sendId)
```

* **功能** SDK通知取消发送文件数据
* **参数**
  * sendId 任务id