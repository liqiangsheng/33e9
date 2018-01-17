# 基础组件 {#sdk}

> CloudroomVideoSDK 是基础控件，负责整个 SDK 的初始化和反初始化操作。
> 单例组件，整个程序的生命过程中只能有有一个实例。

---------

## 接口函数 {#api}

### 版本 {#getCloudroomVideoSDKVer}

```objc
+ (NSString *)getCloudroomVideoSDKVer;
```

* **功能** 获取 SDK 的版本信息
* **返回值** 版本号字符串
* **参数** 无

> 只读属性，在 init 之前可用

### 日志 {#setLogOpen}

```objc
- (void)setLogOpen:(BOOL)isOpen;
```

* **功能** 设置是否开启日志
* **返回值** 无
* **参数**
  * isOpen YES 表示开启日志， NO 表示不开启日志

> SDK 中日志功能默认是打开的，这个接口在 initSDK 之前或者之后均可调用

```objc
- (void)startLogReport:(NSString *)reporter server:(NSString *)server;
```

* **功能** 开始上传日志
* **返回值** 无
* **参数**
  * reporter 上传者(登录昵称/账号)
  * server 服务器地址

```objc
- (void)writeLog:(int)level message:(NSString *)log;
```

* **功能** 写日志
* **返回值** 无
* **参数**
  * level 日志等级
  * log 日志内容

```objc
- (void)stopLogReport;
```

* **功能** 停止上传日志
* **返回值** 无
* **参数** 无

### 初始化 / 反初始化 {#initSDK}

```objc
- (CRVIDEOSDK_ERR_DEF)initSDK:(SdkInitDat *)dat;
```

* **功能** SDK 初始化
* **返回值** 初始化结果，详见 [CRVIDEOSDK_ERR_DEF](constant.md#CRVIDEOSDK_ERR_DEF)
* **参数**
  * dat SdkInitDat 对象，详见 [SdkInitDat](objc.md#SdkInitDat)

```objc
- (BOOL)isInitSuccess;
```

* **功能** SDK 初始化是否成功
* **返回值** 初始化结果，是/否
* **参数** 无

> 程序开始时 initSDK，程序结束时 uninit，整个程序的生命周期中只进行一次初始化和反初始化

```objc
- (void)uninit;
```

* **功能** SDK 反初始化
* **返回值** 无
* **参数** 无

### 设置/获取服务器地址 {#serverAddr}

```objc
- (void)setServerAddr:(NSString *)serverList;
```

* **功能** 设置服务器地址
* **返回值** 无
* **参数** 
  * serverList 服务器地址

> 读写属性，支持单个服务器地址(如:www.cloudroom.com)或多个服务器地址串（如:www.cloudroom.com:8080;183.60.47.52:8080;）

```objc
- (NSString *)serverAddr;
```

* **功能** 获取服务器地址
* **返回值** 服务器地址
* **参数** 无