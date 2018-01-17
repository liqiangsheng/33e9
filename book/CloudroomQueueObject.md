# <font color="#2674ba">CloudroomQueue对象</font>

>CloudroomQueue是队列控件，实现队列、呼叫等功能

<!-- 1 -->
### <font color="#0099cc">发起呼叫，邀请用户参加视频会话</font>

<p style="background:#f7f7f7;color:#718c00">方法  call  ()</p>

>string call( string calledUserID,  long meetID, string meetPwd ="", string usrExtDat="", string cookie=””)

- **功能**:发起呼叫，邀请用户参加视频会话

- **返回值**:本次呼叫标识码（呼叫ID）

- **参数**:
 + calledUserID ------ 被叫用户的账户ID
 + meetID ------ 会议ID
 + meetPwd ------ 会议密码
 + usrExtDat ------ 自定义扩展参数
 + cookie ------ 自定义数据(在回调时，回传给调用者)

>成功事件callSuccess,失败事件callFail,呼叫时,对方迟迟不响应,30秒后系统自动结束呼叫

<!-- 2 -->
### <font color="#0099cc">接受对方发起的视频请求，开始进入视频会话</font>

<p style="background:#f7f7f7;color:#718c00">方法  acceptCall  ()</p>

>void acceptCall(string callID,  string cookie=””)

- **功能**:接受对方发起的视频请求，开始进入视频会话

- **返回值**:无

- **参数**:
 + callID ------ 呼叫标识码
 + cookie ------ 自定义数据(在回调时，回传给调用者)

>成功事件acceptCallSuccess,失败事件acceptCallFail

<!-- 3 -->
### <font color="#0099cc">拒绝对方的视频请求</font>

<p style="background:#f7f7f7;color:#718c00">方法  rejectCall  ()</p>

>void rejectCall( string callID,  string cookie=””)

- **功能**:拒绝对方的视频请求

- **返回值**:无

- **参数**:
 + callID ------ 呼叫标识码
 + cookie ------ 自定义数据(在回调时，回传给调用者)

>成功事件rejectCallSuccess,失败事件rejectCallFail

<!-- 4 -->
### <font color="#0099cc">挂断正在进行的视频呼叫或视频通话</font>

<p style="background:#f7f7f7;color:#718c00">方法  hungupCall  ()</p>

>void hungupCall( string callID,  string cookie=””)

- **功能**:挂断正在进行的视频呼叫或视频通话

- **返回值**:无

- **参数**:
 + callID ------ 呼叫标识码
 + cookie ------ 自定义数据(在回调时，回传给调用者)

>成功事件hungupCallSuccess,失败事件hungupCallFail

<!-- 5 -->
### <font color="#0099cc">呼叫他人操作成功响应</font>

<p style="background:#f7f7f7;color:#718c00">事件  callSuccess  ()</p>

>void callSuccess( string callID, long meetID,  string meetPswd,  string cookie=””) 

- **功能**:呼叫他人操作成功响应

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + meetID ------ 视频会话标识ID
 + meetPswd ------ 视频会议密码
 + cookie ------ 自定义用户数据

<!-- 6 -->
### <font color="#0099cc">呼叫他人操作失败响应</font>

<p style="background:#f7f7f7;color:#718c00">事件  callFail  ()</p>

>void callFail( string callID, CRMEETSDK_ERR_DEF sdkErr,  string cookie=””)

- **功能**:呼叫他人操作失败响应

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + sdkErr ------ 操作失败代码
 + cookie ------ 自定义用户数据

<!-- 7 -->
### <font color="#0099cc">接受他人呼叫操作成功响应</font>

<p style="background:#f7f7f7;color:#718c00">事件  acceptCallSuccess  ()</p>

>void acceptCallSuccess( string callID,  string cookie=””)

- **功能**:接受他人呼叫操作成功响应

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + cookie ------ 自定义用户数据

<!-- 8 -->
### <font color="#0099cc">接受他人呼叫操作失败响应</font>

<p style="background:#f7f7f7;color:#718c00">事件  acceptCallFail  ()</p>

>void acceptCallFail( string callID, CRMEETSDK_ERR_DEF sdkErr,  string cookie=””)

- **功能**:接受他人呼叫操作失败响应

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + sdkErr ------ 操作失败代码
 + cookie ------ 自定义用户数据

<!-- 9 -->
### <font color="#0099cc">拒绝他人的呼叫成功响应</font>

<p style="background:#f7f7f7;color:#718c00">事件  rejectCallSuccess  ()</p>

>void rejectCallSuccess( string callID,  string cookie=””)

- **功能**:拒绝他人的呼叫成功响应

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + cookie ------ 自定义用户数据

<!-- 10 -->
### <font color="#0099cc">拒绝他人的呼叫失败响应</font>

<p style="background:#f7f7f7;color:#718c00">事件  rejectCallFail  ()</p>

>void rejectCallFail( string callID, CRMEETSDK_ERR_DEF sdkErr,  string cookie=””)

- **功能**:拒绝他人的呼叫失败响应

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + sdkErr ------ 操作失败代码
 + cookie ------ 自定义用户数据

<!-- 11 -->
### <font color="#0099cc">挂断呼叫操作成功响应</font>

<p style="background:#f7f7f7;color:#718c00">事件  hungupCallSuccess  ()</p>

>void hungupCallSuccess( string callID,  string cookie=””)

- **功能**:挂断呼叫操作成功响应

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + cookie ------ 自定义用户数据

<!-- 12 -->
### <font color="#0099cc">拒绝他人呼叫操作失败响应</font>

<p style="background:#f7f7f7;color:#718c00">事件  hungupCallFail  ()</p>

>void hungupCallFail( string callID, CRMEETSDK_ERR_DEF sdkErr,  string cookie=””)

- **功能**:拒绝他人呼叫操作失败响应

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + sdkErr ------ 呼叫全局标识
 + cookie ------ 自定义用户数据

<!-- 13 -->
### <font color="#0099cc">SDK通知自己被呼叫</font>

<p style="background:#f7f7f7;color:#718c00">事件  notifyCallIn  ()</p>

>void notifyCallIn( string callID, long meetID,  string meetPswd,  string callerID,  string usrExtDat)

- **功能**:SDK通知自己被呼叫

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + meetID ------ 视频会话标识ID
 + meetPswd ------ 视频会议密码（可为空）
 + callerID ------ 呼叫人员的标识ID
 + usrExtDat ------ 自定义扩展参数

<!-- 14 -->
### <font color="#0099cc">SDK通知自己视频呼叫被对方接受</font>

<p style="background:#f7f7f7;color:#718c00">事件  notifyCallAccepted  ()</p>

>void notifyCallAccepted( string callID, long meetID,  string meetPswd)

- **功能**:SDK通知自己视频呼叫被对方接受

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + meetID ------ 本次会话的id
 + meetPswd ------ 会话的密码

<!-- 15 -->
### <font color="#0099cc">SDK通知自己呼叫被对方拒绝</font>

<p style="background:#f7f7f7;color:#718c00">事件  notifyCallRejected  ()</p>

>void notifyCallRejected( string callID, CRMEETSDK_ERR_DEF reason)

- **功能**:SDK通知自己呼叫被对方拒绝

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识
 + sdkErr ------ 呼叫被对方拒绝的原因代码，定义见 CRMEETSDK_ERR_DEF

<!-- 16 -->
### <font color="#0099cc">SDK通知自己呼叫被挂断</font>

<p style="background:#f7f7f7;color:#718c00">事件  notifyCallHungup  ()</p>

>void notifyCallHungup( string callID)

- **功能**:SDK通知自己呼叫被挂断

- **返回值**:无

- **参数**:
 + callID ------ 呼叫全局标识

<!-- 17 -->
### <font color="#0099cc">初始化用户队列功能数据</font>

<p style="background:#f7f7f7;color:#718c00">方法  initQueueDat  ()</p>

>void initQueueDat(string cookie=““)

- **功能**:初始化用户队列功能数据

- **返回值**:无

- **参数**:
 + cookie ------ 自定义数据(在回调时，回传给调用者)

>响应事件initQueueDatRslt,初始化成功后，才可获取队列队列相关信息；

<!-- 18 -->
### <font color="#0099cc">刷新所有队列状态信息</font>

<p style="background:#f7f7f7;color:#718c00">方法  refreshAllQueueStatus  ()</p>

>void refreshAllQueueStatus()

- **功能**:刷新所有队列状态信息

- **返回值**:无

- **参数**:无

>响应事件queueStatusChanged,（当前排队的队列或服务的队列，sdk自动有状态变化回调；其它队列则需要此函数来查询）

<!-- 19 -->
### <font color="#0099cc">获取队列信息</font>

<p style="background:#f7f7f7;color:#718c00">方法  getAllQueueInfo  ()</p>

>QueuesInfo getAllQueueInfo（） 

- **功能**:获取队列信息

- **返回值**:QueuesInfo对象

- **参数**:无

<!-- 20 -->
### <font color="#0099cc">获指定取队列状态</font>

<p style="background:#f7f7f7;color:#718c00">方法  getQueueStatus  ()</p>

>QueueStatus getQueueStatus(long queID) 

- **功能**:获指定取队列状态

- **返回值**:对象QueueStatus

- **参数**:
 + queID ------ 队列

<!-- 21 -->
### <font color="#0099cc">获取我服务的所有队列</font>

<p style="background:#f7f7f7;color:#718c00">方法  getQueuingInfo  ()</p>

>QueuingInfo getQueuingInfo()

- **功能**:获取我服务的所有队列

- **返回值**:QueuingInfo对象

- **参数**:无

<!-- 22 -->
### <font color="#0099cc">获取我服务的所有队列</font>

<p style="background:#f7f7f7;color:#718c00">方法  getServiceQueues  ()</p>

>IDArray getServiceQueues()

- **功能**:获取我服务的所有队列

- **返回值**:IDArray对象

- **参数**:无

<!-- 23 -->
### <font color="#0099cc">获取我的会话信息</font>

<p style="background:#f7f7f7;color:#718c00">方法  getSessionInfo  ()</p>

>VideoSessionInfo getSessionInfo()

- **功能**:获取我的会话信息

- **返回值**:VideoSessionInfo对象

- **参数**:无

<!-- 24 -->
### <font color="#0099cc">客户开始排队</font>

<p style="background:#f7f7f7;color:#718c00">方法  startQueuing  ()</p>

>void startQueuing(long queID, string cookie=““)

- **功能**:客户开始排队

- **返回值**:无

- **参数**:
 + queID ------ 排队的队列
 + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>响应事件startQueuingRslt

<!-- 25 -->
### <font color="#0099cc">客户停止排队</font>

<p style="background:#f7f7f7;color:#718c00">方法  stopQueuing  ()</p>

>void stopQueuing(string cookie=““)

- **功能**:客户停止排队

- **返回值**:无

- **参数**:
 + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>响应事件stopQueuingRslt

<!-- 26 -->
### <font color="#0099cc">开始服务某个队列(可以多次调用，开启对多个队列的服务)</font>

<p style="background:#f7f7f7;color:#718c00">方法  startService  ()</p>

>void startService(long queID, string cookie=““)

- **功能**:开始服务某个队列(可以多次调用，开启对多个队列的服务) 

- **返回值**:无

- **参数**:
 + queID ------ 排队的队列
 + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>响应事件startServiceRslt.开启成功后：<p>a. 如果没有开启免打扰，那么系统会自动分配客户：将收到事件autoAssignUser；</p><p>b. 如果开启免打扰，系统就不会分配客户，如需服务客户可调用：reqAssignUser</p>

<!-- 27 -->
### <font color="#0099cc">停止服务某个队列</font>

<p style="background:#f7f7f7;color:#718c00">方法  stopService  ()</p>

>void stopService(long queID, string cookie=““)

- **功能**:停止服务某个队列

- **返回值**:无

- **参数**:
 + queID ------ 排队的队列
 + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>响应事件stopServiceRslt

<!-- 28 -->
### <font color="#0099cc">接受系统安排的客户</font>

<p style="background:#f7f7f7;color:#718c00">方法  acceptAssignUser  ()</p>

>void acceptAssignUser(long queID,  string userID, string cookie=““)

- **功能**:接受系统安排的客户

- **返回值**:无

- **参数**:
 + queID ------ 排队的队列
 + userID ------ 队列中的用户
 + cookie ------ 用户自定义数据(在回调时，回传给调用者)

<!-- 29 -->
### <font color="#0099cc">拒绝系统安排的客户</font>

<p style="background:#f7f7f7;color:#718c00">方法  rejectAssignUser  ()</p>

>void rejectAssignUser(long queID,  string userID, string cookie=““)

- **功能**:拒绝系统安排的客户

- **返回值**:无

- **参数**:
 + queID ------ 排队的队列
 + userID ------ 队列中的用户
 + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>被拒绝的客户将重新回到队列的最前端

<!-- 30 -->
### <font color="#0099cc">请求分配一个客户</font>

<p style="background:#f7f7f7;color:#718c00">方法  reqAssignUser  ()</p>

>void reqAssignUser(string cookie=““)

- **功能**:请求分配一个客户

- **返回值**:无

- **参数**:
 + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>响应事件reqAssignUserRslt.<p>a. 当关闭免打扰时，系统将自动分配客户，无需调用此函数</p><p>b. 当开启免打扰时，系统不再自动分配客户，座席如需服务客户可使用此函数分配；</p>

<!-- 31 -->
### <font color="#0099cc">队列初始化操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件  initQueueDatRslt  ()</p>

>void initQueueDatRslt(CRMEETSDK_ERR_DEF errCode, string cookie)

- **功能**:队列初始化操作结果

- **返回值**:无

- **参数**:
 + errCode ------ 操作结果代码，CRMEETSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

<!-- 32 -->
### <font color="#0099cc">队列状态变化通知</font>

<p style="background:#f7f7f7;color:#718c00">事件  queueStatusChanged  ()</p>

>void queueStatusChanged(QueueStatus queStatus)

- **功能**:队列状态变化通知

- **返回值**:无

- **参数**:
 + queStatus ------ 新的队列状态

<!-- 33 -->
### <font color="#0099cc">排队信息变化通知</font>

<p style="background:#f7f7f7;color:#718c00">事件  queuingInfoChanged  ()</p>

>void queuingInfoChanged( QueuingInfo queuingInfo)

- **功能**:排队信息变化通知

- **返回值**:无

- **参数**:
 + queuingInfo ------ 新的队列信息

<!-- 34 -->
### <font color="#0099cc">开始排队操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件  startQueuingRslt  ()</p>

>void startQueuingRslt(CRMEETSDK_ERR_DEF errCode, string cookie)

- **功能**:开始排队操作结果

- **返回值**:无

- **参数**:
 + errCode ------ 操作结果代码，CRMEETSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

<!-- 35 -->
### <font color="#0099cc">停止排队操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件  stopQueuingRslt  ()</p>

>void stopQueuingRslt(CRMEETSDK_ERR_DEF errCode, string cookie)

- **功能**:停止排队操作结果

- **返回值**:无

- **参数**:
 + errCode ------ 操作结果代码，CRMEETSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

<!-- 36 -->
### <font color="#0099cc">开始服务队列操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件  startServiceRslt  ()</p>

>void startServiceRslt(long queID, CRMEETSDK_ERR_DEF errCode, string cookie)

- **功能**:开始服务队列操作结果

- **返回值**:无

- **参数**:
 + queID ------ 服务的队列
 + errCode ------ 操作结果代码，CRMEETSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

<!-- 37 -->
### <font color="#0099cc">停止服务队列操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件  stopServiceRslt  ()</p>

>void stopServiceRslt(long queID, CRMEETSDK_ERR_DEF errCode, string cookie)

- **功能**:停止服务队列操作结果

- **返回值**:无

- **参数**:
 + queID ------ 服务的队列
 + errCode ------ 操作结果代码，CRMEETSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

<!-- 38 -->
### <font color="#0099cc">系统自动安排客户</font>

<p style="background:#f7f7f7;color:#718c00">事件  autoAssignUser  ()</p>

>void autoAssignUser(UserInfo usr)

- **功能**:系统自动安排客户

- **返回值**:无

- **参数**:
 + usr ------ 安排的用户，数据结构定义见 UserInfo

>如果想停止系统的自动分配，请通setDNDStatus设置免打扰功能；

<!-- 39 -->
### <font color="#0099cc">系统取消已经安排的客户</font>

<p style="background:#f7f7f7;color:#718c00">事件  cancleAssignUser  ()</p>

>void cancelAssignUser(long queID,  string usrID)

- **功能**:系统取消已经安排的客户

- **返回值**:无

- **参数**:
 + queID ------ 服务的队列
 + usrID ------ 用户id

<!-- 40 -->
### <font color="#0099cc">请求分配客户操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件  reqAssignUserRslt  ()</p>

>void reqAssignUserRslt(CRMEETSDK_ERR_DEF errCode, UserInfo usr, string cookie)

- **功能**:请求分配客户操作结果

- **返回值**:无

- **参数**:
 + errCode ------ 操作结果代码，CRMEETSDK_NOERR为成功操作
 + usr ------ 分到的用户
 + cookie ------ 自定义用户数据
