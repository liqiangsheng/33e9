# 常量定义
>相关数值及含义定义

<p style="width:100%;height:4px;background:#f7f7f7"></p>

##错误代码含义

>CRVIDEOSDK_ERR_DEF

| 代码     | 数值        | 含义      |
|:-------- |:-----------|:----------|
| CRVIDEOSDK_NOERR |<font face="微软雅黑"> 0 </font>| 没有错误    | 
| CRVIDEOSDK_UNKNOWERR | <font face="微软雅黑">1 </font>| 未知错误    | 
| CRVIDEOSDK_OUTOF_MEM |<font face="微软雅黑"> 2 </font>| 内存不足    | 
| CRVIDEOSDK_INNER_ERR |<font face="微软雅黑"> 3 </font>| sdk内部错误    | 
| CRVIDEOSDK_MISMATCHCLIENTVER | <font face="微软雅黑">4</font> | 不支持的sdk版本    | 
| CRVIDEOSDK_MEETPARAM_ERR <font face="微软雅黑">| 5 </font>| 参数错误    | 
| CRVIDEOSDK_ERR_DATA | <font face="微软雅黑">6 </font>| 无效数据    | 
| CRVIDEOSDK_ANCTPSWD_ERR |<font face="微软雅黑"> 7 </font>| 帐号密码不正确    | 
| CRVIDEOSDK_SERVER_EXCEPTION |<font face="微软雅黑"> 8 </font>| 服务异常    | 
| CRVIDEOSDK_LOGINSTATE_ERROR | <font face="微软雅黑">9</font> | 登录状态错误    | 
| CRVIDEOSDK_USER_BEEN_KICKOUT | <font face="微软雅黑">10</font> | 登录用户被踢下线    | 
| CRVIDEOSDK_NETWORK_INITFAILED |<font face="微软雅黑"> 200 </font>| 网络初始化失败  | 
| CRVIDEOSDK_NO_SERVERINFO | <font face="微软雅黑">201</font> | 没有服务器信息    | 
| CRVIDEOSDK_NOSERVER_RSP | <font face="微软雅黑">202 </font>| 服务器没有响应    | 
| CRVIDEOSDK_CREATE_CONN_FAILED | <font face="微软雅黑">203</font> | 创建连接失败    | 
| CRVIDEOSDK_SOCKETEXCEPTION |<font face="微软雅黑"> 204 </font>| socket异常    | 
| CRVIDEOSDK_SOCKETTIMEOUT |<font face="微软雅黑"> 205</font> | 网络超时    | 
| CRVIDEOSDK_FORCEDCLOSECONNECTION |<font face="微软雅黑"> 206 </font>| 连接被关闭    | 
| CRVIDEOSDK_CONNECTIONLOST |<font face="微软雅黑"> 207</font> | 连接丢失    | 
| CRVIDEOSDK_QUE_ID_INVALID | <font face="微软雅黑">400 </font>| 队列ID错误    | 
| CRVIDEOSDK_QUE_NOUSER | <font face="微软雅黑">401 </font>| 没有用户在排队    | 
| CRVIDEOSDK_QUE_USER_CANCELLED |<font face="微软雅黑"> 402</font> | 排队用户已取消    | 
| CRVIDEOSDK_QUE_SERVICE_NOT_START | <font face="微软雅黑">403 </font>| 队列服务还未开启    | 
| CRVIDEOSDK_ALREADY_OTHERQUE |<font face="微软雅黑"> 404 </font>| 已在其它队列排队(客户只能在一个队列排队)    | 
| CRVIDEOSDK_INVALID_CALLID | <font face="微软雅黑">600 </font>| 无效的呼叫ID    | 
| CRVIDEOSDK_ERR_CALL_EXIST | <font face="微软雅黑">601</font> | 已在呼叫中    | 
| CRVIDEOSDK_ERR_BUSY | <font face="微软雅黑">602 </font>| 对方忙    | 
| CRVIDEOSDK_ERR_OFFLINE | <font face="微软雅黑">603</font> | 对方不在线    | 
| CRVIDEOSDK_ERR_NOANSWER |<font face="微软雅黑"> 604</font> | 对方无应答    | 
| CRVIDEOSDK_ERR_USER_NOT_FOUND | <font face="微软雅黑">605</font> | 用户不存在    | 
| CRVIDEOSDK_ERR_REFUSE | <font face="微软雅黑">606</font> | 对方拒接    | 
| CRVIDEOSDK_MEETNOTEXIST | <font face="微软雅黑">800 </font>| 没有会议不存在或已结束错误    | 
| CRVIDEOSDK_AUTHERROR | <font face="微软雅黑">801 </font>| 会议密码不正确    | 
| CRVIDEOSDK_MEMBEROVERFLOWERROR |<font face="微软雅黑"> 802</font> | 会议终端数量已满（购买的license不够)    | 
| CRVIDEOSDK_RESOURCEALLOCATEERROR |<font face="微软雅黑"> 803 </font>| 分配会议资源失败    | 
| CRVIDEOSDK_MEETROOMLOCKED |<font face="微软雅黑"> 804</font> | 会议已加锁    | 
| CRVIDEOSDK_CATCH_SCREEN_ERR | <font face="微软雅黑">900 </font>| 抓屏失败    | 
| CRVIDEOSDK_RECORD_MAX | <font face="微软雅黑">901</font> | 单次录制达到最大时长(8h)    | 
| CRVIDEOSDK_RECORD_NO_DISK | <font face="微软雅黑">902</font> | 磁盘空间不够    | 
| CRVIDEOSDK_SENDFAIL |<font face="微软雅黑"> 1000 </font>| 发送失败    | 
| CRVIDEOSDK_CONTAIN_SENSITIVEWORDS | <font face="微软雅黑">1001 </font>| 有敏感词语    | 
| CRVIDEOSDK_SENDCMD_LARGE |<font face="微软雅黑"> 1100 </font>| 发送信令数据过大    | 
| CRVIDEOSDK_SENDBUFFER_LARGE |<font face="微软雅黑"> 1101 </font>| 发送数据过大    | 
| CRVIDEOSDK_SENDDATA_TARGETINVALID |<font face="微软雅黑"> 1102 </font>| 目标用户不存在    | 
| CRVIDEOSDK_SENDFILE_FILEINERROR |<font face="微软雅黑"> 1103 </font>| 文件错误    | 
| CRVIDEOSDK_TRANSID_INVALID | <font face="微软雅黑">1104 </font>| 无效的发送id    | 
| CRVIDEOSDK_RECORDFILE_STATE_ERR |<font face="微软雅黑"> 1200 </font>| 状态错误不可上传/取消上传    | 
| CRVIDEOSDK_RECORDFILE_NOT_EXIST |<font face="微软雅黑"> 1201 </font>| 录制文件不存在    | 

##麦克风状态
>ASTATUS

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        | 含义      |
|:-------- |:-----------|:----------|
|AUNKNOWN  |<font face="微软雅黑">0</font>|音频状态未知	   |
|ANULL	   |<font face="微软雅黑">1	</font>|没有麦克风设备	   |
|ACLOSE	   |<font face="微软雅黑">2	</font>|麦克风处于关闭状态（软开关）|	   
|AOPEN	   |<font face="微软雅黑">3	</font>|麦克风处于打开状态（软开关）	|   
|AOPENING  |<font face="微软雅黑">4	</font>|向服务器发送打开消息中	| 

##视频尺寸定义
>VIDEO_SHOW_SIZE

<p style="width:100%;height:4px;background:#f7f7f7"></p>
 
| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
|VIDEO_SZ_80	|<font face="微软雅黑">1</font>|<font face="微软雅黑">144*80,   最大码率：56kbps</font>|	   
|VSIZE_SZ_128	|<font face="微软雅黑">2</font>|<font face="微软雅黑">224*128,  最大码率：72kbps</font>|	   
|VSIZE_SZ_160	|<font face="微软雅黑">3</font>|<font face="微软雅黑">288*160,  最大码率：100kbps</font>|	   
|VSIZE_SZ_192	|<font face="微软雅黑">4</font>|<font face="微软雅黑">336*192,  最大码率：150kbps</font>	|   
|VSIZE_SZ_256	|<font face="微软雅黑">5</font>|<font face="微软雅黑">448*256,  最大码率：200kbps</font>	 |  
|VSIZE_SZ_288	|<font face="微软雅黑">6</font>|<font face="微软雅黑">512*288,  最大码率：250kbps</font>	 |  
|VSIZE_SZ_320	|<font face="微软雅黑">7</font>|<font face="微软雅黑">576*320,  最大码率：300kbps</font>	 |  
|VSIZE_SZ_360	|<font face="微软雅黑">8</font>|<font face="微软雅黑">640*360,  最大码率：350kbps</font>	 |  
|VSIZE_SZ_400	|<font face="微软雅黑">9</font>|<font face="微软雅黑">720*400,  最大码率：420kbps</font>	 |  
|VSIZE_SZ_480	|<font face="微软雅黑">10</font>|<font face="微软雅黑">848*480,  最大码率：500kbps</font>	 |  
|VSIZE_SZ_576	|<font face="微软雅黑">11</font>|<font face="微软雅黑">1024*576,  最大码率：650kbps</font>|	   
|VSIZE_SZ_720	|<font face="微软雅黑">12</font>|<font face="微软雅黑">1280*720,  最大码率：1mbps</font>	|   
|VSIZE_SZ_1080	|<font face="微软雅黑">13</font>|<font face="微软雅黑">1920*1080, 最大码率：2mbps</font>	|

##视频状态定义
>VSTATUS

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| VUNKNOWN|	<font face="微软雅黑">0	</font>|视频状态未知	|   
| VNULL	|<font face="微软雅黑">1</font>|	没有视频设备	   |
| VCLOSE	|<font face="微软雅黑">2</font>	|视频处于关闭状态（软开关）|	   
| VOPEN	|<font face="微软雅黑">3</font>|	视频处于打开状态（软开关）|	   
| VOPENING|	<font face="微软雅黑">4</font>	|向服务器发送打开消息中	 |

##视频图像格式
>VIDEO_FORMAT

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| VFMT_YUV420P|<font face="微软雅黑">	0	</font>|<font face="微软雅黑">yuv420p	   |
| VFMT_ARGB32	|<font face="微软雅黑">1</font> |	<font face="微软雅黑">32-bit ARGB format (0xAARRGGBB)	 |

##录制内容类型
>REC_VCONTENT_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| RECVTP_VIDEO|<font face="微软雅黑">	0</font>	|摄像头	   |
| RECVTP_PIC	|<font face="微软雅黑">1</font>|	图片	|   
| RECVTP_SCREEN|	<font face="微软雅黑">2</font>|	屏幕	   |
| RECVTP_MEDIA|	<font face="微软雅黑">3	</font>|影音共享	|   
| RECVTP_TIMESTAMP	|<font face="微软雅黑">4</font>	|时间戳	 |

##录制语音类型
>RECORD_AUDIO_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| REC_AUDIO_TYPE_NULL|<font face="微软雅黑">	0</font>	|不录制任何语音	   |
| REC_AUDIO_TYPE_LOC	|<font face="微软雅黑">1</font>|	录制本地语音	|   
| REC_AUDIO_TYPE_OTHER|	<font face="微软雅黑">2</font>|	录制其他人语音	   |
| REC_AUDIO_TYPE_ALL|	<font face="微软雅黑">3	</font>|录制本地+其他人语音	|   


##录制图像类型
>RECORD_VIDEO_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| REC_VCONTENT_NULL|<font face="微软雅黑">	0</font>	|不录制任何图像	   |
| RECORD_VIDEO_TYPE_SCREEN	|<font face="微软雅黑">1</font>|	录制屏幕	|   
| REC_VCONTENT_VIDEOS|	<font face="微软雅黑">3</font>|	录制视频图像   |

##录制视频的布局类型
>RECORD_VLAYOUT

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| REC_VLAYOUT_GRID|<font face="微软雅黑">	0</font>	|表格类型	   |
| REC_VLAYOUT_PIP	|<font face="微软雅黑">1</font>|	画中画类型(只有在录两个视频时有效)	|   

##屏幕共享的编码类型
>ENCODE_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| ENC_CLOUDROOM|<font face="微软雅黑">	0</font>	|云屋科技私有编码格式（清晰度更高，带宽大）	   |
| ENC_H264	|<font face="微软雅黑">1</font>|	(清晰度差一些，带宽小）	|   

##鼠标事件类型
>MOUSE_MSG_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| MOUSE_MOVE	|<font face="微软雅黑">0</font>|	鼠标移动|	   
| MOUSE_DOWN|	<font face="微软雅黑">1</font>|	鼠标键按下	 |  
| MOUSE_UP|<font face="微软雅黑">	2	</font>|鼠标键弹起	   |
| MOUSE_DBCLICK	|<font face="微软雅黑">3</font>|	鼠标双击|

##鼠标键类型
>MOUSE_KEY_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| MOUSEKEY_NULL|<font face="微软雅黑">	0</font>|	无	 |  
| MOUSEKEY_L|<font face="微软雅黑">	1</font>	|鼠标左键	|   
| MOUSEKEY_M|<font face="微软雅黑">	2	</font>|鼠标中键	|   
| MOUSEKEY_R|	<font face="微软雅黑">3</font>|鼠标右键	 |  
| MOUSEKEY_WHEEL|<font face="微软雅黑">	4</font>|	鼠标滚轮	|   
| MOUSEKEY_X	|<font face="微软雅黑">5</font>	|鼠标侧键|

##键盘事件类型
>KEY_MSG_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| KEYT_DWON|<font face="微软雅黑">	0</font>|	键值按下|	   
| KEYT_UP	|<font face="微软雅黑">1	</font>|键值弹起| 

##功能类型
>MAIN_PAGE_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| MAINPAGE_VIDEOWALL|<font face="微软雅黑">	0</font>|	视频墙	  | 
| MAINPAGE_SHARE|<font face="微软雅黑">	1</font>|	共享	   |
| MAINPAGE_WHITEBOARD|<font face="微软雅黑">	2</font>	|白板	|

##影音的清晰度
>VDEFINITION_TYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| V_SD	|<font face="微软雅黑">0	</font>|<font face="微软雅黑">标清 640x360	</font>	|   
| V_HD	|<font face="微软雅黑">1</font>|	<font face="微软雅黑">高清 1280x720</font> |  
| V_UD|<font face="微软雅黑">	2</font>|	<font face="微软雅黑">超清 1920x1080</font>|	   


##视频墙分屏模式
>VIDEOLAYOUTMODE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| VLO_1v1_M|<font face="微软雅黑">	0	</font>|互看	  | 
| VLO_WALL1_M	|<font face="微软雅黑">1</font>|<font face="微软雅黑">	1分屏</font>	  | 
| VLO_WALL2|	<font face="微软雅黑">2	</font>|<font face="微软雅黑">2分屏	</font>   |
| VLO_WALL4|<font face="微软雅黑">	3</font>|<font face="微软雅黑">	4分屏	 </font> | 
| VLO_WALL5_M	|<font face="微软雅黑">4</font>|	<font face="微软雅黑">5分屏	</font>   |
| VLO_WALL6_M	|<font face="微软雅黑">5</font>|	<font face="微软雅黑">6分屏	</font>   |
| VLO_WALL9	|<font face="微软雅黑">6</font>|<font face="微软雅黑">	9分屏	 </font>  |
| VLO_WALL13_M|<font face="微软雅黑">	7</font>	|<font face="微软雅黑">13分屏	</font>|   
| VLO_WALL16|<font face="微软雅黑">	8	</font>|<font face="微软雅黑">16分屏</font>	|   
| VLO_WALL25	|<font face="微软雅黑">9</font>|<font face="微软雅黑">	25分屏</font>	|

##录制的类型
>REC_DATATYPE

<p style="width:100%;height:4px;background:#f7f7f7"></p>

| 代码     | 数值        |   分辨率和码率 |
|:-------- |:-----------|:----------|
| REC_AV_DEFAULT|<font face="微软雅黑">	0</font>|	录制所有语音和视频	 |  
| REC_AUDIO_LOC	|<font face="微软雅黑">1</font>	|录制本地语音	   |
| REC_AUDIO_OTHER	|<font face="微软雅黑">2</font>|	录制其他人语音	   |
<font face="微软雅黑" color="red">REC_VIDEO	3	录制视频(内容由setRecordVideos设定)用户可以自由组合，如REC_AUDIO_LOC|REC_VIDEO，表示录制本地语音和视频；
REC_AUDIO_LOC|REC_AUDIO_OTHER，录制双方语音</font>


 

   