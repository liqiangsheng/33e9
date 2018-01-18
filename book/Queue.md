<!-- 队列管理 -->
# <font color="#2674ba">CloudroomQueue对象</font>

>CloudroomQueue是队列控件，实现队列功能

<!-- 1 -->
### <font color="#0099cc">初始化用户队列功能数据</font>

<p style="background:#f7f7f7;color:#718c00">方法 initQueueDat （）</p>

>void initQueueDat(string cookie)

- **功能**:初始化用户队列功能数据

- **返回值**:无

- **参数**:
    + cookie  ----- 自定义数据 (在回调时，回传给调用者)

>响应事件initQueueDatRslt初始化成功后，才可获取队列队列相关信息；成功事件loginSuccess.失败事件loginFail

<!-- 2 -->
### <font color="#0099cc">刷新所有队列状态信息</font>

<p style="background:#f7f7f7;color:#718c00">方法 refreshAllQueueStatus ()</p>

>void refreshAllQueueStatus()

- **功能**:刷新所有队列状态信息

- **返回值**:无

- **参数**:无

>响应事件queueStatusChanged(当前排队的队列或服务的队列，sdk自动有状态变化回调；其它队列则需要此函数来查询)

<!-- 3 -->
### <font color="#0099cc">获取队列信息</font>

<p style="background:#f7f7f7;color:#718c00">方法 getAllQueueInfo ()</p>

>string getAllQueueInfo（） 

- **功能**:获取队列信息

- **返回值**:json格式的字符串，详见说明

- **参数**:无

>说明：json中含多个队列信息[{"queID":0,"name":"aaa","desc":"this is desc","prio":1}，{"queID":0,"name":"bbb","desc":"this is desc","prio":2}，…]

key   | value
------| -----
queID |队列ID
name |队列名称
desc |队列描述
prio |优先级，值越小优先级越高

<!-- 4 -->
### <font color="#0099cc">获指定取队列状态</font>

<p style="background:#f7f7f7;color:#718c00">方法 getQueueStatus ()</p>

>string getQueueStatus(int queID)

- **功能**:获指定取队列状态

- **返回值**:json格式的字符串，详见说明

- **参数**:
 + queID ----- 队列id

>说明：json格式说明{"queID":0,"agent_num":12,"wait_num":3,"srv_num":11}

key   | value
------| -----
queID |队列ID
agent_num |坐席数量
wait_num |坐席数量
srv_num |正在服务的客户数量

<!-- 5 -->
### <font color="#0099cc">获取我的排队信息</font>

<p style="background:#f7f7f7;color:#718c00">方法 getQueuingInfo ()</p>

>string getQueuingInfo()

- **功能**:获取我的排队信息

- **返回值**:json格式的字符串，详见说明

- **参数**:无

>说明：json格式说明{"queID":0,"position":3,"queuingTime":17}

key   | value
------| -----
queID |队列ID 我排的队列(-1:代表我没有排队；-2:代表我正在会话中,通过GetSessionInfo可获取相关信息)
position |我的位置
queuingTime |我排队的时长(单位s)


<!-- 6 -->
### <font color="#0099cc">获取我服务的所有队列</font>

<p style="background:#f7f7f7;color:#718c00">方法 getServiceQueues ()</p>

>string getServingQueues()

- **功能**:获取我服务的所有队列

- **返回值**:队列ID列表，以’\n’分割；

- **参数**:无

<!-- 7 -->
### <font color="#0099cc">获取我的会话信息</font>

<p style="background:#f7f7f7;color:#718c00">方法 getSessionInfo ()</p>

>string getSessionInfo()

- **功能**:获取我的会话信息

- **返回值**:json格式的字符串，详见说明

- **参数**:无

>说明：json格式说明{"callID":"0000123","peerID":"123","peerName":"aaa","bCallAccepted":1,"meetingID":321321,
"meetingPswd":"123456","duration":120}

key   | value
------| -----
callID |会话的呼叫ID
peerID |会话的目标用户ID
peerName |会话的目标用户昵称
bCallAccepted |呼叫是否被对方接受 0:暂未接受，1:已接受
meetingID |呼叫接受后，分配的会议ID
meetingPswd |会议密码
duration |会议密码

<!-- 8 -->
### <font color="#0099cc">客户开始排队</font>

<p style="background:#f7f7f7;color:#718c00">方法 startQueuing ()</p>

>void startQueuing(int queID, string cookie)

- **功能**:客户开始排队

- **返回值**:无

- **参数**:
  + queID ------ 排队的队列ID
  + cookie ------ 自定义数据(在回调时，回传给调用者)

>响应事件startQueuingRslt

<!-- 9 -->
### <font color="#0099cc">客户停止排队</font>

<p style="background:#f7f7f7;color:#718c00">方法 stopQueuing  ()</p>

>void stopQueuing(string cookie)

- **功能**:客户停止排队

- **返回值**:无

- **参数**:
  + cookie  ------ 自定义数据(在回调时，回传给调用者)

>响应事件stopQueuingRslt

<!-- 10 -->
### <font color="#0099cc">开始服务某个队列(可以多次调用，开启对多个队列的服务) </font>

<p style="background:#f7f7f7;color:#718c00">方法 startService ()</p>

>void startService(int queID, string cookie)

- **功能**:开始服务某个队列(可以多次调用，开启对多个队列的服务) 

- **返回值**:无

- **参数**:
  + queID ------ 排队的队列ID
  + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>响应事件startServiceRslt开启成功后：<p>a. 如果没有开启免打扰，那么系统会自动分配客户：将收到事件autoAssignUser；</p><p>b. 如果开启免打扰，系统就不会分配客户，如需服务客户可调用：reqAssignUser</p>

<!-- 11 -->
### <font color="#0099cc">停止服务某个队列</font>

<p style="background:#f7f7f7;color:#718c00">方法 stopService ()</p>

>void stopService(int queID, string cookie)

- **功能**:停止服务某个队列

- **返回值**:无

- **参数**:
  + queID ------ 排队的队列ID
  + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>响应事件stopServiceRslt

<!-- 12 -->
### <font color="#0099cc">接受系统安排的客户</font>

<p style="background:#f7f7f7;color:#718c00">方法 acceptAssignUser ()</p>

>void acceptAssignUser(int queID, string userID, string cookie)

- **功能**:接受系统安排的客户

- **返回值**:无

- **参数**:
  + queID ------ 排队的队列ID
  + userID ------ 队列中的用户ID
  + cookie ------ 用户自定义数据(在回调时，回传给调用者)

<!-- 13 -->
### <font color="#0099cc">拒绝系统安排的客户</font>

<p style="background:#f7f7f7;color:#718c00">方法 rejectAssignUser ()</p>

>void rejectAssignUser(int queID, string userID, string cookie)

- **功能**:拒绝系统安排的客户

- **返回值**:无

- **参数**:
  + queID ------ 排队的队列ID
  + userID ------ 队列中的用户ID
  + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>被拒绝的客户将重新回到队列的最前端

<!-- 14 -->
### <font color="#0099cc">请求分配一个客户</font>

<p style="background:#f7f7f7;color:#718c00">方法 reqAssignUser ()</p>

>void reqAssignUser(string cookie)

- **功能**:请求分配一个客户

- **返回值**:无

- **参数**:
 + cookie ------ 用户自定义数据(在回调时，回传给调用者)

>响应事件reqAssignUserRslt<p>当关闭免打扰时，系统将自动分配客户，无需调用此函数；</p><p>当开启免打扰时，系统不再自动分配客户，座席如需服务客户可使用此函数分配</p>

<!-- 15 -->
### <font color="#0099cc">队列初始化操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件initQueueDatRslt</p>

>void initQueueDatRslt(int sdkErr, string cookie)

- **功能**:队列初始化操作结果

- **参数**:
 + sdkErr ------ 操作结果代码，数值参考CRVIDEOSDK_ERR_DEF，CRVIDEOSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

>分块发送，进度通知事件sendProgress.发送结果事件 sendBufferRlst.取消发送 cancelSend

<!-- 16 -->
### <font color="#0099cc">队列状态变化通知</font>

<p style="background:#f7f7f7;color:#718c00">事件queueStatusChanged</p>

>void queueStatusChanged(string jsonQueStatus)

- **功能**:队列状态变化通知

- **参数**:
 + jsonQueStatus ------ 新的队列状态，json格式的字符串,详见说明

>json格式说明:{"queID":0,"agent_num":12,"wait_num":3,"srv_num":11}

key   | value
------| -----
queID |队列id
agent_num |坐席数量
wait_num |排队客户数量
srv_num: |正在服务的客户数量

在排队的队列、或服务的队列发生变化时，将有队列状态变化通知到来；
或者在调用RefreshAllQueueStatus时，查询到的队列数据有变化时，会有通知到来；


<!-- 17 -->
### <font color="#0099cc">排队信息变化通知</font>

<p style="background:#f7f7f7;color:#718c00">事件queuingInfoChanged</p>

>void queuingInfoChanged(string jsonQueuingInfo)

- **功能**:排队信息变化通知

- **参数**:
 + jsonQueuingInfo ------ 新的队列信息,json格式的字符串，详见说明

>json格式说明{"queID":0,"name":"bbb","desc":"this is desc","prio":2}

key   | value
------| -----
queID |队列id
name |队列名称
desc |队列描述
prio: |优先级，值越小优先级越高

<!-- 18 -->
### <font color="#0099cc">开始排队操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件startQueuingRslt</p>

>void startQueuingRslt(int sdkErr, string cookie)

- **功能**:开始排队操作结果

- **参数**: 
 + sdkErr ------ 操作结果代码，数值参考CRVIDEOSDK_ERR_DEF,CRVIDEOSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

<!-- 19 -->
### <font color="#0099cc">停止排队操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件stopQueuingRslt</p>

>void stopQueuingRslt(int sdkErr, string cookie)

- **功能**:停止排队操作结果

- **参数**:
  + sdkErr ------ 操作结果代码，数值参CRVIDEOSDK_ERR_DEF,CRVIDEOSDK_NOERR为成功操作
  + cookie ------ 自定义用户数据

<!-- 20 -->
### <font color="#0099cc">开始服务队列操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件startServiceRslt</p>

>void startServiceRslt(int queID, int sdkErr, string cookie)

- **功能**:开始服务队列操作结果

- **参数**:
  + queID ------ 服务的队列ID
  + sdkErr ------ 操作结果代码，数值参考CRVIDEOSDK_ERR_DEF,CRVIDEOSDK_NOERR为成功操作
  + sdkErr ------ 自定义用户数据

<!-- 21 -->
### <font color="#0099cc">停止服务队列操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件stopServiceRslt</p>

>void stopServiceRslt(int queID, int sdkErr, string cookie)

- **功能**:停止服务队列操作结果

- **参数**:
  + queID ------ 服务的队列ID
  + sdkErr ------ 操作结果代码，数值参考CRVIDEOSDK_ERR_DEF,CRVIDEOSDK_NOERR为成功操作
  + sdkErr ------ 自定义用户数据

<!-- 22 -->
### <font color="#0099cc">系统自动安排客户</font>

<p style="background:#f7f7f7;color:#718c00">事件autoAssignUser</p>

>void autoAssignUser(string jsonUsr)

- **功能**:系统自动安排客户

- **参数**:
 + jsonUsr ------ 安排的用户，json格式的字符串，详见说明

>json格式说明{"queID":1,"usrID":"31231231","name":"aaa","queuingTime":"10"}

key   | value
------| -----
queID |队列id
usrID |用户ID
name |用户昵称
queuingTime: |已排队时长(秒)

如果想停止系统的自动分配，请通setDNDStatus设置免打扰功能

<!-- 23 -->
### <font color="#0099cc">系统取消已经安排的客户</font>

<p style="background:#f7f7f7;color:#718c00">cancelAssignUser</p>

>void cancelAssignUser(int queID, string usrID)

- **功能**:系统取消已经安排的客户

- **参数**:
 + queID ------ 服务的队列
 + usrID ------ 用户id

<!-- 24 -->
### <font color="#0099cc">请求分配客户操作结果</font>

<p style="background:#f7f7f7;color:#718c00">事件reqAssignUserRslt</p>

>void reqAssignUserRslt(int sdkErr, string jsonUsr, string cookie)

- **功能**:请求分配客户操作结果

- **参数**:
 + sdkErr ------ 操作结果代码，CRVIDEOSDK_NOERR为成功操作sdkErr操作结果代码，数值参考CRVIDEOSDK_ERR_DEF,CRVIDEOSDK_NOERR为成功操作
 + cookie ------ 自定义用户数据

>json格式说明{"queID":1,"usrID":"31231231","name":"aaa","queuingTime":"10"}

key   | value
------| -----
queID |队列id
usrID |用户ID
name |用户昵称
queuingTime: |已排队时长(秒)