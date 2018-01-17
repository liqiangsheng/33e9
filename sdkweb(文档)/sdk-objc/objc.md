# 对象结构定义 {#object}

> 相关数据结构定义

------------

## SDK初始化 {#SdkInitDat}

>SdkInitDat

```objc
@interface SdkInitDat : NSObject

@property (nonatomic, copy) NSString *sdkDatSavePath;
@property (nonatomic, assign) BOOL showSDKLogConsole;
@property (nonatomic, assign) BOOL noCall;
@property (nonatomic, assign) BOOL noQueue;
@property (nonatomic, assign) BOOL noMediaDatToSvr;
@property (nonatomic, assign) int timeOut;

@end
```

* **sdkDatSavePath** SDK 内部使用的文件位置
* **showSDKLogConsole** 是否显示日志到控制台
* **noCall** 是否需要有呼叫功能
* **noQueue** 是否需要有排队功能
* **noMediaDatToSvr** 是否上传影音数据到服务器
* **timeOut** 超时时间设置(单位：ms)

## 登录信息 {#LoginDat}

> LoginDat

```objc
@interface LoginDat : NSObject

@property (nonatomic, copy) NSString *authAcnt;
@property (nonatomic, copy) NSString *authPswd;
@property (nonatomic, copy) NSString *nickName;
@property (nonatomic, copy) NSString *privAcnt;
@property (nonatomic, copy) NSString *privAuthCode;
@property (nonatomic, copy) NSString *param;

@end
```

* **authAcnt：** 云屋鉴权帐号
* **authPswd：** 云屋鉴权密码
* **nickName：** 昵称
* **privAcnt：** 自定义帐号，云屋服务器将会去配置的服务器进行认证(当不使用自定义帐号时，acnt，pswd应为NULL)
* **privAuthCode：** 自定义验证码(有复杂要求的，可以使用json格式)
* **param：** 用户扩展信息

## 会议对象 {#MeetInfo}

> MeetInfo

```objc
@interface MeetInfo : NSObject

@property (nonatomic, assign) int ID;
@property (nonatomic, copy) NSString *pswd;
@property (nonatomic, copy) NSString *subject;
@property (nonatomic, copy) NSString *pubMeetUrl;

@end
```

* **ID：** 会议号，数值0代表会议信息无效
* **pswd：** 会议密码;(空代表会议无密码)
* **subject：** 会议主题
* **pubMeetUrl：** 会议公共链接

## 会议成员 {#MemberInfo}

> MemberInfo

```objc
@interface MemberInfo : NSObject

@property (nonatomic, copy) NSString *userId;
@property (nonatomic, copy) NSString *nickName;
@property (nonatomic, assign) int audioStatus;
@property (nonatomic, assign) int videoStatus;

@end
```

* **userId** 用户ID
* **nickName** 用户昵称
* **audioStatus** 音频状态，详见 [AUDIO_STATUS](constant.md#AUDIO_STATUS)
* **videoStatus** 视频状态，详见 [VIDEO_STATUS](constant.md#VIDEO_STATUS)

## 音频配置 {#AudioCfg}

> AudioCfg

```objc
@interface AudioCfg : NSObject

@property (nonatomic, copy) NSString *micName;
@property (nonatomic, copy) NSString *speakerName;
@property (nonatomic, assign) BOOL privEC;
@property (nonatomic, assign) BOOL privAgc;
@property (nonatomic, assign) BOOL HILevelEC;

@end
```

* **micName** 麦克风设备名称(空代表系统默认设备)
* **speakerName** 扬声器名称(空代表系统默认设备)
* **privEC** 是否开启云屋私有回声消息
  * **0：** 不开启
  * **1：** 开启(缺省建议不开启)
* **privAgc** 是否开启云屋私有语音自动增益
  * **0：** 不开启
  * **1：** 开启(缺省建议不开启)
* **HILevelEC** 超强回声消息

## 视频配置 {#VideoCfg}

> VideoCfg

```objc
@interface VideoCfg : NSObject

@property (nonatomic, assign) VIDEO_SIZE_TYPE sizeType;
@property (nonatomic, assign) int fps;
@property (nonatomic, assign) int maxbps;
@property (nonatomic, assign) int minQuality;
@property (nonatomic, assign) int maxQuality;
@property (nonatomic, assign) VIDEO_WHRATE_TYPE whRate;

@end
```

* **sizeType** 视频尺寸，请参见：[VIDEO_SHOW_SIZE](constant.md#VIDEO_SHOW_SIZE)
* **fps** 视频帧率(5~30)
* **maxbps** 视频码率(1~100\*1000\*1000)(未配置则使用内部默认值，请参见[VIDEO_SHOW_SIZE](constant.md#VIDEO_SHOW_SIZE))
* **minQuality** 最佳质量(18~51，越小质量越好) (未配置则使用内部默认值25)
* **maxQuality** 最差质量(18~51， 越大质量越差) (未配置则使用内部默认值36)
* **whRate** 视频宽高比，取值如下：
  * **0** 为16：9(未配置时内部默认值)
  * **1** 为4：3
  * **2** 为1：1

> 我们采用的是vbr编码(由质量+码率，双重控制)：
>> 1. qp范围：质量参数，为的是达到目标质量后，无需花费更大码率提高质量
>> 1. maxbps码率控制，是为了确保结果一定不大于“目标码率”(体积受控)
>> 1. 当要超出码率控制时，自动降低质量;当质量达到目标时，自动减少码率甚至无码率输出

## 视频帧图像 {#VideoFrame}

> VideoFrame

```objc
@interface VideoFrame : NSObject
{
    @public void *dat;
}

@property (nonatomic, assign) int camShowNo;
@property (nonatomic, assign) VIDEO_FORMAT fmt;
@property (nonatomic, assign) int datLength;
@property (nonatomic, assign) int frameWidth;
@property (nonatomic, assign) int frameHeight;
@property (nonatomic, assign) unsigned long long frmTime;

@end
```

* **dat** 图像数据 Base64 编码
* **camShowNo** 摄像头显示序号(0开始编号)
* **fmt** 图像格式，详见 [VIDEO_FORMAT](constant.md#VIDEO_FORMAT)
* **datLength** 图像大小
* **frameWidth** 图像宽度
* **frameHeight** 图像高度
* **frmTime** 图像的时间戳

## 用户视频ID {#UsrVideoId}

> UsrVideoId

```objc
@interface UsrVideoId : NSObject

@property (nonatomic, copy) NSString *userId;
@property (nonatomic, assign) short videoID;

@end
```

* **userId** 用户 ID
* **videoID** 设备 ID

## 用户视频信息 {#UsrVideoInfo}

> UsrVideoInfo

```objc
@interface UsrVideoInfo : UsrVideoId

@property (nonatomic, copy) NSString *videoName;
@property (nonatomic, copy) NSString *videoDevPath;

@end
```

* **videoName** 设备名称
* **videoDevPath** 设备路径

## 屏幕共享图像 {#ScreenShareImg}

> ScreenShareImg

```objc
@interface ScreenShareImg : NSObject
{
    @public void *rgbDat;
}

@property (nonatomic, assign) int datLength;
@property (nonatomic, assign) int rgbWidth;
@property (nonatomic, assign) int rgbHeight;

@end
```

* **rgbDat** 图像数据
* **datLength** 图像大小
* **rgbWidth** 图像宽
* **rgbHeight** 图像高

## 录制文件配置 {#RecCfg}

> RecCfg

```objc
@interface RecCfg : NSObject

@property (nonatomic, copy) NSString *filePathName;
@property (nonatomic, assign) int fps;
@property (nonatomic, assign) CGSize dstResolution;
@property (nonatomic, assign) int maxBPS;
@property (nonatomic, assign) int defaultQP;
@property (nonatomic, assign) REC_DATA_TYPE recDataType;
@property (nonatomic, assign) BOOL isUploadOnRecording;

@end
```

* **filePathName** 录像存储的路径文件名，使用完整路径
* **fps** 帧率，建议不要太高(取值1~24)
* **dstResolution** 目标分辨率
* **maxBPS** 录制视频文件的最高码率，当图像变化小时，实际码率会低于此值。建议：
> * 640*360： 500000; (500kbps)
> * 1280*720： 1000000; (1mbps)
> * 1920*1080： 2000000; (2mbps)
* **defaultQP** 录制视频文件的缺省质量，缺省值：28

> 取值范围：0~51，0表示完全无损， 51表示质量非常差，推荐高质量取值18，中质量28， 低质量36。

* **recDataType** 内容类型，详见 [REC_DATA_TYPE](constant.md#REC_DATA_TYPE)
* **isUploadOnRecording** 上传类型，是否边录边上传，0：手动上传;1：边录制边上传

> 开始录制时 startRecording 传入的参数，目的是为了确定此次录制的文件规格以及此文件的上传方式。

## 录制内容配置 {#RecContentItem}

> RecContentItem

```objc
@interface RecContentItem : NSObject
{
    @public
    NSDictionary<NSString *, NSString *> *_itemDat;
}

@property (nonatomic, assign) REC_CONTENT_TYPE type;
@property (nonatomic, assign) CGRect itemRt;
@property (nonatomic, copy) NSDictionary<NSString *, NSString *> *itemDat;

@end
```

* **_itemDat** 参数列表
> 1. camID** "用户id.摄像头id"
> 2. resID** 常量字符串，调用setPicResource后得到此资源 ID
> 3. screenID** 屏幕序号，-1表示主屏
* **type** 录制类型，详见 [REC_CONTENT_TYPE](constant.md#REC_CONTENT_TYPE)
> 1. 当 type = RECVTP_VIDEO 时，表示录制的是摄像头区域，param 必须包含 camID
> 2. 当 type = RECVTP_PIC 时，表示指定的图片，param 必须包含 resID
> 3. 当 type = RECVTP_SCREEN 时，表示录制的是屏幕，可以增加附加参数 screenID
> 4. 当 type = RECVTP_TIMESTAMP 时，不用附加任何参数
* **itemRt** 录制画面中的区域(left，top，width，height 相对于录像尺寸)
* **itemDat** 录制数据

> 录制中调用 [setRecordVideos](meeting.md#setRecordVideos) 传入的参数，可重复调用以调整录制内容

> RecVideoContentItem

```objc
@interface RecVideoContentItem : RecContentItem

@end
```

> RecPictureContentItem

```objc
@interface RecPictureContentItem : RecContentItem

@end
```

> RecTimeStampContentItem

```objc
@interface RecTimeStampContentItem : RecContentItem

@end
```

> RecMediaContentItem

```objc
@interface RecMediaContentItem : RecContentItem

@end
```

> RecScreenContentItem

```objc
@interface RecScreenContentItem : RecContentItem

@end
```

## 录制文件信息 {#RecFileShow}

> RecFileShow

```objc
@interface RecFileShow : NSObject

@property (nonatomic, copy) NSString *fileName;
@property (nonatomic, assign) int fileSize;
@property (nonatomic, copy) NSString *startTime;
@property (nonatomic, assign) REC_FILE_STATE state;
@property (nonatomic, assign) int uploadPercent;

@end
```

* **fileName** 文件名称
* **fileSize** 文件大小
* **startTime** 开始时间
* **state** 录制状态， 详见 [REC_FILE_STATE](constant.md#REC_FILE_STATE)
* **uploadPercent** 上传进度

## 影音文件 {#MediaInfo}

> MediaInfo

```objc
@interface MediaInfo : NSObject

@property (nonatomic, copy) NSString *userID;
@property (nonatomic, assign) MEDIA_STATE state;
@property (nonatomic, copy) NSString *mediaName;

@end
```

* **userID** 用户 ID
* **state** 播放状态， 详见 [MEDIA_STATE](constant.md#MEDIA_STATE)
* **mediaName** 影音文件名

## 影音文件图像 {#MediaDataFrame}

> MediaDataFrame

```objc
@interface MediaDataFrame : NSObject
{
    @public void *buf;
}

@property (nonatomic, assign) int datLength;
@property (nonatomic, assign) int fmt;
@property (nonatomic, assign) int w;
@property (nonatomic, assign) int h;
@property (nonatomic, assign) int64_t ms;

@end
```

* **buf** 图像数据
* **datLength** 图像大小
* **fmt** 格式，详见 [VIDEO_FORMAT](constant.md#VIDEO_FORMAT)
* **w** 图像宽
* **h** 图像高
* **ms** PTS

## 标注信息 {#MarkData}

> MarkData

```objc
@interface MarkData : NSObject

@property (nonatomic, assign) short termid;
@property (nonatomic, assign) short termidSN;
@property (nonatomic, assign) int color;
@property (nonatomic, copy) NSArray<NSNumber *> *mousePosSeq;

@end
```

* **termid** ID
* **termidSN** SN
* **color** 画笔颜色
* **mousePosSeq** 点集

## 队列信息 {#QueueInfo}

> QueueInfo

```objc
@interface QueueInfo : NSObject

@property (nonatomic, assign) int queID;
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *desc;
@property (nonatomic, assign) int prio;

@end
```

* **queID** 队列ID
* **name** 队列名称
* **desc** 队列描述
* **prio** 优先级，值越小优先级越高

## 队列状态 {#QueueStatus}

> QueueStatus

```objc
@interface QueueStatus : NSObject

@property (nonatomic, assign) int queID;
@property (nonatomic, assign) int agent_num;
@property (nonatomic, assign) int wait_num;
@property (nonatomic, assign) int srv_num;

@end
```

* **queID** 队列 ID
* **agent_num** 坐席数量
* **wait_num** 排队客户数量
* **srv_num** 正在服务的客户数量

## 排队信息 {#QueuingInfo}

> QueuingInfo

```objc
@interface QueuingInfo : NSObject

@property (nonatomic, assign) int queID; 
@property (nonatomic, assign) int position; 
@property (nonatomic, assign) int queuingTime;

@end
```

* **queID** 队列ID 我排的队列(-1：代表我没有排队;-2：代表我正在会话中，通过GetSessionInfo可获取相关信息)
* **position** 我的位置
* **queuingTime** 我排队的时长(单位s)

## 会话信息 {#VideoSessionInfo}

> VideoSessionInfo

```objc
@interface VideoSessionInfo : NSObject

@property (nonatomic, copy) NSString *callID;
@property (nonatomic, copy) NSString *peerID;
@property (nonatomic, copy) NSString *peerName;
@property (nonatomic, assign) BOOL bCallAccepted;
@property (nonatomic, assign) int meetingID;
@property (nonatomic, copy) NSString *meetingPswd;
@property (nonatomic, assign) int duration;

@end
```

* **callID** 会话中的呼叫 ID
* **peerID** 会话中的目标用户 ID
* **peerName** 会话中的目标用户昵称
* **bCallAccepted** 呼叫是否被对方接受 0：暂未接受，1：已接受
* **meetingID** 会话中分配的会议 ID
* **meetingPswd** 会议密码
* **duration** 会话持续的时长(秒)

## 队列用户 {#UserInfo}

> UserInfo

```objc
@interface UserInfo : NSObject

@property (nonatomic, assign) int queID;
@property (nonatomic, copy) NSString *usrID;
@property (nonatomic, copy) NSString *name;
@property (nonatomic, assign) int queuingTime;

@end
```

* **queID** 队列 ID
* **usrID** 用户 ID
* **name** 用户昵称
* **queuingTime** 排队的时长(单位s)

## Http文件传输对象 {#FileTransInfo}

> FileTransInfo

```objc
@interface FileTransInfo : NSObject

@property (nonatomic, assign) HTTP_TRANSFER_STATE state;
@property (nonatomic, assign) int fileSize;
@property (nonatomic, assign) int finishedSize;

@end
```

* **state** 文件传输状态，详见[HTTP_TRANSFER_STATE](constant.md#HTTP_TRANSFER_STATE)
* **fileSize** 文件大小
* **finishedSize** 已传输大小

> HTTPReqInfo

```objc
@interface HTTPReqInfo : NSObject

@property (nonatomic, copy) NSString *filePathName;
@property (nonatomic, copy) NSString *httpUrl;
@property (nonatomic, copy) NSString *fileVersion;
@property (nonatomic, assign) BOOL bUploadType;
@property (nonatomic, copy) NSString *params;

@end
```

* **filePathName** 本地完整路径文件名(路径中要求有“CloudroomVideoSDK”，目的是防止利用sdk上传用户隐私文件、或下载恶意文件到系统目录等)
* **httpUrl** 目标URL
* **fileVersion** 文件版本(可以填版本号/MD5/空)
* **bUploadType** 传输类型，NO：下载类型，YES：上传类型
* **params** 特殊参数，字典数据
> params详细说明：decodeCREEFile：取值0或1。此参数仅上传有效，0：上传原始文件，1：上传解密的文件