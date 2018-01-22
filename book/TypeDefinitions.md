# 类型定义 {#TypeDefinitions}

### CRVideo_AddFileToRecordMgr {#CRVideo_AddFileToRecordMgrs}

>添加本地文件到录制文件管理中

- **Type**:
 + object
  

| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
| fileName |string	    |文件名，不含路径	     |
| filePath|string       |	文件路径，不含文件名	|   

### CRVideo_AudioCfg {#CRVideo_AudioCfg}

>添加本地文件到录制文件管理中

- **Type**:
 + object
  

| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
| micName |string	    |麦克风设备名称	     |
| speakerName|string       |	扬声器名称	|  
| privEC|string       |	是否开启云屋私有回声消息0：不开启；1：开启	|  
| privAgc|string       |	是否开启云屋私有语音自动增益0：不开启；1：开启	|  

### CRVideo_FileInfo {#CRVideo_FileInfo}

>排队信息(params详细说明：decodeCREEFile：取值0或1。此参数仅上传有效，为0时上传原始文件，为1时上传解密的文件)

- **Type**:
 + object
  

| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|bUploadType|	number|	传输类型，0:下载类型，1:上传类型|
|filePathName	|string	|本地完整路径文件名(路径中要求有“CloudroomVideoSDK”)|
|fileVersion|	string|	文件版本（可以填版本号，也可以md5，也可以为空）|
|httpUrl	|string|	目标URL|
|params|	object|	特殊参数，字典数据。|
|fileSize	|number	|文件大小|
|finishedSize|	number|	已传输大小|
|state	|CRVideo_HTTP_TRANSFER_STAT|	文件传输状态，详见：[HTTP_TRANSFER_STATE](Constant.md#HTTP_TRANSFER_STATE)|

### CRVideo_MediaInfoObj {#CRVideo_MediaInfoObj}

>影音文件信息

- **Type**:
 + object
  

| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
| userID |string	    |用户id	     |
| state|number       |	播放状态 0:播放 1:暂停 2:未播放	|  
| mediaName|string       |	影音文件名	|  

### CRVideo_MemberInfo {#CRVideo_MemberInfo}

>成员信息

- **Type**:
 + object
  

| 名称     | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|userID|	string|	用户ID|
|nickname	|string||	昵称|
|audioStatus|	[CRVideo_ASTATUS](Constant.md#ASTATUS)	|音频状态,数值参考麦克风状态|
|videoStatus|	[CRVideo_VSTATUS](Constant.md#VSTATUS)|视频状态,数值参考视频状态定义|

### CRVideo_QueueInfo {#CRVideo_QueueInfo}

>队列信息

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|queID	|string	|队列ID|
|name	|string	|队列名称|
|desc	|string|	队列描述|
|prio	|number|	优先级，值越小优先级越高|

### CRVideo_QueuingInfo {#CRVideo_QueuingInfo}

>排队信息

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|queID	|string	|队列ID 我排的队列(-1:代表我没有排队；-2:代表我正在会话中,通过GetSessionInfo可获取相关信息)|
|position	|string	|我的位置|
|queuingTime|	string|	我排队的时长(单位s)|

### CRVideo_RecordFileInfo {#CRVideo_RecordFileInfo}

>录制文件信息

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|fileName	|string|	文件名，全路径|
|state|	number|	0 没有上传，1上传中，2 上传完毕|
|uploadPercent|	number |	上传进度，state为1时关注此字段|

### CRVideo_RecordUploadCfg {#CRVideo_RecordUploadCfg}

>上传配置参数

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|type	|number	|0:云屋网盘(默认), 1:http|
|speakerName	|string	|上传地址|

### CRVideo_RecordVideoInfo {#CRVideo_RecordVideoInfo}

>需要录制的视频信息

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|left	|number	|左|
|top	|number	|上|
|width	|number	|宽|
|height|	number	|高|
|param	|object|	附加参数<p>Properties</p><p>Name	Type	Description</p><p>type	[CRVideo_REC_VCONTENT_TYP】E](Constant.md#REC_VCONTENT_TYPE)	录制类型</p>|

### CRVideo_ScreenShareCfgObj {#CRVideo_ScreenShareCfgObj}

>屏幕共享配置对象

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|encodeType|	number|	编码类型,详见屏幕共享的编码类型CRVideo_ENCODE_TYPE|
|catchRect|	object|	{"left":xx,"top":xx,"width":xx,"height":xx}用于实现区域共享|
|catchWnd|	number|	共享窗口的窗口句柄，用于实现窗口共享|
|maxFPS	|number|	最大帧率, 缺省为8 (当网络发不动时，帧率会自动下降)|
|maxKbps|	number|	最大码率，缺省800kbps|

### CRVideo_SessionInfo {#CRVideo_SessionInfo}

>排队信息

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|callID|	string|	会话的呼叫ID|
|peerID	|string	|会话的目标用户ID|
|peerName|	string|	会话的目标用户昵称|
|bCallAccepted	|number|	呼叫是否被对方接受 0:暂未接受，1:已接受|
|meetingID	|number	|呼叫接受后，分配的会议ID|
|meetingPswd	|string|	会议密码|
|duration|	number|	会议持续的时长(单位s)|

### CRVideo_VideoCfg {#CRVideo_VideoCfg}

>视频参数

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|sizeType|	CRVideo_VIDEO_WH_RATE	|视频尺寸|
|fps|	number|	帧率：视频帧率(5~30)|
|maxbps	|number|	视频码率（1~100*1000*1000）;(未配置则使用内部默认值，请参见[VIDEO_SHOW_SIZE](Constant.md#SHOW_SIZE)|
|qp_min	|number|	最佳质量(18~51, 越小质量越好) (未配置则使用内部默认值25)|
|qp_max	|number|	最差质量(18~51, 越大质量越差) (未配置则使用内部默认值36)|
|wh_rate	|number	|视频宽高比(0对应16:9,1对应4:3,2对应1:1) (未配置则使用内部默认值0)|
|wh_rate | [CRVideo_VIDEO_WH_RATE](Constant.md#VIDEO_WH_RATE)|	视频宽高比例|

### CRVideo_VideoDeviceInfo {#CRVideo_VideoDeviceInfo}

>视频设备信息

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
| userID	| string	| 用户ID| 
| videoID	| string	| 设备id| 
| videoName	| string	| 设备名称| 

### CRVideo_VideoIDsObj {#CRVideo_VideoIDsObj}

>视频设备对象

- **Type**:
 + object
  
| 参数        | 类型        |   说明               |
|:-------- |:-----------|:----------           |
| userID	| string	| 用户ID| 
| videoID	| string	| 设备id| 

### CRVideo_VideoImgObj {#CRVideo_VideoImgObj}

>视频设备对象

- **Type**:
 + object
  
| 参数    | 类型        |   说明               |
|:-------- |:-----------|:----------           |
|format	|number	|视频尺寸，请参见：[CRVideo_VIDEO_FORMAT](Constant.md#VIDEO_FORMAT)|
|dat	|string|	图像数据Base64编码|
|width|	number|	图像宽度|
|height	|number	|图像高度|