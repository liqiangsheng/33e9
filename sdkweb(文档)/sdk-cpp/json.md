# 对象结构定义 {#object}

> 相关数据结构定义

------------

## 会议对象 {#MeetInfoObj}

> MeetInfoObj

```json
{"ID":100,"pswd":"","subject":"test","pubMeetUrl":"www.cloudroom.com/auzjie","creator":"testuser", "memberCount":4, "startTime": 123455}
```

* **ID:** 会议号，数值0代表会议信息无效
* **pswd:** 会议密码；（空代表会议无密码）
* **subject:** 会议主题
* **pubMeetUrl:** 会议公共链接
* **creator:** 会议创建者
* **memberCount:** 会议内人数
* **startTime:** 会议开始时间(从1970年1月1日00:00:00起)

## 会议对象列表 {#MeetInfoObjs}

> MeetInfoObjs

```json
[
{"ID":100,"pswd":"","subject":"test1","pubMeetUrl":"www.cloudroom.com/auzjie", "creator":"testuser", "memberCount":4},
{"ID":123,"pswd":"","subject":"test2","pubMeetUrl":"www.cloudroom.com/sdfsdd", "creator":"ddd", "memberCount":10},
{"ID":456,"pswd":"","subject":"test3","pubMeetUrl":"www.cloudroom.com/swerwe", "creator":"eee", "memberCount":3}
]
```

## 会议成员 {#MemberObj}

> MemberObj

```json
{"userID":"111","nickName":"aaa","audioStatus": 1,"videoStatus": 1}
```

* **userID** 用户ID
* **nickname** 用户昵称
* **audioStatus** 音频状态，数值参考麦克风状态[ASTATUS](constant.md#ASTATUS)
* **videoStatus** 视频状态，数值参考视频状态定义[VSTATUS](constant.md#VSTATUS)

## 会议成员列表 {#MemberObjs}

> MemberObjs

```json
[
{"userID":"111","nickName":"aaa","audioStatus": 1,"videoStatus": 1},
{"userID":"222","nickName":"bbb","audioStatus": 1,"videoStatus": 1}
]
```

## 音频配置 {#AudioCfgObj}

> AudioCfgObj

```json
{"micName": "aaa", "speakerName":"aaa", "privEC": 0, "privAgc": 0}
```

* **micName** 麦克风设备名称(空代表系统默认设备)
* **speakerName** 扬声器名称(空代表系统默认设备)
* **privEC** 是否开启云屋私有回声抑制
  * **0：** 不开启
  * **1：** 开启(缺省建议不开启)
* **privAgc** 是否开启云屋私有语音自动增益
  * **0：** 不开启
  * **1：** 开启(缺省建议不开启)

## 视频配置 {#VideoCfgObj}

> VideoCfgObj

```json
{"sizeType": 1, "fps": 12}
```

* **sizeType** 视频尺寸，请参见：[VIDEO_SHOW_SIZE](constant.md#VIDEO_SHOW_SIZE)
* **fps** 视频帧率(5~30)
* **maxbps** 视频码率（1~100\*1000\*1000）(未配置则使用内部默认值，请参见[VIDEO_SHOW_SIZE](constant.md#VIDEO_SHOW_SIZE))
* **qp_min** 最佳质量(18~51，越小质量越好) (未配置则使用内部默认值25)
* **qp_max** 最差质量(18~51， 越大质量越差) (未配置则使用内部默认值36)
* **wh_rate** 视频宽高比,取值如下：
  * **0** 为16:9(未配置时内部默认值)
  * **1** 为4:3
  * **2** 为1:1

> 我们采用的是vbr编码（由质量+码率，双重控制）：
>> 1. qp范围：质量参数，为的是达到目标质量后，无需花费更大码率提高质量
>> 1. maxbps码率控制，是为了确保结果一定不大于“目标码率”（体积受控）
>> 1. 当要超出码率控制时，自动降低质量；当质量达到目标时，自动减少码率甚至无码率输出

## 视频帧图像 {#VideoImgObj}

> VideoImgObj

```json
{ "format":1, "dat":"FKLE34O123F12JX345KFD13…","width":1024, "height":768, "frameTime":100}
```

* **format** 图像格式,数值参考视频图像格式[VIDEO_FORMAT](constant.md#VIDEO_FORMAT)
* **dat** 图像数据Base64编码
* **width** 图像宽度
* **height** 图像高度
* **frameTime** 图像的时间戳

## 用户视频信息 {#VideoInfoObj}

> VideoInfoObj

```json
{"userID":"111", "videoID":2, "videoName":"camera2"}
```

* **userID** 用户id
* **videoID** 设备id
* **videoName** 设备名称

## 用户视频信息列表 {#VideoInfoObjs}

> VideoInfoObjs

```json
[
{"userID":"111","videoID":1,"videoName":"camera1"},
{"userID":"111","videoID":2,"videoName":"camera2"}
]
```

## 用户视频列表 {#VideoIDObjs}

> VideoIDObjs

```json
[
{"userID":"111","videoID":1},
{"userID":"222","videoID":2},
...
]
```

* **userID** 用户id
* **videoID** 设备id

## 屏幕共享配置 {#ScreenShareCfgObj}

> ScreenShareCfgObj

```json
{"encodeType":0, "maxFPS":8, "maxKbps":800, "catchWnd":0, "catchRect":{"left":0, "top":0,  "width":1920, "height":1080}}
```

* **encodeType** 编码类型,详见屏幕共享的编码类型[ENCODE_TYPE](constant.md#ENCODE_TYPE)
* **maxFPS** 最大帧率, 缺省为8 (当网络发不动时，帧率会自动下降)
* **maxKbps** 最大码率，缺省800kbps
* **catchRect** 用于实现区域共享，如{"left":10,"top":10,"width":1000,"height":800}
* **catchWnd** 共享窗口的窗口句柄，用于实现窗口共享

## 录制文件配置 {#RecordCfgObj}

> RecordCfgObj

```json
{"filePathName":"D:\\1.mp4","recordWidth":640,"recordHeight":320,"frameRate":8,
"bitRate":500000,"defaultQP":28,"recDataType":1,"isUploadOnRecording":0}
```

* **filePathName** 录像存储的路径文件名,使用完整路径
* **recordWidth** 录制结果中视频文件宽度
* **recordHeight** 录制结果中视频文件高度
* **frameRate** 录制视频文件的帧率，取值范围:1-30(值越大,cpu要求更高，推荐15帧)
* **bitRate** 录制视频文件的最高码率，当图像变化小时，实际码率会低于此值。建议：
> * 640*360: 500000; (500kbps)
> * 1280*720: 1000000; (1mbps)
> * 1920*1080: 2000000; (2mbps)

* **defaultQP** 录制视频文件的缺省质量，缺省值：28

> 取值范围：0~51，0表示完全无损, 51表示质量非常差，推荐高质量取值18，中质量28， 低质量36。

* **recDataType** 内容类型，值参考定义[REC_DATATYPE](constant.md#REC_DATATYPE)
* **isUploadOnRecording** 上传类型，是否边录边上传，0：手动上传；1：边录制边上传

> 开始录制时 startRecording 传入的参数，目的是为了确定此次录制的文件规格以及此文件的上传方式。

## 录制内容配置 {#RecordContentObj}

> RecordContentObj

```json
[
{"left":426,"top":124,"width":409,"height":231,"type":0, "keepAspectRatio":1,
"param": {"camid":"testuser.1", "camid":"guestUser.1" }}
]
```

* **left，top，width，height** 在录制画面中的区域（相对于录像尺寸）
* **type** 录制类型[REC_VCONTENT_TYPE](constant.md#REC_VCONTENT_TYPE)
> 1. 当type=RECVTP_VIDEO时，表示录制的是摄像头区域，param必须包含camid
> 1. 当type=RECVTP_PIC时，表示指定的图片，param必须包含resourceid
> 1. 当type=RECVTP_SCREEN时，表示录制的是屏幕，可以增加附加参数screenid
> 1. 当type= RECVTP_TIMESTAMP时，不用附加任何参数

* **camid** "用户id.摄像头id"
* **resourceid** xxx，调用setPicResource后得到此资源ID
* **screenid** 屏幕序号，-1表示主屏
* **pid** 进程号，0表示未指定进程
* **area** x，y，w，h，抓屏区域，无此参数时，代表抓全屏
* **keepAspectRatio** 内容保持原始比例，0不保持，1保持
* **param** 具体值与type相关

> 录制中调用[录制内容配置接口](meeting.md#setRecordVideos)传入的参数，可重复调用以调整录制内容。

## 录制文件列表 {#RecordFileObjs}

> RecordFileObjs

```json
[
{"fileName":"D:\\1.mp4","size":10240,"state":1,"uploadPercent":100},
{"fileName":"D:\\2.mp4","size":13140,"state":2,"uploadPercent":80}
]
```

* **fileName** 文件名，全路径
* **size** 文件大小
* **state**
  * **0** 没有上传
  * **1** 上传中
  * **2** 上传完毕
* **uploadPercent** 录制结果中视频尺寸高度上传进度，*state为1时此字段有效*

## 影音文件 {#MediaInfoObj}

> MediaInfoObj

```json
{ "userID": "111", "state":1, mediaName:"D:\1.mp4"}
```

* **userID** 用户id
* **state** 播放状态
  * **0** 播放
  * **1** 暂停
  * **2** 未播放
* **mediaName** 影音文件名

## 图片资源 {#PicResourceObj}

> PicResourceObj

```json
{"fmt":"picfile","dat":"c:\test.jpg"}
```

* **fmt** 资源格式，可取值："yuv420p"，"rgb32"，"picfile"，"picdat"
* **dat** 资源数据，不同格式时，要提供的数据各不一样：
> fmt为"yuv420p"时： dat存放的是base64(yuv420p数据)；
> fmt为"rgb32"时： dat存放的是base64(rgb32数据)；
> fmt为"picfile"时： dat存放的是“本地文件名”；
> fmt为"picdat "时：dat存放的是base64(图片文件内容)；

* **width** 图像宽度(像素), 在fmt为"yuv420p"，"rgb32"时，需要此参数
* **height** 图像高度(像素), 在fmt为"yuv420p"，"rgb32"时，需要此参数

## 白板 {#BoardObj}

> BoardObj

```json
{ "boardID": "xx", "title": "board_1", "width": 1024, "height": 768, "pageCount": 1}
```

* **boardID** 白板标识
* **title** 白板的名字
* **width** 宽
* **height** 高
* **pageCount** 页数

## 白板列表 {#BoardObjs}

> BoardObjs

```json
[
{ "boardID": "xx","title": "board1","width": 1024,"height": 768,"pageCount": 1},
{ "boardID": "yy","title": "board2","width": 1024,"height": 768,"pageCount": 1}
]
```

## 白板图元 {#BoardElementObj}

> BoardElementObj

```json
{ "elementID": "xx", "type":100, "left":0, "top":0, …}
```

* **elementID** 图元id
* **type** 图元的类型，值100以下为云屋保留值，100及以上为自定义值
* **left、top** 图元在页内的左上角位置
* **…** 可自由扩展

> 说明：
> * elementID必须调用createElementID获取, 即使是曾经调此接口创建的然后存入了磁盘文件，再次读入会议时，所有elementID也需要重新生成
> * 如果要和云屋产品互通，那就需要按云屋的定义取值，可以联系云屋获取相关文档

## 白板图元列表 {#BoardElementObjs}

> BoardElementObjs

```json
[
{ "elementID": "xx", "type":100, "orderID":0, "left":0, "top":0, …}
{ "elementID": "yy", "type":100, "orderID":0, "left":100, "top":100, …}
]
```

## 网盘文件 {#NetFileObj}

> NetFileObj

```json
{"ownerID":"00112","ownerName":"test","name":"ddd","orgFileName":"dddd.xxx","md5":"sdf234sdf2sfas2","ctime":"2017-12-6 12:13:14",
"size":12345678,"orgSize":123456999,"status":5}
```

* **ownerID** 文件所有者的ID
* **ownerName** 文件所有者的名称
* **name** 在服务器上的文件名
* **orgFileName** 用户的原始文件名
* **md5** 压缩后的md5(如果不压缩，则原文件md5)
* **ctime** 上传时间，字符串，格式"yyyy-MM-dd hh:mm:ss"
* **size** 在服务器上的大小(单位B，类型ulong)
* **orgSize** 原始文件大小(单位B，类型ulong)
* **status** 文件状态

## 网盘文件列表 {#NetFileObjs}

> NetFileObjs

```json
[{"ownerID":"","ownerName":"","name":"","orgFileName":"","md5":"","ctime":"","size":"","orgSize":"","status":""},
{"ownerID":"","ownerName":"","name":"","orgFileName":"","md5":"","ctime":"","size":"","orgSize":"","status":""},…]
```

## 队列信息 {#QueueObj}

> QueueObj

```json
{"queID":0,"name":"aaa","desc":"this is desc","prio":1}
```

* **queID** 队列ID
* **name** 队列名称
* **desc** 队列描述
* **prio** 优先级，值越小优先级越高

## 队列列表 {#QueueObjs}

>QueueObjs

```json
[
{"queID":0,"name":"aaa","desc":"this is desc","prio":1}，
{"queID":0,"name":"bbb","desc":"this is desc","prio":2}，
…
]
```

## 队列状态 {#QueueStatusObj}

> QueueStatusObj

```json
{"queID":0,"agent_num":12,"wait_num":3,"srv_num":11}
```

* **queID** 队列id
* **agent_num** 坐席数量
* **wait_num** 排队客户数量
* **srv_num** 正在服务的客户数量

## 排队信息 {#QueuingObj}

> QueuingObj

```json
{"queID":0,"position":3,"queuingTime":17}
```

* **queID** 队列ID 我排的队列(-1:代表我没有排队；-2:代表我正在会话中,通过GetSessionInfo可获取相关信息)
* **position** 我的位置
* **queuingTime** 我排队的时长(单位s)

## 会话信息 {#SesssionObj}

> SesssionObj

```json
{"callID":"0000123","peerID":"123","peerName":"aaa", "bCallAccepted":1,"meetingID":321321,"meetingPswd":"123456","duration":120}
```

* **callID** 会话中的呼叫ID
* **peerID** 会话中的目标用户ID
* **peerName** 会话中的目标用户昵称
* **bCallAccepted** 呼叫是否被对方接受 0:暂未接受，1:已接受
* **meetingID** 会话中分配的会议ID
* **meetingPswd** 会议密码
* **duration** 会话持续的时长(秒)

## 队列用户 {#QueueUser}

> QueueUser

```json
{"queID":1, "usrID":"31231231", "name":"aaa", "queuingTime":10, "usrExtDat":""}
```

* **queID** 队列ID
* **usrID** 用户ID
* **name** 用户昵称
* **queuingTime** 用户排队的时长(单位s)
* **usrExtDat** 用户排队时传入的扩展参数

## Http文件传输对象 {#HttpFileInfoObj}

> HttpFileInfoObj

```json
{ "bUploadType" : 1, "filePathName" : "D:/CloudroomVideoSDK_file/test.log",
"fileVersion" : "V1.0", "httpUrl" : "http://10.0.7.130:8080/Upload/", "params" : {},
"fileSize" : 53788511, "finishedSize" : 53788511,  "state" : 3 }
```

* **bUploadType** 传输类型，0:下载类型，1:上传类型
* **filePathName** 本地完整路径文件名(路径中要求有“CloudroomVideoSDK”)
* **fileVersio** 文件版本（可以填版本号，也可以md5，也可以为空）
* **httpUrl** 目标URL
* **params** 特殊参数，字典数据。
> params详细说明：decodeCREEFile：取值0或1。此参数仅上传有效，0：上传原始文件，1：上传解密的文件
* **fileSize** 文件大小
* **finishedSize** 已传输大小
* **state** 文件传输状态，详见[HTTP_TRANSFER_STATE](constant.md#HTTP_TRANSFER_STATE)

注意：fileName路径中要求有“CloudroomVideoSDK”，目的是防止利用sdk上传用户隐私文件、或下载恶意文件到系统目录等。

## Http文件传输对象列表 {#HttpFileInfoObjs}

> HttpFileInfoObjs

```json
[ { "bUploadType" : true, "filePathName" : "D:/CloudroomVideoSDK_file/test.log",
"fileVersion" : "V1.0", "httpUrl" : "http://10.0.7.130:8080/Upload/", "params" : {},
"fileSize" : 53788511, "finishedSize" : 53788511,  "state" : 3 }
]
```

## 用户状态 {#UserStatusObj}

>UserStatusObj

```json
{"userID":"xxx","userStatus":0,"DNDType":0}
```

* **userID** 用户id
* **userStatus** 用户的在线状态，参见[CLIENT_STATUS](constant.md#CLIENT_STATUS)
* **DNDType** 用户免打扰状态，参见[setDNDStatus](meetingMgr.md#setDNDStatus)

## 用户状态列表 {#UserStatusObjs}

```json
[
{"userID":"xxx","userStatus":0,"DNDType":0}
{"userID":"yyy","userStatus":0,"DNDType":0}
]
```