#Http文件传输管理组件 {#httpMrg}

>CloudroomHttpFileMgr是http文件上传下载、及文件管理控件

----

### Http管理函数 {#httpMrgFunction}

####获取本地所有上传、下载文件信息 {#CRVideo_GetAllTransferInfos}

>CRVideo_GetAllTransferInfos() 

- **返回值**:filelist - 返回文件信息列表 (Array.[CRVideo_FileInfo](TypeDefinitions.md#CRVideo_FileInfo))

####开始下载/上传文件 {#CRVideo_StartTransferFile}

>CRVideo_StartTransferFile()

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileinfo	|[CRVideo_FileInfo](TypeDefinitions.md#CRVideo_FileInfo)|	格式的文件信息| 

####删除传输记录及相关文件 {#CRVideo_RmTransferInfo}

>CRVideo_RmTransferInfo()

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|fileName|	string	|本地路径文件名|
|bRemoveLocFile|	number|	是否移除本地文件,为1时， 那么上传的源始文件、下载的临时文件或结果文件都将被移除。|

####获取本地上传、下载文件信息 {#CRVideo_GetTransferInfo}

>CRVideo_GetTransferInfo()

- **返回值**:fileinfo - 返回文件信息([CRVideo_FileInfo](TypeDefinitions.md#CRVideo_FileInfo))

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filePathName	 |string	|本地完整路径文件名(路径中要求有“CloudroomVideoSDK”)|

####删除本地的录制文件 {#CRVideo_RemoveFromFileMgr}

>CRVideo_RemoveFromFileMgr(filename)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|filename	|string	|文件名，全路径|

>上传中的文件会被取消上传

####上传录像文件 {#CRVideo_SetRecordUploadCfg}

>CRVideo_SetRecordUploadCfg(jsonCfg)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|jsonCfg	|[CRVideo_RecordUploadCfg](TypeDefinitions.md#CRVideo_RecordUploadCfg)	|上传配置参数| 

####第三方录制文件调用此接口后可进行本地回放和上传到服务器record下 {#CRVideo_AddFileToRecordMgr}

>CRVideo_AddFileToRecordMgr()

- **返回值**:1：本地文件不存在，0：成功，1：文件已经被添加过

####文件上传的流量控制 {#CRVideo_SetFileUploadRate}

>CRVideo_SetFileUploadRate(maxbps)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|maxbps	|number	|每秒上传的最大字节数，小于等于0表示不开启流控 |

>SDK默认不开启流控,目前对文件上传控制的功能有：录制文件上传、网盘文件上传。

----

### Http管理回调{#httpMrgCallback}

#### 通知用户文件状态更改 {#CRVideo_FileStateChanged}

>CRVideo_FileStateChanged.callback = function(fileName,state){}

- fileName ----- 文件名
- state ----- 状态

#### 系统取消已经安排的客户 {#CRVideo_FileProgress}

>CRVideo_FileProgress.callback = function(fileName,finisedSize,totalSize){}

- fileName ----- 文件名
- finisedSize ----- 已传输大小
- finisedSize ----- 文件大小

#### 通知用户文件传输结束 {#CRVideo_FileFinished}

>CRVideo_FileFinished.callback = function(fileName,rslt){}

- fileName ----- 文件名
- rslt ----- 传输结果

#### 通知用户文件http响应头 {#CRVideo_FileHttpRspHeader}

>CRVideo_FileHttpRspHeader.callback = function(fileName,rspHeader){}

- fileName ----- 文件名
- rspHeader ----- http响应头

#### 通知用户文件http响应结果 {#CRVideo_FileHttpRspContent}

>CRVideo_FileHttpRspContent.callback = function(fileName,rspHeader){}

- fileName ----- 文件名
- rspHeader ----- http响应结果