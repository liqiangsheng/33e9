# Http文件传输管理组件 {#httpMgr}

> CloudroomHttpFileMgr是http文件上传下载、及文件管理控件

----------------

## 接口函数 {#api}

### 启动 / 停止传输管理器 {#startMgr}

```cpp
void startMgr()
```

* **功能** 启动Http文件文件管理组件运行
* **返回值** 无
* **参数** 无

> 在调用CloudroomVideoSDK的 [init](cloudroomsdk.md#init) 初始化SDK后后方可调用

```cpp
void stopMgr()
```

* **功能** 停止Http文件文件管理组件运行
* **返回值** 无
* **参数** 无

### 获取所有的Http传输信息 {#getAllTransferInfos}

```cpp
string getAllTransferInfos()
```

* **功能** 获取本地上传、下载文件信息
* **返回值** json格式的文件信息，详见说明 [HttpFileInfoObjs](json.md#HttpFileInfoObjs)

### 开始 / 取消传输文件 {#startTransferFile}

```cpp
void startTransferFile(string jsonFileInfo)
```

* **功能** 开始下载/上传文件
* **返回值** 无
* **参数**
  * jsonFileInfo json格式的文件信息，详见说明 [HttpFileInfoObj](json.md#HttpFileInfoObj)

> 说明：上传不支持断点续传； 下载支持断点续传；如果文件传输完成，且fileVersion一致，下次再请求时会立即报告完成。

```cpp
void cancelFileTransfer(string fileName)
```

* **功能** 取消传输
* **返回值** 无
* **参数**
  * fileName 本地路径文件名

> 说明：取消时，只是停止了传输任务，不清理记录及断点文件。

### 删除传输记录 {#rmTransferInfo}

```cpp
void rmTransferInfo(string fileName, int bRemoveLocFile)
```

* **功能** 删除传输记录及相关文件
* **返回值** 无
* **参数**
  * fileName 文件名
  * bRemoveLocFile 是否移除本地文件

>说明	此接口将文件从管理器中移除（getAllTransferInfos将不再返回相关信息），如果bRemoveLocFile为1时， 那么上传的源始文件、下载的临时文件或结果文件都将被移除。

## 通知回调函数 {#callback}

### 文件状态变化 {#fileStateChanged}

```cpp
void fileStateChanged(string fileName, int state)
```

* **功能** 通知用户文件状态更改
* **参数**
  * fileName 文件名
  * state 状态，详见 [HTTP_TRANSFER_STATE](constant.md#HTTP_TRANSFER_STATE)

### 文件传输(上传/下载)进度 {#fileProgress}

```cpp
void fileProgress(string fileName, int finisedSize, int totalSize)
```

* **功能** 通知用户文件的传输进度
* **参数**
  * fileName 文件名
  * finisedSize 已传输大小
  * totalSize 文件总大小

### 传输完成 {#fileFinished}

```cpp
void fileFinished(string fileName, int rslt)
```

* **功能** 通知用户文件传输结束
* **参数**
  * fileName 文件名
  * rslt 传输结果，详见 [HTTP_TRANSFER_RESULT](constant.md#HTTP_TRANSFER_STATE)
