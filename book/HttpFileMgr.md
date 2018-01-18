<!-- 屏幕显示 -->
# <font color="#2674ba">CloudroomHttpFileMgr对象</font>

>CloudroomHttpFileMgr是http文件上传下载、及文件管理控件

<!-- 1 -->
### <font color="#0099cc">拍照</font>

<p style="background:#f7f7f7;color:#718c00">方法 startMgr （）</p>

>void startMgr()

- **功能**:启动控件运行

- **返回值**:无

- **参数**:无

>在CloudroomVideoSDK Init后方可调用

<!-- 2 -->
### <font color="#0099cc">停止控件</font>

<p style="background:#f7f7f7;color:#718c00">方法 stopMgr ()</p>

>void stopMgr()

- **功能**:停止控件

- **返回值**:无

- **参数**:无

<!-- 3 -->
### <font color="#0099cc">获取本地上传、下载文件信息</font>

<p style="background:#f7f7f7;color:#718c00">方法 getAllTransferInfos ()</p>

>string getAllTransferInfos()

- **功能**:获取本地上传、下载文件信息

- **返回值**:json格式的文件信息，详见说明

- **参数**:无

>返回值含多个文件信息，json格式说明：[ { "bUploadType" : true, "filePathName" : "D:/CloudroomVideoSDK_file/test.log", "fileVersion" : "V1.0","httpUrl" : "http://10.0.7.130:8080/Upload/", "params" : {  }, "fileSize" : 53788511, "finishedSize" : 53788511, "state" : 3 }{…}]

key    | value
-------|-------
bUploadType|传输类型，0:下载类型，1:上传类型
filePathName     |本地完整路径文件名(路径中要求有“CloudroomVideoSDK”)
fileVersion|文件版本（可以填版本号，也可以md5，也可以为空）
httpUrl|目标URL 
params      |特殊参数，字典数据。
fileSize      |文件大小
finishedSize      |已传输大小
state      |文件传输状态，详见：HTTP_TRANSFER_STATE
params详细说明  |decodeCREEFile：取值0或1。此参数仅上传有效，为0时上传原始文件，为1时上传解密的文件

注：fileName路径中要求有“CloudroomVideoSDK”，目的是防止利用sdk上传用户隐私文件、或下载恶意文件到系统目录等。

<!-- 4 -->
### <font color="#0099cc">开始下载/上传文件</font>

<p style="background:#f7f7f7;color:#718c00">方法 startTransferFile()</p>

>void startTransferFile(string jsonFileInfo)

- **功能**:开始下载/上传文件

- **返回值**:无

- **参数**:
 + jsonFileInfo ------- json格式的文件信息，详见说明

>json格式说明：{"bUploadType" : true, "filePathName" : "D:/CloudroomVideoSDK_file/test.log", "fileVersion" : "V1.0","httpUrl" : "http://10.0.7.130:8080/Upload/","params" : {  }, "state" : 3 }

参数含义，请参见：getAllTransferInfos接口说明。

<font color="red">上传不支持断点续传；下载支持断点续传；如果文件传输完成，且fileVersion一致，下次再请求时会立即报告完成。</font>

<!--5 -->
### <font color="#0099cc">取消传输</font>

<p style="background:#f7f7f7;color:#718c00">方法 cancelFileTransfer ()</p>

>void cancelFileTransfer(string fileName)

- **功能**:取消传输

- **返回值**:无

- **参数**:
 + fileName ------ 本地路径文件名

>取消时，只是停止了传输任务，不清理记录及断点文件。

<!-- 6 -->
### <font color="#0099cc">删除传输记录及相关文件</font>

<p style="background:#f7f7f7;color:#718c00">方法 rmTransferInfo ()</p>

>void rmTransferInfo(string fileName, int bRemoveLocFile)

- **功能**:删除传输记录及相关文件

- **返回值**:无

- **参数**:
 + fileName ------ 文件名
 + bRemoveLocFile ------ 是否移除本地文件

>此接口将文件从管理器中移除（getAllTransferInfos将不再返回相关信息），如果bRemoveLocFile为1时， 那么上传的源始文件、下载的临时文件或结果文件都将被移除。

<!-- 7 -->
### <font color="#0099cc">通知用户文件状态更改</font>

<p style="background:#f7f7f7;color:#718c00">事件fileStateChanged</p>

>void fileStateChanged(string fileName, int state)

- **功能**:通知用户文件状态更改

- **参数**:
 + fileName ------ 文件名
 + state ------ 状态，详见HTTP_TRANSFER_STATE

<!-- 8 -->
### <font color="#0099cc">通知用户文件的下载进度</font>

<p style="background:#f7f7f7;color:#718c00">事件fileProgress</p>

>void fileProgress(string fileName, int finisedSize, int totalSize)

- **功能**:通知用户文件的下载进度

- **参数**:
 + fileName ------ 文件名
 + finisedSize ------ 已传输大小
 + totalSize ------ 已传输大小

<!-- 9 -->
### <font color="#0099cc">通知用户文件传输结束</font>

<p style="background:#f7f7f7;color:#718c00">事件fileFinished</p>

>void fileFinished(string fileName, int rslt)

- **功能**:通知用户文件传输结束

- **参数**:
 + fileName ------ 文件名
 + rslt ------ 传输结果，详见：HTTP_TRANSFER_RESULT