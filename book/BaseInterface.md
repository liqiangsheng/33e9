<!-- 基础接口 -->
# <font color="#2674ba">CloudroomVideoSDK对象</font> {#BaseInterface}

>CloudroomVideoSDK是基础控件，负责SDK的初始化和反初始化操作

<!-- 1 -->
### <font color="#0099cc">获取sdk的版本信息</font> {#Version}

<p style="background:#f7f7f7;color:#718c00">属性 Version</p>

>string Version

- **功能**:获取sdk的版本信息

- **返回值**:无

- **参数**:无

>可读。这个接口在init之前可用

<!-- 2 -->
### <font color="#0099cc">获取sdk所在的目录</font> {#sdkPath}

<p style="background:#f7f7f7;color:#718c00">属性sdkPath</p>

>string sdkPath

- **功能**:获取sdk所在的目录

- **返回值**:无

- **参数**:无

>可读。这个接口在init之前可用

<!-- 3 -->
### <font color="#0099cc">设置SDK参数</font> {#setSDKParams}

<p style="background:#f7f7f7;color:#718c00">方法 setSDKParams ()</p>

>void setSDKParams(string jsonStr)

- **功能**:设置SDK参数

- **返回值**:无

- **参数**:
 + jsonStr ------ json格式字符串, 如：{ "NoCallSvr" : 1 }具体参数说明：

| 参数名|取值|功能|
|-------|---|----|
|NoCallSvr|0/1 (缺省:0)|不需要呼叫业务（可减少登录环节、及通信需求）|
|NoMediaDatToSvr|0/1 (缺省:0)|与服务器无实时流媒体数据（可减少复杂度，加快登录速度）|
|Timeout|10000-120000|网络通信超时时间，单位是毫秒，超出范围时就近取边界值|

>这个接口在init之前调用有效

<!-- 4 -->
### <font color="#0099cc">设置是否开启日志</font> {#enableLog2File}

<p style="background:#f7f7f7;color:#718c00">方法 enableLog2File ()</p>

>void enableLog2File(int bEnable)

- **功能**:设置是否开启日志

- **返回值**:无

- **参数**:
 + bEnable ------ 1 表示开启日志 0表示不开启日志

> SDK中日志功能默认是打开的这个接口在init之前或者之后均可调用

<!-- 5 -->
### <font color="#0099cc">SDK初始化</font> {#init}

<p style="background:#f7f7f7;color:#718c00">方法 init  ()</p>

>CRVIDEOSDK_ERR_DEF init(string oemid, string sdkFilePath)

- **功能**:SDK初始化

- **返回值**:CRVIDEOSDK_NOERR为成功，否则是失败代码

- **参数**:
  + oemid ------ 开发商ID，没有特别要求可填：CLOUDROOM
  + sdkFilePath ------ sdk配置、临时文件存放位置，可为空

>每次init后，都应对一次uninit

<!-- 6 -->
### <font color="#0099cc">SDK反初始化</font> {#uninit}

<p style="background:#f7f7f7;color:#718c00">方法 uninit ()</p>

>void uninit()

- **功能**:SDK反初始化

- **返回值**:无

- **参数**:无

<!-- 7 -->
### <font color="#0099cc"> 设置和获取服务器地址</font> {#serverAddr}

<p style="background:#f7f7f7;color:#718c00">属性serverAddr</p>

>string serverAddr

- **功能**: 设置和获取服务器地址

- **返回值**:无

- **参数**:无

>可读、可写。支持单个服务器地址（如：www.cloudroom.com）或多个服务器地址串（如：www.cloudroom.com:8080;183.60.47.52:8080;）

<!-- 8 -->
### <font color="#0099cc">文件上传的流量控制</font> {#setFileUploadRate}

<p style="background:#f7f7f7;color:#718c00">方法 setFileUploadRate ()</p>

>void setFileUploadRate(int maxBytePerSec)

- **功能**:文件上传的流量控制

- **返回值**:无

- **参数**:
  + maxBytePerSec ------ 每秒上传的最大字节数。-1代表不进行流控

> SDK默认不开启流控。目前对文件上传控制的功能有：CloudroomVideoMeeting录制文件上传、CloudroomVideoMeeting网盘文件、CloudroomHttpFileMgr文件传输。

<!-- 9 -->
### <font color="#0099cc">文件下载的流量控制</font> {#setFileDownloadRate}

<p style="background:#f7f7f7;color:#718c00">方法 setFileDownloadRate  ()</p>

>void setFileDownloadRate(int maxBytePerSec)

- **功能**:文件下载的流量控制

- **返回值**:无

- **参数**:
  + maxBytePerSec  ------ 每秒上传的最大字节数。-1代表不进行流控

>DK默认不开启流控。目前对文件上传控制的功能有：CloudroomVideoMeeting网盘文件、CloudroomHttpFileMgr文件传输。

