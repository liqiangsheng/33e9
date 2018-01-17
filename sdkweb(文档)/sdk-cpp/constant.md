# 常量定义 {#constant}

> 相关数值及含义定义

----------------------------

## 错误码定义 {#CRVIDEOSDK_ERR_DEF}

>CRVIDEOSDK_ERR_DEF

|代码|数值|含义 |
|-------------|-------------|-----|
|CRVIDEOSDK_NOERR               |0|没有错误|
|CRVIDEOSDK_UNKNOWERR           |1|未知错误|
|CRVIDEOSDK_OUTOF_MEM           |2|内存不足|
|CRVIDEOSDK_INNER_ERR           |3|sdk内部错误|
|CRVIDEOSDK_MISMATCHCLIENTVER   |4|不支持的sdk版本|
|CRVIDEOSDK_MEETPARAM_ERR       |5|参数错误|
|CRVIDEOSDK_ERR_DATA            |6|无效数据|
|CRVIDEOSDK_ANCTPSWD_ERR        |7|帐号密码不正确|
|CRVIDEOSDK_SERVER_EXCEPTION    |8|服务异常|
|CRVIDEOSDK_LOGINSTATE_ERROR    |9|登录状态错误|
|CRVIDEOSDK_USER_BEEN_KICKOUT   |10|登录用户被踢下线|
|CRVIDEOSDK_NETWORK_INITFAILED  |200|网络初始化失败|
|CRVIDEOSDK_NO_SERVERINFO       |201|没有服务器信息|
|CRVIDEOSDK_NOSERVER_RSP        |202|服务器没有响应|
|CRVIDEOSDK_CREATE_CONN_FAILED  |203|创建连接失败|
|CRVIDEOSDK_SOCKETEXCEPTION     |204|socket异常|
|CRVIDEOSDK_SOCKETTIMEOUT       |205|网络超时|
|CRVIDEOSDK_FORCEDCLOSECONNECTION   |206|连接被关闭|
|CRVIDEOSDK_CONNECTIONLOST          |207|连接丢失|
|CRVIDEOSDK_QUE_ID_INVALID          |400|队列ID错误|
|CRVIDEOSDK_QUE_NOUSER              |401|没有用户在排队|
|CRVIDEOSDK_QUE_USER_CANCELLED      |402|排队用户已取消|
|CRVIDEOSDK_QUE_SERVICE_NOT_START   |403|队列服务还未开启|
|CRVIDEOSDK_ALREADY_OTHERQUE        |404|已在其它队列排队(客户只能在一个队列排队)|
|CRVIDEOSDK_INVALID_CALLID          |600|无效的呼叫ID|
|CRVIDEOSDK_ERR_CALL_EXIST          |601|已在呼叫中|
|CRVIDEOSDK_ERR_BUSY                |602|对方忙|
|CRVIDEOSDK_ERR_OFFLINE             |603|对方不在线|
|CRVIDEOSDK_ERR_NOANSWER            |604|对方无应答|
|CRVIDEOSDK_ERR_USER_NOT_FOUND      |605|用户不存在|
|CRVIDEOSDK_ERR_REFUSE              |606|对方拒接|
|CRVIDEOSDK_MEETNOTEXIST            |800|会议不存在或已结束|
|CRVIDEOSDK_AUTHERROR               |801|会议密码不正确|
|CRVIDEOSDK_MEMBEROVERFLOWERROR     |802|会议终端数量已满（购买的license不够)|
|CRVIDEOSDK_RESOURCEALLOCATEERROR   |803|分配会议资源失败|
|CRVIDEOSDK_MEETROOMLOCKED          |804|会议已加锁|
|CRVIDEOSDK_CATCH_SCREEN_ERR        |900|抓屏失败|
|CRVIDEOSDK_RECORD_MAX              |901|单次录制达到最大时长(8h)|
|CRVIDEOSDK_RECORD_NO_DISK          |902|磁盘空间不够|
|CRVIDEOSDK_SENDFAIL                |1000|发送失败|
|CRVIDEOSDK_CONTAIN_SENSITIVEWORDS  |1001|有敏感词语|
|CRVIDEOSDK_SENDCMD_LARGE           |1100|发送信令数据过大|
|CRVIDEOSDK_SENDBUFFER_LARGE        |1101|发送数据过大|
|CRVIDEOSDK_SENDDATA_TARGETINVALID  |1102|目标用户不存在|
|CRVIDEOSDK_SENDFILE_FILEINERROR    |1103|文件错误|
|CRVIDEOSDK_TRANSID_INVALID         |1104|无效的发送id|
|CRVIDEOSDK_RECORDFILE_STATE_ERR    |1200|状态错误不可上传/取消上传|
|CRVIDEOSDK_RECORDFILE_NOT_EXIST    |1201|录制文件不存在|

## 麦克风（音频）状态 {#ASTATUS}

> ASTATUS

|代码|数值|含义|
|------------|-------------|-----|
|AUNKNOWN   |   0   |   麦克风状态未知  |
|ANULL      |   1   |   没有麦克风设备 |
|ACLOSE     |   2   |   麦克风处于关闭状态 |
|AOPEN      |   3   |   麦克风处于打开状态 |
|AOPENING   |   4   |   向服务器发送打开消息中 |

## 视频尺寸定义 {#VIDEO_SHOW_SIZE}

> VIDEO_SHOW_SIZE

|代码        |数值|分辨率及码率|
|------------|-------------|-----|
|VIDEO_SZ_80    |1| 144*80,   最大码率：56kbps|
|VSIZE_SZ_128   |2| 224*128,  最大码率：72kbps|
|VSIZE_SZ_160   |3| 288*160,  最大码率：100kbps|
|VSIZE_SZ_192   |4| 336*192,  最大码率：150kbps|
|VSIZE_SZ_256   |5| 448*256,  最大码率：200kbps|
|VSIZE_SZ_288   |6| 512*288,  最大码率：250kbps|
|VSIZE_SZ_320   |7| 576*320,  最大码率：300kbps|
|VSIZE_SZ_360   |8| 640*360,  最大码率：350kbps|
|VSIZE_SZ_400   |9| 720*400,  最大码率：420kbps|
|VSIZE_SZ_480   |10| 848*480,  最大码率：500kbps|
|VSIZE_SZ_576   |11| 1024*576,  最大码率：650kbps|
|VSIZE_SZ_720   |12| 1280*720,  最大码率：1mbps|
|VSIZE_SZ_1080  |13| 1920*1080, 最大码率：2mbps|

## 摄像头（视频）状态定义 {#VSTATUS}

> VSTATUS

|代码|数值|含义|
|------------|-------------|-----|
|VUNKNOWN   |0| 摄像头状态未知|
|VNULL      |1| 没有摄像头设备|
|VCLOSE     |2| 摄像头处于关闭状态|
|VOPEN      |3| 摄像头处于打开状态|
|VOPENING   |4| 向服务器发送打开消息中|

## 视频图像格式 {#VIDEO_FORMAT}

> VIDEO_FORMAT

|代码|数值|含义|
|------------|-------------|-----|
|VFMT_YUV420P   |0| yuv420p |
|VFMT_ARGB32    |1| 32-bit ARGB format (0xAARRGGBB)|

## 录制内容类型 {#REC_VCONTENT_TYPE}

> REC_VCONTENT_TYPE

|代码|数值|含义|
|------------|-------------|-----|
|RECVTP_VIDEO   |0| 摄像头 |
|RECVTP_PIC     |1| 图片 |
|RECVTP_SCREEN  |2| 屏幕 |
|RECVTP_MEDIA   |3| 影音共享 |
|RECVTP_TIMESTAMP|4|时间戳 |

## 录制状态 {#RECORD_STATE}

> RECORD_STATE

|代码|数值|含义|
|------------|-------------|-----|
|NO_RECORD  |0| 录制未启动|
|STARTING   |1| 录制正在开启|
|RECORDING  |2| 正在录制|
|PAUSED     |3| 录制已暂停|
|STOPPING   |4| 录制正在结束|

## 录制文件上传状态 {#RECORD_FILE_STATE}

> RECORD_FILE_STATE

|代码|数值|含义|
|------------|-------------|-----|
|RFS_NoUpload   |0| 未上传|
|RFS_Uploading  |1| 上传中|
|RFS_Uploaded   |2| 已上传|
|RFS_UploadFail |3| 上传失败|

## 屏幕共享编码类型 {#ENCODE_TYPE}

>ENCODE_TYPE

|代码|数值|含义|
|------------|-------------|-----|
|ENC_CLOUDROOM  |0| 云屋科技私有编码格式（清晰度更高、带宽大）|
|ENC_H264   |1| (清晰度差一些，带宽小）|

## 鼠标事件类型 {#MOUSE_MSG_TYPE}

> MOUSE_MSG_TYPE

|代码|数值|含义|
|------------|-------------|-----|
|MOUSE_MOVE     |0| 鼠标移动|
|MOUSE_DOWN     |1| 鼠标键按下|
|MOUSE_UP       |2| 鼠标键弹起|
|MOUSE_DBCLICK  |3| 鼠标双击|

## 鼠标键类型 {#MOUSE_KEY_TYPE}

> MOUSE_KEY_TYPE

|代码|数值|含义|
|------------|-------------|-----|
|MOUSEKEY_NULL  |0| 无|
|MOUSEKEY_L     |1| 鼠标左键|
|MOUSEKEY_M     |2| 鼠标中键|
|MOUSEKEY_R     |3| 鼠标右键|
|MOUSEKEY_WHEEL |4| 鼠标滚轮|
|MOUSEKEY_X     |5| 鼠标侧键|

## 键盘事件类型 {#KEY_MSG_TYPE}

> KEY_MSG_TYPE

|代码|数值|含义|
|------------|-------------|-----|
|KEYT_DWON  |0| 键值按下|
|KEYT_UP    |1| 键值弹起|

## 主功能页类型 {#MAIN_PAGE_TYPE}

>MAIN_PAGE_TYPE

|代码|数值|含义|
|------------|-------------|-----|
|MAINPAGE_VIDEOWALL     |0| 视频墙|
|MAINPAGE_SHARE         |1| 屏幕共享|
|MAINPAGE_WHITEBOARD    |2| 电子白板|
|MAINPAGE_MEDIASHARE    |3| 影音共享|

## 影音结束原因 {#MEDIA_STOP_REASON}

> MEDIA_STOP_REASON

|代码|数值|含义|
|------------|-------------|-----|
|MEDIA_CLOSE        |0| 文件关闭 |
|MEDIA_FINI         |1| 播放到文件尾部 |
|MEDIA_FILEOPEN_ERR |2| 打开文件失败 |
|MEDIA_FORMAT_ERR   |3| 文件格式错误 |
|MEDIA_UNSUPPORT    |4| 影音格式不支持 |
|MEDIA_EXCEPTION    |5| 其他异常 |

## 视频墙分屏模式 {#VIDEO_LAYOUT_MODE}

> VIDEO_LAYOUT_MODE

|代码 |数值 |含义|
|------------|-------------|-----|
|VLO_1v1_M      |0| 互看  |
|VLO_WALL1_M    |1| 1分屏 |
|VLO_WALL2      |2| 2分屏 |
|VLO_WALL4      |3| 4分屏 |
|VLO_WALL5_M    |4| 5分屏 |
|VLO_WALL6_M    |5| 6分屏 |
|VLO_WALL9      |6| 9分屏 |
|VLO_WALL13_M   |7| 13分屏 |
|VLO_WALL16     |8| 16分屏 |
|VLO_WALL25     |9| 25分屏 |

## 录制的类型 {#REC_DATA_TYPE}

> REC_DATA_TYPE

|代码|数值|含义|
|------------|-------------|-----|
|REC_AV_DEFAULT     |0| 录制所有语音和视频|
|REC_AUDIO_LOC      |1| 录制本地语音|
|REC_AUDIO_OTHER    |2| 录制其他人语音|
|REC_VIDEO          |3| 录制视频(内容由setRecordVideos设定)|

>用户可以自由组合，如REC_AUDIO_LOC|REC_VIDEO，表示录制本地语音和视频；
REC_AUDIO_LOC|REC_AUDIO_OTHER，录制双方语音

## Http文件传输状态 {#HTTP_TRANSFER_STATE}

> HTTP_TRANSFER_STATE

|代码|数值|含义|
|------------|-------------|-----|
|HTTPFS_NULL        |0| 未开始|
|HTTPFS_QUEUE       |1| 排队中|
|HTTPFS_TRANSFERING |2| 传输(上传/下载)中|
|HTTPFS_FINISHED    |3| 传输完成|

## Http文件传输结果 {#HTTP_TRANSFER_RESULT}

> HTTP_TRANSFER_RESULT

|代码|数值|含义|
|------------|-------------|-----|
|HTTPR_Success              |0| 成功|
|HTTPR_InnerErr             |1| 内部错误|
|HTTPR_ParamErr             |2| 参数错误|
|HTTPR_NetworkFail          |3| 网络不通/地址不对|
|HTTPR_NetworkTimeout       |4| 超时失败|
|HTTPR_FileOperationFail    |5| 文件操作失败|
|HTTPR_PathNotSupprot       |6| 不支持的路径|
|HTTPR_FileTransfering      |7| 文件正在传输|
|HTTPR_HTTPERR_BEGIN        |1000|  http错误码启始|
|HTTPR_HTTPERR_END          |1999|  http错误码结束|

## 用户状态 {#CLIENT_STATUS}

> CLIENT_STATUS

|代码|数值|含义|
|------------|-------------|-----|
|OFFLINE    |0| 离线状态|
|ONLINE     |1| 在线，且空闲状态|
|BUSY       |2| 在线，忙状态|
|MEETING    |3| 在线，会议中状态|

## 影音播放工具条UI组件 {#ToolBarUI}

> ToolBarUI

|代码|数值|含义|
|------------|-------------|-----|
|BTN_Pause   |0|    暂停|
|BTN_Stop    |1|    停止|
