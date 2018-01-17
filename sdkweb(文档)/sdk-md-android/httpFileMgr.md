# Http文件传输管理组件 {#httpMgr}

> com.cloudroom.cloudroomvideosdk.CloudroomHttpFileMgr是http文件上传下载、及文件管理控件

----------------

## 接口函数 {#api}

### 注册、反注册监听回调 {#callBack}

```Java
public void registerCallBack(CloudroomHttpFileMgrCallback callBack)
```

* **功能** 注册监听回调
* **返回值** 无
* **参数**
  * callBack 监听回调对象

```Java
public void unregisterCallBack(CloudroomHttpFileMgrCallback callBack)
```

* **功能** 反注册监听回调
* **返回值** 无
* **参数**
  * callBack 监听回调对象

```Java
public void setHttpFileMgrCallback(CloudroomHttpFileMgrCallback callBack)
```

* **功能** 注册监听回调，注：建议使用registerCallBack替代
* **返回值** 无
* **参数**
  * callBack 监听回调对象

### 启动 / 停止传输管理器 {#startMgr}

```Java
public void startMgr()
```

* **功能** 启动Http文件文件管理组件运行
* **返回值** 无
* **参数** 无

> 在调用CloudroomVideoSDK的 [init](cloudroomsdk.md#init) 初始化SDK后后方可调用

```Java
public void stopMgr()
```

* **功能** 停止Http文件文件管理组件运行
* **返回值** 无
* **参数** 无

### 获取所有的Http传输信息 {#getAllTransferInfos}

```Java
public ArrayList<FileTransInfo> getAllTransferInfos()
```

* **功能** 获取本地上传、下载文件信息
* **返回值** 文件信息，详见定义 [FileTransInfo](class.md#FileTransInfo)

### 开始 / 取消传输文件 {#startTransferFile}

```Java
public void startTransferFile(HttpReqInfo info)
```

* **功能** 开始下载/上传文件
* **返回值** 无
* **参数**
  * info 上传文件信息，详见定义 [HttpReqInfo](class.md#HttpReqInfo)

> 说明：上传不支持断点续传； 下载支持断点续传；如果文件传输完成，且fileVersion一致，下次再请求时会立即报告完成。

```Java
public void cancelFileTransfer(String fileName)
```

* **功能** 取消传输
* **返回值** 无
* **参数**
  * fileName 本地路径文件名

> 说明：取消时，只是停止了传输任务，不清理记录及断点文件。

### 删除传输记录 {#rmTransferInfo}

```Java
public void rmTransferInfo(String fileName, int bRemoveLocFile)
```

* **功能** 删除传输记录及相关文件
* **返回值** 无
* **参数**
  * fileName 文件名
  * bRemoveLocFile 是否移除本地文件

>说明	此接口将文件从管理器中移除（getAllTransferInfos将不再返回相关信息），如果bRemoveLocFile为1时， 那么上传的源始文件、下载的临时文件或结果文件都将被移除。

## 通知回调函数 {#callback}
com.cloudroom.cloudroomvideosdk.CloudroomHttpFileMgrCallback是Http上传下载通知回调接口

### 文件状态变化 {#fileStateChanged}

```Java
void fileStateChanged(String fileName, HttpTransferState state)
```

* **功能** 通知用户文件状态更改
* **参数**
  * fileName 文件名
  * state 状态，详见定义 [HttpTransferState](constant.md#HttpTransferState)

### 文件传输(上传/下载)进度 {#fileProgress}

```Java
void fileProgress(String fileName, int finisedSize, int totalSize)
```

* **功能** 通知用户文件的传输进度
* **参数**
  * fileName 文件名
  * finisedSize 已传输大小
  * totalSize 文件总大小

### 传输完成 {#fileFinished}

```Java
void fileFinished(string fileName, int rslt)
```

* **功能** 通知用户文件传输结束
* **参数**
  * fileName 文件名
  * rslt 传输结果，详见定义 [HTTP_TRANSFER_RESULT](constant.md#HTTP_TRANSFER_STATE)
