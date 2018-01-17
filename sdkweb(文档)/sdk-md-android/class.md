# 类定义 {#object}

> 相关类定义

------------

## Sdk初始化数据 {#SdkInitDat}

> com.cloudroom.cloudroomvideosdk.model.SdkInitDat

* **oemID:** 开发商ID，没有特别要求可以用：CLOUDROOM
* **sdkDatSavePath:** sdk内部使用文件位置
* **noCall:** 不需要呼叫业务（可减少登录环节、及通信需求）
* **noQueue:** 不使用sdk的排队功能的业务（可减少登录环节、及通信需求）
* **noMediaDatToSvr:** 与服务器无实时流媒体数据（可减少复杂度，加快登录速度）
* **timeOut:** 网络通信超时时间(10000-120000)，单位是毫秒，超出范围时就近取边界值

## 登录数据 {#LoginDat}

> com.cloudroom.cloudroomvideosdk.model.LoginDat

* **authAcnt:** 云屋鉴权帐号
* **authPswd:** 云屋鉴权密码
* **nickName:** 昵称
* **privAcnt:** 自定义帐号, 云屋服务器将会去配置的服务器进行认证； （当不使用自定义帐号时，privAuthCode应为null)
* **privAuthCode:** 自定义验证码(有复杂要求的，可以使用json格式)

## 会议对象 {#MeetInfo}

> com.cloudroom.cloudroomvideosdk.model.MeetInfo

* **ID:** 会议号，数值0代表会议信息无效
* **pswd:** 会议密码；（空代表会议无密码）
* **subject:** 会议主题
* **pubMeetUrl:** 会议公共链接
* **creator:** 会议创建者
* **memberCount:** 会议内人数
* **startTime:** 会议开始时间(从1970年1月1日00:00:00起)

## 用户状态 {#UserStatus}

> com.cloudroom.cloudroomvideosdk.model.UserStatus

* **userID** 用户id
* **userStatus** 用户的在线状态，参见[CLIENT_STATUS](constant.md#CLIENT_STATUS)
* **DNDType** 用户免打扰状态，参见[setDNDStatus](meetingMgr.md#setDNDStatus)

## 大小描述 {#Size}

> com.cloudroom.cloudroomvideosdk.model.Size

* **width** 宽
* **height** 高

## 会议成员 {#MemberInfo}

> com.cloudroom.cloudroomvideosdk.model.MemberInfo

* **userID** 用户ID
* **nickname** 用户昵称
* **audioStatus** 音频状态，数值参考麦克风状态[ASTATUS](constant.md#ASTATUS)
* **videoStatus** 视频状态，数值参考视频状态定义[VSTATUS](constant.md#VSTATUS)

## 音频配置 {#AudioCfg}

> com.cloudroom.cloudroomvideosdk.model.AudioCfg

* **_micName** 麦克风设备名称(空代表系统默认设备)
* **_speakerName** 扬声器名称(空代表系统默认设备)
* **_privEC** 是否开启云屋私有回声消除
* **_privAgc** 是否开启云屋私有语音自动增益
* **_HILevelEC** 是否开启云屋超强回声消除

## 视频配置 {#VideoCfg}

> com.cloudroom.cloudroomvideosdk.model.VideoCfg

* **sizeType** 视频尺寸，详见定义[VIDEO_SHOW_SIZE](constant.md#VIDEO_SHOW_SIZE)
* **fps** 视频帧率(5~30)
* **maxbps** 视频码率（1~100\*1000\*1000）(未配置则使用内部默认值，详见定义[VIDEO_SHOW_SIZE](constant.md#VIDEO_SHOW_SIZE))
* **minQuality** 最佳质量(18~51，越小质量越好) (未配置则使用内部默认值25)
* **maxQuality** 最差质量(18~51， 越大质量越差) (未配置则使用内部默认值36)
* **whRate** 视频宽高比,取值如下：
  * **0** 为16:9(未配置时内部默认值)
  * **1** 为4:3
  * **2** 为1:1

> 我们采用的是vbr编码（由质量+码率，双重控制）：
>> 1. maxbps码率控制，是为了确保结果一定不大于“目标码率”（体积受控）
>> 2. qp范围：质量参数，为的是达到目标质量后，无需花费更大码率提高质量
>> 3. 当要超出码率控制时，自动降低质量；当质量达到目标时，自动减少码率甚至无码率输出
>> 注：使用硬编时第二点是无效的。

## 视频帧图像 {#RawFrame}

> com.cloudroom.cloudroomvideosdk.model.RawFrame

* **camShowNo** 摄像头显示序号(0开始编号)
* **format** 图像格式,数值参考视频图像格式[VIDEO_FORMAT](constant.md#VIDEO_FORMAT)
* **dat** 图像数据
* **frameWidth** 图像宽度
* **frameHeight** 图像高度
* **frameTime** 图像的时间戳

## 用户视频信息 {#UsrVideoInfo}

> com.cloudroom.cloudroomvideosdk.model.UsrVideoInfo

* **videoDevPath** 设备路径
* **videoName** 设备名称

## 用户摄像头 {#UsrVideoId}

> com.cloudroom.cloudroomvideosdk.model.UsrVideoId

* **userId** 用户id
* **videoID** 设备id

## 影音文件信息 {#MediaInfo}

> com.cloudroom.cloudroomvideosdk.model.MediaInfo

* **userID** 用户id
* **state** 播放状态，详见定义[MEDIA_STATE](constant.md#MEDIA_STATE)
* **mediaName** 影音文件名

## 影音帧图像 {#MediaFrame}

> com.cloudroom.cloudroomvideosdk.model.MediaFrame

* **format** 图像格式,数值参考视频图像格式[VIDEO_FORMAT](constant.md#VIDEO_FORMAT)
* **buf** 图像数据
* **w** 图像宽度
* **h** 图像高度
* **frameTime** 图像的时间戳

## 屏幕共享帧图像 {#ScreenShareImg}

> com.cloudroom.cloudroomvideosdk.model.ScreenShareImg

* **rgbDat** 图像数据
* **rgbWidth** 图像宽度
* **rgbHeight** 图像高度

## 屏幕共享标注信息 {#ScreenMarkData}

> com.cloudroom.cloudroomvideosdk.model.ScreenMarkData

* **userID** 标注者用户ID
* **useridSN** 标注SN
* **color** 标注颜色
* **mousePosSeq** 标注数据

## 屏幕共享删除标注信息 {#RemoveScreenMarkData}

> com.cloudroom.cloudroomvideosdk.model.RemoveScreenMarkData

* **userID** 标注者用户ID
* **useridSN** 标注SN

## 录制文件配置 {#RecordCfg}

> com.cloudroom.cloudroomvideosdk.model.RecordCfg

* **filePathName** 录像存储的路径文件名,使用完整路径
* **dstResolution** 录制结果中视频文件宽度
* **fps** 录制视频文件的帧率，取值范围:1-30(值越大,cpu要求更高，推荐15帧)
* **maxBPS** 录制视频文件的最高码率，当图像变化小时，实际码率会低于此值。建议：
> * 640*360: 500000; (500kbps)
> * 1280*720: 1000000; (1mbps)
> * 1920*1080: 2000000; (2mbps)

* **defaultQP** 录制视频文件的缺省质量，缺省值：28

> 取值范围：0~51，0表示完全无损, 51表示质量非常差，推荐高质量取值18，中质量28， 低质量36。

* **recDataType** 内容类型，值参考定义[REC_DATATYPE](constant.md#REC_DATATYPE)
* **isUploadOnRecording** 上传类型，是否边录边上传，0：手动上传；1：边录制边上传

> 开始录制时 startRecording 传入的参数，目的是为了确定此次录制的文件规格以及此文件的上传方式。

## 录制内容配置 {#RecordContent}

> com.cloudroom.cloudroomvideosdk.model.RecContentItem

* **itemRt** 在录制画面中的区域（相对于录像尺寸）
* **type** 录制类型[REC_VCONTENT_TYPE](constant.md#REC_VCONTENT_TYPE)

```Java
RecContentItem(REC_VCONTENT_TYPE itemType, Rect itemRt)
```
* **功能** 构造方法
* **返回值** 无
* **参数**
  * itemType 录制类型[REC_VCONTENT_TYPE](constant.md#REC_VCONTENT_TYPE)
  * itemRt 在录制画面中的区域（相对于录像尺寸）

> com.cloudroom.cloudroomvideosdk.model.RecMediaContentItem

* **itemRt** 在录制画面中的区域（相对于录像尺寸）
* **type** 录制类型[REC_VCONTENT_TYPE](constant.md#REC_VCONTENT_TYPE)

```Java
RecMediaContentItem(REC_VCONTENT_TYPE itemType, Rect itemRt)
```
* **功能** 构造方法
* **返回值** 无
* **参数**
  * itemRt 在录制画面中的区域（相对于录像尺寸）

> com.cloudroom.cloudroomvideosdk.model.RecPicContentItem

* **itemRt** 在录制画面中的区域（相对于录像尺寸）
* **type** 录制类型[REC_VCONTENT_TYPE](constant.md#REC_VCONTENT_TYPE)

```Java
RecPicContentItem(String resID, Rect itemRt)
```
* **功能** 构造方法
* **返回值** 无
* **参数**
  * resID 资源ID，用户调用方法设置的图片资源标识[setPicResource](meeting.md#setPicResource)
  * itemRt 在录制画面中的区域（相对于录像尺寸）

> com.cloudroom.cloudroomvideosdk.model.RecVideoContentItem

* **itemRt** 在录制画面中的区域（相对于录像尺寸）
* **type** 录制类型[REC_VCONTENT_TYPE](constant.md#REC_VCONTENT_TYPE)

```Java
RecVideoContentItem(String userID, short camID, Rect itemRt)
```
* **功能** 构造方法
* **返回值** 无
* **参数**
  * userID 用户ID
  * camID 摄像头ID
  * itemRt 在录制画面中的区域（相对于录像尺寸）

> 录制中调用[setRecordVideos](meeting.md#setRecordVideos)传入的参数，可重复调用以调整录制内容。

## 录制文件 {#RecordFile}

> com.cloudroom.cloudroomvideosdk.model.RecordFileInfo

* **fileName** 文件名，全路径
* **startTime** 开始录制时间
* **duration** 录制时长
* **fileSize** 文件大小

> com.cloudroom.cloudroomvideosdk.model.RecordFileShow

* **fileName** 文件名，全路径
* **size** 文件大小
* **state** 文件状态，详见定义[RECORD_FILE_STATE](constant.md#RECORD_FILE_STATE)
* **uploadPercent** 录制结果中视频尺寸高度上传进度

## 白板 {#SubPage}

> com.cloudroom.cloudroomvideosdk.model.SubPage

* **userID** 用户id
* **pageID** 白板页ID

## 白板信息 {#SubPageInfo}

> com.cloudroom.cloudroomvideosdk.model.SubPageInfo

* **page** 白板标识，详见定义[SubPage](class.md#SubPage)
* **title** 白板的名字
* **width** 宽
* **height** 高
* **pageCount** 页数

## 白板图元 {#BoardElement}

> com.cloudroom.cloudroomvideosdk.model.BoardElement

* **elementID** 图元id
* **type** 图元的类型，值100以下为云屋保留值，100及以上为自定义值
* **left、top** 图元在页内的左上角位置
* **…** 可自由扩展

> 说明：
> * elementID必须调用createElementID获取, 即使是曾经调此接口创建的然后存入了磁盘文件，再次读入会议时，所有elementID也需要重新生成
> * 如果要和云屋产品互通，那就需要按云屋的定义取值，可以联系云屋获取相关文档

## 网盘文件 {#FileInfo}

> com.cloudroom.cloudroomvideosdk.model.FileInfo

* **ownerID** 文件所有者的ID
* **ownerName** 文件所有者的名称
* **name** 在服务器上的文件名
* **orgFileName** 用户的原始文件名
* **md5** 压缩后的md5(如果不压缩，则原文件md5)
* **ctime** 上传时间，字符串，格式"yyyy-MM-dd hh:mm:ss"
* **size** 在服务器上的大小(单位B，类型ulong)
* **orgSize** 原始文件大小(单位B，类型ulong)
* **status** 文件状态

## 网盘容量信息 {#DiskSummary}

> com.cloudroom.cloudroomvideosdk.model.DiskSummary

* **confDiskLimit** 网盘总容量（KB）
* **confDiskUsed** 网盘已用容量（KB）

## 队列信息 {#QueueInfo}

> com.cloudroom.cloudroomvideosdk.model.QueueInfo

* **queID** 队列ID
* **name** 队列名称
* **desc** 队列描述
* **prio** 优先级，值越小优先级越高

## 队列状态 {#QueueStatus}

> com.cloudroom.cloudroomvideosdk.model.QueueStatus

* **queID** 队列id
* **agent_num** 坐席数量
* **wait_num** 排队客户数量
* **srv_num** 正在服务的客户数量

## 排队信息 {#QueuingInfo}

> com.cloudroom.cloudroomvideosdk.model.QueuingInfo

* **queID** 队列ID 我排的队列(-1:代表我没有排队；-2:代表我正在会话中,通过GetSessionInfo可获取相关信息)
* **position** 我的位置
* **queuingTime** 我排队的时长(单位s)


## 会话信息 {#VideoSessionInfo}

> com.cloudroom.cloudroomvideosdk.model.VideoSessionInfo

* **callID** 会话中的呼叫ID
* **peerID** 会话中的目标用户ID
* **peerName** 会话中的目标用户昵称
* **bCallAccepted** 呼叫是否被对方接受 0:暂未接受，1:已接受
* **meetingID** 会话中分配的会议ID
* **meetingPswd** 会议密码
* **duration** 会话持续的时长(秒)

## 队列用户 {#UserInfo}

> com.cloudroom.cloudroomvideosdk.model.UserInfo

* **queID** 队列ID
* **usrID** 用户ID
* **name** 用户昵称
* **queuingTime** 排队的时长(单位s)

## Http文件传输对象 {#HttpFileInfo}

> com.cloudroom.cloudroomvideosdk.model.HttpReqInfo

* **bUploadType** 是否上传
* **filePathName** 本地完整路径文件名(路径中要求有“CloudroomVideoSDK”)
* **fileVersio** 文件版本（可以填版本号，也可以md5，也可以为空）
* **httpUrl** 目标URL

> com.cloudroom.cloudroomvideosdk.model.FileTransInfo

* **bUploadType** 是否上传
* **filePathName** 本地完整路径文件名(路径中要求有“CloudroomVideoSDK”)
* **fileVersio** 文件版本（可以填版本号，也可以md5，也可以为空）
* **httpUrl** 目标URL
* **fileSize** 文件大小
* **finishedSize** 已传输大小
* **state** 文件传输状态，详见[HttpTransferState](constant.md#HttpTransferState)

注意：fileName路径中要求有“CloudroomVideoSDK”，目的是防止利用sdk上传用户隐私文件、或下载恶意文件到系统目录等。
