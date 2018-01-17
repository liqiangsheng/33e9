# 基础组件 {#sdk}

> CloudroomVideoSDK 是基础控件，负责整个SDK的初始化和反初始化操作。
> 单例组件，整个程序的生命过程中只能有有一个实例。

---------

## 接口函数 {#api}

### 版本 {#Version}

```cpp
string Version
```

* **功能** 获取sdk的版本信息

> 只读属性，在init之前可用

### SDK安装目录 {#sdkPath}

```cpp
string sdkPath
```

* **功能** 获取sdk所在的目录

> 只读属性， 在init之前可用

### 设置SDK参数 {#setSDKParams}

```cpp
void setSDKParams(string jsonStr);
```

* **功能** 设置SDK参数
* **返回值** 无
* **参数**
  * jsonStr json格式字符串, 如：{ "NoCall" : 1 }，可用参数见下方表格

> 这个接口在init之前调用有效，具体可用参数如下：

|参数名|取值|功能
|-----|:-------------|-------|
|NoCall             |0/1 (缺省:0)| 设为1可加快登录速度（适合于无呼叫需求的业务，如：临柜双录业务、链接入会业务）|
|NoQueue            |0/1 (缺省:0)| 设为1可加快登录速度（适合于不使用sdk的排队功能的业务，如：临柜双录业务、链接入会业务）|
|NoMediaDatToSvr    |0/1 (缺省:0)| 设为1可加快登录速度（适合于没有实时音视频到服务器的业务，如：临柜双录业务）|
|Timeout            |（缺省:90000)| 网络通信超时时间，单位是毫秒|

### 日志 {#enableLog2File}

```cpp
void enableLog2File(int bEnable)
```

* **功能** 设置是否开启日志
* **返回值** 无
* **参数**
  * bEnable 1表示开启日志，0表示不开启日志

> SDK中日志功能默认是打开的,这个接口在init之前或者之后均可调用

### 初始化 / 反初始化 {#init}

```cpp
CRVIDEOSDK_ERR_DEF init_2(string sdkFilePath)
```

* **功能** SDK初始化
* **返回值** CRVIDEOSDK_NOERR为成功，否则是[失败代码](constant.md#CRVIDEOSDK_ERR_DEF)
* **参数**
  * sdkFilePath SDK配置、临时文件存放位置，可为空

> 程序开始时init，程序结束时uninit，整个程序的生命周期中只进行一次初始化和反初始化

```cpp
void uninit()
```

* **功能** SDK反初始化
* **返回值** 无
* **参数** 无

### 服务器地址 {#serverAddr}

```cpp
string serverAddr
```

* **功能** 设置和获取服务器地址

> 读写属性，支持单个服务器地址（如：www.cloudroom.com）或多个服务器地址串（如：www.cloudroom.com:8080;183.60.47.52:8080;）

### 文件上传 / 下载速度控制 {#setFileUploadRate}

> SDK默认不开启流控。目前对文件上传控制的功能有：CloudroomVideoMeeting录制文件上传、CloudroomVideoMeeting网盘文件、CloudroomHttpFileMgr文件传输。

```cpp
void setFileUploadRate(int maxBytePerSec)
```

* **功能** 文件上传的流量控制
* **返回值** 无
* **参数**
  * maxBytePerSec 每秒上传的最大字节数。-1代表不进行流控

```cpp
void setFileDownloadRate(int maxBytePerSec)
```

* **功能** 文件下载的流量控制
* **返回值** 无
* **参数**
  * maxBytePerSec 每秒上传的最大字节数。-1代表不进行流控