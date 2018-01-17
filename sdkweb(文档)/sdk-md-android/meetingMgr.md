# 会议管理组件 {#mgr}

> com.cloudroom.cloudroomvideosdk.CloudroomVideoMgr 提供登录、呼叫、会议创建销毁、透明传输等功能
> 单例组件，整个程序的生命过程中只能有有一个实例。

---------------------

## 接口函数 {#api}

### 注册、反注册监听回调 {#callBack}

```Java
public void registerCallBack(CloudroomVideoMgrCallback callBack)
```

* **功能** 注册监听回调
* **返回值** 无
* **参数**
  * callBack 监听回调对象

```Java
public void unregisterCallBack(CloudroomVideoMgrCallback callBack)
```

* **功能** 反注册监听回调
* **返回值** 无
* **参数**
  * callBack 监听回调对象

```Java
public void setMgrCallBack(CloudroomVideoMgrCallback callBack)
```

* **功能** 注册监听回调，注：建议使用registerCallBack替代
* **返回值** 无
* **参数**
  * callBack 监听回调对象

### 登陆/注销 {#login}

```Java
public void login(LoginDat loginDat)
```

* **功能** 登陆服务器
* **返回值** 无
* **参数**
  * loginDat 登录数据，详见定义[LoginDat](calss.md#LoginDat)
* **回调函数** [loginSuccess, loginFail](#loginSuccess)

```Java
public void login(LoginDat loginDat, String cookie)
```

* **功能** 登陆服务器
* **返回值** 无
* **参数**
  * loginDat 登录数据，详见定义[LoginDat](calss.md#LoginDat)
  * cookie 自定义数据 (在回调时，回传给调用者)
* **回调函数** [loginSuccess, loginFail](#loginSuccess)

```Java
public void logout()
```

* **功能** 注销本次登陆
* **返回值** 无
* **参数** 无

> 注销后如果没有执行反初始化可再次登陆

### 设置免打扰 {#setDNDStatus}

```Java
public void setDNDStatus(int DNDStatus)
```

* **功能** 设置免打扰状态
* **返回值** 无
* **参数**
  * DNDStatus 0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义
* **回调函数** [setDNDStatusSuccess, setDNDStatusFail](#setDNDStatusSuccess)
* 
```Java
public void setDNDStatus(int DNDStatus, String cookie)
```

* **功能** 设置免打扰状态
* **返回值** 无
* **参数**
  * DNDStatus 0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义
  * cookie 自定义数据(在回调时，回传给调用者)
* **回调函数** [setDNDStatusSuccess, setDNDStatusFail](#setDNDStatusSuccess)

> 如果是使用到了SDK的队列功能，则入会后需调用此接口，设置自己的为免打扰状态，防止系统再次推送自己

### 获取用户状态信息列表 {#getUserStatus}

```Java
public void getUserStatus()
```

* **功能** 将获取企业下所有用户在线状态（包括呼叫会议状态、免打扰状态）
* **返回值** 无
* **参数**	无

```Java
public void getUserStatus(String cookie)
```

* **功能** 将获取企业下所有用户在线状态（包括呼叫会议状态、免打扰状态）
* **返回值** 无
* **参数**
  * cookie 自定义数据(在回调时，回传给调用者)
  
* **回调函数** [getUserStatusSuccess, getUserStatusFail](#getUserStatusSuccess)

### 开启/关闭用户状态推送 {#startUserStatusNotify}

```Java
public void startUserStatusNotify(String cookie)
```

* **功能** 开启用户的状态推送
* **返回值** 无
* **参数**	无

```Java
public void startUserStatusNotify(String cookie)
```

* **功能** 开启用户的状态推送
* **返回值** 无
* **参数**
  * cookie 自定义数据(在回调时，回传给调用者)，不需要时传空字符串
* **回调函数** [startUserStatusNotifyRslt](#startUserStatusNotifyRslt)

> 说明：开启后，企业下所有用户状态有变化时(包括呼叫会议状态、免打扰状态)，都会收到通知。开启后，用户量越大消息量越大，所以请按需开启；
> 在startUserStatusNotify前，应该先通过getUserStatus获取所有用户状态。

```Java
public void stopUserStatusNotify(String cookie)
```

* **功能** 关闭用户的状态推送
* **返回值** 无
* **参数**	无

```Java
public void stopUserStatusNotify(String cookie)
```

* **功能** 关闭用户的状态推送
* **返回值** 无
* **参数**
  * cookie 自定义数据(在回调时，回传给调用者)，不需要时传空字符串
* **回调函数** [stopUserStatusNotifyRslt](#startUserStatusNotifyRslt)

### 创建/销毁视频会议 {#createMeeting}

```Java
public void createMeeting(String meetSubject, boolean createPswd)
```

* **功能** 创建视频会议
* **返回值** 无
* **参数**
  * meetSubject 会议主题（字符长度最大值50）
  * createPswd 是否创建会议密码，密码由系统自动生成

```Java
public void createMeeting(String meetSubject, boolean createPswd, String cookie)
```

* **功能** 创建视频会议
* **返回值** 无
* **参数**
  * meetSubject 会议主题（字符长度最大值50）
  * createPswd 是否创建会议密码，密码由系统自动生成
  * cookie 自定义数据(在回调时，回传给调用者)
* **回调函数** [createMeetingSuccess, createMeetingFail](#createMeetingSuccess)

```Java
public void destroyMeeting(int meetID)
```

* **功能** 销毁视频会议
* **返回值** 无
* **参数**
  * meetID 会议号

```Java
public void destroyMeeting(int meetID, String cookie)
```

* **功能** 销毁视频会议
* **返回值** 无
* **参数**
  * meetID 会议号
  * cookie 自定义数据(在回调时，回传给调用者)
* **回调函数** [destroyMeetingRslt](#createMeetingSuccess)

### 获取视频会议列表 {#getMeetings}

```Java
public void getMeetings()
```

* **功能** 获取会议列表
* **返回值** 无
* **参数**	无

```Java
public void getMeetings(String cookie)
```

* **功能** 获取会议列表
* **返回值** 无
* **参数**
  * cookie 自定义数据(在回调时，回传给调用者)
* **回调函数** [getMeetingsSuccess, getMeetingsFail](#getMeetingsSuccess)

### 开始呼叫 {#call}

```Java
public String call(String calledUserID, MeetInfo meetInfo, String userExtDat)
```

* **功能** 发起呼叫，邀请用户参加视频会话
* **返回值** 本次呼叫标识码（呼叫ID）
* **参数**
  * calledUserID 被叫用户的账户ID
  * meetInfo 会议信息，详见定义[MeetInfo](class.md#MeetInfo)，空时代表无会议信息，应由被叫创建或提供会议信息
  * usrExtDat 自定义扩展参数

```Java
public String call(String calledUserID, MeetInfo meetInfo, String userExtDat, String cookie)
```

* **功能** 发起呼叫，邀请用户参加视频会话
* **返回值** 本次呼叫标识码（呼叫ID）
* **参数**
  * calledUserID 被叫用户的账户ID
  * meetInfo 会议信息，详见定义[MeetInfo](class.md#MeetInfo)，空时代表无会议信息，应由被叫创建或提供会议信息
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据(在回调时，回传给调用者)
* **回调函数** [callSuccess, callFail](#callSuccess)

> 呼叫时，对方迟迟不响应，30秒后系统自动结束呼叫

### 接受/拒绝他人的呼叫 {#acceptCall}

```Java
public void acceptCall(String callID, MeetInfo meetInfo)
```

* **功能** 接受对方发起的视频请求，开始进入视频会话
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * meetInfo 会议信息，详见定义[MeetInfo](class.md#MeetInfo)

```Java
public void acceptCall(String callID, MeetInfo meetInfo, String usrExtDat)
```

* **功能** 接受对方发起的视频请求，开始进入视频会话
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * meetInfo 会议信息，详见定义[MeetInfo](class.md#MeetInfo)
  * usrExtDat 自定义扩展参数

```Java
public void acceptCall(String callID, MeetInfo meetInfo, String usrExtDat, String cookie)
```

* **功能** 接受对方发起的视频请求，开始进入视频会话
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * meetInfo 会议信息，详见定义[MeetInfo](class.md#MeetInfo)
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据(在回调时，回传给调用者)
* **回调函数** [acceptCallSuccess, acceptCallFail](#acceptCallSuccess)

```Java
public void rejectCall(String callID)
```

* **功能** 拒绝对方的视频请求
* **返回值** 无
* **参数**
  * callID 呼叫标识码

```Java
public void rejectCall(String callID, String usrExtDat)
```

* **功能** 拒绝对方的视频请求
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * usrExtDat 自定义扩展参数

```Java
public void rejectCall(String callID, String usrExtDat, String cookie)
```

* **功能** 拒绝对方的视频请求
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据(在回调时，回传给调用者)
* **回调函数** [rejectCallSuccess, rejectCallFail](#acceptCallSuccess)

### 挂断呼叫 {#hungupCall}

```Java
public void hangupCall(String callID)
```

* **功能** 挂断正在进行的视频呼叫或视频通话
* **返回值** 无
* **参数**
  * callID 呼叫标识码

```Java
public void hangupCall(String callID, String usrExtDat)
```

* **功能** 挂断正在进行的视频呼叫或视频通话
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * usrExtDat 自定义扩展参数

```Java
public void hangupCall(String callID, String usrExtDat, String cookie)
```

* **功能** 挂断正在进行的视频呼叫或视频通话
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据(在回调时，回传给调用者)
* **回调函数** [hungupCallSuccess, hungupCallFail](#hungupCallSuccess)

### 发送命令/数据/文件 {#sendCmd}

```Java
public String sendCmd(String targetUserId, String data)
```

* **功能** 发送小块数据（50K以内）
* **返回值** 分配的任务ID
* **参数**
  * targetUserId 目标用户ID
  * data 发送的数据
* **回调函数** [sendCmdRlst](#sendCmdRlst)

> 此接口不能被cancelSend, 一次性发送，不会有进度通知

```Java
public String sendBuffer(String targetUserId, String data)
```

* **功能** 发送大块数据
* **返回值** 分配的任务ID
* **参数**
  * targetUserId 目标用户ID
  * data 发送的数据，建议base64编码
* **回调函数** [sendBufferRlst](#sendCmdRlst)

> 分块发送，进度通知事件[sendProgress](#sendProgress), 调用[cancelSend](#cancelSend) 取消发送

```Java
public String sendFile(String targetUserId, String fileName)
```

* **功能** 发送文件
* **返回值** 分配的任务ID
* **参数**
  * targetUserId 目标用户ID
  * fileName 需要发送的文件名
* **回调函数** [sendFileRlst](#sendCmdRlst)

> 分块发送，进度通知事件[sendProgress](#sendProgress)，调用[cancelSend](#cancelSend)取消发送

### 取消发送 {#cancelSend}

```Java
public void cancelSend(String taskID)
```

* **功能** 取消数据发送
* **返回值** 无
* **参数**
  * taskID 任务ID
* **回调函数** [cancelSendRlst](#cancelSendRlst)

## 通知回调函数 {#callback}

com.cloudroom.cloudroomvideosdk.CloudroomVideoMgr.CloudroomVideoMgrCallback是登录、呼叫、会议创建销毁、透明传输等功能的回调接口

### 登陆结果 {#loginSuccess}

```Java
void loginSuccess(String usrID, String cookie)
```

* **功能** 登录成功响应
* **参数**
  * usrID 用户账户
  * cookie 自定义用户数据

```Java
void loginFail(CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 登录失败响应
* **参数**
  * sdkErr 操作结果代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 设置免打扰结果 {#setDNDStatusSuccess}

```Java
void setDNDStatusSuccess(String cookie)
```

* **功能** 客户端设置免打扰状态操作成功响应
* **参数**
  * cookie 自定义用户数据

```Java
void setDNDStatusFail(CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 客户端设置免打扰状态操作失败响应
* **参数**
  * sdkErr 操作结果代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 获取所有用户在线状态结果 {#getUserStatusSuccess}

```Java
void getUserStatusRsp(CRVIDEOSDK_ERR_DEF sdkErr, ArrayList<UserStatus> userStatus, String cookie)
```

* **功能** 获取企业内所有用户在线状态响应
* **参数**
  * sdkErr 操作结果代码，成功为CRVIDEOSDK_NOERR，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * usersStatus 用户在线状态信息列表， 详见json结构之[UserStatus](class.md#UserStatus)
  * cookie 自定义用户数据

> 不在列表中的用户，代表离线状态

### 开启/关闭用户状态推送结果 {#startUserStatusNotifyRslt}

```Java
void startStatusPushRsp(CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 启动用户状态推送响应
* **参数**
  * sdkErr 操作结果代码，成功为CRVIDEOSDK_NOERR，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```Java
void stopStatusPushRsp(CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 结束用户状态推送响应
* **参数**
  * sdkErr 操作结果代码，成功为CRVIDEOSDK_NOERR，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 用户状态变化通知 {#notifyUserStatus}

```Java
void notifyUserStatus(UserStatus uStatus)
```

* **功能** 某个用户状态变化通知
* **参数**
  * userStatus 单个用户在线状态信息，详见定义[UserStatus](contstant.md#UserStatus)

### 通知登陆掉线 {#lineOff}

```Java
void lineOff(CRVIDEOSDK_ERR_DEF sdkErr)
```

* **功能** SDK通知自己掉线
* **参数**
  * sdkErr 掉线的错误代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 创建/销毁会议结果 {#createMeetingSuccess}

```Java
void createMeetingSuccess(MeetInfo meetInfo, String cookie)
```

* **功能** 创建会议成功响应
* **参数**
  * meetInfo 会议信息, 详见定义[MeetInfo](class.md#MeetInfo)
  * cookie 自定义用户数据

```Java
void createMeetingFail(CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 创建会议失败响应
* **参数**
  * sdkErr 操作失败代码，详见定义 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```Java
void destroyMeetingRslt(CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 结束会议响应
* **参数**
  * sdkErr 操作结果代码，成功为CRVIDEOSDK_NOERR，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 获取会议列表结果 {#getMeetingsSuccess}

```Java
void getMeetingSuccess(ArrayList<MeetInfo> meetings, String cookie)
```

* **功能** 获取当前会议列表响应
* **参数**
  * meetings 会议列表，详见定义[MeetInfo](class.md#MeetInfo)
  * cookie 自定义用户数据

```Java
void getMeetingFailed(CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 获取当前会议列表失败
* **参数**
  * sdkErr 操作失败代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 开始呼叫结果 {#callSuccess}

```Java
void callSuccess(String callID, int meetID, String meetPswd, String cookie)
```

* **功能** 呼叫他人操作成功响应
* **参数**
  * callID 呼叫全局标识
  * meetID 会议号
  * meetPswd 会议密码
  * cookie 自定义用户数据

```Java
void callFail(String callID, CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 呼叫他人操作失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 接受/拒绝他人呼叫结果 {#acceptCallSuccess}

```Java
void acceptCallSuccess(String callID, String cookie)
```

* **功能** 接受他人呼叫操作成功响应
* **参数**
  * callID 呼叫全局标识 
  * cookie 自定义用户数据

```Java
void acceptCallFail(String callID, CRVIDEOSDK_ERR_DEF sdkErr,
				String cookie)
```

* **功能** 接受他人呼叫操作失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```Java
void rejectCallSuccess(String callID, String cookie)
```

* **功能** 拒绝他人的呼叫成功响应
* **参数**
  * callID 呼叫全局标识 
  * cookie 自定义用户数据

```Java
void rejectCallFail(String callID, CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 拒绝他人的呼叫失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 挂断呼叫结果 {#hungupCallSuccess}

```Java
void hangupCallSuccess(String callID, String cookie)
```

* **功能** 挂断呼叫操作成功响应
* **参数**
  * callID 呼叫全局标识
  * cookie 自定义用户数据

```Java
void hangupCallFail(String callID, CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 拒绝他人呼叫操作失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 通知有人呼入 {#notifyCallIn}

```Java
void notifyCallIn(String callID, MeetInfo meetInfo, String callerID, String usrExtDat)
```

* **功能** SDK通知自己被呼叫
* **参数**
  * callID 呼叫全局标识
  * meetInfo 会议信息，详见定义[MeetInfo](class.md#MeetInfo)，空时代表无会议信息，应由被叫创建或提供会议信息
  * callerID 呼叫人员的标识ID
  * usrExtDat 自定义扩展参数

### 通知呼叫被对方接受/拒绝 {#notifyCallAccepted}

```Java
void notifyCallAccepted(String callID, MeetInfo meetInfo, String usrExtDat)
```

* **功能** SDK通知自己视频呼叫被对方接受
* **参数**
  * callID 呼叫全局标识
  * meetInfo 会议信息，详见定义[MeetInfo](class.md#MeetInfo)，空时代表无会议信息，应由被叫创建或提供会议信息
  * usrExtDat 自定义扩展参数

```Java
void notifyCallRejected(String callID, CRVIDEOSDK_ERR_DEF reason, String usrExtDat)
```

* **功能** SDK通知自己呼叫被对方拒绝
* **参数**
  * callID 呼叫全局标识 
  * reason 呼叫被对方拒绝的原因代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * usrExtDat 自定义扩展参数

### 通知呼叫被对方挂断 {#notifyCallHungup}

```Java
void notifyCallHungup(String callID, String usrExtDat)
```

* **功能** SDK通知呼叫被挂断
* **参数**
  * callID 呼叫全局标识
  * usrExtDat 自定义扩展参数

### 发送命令/数据/文件结果 {#sendCmdRlst}

```Java
void sendCmdRlst(String sendId, CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 发送数据时，SDK通知发送结果
* **参数**
  * taskID 发送任务id
  * sdkErr 操作结果代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

```Java
void sendBufferRlst(String sendId, CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 发送数据时，SDK通知发送结果
* **参数**
  * taskID 发送任务id
  * sdkErr 操作结果代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

```Java
void sendFileRlst(String sendId, String fileName, CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 发送文件时，SDK通知发送结果
* **参数**
  * taskID 发送任务id
  * fileName 文件名
  * sdkErr 操作结果代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

### 发送进度 {#sendProgress}

```Java
void sendProgress(String sendId, int sendedLen, int totalLen, String cookie)
```

* **功能** 发送数据时，SDK通知发送进度
* **参数**
  * taskID 发送任务id
  * sendedLen 已发送的数据长度
  * totalLen 需要发送的总长度
  * cookie 用户自定义数据

### 取消发送结果 {#cancelSendRlst}

```Java
void cancelSendRlst(String sendId, CRVIDEOSDK_ERR_DEF sdkErr, String cookie)
```

* **功能** 取消发送
* **参数**
  * taskID 发送的任务ID
  * sdkErr 操作结果代码，详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

### 通知有命令/数据/文件发来 {#notifyCmdData}

```Java
void notifyCmdData(String sourceUserId, String data)
```

* **功能** SDK通知收到小块数据
* **参数**
  * sourceUserId 数据来源
  * data 数组数据

```Java
void notifyBufferData(String sourceUserId, String data)
```

* **功能** SDK通知收到大块数据
* **参数**
  * sourceUserId 数据来源
  * data 数组数据

```Java
void notifyFileData(String sourceUserId, String tmpFile, String orgFileName)
```

* **功能** SDK通知收到文件数据
* **参数**
  * sourceUserId 数据来源
  * tmpFile 临时文件，不需要时，请移除或删除对应文件
  * orgFileName 源始文件名

> 收到的文件生成在系统临时目录下，请尽快移走对应文件

### 通知发来的数据/文件被取消 {#notifyCancelSend}

```Java
void notifyCancelSend(String sendId)
```

* **功能** SDK通知取消发送文件数据
* **参数**
  * sendId 任务id