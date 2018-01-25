# 基础组件 {#basics}

>CloudroomVideoSDK 是基础控件，负责整个SDK的初始化和反初始化操作。 单例组件，整个程序的生命过程中只能有有一个实例。

----
###基础函数{#basicsFunction}

####获取Plugin版本号 {#CRVideo_PluginVersion}

>CRVideo_PluginVersion()

- **返回值**:Plugin版本号(string)

####获取sdk所在的目录 {#CRVideo_SdkPath}

>CRVideo_SdkPath()

- **返回值**:返回sdk所在的目录(string)

####SDK初始化 {#CRVideo_Init}

>CRVideo_Init(oemID, sdkUsePath, isCallSer, isMediaSer, isHttp)

- **返回值**:返回[错误码](Constant.md#CRVIDEOSDK_ERR_DEF)（错误码为CRVideo_NOERR表示没有错误）(number)

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|oemID	| string	| 开发商ID,没有特别要求可填"CLOUDROOM"| 
| sdkUsePath| 	string	| sdk配置、临时文件存放位置,可为空| 
| isCallSer| 	number	| 是否启用callSer模块。 0为不启用，1为启用，默认为1| 
| isMediaSer| 	number| 	是否启用mediaSer模块。 0为不启用，1为启用，默认为1| 
| isHttp	| number	| 是否启用http模块。0为不启用，1为启用，默认为0|

####SDK反初始化 {#CRVideo_Uninit}

>CRVideo_Uninit()

- **返回值**:无

####设置服务器地址 {#CRVideo_SetServerAddr}

>CRVideo_SetServerAddr(serverList)

- **返回值**:无

| 参数    | 类型        | 含义      |
|:-------- |:-----------|:----------|
|serverList|	string|	服务器地址，多个服务器地址使用冒号隔开（如：www.cloudroom.com:8080;183.60.47.52:8080;）| 

####获取服务器地址 {#CRVideo_GetServerAddr}

>CRVideo_GetServerAddr()

- **返回值**:返回服务器地址(string)