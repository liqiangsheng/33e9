

# 队列管理组件 {#queueMrg}

>CloudroomQueue 是队列控件，实现队列功能。单例组件，整个程序的生命过程中只能有一个实例。

----

###队列管理函数{#queueMrgFunction}

####初始化用户队列功能数据 {#CRVideo_InitQueueDat}

>CRVideo_InitQueueDat(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

>操作完成回调[CRVideo_InitQueueDatRslt](#CRVideo_InitQueueDatRslt)，队列初始化成功后才可获取队列队列相关信息

####刷新所有队列状态信息 {#CRVideo_RefreshAllQueueStatus}

>CRVideo_RefreshAllQueueStatus()

- **返回值**:无

>操作完成则触发[CRVideo_QueueStatusChanged](#CRVideo_QueueStatusChanged)（当前排队的队列，或服务的队列，sdk自动有状态变化回调）

####获取所有队列信息 {#CRVideo_GetAllQueueInfo}

>CRVideo_GetAllQueueInfo() 

- **返回值**:返回所有队列信息（Array ----- [CRVideo_QueueInfo](TypeDefinitions.md#CRVideo_QueueInfo)）

####获取队列状态 {#CRVideo_GetQueueStatus}

>CRVideo_GetQueueStatus(queID)

- **返回值**:返回队列信息（[CRVideo_QueueInfo](TypeDefinitions.md#CRVideo_QueueInfo)）

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	 |string	|队列ID|

####获取我的排队信息 {#CRVideo_GetQueuingInfo}

>CRVideo_GetQueuingInfo()

- **返回值**:返回排队信息（[CRVideo_QueuingInfo](TypeDefinitions.md#CRVideo_QueueInfo)）

####获取我服务的所有队列 {#CRVideo_GetServingQueues}

>CRVideo_GetServingQueues() 

- **返回值**:返回我服务的队列列表（Array）

####获取我的会话信息 {#CRVideo_GetSessionInfo}

>CRVideo_GetSessionInfo()

- **返回值**: 返回会话信息（[CRVideo_SessionInfo](TypeDefinitions.md#CRVideo_SessionInfo)）

####客户开始排队 {#CRVideo_StartQueuing}

>CRVideo_StartQueuing(queID, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	 |string |	队列ID |
|cookie	 |string |自定义数据 (在回调时，回传给调用者)| 

>操作完成回调[CRVideo_StartQueuingRslt](#CRVideo_StartQueuingRslt)

####客户停止排队 {#CRVideo_StopQueuing}

>CRVideo_StopQueuing(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

>操作完成回调[CRVideo_StopQueuingRslt](#CRVideo_StopQueuingRslt)

####开始服务某个队列 {#CRVideo_StartService}

>CRVideo_StartService(queID, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	 |string |	队列ID |
|cookie |	string |	自定义数据 (在回调时，回传给调用者| 

>可以多次调用，开启对多个队列的服务。操作回调[CRVideo_StartServiceRslt](#CRVideo_StartServiceRslt) 开启成功后： a. 如果没有开启免打挽，那么系统会自动分配客户：[CRVideo_AutoAssignUser](#CRVideo_AutoAssignUser)； b. 如果开启免打挽，系统就不会分配客户，如需服务客户可调用：[CRVideo_ReqAssignUser](#CRVideo_ReqAssignUser)

####停止服务某个队列 {#CRVideo_StopService}

>CRVideo_StopService(queID, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	|string|	queID 队列ID|
|cookie	|string|	cookie自定义数据 (在回调时，回传给调用者) | 

>操作完成回调[CRVideo_StopServiceRslt](#CRVideo_StopServiceRslt)

####请求分配一个客户 {#CRVideo_ReqAssignUser}

>CRVideo_ReqAssignUser(cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|cookie	|string	|自定义数据 (在回调时，回传给调用者)|

>当关闭免打扰时，系统将自动分配客户，无需调用此函数； 当开启免打扰时，系统不再自动分配客户，座席如需服务客户可使用此函数分配

####接受系统安排的客户 {#CRVideo_AcceptAssignUser}

>CRVideo_AcceptAssignUser(queID, userID, cookie)

| 参数     | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID|	string	|队列ID|
|userID|	string	|队列中的用户ID|
|cookie	|string|	自定义数据 (在回调时，回传给调用者)|

####拒绝系统安排的客户 {#CRVideo_RejectAssignUser}

>CRVideo_RejectAssignUser(queID, userID, cookie)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|queID	 | string | 	队列ID | 
|userID | 	string | 	队列中的用户ID | 
|cookie	 | string | 	自定义数据 (在回调时，回传给调用者)|

----
    
###队列管理回调{#queueMrgCallback}

#### 队列初始化操作结果 {#CRVideo_InitQueueDatRslt}

>CRVideo_InitQueueDatRslt.callback = function(sdkEr,cookie){}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 队列初始化操作结果 {#CRVideo_InitQueueDatRslt}

>CRVideo_InitQueueDatRslt.callback = function(sdkEr,cookie){
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
  
}

- queStatus ----- [队列状态](TypeDefinitions.md#CRVideo_queStatus)

#### 排队信息变化通知 {#CRVideo_QueuingInfoChanged}

>CRVideo_QueuingInfoChanged.callback = function(queuingInfo){}

- queuingInfo ----- [队列信息](TypeDefinitions.md#CRVideo_QueueInfo)

#### 开始排队操作结果 {#CRVideo_StartQueuingRslt}

>CRVideo_StartQueuingRslt.callback = function(sdkEr,cookie){}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 停止排队操作结果 {#CRVideo_StopQueuingRslt}

>CRVideo_StopQueuingRslt.callback = function(sdkEr,cookie){}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 开始服务队列操作结果 {#CRVideo_StartServiceRslt}

>CRVideo_StartServiceRslt.callback = function(queID,sdkEr,cookie){}

- queID ----- 服务的队列ID
- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 停止服务队列操作结果 {#CRVideo_StopServiceRslt}

>CRVideo_StopServiceRslt.callback = function(queID,sdkEr,cookie){}

- queID ----- 服务的队列ID
- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 响应分配客户操作结果 {#CRVideo_ResponseAssignUserRslt}

>CRVideo_ResponseAssignUserRslt.callback = function(sdkEr,cookie){

}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 系统自动安排客户 {#CRVideo_AutoAssignUser}

>CRVideo_AutoAssignUser.callback = function(user){}

- user ----- 队列用户信息。如果想停止系统的自动分配，请通[CRVideo_SetDNDStatus](meetingMrg.md#CRVideo_SetDNDStatus)设置免打扰功能

#### 请求分配客户操作结果 {#CRVideo_ReqAssignUserRslt}

>CRVideo_ReqAssignUserRslt.callback = function(sdkEr,user,cookie){}

- sdkEr ----- 操作失败代码,定义见[CRVIDEOSDK_ERR_DEF](Constant.md#CRVIDEOSDK_ERR_DEF)
- user ----- 队列用户信息
- cookie ----- 自定义数据 (在回调时，回传给调用者)

#### 系统取消已经安排的客户 {#CRVideo_CancelAssignUser}

>CRVideo_CancelAssignUser.callback = function(queID,userid){}

- queID ----- 服务的队列
- userid ----- 用户id   