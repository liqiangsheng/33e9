# 基础组件 {#sdk}

> com.cloudroom.cloudroomvideosdk.CloudroomVideoSDK 是基础控件，负责整个SDK的初始化和反初始化操作。
> 单例组件，整个程序的生命过程中只能有有一个实例。

---------

## 接口函数 {#api}

### 版本 {#Version}

```Java
public String GetCloudroomVideoSDKVer()
```

* **功能** 获取sdk的版本信息

> 只读属性，在init之前可用

### 初始化 / 反初始化 {#init}

```Java
public CRVIDEOSDK_ERR_DEF init(Context context, SdkInitDat dat)
```

* **功能** SDK初始化
* **返回值** CRVIDEOSDK_NOERR为成功，否则是[失败代码](constant.md#CRVIDEOSDK_ERR_DEF)
* **参数**
  * context 程序上下文，不可为空
  * dat SDK配置、临时文件存放位置，不可为空，详见说明[SdkInitDat](class.md#SdkInitDat)

> 程序开始时init，程序结束时uninit，整个程序的生命周期中只进行一次初始化和反初始化

```Java
public void uninit()
```

* **功能** SDK反初始化
* **返回值** 无
* **参数** 无

### 日志 {#enableLog2File}

```Java
public void setLogOpen(boolean isOpen)
```

* **功能** 设置是否开启日志
* **返回值** 无
* **参数**
  * isOpen 是否开启日志

> SDK中日志功能默认是打开的,这个接口在init之后调用

### 服务器地址 {#serverAddr}

```Java
public String serverAddr()
```

* **功能** 获取服务器地址
* **返回值** 服务器地址
* **参数** 无
* 
> 读写属性，支持单个服务器地址（如：www.cloudroom.com）或多个服务器地址串（如：www.cloudroom.com:8080;183.60.47.52:8080;）

```Java
public void setServerAddr(String serverArrayList)
```

* **功能**  设置服务器地址
* **返回值** 无
* **参数** 
  * serverArrayList 服务器地址
