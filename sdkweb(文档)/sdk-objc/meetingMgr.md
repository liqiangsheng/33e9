# 会议管理组件 {#mgr}

> CloudroomVideoMgr 提供登录、呼叫、会议创建销毁、透明传输等功能
> 单例组件，整个程序的生命过程中只能有有一个实例。

---------------------

## 接口函数 {#api}

### 登陆/注销 {#login}

```objc
- (void)login:(LoginDat *)loginDat cookie:(NSString *)cookie;
```

* **功能** 登陆服务器
* **返回值** 无
* **参数**
  * loginDat LoginDat对象， 详见 [LoginDat](objc.md#LoginDat)
  * cookie 自定义数据，不需要时传空字符串
  * authPswd 云屋鉴权密码
  * nickName 昵称
  * privAcnt 自定义帐号，不需要时传空字符串
  * privAuthCode 自定义用户帐号验证信息，缺省传空字符串（不验证），如需验证则需要SDK服务端连接客户服务器进行验证。
  * cookie 自定义数据（在回调时，回传给调用者），不需要时传空字符串
* **回调函数** [loginSuccess， loginFail](#loginSuccess)

```objc
- (void)logout;
```

* **功能** 注销本次登陆
* **返回值** 无
* **参数** 无

> 注销后如果没有执行反初始化可再次登陆

### 设置免打扰 {#setDNDStatus}

```objc
- (void)setDNDStatus:(int)DNDStatus cookie:(NSString *)cookie;
```

* **功能** 设置免打扰状态
* **返回值** 无
* **参数**
  * DNDStatus 0代表关闭免打扰，其它值代表开启免打扰，含义自由定义
  * cookie 自定义数据（在回调时，回传给调用者），不需要时传空字符串
* **回调函数** [setDNDStatusSuccess， setDNDStatusFail](#setDNDStatusSuccess)

> 如果是使用到了 SDK 的队列功能，则入会后需调用此接口，设置自己的为免打扰状态，防止系统再次推送自己

### 获取用户状态信息列表 {#getUserStatus}

```objc
- (void)getUserStatus:(NSString *)cookie;
```

* **功能** 将获取企业下所有用户在线状态（包括呼叫会议状态、免打扰状态）
* **返回值** 无
* **参数**
  * cookie 自定义数据（在回调时，回传给调用者），不需要时传空字符串
* **回调函数** [getUserStatusRsp](#getUserStatusRsp)

### 开启/关闭用户状态推送 {#startUserStatusNotify}

```objc
- (void)startUserStatusNotify:(NSString *)cookie;
```

* **功能** 开启用户的状态推送
* **返回值** 无
* **参数**
  * cookie 自定义数据（在回调时，回传给调用者），不需要时传空字符串
* **回调函数** [startStatusPushRsp](#startStatusPushRsp)

> 说明：开启后，企业下所有用户状态有变化时(包括呼叫会议状态、免打扰状态)，都会收到通知。开启后，用户量越大消息量越大，所以请按需开启；
> 在startUserStatusNotify前，应该先通过getUserStatus获取所有用户状态。

```objc
- (void)stopUserStatusNotify:(NSString *)cookie;
```

* **功能** 关闭用户的状态推送
* **返回值** 无
* **参数**
  * cookie 自定义数据（在回调时，回传给调用者），不需要时传空字符串
* **回调函数** [stopStatusPushRsp](#stopStatusPushRsp)

### 创建/离开视频会议 {#createMeeting}

```objc
- (void)createMeeting:(NSString *)meetSubject createPswd:(BOOL)createPswd cookie:(NSString *)cookie;
```

* **功能** 创建视频会议
* **返回值** 无
* **参数**
  * meetSubject 会议主题（字符长度最大值50）
  * createPswd 是否创建会议密码（0：会议无密码，1：密码由系统自动生成）
  * cookie 自定义数据（在回调时，回传给调用者），不需要时传空字符串
* **回调函数** [createMeetingSuccess， createMeetingFail](#createMeetingSuccess)

```objc
- (void)stopMeeting:(int)meetID cookie:(NSString *)cookie;
```

* **功能** 销毁视频会议
* **返回值** 无
* **参数**
  * meetID 会议号
  * cookie 自定义数据（在回调时，回传给调用者），不需要时传空字符串
* **回调函数** [stopMeetingRslt](#stopMeetingRslt)

### 获取视频会议列表 {#getMeetingList}

```objc
- (void)getMeetingList:(NSString *)cookie;
```

* **功能** 获取会议列表
* **返回值** 无
* **参数**
  * cookie 自定义数据（在回调时，回传给调用者），不需要时传空字符串
* **回调函数** [getMeetingListSuccess， getMeetingListFail](#getMeetingListSuccess)

### 开始呼叫 {#call}

```objc
- (NSString *)call:(NSString *)calledUserID
          meetInfo:(MeetInfo *)meetInfo
             param:(NSString *)param
            cookie:(NSString *)cookie;
```

* **功能** 发起呼叫，邀请用户参加视频会话
* **返回值** 本次呼叫标识码（呼叫ID）
* **参数**
  * calledUserID 被叫用户的账户ID
  * meetInfo 会议信息，MeetInfo对象，详见 [MeetInfo](objc.md#MeetInfo)，空时代表无会议信息，应由被叫创建或提供会议信息
  * param 自定义扩展参数
  * cookie 自定义数据（在回调时，回传给调用者）
* **回调函数** [callSuccess， callFail](#callSuccess)

> 呼叫时，对方迟迟不响应，30秒后系统自动结束呼叫

### 接受/拒绝他人的呼叫 {#acceptCall}

```objc
- (void)acceptCall:(NSString *)callID
          meetInfo:(MeetInfo *)meetInfo
         usrExtDat:(NSString *)usrExtDat
            cookie:(NSString *)cookie;
```

* **功能** 接受对方发起的视频请求，开始进入视频会话
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * meetInfo 会议信息，MeetInfo对象，详见 [MeetInfo](objc.md#MeetInfo)
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据（在回调时，回传给调用者）
* **回调函数** [acceptCallSuccess， acceptCallFail](#acceptCallSuccess)

```objc
- (void)rejectCall:(NSString *)callID usrExtDat:(NSString *)usrExtDat cookie:(NSString *)cookie
```

* **功能** 拒绝对方的视频请求
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据（在回调时，回传给调用者）
* **回调函数** [rejectCallSuccess， rejectCallFail](#rejectCallSuccess)

### 挂断呼叫 {#hungupCall}

```objc
- (void)hungupCall:(NSString *)callID usrExtDat:(NSString *)usrExtDat  cookie:(NSString *)cookie;
```

* **功能** 挂断正在进行的视频呼叫或视频通话
* **返回值** 无
* **参数**
  * callID 呼叫标识码
  * usrExtDat 自定义扩展参数
  * cookie 自定义数据（在回调时，回传给调用者）
* **回调函数** [hangupCallSuccess， hangupCallFail](#hangupCallSuccess)

### 发送命令/数据/文件 {#sendCmd}

```objc
- (NSString *)sendCmd:(NSString *)targetUserId data:(NSData *)data;
```

* **功能** 发送小块数据（50K以内）
* **返回值** 分配的任务ID
* **参数**
  * targetUserId 目标用户ID
  * data 发送的数据，base64编码
* **回调函数** [sendCmdRlst](#sendCmdRlst)

> 此接口不能被 cancelSend， 一次性发送，不会有进度通知

```objc
- (NSString *)sendBuffer:(NSString *)targetUserId data:(NSData *)data;
```

* **功能** 发送大块数据
* **返回值** 分配的任务ID
* **参数**
  * targetUserId 目标用户ID
  * data 发送的数据，base64编码
* **回调函数** [sendBufferRlst](#sendBufferRlst)

> 分块发送，进度通知事件 [sendProgress](#sendProgress)， 调用 [cancelSend](#cancelSend) 取消发送

```objc
- (NSString *)sendFile:(NSString *)targetUserId fileName:(NSString *)fileName;
```

* **功能** 发送文件
* **返回值** 分配的任务ID
* **参数**
  * targetUserId 目标用户ID
  * fileName 需要发送的文件名
* **回调函数** [sendFileRlst](#sendFileRlst)

> 分块发送，进度通知事件 [sendProgress](#sendProgress)，调用 [cancelSend](#cancelSend)取消发送

### 取消发送 {#cancelSend}

```objc
- (void)cancelSend:(NSString *)sendId;
```

* **功能** 取消数据发送
* **返回值** 无
* **参数**
  * sendId 任务ID
* **回调函数** [cancelSendRlst](#cancelSendRlst)

## 通知回调函数 {#callback}

### 登陆结果 {#loginSuccess}

```objc
- (void)loginSuccess:(NSString *)usrID cookie:(NSString *)cookie;
```

* **功能** 登录成功响应
* **参数**
  * usrID 用户账户
  * cookie 自定义用户数据

```cpp
- (void)loginFail:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 登录失败响应
* **参数**
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 设置免打扰结果 {#setDNDStatusSuccess}

```objc
- (void)setDNDStatusSuccess:(NSString *)cookie;
```

* **功能** 客户端设置免打扰状态操作成功响应
* **参数**
  * cookie 自定义用户数据

```objc
- (void)setDNDStatusFail:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 客户端设置免打扰状态操作失败响应
* **参数**
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 获取所有用户在线状态结果 {#getUserStatusSuccess}

```objc
- (void)getUserStatusRsp:(CRVIDEOSDK_ERR_DEF)sdkErr userStatus:(NSArray <UserStatus *> *)userStatus cookie:(NSString *)cookie;
```

* **功能** 获取企业内所有用户在线状态成功响应
* **参数**
  * sdkErr 掉线的错误代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * userStatus 用户在线状态信息数组，详见 [userStatus](json.md#UserStatusObjs)
  * cookie 自定义用户数据

> 不在列表中的用户，代表离线状态

### 开启/关闭用户状态推送结果 {#startUserStatusNotifyRslt}

```objc
- (void)startStatusPushRsp:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 启动用户状态推送响应
* **参数**
  * sdkErr 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```objc
- (void)stopStatusPushRsp:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 结束用户状态推送响应
* **参数**
  * sdkErr 操作失败代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 用户状态变化通知 {#notifyUserStatus}

```objc
- (void)notifyUserStatus:(UserStatus *)uStatus;
```

* **功能** 某个用户状态变化通知
* **参数**
  * uStatus 单个用户在线状态信息，详见 [userStatus](json.md#UserStatusObjs)

### 通知登陆掉线 {#lineOff}

```objc
- (void)lineOff:(CRVIDEOSDK_ERR_DEF)sdkErr;
```

* **功能** SDK通知自己掉线
* **参数**
  * sdkErr 掉线的错误代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 创建/离开会议结果 {#createMeetingSuccess}

```objc
- (void)createMeetingSuccess:(MeetInfo *)meetInfo cookie:(NSString *)cookie;
```

* **功能** 创建会议成功响应
* **参数**
  * meetInfo 会议信息， MeetInfo对象，详见 [MeetInfo](objc.md#MeetInfo)
  * cookie 自定义用户数据

```objc
- (void)createMeetingFail:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 创建会议失败响应
* **参数**
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```objc
- (void)stopMeetingRslt:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 离开会议响应
* **参数**
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 获取会议列表结果 {#getMeetingsSuccess}

```objc
- (void)getMeetingListSuccess:(NSArray <MeetInfo *> *)meetList cookie:(NSString *)cookie;
```

* **功能** 获取当前会议列表响应
* **参数**
  * meetList 会议列表，详见 [MeetInfo](objc.md#MeetInfo)
  * cookie 自定义用户数据

```objc
- (void)getMeetingListFail:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 获取当前会议列表失败
* **参数**
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 开始呼叫结果 {#callSuccess}

```objc
- (void)callSuccess:(NSString *)callID cookie:(NSString *)cookie;
```

* **功能** 呼叫他人操作成功响应
* **参数**
  * callID 呼叫全局标识
  * cookie 自定义用户数据

```objc
- (void)callFail:(NSString *)callID errCode:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 呼叫他人操作失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 接受/拒绝他人呼叫结果 {#acceptCallSuccess}

```objc
- (void)acceptCallSuccess:(NSString *)callID cookie:(NSString *)cookie;
```

* **功能** 接受他人呼叫操作成功响应
* **参数**
  * callID 呼叫全局标识 
  * cookie 自定义用户数据

```objc
- (void)acceptCallFail:(NSString *)callID errCode:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 接受他人呼叫操作失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

```objc
- (void)rejectCallSuccess:(NSString *)callID cookie:(NSString *)cookie;
```

* **功能** 拒绝他人的呼叫成功响应
* **参数**
  * callID 呼叫全局标识 
  * cookie 自定义用户数据

```objc
- (void)rejectCallFail:(NSString *)callID errCode:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 拒绝他人的呼叫失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 挂断呼叫结果 {#hangupCallSuccess}

```objc
- (void)hangupCallSuccess:(NSString *)callID cookie:(NSString *)cookie;
```

* **功能** 挂断呼叫操作成功响应
* **参数**
  * callID 呼叫全局标识
  * cookie 自定义用户数据

```objc
- (void)hangupCallFail:(NSString *)callID errCode:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 拒绝他人呼叫操作失败响应
* **参数**
  * callID 呼叫全局标识
  * sdkErr 操作失败代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 通知有人呼入 {#notifyCallIn}

```objc
- (void)notifyCallIn:(NSString *)callID
            meetInfo:(MeetInfo *)meetInfo
            callerID:(NSString *)callerID
               param:(NSString *)param;
```

* **功能** SDK 通知自己被呼叫
* **参数**
  * callID 呼叫全局标识
  * meetInfo 会议信息（MeetInfo 对象， 详见 [MeetInfo](objc.md#MeetInfo)，空时代表无会议信息，应由被叫创建或提供会议信息）
  * callerID 呼叫人员的标识ID
  * param 自定义扩展参数

### 通知呼叫被对方接受/拒绝 {#notifyCallAccepted}

```objc
- (void)notifyCallAccepted:(NSString *)callID meetInfo:(MeetInfo *)meetInfo;
```

* **功能** SDK 通知自己视频呼叫被对方接受
* **参数**
  * callID 呼叫全局标识
  * meetInfo 会议信息（MeetInfo 对象，详见 [MeetInfo](objc.md#MeetInfo)，空时代表无会议信息）

```objc
- (void)notifyCallRejected:(NSString *)callID reason:(CRVIDEOSDK_ERR_DEF)reason;
```

* **功能** SDK 通知自己呼叫被对方拒绝
* **参数**
  * callID 呼叫全局标识 
  * reason 呼叫被对方拒绝的原因代码，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)

### 通知呼叫被对方挂断 {#notifyCallHungup}

```objc
- (void)notifyCallHungup:(NSString *)callID;
```

* **功能** SDK通知呼叫被挂断
* **参数**
  * callID 呼叫全局标识

### 发送命令/数据/文件结果 {#sendCmdRlst}

```objc
- (void)sendCmdRlst:(NSString *)sendId sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 发送数据时，SDK通知发送结果
* **参数**
  * sendId 发送任务id
  * sdkErr 详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

```objc
- (void)sendBufferRlst:(NSString *)sendId sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 发送数据时，SDK通知发送结果
* **参数**
  * sendId 发送任务id
  * sdkErr 详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

```objc
- (void)sendFileRlst:(NSString *)sendId
            fileName:(NSString *)fileName
              sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr
              cookie:(NSString *)cookie;
```

* **功能** 发送文件时，SDK通知发送结果
* **参数**
  * sendId 发送任务id
  * fileName 文件名
  * sdkErr 详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

### 发送进度 {#sendProgress}

```objc
- (void)sendProgress:(NSString *)sendId
           sendedLen:(int)sendedLen
            totalLen:(int)totalLen
              cookie:(NSString *)cookie;
```

* **功能** 发送数据时，SDK 通知发送进度
* **参数**
  * sendId 发送任务id
  * sendedLen 已发送的数据长度
  * totalLen 需要发送的总长度
  * cookie 用户自定义数据

### 取消发送结果 {#cancelSendRlst}

```objc
- (void)cancelSendRlst:(NSString *)sendId sdkErr:(CRVIDEOSDK_ERR_DEF)sdkErr cookie:(NSString *)cookie;
```

* **功能** 取消发送
* **参数**
  * sendId 发送的任务ID
  * sdkErr 详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 用户自定义数据

### 通知有命令/数据/文件发来 {#notifyCmdData}

```objc
- (void)notifyCmdData:(NSString *)sourceUserId data:(NSData *)data;
```

* **功能** SDK 通知收到小块数据
* **参数**
  * sourceUserId 数据来源
  * data 数组数据，base64编码

```objc
- (void)notifyBufferData:(NSString *)sourceUserId data:(NSData *)data;
```

* **功能** SDK 通知收到大块数据
* **参数**
  * sourceUserId 数据来源
  * data 数组数据，base64编码

```objc
- (void)notifyFileData:(NSString *)sourceUserId tmpFile:(NSString *)tmpFile orgFileName:(NSString *)orgFileName;
```

* **功能** SDK 通知收到文件数据
* **参数**
  * sourceUserId 数据来源
  * tmpFile 临时文件，不需要时，请移除或删除对应文件
  * orgFileName 源始文件名

> 收到的文件生成在系统临时目录下，请尽快移走对应文件

### 通知发来的数据/文件被取消 {#notifyCancelSend}

```objc
- (void)notifyCancelSend:(NSString *)sendId;
```

* **功能** SDK 通知取消发送文件数据
* **参数**
  * sendId 任务id