# Http文件传输管理组件 {#httpMgr}

> CloudroomHttpFileMgr 是 HTTP 文件上传下载、及文件管理控件

----------------

## 接口函数 {#api}

### 启动 / 停止传输管理器 {#startMgr}

```objc
- (BOOL)startMgr;
```

* **功能** 启动 HTTP 文件文件管理组件
* **返回值** 成功/失败
* **参数** 无

> 说明：在调用 CloudroomVideoSDK 的 [initSDK](cloudroomsdk.md#initSDK) 初始化 SDK 后后方可调用

```objc
- (void)stopMgr;
```

* **功能** 停止 HTTP 文件文件管理组件运行
* **返回值** 无
* **参数** 无

```objc
- (BOOL)isStarted;
```

* **功能** HTTP 文件管理组件是否已启动
* **返回值** 是/否
* **参数** 无

### 获取指定/所有的Http传输信息 {#getTransferInfo}

```objc
- (FileTransInfo *)getTransferInfo:(NSString *)fileName;
```

* **功能** 获取本地上传、下载文件信息
* **返回值** FileTransInfo 对象，详见 [FileTransInfo](objc.md#FileTransInfo)
* **参数** 
   * fileName 本地路径文件名

```objc
- (NSArray <FileTransInfo *> *)getAllHttpFiles
```

* **功能** 获取本地上传、下载文件信息
* **返回值** FileTransInfo 对象数组，详见 [FileTransInfo](objc.md#FileTransInfo)
* **参数** 无

### 开始 / 取消传输文件 {#startTransferFile}

```objc
- (void)startTransferFile:(HTTPReqInfo *)file;
```

* **功能** 开始下载/上传文件
* **返回值** 无
* **参数**
  * HTTPReqInfo 对象，详见 [HTTPReqInfo](objc.md#FileTransInfo)

> 说明：上传不支持断点续传;下载支持断点续传;如果文件传输完成，且 fileVersion 一致，下次再请求时会立即报告完成。

```objc
- (void)cancelFileTransfer:(NSString *)fileName;
```

* **功能** 取消传输
* **返回值** 无
* **参数**
  * fileName 本地路径文件名

> 说明：取消时，只是停止了传输任务，不清理记录及断点文件。

### 删除传输记录 {#rmTransferInfo}

```objc
- (void)rmTransferInfo:(NSString *)fileName rmLocFile:(BOOL)rmLocFile;
```

* **功能** 删除传输记录及相关文件
* **返回值** 无
* **参数**
  * fileName 文件名
  * rmLocFile 是否移除本地文件

>说明：此接口将文件从管理器中移除（getAllTransferInfos将不再返回相关信息），如果 rmLocFile 为 YES，那么上传的源始文件、下载的临时文件或结果文件都将被移除

## 通知回调函数 {#callback}

### 文件状态变化 {#fileStateChanged}

```objc
- (void)fileStateChanged:(NSString *)fileName state:(HTTP_TRANSFER_STATE)state;
```

* **功能** 通知用户文件状态更改
* **返回值** 无
* **参数**
  * fileName 文件名
  * state 状态，详见 [HTTP_TRANSFER_STATE](constant.md#HTTP_TRANSFER_STATE)

### 文件传输(上传/下载)进度 {#fileProgress}

```objc
- (void)fileProgress:(NSString *)fileName finishedSize:(int)finishedSize totalSize:(int)totalSize;
```

* **功能** 通知用户文件的传输进度
* **返回值** 无
* **参数**
  * fileName 文件名
  * finishedSize 已传输大小
  * totalSize 文件总大小

### 传输完成 {#fileFinished}

```objc
- (void)fileFinished:(NSString *)fileName rslt:(HTTP_TRANSFER_RESULT)rslt;
```

* **功能** 通知用户文件传输结束
* **返回值** 无
* **参数**
  * fileName 文件名
  * rslt 传输结果，详见 [HTTP_TRANSFER_RESULT](constant.md#HTTP_TRANSFER_RESULT)
