# 队列管理组件 {#queue}

> com.cloudroom.cloudroomvideosdk.CloudroomQueue 是队列控件，实现队列功能，目的是为了实现用户自动分配。
> 单例组件，整个程序的生命过程中只能有有一个实例。

-------------------

## 接口函数 {#api}

### 注册、反注册监听回调 {#callBack}

```Java
public void registerCallBack(CloudroomQueueCallback callBack)
```

* **功能** 注册监听回调
* **返回值** 无
* **参数**
  * callBack 监听回调对象

```Java
public void unregisterCallBack(CloudroomQueueCallback callBack)
```

* **功能** 反注册监听回调
* **返回值** 无
* **参数**
  * callBack 监听回调对象

```Java
public void setQueueCallback(CloudroomQueueCallback callBack)
```

* **功能** 注册监听回调，注：建议使用registerCallBack替代
* **返回值** 无
* **参数**
  * callBack 监听回调对象

### 初始化队列 {#initQueueDat}

```Java
public void initQueue(String cookie)
```

* **功能** 初始化用户队列功能数据
* **返回值** 无
* **参数**
  * cookie 自定义数据(在回调时，回传给调用者)
* **说明** 在响应回调initQueueDatRslt初始化成功后，才可获取队列队列相关信息；
* **回调函数** [initQueueDatRslt](#initQueueDatRslt)

### 刷新所有队列状态 {#refreshAllQueueStatus}

```Java
public void refreshAllQueueStatus()
```

* **功能** 刷新所有队列状态信息
* **返回值** 无
* **参数** 无
* **说明** 当前排队的队列或服务的队列，sdk自动有状态变化回调；其它队列则需要此函数来查询
* **回调函数** 触发 [queueStatusChanged](#queueStatusChanged) 通知刷新的结果

### 查询队列 {#getAllQueueInfo}

```Java
public ArrayList<QueueInfo> getAllQueueInfo()
```

* **功能** 获取队列信息
* **返回值** 队列信息列表，队列信息结构定义见[QueueInfo](class.md#QueueInfo)
* **参数** 无

### 获取队列状态 {#getQueueStatus}

```Java
public QueueStatus getQueueStatus(int queID)
```

* **功能** 获指定取队列状态
* **返回值** 队列状态，结构定义见[QueueStatus](class.md#QueueStatus)
* **参数**
  * queID 队列id

### 获取我的排队信息 {#getQueuingInfo}

```Java
public QueuingInfo getQueuingInfo()
```

* **功能**获取我的排队信息
* **返回值** 我的排队信息，结构定义见[QueuingInfo](class.md#QueuingInfo)
* **参数** 无

### 获取我服务的队列信息 {#getServingQueues}

```Java
public ArrayList<Integer> getServiceQueues()
```

* **功能** 获取我服务的所有队列
* **返回值** 队列ID列表

### 获取我的会话信息 {#getSessionInfo}

```Java
public VideoSessionInfo getSessionInfo()
```

* **功能** 获取我的会话信息
* **返回值** 我的会话信，结构定义见[VideoSessionInfo](class.md#VideoSessionInfo)

### 开始 / 停止排队 {#startQueuing}

```Java
public void startQueuing(int queID, String cookie)
```

* **功能** 客户开始排队
* **返回值** 无
* **参数**
  * queID 排队的队列ID
  * cookie 用户自定义数据(在回调时，回传给调用者)
* **回调函数** [startQueuingRslt](#startQueuingRslt)

```Java
public void stopQueuing(String cookie)
```

* **功能** 客户停止排队
* **返回值** 无
* **参数**
  * cookie 用户自定义数据(在回调时，回传给调用者)
* **回调函数** [stopQueuingRslt](#stopQueuingRslt)

### 开始 / 停止服务队列 {#startService}

```Java
public void startService(int queID, String cookie)
```

* **功能** 开始服务某个队列(可以多次调用，开启对多个队列的服务)
* **返回值** 无
* **参数**
  * queID 队列ID
  * cookie 用户自定义数据(在回调时，回传给调用者)
* **回调函数** [startServiceRslt](#startServiceRslt)

> 开启队列服务成功后：
> 1. 如果没有开启免打扰，那么系统会自动分配客户：将收到事件[autoAssignUser](#autoAssignUser)
> 1. 如果开启免打扰，系统就不会分配客户，如需服务客户可调用[reqAssignUser](#reqAssignUser)

```Java
public void stopService(int queID, String cookie)
```

* **功能** 停止服务某个队列
* **返回值** 无
* **参数**
  * queID 队列ID
  * cookie 用户自定义数据(在回调时，回传给调用者)
* **回调函数** [stopServiceRslt](#stopServiceRslt)

### 请求分配用户 {#reqAssignUser}

```Java
public void reqAssignUser(String cookie)
```

* **功能** 请求分配一个客户
* **返回值** 无
* **参数**
  * cookie 用户自定义数据(在回调时，回传给调用者)
* **回调函数** [reqAssignUserRslt](#reqAssignUserRslt)

> 1. 当关闭免打扰时，系统将自动分配客户，无需调用此函数
> 1. 当开启免打扰时，系统不再自动分配客户，座席如需服务客户可使用此函数分配

### 接受 / 拒绝分配的用户 {#acceptAssignUser}

```Java
public void acceptAssignUser(int queID, String userID, String cookie)
```

* **功能** 接受系统安排的客户
* **返回值** 无
* **参数**
  * queID 排队的队列ID
  * userID 队列中的用户ID
  * cookie 用户自定义数据(在回调时，回传给调用者)

```Java
public void rejectAssignUser(int queID, String userID, String cookie)
```

* **功能** 拒绝系统安排的客户
* **返回值** 无
* **参数**
  * queID 排队的队列ID
  * userID 队列中的用户ID
  * cookie 用户自定义数据(在回调时，回传给调用者)

> 被拒绝的客户将重新回到队列的最前端。

## 通知回调函数 {#callback}

com.cloudroom.cloudroomvideosdk.CloudroomQueue.CloudroomQueueCallback 是队列回调接口

### 初始化队列结果 {#initQueueDatRslt}

```Java
void initQueueDatRslt(CRVIDEOSDK_ERR_DEF errCode, String cookie)
```

* **功能** 队列初始化操作结果
* **参数**
  * errCode 操作结果代码，成功为CRVIDEOSDK_NOERR，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
  * cookie 自定义用户数据

### 队列状态变化通知 {#queueStatusChanged}

```Java
void queueStatusChanged(QueueStatus queStatus)
```

* **功能** 队列状态变化通知
* **参数**
  * queStatus 新的队列状态，详见定义[QueueStatus](class.md#QueueStatus)

> 1. 在排队的队列、或服务的队列发生变化时，将有队列状态变化通知到来
> 1. 在调用[refreshAllQueueStatus](#refreshAllQueueStatus)时，查询到的队列数据有变化时，会有通知到来

### 排队信息变化通知 {#queuingInfoChanged}

```Java
void queuingInfoChanged(QueuingInfo queuingInfo)
```

* **功能** 排队信息变化通知
* **参数**
  * queuingInfo 排队信息，详见定义[QueuingObj](class.md#QueuingObj)

### 开始 / 停止排队操作结果 {#startQueuingRslt}

```Java
void startQueuingRslt(CRVIDEOSDK_ERR_DEF errCode, String cookie)
```

* **功能** *startQueuing* 开始排队操作结果
* **参数**
  * sdkErr 操作结果代码，CRVIDEOSDK_NOERR为成功操作，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md)
  * cookie 自定义用户数据

```Java
void stopQueuingRslt(CRVIDEOSDK_ERR_DEF errCode, String cookie)
```

* **功能** *stopQueuing* 停止排队操作结果
* **参数**
  * sdkErr 操作结果代码，CRVIDEOSDK_NOERR为成功操作，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md)
  * cookie 自定义用户数据

### 开始 / 停止队列服务结果 {#startServiceRslt}

```Java
void startServiceRslt(int queID, CRVIDEOSDK_ERR_DEF errCode, String cookie)
```

* **功能** *startService* 开始服务队列操作结果
* **参数**
  * queID 服务的队列ID
  * sdkErr  操作结果代码，CRVIDEOSDK_NOERR为成功操作，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md)
  * cookie 自定义用户数据

```Java
void stopServiceRslt(int queID, CRVIDEOSDK_ERR_DEF errCode, String cookie)
```

* **功能** *stopService* 停止服务队列操作结果
* **参数**
  * queID 服务的队列ID
  * sdkErr  操作结果代码，CRVIDEOSDK_NOERR为成功操作，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md)
  * cookie 自定义用户数据

### 请求分配用户结果 {#reqAssignUserRslt}

```Java
void reqAssignUserRslt(CRVIDEOSDK_ERR_DEF errCode, UserInfo usr,
				String cookie)
```

* **功能** 请求分配客户操作结果
* **参数**
  * sdkErr  操作结果代码，CRVIDEOSDK_NOERR为成功操作，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md)
  * usr 请求到的队列用户，结构详见定义[UserInfo](class.md#UserInfo)
  * cookie 自定义用户数据

### 自动分配用户通知 {#autoAssignUser}

```Java
void autoAssignUser(UserInfo usr)
```

* **功能** 队列系统自动分配客户
* **参数**
  * usr 请求到的队列用户，结构详见定义[UserInfo](class.md#UserInfo)

> 如果想停止系统的自动分配，请调用CloudroomVideoMgr中的 [setDNDStatus](meetingMgr.md#setDNDStatus) 设置免打扰功能。

### 自动分配用户被取消 {#cancelAssignUser}

```Java
void cancelAssignUser(int queID, String usrID)
```

* **功能** 队列系统取消之前自动分配的的客户
* **参数**
  * queID 服务的队列
  * userID 用户id

### 自动分配用户被取消 {#cancelAssignUser}

```Java
void responseAssignUserRslt(CRVIDEOSDK_ERR_DEF errCode, String cookie)
```

* **功能** 拒绝、接受分配的用户
* **参数**
  * sdkErr  操作结果代码，CRVIDEOSDK_NOERR为成功操作，其他详见定义[CRVIDEOSDK_ERR_DEF](constant.md)
  * cookie 自定义用户数据

> 队列系统通过接口[autoAssignUser](#autoAssignUser)给开始队列服务的人自动推送用户，收到系统分配的用户后，如果队列服务者还未决定接受[acceptAssignUser](#acceptAssignUser)还是拒绝[rejectAssignUser](#acceptAssignUser)推送的用户，系统可用取消本次推送，并通过本接口通知队列服务者。