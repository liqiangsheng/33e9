# 常量定义
>相关数值及含义定义

<p style="width:100%;height:4px;background:#f7f7f7"></p>

##错误代码含义 {#CRVIDEOSDK_ERR_DEF}

>CRVIDEOSDK_ERR_DEF

| 代码     | 数值        | 含义      |
|:-------- |:-----------|:----------|
| CRVIDEOSDK_NOERR | 0 | 没有错误    | 
| CRVIDEOSDK_UNKNOWERR | 1| 未知错误    | 
| CRVIDEOSDK_OUTOF_MEM | 2 | 内存不足    | 
| CRVIDEOSDK_INNER_ERR | 3| sdk内部错误    | 
| CRVIDEOSDK_MISMATCHCLIENTVER | 4 | 不支持的sdk版本    | 
| CRVIDEOSDK_MEETPARAM_ERR | 5| 参数错误    | 
| CRVIDEOSDK_ERR_DATA | 6 | 无效数据    | 
| CRVIDEOSDK_ANCTPSWD_ERR |7 | 帐号密码不正确    | 
| CRVIDEOSDK_SERVER_EXCEPTION | 8 | 服务异常    | 
| CRVIDEOSDK_LOGINSTATE_ERROR | 9 | 登录状态错误    | 
| CRVIDEOSDK_USER_BEEN_KICKOUT | 10 | 登录用户被踢下线    | 
| CRVIDEOSDK_NETWORK_INITFAILED | 200 | 网络初始化失败  | 
| CRVIDEOSDK_NO_SERVERINFO | 201 | 没有服务器信息    | 
| CRVIDEOSDK_NOSERVER_RSP | 202 | 服务器没有响应    | 
| CRVIDEOSDK_CREATE_CONN_FAILED | 203 | 创建连接失败    | 
| CRVIDEOSDK_SOCKETEXCEPTION | 204 | socket异常    | 
| CRVIDEOSDK_SOCKETTIMEOUT | 205 | 网络超时    | 
| CRVIDEOSDK_FORCEDCLOSECONNECTION | 206 | 连接被关闭    | 
| CRVIDEOSDK_CONNECTIONLOST | 207 | 连接丢失    | 
| CRVIDEOSDK_QUE_ID_INVALID |400 | 队列ID错误    | 
| CRVIDEOSDK_QUE_NOUSER | 401 | 没有用户在排队    | 
| CRVIDEOSDK_QUE_USER_CANCELLED |402| 排队用户已取消    | 
| CRVIDEOSDK_QUE_SERVICE_NOT_START | 403 | 队列服务还未开启    | 
| CRVIDEOSDK_ALREADY_OTHERQUE | 404 | 已在其它队列排队(客户只能在一个队列排队)    | 
| CRVIDEOSDK_INVALID_CALLID | 600 | 无效的呼叫ID    | 
| CRVIDEOSDK_ERR_CALL_EXIST | 601| 已在呼叫中    | 
| CRVIDEOSDK_ERR_BUSY | 602| 对方忙    | 
| CRVIDEOSDK_ERR_OFFLINE | 603 | 对方不在线    | 
| CRVIDEOSDK_ERR_NOANSWER | 604| 对方无应答    | 
| CRVIDEOSDK_ERR_USER_NOT_FOUND | 605 | 用户不存在    | 
| CRVIDEOSDK_ERR_REFUSE | 606 | 对方拒接    | 
| CRVIDEOSDK_MEETNOTEXIST | 800 | 没有会议不存在或已结束错误    | 
| CRVIDEOSDK_AUTHERROR | 801 | 会议密码不正确    | 
| CRVIDEOSDK_MEMBEROVERFLOWERROR | 802| 会议终端数量已满（购买的license不够)    | 
| CRVIDEOSDK_RESOURCEALLOCATEERROR | 803 | 分配会议资源失败    | 
| CRVIDEOSDK_MEETROOMLOCKED | 804 | 会议已加锁    | 
| CRVIDEOSDK_CATCH_SCREEN_ERR | 900| 抓屏失败    | 
| CRVIDEOSDK_RECORD_MAX | 901| 单次录制达到最大时长(8h)    | 
| CRVIDEOSDK_RECORD_NO_DISK | 902| 磁盘空间不够    | 
| CRVIDEOSDK_SENDFAIL | 1000 | 发送失败    | 
| CRVIDEOSDK_CONTAIN_SENSITIVEWORDS | 1001 | 有敏感词语    | 
| CRVIDEOSDK_SENDCMD_LARGE | 1100 | 发送信令数据过大    | 
| CRVIDEOSDK_SENDBUFFER_LARGE |1101| 发送数据过大    | 
| CRVIDEOSDK_SENDDATA_TARGETINVALID | 1102 | 目标用户不存在    | 
| CRVIDEOSDK_SENDFILE_FILEINERROR | 1103 | 文件错误    | 
| CRVIDEOSDK_TRANSID_INVALID | 1104 | 无效的发送id    | 
| CRVIDEOSDK_RECORDFILE_STATE_ERR | 1200 | 状态错误不可上传/取消上传    | 
| CRVIDEOSDK_RECORDFILE_NOT_EXIST | 1201 | 录制文件不存在    | 

##麦克风状态 {#ASTATUS}
>ASTATUS

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        | 含义      |
|:-------- |:-----------|:----------|
|AUNKNOWN  |0|音频状态未知	   |
|ANULL	   |1	|没有麦克风设备	   |
|ACLOSE	   |2	|麦克风处于关闭状态（软开关）|	   
|AOPEN	   |3	|麦克风处于打开状态（软开关）	|   
|AOPENING  |4	|向服务器发送打开消息中	| 

##视频尺寸定义 {#VIDEO_SHOW_SIZE}
>VIDEO_SHOW_SIZE

<p style="width:100%;height:4px;background:#f7f7f7"></p>
 
| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
|VIDEO_SZ_80	|1|144*80,   最大码率：56kbps|	   
|VSIZE_SZ_128	|2|224*128,  最大码率：72kbps|	   
|VSIZE_SZ_160	|3|288*160,  最大码率：100kbps|	   
|VSIZE_SZ_192	|4|336*192,  最大码率：150kbps	|   
|VSIZE_SZ_256	|5|448*256,  最大码率：200kbps	 |  
|VSIZE_SZ_288	|6|512*288,  最大码率：250kbps	 |  
|VSIZE_SZ_320	|7|576*320,  最大码率：300kbps	 |  
|VSIZE_SZ_360	|8|640*360,  最大码率：350kbps	 |  
|VSIZE_SZ_400	|9|720*400,  最大码率：420kbps |  
|VSIZE_SZ_480	|10|848*480,  最大码率：500kbps	 |  
|VSIZE_SZ_576	|11|1024*576,  最大码率：650kbps|	   
|VSIZE_SZ_720	|12|1280*720,  最大码率：1mbps	|   
|VSIZE_SZ_1080	|13|1920*1080, 最大码率：2mbps	|

##视频状态定义 {#VSTATUS}
>VSTATUS

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| VUNKNOWN|	0	|视频状态未知	|   
| VNULL	|1|	没有视频设备	   |
| VCLOSE	|2|视频处于关闭状态（软开关）|	   
| VOPEN	|3|	视频处于打开状态（软开关）|	   
| VOPENING|	4	|向服务器发送打开消息中	 |

##视频图像格式 {#VIDEO_FORMAT}
>VIDEO_FORMAT

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| VFMT_YUV420P|0	|yuv420p	   |
| VFMT_ARGB32	|1 |32-bit ARGB format (0xAARRGGBB)	 |

##录制内容类型 {#REC_VCONTENT_TYPE}
>REC_VCONTENT_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| RECVTP_VIDEO|0	|摄像头	   |
| RECVTP_PIC	|1|	图片	|   
| RECVTP_SCREEN|	2|	屏幕	   |
| RECVTP_MEDIA|	3	|影音共享	|   
| RECVTP_TIMESTAMP	|4|时间戳	 |

##录制的状态 {#RECORD_STATE}
>RECORD_STATE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| NO_RECORD|0	|录制未启动	   |
| STARTING	|1|	录制正在开启	|   
| RECORDING|	2|	正在录制	   |
| PAUSED|	3	|录制已暂停	|   
| STOPPING	|4|录制正在结束	 |

##录制语音类型 {#RECORD_AUDIO_TYPE}
>RECORD_AUDIO_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| REC_AUDIO_TYPE_NULL|	0	|不录制任何语音	   |
| REC_AUDIO_TYPE_LOC	|1|	录制本地语音	|   
| REC_AUDIO_TYPE_OTHER|	2|	录制其他人语音	   |
| REC_AUDIO_TYPE_ALL|	3	|录制本地+其他人语音	|   


##录制图像类型 {#RECORD_VIDEO_TYPE}
>RECORD_VIDEO_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| REC_VCONTENT_NULL|	0	|不录制任何图像	   |
| RECORD_VIDEO_TYPE_SCREEN	|1|	录制屏幕	|   
| REC_VCONTENT_VIDEOS|3|	录制视频图像   |

##录制视频的布局类型 {#RECORD_VLAYOUT}
>RECORD_VLAYOUT

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| REC_VLAYOUT_GRID|	0	|表格类型	   |
| REC_VLAYOUT_PIP	|1|	画中画类型(只有在录两个视频时有效)	|   

##屏幕共享的编码类型 {#ENCODE_TYPE}
>ENCODE_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| ENC_CLOUDROOM|	0	|云屋科技私有编码格式（清晰度更高，带宽大）	   |
| ENC_H264	|1|	(清晰度差一些，带宽小）	|   

##鼠标事件类型 {#MOUSE_MSG_TYPE}
>MOUSE_MSG_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| MOUSE_MOVE	|0|	鼠标移动|	   
| MOUSE_DOWN|	1|	鼠标键按下	 |  
| MOUSE_UP|	2	|鼠标键弹起	   |
| MOUSE_DBCLICK	|3|	鼠标双击|

##鼠标键类型 {#MOUSE_KEY_TYPE}
>MOUSE_KEY_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| MOUSEKEY_NULL|	0|	无	 |  
| MOUSEKEY_L|1	|鼠标左键	|   
| MOUSEKEY_M|	2	|鼠标中键	|   
| MOUSEKEY_R|3|鼠标右键	 |  
| MOUSEKEY_WHEEL|	4|	鼠标滚轮	|   
| MOUSEKEY_X	|5	|鼠标侧键|

##键盘事件类型 {#KEY_MSG_TYPE}
>KEY_MSG_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| KEYT_DWON|	0|	键值按下|	   
| KEYT_UP	|1	|键值弹起| 

##功能类型  {#MAIN_PAGE_TYPE}
>MAIN_PAGE_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| MAINPAGE_VIDEOWALL|	0|	视频墙	  | 
| MAINPAGE_SHARE|	1|	共享	   |
| MAINPAGE_WHITEBOARD|	2	|白板	|

##影音的清晰度 {#VDEFINITION_TYPE}
>VDEFINITION_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| V_SD	|0	|标清 640x360	|   
| V_HD	|1|高清 1280x720 |  
| V_UD|2|	超清 1920x1080|	   


##视频墙分屏模式 {#VIDEOLAYOUTMODE}
>VIDEOLAYOUTMODE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| VLO_1v1_M|	0	|互看	  | 
| VLO_WALL1_M	|1|	1分屏	  | 
| VLO_WALL2|	2	|2分屏 |
| VLO_WALL4|	3|	4分屏	 | 
| VLO_WALL5_M	|4|5分屏	  |
| VLO_WALL6_M	|5|	6分屏	  |
| VLO_WALL9	|6|	9分屏	  |
| VLO_WALL13_M|	7	|13分屏|   
| VLO_WALL16|	8	|16分屏	|   
| VLO_WALL25	|9|	25分屏	|

##录制的类型 {#REC_DATATYPE}
>REC_DATATYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| REC_AV_DEFAULT|	0|	录制所有语音和视频	 |  
| REC_AUDIO_LOC	|1	|录制本地语音	   |
| REC_AUDIO_OTHER	|2|	录制其他人语音	   |
<font color="red">REC_VIDEO	3	录制视频(内容由setRecordVideos设定)用户可以自由组合，如REC_AUDIO_LOC|REC_VIDEO，表示录制本地语音和视频；
REC_AUDIO_LOC|REC_AUDIO_OTHER，录制双方语音</font>


 

   