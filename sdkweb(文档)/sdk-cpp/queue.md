# 队列管理组件 {#queue}

> CloudroomQueue 是队列控件，实现队列功能，目的是为了实现用户自动分配。
> 单例组件，整个程序的生命过程中只能有有一个实例。

-------------------

## 接口函数 {#api}

### 初始化队列 {#initQueueDat}

```cpp
void initQueueDat(string cookie)
```

* **功能** 初始化用户队列功能数据
* **返回值** 无
* **参数**
  * cookie 自定义数据(在响应消息中回传给调用者)
* **说明** 在响应回调initQueueDatRslt初始化成功后，才可获取队列队列相关信息；
* **回调函数** [initQueueDatRslt](#initQueueDatRslt)

### 刷新所有队列状态 {#refreshAllQueueStatus}

```cpp
void refreshAllQueueStatus()
```

* **功能** 刷新所有队列状态信息
* **返回值** 无
* **参数** 无
* **说明** 当前排队的队列或服务的队列，sdk自动有状态变化回调；其它队列则需要此函数来查询
* **回调函数** 触发 [queueStatusChanged](#queueStatusChanged) 通知刷新的结果

### 查询队列 {#getAllQueueInfo}

```cpp
string getAllQueueInfo()
```

* **功能** 获取队列信息
* **返回值** 返回json对象，结构定义见[QueueObjs](json.md#QueueObjs)
* **参数** 无

### 获取队列状态 {#getQueueStatus}

```cpp
string getQueueStatus(int queID)
```

* **功能** 获指定取队列状态
* **返回值** 返回json对象，结构定义见[QueueStatusObj](json.md#QueueStatusObj)
* **参数**
  * queID 队列id

### 获取我的排队信息 {#getQueuingInfo}

```cpp
string getQueuingInfo()
```

* **功能**获取我的排队信息
* **返回值** 返回json对象，结构定义见[QueuingObj](json.md#QueuingObj)
* **参数** 无

### 获取我服务的队列信息 {#getServingQueues}

```cpp
string getServingQueues()
```

* **功能** 获取我服务的所有队列
* **返回值** 队列ID列表，以’\n’分割；

### 获取我的会话信息 {#getSessionInfo}

```cpp
string getSessionInfo()
```

* **功能** 获取我的会话信息
* **返回值** 返回json对象，结构定义见[SesssionObj](json.md#SesssionObj)

### 开始 / 停止排队 {#startQueuing}

```cpp
void startQueuing(int queID, string cookie)
```

* **功能** 客户开始排队
* **返回值** 无
* **参数**
  * queID 排队的队列ID
  * cookie 用户自定义数据(在响应消息中回传给调用者)
* **回调函数** [startQueuingRslt](#startQueuingRslt)

```cpp
void startQueuing2(int queID, string usrExtDat, string cookie)
```

* **功能** 客户开始排队
* **返回值** 无
* **参数**
  * queID 排队的队列ID
  * usrExtDat 用户排队扩展数据
  * cookie 用户自定义数据(在响应消息中回传给调用者)
* **回调函数** [startQueuingRslt](#startQueuingRslt)

```cpp
void stopQueuing(string cookie)
```

* **功能** 客户停止排队
* **返回值** 无
* **参数**
  * cookie 用户自定义数据(在响应消息中回传给调用者)
* **回调函数** [stopQueuingRslt](#stopQueuingRslt)

### 开始 / 停止服务队列 {#startService}

```cpp
void startService(int queID, string cookie)
```

* **功能** 开始服务某个队列(可以多次调用，开启对多个队列的服务)
* **返回值** 无
* **参数**
  * queID 队列ID
  * cookie 用户自定义数据(在响应消息中回传给调用者)
* **回调函数** [startServiceRslt](#startServiceRslt)

> 开启队列服务成功后：
> 1. 如果没有开启免打扰，那么系统会自动分配客户：将收到事件[autoAssignUser](#autoAssignUser)
> 1. 如果开启免打扰，系统就不会分配客户，如需服务客户可调用[reqAssignUser](#reqAssignUser)

```cpp
void stopService(int queID, string cookie)
```

* **功能** 停止服务某个队列
* **返回值** 无
* **参数**
  * queID 队列ID
  * cookie 用户自定义数据(在响应消息中回传给调用者)
* **回调函数** [stopServiceRslt](#stopServiceRslt)

### 请求分配用户 {#reqAssignUser}

```cpp
void reqAssignUser(string cookie)
```

* **功能** 请求分配一个客户
* **返回值** 无
* **参数**
  * cookie 用户自定义数据(在响应消息中回传给调用者)
* **回调函数** [reqAssignUserRslt](#reqAssignUserRslt)

> 1. 当关闭免打扰时，系统将自动分配客户，无需调用此函数
> 1. 当开启免打扰时，系统不再自动分配客户，座席如需服务客户可使用此函数分配

### 接受 / 拒绝分配的用户 {#acceptAssignUser}

```cpp
void acceptAssignUser(int queID, string userID, string cookie)
```

* **功能** 接受系统安排的客户
* **返回值** 无
* **参数**
  * queID 排队的队列ID
  * userID 队列中的用户ID
  * cookie 用户自定义数据(在响应消息中回传给调用者)

```cpp
void rejectAssignUser(int queID, string userID, string cookie)
```

* **功能** 拒绝系统安排的客户
* **返回值** 无
* **参数**
  * queID 排队的队列ID
  * userID 队列中的用户ID
  * cookie 用户自定义数据(在响应消息中回传给调用者)

> 被拒绝的客户将重新回到队列的最前端。

## 通知回调函数 {#callback}

### 初始化队列结果 {#initQueueDatRslt}

```cpp
void initQueueDatRslt(int sdkErr, string cookie)
```

* **功能** 队列初始化操作结果
* **参数**
  * sdkErr 操作结果代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md)，成功为CRVIDEOSDK_NOERR
  * cookie 自定义用户数据

### 队列状态变化通知 {#queueStatusChanged}

```cpp
void queueStatusChanged(string jsonQueStatus)
```

* **功能** 队列状态变化通知
* **参数**
  * jsonQueStatus 新的队列状态，json对象，结构定义见[QueueStatusObj](json.md#QueueStatusObj)

> 1. 在排队的队列、或服务的队列发生变化时，将有队列状态变化通知到来
> 1. 在调用[refreshAllQueueStatus](#refreshAllQueueStatus)时，查询到的队列数据有变化时，会有通知到来

### 排队信息变化通知 {#queuingInfoChanged}

```cpp
void queuingInfoChanged(string jsonQueuingInfo)
```

* **功能** 排队信息变化通知
* **参数**
  * jsonQueuingInfo json对象，结构定义见[QueuingObj](json.md#QueuingObj)

### 开始 / 停止排队操作结果 {#startQueuingRslt}

```cpp
void startQueuingRslt(int sdkErr, string cookie)
```

* **功能** *startQueuing* 开始排队操作结果
* **参数**
  * sdkErr 操作结果代码，数值参考[CRVIDEOSDK_ERR_DEF](constant.md)，CRVIDEOSDK_NOERR为成功操作
  * cookie 自定义用户数据

```cpp
void stopQueuingRslt(int sdkErr, string cookie)
```

* **功能** *stopQueuing* 停止排队操作结果
* **参数**
  * sdkErr 操作结果代码，数值参[CRVIDEOSDK_ERR_DEF](constant.md)，CRVIDEOSDK_NOERR为成功操作
  * cookie 自定义用户数据

### 开始 / 停止队列服务结果 {#startServiceRslt}

```cpp
void startServiceRslt(int queID, int sdkErr, string cookie)
```

* **功能** *startService* 开始服务队列操作结果
* **参数**
  * queID 服务的队列ID
  * sdkErr 操作结果代码，参考[CRVIDEOSDK_ERR_DEF](constant.md)，CRVIDEOSDK_NOERR为成功操作
  * cookie 自定义用户数据

```cpp
void stopServiceRslt(int queID, int sdkErr, string cookie)
```

* **功能** *stopService* 停止服务队列操作结果
* **参数**
  * queID 服务的队列ID
  * sdkErr 操作结果代码，参考[CRVIDEOSDK_ERR_DEF](constant.md)，CRVIDEOSDK_NOERR为成功操作
  * cookie 自定义用户数据

### 请求分配用户结果 {#reqAssignUserRslt}

```cpp
void reqAssignUserRslt(int sdkErr, string jsonUsr, string cookie)
```

* **功能** 请求分配客户操作结果
* **参数**
  * sdkErr 操作结果代码，参考[CRVIDEOSDK_ERR_DEF](constant.md)，CRVIDEOSDK_NOERR为成功操作
  * jsonUser 请求到的队列用户，json对象，结构定义见[QueueUser](json.md#QueueUser)
  * cookie 自定义用户数据

### 自动分配用户通知 {#autoAssignUser}

```cpp
void autoAssignUser(string jsonUser)
```

* **功能** 队列系统自动分配客户
* **参数**
  * jsonUser 安排的用户，json对象，结构定义见[QueueUser](json.md#QueueUser)

> 如果想停止系统的自动分配，请调用CloudroomVideoMgr中的 [setDNDStatus](meetingMgr.md#setDNDStatus) 设置免打扰功能。

### 自动分配用户被取消 {#cancelAssignUser}

```cpp
void cancelAssignUser(int queID, string userID)
```

* **功能** 队列系统取消之前自动分配的的客户
* **参数**
  * queID 服务的队列
  * userID 用户id

> 队列系统通过接口[autoAssignUser](#autoAssignUser)给开始队列服务的人自动推送用户，收到系统分配的用户后，如果队列服务者还未决定接受[acceptAssignUser](#acceptAssignUser)还是拒绝[rejectAssignUser](#acceptAssignUser)推送的用户，系统可用取消本次推送，并通过本接口通知队列服务者。